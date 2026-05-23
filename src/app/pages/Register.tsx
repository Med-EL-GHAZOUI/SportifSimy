import { Link } from 'react-router';

export function Register() {
  return (
    <div className="bg-[#f7f9fb] min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#4e45e4]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#006b62]/5 rounded-full blur-3xl"></div>

      {/* Registration Card */}
      <div className="w-full max-w-lg z-10">
        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_8px_32px_rgba(45,51,55,0.06)] border border-[#acb3b7]/10">
          <div className="mb-10 text-center">
            <div className="inline-flex items-center justify-center p-3 bg-[#bdbaff]/30 rounded-xl mb-6">
              <span
                className="material-symbols-outlined text-[#4e45e4] text-3xl"
                style={{ fontVariationSettings: '"FILL" 1' }}
              >
                fitness_center
              </span>
            </div>
            <h1 className="font-['Manrope'] text-3xl md:text-4xl font-extrabold text-[#2d3337] tracking-tight mb-2">
              Create Coach Account
            </h1>
            <p className="text-[#596063] text-lg">Start managing your clients</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {/* Full Name Field */}
            <div className="space-y-2">
              <label
                className="font-['Inter'] text-sm font-semibold text-[#596063] ml-1"
                htmlFor="full-name"
              >
                Full Name
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#757c7f]">
                  person
                </span>
                <input
                  className="w-full pl-12 pr-4 py-3.5 bg-[#f1f4f6] border border-[#acb3b7]/15 rounded-xl focus:ring-4 focus:ring-[#4e45e4]/10 focus:border-[#4e45e4] transition-all outline-none text-[#2d3337] placeholder:text-[#757c7f]/60"
                  id="full-name"
                  name="full-name"
                  placeholder="Enter your full name"
                  type="text"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label
                className="font-['Inter'] text-sm font-semibold text-[#596063] ml-1"
                htmlFor="email"
              >
                Email Address
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#757c7f]">
                  mail
                </span>
                <input
                  className="w-full pl-12 pr-4 py-3.5 bg-[#f1f4f6] border border-[#acb3b7]/15 rounded-xl focus:ring-4 focus:ring-[#4e45e4]/10 focus:border-[#4e45e4] transition-all outline-none text-[#2d3337] placeholder:text-[#757c7f]/60"
                  id="email"
                  name="email"
                  placeholder="coach@example.com"
                  type="email"
                />
              </div>
            </div>

            {/* Password Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  className="font-['Inter'] text-sm font-semibold text-[#596063] ml-1"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#757c7f]">
                    lock
                  </span>
                  <input
                    className="w-full pl-12 pr-4 py-3.5 bg-[#f1f4f6] border border-[#acb3b7]/15 rounded-xl focus:ring-4 focus:ring-[#4e45e4]/10 focus:border-[#4e45e4] transition-all outline-none text-[#2d3337] placeholder:text-[#757c7f]/60"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    type="password"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  className="font-['Inter'] text-sm font-semibold text-[#596063] ml-1"
                  htmlFor="confirm-password"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#757c7f]">
                    key
                  </span>
                  <input
                    className="w-full pl-12 pr-4 py-3.5 bg-[#f1f4f6] border border-[#acb3b7]/15 rounded-xl focus:ring-4 focus:ring-[#4e45e4]/10 focus:border-[#4e45e4] transition-all outline-none text-[#2d3337] placeholder:text-[#757c7f]/60"
                    id="confirm-password"
                    name="confirm-password"
                    placeholder="••••••••"
                    type="password"
                  />
                </div>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start gap-3 px-1 py-2">
              <input
                className="mt-1 rounded-md text-[#4e45e4] focus:ring-[#bdbaff] border-[#acb3b7]/30"
                id="terms"
                type="checkbox"
              />
              <label className="text-xs text-[#596063] leading-relaxed" htmlFor="terms">
                By creating an account, I agree to the FluidPulse{' '}
                <Link to="#" className="text-[#4e45e4] font-medium hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="#" className="text-[#4e45e4] font-medium hover:underline">
                  Privacy Policy
                </Link>
                .
              </label>
            </div>

            {/* CTA Button */}
            <button
              className="w-full bg-gradient-to-br from-[#4e45e4] to-[#4135d8] text-white py-4 rounded-xl font-semibold text-lg shadow-lg shadow-[#4e45e4]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              type="submit"
            >
              <span>Create Account</span>
              <span className="material-symbols-outlined text-xl">arrow_forward</span>
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-8 text-center border-t border-[#e3e9ec] pt-8">
            <p className="text-[#596063] text-sm">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-[#4e45e4] font-bold hover:text-[#4135d8] transition-colors ml-1"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
