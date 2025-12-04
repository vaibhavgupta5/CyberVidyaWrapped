import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState, useCallback } from "react";
import { Eye, EyeOff } from "lucide-react";

function LoginForm({ setAttendanceData }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const AUTH_COOKIE = "auth_token";
  const USERNAME_COOKIE = "cv_username";
  const PASSWORD_COOKIE = "cv_password";
  const REMEMBER_ME_COOKIE = "cv_remember";
  const COOKIE_EXPIRY = 30; // days

  const fetchAttendanceData = useCallback(
    async (token) => {
      try {
        const res = await axios.get(
          "https://kiet.cybervidya.net/api/attendance/course/component/student",
          { headers: { Authorization: `GlobalEducation ${token}` } }
        );
        setAttendanceData(res.data);
        console.log(res.data);
      } catch (err) {
        setError("Session expired. Please log in again.");
        Cookies.remove(AUTH_COOKIE);
      }
    },
    [setAttendanceData]
  );

  useEffect(() => {
    const savedUsername = Cookies.get(USERNAME_COOKIE) || "";
    const savedRemember = Cookies.get(REMEMBER_ME_COOKIE) === "true";
    const savedPassword = savedRemember
      ? Cookies.get(PASSWORD_COOKIE) || ""
      : "";

    setUsername(savedUsername);
    setPassword(savedPassword);
    setRememberMe(savedRemember);

    const token = Cookies.get(AUTH_COOKIE);
    if (token) fetchAttendanceData(token);
  }, [fetchAttendanceData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const loginRes = await axios.post(
        "https://kiet.cybervidya.net/api/auth/login",
        {
          userName: username,
          password: password,
        }
      );

      const token = loginRes.data.data.token;

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

      fetchAttendanceData(token);
    } catch (err) {
      setError("Invalid credentials. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-20">
      <div className="w-full max-w-sm p-6 border rounded-lg shadow-sm bg-white">
        <h2 className="text-2xl font-bold mb-6 text-center">
          CyberVidya Login
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold">
              University Roll Number
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="20240XXXXXXXXXX"
              className="w-full mt-1 p-2 border rounded outline-none"
              required
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-semibold">Password</label>
            <input
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-2 border rounded outline-none"
              required
            />
            <div
              className="absolute right-3 top-9 cursor-pointer"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <span className="text-sm">Remember me</span>
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded cursor-pointer disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Loading..." : "View Attendance"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
