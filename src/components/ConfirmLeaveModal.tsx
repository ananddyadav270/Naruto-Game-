import React, { useEffect } from 'react';
import { Home, X } from 'lucide-react';

interface ConfirmLeaveModalProps {
  isOpen: boolean;
  currentLevel: number;
  onConfirmLeave: () => void;
  onCancel: () => void;
}

export const ConfirmLeaveModal: React.FC<ConfirmLeaveModalProps> = ({
  isOpen, currentLevel, onConfirmLeave, onCancel,
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
      aria-labelledby="leave-title"
    >
      <div
        className="animate-scale-in surface-card w-full max-w-md rounded-3xl p-6 shadow-2xl"
        style={{ boxShadow: '0 24px 60px rgba(249,115,22,0.15)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-orange-100 border border-orange-200 flex items-center justify-center shrink-0">
              <Home className="h-5 w-5 text-orange-500" />
            </div>
            <h2 id="leave-title" className="font-display text-2xl tracking-wide text-[#1a1208] uppercase">
              Return Home?
            </h2>
          </div>
          <button type="button" onClick={onCancel} aria-label="Stay"
            className="p-1.5 rounded-lg text-amber-700/50 hover:text-[#1a1208] hover:bg-amber-100 transition-colors cursor-pointer">
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="text-sm leading-relaxed text-[#5c4a2e] mb-6">
          Your progress, score, coins and gems are saved automatically. You can resume{' '}
          <strong className="text-orange-600">Level {currentLevel}</strong> anytime from the dashboard.
        </p>

        <div className="flex gap-2.5">
          <button type="button" onClick={onCancel}
            className="btn-ghost flex-1 px-4 py-2.5 rounded-2xl text-sm font-semibold cursor-pointer">
            Keep Playing
          </button>
          <button type="button" onClick={onConfirmLeave}
            className="btn-primary flex-1 px-4 py-2.5 rounded-2xl text-sm font-bold cursor-pointer text-center">
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
};
