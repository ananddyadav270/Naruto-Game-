import React, { useEffect } from 'react';
import { ArrowRight, Award, CheckCircle2, Home, Sparkles } from 'lucide-react';
import { getStageForLevel } from '../data/questions';
import { LevelRewardBreakdown, QuizQuestion } from '../types/quiz';
import { useAnimatedNumber } from '../utils/useAnimatedNumber';
import { ChakraGemIcon, ShinobiCoinIcon } from './ShinobiGraphics';

interface LevelCompleteScreenProps {
  question: QuizQuestion;
  reward: LevelRewardBreakdown;
  totalScore: number;
  totalCoins: number;
  totalGems: number;
  onContinue: () => void;
  onGoHome: () => void;
}

export const LevelCompleteScreen: React.FC<LevelCompleteScreenProps> = ({
  question,
  reward,
  totalScore,
  totalCoins,
  totalGems,
  onContinue,
  onGoHome,
}) => {
  const stage = getStageForLevel(question.level);

  const animatedEarnedScore = useAnimatedNumber(reward.scoreEarned, 400);
  const animatedEarnedCoins = useAnimatedNumber(reward.coinsEarned, 400);
  const animatedTotalScore = useAnimatedNumber(totalScore, 600);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onContinue();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onContinue]);

  const isMilestone = reward.isMajorMilestone;
  const is2x = reward.is2xBonus && reward.isFirstTimeClaim;

  return (
    <div
      className="animate-screen-enter w-full py-8 sm:py-12"
      style={{ minHeight: 'calc(100dvh - 64px)' }}
    >
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        {/* ── CELEBRATION MAIN CARD ── */}
        <div className="surface-dark-card rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
          {/* Header Banner */}
          <div
            className={`px-6 py-8 sm:px-8 sm:py-10 text-center relative overflow-hidden ${
              isMilestone
                ? 'bg-gradient-to-b from-amber-500/25 via-amber-600/10 to-transparent'
                : 'bg-gradient-to-b from-emerald-500/25 via-emerald-600/10 to-transparent'
            }`}
          >
            {/* Pulsing Success Crest */}
            <div
              className={`mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl mb-4 animate-bounce-in shadow-xl ${
                isMilestone
                  ? 'bg-amber-500/30 border-2 border-amber-400 text-amber-300'
                  : 'bg-emerald-500/30 border-2 border-emerald-400 text-emerald-300'
              }`}
            >
              <CheckCircle2 className="h-9 w-9 stroke-[2.5]" />
            </div>

            <div
              className={`text-xs font-mono font-bold uppercase tracking-widest mb-1.5 ${
                isMilestone ? 'text-amber-400' : 'text-emerald-400'
              }`}
            >
              Level {question.level} of 50 · {stage.title}
            </div>

            <h1 className="font-display text-4xl sm:text-5xl font-bold uppercase text-white tracking-wide mb-3">
              Trial Conquered!
            </h1>

            {/* 2X First-Attempt Bonus */}
            {is2x && (
              <div className="animate-reward-pop inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-bold bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 text-white shadow-xl mb-2">
                <Sparkles className="h-4 w-4" />
                <span>2× FIRST-ATTEMPT MULTIPLIER ACTIVATED!</span>
              </div>
            )}

            {/* Stage Milestone Gem Award */}
            {isMilestone && (
              <div className="animate-reward-pop mt-3 rounded-2xl px-5 py-3.5 bg-amber-500/20 border border-amber-400/40 text-left max-w-md mx-auto">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300 mb-1">
                  <Award className="h-4 w-4" />
                  <span>Stage Milestone Cleared: {stage.title}</span>
                </div>
                <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed">
                  {question.level === 50
                    ? 'All 50 Shinobi Trials cleared! Proceed to your Hokage Inauguration!'
                    : `You conquered ${stage.rangeLabel} and unlocked a special +${reward.totalGemsEarned} Chakra Gem bonus!`}
                </p>
              </div>
            )}
          </div>

          {/* Reward Badges Grid */}
          <div className="px-6 sm:px-8 pb-8 pt-2">
            <div className="grid grid-cols-3 gap-3 mb-6">
              {/* Score Award */}
              <div className="rounded-2xl bg-white/5 border border-white/10 p-3.5 sm:p-4 text-center relative overflow-hidden">
                <div className="text-[11px] font-semibold text-white/50 mb-1">Score</div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-white tabular-nums">
                  +{animatedEarnedScore}
                </div>
                <div className="text-[10px] text-orange-400 font-semibold mt-0.5">
                  {reward.isFirstTimeClaim ? (reward.is2xBonus ? '100 × 2×' : '100 pts') : 'Replay'}
                </div>
              </div>

              {/* Coins Award */}
              <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-3.5 sm:p-4 text-center relative overflow-hidden">
                {reward.coinsEarned > 0 && (
                  <span className="animate-coin-float pointer-events-none absolute top-1 right-2 text-xs font-mono font-bold text-amber-300">
                    +{reward.coinsEarned}
                  </span>
                )}
                <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-amber-300/80 mb-1">
                  <ShinobiCoinIcon size={14} />
                  <span>Coins</span>
                </div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-amber-300 tabular-nums">
                  +{animatedEarnedCoins}
                </div>
                <div className="text-[10px] text-amber-400/60 font-semibold mt-0.5">
                  Total: {totalCoins.toLocaleString()}
                </div>
              </div>

              {/* Gems Award */}
              <div className="rounded-2xl bg-sky-500/10 border border-sky-500/20 p-3.5 sm:p-4 text-center relative overflow-hidden">
                {reward.totalGemsEarned > 0 && (
                  <span className="animate-coin-float pointer-events-none absolute top-1 right-2 text-xs font-mono font-bold text-sky-300">
                    +{reward.totalGemsEarned}
                  </span>
                )}
                <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-sky-300/80 mb-1">
                  <ChakraGemIcon size={14} />
                  <span>Gems</span>
                </div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-sky-300 tabular-nums">
                  +{reward.totalGemsEarned}
                </div>
                <div className="text-[10px] text-sky-400/60 font-semibold mt-0.5">
                  Total: {totalGems.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Answer Lore Explanation Card */}
            <div className="surface-cream-card rounded-2xl p-4 sm:p-5 mb-6 text-left">
              <div className="flex items-start justify-between gap-3 mb-2">
                <span className="text-xs sm:text-sm font-bold text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Correct: {question.options[question.correctIndex]}</span>
                </span>
                <span className="font-mono text-xs text-[#6b5c46] tabular-nums shrink-0 font-bold">
                  Total Score: {animatedTotalScore.toLocaleString()}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#382f23] leading-relaxed font-medium">
                {question.explanation}
              </p>
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={onGoHome}
                className="btn-secondary inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl text-sm font-semibold cursor-pointer"
              >
                <Home className="h-4 w-4" />
                <span>Return to Dashboard</span>
              </button>

              <button
                type="button"
                onClick={onContinue}
                className={`flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl font-bold text-sm sm:text-base cursor-pointer shadow-xl ${
                  isMilestone ? 'btn-gold' : 'btn-primary'
                }`}
              >
                <span>
                  {question.level === 50 ? 'Claim Hokage Victory' : `Proceed to Level ${question.level + 1}`}
                </span>
                <ArrowRight className="h-4 w-4 shrink-0" />
              </button>
            </div>

            <p className="text-center text-[11px] text-white/40 mt-3.5 font-medium">
              Press <kbd className="font-mono bg-white/10 px-1.5 py-0.5 rounded text-white/70">Enter</kbd> to continue
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
