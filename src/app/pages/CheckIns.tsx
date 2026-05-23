import { useState } from 'react';

export function CheckIns() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#f7f9fb]">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-gradient-to-bl from-[#4e45e4]/5 to-transparent rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/3 bg-gradient-to-tr from-[#91feef]/20 to-transparent rounded-full blur-3xl -z-10"></div>

      <div className="max-w-4xl mx-auto p-6 md:p-12">
        {/* Header Section */}
        <div className="mb-12">
          <h2 className="text-4xl font-extrabold font-['Manrope'] text-[#2d3337] tracking-tight mb-2">
            Check-ins
          </h2>
          <p className="text-[#596063] text-lg">
            Track your weekly updates and stay on path to your goals.
          </p>
        </div>

        {/* Bento Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Hero Check-in Card */}
          <div className="md:col-span-8 bg-white p-8 rounded-3xl shadow-[0_8px_32px_rgba(45,51,55,0.06)] flex flex-col gap-8">
            <div className="flex items-start justify-between">
              <div>
                <span className="inline-flex items-center px-3 py-1 bg-[#91feef] text-[#006259] text-xs font-bold rounded-full mb-4 uppercase tracking-wider">
                  Active Cycle
                </span>
                <h3 className="text-2xl font-bold font-['Manrope'] text-[#2d3337]">
                  Weekly Check-in
                </h3>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-[#bdbaff]/20 flex items-center justify-center text-[#4e45e4]">
                <span className="material-symbols-outlined text-4xl">event_available</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-[#f1f4f6] p-6 rounded-2xl">
                <p className="text-[#596063] text-sm font-medium mb-1">Status</p>
                <p className="text-[#2d3337] font-bold">Ready for your check-in</p>
              </div>
              <div className="bg-[#f1f4f6] p-6 rounded-2xl">
                <p className="text-[#596063] text-sm font-medium mb-1">Last check-in</p>
                <p className="text-[#2d3337] font-bold">72.5 kg</p>
              </div>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="w-full bg-[#4e45e4] py-4 rounded-2xl text-white font-['Manrope'] font-extrabold text-lg shadow-lg shadow-[#4e45e4]/20 hover:bg-[#4135d8] transition-all active:scale-[0.99]"
            >
              Start Check-in
            </button>
          </div>

          {/* Secondary Info Panel */}
          <div className="md:col-span-4 space-y-6">
            <div className="bg-[#e3e9ec] p-6 rounded-3xl">
              <h4 className="font-['Manrope'] font-bold text-[#2d3337] mb-4">
                Why it matters
              </h4>
              <p className="text-[#596063] text-sm leading-relaxed">
                Consistent check-ins allow your coach to adjust calories and training volume based on your metabolic adaptation.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#006b62]"></div>
                  <span className="text-xs font-semibold text-[#2d3337]">Metabolic Tracking</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#6e3bd8]"></div>
                  <span className="text-xs font-semibold text-[#2d3337]">Visual Progress</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Check-in Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#2d3337]/20 backdrop-blur-sm">
          <div className="w-full max-w-lg max-h-[90vh] bg-white/70 backdrop-blur-2xl rounded-2xl shadow-2xl overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-2xl font-extrabold font-['Manrope'] text-[#2d3337]">
                    Weekly Progress Form
                  </h3>
                  <p className="text-[#596063] text-sm">
                    Please provide accurate data for the past 7 days.
                  </p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-[#eaeef1] rounded-full text-[#596063] transition-colors"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                {/* Weight Input */}
                <div>
                  <label className="block text-sm font-bold font-['Manrope'] text-[#2d3337] mb-2">
                    Current Weight (kg)
                  </label>
                  <div className="relative">
                    <input
                      className="w-full bg-white border border-[#acb3b7]/15 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-[#4e45e4]/20 focus:border-[#4e45e4] outline-none transition-all font-bold text-lg"
                      placeholder="00.0"
                      step="0.1"
                      type="number"
                    />
                    <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[#596063] font-bold">
                      KG
                    </span>
                  </div>
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-bold font-['Manrope'] text-[#2d3337] mb-2">
                    Front Physique Photo
                  </label>
                  <div className="group relative border-2 border-dashed border-[#acb3b7]/30 rounded-2xl p-8 flex flex-col items-center justify-center hover:bg-[#4e45e4]/5 hover:border-[#4e45e4] transition-all cursor-pointer">
                    <span className="material-symbols-outlined text-4xl text-[#596063] group-hover:text-[#4e45e4] mb-2">
                      add_a_photo
                    </span>
                    <p className="text-sm font-medium text-[#596063] group-hover:text-[#2d3337]">
                      Click to upload or drag & drop
                    </p>
                    <p className="text-xs text-[#596063]/60 mt-1">PNG, JPG up to 10MB</p>
                    <input className="absolute inset-0 opacity-0 cursor-pointer" type="file" accept="image/*" />
                  </div>
                </div>

                {/* Feedback Textarea */}
                <div>
                  <label className="block text-sm font-bold font-['Manrope'] text-[#2d3337] mb-2">
                    Weekly Feedback
                  </label>
                  <textarea
                    className="w-full bg-white border border-[#acb3b7]/15 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-[#4e45e4]/20 focus:border-[#4e45e4] outline-none transition-all resize-none"
                    placeholder="How was your energy? Any struggles this week?"
                    rows={4}
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    className="w-full bg-[#4e45e4] py-4 rounded-full text-white font-['Manrope'] font-extrabold text-lg shadow-lg shadow-[#4e45e4]/25 hover:bg-[#4135d8] transition-all active:scale-[0.98]"
                    type="submit"
                  >
                    Submit Check-in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
