import React from 'react';
import {
  ArrowDown,
  ArrowRight,
  Award,
  Check,
  ChevronRight,
  Compass,
  Crosshair,
  Flame,
  Gamepad2,
  Lock,
  Play,
  RotateCcw,
  Scroll,
  Shield,
  Sparkles,
  Star,
  Swords,
  Target,
  Trophy,
  User,
  Zap,
} from 'lucide-react';
import { getAvatarById } from '../data/avatars';
import { getStageForLevel, STAGES } from '../data/questions';
import { PlayerProfile, SavedProgress } from '../types/quiz';
import { getAccentClasses } from '../utils/profileUtils';
import { getShinobiRank } from '../utils/storage';
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
  const hasProgress = progress.completedLevels.length > 0 || progress.highestUnlockedLevel > 1;
  const activeLevel = progress.highestUnlockedLevel;
  const activeStage = getStageForLevel(activeLevel);
  const completedCount = progress.completedLevels.length;
  const percentComplete = Math.round((completedCount / 50) * 100);
  const rank = getShinobiRank(completedCount);
  const accent = getAccentClasses(profile.accentId);
  const activeAvatar = getAvatarById(profile.avatarId);

  const animatedScore = useAnimatedNumber(progress.totalScore);
  const animatedCoins = useAnimatedNumber(progress.totalCoins);
  const animatedGems = useAnimatedNumber(progress.totalGems);

  const scrollToTrials = () => {
    const el = document.getElementById('progression-map-heading');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full">
      {/* ═══════════════════════════════════════════════════════════════════════
          CINEMATIC ANIME GAMING HERO – EDITORIAL COMPOSITION
         ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[600px] lg:min-h-[740px] overflow-hidden border-b border-orange-500/20 flex flex-col justify-between">
        {/* ── Layer 1: Environmental Background & Atmospheric Effects ── */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          {/* Scenic Hidden Leaf Village Backdrop */}
          <ImageWithFallback
            src="/src/assets/images/konoha_hero_backdrop_1795346401696.jpg"
            alt="Konohagakure Hidden Leaf Village"
            className="h-full w-full object-cover object-center scale-105 opacity-30 filter blur-[0.5px]"
          />

          {/* Cinematic Vignette & Lighting Gradients */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, #0e0c14 0%, rgba(14,12,20,0.92) 35%, rgba(14,12,20,0.7) 65%, rgba(20,13,26,0.85) 100%)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(14,12,20,0.4) 0%, transparent 40%, #0e0c14 98%)',
            }}
          />

          {/* Right-Wing Fiery Chakra Aura */}
          <div
            className="absolute -top-20 -right-20 h-[580px] w-[580px] rounded-full opacity-35 blur-[120px]"
            style={{
              background: 'radial-gradient(circle, #ff6a00 0%, #dc2626 50%, transparent 70%)',
            }}
          />

          {/* Subtle Background Japanese Calligraphy Watermark */}
          <div className="absolute top-12 right-6 lg:right-24 select-none opacity-[0.06] font-display text-[140px] lg:text-[220px] font-black text-white leading-none pointer-events-none tracking-tighter">
            火之意志
          </div>
        </div>

        {/* ── Layer 2: Main Hero Content (Asymmetrical Editorial Grid) ── */}
        <div className="relative z-10 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* ── LEFT COLUMN: TITLE & TACTICAL CONSOLE (7 cols) ── */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Mission Rank & Village Header */}
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500/20 to-amber-500/10 border border-orange-500/35 px-3 py-1.5 backdrop-blur-md">
                  <KonohaLeafSymbol size={16} className="text-orange-400 drop-shadow" />
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-orange-300">
                    S-RANK SHINOBI EXAM · 50 TRIALS
                  </span>
                </div>

                <div className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-white/5 border border-white/10 px-3 py-1.5 text-xs font-mono font-semibold text-white/60">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>WILL OF FIRE INITIATIVE</span>
                </div>
              </div>

              {/* Dramatic Anime Game Title */}
              <div className="space-y-1">
                <div className="font-display text-xs sm:text-sm font-bold tracking-[0.35em] uppercase text-orange-400/90 flex items-center gap-2">
                  <span>ナルト · 究極の試練</span>
                  <span className="h-px w-12 bg-orange-500/40" />
                  <span>THE ULTIMATE LORE CHALLENGE</span>
                </div>

                <h1 className="font-display text-5xl sm:text-7xl xl:text-8xl font-black uppercase tracking-tight text-white leading-[0.88] drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
                  NARUTO<br />
                  <span className="text-shimmer drop-shadow-[0_0_35px_rgba(255,122,26,0.5)]">
                    ULTIMATE
                  </span>
                  <span className="text-white text-4xl sm:text-6xl xl:text-7xl ml-3">
                    QUIZ
                  </span>
                </h1>
              </div>

              {/* Subtitle / Shinobi Lore Invitation */}
              <p className="text-white/75 text-sm sm:text-base leading-relaxed max-w-xl font-medium">
                Climb from an unranked Academy Student to the <strong className="text-amber-300">Seventh Hokage</strong>. 
                Answer on your first strike for the <strong className="text-orange-400">2× Chakra Multiplier (200 pts)</strong>, unlock stage milestones, and etch your name on the Great Stone Face.
              </p>

              {/* Tactical Mission Briefing HUD Card */}
              <div className="rounded-3xl border border-white/12 bg-[#171324]/85 p-4 sm:p-5 backdrop-blur-xl shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />

                <div className="flex flex-wrap items-center justify-between gap-3 mb-3 border-b border-white/8 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/30">
                      <Crosshair className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-white/50">
                        Current Mission Target
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                        <span>Level {activeLevel} of 50</span>
                        <span className="text-white/30">·</span>
                        <span className="text-orange-400">{activeStage.title}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="rounded-lg bg-orange-500/15 border border-orange-500/30 px-2 py-0.5 font-mono text-[11px] font-bold text-orange-300">
                      {activeStage.difficulty}
                    </span>
                    <span className="font-mono text-xs font-bold text-emerald-400">
                      {completedCount}/50 Cleared
                    </span>
                  </div>
                </div>

                {/* Progress Visual Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] text-white/60 font-mono">
                    <span className="flex items-center gap-1.5 text-amber-300 font-bold">
                      <Zap className="h-3.5 w-3.5 text-amber-400" />
                      First-Strike 2X Multiplier Ready
                    </span>
                    <span>{percentComplete}% Completed</span>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-400 rounded-full transition-all duration-700 shadow-[0_0_12px_rgba(255,122,26,0.6)]"
                      style={{ width: `${Math.max(percentComplete, completedCount > 0 ? 3 : 0)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Command Action Launchpad */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                {/* Main Play / Continue Action */}
                <button
                  type="button"
                  onClick={onStartNewOrContinue}
                  className="btn-primary inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-4.5 rounded-2xl text-sm sm:text-base font-bold shadow-[0_6px_30px_rgba(255,122,26,0.55)] cursor-pointer group active:scale-98"
                >
                  <Play className="h-5 w-5 fill-current shrink-0 transition-transform group-hover:scale-115" />
                  <span>
                    {hasProgress ? `RESUME MISSION — LV.${activeLevel}` : 'BEGIN SHINOBI TRIAL'}
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
                </button>

                {/* Scroll to Map */}
                <button
                  type="button"
                  onClick={scrollToTrials}
                  className="btn-secondary inline-flex items-center gap-2 px-5 py-4 rounded-2xl text-xs sm:text-sm font-bold cursor-pointer"
                >
                  <Compass className="h-4 w-4 text-orange-400" />
                  <span>50 Trials Map</span>
                  <ArrowDown className="h-3.5 w-3.5 text-white/50" />
                </button>

                {/* Profile Shortcut */}
                <button
                  type="button"
                  onClick={onOpenProfile}
                  className="btn-secondary inline-flex items-center gap-2 px-4 py-4 rounded-2xl text-xs sm:text-sm font-semibold cursor-pointer text-white/80"
                  title="Customize Ninja Appearance"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Dossier</span>
                </button>

                {/* Victory Button (if game beaten) */}
                {progress.hasCompletedAll && (
                  <button
                    type="button"
                    onClick={onOpenVictory}
                    className="btn-gold inline-flex items-center gap-2 px-5 py-4 rounded-2xl text-xs sm:text-sm font-bold shadow-lg cursor-pointer"
                  >
                    <Award className="h-4 w-4" />
                    <span>Hokage Victory</span>
                  </button>
                )}

                {/* Reset Option */}
                {hasProgress && (
                  <button
                    type="button"
                    onClick={onRequestReset}
                    className="p-3.5 rounded-2xl border border-white/10 bg-white/5 hover:bg-red-500/10 hover:border-red-500/30 text-white/40 hover:text-red-400 transition-colors cursor-pointer"
                    title="Reset Game Progress"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* ── RIGHT COLUMN: DOMINANT NARUTO CHARACTER ARTWORK & BADGE (5 cols) ── */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              {/* Character Background Chakra Radial Ring */}
              <div
                className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full opacity-40 animate-chakra-pulse pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle, rgba(255,122,26,0.6) 0%, rgba(245,158,11,0.3) 40%, transparent 70%)',
                }}
              />

              {/* Concentric Decorative Shinobi Ring */}
              <div className="absolute w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] rounded-full border border-orange-500/25 border-dashed animate-sharingan-fast pointer-events-none opacity-40" />
              <div className="absolute w-[260px] h-[260px] sm:w-[340px] sm:h-[340px] rounded-full border border-amber-400/20 pointer-events-none opacity-30" />

              {/* Main Character Showcase Frame */}
              <div className="relative z-10 w-full max-w-[340px] sm:max-w-[400px]">
                {/* Character Portrait Card with Multi-layered Shadow & Gold Trim */}
                <div className="relative overflow-hidden rounded-[2.5rem] border-2 border-orange-500/50 bg-[#161221] shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(255,122,26,0.3)] group">
                  {/* Character Image */}
                  <div className="relative h-[380px] sm:h-[440px] overflow-hidden">
                    <img
                      src="/src/assets/images/avatar_uzumaki_hero_1795373260680.jpg"
                      alt="Naruto Uzumaki - Seventh Hokage"
                      className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Dramatic Bottom Fade Overlay */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(180deg, transparent 40%, rgba(18,15,27,0.7) 70%, #120f1b 100%)',
                      }}
                    />

                    {/* Top Leaf Shinobi Metal Badge */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 rounded-2xl bg-black/75 px-3.5 py-1.5 backdrop-blur-md border border-orange-500/40 shadow-lg">
                      <KonohaLeafSymbol size={18} className="text-orange-400" />
                      <span className="font-mono text-xs font-bold text-white tracking-wider">
                        UZUMAKI NARUTO
                      </span>
                    </div>

                    {/* Spinning Sharingan Accent in Corner */}
                    <div className="absolute top-4 right-4 opacity-75">
                      <SharinganEmblem size={26} spinning />
                    </div>

                    {/* Bottom Shinobi Motto */}
                    <div className="absolute bottom-4 inset-x-4 text-center">
                      <p className="text-xs italic text-amber-200/90 font-medium drop-shadow-md">
                        "I never go back on my word. That is my ninja way!"
                      </p>
                    </div>
                  </div>

                  {/* Character Card Footer / Active Operative Status */}
                  <div className="p-4 bg-[#14101e] border-t border-white/10 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <ShinobiAvatarDisplay
                        avatarId={profile.avatarId}
                        avatarBgId={profile.avatarBgId}
                        frameId={profile.frameId}
                        size="sm"
                      />
                      <div>
                        <div className="text-[10px] font-mono text-white/50 uppercase">Active Operative</div>
                        <div className="text-xs font-bold text-white truncate max-w-[120px]">
                          {profile.playerName}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <RankBadge rank={rank} />
                    </div>
                  </div>
                </div>

                {/* Decorative Floating Achievement Chip */}
                <div className="absolute -bottom-4 -left-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 p-px shadow-xl animate-float-y">
                  <div className="rounded-[15px] bg-[#1a1424] px-3.5 py-2 flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-amber-400" />
                    <div>
                      <div className="text-[9px] font-mono font-bold uppercase text-white/50">
                        Score Record
                      </div>
                      <div className="text-xs font-mono font-bold text-amber-200 tabular-nums">
                        {animatedScore.toLocaleString()} pts
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative Floating Gem Chip */}
                <div
                  className="absolute -top-3 -right-3 rounded-2xl bg-gradient-to-r from-sky-400 to-indigo-500 p-px shadow-xl animate-float-y"
                  style={{ animationDelay: '1.8s' }}
                >
                  <div className="rounded-[15px] bg-[#1a1424] px-3 py-1.5 flex items-center gap-2">
                    <ChakraGemIcon size={14} />
                    <span className="text-xs font-mono font-bold text-sky-200">
                      {animatedGems.toLocaleString()} Gems
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Layer 3: Editorial Shinobi Pillars Strip (Hero Footer) ── */}
        <div className="relative z-10 border-t border-white/10 bg-[#120f1b]/90 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-left">
              {/* Pillar 1 */}
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-500/15 border border-orange-500/30 text-orange-400 font-mono font-bold text-xs">
                  01
                </div>
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wide">
                    50 Progressive Trials
                  </div>
                  <div className="text-[11px] text-white/50">Academy to 4th Great Ninja War</div>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 font-mono font-bold text-xs">
                  02
                </div>
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wide">
                    2 Attempts Per Trial
                  </div>
                  <div className="text-[11px] text-white/50">Sharingan seals protect your life</div>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono font-bold text-xs">
                  03
                </div>
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wide">
                    2X Score Multiplier
                  </div>
                  <div className="text-[11px] text-white/50">200 pts & 20 coins on 1st attempt</div>
                </div>
              </div>

              {/* Pillar 4 */}
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-500/15 border border-sky-500/30 text-sky-400 font-mono font-bold text-xs">
                  04
                </div>
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wide">
                    Stage Gem Milestones
                  </div>
                  <div className="text-[11px] text-white/50">Gem bonuses at Lv. 15, 30, 45, 50</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          50-LEVEL PROGRESSION MAP SECTION
         ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-12 sm:py-16 bg-[#0c0a10]" aria-labelledby="progression-map-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-orange-400 mb-3">
              <KonohaLeafSymbol size={14} className="text-orange-400" />
              <span>Interactive Progression Grid</span>
            </div>
            <h2
              id="progression-map-heading"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-white tracking-wide mb-3"
            >
              The Shinobi Trials Map
            </h2>
            <p className="text-sm sm:text-base text-white/60">
              Conquer 50 levels across four stages. Click any unlocked level to play or replay.
            </p>
          </div>

          {/* 4 Stage Sections */}
          <div className="space-y-8">
            {STAGES.map((stage) => {
              const levels = Array.from(
                { length: stage.endLevel - stage.startLevel + 1 },
                (_, i) => stage.startLevel + i
              );
              const stageCompletedCount = levels.filter((lvl) =>
                progress.completedLevels.includes(lvl)
              ).length;
              const isStageFullyComplete = stageCompletedCount === levels.length;

              return (
                <div
                  key={stage.difficulty}
                  className="surface-dark-card rounded-3xl overflow-hidden border border-white/12 shadow-xl"
                >
                  {/* Stage Header Strip */}
                  <div className="relative px-5 py-4 sm:px-7 sm:py-5 border-b border-white/10 bg-gradient-to-r from-white/5 to-transparent flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/20 border border-orange-400/40 text-orange-400 font-bold">
                        <Flame className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-orange-400 font-mono">
                            {stage.rangeLabel}
                          </span>
                          <span className="text-white/30">·</span>
                          <span className="text-xs font-bold text-white/70">{stage.difficulty}</span>
                        </div>
                        <h3 className="font-display text-xl sm:text-2xl font-bold uppercase text-white">
                          {stage.title}
                          <span className="ml-2.5 text-xs text-white/40 font-normal font-sans">
                            {stage.japaneseSubtitle}
                          </span>
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="font-mono text-sm font-bold text-white">
                          {stageCompletedCount} / {levels.length} Cleared
                        </div>
                        <div className="text-[10px] text-white/50">
                          {isStageFullyComplete ? '✓ Stage Mastered' : 'In Progress'}
                        </div>
                      </div>
                      {isStageFullyComplete && (
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md">
                          <Check className="h-4 w-4 stroke-[3]" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Level Tiles Grid */}
                  <div className="p-5 sm:p-7 bg-[#14111d]">
                    <div className="grid grid-cols-5 sm:grid-cols-10 lg:grid-cols-15 gap-2 sm:gap-2.5">
                      {levels.map((lvl) => {
                        const isCompleted = progress.completedLevels.includes(lvl);
                        const isCurrent = lvl === activeLevel && !progress.hasCompletedAll;
                        const isUnlocked = lvl <= progress.highestUnlockedLevel;
                        const outcome = progress.levelOutcomes[lvl];
                        const isFirstAttempt = outcome?.attemptSolved === 1;
                        const isMilestone = lvl === 15 || lvl === 30 || lvl === 45 || lvl === 50;

                        let tileClass = 'level-tile-locked';
                        if (isCompleted) {
                          tileClass = 'level-tile-cleared';
                        } else if (isCurrent) {
                          tileClass = 'level-tile-current';
                        } else if (isUnlocked) {
                          tileClass = 'level-tile-unlocked';
                        }

                        return (
                          <button
                            key={lvl}
                            type="button"
                            disabled={!isUnlocked}
                            onClick={() => onSelectLevel(lvl)}
                            className={`group relative flex flex-col items-center justify-center rounded-xl p-2 h-14 sm:h-16 font-mono transition-all cursor-pointer ${tileClass}`}
                            title={`Level ${lvl} ${
                              isCompleted
                                ? `(Cleared - ${isFirstAttempt ? '2X First Try' : '2nd Try'})`
                                : isUnlocked
                                ? '(Unlocked)'
                                : '(Locked)'
                            }`}
                          >
                            <span className="text-sm sm:text-base font-bold tabular-nums">
                              {lvl}
                            </span>

                            {isCompleted && (
                              <div className="mt-0.5 flex items-center gap-0.5 text-[10px] font-bold">
                                <Check className="h-3 w-3 stroke-[3]" />
                                {isFirstAttempt && <span className="text-[9px] text-amber-300">2×</span>}
                              </div>
                            )}

                            {!isUnlocked && <Lock className="h-3 w-3 text-white/30 mt-0.5" />}

                            {isMilestone && (
                              <span
                                className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-sky-500 shadow-md text-white"
                                title="Gem Milestone Level"
                              >
                                <Sparkles className="h-2.5 w-2.5" />
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Grid Legend Strip */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-white/60 bg-white/5 border border-white/10 rounded-2xl p-4">
            <span className="flex items-center gap-2">
              <span className="h-3.5 w-3.5 rounded-lg border-2 border-emerald-400 bg-emerald-500/30" />
              <span>Cleared Level</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="h-3.5 w-3.5 rounded-lg border-2 border-amber-400 bg-orange-500 text-white flex items-center justify-center text-[9px] font-bold">
                ●
              </span>
              <span>Current Mission</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="h-3.5 w-3.5 rounded-lg border border-white/20 bg-white/10" />
              <span>Unlocked Replayable</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="h-3.5 w-3.5 rounded-lg border border-white/5 bg-white/5 flex items-center justify-center">
                <Lock className="h-2.5 w-2.5 text-white/30" />
              </span>
              <span>Locked Trial</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="h-3.5 w-3.5 rounded-full bg-sky-500 flex items-center justify-center text-white">
                <Sparkles className="h-2 w-2" />
              </span>
              <span>Milestone Gem Reward</span>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
