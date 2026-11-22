import React from 'react';
import { Home, RotateCcw, Shield } from 'lucide-react';
import { QuizQuestion } from '../types/quiz';
import { SharinganEmblem } from './ShinobiGraphics';

interface GameOverScreenProps {
  failedQuestion: QuizQuestion;
  completedCount: number;
  onRetry: () => void;
  onGoHome: () => void;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = ({
  failedQuestion, completedCount, onRetry, onGoHome,
}) => {
  const correctAnswer = failedQuestion.options[failedQuestion.correctIndex];

  return (
    <div className="animate-screen-enter w-full" style={{ background: '#f5ede0', minHeight: 'calc(100dvh - 64px)' }}>
      <div className="mx-auto max-w-2xl px-3 sm:px-5 py-8 sm:py-12">

        {/* ── Game Over Card ── */}
        <div className="surface-red rounded-3xl overflow-hidden shadow-2xl"
          style={{ boxShadow: '0 24px 60px rgba(220,38,38,0.2)' }}>

          {/* Top section - dark */}
          <div className="relative px-6 sm:px-8 py-10 text-center overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #450a0a, #7f1d1d, #991b1b)' }}>
            {/* Glow */}
            <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-72 h-36 rounded-full opacity-30"
              style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.6), transparent 70%)' }} aria-hidden="true" />

            <div className="relative z-10">
              <div className="flex items-center justify-center gap-4 mb-5">
                <SharinganEmblem size={48} shattered />
                <SharinganEmblem size={48} shattered />
              </div>

              <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-red-200/60 mb-2">
                <Shield className="h-3.5 w-3.5" />
                <span>Both Attempts Exhausted</span>
              </div>

              <h1 className="font-display text-5xl sm:text-6xl font-bold uppercase text-white tracking-wide">
                Game Over
              </h1>
              <p className="mt-2 text-red-200/70 text-sm sm:text-base">
                You fell at <strong className="text-red-300">Level {failedQuestion.level}</strong>
                <span className="mx-1.5 text-red-200/30">·</span>
                {failedQuestion.difficulty}
              </p>
            </div>
          </div>

          {/* Bottom section - warm */}
          <div className="bg-gradient-to-b from-red-50 to-orange-50 px-5 sm:px-8 pb-8 pt-5">

            {/* Progress Saved */}
            <div className="surface-card rounded-2xl p-4 flex items-center justify-between gap-4 mb-4">
              <div>
                <div className="text-xs font-bold text-emerald-700 mb-0.5">Progress Safely Saved</div>
                <div className="text-sm text-[#5c4a2e]">All previously cleared levels remain unlocked.</div>
              </div>
              <div className="text-right shrink-0">
                <div className="font-display text-2xl font-bold text-emerald-700 tabular-nums">{completedCount}/50</div>
                <div className="text-xs text-amber-700/50">Completed</div>
              </div>
            </div>

            {/* Question + Correct Answer */}
            <div className="surface-card rounded-2xl p-4 sm:p-5 mb-5">
              <div className="text-[10px] font-bold uppercase tracking-widest text-amber-700/50 mb-1.5">
                Question {failedQuestion.level}
              </div>
              <p className="text-sm sm:text-base font-semibold text-[#1a1208] mb-4 leading-snug">
                {failedQuestion.question}
              </p>

              <div className="surface-emerald rounded-xl p-3 mb-3">
                <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 mb-1">Correct Answer</div>
                <div className="text-base sm:text-lg font-bold text-[#1a1208]">{correctAnswer}</div>
              </div>

              <p className="text-xs sm:text-sm text-[#5c4a2e] leading-relaxed">{failedQuestion.explanation}</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-2.5">
              <button type="button" onClick={onRetry}
                className="btn-primary flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl font-bold text-base cursor-pointer">
                <RotateCcw className="h-4 w-4 shrink-0" />
                <span>Retry Level {failedQuestion.level}</span>
              </button>
              <button type="button" onClick={onGoHome}
                className="btn-ghost inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-base cursor-pointer">
                <Home className="h-4 w-4 shrink-0" />
                <span>Home</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
