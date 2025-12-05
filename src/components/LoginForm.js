import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import Cookies from "js-cookie";
import { useAttendanceStore } from "../store/useAttendanceStore";

export default function LoginForm() {
  const login = useAttendanceStore((state) => state.login);
  const isLoading = useAttendanceStore((state) => state.isLoading);
  const error = useAttendanceStore((state) => state.error);

  const [username, setUsername] = useState(
    () => Cookies.get("cv_username") || ""
  );
  const [password, setPassword] = useState(() => {
    const savedRemember = Cookies.get("cv_remember") === "true";
    return savedRemember ? Cookies.get("cv_password") || "" : "";
  });
  const [rememberMe, setRememberMe] = useState(
    () => Cookies.get("cv_remember") === "true"
  );
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password, rememberMe);
  };

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="w-full max-w-sm p-8 border-2 border-black  -sm  -[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
        <h2 className="text-3xl font-black mb-6 text-center text-black font-permanent-marker transform -rotate-2">
          CyberVidya Wrapped!
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-bold text-zinc-600 mb-1 font-mono uppercase">
              University Roll Number
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="20240XXXXXXXXXX"
              className="w-full p-3 bg-zinc-50 border-2 border-zinc-300  -none text-black outline-none focus:border-black transition-colors font-mono"
              required
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-bold text-zinc-600 mb-1 font-mono uppercase">
              Password
            </label>
            <input
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-zinc-50 border-2 border-zinc-300  -none text-black outline-none focus:border-black transition-colors font-mono"
              required
            />
            <div
              className="absolute right-3 top-9 cursor-pointer text-zinc-400 hover:text-black"
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
              className="accent-black w-4 h-4"
            />
            <span className="text-sm text-zinc-600 font-mono">Remember me</span>
          </div>

          {error && (
            <p className="text-rose-600 text-sm text-center font-bold">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-black hover:bg-zinc-800 text-white font-bold py-3  -none transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-transparent hover:border-black"
            disabled={isLoading}
          >
            {isLoading ? "Accessing Attendance..." : "Create Wrap"}
          </button>

          <p className="text-[10px] text-center text-zinc-400 mt-2 font-mono">
  We do not store your credentials. For transparency, check the code at  {" "}
  <a
    href="https://github.com/vaibhavgupta5/cybervidyawrapped"
    target="_blank"
    className="underline hover:text-black"
  >
     github.com/vaibhavgupta5/cybervidyawrapped
  </a>
</p>

        </form>
      </div>
    </div>
  );
}
