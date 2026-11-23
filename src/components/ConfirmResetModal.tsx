import React, { useEffect } from 'react';
import { AlertTriangle, RotateCcw, X } from 'lucide-react';

interface ConfirmResetModalProps {
  isOpen: boolean;
  completedCount: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmResetModal: React.FC<ConfirmResetModalProps> = ({
  isOpen,
  completedCount,
  onConfirm,
  onCancel,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="reset-title"
    >
      <div
        className="animate-modal-enter surface-dark-card w-full max-w-md rounded-3xl p-6 sm:p-7 shadow-2xl border border-red-500/30"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center shrink-0">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            <div>
              <h2 id="reset-title" className="font-display text-2xl font-bold tracking-wide text-white uppercase">
                Restart Shinobi Run?
              </h2>
              <span className="text-xs text-red-300/80 font-medium">Irreversible Action</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onCancel}
            aria-label="Cancel"
            className="p-1.5 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="text-sm leading-relaxed text-white/70 mb-6 font-medium">
          This will reset your trial progression back to Level 1 and clear your completed levels record (
          <strong className="text-red-400 font-bold">{completedCount} of 50 levels completed</strong>). Your custom profile appearance will be kept.
        </p>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary flex-1 px-4 py-3 rounded-2xl text-sm font-semibold cursor-pointer text-center"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 px-4 py-3 rounded-2xl text-sm font-bold text-white cursor-pointer transition-all bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 shadow-lg shadow-red-600/30 text-center"
          >
            Confirm Reset
          </button>
        </div>
      </div>
    </div>
  );
};
