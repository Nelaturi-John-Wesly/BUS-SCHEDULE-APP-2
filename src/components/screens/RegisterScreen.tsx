import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react';

interface RegisterScreenProps {
  onBack: () => void;
  onRegisterSuccess: (name: string) => void;
  onNavigateLogin: () => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  onBack,
  onRegisterSuccess,
  onNavigateLogin,
}) => {
  const [fullName, setFullName] = useState('Satya Nadella');
  const [email, setEmail] = useState('satya@example.com');
  const [mobileNumber, setMobileNumber] = useState('+91 98765 43210');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!mobileNumber.trim()) {
      setError('Please enter your mobile number.');
      return;
    }
    if (password.length < 6) {
      setError('Password should be at least 6 characters.');
      return;
    }
    setError('');
    const firstName = fullName.trim().split(' ')[0];
    onRegisterSuccess(firstName);
  };

  return (
    <div id="register-screen" className="flex flex-col h-full bg-slate-50 select-none">
      {/* Top App Bar */}
      <div className="flex items-center px-4 py-3.5 bg-indigo-900 text-white shadow-md">
        <button
          id="btn-register-back"
          onClick={onBack}
          aria-label="Back"
          className="p-1.5 -ml-1 rounded-full hover:bg-white/10 active:bg-white/20 transition cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="ml-3 text-base font-bold tracking-wide">Register</h2>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Create Account
          </h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">
            Register to get Started
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-3.5">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Full Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </span>
              <input
                id="input-reg-name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-white rounded-xl border border-slate-300 focus:border-indigo-900 focus:ring-2 focus:ring-indigo-900/20 text-slate-900 outline-none transition shadow-2xs"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </span>
              <input
                id="input-reg-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-white rounded-xl border border-slate-300 focus:border-indigo-900 focus:ring-2 focus:ring-indigo-900/20 text-slate-900 outline-none transition shadow-2xs"
              />
            </div>
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Mobile Number
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Phone className="w-4 h-4" />
              </span>
              <input
                id="input-reg-mobile"
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-white rounded-xl border border-slate-300 focus:border-indigo-900 focus:ring-2 focus:ring-indigo-900/20 text-slate-900 outline-none transition shadow-2xs"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </span>
              <input
                id="input-reg-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-11 py-2.5 text-sm bg-white rounded-xl border border-slate-300 focus:border-indigo-900 focus:ring-2 focus:ring-indigo-900/20 text-slate-900 outline-none transition shadow-2xs"
              />
              <button
                type="button"
                id="btn-toggle-reg-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Primary Register Button */}
          <button
            type="submit"
            id="btn-submit-register"
            className="w-full !mt-6 py-3.5 rounded-xl bg-indigo-900 hover:bg-indigo-800 text-white font-bold text-sm tracking-wider uppercase shadow-md shadow-indigo-950/20 active:scale-[0.99] transition cursor-pointer"
          >
            REGISTER
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-8 text-center text-xs text-slate-600">
          <span>Already have account? </span>
          <button
            id="link-go-to-login"
            onClick={onNavigateLogin}
            className="font-bold text-indigo-900 hover:underline cursor-pointer"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
