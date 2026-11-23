import React from 'react';
import { Award, Check, Home, RotateCcw, Sparkles, Star, Target, Trophy } from 'lucide-react';
import { STAGES } from '../data/questions';
import { PlayerProfile, SavedProgress } from '../types/quiz';
import { getAccentClasses } from '../utils/profileUtils';
import { computeQuizStats } from '../utils/storage';
import { useAnimatedNumber } from '../utils/useAnimatedNumber';
import {
  ChakraGemIcon,
  ImageWithFallback,
  KonohaLeafSymbol,
  RankBadge,
  SharinganEmblem,
  ShinobiAvatarDisplay,
  ShinobiCoinIcon,
} from './ShinobiGraphics';

interface VictoryScreenProps {
  profile: PlayerProfile;
  progress: SavedProgress;
  onPlayAgain: () => void;
  onGoHome: () => void;
}

export const VictoryScreen: React.FC<VictoryScreenProps> = ({
  profile,
  progress,
  onPlayAgain,
  onGoHome,
}) => {
  const stats = computeQuizStats(progress);
  const hokageStage = STAGES[3];
  const accent = getAccentClasses(profile.accentId);

  const animatedScore = useAnimatedNumber(progress.totalScore, 1000);
  const animatedCoins = useAnimatedNumber(progress.totalCoins, 1000);
  const animatedGems = useAnimatedNumber(progress.totalGems, 1000);

  return (
    <div className="animate-screen-enter w-full pb-16">
      {/* ═══ HOKAGE INAUGURATION HERO ═══ */}
      <div className="relative overflow-hidden border-b border-amber-500/30" style={{ minHeight: '520px' }}>
        <ImageWithFallback
          src={hokageStage.imageSrc}
          alt="Hokage Summit Victory"
          className="absolute inset-0 h-full w-full object-cover filter blur-[0.5px] scale-105"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(14,10,20,0.6) 0%, rgba(26,17,34,0.88) 55%, #0f0d15 100%)',
          }}
        />

        {/* Floating Golden Stars */}
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="pointer-events-none absolute animate-float-y"
            aria-hidden="true"
            style={{
              top: `${12 + i * 14}%`,
              right: `${8 + i * 12}%`,
              animationDelay: `${i * 0.9}s`,
            }}
          >
            <Star className="text-amber-300/40 fill-current h-6 w-6" />
          </div>
        ))}

        {/* Grand Spinning Sharingan */}
        <div
          className="pointer-events-none absolute top-6 left-6 opacity-15 filter blur-[0.5px]"
          aria-hidden="true"
        >
          <SharinganEmblem size={180} spinning />
        </div>

        {/* Central Identity & Celebration */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20 flex flex-col items-center text-center">
          <div className="mb-5 flex items-center justify-center">
            <ShinobiAvatarDisplay
              avatarId={profile.avatarId}
              avatarBgId={profile.avatarBgId}
              frameId="hokage"
              size="xl"
              showAura
            />
          </div>

          <div className="mb-3 flex items-center gap-2">
            <RankBadge rank="Hokage" />
            <span className="font-mono text-xs text-amber-300/80">
              {profile.playerName} · {profile.playerId}
            </span>
          </div>

          <h1
            className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold uppercase text-white tracking-tight text-balance animate-victory-halo mb-4"
          >
            Congratulations,<br />
            <span className="text-gold-shimmer">Hokage!</span>
          </h1>

          <p className="text-white/80 text-sm sm:text-lg max-w-xl mb-6 leading-relaxed">
            You conquered all 50 Shinobi Trials of the Naruto Ultimate Quiz, proving your complete mastery of Hidden Leaf lore and ascending to the peak of the ninja world.
          </p>

          {/* 6 Combat Metrics Strip */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 w-full max-w-4xl">
            {[
              {
                icon: <Trophy className="h-4 w-4 text-orange-400" />,
                label: 'Final Score',
                value: animatedScore.toLocaleString(),
                color: 'text-white',
              },
              {
                icon: <ShinobiCoinIcon size={16} />,
                label: 'Total Coins',
                value: animatedCoins.toLocaleString(),
                color: 'text-amber-300',
              },
              {
                icon: <ChakraGemIcon size={16} />,
                label: 'Total Gems',
                value: animatedGems.toLocaleString(),
                color: 'text-sky-300',
              },
              {
                icon: <Sparkles className="h-4 w-4 text-emerald-400" />,
                label: '1st Try (2×)',
                value: String(stats.firstAttemptCount),
                color: 'text-emerald-400',
              },
              {
                icon: null,
                label: '2nd Try Clears',
                value: String(stats.secondAttemptCount),
                color: 'text-amber-400',
              },
              {
                icon: <Target className="h-4 w-4 text-sky-400" />,
                label: 'Overall Accuracy',
                value: `${stats.accuracyPercentage}%`,
                color: 'text-sky-300',
              },
            ].map((s, i) => (
              <div
                key={i}
                className="surface-dark-card rounded-2xl p-3.5 text-center border border-white/12 shadow-md"
              >
                {s.icon && <div className="flex justify-center mb-1">{s.icon}</div>}
                <div className={`font-mono text-xl sm:text-2xl font-bold tabular-nums ${s.color}`}>
                  {s.value}
                </div>
                <div className="text-[10px] text-white/50 uppercase font-semibold mt-0.5">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ 50 TRIALS BREAKDOWN SECTION ═══ */}
      <div className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase text-white mb-2">
              Shinobi Trials Record
            </h2>
            <p className="text-sm text-white/60">
              Complete review of all 50 conquered trials across each stage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            {STAGES.map((stg) => {
              const diffStats = stats.byDifficulty[stg.difficulty];
              const levels = Array.from(
                { length: stg.endLevel - stg.startLevel + 1 },
                (_, i) => stg.startLevel + i
              );

              return (
                <div
                  key={stg.difficulty}
                  className="surface-dark-card rounded-3xl overflow-hidden border border-white/12 shadow-xl"
                >
                  <div className="relative h-18 overflow-hidden">
                    <ImageWithFallback
                      src={stg.imageSrc}
                      alt={stg.title}
                      className="absolute inset-0 h-full w-full object-cover opacity-60"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.85), rgba(0,0,0,0.5))' }}
                    />
                    <div className="absolute inset-0 flex items-center px-5 justify-between">
                      <div>
                        <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-orange-400">
                          {stg.difficulty} · {stg.rangeLabel}
                        </div>
                        <h3 className="font-display text-xl font-bold uppercase text-white">
                          {stg.title}
                        </h3>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-sm font-bold text-white">
                          {diffStats.completed}/{diffStats.total}
                        </div>
                        <div className="text-[10px] text-white/50">
                          1st: {diffStats.firstAttempt} · 2nd: {diffStats.secondAttempt}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 bg-[#14111d]">
                    <div className="grid grid-cols-5 gap-2">
                      {levels.map((lvl) => {
                        const outcome = progress.levelOutcomes[lvl];
                        const isSecond = outcome?.attemptSolved === 2;
                        return (
                          <div
                            key={lvl}
                            className={`h-10 rounded-xl border font-mono text-xs font-bold flex items-center justify-center gap-1 shadow-sm ${
                              isSecond
                                ? 'bg-amber-500/20 text-amber-300 border-amber-400/40'
                                : 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
                            }`}
                          >
                            <span>{lvl}</span>
                            <Check className="h-3 w-3 stroke-[3]" />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap justify-center gap-4">
            <button
              type="button"
              onClick={onPlayAgain}
              className="btn-gold inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-base cursor-pointer shadow-2xl"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Play Again / Reset Trials</span>
            </button>

            <button
              type="button"
              onClick={onGoHome}
              className="btn-secondary inline-flex items-center gap-2 px-7 py-4 rounded-2xl font-semibold text-base cursor-pointer"
            >
              <Home className="h-4 w-4" />
              <span>Return to Dashboard</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
