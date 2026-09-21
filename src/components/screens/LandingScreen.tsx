import React from 'react';
import { Bus, ShieldCheck, ArrowRight } from 'lucide-react';

interface LandingScreenProps {
  onNavigateLogin: () => void;
  onNavigateRegister: () => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({
  onNavigateLogin,
  onNavigateRegister,
}) => {
  return (
    <div
      id="landing-screen"
      className="flex flex-col justify-between h-full px-6 py-10 bg-linear-to-b from-indigo-50/50 via-white to-slate-50 select-none"
    >
      {/* Top spacer */}
      <div className="flex justify-center pt-4">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Official Transit Network</span>
        </div>
      </div>

      {/* Main Brand & Hero */}
      <div className="flex flex-col items-center text-center my-auto">
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-3xl bg-linear-to-tr from-indigo-900 to-indigo-700 text-white flex items-center justify-center shadow-xl shadow-indigo-900/20 ring-4 ring-indigo-100">
            <Bus className="w-12 h-12 stroke-[1.8]" />
          </div>
          <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-md bg-teal-600 text-white text-[10px] font-bold tracking-wider uppercase shadow-xs">
            M3 Live
          </div>
        </div>

        <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
          Bus Schedule App
        </h1>
        <p className="text-slate-500 font-medium text-base max-w-xs">
          Your Journey, Our Priority
        </p>

        <div className="mt-8 flex items-center gap-6 text-xs text-slate-400 font-medium">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Live Tracking
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> Instant Booking
          </span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span> Seat Choice
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 pb-2 w-full">
        <button
          id="btn-landing-login"
          onClick={onNavigateLogin}
          className="w-full py-3.5 px-6 rounded-xl bg-indigo-900 hover:bg-indigo-800 text-white font-bold text-sm tracking-wider uppercase shadow-md shadow-indigo-950/20 active:scale-[0.99] transition cursor-pointer flex items-center justify-center gap-2"
        >
          <span>LOGIN</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          id="btn-landing-register"
          onClick={onNavigateRegister}
          className="w-full py-3.5 px-6 rounded-xl border-2 border-indigo-900 text-indigo-900 hover:bg-indigo-50 font-bold text-sm tracking-wider uppercase active:scale-[0.99] transition cursor-pointer"
        >
          REGISTER
        </button>

        <p className="text-[11px] text-center text-slate-400 pt-1">
          Material Design 3 • Multi-Screen Flutter Spec
        </p>
      </div>
    </div>
  );
};
