import React from 'react';
import { Award, Check, Home, RotateCcw, Star, Target, Trophy } from 'lucide-react';
import { getAvatarById } from '../data/avatars';
import { STAGES } from '../data/questions';
import { PlayerProfile, SavedProgress } from '../types/quiz';
import { computeQuizStats } from '../utils/storage';
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

interface VictoryScreenProps {
  profile: PlayerProfile;
  progress: SavedProgress;
  onPlayAgain: () => void;
  onGoHome: () => void;
}

export const VictoryScreen: React.FC<VictoryScreenProps> = ({
  profile, progress, onPlayAgain, onGoHome,
}) => {
  const stats       = computeQuizStats(progress);
  const hokageStage = STAGES[3];
  const avatar      = getAvatarById(profile.avatarId);
  const accent      = getAccentClasses(profile.accentId);

  const animatedScore = useAnimatedNumber(progress.totalScore, 1000);
  const animatedCoins = useAnimatedNumber(progress.totalCoins, 1000);
  const animatedGems  = useAnimatedNumber(progress.totalGems, 1000);

  return (
    <div className="animate-screen-enter w-full" style={{ background: '#f5ede0' }}>

      {/* ═══ VICTORY HERO ═══ */}
      <div className="relative overflow-hidden" style={{ minHeight: '480px' }}>
        <ImageWithFallback
          src={hokageStage.imageSrc}
          alt="Hokage Summit Victory"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(10,8,2,0.5) 0%, rgba(26,18,8,0.8) 50%, rgba(26,18,8,0.97) 100%)' }} />

        {/* Stars */}
        {[0,1,2].map((i) => (
          <div key={i} className="pointer-events-none absolute animate-float-y" aria-hidden="true"
            style={{ top: `${10 + i * 15}%`, right: `${5 + i * 8}%`, animationDelay: `${i * 1.1}s` }}>
            <Star className={`text-amber-300/30 fill-current h-${4 + i * 2} w-${4 + i * 2}`} />
          </div>
        ))}

        {/* Sharingan decoration */}
        <div className="pointer-events-none absolute top-6 left-6 opacity-8 animate-sharingan" aria-hidden="true">
          <SharinganEmblem size={120} spinning />
        </div>

        {/* Identity */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20 flex flex-col items-center text-center">
          <div className="flex items-center gap-4 mb-5">
            <div className={`h-14 w-14 sm:h-16 sm:w-16 overflow-hidden rounded-2xl border-3 ${accent.borderClass} shadow-lg`}>
              <ImageWithFallback src={avatar.imageSrc} alt={profile.playerName} className="h-full w-full object-cover" />
            </div>
            <div className="flex items-center gap-2 text-amber-400">
              <KonohaLeafSymbol size={22} />
              <Award className="h-6 w-6" />
            </div>
          </div>

          <div className="text-xs font-bold uppercase tracking-widest text-amber-300/70 mb-2">
            {profile.playerName} · {profile.playerId}
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold uppercase text-white tracking-tight text-balance animate-victory-glow mb-3"
            style={{ textShadow: '0 2px 20px rgba(245,158,11,0.4)' }}>
            Congratulations,<br />Hokage!
          </h1>

          <p className="text-orange-100/70 text-sm sm:text-base max-w-lg mb-5">
            You conquered all 50 levels of the Naruto Ultimate Quiz and claimed the highest shinobi rank of Konoha.
          </p>

          <RankBadge rank="Hokage" />

          {/* Stats strip */}
          <div className="mt-8 grid grid-cols-3 sm:grid-cols-6 gap-3 w-full max-w-3xl">
            {[
              { icon: <Trophy className="h-4 w-4 text-orange-400" />, label: 'Score',    value: animatedScore.toLocaleString(), color: 'text-white' },
              { icon: <ShinobiCoinIcon size={16} />,                   label: 'Coins',    value: animatedCoins.toLocaleString(), color: 'text-amber-300' },
              { icon: <ChakraGemIcon size={16} />,                     label: 'Gems',     value: animatedGems.toLocaleString(),  color: 'text-sky-300' },
              { icon: null, label: '1st Try',   value: String(stats.firstAttemptCount),  color: 'text-emerald-300' },
              { icon: null, label: '2nd Try',   value: String(stats.secondAttemptCount), color: 'text-orange-300' },
              { icon: <Target className="h-4 w-4 text-emerald-400" />, label: 'Accuracy', value: `${stats.accuracyPercentage}%`, color: 'text-emerald-300' },
            ].map((s, i) => (
              <div key={i} className="rounded-2xl px-3 py-3 text-center"
                style={{ background: 'rgba(253,248,240,0.1)', border: '1px solid rgba(253,248,240,0.12)' }}>
                {s.icon && <div className="flex justify-center mb-1">{s.icon}</div>}
                <div className={`font-mono text-lg sm:text-xl font-bold tabular-nums ${s.color}`}>{s.value}</div>
                <div className="text-[10px] text-orange-200/40 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ BREAKDOWN SECTION ═══ */}
      <div className="bg-[#f5ede0] py-10 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase text-[#1a1208]">Shinobi Path Review</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {STAGES.map((stage) => {
              const diff   = stats.byDifficulty[stage.difficulty];
              const levels = Array.from({ length: stage.endLevel - stage.startLevel + 1 }, (_, i) => stage.startLevel + i);
              return (
                <div key={stage.difficulty} className="surface-card rounded-3xl overflow-hidden">
                  <div className="relative h-16 overflow-hidden">
                    <ImageWithFallback src={stage.imageSrc} alt={stage.title} className="absolute inset-0 h-full w-full object-cover" />
                    <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.5)' }} />
                    <div className="absolute inset-0 flex items-center px-5 justify-between">
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-white/50">{stage.difficulty}</div>
                        <h3 className="font-display text-xl font-bold uppercase text-white">{stage.title}</h3>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-sm font-bold text-white">{diff.completed}/{diff.total}</div>
                        <div className="text-[10px] text-white/40">1st: {diff.firstAttempt} · 2nd: {diff.secondAttempt}</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5">
                    <div className="grid grid-cols-5 gap-1.5">
                      {levels.map((lvl) => {
                        const outcome  = progress.levelOutcomes[lvl];
                        const isSecond = outcome?.attemptSolved === 2;
                        return (
                          <div key={lvl} title={`Level ${lvl} — Attempt ${outcome?.attemptSolved ?? 1}`}
                            className={`h-9 rounded-xl border font-mono text-xs font-bold flex items-center justify-center gap-0.5 ${
                              isSecond
                                ? 'surface-gold text-amber-800 border-amber-300'
                                : 'surface-emerald text-emerald-800 border-emerald-300'
                            }`}>
                            <span>{lvl}</span>
                            <Check className="h-2.5 w-2.5" />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-5 flex items-center justify-center gap-6 text-xs text-amber-800/50">
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded bg-emerald-200 border border-emerald-400" />1st attempt (2×)</span>
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded bg-amber-200 border border-amber-400" />2nd attempt</span>
          </div>

          {/* Play Again */}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <button type="button" onClick={onPlayAgain}
              className="btn-gold inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-base cursor-pointer">
              <RotateCcw className="h-4 w-4 shrink-0" />
              <span>Play Again</span>
            </button>
            <button type="button" onClick={onGoHome}
              className="btn-ghost inline-flex items-center gap-2 px-7 py-4 rounded-2xl font-semibold text-base cursor-pointer">
              <Home className="h-4 w-4 shrink-0" />
              <span>Home</span>
            </button>
          </div>

          <WarmDivider />
        </div>
      </div>
    </div>
  );
};
