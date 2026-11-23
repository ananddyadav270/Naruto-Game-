import React from 'react';
import { Home, RotateCcw, Shield, Sparkles } from 'lucide-react';
import { QuizQuestion } from '../types/quiz';
import { SharinganEmblem } from './ShinobiGraphics';

interface GameOverScreenProps {
  failedQuestion: QuizQuestion;
  completedCount: number;
  onRetry: () => void;
  onGoHome: () => void;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = ({
  failedQuestion,
  completedCount,
  onRetry,
  onGoHome,
}) => {
  const correctAnswer = failedQuestion.options[failedQuestion.correctIndex];

  return (
    <div
      className="animate-screen-enter w-full py-8 sm:py-12"
      style={{ minHeight: 'calc(100dvh - 64px)' }}
    >
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        {/* ── GAME OVER MAIN CARD ── */}
        <div className="surface-dark-card rounded-3xl overflow-hidden border border-red-500/30 shadow-2xl">
          {/* Top Failed Hero Section */}
          <div
            className="relative px-6 sm:px-8 py-10 text-center overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, #2b0808 0%, #450a0a 50%, #1f0707 100%)',
            }}
          >
            {/* Atmospheric Crimson Radial Glow */}
            <div
              className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-80 h-44 rounded-full opacity-40 blur-2xl"
              style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.7), transparent 70%)' }}
              aria-hidden="true"
            />

            <div className="relative z-10">
              {/* Dual Shattered Sharingan Seals */}
              <div className="flex items-center justify-center gap-4 mb-5">
                <SharinganEmblem size={52} shattered />
                <SharinganEmblem size={52} shattered />
              </div>

              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-red-300/80 mb-2">
                <Shield className="h-4 w-4" />
                <span>Chakra Depleted · Both Attempts Exhausted</span>
              </div>

              <h1 className="font-display text-4xl sm:text-6xl font-bold uppercase text-white tracking-wide">
                Trial Failed
              </h1>

              <p className="mt-2 text-red-200/80 text-sm sm:text-base font-medium">
                You fell at <strong className="text-white font-bold">Level {failedQuestion.level}</strong>
                <span className="mx-2 text-red-300/40">·</span>
                {failedQuestion.difficulty} Stage
              </p>
            </div>
          </div>

          {/* Bottom Body */}
          <div className="p-6 sm:p-8 bg-[#15121e] space-y-5">
            {/* Safe Save Reassurance Pill */}
            <div className="rounded-2xl bg-white/5 border border-white/10 p-4 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-emerald-400 mb-0.5 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Progress Safely Saved</span>
                </div>
                <div className="text-xs text-white/60">
                  All previously conquered levels remain unlocked and intact.
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="font-mono text-xl font-bold text-emerald-400 tabular-nums">
                  {completedCount}/50
                </div>
                <div className="text-[10px] text-white/40 uppercase font-semibold">Cleared</div>
              </div>
            </div>

            {/* Question & Revealed Correct Answer (Warm Cream Contrast) */}
            <div className="surface-cream-card rounded-2xl p-5 text-left shadow-lg">
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#854d0e] mb-2">
                Trial Question {failedQuestion.level} Review
              </div>

              <p className="text-sm sm:text-base font-bold text-[#1a1622] mb-4 leading-relaxed">
                {failedQuestion.question}
              </p>

              <div className="rounded-xl bg-emerald-50 border border-emerald-300 p-3 mb-3">
                <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 mb-0.5">
                  Correct Answer
                </div>
                <div className="text-base sm:text-lg font-bold text-emerald-950">
                  {correctAnswer}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#453728] leading-relaxed font-medium">
                {failedQuestion.explanation}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={onRetry}
                className="btn-primary flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl font-bold text-base cursor-pointer shadow-xl"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Retry Level {failedQuestion.level} (2 Fresh Attempts)</span>
              </button>

              <button
                type="button"
                onClick={onGoHome}
                className="btn-secondary inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-semibold text-base cursor-pointer"
              >
                <Home className="h-4 w-4" />
                <span>Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
