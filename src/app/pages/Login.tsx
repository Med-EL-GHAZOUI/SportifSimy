import { Link } from 'react-router';
import { useState } from 'react';

export function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex items-center justify-center px-4 py-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[40rem] h-[40rem] bg-[#91feef]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[35rem] h-[35rem] bg-[#c4acff]/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-xl shadow-[0_8px_32px_rgba(45,51,55,0.06)] p-8 md:p-10">
          <div className="text-center mb-10">
            <h1 className="font-['Manrope'] text-3xl font-extrabold tracking-tight text-[#2d3337] mb-2">
              Welcome Back
            </h1>
            <p className="text-[#596063] font-['Inter']">Sign in to your account</p>
          </div>

          <div className="mb-6 flex items-center gap-3 p-4 bg-[#ac3149]/10 rounded-lg">
            <span className="material-symbols-outlined text-[#ac3149]">error</span>
            <p className="text-sm font-medium text-[#770326]">Invalid email or password</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label
                className="block font-['Inter'] text-xs font-bold uppercase tracking-wider text-[#596063] px-1"
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#757c7f]">
                  mail
                </span>
                <input
                  className="w-full pl-12 pr-4 py-3.5 bg-[#f1f4f6] border border-[#acb3b7]/15 rounded-lg focus:border-[#4e45e4] transition-all text-[#2d3337] placeholder:text-[#757c7f] outline-none"
                  id="email"
                  placeholder="name@company.com"
                  type="email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                className="block font-['Inter'] text-xs font-bold uppercase tracking-wider text-[#596063] px-1"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#757c7f]">
                  lock
                </span>
                <input
                  className="w-full pl-12 pr-12 py-3.5 bg-[#f1f4f6] border border-[#acb3b7]/15 rounded-lg focus:border-[#4e45e4] transition-all text-[#2d3337] placeholder:text-[#757c7f] outline-none"
                  id="password"
                  placeholder="••••••••"
                  type={showPassword ? 'text' : 'password'}
                />
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#757c7f] hover:text-[#2d3337] transition-colors"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span className="material-symbols-outlined">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between py-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  className="h-5 w-5 rounded border-[#acb3b7]/30 text-[#4e45e4] focus:ring-[#4e45e4]/20 transition-all"
                  type="checkbox"
                />
                <span className="text-sm text-[#596063] group-hover:text-[#2d3337] transition-colors">
                  Remember me
                </span>
              </label>
              <Link
                to="#"
                className="text-sm font-semibold text-[#4e45e4] hover:text-[#4135d8] transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <button
              className="w-full bg-gradient-to-br from-[#4e45e4] to-[#4135d8] text-white py-4 rounded-xl font-['Manrope'] font-bold text-lg shadow-[0_8px_32px_rgba(45,51,55,0.06)] hover:opacity-90 active:scale-[0.98] transition-all"
              type="submit"
            >
              Sign In
            </button>
          </form>
        </div>

        <div className="mt-8 text-center">
          <p className="text-[#596063] font-['Inter']">
            Are you a coach?{' '}
            <Link to="/register" className="ml-1 font-bold text-[#4e45e4] hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
