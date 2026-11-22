import React, { useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmResetModalProps {
  isOpen: boolean;
  completedCount: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmResetModal: React.FC<ConfirmResetModalProps> = ({
  isOpen, completedCount, onConfirm, onCancel,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onCancel(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }}
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="reset-title"
    >
      <div
        className="animate-scale-in surface-card w-full max-w-md rounded-3xl p-6 shadow-2xl border-red-200"
        style={{ boxShadow: '0 24px 60px rgba(220,38,38,0.12)', border: '1px solid #fca5a5' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-red-100 border border-red-200 flex items-center justify-center shrink-0">
              <AlertTriangle className="h-5 w-5 text-red-500" />
            </div>
            <h2 id="reset-title" className="font-display text-2xl tracking-wide text-[#1a1208] uppercase">
              Start New Game?
            </h2>
          </div>
          <button type="button" onClick={onCancel} aria-label="Cancel"
            className="p-1.5 rounded-lg text-amber-700/50 hover:text-[#1a1208] hover:bg-amber-100 transition-colors cursor-pointer">
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="text-sm leading-relaxed text-[#5c4a2e] mb-6">
          This will permanently erase{' '}
          <strong className="text-red-600">{completedCount} of 50 levels completed</strong> and restart
          from Level 1. This cannot be undone.
        </p>

        <div className="flex gap-2.5">
          <button type="button" onClick={onCancel}
            className="btn-ghost flex-1 px-4 py-2.5 rounded-2xl text-sm font-semibold cursor-pointer">
            Cancel
          </button>
          <button type="button" onClick={onConfirm}
            className="flex-1 px-4 py-2.5 rounded-2xl text-sm font-bold text-white cursor-pointer transition-all"
            style={{ background: 'linear-gradient(135deg, #dc2626, #b91c1c)', boxShadow: '0 4px 16px rgba(220,38,38,0.35)' }}>
            Reset Progress
          </button>
        </div>
      </div>
    </div>
  );
};
