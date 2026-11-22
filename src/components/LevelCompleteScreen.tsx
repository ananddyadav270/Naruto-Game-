import React, { useEffect } from 'react';
import { ArrowRight, Award, CheckCircle2, Home, Sparkles } from 'lucide-react';
import { getStageForLevel } from '../data/questions';
import { LevelRewardBreakdown, QuizQuestion } from '../types/quiz';
import { useAnimatedNumber } from '../utils/useAnimatedNumber';
import { ChakraGemIcon, ShinobiCoinIcon, WarmDivider } from './ShinobiGraphics';

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
  question, reward, totalScore, totalCoins, totalGems, onContinue, onGoHome,
}) => {
  const stage = getStageForLevel(question.level);

  const animatedEarnedScore = useAnimatedNumber(reward.scoreEarned, 500);
  const animatedEarnedCoins = useAnimatedNumber(reward.coinsEarned, 500);
  const animatedTotalScore  = useAnimatedNumber(totalScore, 700);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onContinue(); }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onContinue]);

  const isMilestone = reward.isMajorMilestone;
  const is2x        = reward.is2xBonus && reward.isFirstTimeClaim;

  return (
    <div className="animate-screen-enter w-full" style={{ background: '#f5ede0', minHeight: 'calc(100dvh - 64px)' }}>
      <div className="mx-auto max-w-2xl px-3 sm:px-5 py-6 sm:py-10">

        {/* ── Main Card ── */}
        <div className={`rounded-3xl overflow-hidden shadow-2xl ${isMilestone ? 'surface-gold' : 'surface-emerald'}`}
          style={{ boxShadow: `0 24px 60px ${isMilestone ? 'rgba(245,158,11,0.2)' : 'rgba(16,185,129,0.15)'}` }}>

          {/* Header banner */}
          <div className={`px-6 py-8 sm:px-8 sm:py-10 text-center ${isMilestone ? 'bg-gradient-to-b from-amber-100/80 to-transparent' : 'bg-gradient-to-b from-emerald-100/80 to-transparent'}`}>
            <div className={`mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl mb-4 animate-bounce-in ${isMilestone ? 'bg-amber-500/20 border-2 border-amber-400' : 'bg-emerald-500/20 border-2 border-emerald-400'}`}>
              <CheckCircle2 className={`h-7 w-7 ${isMilestone ? 'text-amber-600' : 'text-emerald-600'}`} />
            </div>

            <div className={`text-[11px] font-bold uppercase tracking-widest mb-1 ${isMilestone ? 'text-amber-700' : 'text-emerald-700'}`}>
              Level {question.level} of 50 · {stage.title}
            </div>

            <h1 className="font-display text-4xl sm:text-5xl font-bold uppercase text-[#1a1208] tracking-wide mb-3">
              Level Complete!
            </h1>

            {/* 2× Bonus */}
            {is2x && (
              <div className="animate-reward-pop inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-bold bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg mb-2">
                <Sparkles className="h-4 w-4" />
                <span>2× FIRST-ATTEMPT BONUS!</span>
              </div>
            )}

            {/* Stage milestone */}
            {isMilestone && (
              <div className="animate-reward-pop mt-3 rounded-2xl px-5 py-3 bg-amber-500/15 border border-amber-400/40">
                <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">
                  <Award className="h-3.5 w-3.5" />
                  <span>Stage Cleared: {stage.title}</span>
                </div>
                <p className="text-sm text-amber-800/80">
                  {question.level === 50
                    ? 'All 50 Shinobi Trials conquered! Claim your Hokage Victory!'
                    : `You mastered ${stage.rangeLabel} and earned a gem bonus!`}
                </p>
              </div>
            )}
          </div>

          {/* Reward cards */}
          <div className="px-5 sm:px-8 pb-6">
            <div className="grid grid-cols-3 gap-3 mb-5">
              {/* Score */}
              <div className="surface-card rounded-2xl p-3 sm:p-4 text-center animate-reward-pop relative overflow-hidden">
                <div className="text-xs font-semibold text-amber-700/60 mb-1">Score</div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-[#1a1208] tabular-nums">
                  +{animatedEarnedScore}
                </div>
                <div className="text-[10px] text-amber-700/50 mt-0.5">
                  {reward.isFirstTimeClaim ? (reward.is2xBonus ? '100 × 2×' : '100 pts') : 'Replay'}
                </div>
              </div>

              {/* Coins */}
              <div className="surface-gold rounded-2xl p-3 sm:p-4 text-center animate-reward-pop relative overflow-hidden">
                {reward.coinsEarned > 0 && (
                  <span className="animate-coin-float pointer-events-none absolute top-1.5 right-2 text-xs font-mono font-bold text-amber-700">
                    +{reward.coinsEarned}
                  </span>
                )}
                <div className="flex items-center justify-center gap-1 text-xs font-semibold text-amber-700/70 mb-1">
                  <ShinobiCoinIcon size={13} />
                  <span>Coins</span>
                </div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-amber-800 tabular-nums">
                  +{animatedEarnedCoins}
                </div>
                <div className="text-[10px] text-amber-700/50 mt-0.5">
                  Total: {totalCoins.toLocaleString()}
                </div>
              </div>

              {/* Gems */}
              <div className="surface-sky rounded-2xl p-3 sm:p-4 text-center animate-reward-pop relative overflow-hidden">
                {reward.totalGemsEarned > 0 && (
                  <span className="animate-coin-float pointer-events-none absolute top-1.5 right-2 text-xs font-mono font-bold text-sky-600">
                    +{reward.totalGemsEarned}
                  </span>
                )}
                <div className="flex items-center justify-center gap-1 text-xs font-semibold text-sky-700/70 mb-1">
                  <ChakraGemIcon size={13} />
                  <span>Gems</span>
                </div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-sky-700 tabular-nums">
                  +{reward.totalGemsEarned}
                </div>
                <div className="text-[10px] text-sky-700/50 mt-0.5">
                  Total: {totalGems.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Answer explanation */}
            <div className="surface-card rounded-2xl p-4 mb-5">
              <div className="flex items-start justify-between gap-3 mb-2">
                <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {question.options[question.correctIndex]}
                </span>
                <span className="font-mono text-xs text-amber-700/50 tabular-nums shrink-0">
                  Total: {animatedTotalScore.toLocaleString()}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#5c4a2e] leading-relaxed">{question.explanation}</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-2.5">
              <button type="button" onClick={onGoHome}
                className="btn-ghost inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold cursor-pointer">
                <Home className="h-4 w-4 shrink-0" />
                <span>Home</span>
              </button>
              <button type="button" onClick={onContinue}
                className={`flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl font-bold text-sm sm:text-base cursor-pointer text-white ${isMilestone ? 'btn-gold' : 'btn-primary'}`}>
                <span>{question.level === 50 ? 'Claim Hokage Victory' : `Level ${question.level + 1}`}</span>
                <ArrowRight className="h-4 w-4 shrink-0" />
              </button>
            </div>

            <p className="text-center text-[10px] text-amber-700/40 mt-3">
              Press <kbd className="font-mono bg-amber-100 px-1 rounded">Enter</kbd> to continue
            </p>
          </div>
        </div>
        <WarmDivider />
      </div>
    </div>
  );
};
