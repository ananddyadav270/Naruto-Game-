import React, { useEffect, useRef, useState } from 'react';
import { AlertCircle, CheckCircle2, Home, Zap } from 'lucide-react';
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
  const [shakingIndex, setShakingIndex]           = useState<number | null>(null);
  const [solvedState, setSolvedState]             = useState<'IDLE' | 'CORRECT' | 'FAILED'>('IDLE');
  const [feedbackBanner, setFeedbackBanner]       = useState<string | null>(null);
  const transitionTimerRef = useRef<number | null>(null);
  const failTimerRef       = useRef<number | null>(null);

  const stage = getStageForLevel(question.level);

  useEffect(() => {
    setAttemptsRemaining(2);
    setEliminatedIndices([]);
    setShakingIndex(null);
    setSolvedState('IDLE');
    setFeedbackBanner(null);
    return () => {
      if (transitionTimerRef.current) window.clearTimeout(transitionTimerRef.current);
      if (failTimerRef.current)       window.clearTimeout(failTimerRef.current);
    };
  }, [question.level]);

  const handleSelectOption = (idx: number) => {
    if (solvedState !== 'IDLE') return;
    if (eliminatedIndices.includes(idx)) return;
    const isCorrect    = idx === question.correctIndex;
    const attemptUsed: 1 | 2 = attemptsRemaining === 2 ? 1 : 2;

    if (isCorrect) {
      setSolvedState('CORRECT');
      setFeedbackBanner(attemptUsed === 1 ? '🎯 Perfect hit! 2× Bonus activated.' : '⚡ Recovered on second attempt!');
      soundEngine.playCorrect(attemptUsed === 1);
      window.setTimeout(() => soundEngine.playCoinSparkle(), 160);
      onLevelComplete(question.level, attemptUsed);
      transitionTimerRef.current = window.setTimeout(() => onShowLevelComplete(), 820);
      return;
    }

    onWrongAttempt();
    if (attemptsRemaining === 2) {
      setAttemptsRemaining(1);
      setEliminatedIndices((prev) => [...prev, idx]);
      setShakingIndex(idx);
      setFeedbackBanner('Not quite. 1 attempt remaining — think carefully!');
      soundEngine.playWrong();
      window.setTimeout(() => setShakingIndex(null), 500);
    } else {
      setAttemptsRemaining(0);
      setEliminatedIndices((prev) => [...prev, idx]);
      setShakingIndex(idx);
      setSolvedState('FAILED');
      setFeedbackBanner('Both attempts exhausted. The seals are shattered.');
      soundEngine.playGameOver();
      failTimerRef.current = window.setTimeout(() => onGameOver(question.level), 700);
    }
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (solvedState !== 'IDLE') return;
      const key = e.key.toUpperCase();
      const map: Record<string, number> = { '1': 0, '2': 1, '3': 2, '4': 3, A: 0, B: 1, C: 2, D: 3 };
      if (key in map) handleSelectOption(map[key]);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  const progressPct      = Math.round((completedCount / 50) * 100);
  const levelProgressPct = Math.round((question.level / 50) * 100);
  const isFirst          = attemptsRemaining === 2;

  return (
    <div key={question.level} className="animate-screen-enter w-full" style={{ background: '#f5ede0', minHeight: 'calc(100dvh - 64px)' }}>
      <div className="mx-auto max-w-3xl px-3 sm:px-5 py-4 sm:py-6">

        {/* ── HUD Card ── */}
        <div className="surface-card rounded-2xl p-3 sm:p-4 mb-4">
          <div className="flex flex-wrap items-center justify-between gap-2">

            {/* Left: Home + Level */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={onRequestHome}
                className="btn-ghost inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer whitespace-nowrap"
              >
                <Home className="h-3.5 w-3.5 text-orange-500 shrink-0" />
                <span>Home</span>
              </button>

              <div className="flex items-center gap-2">
                <span className="font-display text-2xl sm:text-3xl font-bold tracking-wide uppercase text-[#1a1208] font-mono tabular-nums">
                  Lv.{question.level}
                </span>
                <span className="hidden sm:inline text-amber-800/40">·</span>
                <span className="hidden sm:inline text-xs font-bold text-orange-600">{question.difficulty}</span>
                <span className="hidden md:inline text-amber-800/40">·</span>
                <span className="hidden md:inline text-xs text-amber-800/60">{stage.title}</span>
              </div>
            </div>

            {/* Right: Attempts */}
            <div
              className="flex items-center gap-2 rounded-xl px-3 py-2"
              style={{ background: attemptsRemaining === 1 ? 'linear-gradient(135deg, #fff7ed, #fed7aa)' : '#fdf8f0', border: `2px solid ${attemptsRemaining === 1 ? '#f97316' : '#e8d5b7'}` }}
              aria-live="polite"
            >
              <div className="flex items-center gap-1">
                <SharinganEmblem size={22} spinning={attemptsRemaining >= 1} shattered={attemptsRemaining < 1} />
                <SharinganEmblem size={22} spinning={attemptsRemaining === 2} shattered={attemptsRemaining < 2} />
              </div>
              <div className="text-xs font-bold whitespace-nowrap">
                {attemptsRemaining === 2 && <span className="text-[#5c4a2e]">2 Attempts</span>}
                {attemptsRemaining === 1 && <span className="text-orange-600">1 Attempt</span>}
                {attemptsRemaining === 0 && <span className="text-red-600">None Left</span>}
              </div>
            </div>
          </div>

          {/* Progress row */}
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs text-amber-800/50 mb-1.5">
              <span>Cleared: <strong className="text-[#5c4a2e] font-mono">{completedCount}/50</strong> ({progressPct}%)</span>
              <span className={`flex items-center gap-1 font-semibold ${isFirst ? 'text-orange-600' : 'text-amber-700'}`}>
                {isFirst && <Zap className="h-3 w-3" />}
                {isFirst ? '200 pts · 20 coins (2×)' : '100 pts · 10 coins'}
              </span>
            </div>
            <div className="progress-track h-2">
              <div className="h-full progress-fill-orange progress-bar-fill rounded-full transition-all duration-700"
                style={{ width: `${Math.max(levelProgressPct, 2)}%` }} />
            </div>
          </div>
        </div>

        {/* ── Question Card ── */}
        <div className="surface-card rounded-3xl overflow-hidden shadow-lg">
          {/* Stage banner */}
          <div className="relative h-20 sm:h-24 overflow-hidden">
            <ImageWithFallback src={stage.imageSrc} alt={stage.title} className="h-full w-full object-cover opacity-80" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(245,237,224,0.95))' }} />
            <div className="absolute bottom-2 inset-x-0 px-5 flex items-center justify-between">
              <span className="text-[10px] font-mono font-semibold text-amber-800/60">{stage.japaneseSubtitle}</span>
              <span className="text-[10px] font-mono text-amber-800/50 tabular-nums">Q {question.level} of 50</span>
            </div>
          </div>

          {/* Chakra FX */}
          {solvedState === 'CORRECT' && <ChakraAuraBurst color="emerald" />}
          {solvedState === 'FAILED'  && <ChakraAuraBurst color="red" />}

          {/* Content */}
          <div className="relative z-10 px-5 sm:px-7 pb-7 sm:pb-9 pt-5">

            {/* Question text */}
            <h2 className="text-base sm:text-xl lg:text-2xl font-semibold leading-snug text-[#1a1208] text-balance mb-5 sm:mb-6">
              {question.question}
            </h2>

            {/* Options */}
            <div className="grid grid-cols-1 gap-2.5 sm:gap-3" role="list">
              {question.options.map((optionText, idx) => {
                const isEliminated    = eliminatedIndices.includes(idx);
                const isShaking       = shakingIndex === idx;
                const isCorrectChoice = solvedState === 'CORRECT' && idx === question.correctIndex;
                const isDisabled      = isEliminated || solvedState !== 'IDLE';

                let cardCls = 'answer-idle';
                let badgeCls = 'bg-amber-100 text-amber-800 border border-amber-200 group-hover:bg-orange-100 group-hover:border-orange-400 group-hover:text-orange-700';

                if (isCorrectChoice) {
                  cardCls  = 'answer-correct';
                  badgeCls = 'bg-emerald-500 text-white border border-emerald-400';
                } else if (isEliminated) {
                  cardCls  = 'answer-wrong';
                  badgeCls = 'bg-red-200 text-red-700 border border-red-300';
                } else if (solvedState !== 'IDLE') {
                  cardCls  = 'answer-disabled';
                  badgeCls = 'bg-amber-50 text-amber-400 border border-amber-100';
                }

                return (
                  <button
                    key={optionText}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => handleSelectOption(idx)}
                    role="listitem"
                    className={`group w-full min-h-[52px] sm:min-h-[62px] rounded-2xl border px-3 sm:px-4 py-3 sm:py-3.5 text-left flex items-center gap-3 sm:gap-4 ${cardCls} ${
                      isShaking ? 'animate-wrong-shake' : ''
                    }`}
                  >
                    <span className={`flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg font-mono text-sm font-bold transition-all ${badgeCls}`}>
                      {OPTION_LETTERS[idx]}
                    </span>
                    <span className="flex-1 text-sm sm:text-base font-semibold leading-snug">{optionText}</span>
                    {isCorrectChoice && <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500 animate-bounce-in" />}
                    {isEliminated    && <AlertCircle  className="h-5 w-5 shrink-0 text-red-400" />}
                    {!isDisabled && solvedState === 'IDLE' && (
                      <kbd className="hidden lg:flex h-5 w-5 items-center justify-center rounded text-[10px] font-mono text-amber-600/50 shrink-0 bg-amber-50 border border-amber-200">
                        {OPTION_LETTERS[idx]}
                      </kbd>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback Banner */}
            {feedbackBanner && (
              <div
                key={feedbackBanner}
                role="status"
                aria-live="polite"
                className={`animate-slide-up mt-4 rounded-2xl border p-3.5 flex items-start gap-2.5 text-sm font-semibold ${
                  solvedState === 'CORRECT'
                    ? 'surface-emerald text-emerald-800'
                    : solvedState === 'FAILED'
                    ? 'surface-red text-red-800'
                    : 'surface-orange text-orange-800'
                }`}
              >
                {solvedState === 'CORRECT'
                  ? <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  : <AlertCircle  className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                }
                <span>{feedbackBanner}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
