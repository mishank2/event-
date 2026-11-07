'use client';

import React from 'react';
import { useToastStore } from '@/store/useToastStore';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2.5 max-w-md w-full px-4 sm:px-0 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 p-4 rounded-3xl shadow-soft-lg border backdrop-blur-md transition-all duration-300 animate-in slide-in-from-bottom-5 ${
            toast.type === 'success'
              ? 'bg-white text-charcoal border-sand-border ring-1 ring-coral/20'
              : toast.type === 'error'
              ? 'bg-white text-charcoal border-red-200 ring-1 ring-red-400/20'
              : 'bg-white text-charcoal border-sand-border ring-1 ring-ochre/20'
          }`}
        >
          <div className="shrink-0 mt-0.5">
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-coral" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-500" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-ochre" />}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold tracking-wide font-serif text-charcoal">{toast.title}</h4>
            <p className="text-[11px] text-charcoal-muted mt-0.5 leading-relaxed">{toast.message}</p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="shrink-0 text-charcoal-muted hover:text-charcoal transition-colors p-1"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
