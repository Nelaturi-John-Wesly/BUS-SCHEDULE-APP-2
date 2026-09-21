import React, { useState } from 'react';
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface LoginScreenProps {
  onBack: () => void;
  onLoginSuccess: (name: string) => void;
  onNavigateRegister: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onBack,
  onLoginSuccess,
  onNavigateRegister,
}) => {
  const [identifier, setIdentifier] = useState('satya@example.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [forgotMsg, setForgotMsg] = useState('');

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!identifier.trim()) {
      setError('Please enter your email or mobile number.');
      return;
    }
    if (!password.trim()) {
      setError('Please enter your password.');
      return;
    }
    setError('');
    const displayName = identifier.includes('@')
      ? identifier.split('@')[0].charAt(0).toUpperCase() + identifier.split('@')[0].slice(1)
      : 'Satya';
    onLoginSuccess(displayName || 'Satya');
  };

  const handleSocialLogin = (provider: string) => {
    onLoginSuccess('Satya');
  };

  return (
    <div id="login-screen" className="flex flex-col h-full bg-slate-50 select-none">
      {/* Top App Bar */}
      <div className="flex items-center px-4 py-3.5 bg-indigo-900 text-white shadow-md">
        <button
          id="btn-login-back"
          onClick={onBack}
          aria-label="Back"
          className="p-1.5 -ml-1 rounded-full hover:bg-white/10 active:bg-white/20 transition cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="ml-3 text-base font-bold tracking-wide">Login</h2>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Welcome Back!
          </h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">
            Login to Continue
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
            {error}
          </div>
        )}

        {forgotMsg && (
          <div className="mb-4 p-3 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
            {forgotMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email or Mobile Number */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Email or Mobile Number
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </span>
              <input
                id="input-login-identifier"
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="e.g. satya@example.com"
                className="w-full pl-10 pr-4 py-3 text-sm bg-white rounded-xl border border-slate-300 focus:border-indigo-900 focus:ring-2 focus:ring-indigo-900/20 text-slate-900 outline-none transition shadow-2xs"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </span>
              <input
                id="input-login-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-11 py-3 text-sm bg-white rounded-xl border border-slate-300 focus:border-indigo-900 focus:ring-2 focus:ring-indigo-900/20 text-slate-900 outline-none transition shadow-2xs"
              />
              <button
                type="button"
                id="btn-toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end pt-0.5">
            <button
              type="button"
              id="link-forgot-password"
              onClick={() => setForgotMsg('Reset code sent to your registered email.')}
              className="text-xs font-semibold text-indigo-800 hover:text-indigo-950 transition cursor-pointer"
            >
              Forgot Password?
            </button>
          </div>

          {/* Primary Login Button */}
          <button
            type="submit"
            id="btn-submit-login"
            className="w-full mt-4 py-3.5 rounded-xl bg-indigo-900 hover:bg-indigo-800 text-white font-bold text-sm tracking-wider uppercase shadow-md shadow-indigo-950/20 active:scale-[0.99] transition cursor-pointer"
          >
            LOGIN
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-7">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-300" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-3 bg-slate-50 text-slate-500 font-medium">
              or login with
            </span>
          </div>
        </div>

        {/* Social Buttons: Google 'G' & Facebook 'F' */}
        <div className="flex justify-center items-center gap-5">
          <button
            type="button"
            id="btn-social-google"
            onClick={() => handleSocialLogin('Google')}
            className="w-12 h-12 rounded-full bg-white border border-slate-200 shadow-2xs flex items-center justify-center hover:bg-slate-50 active:scale-95 transition cursor-pointer group"
          >
            <span className="text-red-600 font-black text-lg group-hover:scale-110 transition">
              G
            </span>
          </button>
          <button
            type="button"
            id="btn-social-facebook"
            onClick={() => handleSocialLogin('Facebook')}
            className="w-12 h-12 rounded-full bg-white border border-slate-200 shadow-2xs flex items-center justify-center hover:bg-slate-50 active:scale-95 transition cursor-pointer group"
          >
            <span className="text-blue-600 font-black text-lg group-hover:scale-110 transition">
              F
            </span>
          </button>
        </div>

        {/* Footer Link */}
        <div className="mt-8 text-center text-xs text-slate-600">
          <span>Don't have account? </span>
          <button
            id="link-go-to-register"
            onClick={onNavigateRegister}
            className="font-bold text-indigo-900 hover:underline cursor-pointer"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};
