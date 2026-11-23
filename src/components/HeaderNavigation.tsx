import React, { useState } from 'react';
import {
  Award,
  ChevronRight,
  Flame,
  Home,
  Menu,
  RotateCcw,
  Shield,
  Sparkles,
  Trophy,
  User,
  Volume2,
  VolumeX,
  X,
  Zap,
} from 'lucide-react';
import { PlayerProfile, SavedProgress, ScreenState } from '../types/quiz';
import { getAccentClasses } from '../utils/profileUtils';
import { getShinobiRank } from '../utils/storage';
import {
  ChakraGemIcon,
  KonohaLeafSymbol,
  RankBadge,
  ShinobiAvatarDisplay,
  ShinobiCoinIcon,
} from './ShinobiGraphics';

interface HeaderNavigationProps {
  screen: ScreenState;
  profile: PlayerProfile;
  progress: SavedProgress;
  muted: boolean;
  onToggleMute: () => void;
  onNavigateHome: () => void;
  onNavigateProfile: () => void;
  onNavigateVictory: () => void;
  onRequestReset: () => void;
  animatedScore: number;
  animatedCoins: number;
  animatedGems: number;
}

export const HeaderNavigation: React.FC<HeaderNavigationProps> = ({
  screen,
  profile,
  progress,
  muted,
  onToggleMute,
  onNavigateHome,
  onNavigateProfile,
  onNavigateVictory,
  onRequestReset,
  animatedScore,
  animatedCoins,
  animatedGems,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const accent = getAccentClasses(profile.accentId);
  const rank = getShinobiRank(progress.completedLevels.length);
  const hasProgress = progress.completedLevels.length > 0 || progress.highestUnlockedLevel > 1;

  const scrollToProgressionMap = () => {
    setMobileMenuOpen(false);
    if (screen !== 'HOME') {
      onNavigateHome();
      setTimeout(() => {
        const el = document.getElementById('progression-map-heading');
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById('progression-map-heading');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHomeClick = () => {
    setMobileMenuOpen(false);
    onNavigateHome();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProfileClick = () => {
    setMobileMenuOpen(false);
    onNavigateProfile();
  };

  const handleVictoryClick = () => {
    setMobileMenuOpen(false);
    onNavigateVictory();
  };

  return (
    <header className="sticky top-0 z-50 w-full" role="banner">
      {/* ── Top Shinobi Command Strip ── */}
      <div className="relative border-b border-orange-500/25 bg-[#120f1b]/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        {/* Subtle orange chakra glow under the border */}
        <div
          className="pointer-events-none absolute bottom-0 inset-x-0 h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgba(255,122,26,0.6) 25%, rgba(251,191,36,0.8) 50%, rgba(255,122,26,0.6) 75%, transparent 100%)',
          }}
        />

        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="flex h-16 sm:h-20 items-center justify-between gap-3">
            {/* ── LEFT: Game Emblem & Title ── */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleHomeClick}
                className="group flex items-center gap-3 text-left cursor-pointer transition-transform active:scale-98"
                aria-label="Naruto Ultimate Quiz Home"
              >
                {/* Ninja Headband Style Crest */}
                <div className="relative flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2a1711] via-[#3a1b12] to-[#1a0f0d] border-2 border-orange-500/50 shadow-[0_0_20px_rgba(255,122,26,0.35)] group-hover:border-orange-400 group-hover:shadow-[0_0_25px_rgba(255,122,26,0.6)] transition-all">
                  {/* Metallic headband rivets */}
                  <span className="absolute top-1 left-1.5 h-1 w-1 rounded-full bg-amber-200/60" />
                  <span className="absolute top-1 right-1.5 h-1 w-1 rounded-full bg-amber-200/60" />
                  <span className="absolute bottom-1 left-1.5 h-1 w-1 rounded-full bg-amber-200/60" />
                  <span className="absolute bottom-1 right-1.5 h-1 w-1 rounded-full bg-amber-200/60" />

                  <KonohaLeafSymbol
                    size={26}
                    className="text-orange-400 drop-shadow-[0_0_6px_rgba(255,122,26,0.8)] transition-transform group-hover:scale-110"
                  />
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5 leading-none">
                    <span className="font-display text-xl sm:text-2xl lg:text-3xl font-extrabold uppercase tracking-wider text-white">
                      NARUTO
                    </span>
                    <span className="text-[10px] sm:text-xs font-mono font-bold text-amber-400 bg-amber-500/20 px-1.5 py-0.5 rounded border border-amber-400/40 uppercase tracking-widest">
                      ULTIMATE
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] sm:text-xs font-display tracking-[0.25em] uppercase text-orange-400/90 font-bold">
                      SHINOBI QUIZ
                    </span>
                    <span className="hidden sm:inline text-[9px] text-white/30 font-mono">
                      · 木ノ葉隠れの里
                    </span>
                  </div>
                </div>
              </button>
            </div>

            {/* ── CENTER: Styled Tactical Navigation Links (Desktop) ── */}
            <nav className="hidden lg:flex items-center gap-1.5 rounded-2xl bg-white/[0.04] p-1.5 border border-white/10 shadow-inner">
              {/* Link 1: Mission Hub (Home) */}
              <button
                type="button"
                onClick={handleHomeClick}
                className={`relative px-4 py-2 rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  screen === 'HOME'
                    ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-md shadow-orange-500/30'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Home className="h-3.5 w-3.5" />
                <span>01 · Mission Hub</span>
              </button>

              {/* Link 2: Trials Map (Scrolls to Map) */}
              <button
                type="button"
                onClick={scrollToProgressionMap}
                className="relative px-4 py-2 rounded-xl text-xs font-bold font-mono uppercase tracking-wider text-white/70 hover:text-white hover:bg-white/5 transition-all cursor-pointer flex items-center gap-2"
              >
                <Flame className="h-3.5 w-3.5 text-orange-400" />
                <span>02 · 50 Trials Map</span>
              </button>

              {/* Link 3: Player Dossier */}
              <button
                type="button"
                onClick={handleProfileClick}
                className={`relative px-4 py-2 rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  screen === 'PROFILE'
                    ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-md shadow-orange-500/30'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <User className="h-3.5 w-3.5" />
                <span>03 · Shinobi Dossier</span>
              </button>

              {/* Link 4: Hokage Victory (if beaten) */}
              {progress.hasCompletedAll && (
                <button
                  type="button"
                  onClick={handleVictoryClick}
                  className={`relative px-4 py-2 rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                    screen === 'VICTORY'
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
                      : 'text-amber-300 hover:text-white hover:bg-amber-500/20'
                  }`}
                >
                  <Award className="h-3.5 w-3.5 text-amber-300" />
                  <span>04 · Hokage Hall</span>
                </button>
              )}
            </nav>

            {/* ── RIGHT: Shinobi Treasury + Agent Profile + Sound ── */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Treasury Cluster (Score, Coins, Gems) */}
              <div className="hidden md:flex items-center gap-1.5 rounded-2xl bg-white/[0.05] border border-white/12 p-1 px-2.5">
                {/* Score */}
                <div
                  className="flex items-center gap-1.5 px-2 py-1 text-xs font-mono font-bold text-orange-300"
                  title="Total Shinobi Points"
                >
                  <Trophy className="h-3.5 w-3.5 text-orange-400" />
                  <span className="tabular-nums">{animatedScore.toLocaleString()}</span>
                  <span className="text-[10px] text-orange-400/60 uppercase font-sans">pts</span>
                </div>

                <div className="h-4 w-px bg-white/10" />

                {/* Coins */}
                <div
                  className="flex items-center gap-1.5 px-2 py-1 text-xs font-mono font-bold text-amber-200"
                  title="Total Shinobi Coins"
                >
                  <ShinobiCoinIcon size={15} />
                  <span className="tabular-nums">{animatedCoins.toLocaleString()}</span>
                </div>

                <div className="h-4 w-px bg-white/10" />

                {/* Gems */}
                <div
                  className="flex items-center gap-1.5 px-2 py-1 text-xs font-mono font-bold text-sky-200"
                  title="Total Chakra Gems"
                >
                  <ChakraGemIcon size={15} />
                  <span className="tabular-nums">{animatedGems.toLocaleString()}</span>
                </div>
              </div>

              {/* Player Profile Chip */}
              <button
                type="button"
                onClick={handleProfileClick}
                title="Open Profile Customization & Stats"
                className={`flex items-center gap-2 rounded-2xl p-1 pr-3 border transition-all cursor-pointer ${
                  screen === 'PROFILE'
                    ? 'bg-orange-500/25 border-orange-400 shadow-[0_0_15px_rgba(255,122,26,0.4)]'
                    : 'bg-white/5 border-white/12 hover:border-orange-400/50 hover:bg-white/10'
                }`}
              >
                <ShinobiAvatarDisplay
                  avatarId={profile.avatarId}
                  avatarBgId={profile.avatarBgId}
                  frameId={profile.frameId}
                  size="sm"
                />
                <div className="hidden sm:flex flex-col text-left leading-none">
                  <span className="text-xs font-bold text-white max-w-[85px] lg:max-w-[120px] truncate">
                    {profile.playerName}
                  </span>
                  <span className="text-[9px] font-mono text-orange-400/90 font-bold uppercase mt-0.5">
                    {rank} · Lv.{progress.highestUnlockedLevel}
                  </span>
                </div>
              </button>

              {/* Sound Jutsu Toggle */}
              <button
                type="button"
                onClick={onToggleMute}
                aria-label={muted ? 'Unmute Sound' : 'Mute Sound'}
                title={muted ? 'Sound Muted' : 'Sound Enabled'}
                className="h-10 w-10 rounded-2xl border border-white/12 bg-white/5 hover:bg-white/10 hover:border-orange-500/40 flex items-center justify-center transition-all cursor-pointer text-white/80 active:scale-95"
              >
                {muted ? (
                  <VolumeX className="h-4 w-4 text-white/40" />
                ) : (
                  <Volume2 className="h-4 w-4 text-orange-400 drop-shadow-[0_0_6px_rgba(255,122,26,0.6)]" />
                )}
              </button>

              {/* Mobile Hamburger Menu Toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen((o) => !o)}
                aria-label="Toggle Navigation Menu"
                className="lg:hidden h-10 w-10 rounded-2xl border border-white/12 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white cursor-pointer active:scale-95"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE SLIDE-OVER NAVIGATION DRAWER ── */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 sm:top-20 z-40 bg-[#120f1b]/98 backdrop-blur-2xl border-b border-orange-500/30 p-5 shadow-2xl animate-screen-enter">
          {/* Treasury Strip for Mobile */}
          <div className="grid grid-cols-3 gap-2 mb-4 p-3 rounded-2xl bg-white/5 border border-white/10 text-center font-mono">
            <div>
              <div className="text-[10px] uppercase text-white/50 font-sans font-semibold">Score</div>
              <div className="text-sm font-bold text-orange-300 tabular-nums">
                {animatedScore.toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase text-white/50 font-sans font-semibold">Coins</div>
              <div className="text-sm font-bold text-amber-200 tabular-nums">
                {animatedCoins.toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase text-white/50 font-sans font-semibold">Gems</div>
              <div className="text-sm font-bold text-sky-200 tabular-nums">
                {animatedGems.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={handleHomeClick}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-left font-mono text-sm font-bold transition-all cursor-pointer ${
                screen === 'HOME'
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'bg-white/5 text-white/80 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Home className="h-4 w-4" />
                <span>01 · MISSION HUB</span>
              </div>
              <ChevronRight className="h-4 w-4 text-white/50" />
            </button>

            <button
              type="button"
              onClick={scrollToProgressionMap}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 text-white/80 hover:bg-white/10 text-left font-mono text-sm font-bold transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Flame className="h-4 w-4 text-orange-400" />
                <span>02 · 50 TRIALS MAP</span>
              </div>
              <ChevronRight className="h-4 w-4 text-white/50" />
            </button>

            <button
              type="button"
              onClick={handleProfileClick}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-left font-mono text-sm font-bold transition-all cursor-pointer ${
                screen === 'PROFILE'
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'bg-white/5 text-white/80 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <User className="h-4 w-4" />
                <span>03 · SHINOBI DOSSIER</span>
              </div>
              <ChevronRight className="h-4 w-4 text-white/50" />
            </button>

            {progress.hasCompletedAll && (
              <button
                type="button"
                onClick={handleVictoryClick}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-200 text-left font-mono text-sm font-bold transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Award className="h-4 w-4 text-amber-300" />
                  <span>04 · HOKAGE VICTORY HALL</span>
                </div>
                <ChevronRight className="h-4 w-4 text-amber-300/50" />
              </button>
            )}

            {hasProgress && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onRequestReset();
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-red-500/10 border border-red-500/25 text-red-300 text-left font-mono text-xs font-bold transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>RESET PROGRESSION (LV.1)</span>
                </div>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
