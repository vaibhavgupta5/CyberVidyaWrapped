import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";

const AUTH_COOKIE = "auth_token";
const USERNAME_COOKIE = "cv_username";
const PASSWORD_COOKIE = "cv_password";
const REMEMBER_ME_COOKIE = "cv_remember";
const COOKIE_EXPIRY = 30; // days

export const useAttendanceStore = create((set, get) => ({
  user: null,
  attendanceData: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (username, password, rememberMe) => {
    set({ isLoading: true, error: null });
    try {
      const loginRes = await axios.post(
        "https://kiet.cybervidya.net/api/auth/login",
        {
          userName: username,
          password: password,
        }
      );

      const token = loginRes.data.data.token;

      // Cookie Management
      Cookies.set(USERNAME_COOKIE, username, { expires: COOKIE_EXPIRY });
      Cookies.set(REMEMBER_ME_COOKIE, rememberMe.toString(), {
        expires: COOKIE_EXPIRY,
      });

      if (rememberMe) {
        Cookies.set(PASSWORD_COOKIE, password, { expires: COOKIE_EXPIRY });
        Cookies.set(AUTH_COOKIE, token, { expires: COOKIE_EXPIRY });
      } else {
        Cookies.remove(PASSWORD_COOKIE);
        Cookies.set(AUTH_COOKIE, token);
      }

      await get().fetchAttendance(token);
    } catch (err) {
      console.error("Login Error:", err);
      set({
        error: "Invalid credentials or server error. Try again.",
        isLoading: false,
      });
    }
  },

  fetchAttendance: async (token) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.get(
        "https://kiet.cybervidya.net/api/attendance/course/component/student",
        { headers: { Authorization: `GlobalEducation ${token}` } }
      );

      // Based on sampleres.txt structure
      const fullData = res.data.data;

      // Extract user info
      const user = {
        fullName: fullData.fullName,
        firstName: fullData.firstName,
        lastName: fullData.lastName,
        rollNumber: fullData.rollNumber,
        branchShortName: fullData.branchShortName,
        sectionName: fullData.sectionName,
        semesterName: fullData.semesterName,
      };

      // Extract attendance list
      const attendanceData = res.data; // Keeping full response structure for utility compatibility

      set({
        user,
        attendanceData,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (err) {
      console.error("Fetch Attendance Error:", err);
      set({
        error: "Session expired or network error. Please log in again.",
        isAuthenticated: false,
        isLoading: false,
      });
      Cookies.remove(AUTH_COOKIE);
    }
  },

  checkSession: () => {
    const token = Cookies.get(AUTH_COOKIE);
    if (token) {
      get().fetchAttendance(token);
    }
  },

  logout: () => {
    Cookies.remove(AUTH_COOKIE);
    // Don't remove username/password if remember me was set, but for logout usually we clear auth
    // Logic: If user explicitly logs out, maybe clear everything?
    // For now, just clear auth state.
    set({
      user: null,
      attendanceData: null,
      isAuthenticated: false,
    });
  },
}));
