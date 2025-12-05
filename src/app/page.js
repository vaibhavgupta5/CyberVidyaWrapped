"use client";

import { useEffect } from "react";
import { useAttendanceStore } from "../store/useAttendanceStore";
import AttendanceManager from "../components/AttendanceManager";
import LoginForm from "../components/LoginForm";

export default function Home() {
  const isAuthenticated = useAttendanceStore((state) => state.isAuthenticated);
  const checkSession = useAttendanceStore((state) => state.checkSession);
  const isLoading = useAttendanceStore((state) => state.isLoading);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  if (isLoading && !isAuthenticated) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-black font-mono font-bold animate-pulse text-xl">
          Creating Panner Tikka Wrap...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      {!isAuthenticated ? <LoginForm /> : <AttendanceManager />}
    </div>
  );
}
