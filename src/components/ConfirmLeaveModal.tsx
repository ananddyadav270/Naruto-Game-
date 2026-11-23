import React, { useEffect } from 'react';
import { Home, X } from 'lucide-react';

interface ConfirmLeaveModalProps {
  isOpen: boolean;
  currentLevel: number;
  onConfirmLeave: () => void;
  onCancel: () => void;
}

export const ConfirmLeaveModal: React.FC<ConfirmLeaveModalProps> = ({
  isOpen,
  currentLevel,
  onConfirmLeave,
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="leave-title"
    >
      <div
        className="animate-modal-enter surface-dark-card w-full max-w-md rounded-3xl p-6 sm:p-7 shadow-2xl border border-white/15"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center shrink-0">
              <Home className="h-5 w-5 text-orange-400" />
            </div>
            <div>
              <h2 id="leave-title" className="font-display text-2xl font-bold tracking-wide text-white uppercase">
                Return to Dashboard?
              </h2>
              <span className="text-xs text-white/50">Current Trial: Level {currentLevel}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onCancel}
            aria-label="Stay"
            className="p-1.5 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="text-sm leading-relaxed text-white/70 mb-6 font-medium">
          Your progress, score, coins, and gems are saved automatically. You can jump back into{' '}
          <strong className="text-orange-400 font-bold">Level {currentLevel}</strong> anytime from the mission map.
        </p>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary flex-1 px-4 py-3 rounded-2xl text-sm font-semibold cursor-pointer text-center"
          >
            Keep Playing
          </button>
          <button
            type="button"
            onClick={onConfirmLeave}
            className="btn-primary flex-1 px-4 py-3 rounded-2xl text-sm font-bold cursor-pointer text-center"
          >
            Leave to Home
          </button>
        </div>
      </div>
    </div>
  );
};
