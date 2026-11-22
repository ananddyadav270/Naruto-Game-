import React from 'react';
import { ArrowRight, Award, Check, Lock, Play, RotateCcw, Zap } from 'lucide-react';
import { getAvatarById } from '../data/avatars';
import { getStageForLevel, STAGES } from '../data/questions';
import { PlayerProfile, SavedProgress } from '../types/quiz';
import { getShinobiRank } from '../utils/storage';
import { getAccentClasses } from '../utils/profileUtils';
import { useAnimatedNumber } from '../utils/useAnimatedNumber';
import {
  ChakraGemIcon,
  ImageWithFallback,
  KonohaLeafSymbol,
  RankBadge,
  SharinganEmblem,
  ShinobiCoinIcon,
  WarmDivider,
} from './ShinobiGraphics';

interface HomeScreenProps {
  profile: PlayerProfile;
  progress: SavedProgress;
  onStartNewOrContinue: () => void;
  onSelectLevel: (level: number) => void;
  onOpenProfile: () => void;
  onRequestReset: () => void;
  onOpenVictory: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  profile,
  progress,
  onStartNewOrContinue,
  onSelectLevel,
  onOpenProfile,
  onRequestReset,
  onOpenVictory,
}) => {
  const hasProgress     = progress.completedLevels.length > 0 || progress.highestUnlockedLevel > 1;
  const activeLevel     = progress.highestUnlockedLevel;
  const activeStage     = getStageForLevel(activeLevel);
  const completedCount  = progress.completedLevels.length;
  const percentComplete = Math.round((completedCount / 50) * 100);
  const avatar          = getAvatarById(profile.avatarId);
  const rank            = getShinobiRank(completedCount);
  const accent          = getAccentClasses(profile.accentId);

  const animatedScore = useAnimatedNumber(progress.totalScore);
  const animatedCoins = useAnimatedNumber(progress.totalCoins);
  const animatedGems  = useAnimatedNumber(progress.totalGems);

  return (
    <div className="animate-screen-enter w-full">
      {/* ════ HERO SECTION ════ */}
      <section className="relative overflow-hidden" style={{
        background: 'linear-gradient(160deg, #1a1208 0%, #2d1a08 40%, #3a1806 65%, #200a0a 100%)',
        minHeight: '480px',
      }}>
        {/* Background stage art */}
        <div className="absolute inset-0 overflow-hidden">
          <ImageWithFallback
            src={activeStage.imageSrc}
            alt={activeStage.title}
            className="absolute inset-0 h-full w-full object-cover opacity-20 scale-105"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(26,18,8,0.95) 0%, rgba(26,18,8,0.7) 50%, rgba(26,18,8,0.5) 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(18,14,8,1) 100%)' }} />
        </div>

        {/* Decorative Sharingan */}
        <div className="pointer-events-none absolute top-6 right-6 sm:top-10 sm:right-12 opacity-10" aria-hidden="true">
          <SharinganEmblem size={160} spinning />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

            {/* ── Left: Title + CTA ── */}
            <div>
              {/* Player bar */}
              <button
                type="button"
                onClick={onOpenProfile}
                className="inline-flex items-center gap-3 mb-6 cursor-pointer group"
              >
                <div className={`h-10 w-10 overflow-hidden rounded-xl border-2 ${accent.borderClass} group-hover:scale-105 transition-transform shrink-0`}>
                  <ImageWithFallback src={avatar.imageSrc} alt={profile.playerName} className="h-full w-full object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <RankBadge rank={rank} />
                    <span className="text-orange-300/60 text-xs font-mono">{profile.playerId}</span>
                  </div>
                  <div className="text-sm font-semibold text-orange-50/80 mt-0.5">
                    Welcome back, <span className="text-amber-300">{profile.playerName}</span>
                  </div>
                </div>
              </button>

              {/* Title */}
              <div className="flex items-center gap-2 mb-3">
                <KonohaLeafSymbol size={16} className="text-orange-400" />
                <span className="text-[11px] font-bold tracking-widest uppercase text-orange-400/80">Hidden Leaf Shinobi Trial · 50 Levels</span>
              </div>

              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight uppercase leading-[0.9] text-orange-50 mb-2">
                Naruto<br />
                <span className="text-shimmer">Ultimate</span>
              </h1>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight uppercase leading-[0.9] text-orange-50 mb-5">
                Quiz
              </h1>

              <p className="text-orange-100/70 text-sm sm:text-base leading-relaxed max-w-md mb-8">
                Ascend from Academy Student to Hokage. Answer on your first try for a{' '}
                <strong className="text-amber-300">2× score multiplier</strong>, earn coins and gem milestones.
                Progress saves automatically.
              </p>

              {/* Stats row */}
              <div className="flex items-center gap-3 sm:gap-5 mb-7 flex-wrap">
                <div className="flex items-center gap-1.5 bg-white/8 rounded-xl px-3 py-2 border border-white/10">
                  <span className="text-orange-400 font-display text-xl font-bold tabular-nums">{animatedScore.toLocaleString()}</span>
                  <span className="text-orange-200/50 text-xs">pts</span>
                </div>
                <div className="coin-badge text-sm">
                  <ShinobiCoinIcon size={16} />
                  {animatedCoins.toLocaleString()}
                </div>
                <div className="gem-badge text-sm">
                  <ChakraGemIcon size={16} />
                  {animatedGems.toLocaleString()}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={onStartNewOrContinue}
                  className="btn-primary inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 rounded-2xl text-sm sm:text-base cursor-pointer"
                >
                  <Play className="h-4 w-4 fill-current shrink-0" />
                  <span>{hasProgress ? `Continue — Level ${activeLevel}` : 'Start Your Journey'}</span>
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </button>

                {progress.hasCompletedAll && (
                  <button type="button" onClick={onOpenVictory}
                    className="btn-gold inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl text-sm cursor-pointer">
                    <Award className="h-4 w-4 shrink-0" />
                    <span>Victory Record</span>
                  </button>
                )}

                {hasProgress && (
                  <button type="button" onClick={onRequestReset}
                    className="btn-ghost inline-flex items-center gap-2 px-4 py-3.5 rounded-2xl text-sm cursor-pointer">
                    <RotateCcw className="h-3.5 w-3.5 shrink-0" />
                    <span>Reset</span>
                  </button>
                )}
              </div>

              {/* Quick rules */}
              <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-orange-200/40">
                <span className="flex items-center gap-1"><Zap className="h-3 w-3 text-amber-400/60" />200 pts first try (2×)</span>
                <span>·  100 pts second try</span>
                <span>·  Gems every 5 levels</span>
              </div>
            </div>

            {/* ── Right: Stage Card ── */}
            <div className="hidden lg:block">
              <div className="relative overflow-hidden rounded-3xl" style={{
                border: '1px solid rgba(249,115,22,0.25)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              }}>
                <div className="relative h-72 xl:h-80">
                  <ImageWithFallback
                    src={activeStage.imageSrc}
                    alt={activeStage.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 30%, rgba(26,18,8,0.95) 100%)' }} />

                  <div className="absolute top-4 left-4 flex items-center gap-2 rounded-xl px-3 py-1.5"
                    style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)', border: '1px solid rgba(249,115,22,0.2)' }}>
                    <SharinganEmblem size={18} spinning />
                    <span className="text-xs font-mono font-bold text-orange-100">{activeStage.rangeLabel}</span>
                  </div>

                  <div className="absolute bottom-0 inset-x-0 p-5">
                    <div className="text-xs font-bold uppercase tracking-wider text-orange-400 mb-1">
                      {activeStage.difficulty} · {activeStage.japaneseSubtitle}
                    </div>
                    <h2 className="font-display text-2xl font-bold uppercase text-white">{activeStage.title}</h2>
                    <p className="text-xs text-orange-100/70 mt-1 line-clamp-2">{activeStage.description}</p>
                  </div>
                </div>

                {/* Progress bar inset */}
                <div className="px-5 py-4" style={{ background: 'rgba(26,18,8,0.95)' }}>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-orange-200/60 font-semibold">Level {activeLevel} / 50</span>
                    <span className="text-orange-300 font-mono font-bold">{completedCount} cleared ({percentComplete}%)</span>
                  </div>
                  <div className="progress-track h-2.5">
                    <div className="h-full progress-fill-orange progress-bar-fill rounded-full transition-all duration-700"
                      style={{ width: `${Math.max(percentComplete, completedCount > 0 ? 2 : 0)}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile progress bar */}
          <div className="lg:hidden mt-6">
            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(249,115,22,0.2)', background: 'rgba(26,18,8,0.8)' }}>
              <div className="p-4">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-orange-200/60 font-semibold">Level {activeLevel} / 50 · {activeStage.difficulty}</span>
                  <span className="text-orange-300 font-mono font-bold">{completedCount}/50 ({percentComplete}%)</span>
                </div>
                <div className="progress-track h-2">
                  <div className="h-full progress-fill-orange progress-bar-fill rounded-full"
                    style={{ width: `${Math.max(percentComplete, completedCount > 0 ? 2 : 0)}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════ LEVEL GRID SECTION ════ */}
      <section className="bg-[#f5ede0] py-10 sm:py-14" aria-labelledby="progression-heading">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

          {/* Section header */}
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-orange-600 text-xs font-bold tracking-widest uppercase mb-3">
              <KonohaLeafSymbol size={14} className="text-orange-500" />
              <span>Shinobi Path</span>
            </div>
            <h2 id="progression-heading" className="font-display text-3xl sm:text-4xl font-bold uppercase text-[#1a1208] mb-2">
              Level Progression
            </h2>
            <p className="text-amber-800/60 text-sm max-w-md mx-auto">
              Select any unlocked level to replay, or continue from Level {activeLevel}.
            </p>

            {/* Legend */}
            <div className="flex items-center justify-center gap-5 mt-4 text-xs text-amber-800/60">
              <span className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-sm" style={{ background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)', border: '1.5px solid #34d399' }} />
                Completed
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-sm" style={{ background: 'linear-gradient(135deg, #fff7ed, #fed7aa)', border: '1.5px solid #f97316' }} />
                Current
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-sm" style={{ background: '#fdf8f0', border: '1.5px solid #e8d5b7' }} />
                Available
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-sm" style={{ background: '#f0ebe2', border: '1.5px solid #d8c9b0' }} />
                Locked
              </span>
            </div>
          </div>

          {/* Stage cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {STAGES.map((stage) => {
              const levels    = Array.from({ length: stage.endLevel - stage.startLevel + 1 }, (_, i) => stage.startLevel + i);
              const stageDone = levels.filter((lvl) => progress.completedLevels.includes(lvl)).length;
              const stagePct  = Math.round((stageDone / levels.length) * 100);

              return (
                <div key={stage.difficulty} className="surface-card rounded-3xl overflow-hidden">
                  {/* Stage color strip */}
                  <div className="relative h-20 sm:h-24 overflow-hidden">
                    <ImageWithFallback
                      src={stage.imageSrc}
                      alt={stage.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.3) 100%)' }} />
                    <div className="absolute inset-0 flex items-center px-5 justify-between">
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-white/60">{stage.difficulty} · {stage.rangeLabel}</div>
                        <h3 className="font-display text-xl sm:text-2xl font-bold uppercase text-white">{stage.title}</h3>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-lg font-bold text-white tabular-nums">{stageDone}/{levels.length}</div>
                        <div className="text-[10px] text-white/60">{stagePct}% done</div>
                      </div>
                    </div>
                  </div>

                  {/* Progress + Buttons */}
                  <div className="p-4 sm:p-5">
                    {/* Stage mini-progress */}
                    <div className="progress-track h-1.5 mb-4">
                      <div className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${Math.max(stagePct, stageDone > 0 ? 2 : 0)}%`,
                          background: `linear-gradient(90deg, ${stage.accentHex}80, ${stage.accentHex})`,
                        }} />
                    </div>

                    <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                      {levels.map((lvl) => {
                        const isCompleted = progress.completedLevels.includes(lvl);
                        const isCurrent   = lvl === activeLevel && !isCompleted;
                        const isUnlocked  = lvl <= progress.highestUnlockedLevel || isCompleted;
                        const outcome     = progress.levelOutcomes[lvl];
                        const is2x        = isCompleted && outcome?.attemptSolved === 1;

                        let btnCls = '';
                        if      (isCompleted) btnCls = 'level-btn-completed';
                        else if (isCurrent)   btnCls = 'level-btn-current';
                        else if (isUnlocked)  btnCls = 'level-btn-unlocked';
                        else                  btnCls = 'level-btn-locked';

                        return (
                          <button
                            key={lvl}
                            type="button"
                            disabled={!isUnlocked}
                            onClick={() => isUnlocked && onSelectLevel(lvl)}
                            title={isCompleted ? `Replay Level ${lvl}${is2x ? ' (2× cleared)' : ''}` : isUnlocked ? `Play Level ${lvl}` : `Locked`}
                            className={`relative h-10 sm:h-11 rounded-xl font-mono text-xs sm:text-sm font-bold tabular-nums flex items-center justify-center transition-all duration-150 ${btnCls}`}
                          >
                            <span>{lvl}</span>
                            {isCompleted && (
                              <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full flex items-center justify-center"
                                style={{ background: is2x ? '#f97316' : '#10b981', boxShadow: `0 0 6px ${is2x ? '#f97316' : '#10b981'}80` }}>
                                <Check className="h-1.5 w-1.5 text-white" strokeWidth={3} />
                              </span>
                            )}
                            {!isUnlocked && <Lock className="absolute bottom-0.5 right-0.5 h-2.5 w-2.5 text-amber-800/40" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <WarmDivider />
        </div>
      </section>
    </div>
  );
};
