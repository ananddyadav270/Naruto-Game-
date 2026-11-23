import React, { useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  Home,
  Shield,
  Sparkles,
  Zap,
} from 'lucide-react';
import { getStageForLevel } from '../data/questions';
import { QuizQuestion } from '../types/quiz';
import { soundEngine } from '../utils/sound';
import { ChakraAuraBurst, ImageWithFallback, SharinganEmblem } from './ShinobiGraphics';

interface QuestionScreenProps {
  question: QuizQuestion;
  completedCount: number;
  onLevelComplete: (level: number, attemptSolved: 1 | 2) => void;
  onWrongAttempt: () => void;
  onShowLevelComplete: () => void;
  onGameOver: (failedLevel: number) => void;
  onRequestHome: () => void;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D'] as const;

export const QuestionScreen: React.FC<QuestionScreenProps> = ({
  question,
  completedCount,
  onLevelComplete,
  onWrongAttempt,
  onShowLevelComplete,
  onGameOver,
  onRequestHome,
}) => {
  const [attemptsRemaining, setAttemptsRemaining] = useState<2 | 1 | 0>(2);
  const [eliminatedIndices, setEliminatedIndices] = useState<number[]>([]);
  const [shakingIndex, setShakingIndex] = useState<number | null>(null);
  const [solvedState, setSolvedState] = useState<'IDLE' | 'CORRECT' | 'FAILED'>('IDLE');
  const [feedbackBanner, setFeedbackBanner] = useState<string | null>(null);
  const transitionTimerRef = useRef<number | null>(null);
  const failTimerRef = useRef<number | null>(null);

  const stage = getStageForLevel(question.level);

  useEffect(() => {
    setAttemptsRemaining(2);
    setEliminatedIndices([]);
    setShakingIndex(null);
    setSolvedState('IDLE');
    setFeedbackBanner(null);
    return () => {
      if (transitionTimerRef.current) window.clearTimeout(transitionTimerRef.current);
      if (failTimerRef.current) window.clearTimeout(failTimerRef.current);
    };
  }, [question.level]);

  const handleSelectOption = (idx: number) => {
    if (solvedState !== 'IDLE') return;
    if (eliminatedIndices.includes(idx)) return;
    const isCorrect = idx === question.correctIndex;
    const attemptUsed: 1 | 2 = attemptsRemaining === 2 ? 1 : 2;

    if (isCorrect) {
      setSolvedState('CORRECT');
      setFeedbackBanner(
        attemptUsed === 1
          ? '🎯 Bullseye! 2× First-Attempt Multiplier unlocked (+200 pts, +20 coins)'
          : '⚡ Jutsu Successful! Recovered on second attempt (+100 pts, +10 coins)'
      );
      soundEngine.playCorrect(attemptUsed === 1);
      window.setTimeout(() => soundEngine.playCoinSparkle(), 150);
      onLevelComplete(question.level, attemptUsed);
      transitionTimerRef.current = window.setTimeout(() => onShowLevelComplete(), 850);
      return;
    }

    onWrongAttempt();
    if (attemptsRemaining === 2) {
      setAttemptsRemaining(1);
      setEliminatedIndices((prev) => [...prev, idx]);
      setShakingIndex(idx);
      setFeedbackBanner('❌ Incorrect jutsu! 1 attempt remaining — observe carefully.');
      soundEngine.playWrong();
      window.setTimeout(() => setShakingIndex(null), 500);
    } else {
      setAttemptsRemaining(0);
      setEliminatedIndices((prev) => [...prev, idx]);
      setShakingIndex(idx);
      setSolvedState('FAILED');
      setFeedbackBanner('💥 Both attempts exhausted. Your chakra has been depleted.');
      soundEngine.playGameOver();
      failTimerRef.current = window.setTimeout(() => onGameOver(question.level), 750);
    }
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (solvedState !== 'IDLE') return;
      const key = e.key.toUpperCase();
      const map: Record<string, number> = {
        '1': 0,
        '2': 1,
        '3': 2,
        '4': 3,
        A: 0,
        B: 1,
        C: 2,
        D: 3,
      };
      if (key in map) handleSelectOption(map[key]);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  const progressPct = Math.round((completedCount / 50) * 100);
  const levelProgressPct = Math.round((question.level / 50) * 100);
  const isFirst = attemptsRemaining === 2;

  return (
    <div
      key={question.level}
      className="animate-screen-enter w-full py-4 sm:py-6"
      style={{ minHeight: 'calc(100dvh - 64px)' }}
    >
      <div className="mx-auto max-w-4xl px-3 sm:px-6">
        {/* ── TOP COMBAT HUD ── */}
        <div className="surface-dark-card rounded-2xl p-3.5 sm:p-4 mb-4 border border-white/12 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Left: Home + Level Badge */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <button
                type="button"
                onClick={onRequestHome}
                className="btn-secondary inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold"
              >
                <Home className="h-3.5 w-3.5 text-orange-400" />
                <span>Dashboard</span>
              </button>

              <div className="flex items-center gap-2">
                <span className="font-display text-2xl sm:text-3xl font-bold uppercase text-white font-mono tabular-nums tracking-wide">
                  Level {question.level}
                </span>
                <span className="text-white/20">|</span>
                <span className="rounded-md bg-orange-500/15 border border-orange-500/30 px-2 py-0.5 text-xs font-bold text-orange-400">
                  {question.difficulty}
                </span>
                <span className="hidden sm:inline text-xs text-white/50 font-medium">
                  {stage.title}
                </span>
              </div>
            </div>

            {/* Right: Sharingan Attempts Counter */}
            <div
              className={`flex items-center gap-2.5 rounded-xl px-3 py-1.5 border transition-all ${
                attemptsRemaining === 2
                  ? 'bg-white/5 border-white/15'
                  : attemptsRemaining === 1
                  ? 'bg-amber-500/20 border-amber-400/50 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                  : 'bg-red-500/20 border-red-500/60 shadow-[0_0_15px_rgba(239,68,68,0.4)]'
              }`}
              aria-live="polite"
            >
              <div className="flex items-center gap-1.5">
                <SharinganEmblem
                  size={24}
                  spinning={attemptsRemaining >= 1}
                  shattered={attemptsRemaining < 1}
                />
                <SharinganEmblem
                  size={24}
                  spinning={attemptsRemaining === 2}
                  shattered={attemptsRemaining < 2}
                />
              </div>

              <div className="text-xs font-bold">
                {attemptsRemaining === 2 && (
                  <span className="text-emerald-400">2 Attempts Left</span>
                )}
                {attemptsRemaining === 1 && (
                  <span className="text-amber-300 animate-pulse">Final Attempt!</span>
                )}
                {attemptsRemaining === 0 && (
                  <span className="text-red-400">Trial Depleted</span>
                )}
              </div>
            </div>
          </div>

          {/* Progress & Reward Multiplier Bar */}
          <div className="mt-3 pt-3 border-t border-white/8">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-white/60">
                Cleared:{' '}
                <strong className="text-white font-mono font-bold">
                  {completedCount}/50
                </strong>{' '}
                ({progressPct}%)
              </span>

              <span
                className={`flex items-center gap-1.5 font-bold ${
                  isFirst ? 'text-amber-300' : 'text-orange-400'
                }`}
              >
                <Zap className="h-3.5 w-3.5" />
                <span>
                  {isFirst
                    ? '2X First-Attempt Bonus Active (+200 pts · 20 coins)'
                    : 'Second Attempt (+100 pts · 10 coins)'}
                </span>
              </span>
            </div>

            <div className="progress-track h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-400 rounded-full transition-all duration-700"
                style={{ width: `${Math.max(levelProgressPct, 2)}%` }}
              />
            </div>
          </div>
        </div>

        {/* ── QUESTION CARD (WARM CREAM HIGH CONTRAST) ── */}
        <div className="surface-cream-card rounded-3xl overflow-hidden shadow-2xl relative">
          {/* Stage Art Banner */}
          <div className="relative h-20 sm:h-24 overflow-hidden border-b border-[#e2d2b7]">
            <ImageWithFallback
              src={stage.imageSrc}
              alt={stage.title}
              className="h-full w-full object-cover opacity-75"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(15,13,21,0.2) 0%, rgba(253,250,243,0.95) 100%)',
              }}
            />
            <div className="absolute bottom-2.5 inset-x-0 px-5 sm:px-7 flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#6b5c46]">
                {stage.title} · {stage.japaneseSubtitle}
              </span>
              <span className="text-xs font-mono font-bold text-[#c2410c] bg-orange-100/90 px-2.5 py-0.5 rounded-full border border-orange-200">
                Trial {question.level} of 50
              </span>
            </div>
          </div>

          {/* Chakra Visual Effect overlays */}
          {solvedState === 'CORRECT' && <ChakraAuraBurst color="emerald" />}
          {solvedState === 'FAILED' && <ChakraAuraBurst color="red" />}

          {/* Question & Options Area */}
          <div className="relative z-10 px-5 sm:px-8 py-6 sm:py-8">
            {/* Question Text */}
            <h2 className="text-lg sm:text-2xl font-bold leading-relaxed text-[#1a1622] text-balance mb-6 sm:mb-8">
              {question.question}
            </h2>

            {/* Answer Options Grid */}
            <div className="grid grid-cols-1 gap-3 sm:gap-3.5" role="list">
              {question.options.map((optionText, idx) => {
                const isEliminated = eliminatedIndices.includes(idx);
                const isShaking = shakingIndex === idx;
                const isCorrectChoice =
                  solvedState === 'CORRECT' && idx === question.correctIndex;
                const isDisabled = isEliminated || solvedState !== 'IDLE';

                let cardClass = 'option-idle';
                let letterClass =
                  'bg-amber-100/80 text-amber-900 border border-amber-300 group-hover:bg-orange-500 group-hover:border-orange-500 group-hover:text-white';

                if (isCorrectChoice) {
                  cardClass = 'option-correct';
                  letterClass = 'bg-emerald-600 text-white border border-emerald-500';
                } else if (isEliminated) {
                  cardClass = 'option-wrong';
                  letterClass = 'bg-red-200 text-red-800 border border-red-400';
                } else if (solvedState !== 'IDLE') {
                  cardClass = 'option-disabled';
                  letterClass = 'bg-gray-200 text-gray-500 border border-gray-300';
                }

                return (
                  <button
                    key={optionText}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => handleSelectOption(idx)}
                    role="listitem"
                    className={`group w-full min-h-[58px] sm:min-h-[66px] rounded-2xl px-4 sm:px-5 py-3.5 text-left flex items-center gap-3.5 sm:gap-4 cursor-pointer ${cardClass} ${
                      isShaking ? 'animate-wrong-shake' : ''
                    }`}
                  >
                    {/* Option Letter Badge */}
                    <span
                      className={`flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl font-mono text-sm sm:text-base font-bold transition-all shadow-sm ${letterClass}`}
                    >
                      {OPTION_LETTERS[idx]}
                    </span>

                    {/* Option Text */}
                    <span className="flex-1 text-sm sm:text-base font-semibold leading-snug">
                      {optionText}
                    </span>

                    {/* Result Icons */}
                    {isCorrectChoice && (
                      <CheckCircle2 className="h-6 w-6 shrink-0 text-emerald-600 animate-bounce-in" />
                    )}
                    {isEliminated && (
                      <AlertCircle className="h-6 w-6 shrink-0 text-red-500" />
                    )}

                    {/* Keyboard Shortcut Key Indicator */}
                    {!isDisabled && solvedState === 'IDLE' && (
                      <kbd className="hidden lg:flex h-6 px-2 items-center justify-center rounded-lg text-[11px] font-mono text-amber-800/50 shrink-0 bg-amber-50 border border-amber-200 shadow-xs">
                        {idx + 1}
                      </kbd>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Live Feedback Banner */}
            {feedbackBanner && (
              <div
                key={feedbackBanner}
                role="status"
                aria-live="polite"
                className={`animate-screen-enter mt-5 rounded-2xl border p-4 flex items-center gap-3 text-sm font-bold shadow-md ${
                  solvedState === 'CORRECT'
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                    : solvedState === 'FAILED'
                    ? 'bg-red-50 border-red-300 text-red-800'
                    : 'bg-amber-50 border-amber-300 text-amber-800'
                }`}
              >
                {solvedState === 'CORRECT' ? (
                  <Sparkles className="h-5 w-5 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />
                )}
                <span>{feedbackBanner}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
