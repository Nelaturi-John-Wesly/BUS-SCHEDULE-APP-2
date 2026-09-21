import React, { useState } from 'react';
import { FLUTTER_DART_CODE } from '../data/flutterSourceCode';
import {
  Code,
  Copy,
  Check,
  Download,
  Smartphone,
  Maximize2,
  Minimize2,
  RotateCcw,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface FlutterCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FlutterCodeModal: React.FC<FlutterCodeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(FLUTTER_DART_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([FLUTTER_DART_CODE], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'main.dart';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      id="flutter-code-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-3 md:p-6"
    >
      <div
        id="flutter-code-modal-container"
        className="relative flex flex-col w-full max-w-5xl h-[88vh] bg-slate-900 text-slate-100 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-slate-800/90 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-wide">
                  Pure Dart / Flutter Source Code
                </h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 font-mono font-medium">
                  Material 3 • main.dart
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Production-ready Flutter application code with all 9 screens, navigation routes, and state.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-copy-dart"
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 transition cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy Dart Code'}</span>
            </button>
            <button
              id="btn-download-dart"
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download main.dart</span>
            </button>
            <button
              id="btn-close-code-modal"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer ml-1"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Code Viewer */}
        <div className="flex-1 overflow-auto p-4 bg-[#0B1120] font-mono text-xs md:text-sm text-slate-300 leading-relaxed selection:bg-indigo-700 selection:text-white">
          <pre className="overflow-x-auto whitespace-pre">
            <code>{FLUTTER_DART_CODE}</code>
          </pre>
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between px-5 py-3 bg-slate-800/80 border-t border-slate-700/80 text-xs text-slate-400">
          <span>Ready to copy into any Flutter project: <code>flutter create bus_app && cp main.dart lib/</code></span>
          <span className="text-teal-400 font-medium">9 Screens • Pure Dart • Material 3</span>
        </div>
      </div>
    </div>
  );
};
