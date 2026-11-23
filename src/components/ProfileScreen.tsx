import React, { useState } from 'react';
import {
  ArrowLeft,
  Award,
  Check,
  ChevronRight,
  Flame,
  Gamepad2,
  Home,
  Palette,
  RotateCcw,
  Save,
  Shield,
  Sparkles,
  Star,
  Target,
  Trophy,
  User,
  X,
} from 'lucide-react';
import { AVATAR_BG_OPTIONS, getAvatarBgById, getAvatarById, SHINOBI_AVATARS } from '../data/avatars';
import { STAGES } from '../data/questions';
import {
  AvatarId,
  PlayerProfile,
  ProfileAccentId,
  ProfileAvatarBgId,
  ProfileBannerId,
  ProfileFrameId,
  SavedProgress,
} from '../types/quiz';
import {
  getAccentClasses,
  getAccentLabel,
  getBannerLabel,
  getBannerStyle,
  getFrameLabel,
} from '../utils/profileUtils';
import { computeQuizStats } from '../utils/storage';
import { useAnimatedNumber } from '../utils/useAnimatedNumber';
import {
  ChakraGemIcon,
  KonohaLeafSymbol,
  RankBadge,
  ShinobiAvatarDisplay,
  ShinobiCoinIcon,
} from './ShinobiGraphics';

interface ProfileScreenProps {
  profile: PlayerProfile;
  progress: SavedProgress;
  onUpdateProfile: (
    name: string,
    avatarId: AvatarId,
    avatarBgId: ProfileAvatarBgId,
    frameId: ProfileFrameId,
    bannerId: ProfileBannerId,
    accentId: ProfileAccentId
  ) => void;
  onBackHome: () => void;
  onContinueGame: () => void;
}

const FRAME_OPTIONS: { id: ProfileFrameId; label: string; tag: string }[] = [
  { id: 'hokage', label: 'Hokage Crest', tag: 'Legendary' },
  { id: 'sage', label: 'Sage Aura', tag: 'Mythic' },
  { id: 'celestial', label: 'Celestial Seal', tag: 'Exotic' },
  { id: 'anbu', label: 'Anbu Shadow', tag: 'Special Ops' },
  { id: 'jonin', label: 'Jonin Silver', tag: 'Elite' },
  { id: 'chunin', label: 'Chunin Plate', tag: 'Shinobi' },
  { id: 'wood', label: 'Academy Timber', tag: 'Rookie' },
  { id: 'none', label: 'Classic Border', tag: 'Minimal' },
];

const BANNER_OPTIONS: ProfileBannerId[] = [
  'default',
  'fire',
  'forest',
  'storm',
  'night',
  'sakura',
  'hokage_rock',
  'valley_end',
];

const ACCENT_OPTIONS: { id: ProfileAccentId; name: string; hex: string }[] = [
  { id: 'orange', name: 'Naruto Orange', hex: '#ff7a1a' },
  { id: 'gold', name: 'Hokage Gold', hex: '#f59e0b' },
  { id: 'red', name: 'Sharingan Red', hex: '#ef4444' },
  { id: 'emerald', name: 'Sage Emerald', hex: '#10b981' },
  { id: 'sky', name: 'Chidori Cyan', hex: '#0ea5e9' },
  { id: 'purple', name: 'Rinnegan Purple', hex: '#8b5cf6' },
];

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  profile,
  progress,
  onUpdateProfile,
  onBackHome,
  onContinueGame,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'customize'>('profile');
  const [draftName, setDraftName] = useState(profile.playerName);
  const [draftAvatar, setDraftAvatar] = useState<AvatarId>(profile.avatarId);
  const [draftAvatarBg, setDraftAvatarBg] = useState<ProfileAvatarBgId>(profile.avatarBgId ?? 'leaf');
  const [draftFrame, setDraftFrame] = useState<ProfileFrameId>(profile.frameId ?? 'hokage');
  const [draftBanner, setDraftBanner] = useState<ProfileBannerId>(profile.bannerId ?? 'default');
  const [draftAccent, setDraftAccent] = useState<ProfileAccentId>(profile.accentId ?? 'orange');
  const [savedNotification, setSavedNotification] = useState(false);

  const stats = computeQuizStats(progress);
  const currentAccent = getAccentClasses(profile.accentId ?? 'orange');
  const previewAccent = getAccentClasses(draftAccent);

  const animatedScore = useAnimatedNumber(progress.totalScore);
  const animatedCoins = useAnimatedNumber(progress.totalCoins);
  const animatedGems = useAnimatedNumber(progress.totalGems);

  const handleOpenCustomize = () => {
    setDraftName(profile.playerName);
    setDraftAvatar(profile.avatarId);
    setDraftAvatarBg(profile.avatarBgId ?? 'leaf');
    setDraftFrame(profile.frameId ?? 'hokage');
    setDraftBanner(profile.bannerId ?? 'default');
    setDraftAccent(profile.accentId ?? 'orange');
    setActiveTab('customize');
  };

  const handleSaveCustomization = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = draftName.trim().slice(0, 24) || 'Konoha Shinobi';
    onUpdateProfile(cleanName, draftAvatar, draftAvatarBg, draftFrame, draftBanner, draftAccent);
    setDraftName(cleanName);
    setSavedNotification(true);
    setTimeout(() => {
      setSavedNotification(false);
      setActiveTab('profile');
    }, 700);
  };

  const handleRestoreDefaults = () => {
    setDraftName('Konoha Shinobi');
    setDraftAvatar('uzumaki');
    setDraftAvatarBg('leaf');
    setDraftFrame('hokage');
    setDraftBanner('default');
    setDraftAccent('orange');
  };

  const selectedAvatarData = getAvatarById(draftAvatar);

  return (
    <div className="animate-screen-enter w-full pb-16 pt-4 sm:pt-6">
      <div className="mx-auto max-w-6xl px-3 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb Bar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onBackHome}
              className="btn-secondary inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold sm:text-sm"
            >
              <ArrowLeft className="h-4 w-4 text-orange-400" />
              <span>Back to Dashboard</span>
            </button>
            <button
              type="button"
              onClick={onBackHome}
              className="btn-secondary inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold text-white/70"
            >
              <Home className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Home</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex rounded-xl bg-white/5 p-1 border border-white/10">
              <button
                type="button"
                onClick={() => setActiveTab('profile')}
                className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'profile'
                    ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-md'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <User className="h-3.5 w-3.5" />
                <span>Shinobi Dossier</span>
              </button>
              <button
                type="button"
                onClick={handleOpenCustomize}
                className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'customize'
                    ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-md'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Palette className="h-3.5 w-3.5" />
                <span>Customize Profile</span>
              </button>
            </div>

            <button
              type="button"
              onClick={onContinueGame}
              className="btn-primary inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold shadow-lg"
            >
              <Gamepad2 className="h-3.5 w-3.5" />
              <span>Play Lv.{progress.highestUnlockedLevel}</span>
            </button>
          </div>
        </div>

        {/* ════ MAIN GRID ════ */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* ── LEFT: LIVE PLAYER HERO CARD ── */}
          <div className="lg:col-span-5">
            <div className="sticky top-20 space-y-5">
              {/* Profile Card */}
              <div className="overflow-hidden rounded-3xl border border-white/15 bg-[#171421] shadow-2xl">
                {/* Banner */}
                <div
                  className="relative h-32 sm:h-36 transition-all duration-300"
                  style={getBannerStyle(activeTab === 'customize' ? draftBanner : profile.bannerId)}
                >
                  <div className="pointer-events-none absolute right-4 top-4 opacity-25">
                    <KonohaLeafSymbol size={60} className="text-white" />
                  </div>
                  <div className="absolute bottom-2 right-4 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-mono font-bold tracking-wider uppercase text-amber-200/90 backdrop-blur-md">
                    {getBannerLabel(activeTab === 'customize' ? draftBanner : profile.bannerId)}
                  </div>

                  {/* Avatar Anchor */}
                  <div className="absolute -bottom-10 left-6 sm:left-8">
                    <ShinobiAvatarDisplay
                      avatarId={activeTab === 'customize' ? draftAvatar : profile.avatarId}
                      avatarBgId={activeTab === 'customize' ? draftAvatarBg : profile.avatarBgId}
                      frameId={activeTab === 'customize' ? draftFrame : profile.frameId}
                      size="xl"
                      showAura
                    />
                  </div>
                </div>

                {/* Profile Info */}
                <div className="px-6 pb-6 pt-12 sm:px-8">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <div className="mb-1 flex items-center gap-2">
                        <RankBadge rank={stats.shinobiRank} />
                        <span className="font-mono text-[11px] text-orange-300/60">
                          {profile.playerId}
                        </span>
                      </div>
                      <h1 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
                        {activeTab === 'customize' ? draftName || 'Konoha Shinobi' : profile.playerName}
                      </h1>
                      <p
                        className="mt-0.5 text-xs font-semibold"
                        style={{
                          color: (activeTab === 'customize' ? previewAccent : currentAccent).hex,
                        }}
                      >
                        {
                          getAvatarById(activeTab === 'customize' ? draftAvatar : profile.avatarId)
                            .title
                        }
                      </p>
                    </div>

                    {activeTab === 'profile' && (
                      <button
                        type="button"
                        onClick={handleOpenCustomize}
                        className="btn-secondary inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold"
                      >
                        <Palette className="h-3.5 w-3.5 text-orange-400" />
                        <span>Edit Style</span>
                      </button>
                    )}
                  </div>

                  <p className="mt-3 text-xs italic text-white/50 border-l-2 border-white/20 pl-3 leading-relaxed">
                    "{getAvatarById(activeTab === 'customize' ? draftAvatar : profile.avatarId).quote}"
                  </p>

                  <div className="mt-5 grid grid-cols-3 gap-2.5 border-t border-white/10 pt-4 text-center">
                    <div className="rounded-2xl bg-white/5 p-2.5 border border-white/8">
                      <div className="text-[10px] uppercase tracking-wider text-white/40">Level</div>
                      <div className="font-mono text-lg font-bold text-orange-400 tabular-nums">
                        {progress.highestUnlockedLevel}
                        <span className="text-xs text-white/40">/50</span>
                      </div>
                    </div>
                    <div className="rounded-2xl bg-white/5 p-2.5 border border-white/8">
                      <div className="text-[10px] uppercase tracking-wider text-white/40">Cleared</div>
                      <div className="font-mono text-lg font-bold text-emerald-400 tabular-nums">
                        {stats.totalCompleted}
                        <span className="text-xs text-white/40"> ({stats.completionPercentage}%)</span>
                      </div>
                    </div>
                    <div className="rounded-2xl bg-white/5 p-2.5 border border-white/8">
                      <div className="text-[10px] uppercase tracking-wider text-white/40">Accuracy</div>
                      <div className="font-mono text-lg font-bold text-amber-300 tabular-nums">
                        {stats.accuracyPercentage}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Currency Strip */}
              <div className="grid grid-cols-3 gap-3">
                <div className="surface-dark-card rounded-2xl p-3 text-center border border-orange-500/20">
                  <div className="flex justify-center mb-1 text-orange-400">
                    <Trophy className="h-4 w-4" />
                  </div>
                  <div className="font-mono text-lg font-bold text-orange-200 tabular-nums">
                    {animatedScore.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-orange-400/70 font-semibold uppercase tracking-wider">
                    Total Score
                  </div>
                </div>

                <div className="surface-dark-card rounded-2xl p-3 text-center border border-amber-500/20">
                  <div className="flex justify-center mb-1">
                    <ShinobiCoinIcon size={18} />
                  </div>
                  <div className="font-mono text-lg font-bold text-amber-200 tabular-nums">
                    {animatedCoins.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-amber-400/70 font-semibold uppercase tracking-wider">
                    Coins
                  </div>
                </div>

                <div className="surface-dark-card rounded-2xl p-3 text-center border border-sky-500/20">
                  <div className="flex justify-center mb-1">
                    <ChakraGemIcon size={18} />
                  </div>
                  <div className="font-mono text-lg font-bold text-sky-200 tabular-nums">
                    {animatedGems.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-sky-400/70 font-semibold uppercase tracking-wider">
                    Chakra Gems
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN: DOSSIER OR CUSTOMIZER ── */}
          <div className="lg:col-span-7">
            {activeTab === 'customize' ? (
              /* ════ PROFILE CUSTOMIZER TAB ════ */
              <form
                onSubmit={handleSaveCustomization}
                className="surface-dark-card rounded-3xl p-5 sm:p-7 border border-white/15 shadow-2xl animate-panel-enter space-y-7"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase text-white flex items-center gap-2">
                      <Palette className="h-6 w-6 text-orange-400" />
                      <span>Customization Chamber</span>
                    </h2>
                    <p className="text-xs text-white/50">
                      Personalize your identity. Changes update the live preview on the left.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleRestoreDefaults}
                      className="btn-secondary inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold text-white/70"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      <span>Reset Defaults</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('profile')}
                      className="btn-secondary rounded-xl p-1.5 text-white/60 hover:text-white"
                      title="Cancel"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {savedNotification && (
                  <div className="animate-bounce-in rounded-2xl bg-emerald-500/20 border border-emerald-400/40 p-3 text-center text-sm font-bold text-emerald-300">
                    ✓ Profile personalization saved permanently!
                  </div>
                )}

                {/* 1. Shinobi Name */}
                <div>
                  <label
                    htmlFor="shinobi-name-input"
                    className="block text-xs font-bold uppercase tracking-wider text-orange-400 mb-2"
                  >
                    1. Shinobi Codename (Max 24 characters)
                  </label>
                  <div className="relative">
                    <input
                      id="shinobi-name-input"
                      type="text"
                      maxLength={24}
                      value={draftName}
                      onChange={(e) => setDraftName(e.target.value)}
                      placeholder="Enter shinobi name"
                      className="w-full rounded-2xl bg-white/5 border-2 border-white/15 px-4 py-3 text-sm sm:text-base font-semibold text-white placeholder-white/30 focus:border-orange-500 focus:outline-none transition-all shadow-inner"
                    />
                    <span className="absolute right-3.5 top-3.5 font-mono text-xs text-white/40">
                      {draftName.length}/24
                    </span>
                  </div>
                </div>

                {/* 2. Shinobi Avatar Selection */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-orange-400 mb-2">
                    2. Select Shinobi Avatar (8 Character Archetypes)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {SHINOBI_AVATARS.map((av) => {
                      const isSelected = draftAvatar === av.id;
                      return (
                        <button
                          key={av.id}
                          type="button"
                          onClick={() => setDraftAvatar(av.id)}
                          className={`group relative flex flex-col items-center rounded-2xl p-2.5 text-center transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-orange-500/20 border-2 border-orange-400 shadow-[0_0_15px_rgba(255,122,26,0.4)]'
                              : 'bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10'
                          }`}
                        >
                          {isSelected && (
                            <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-white shadow-md">
                              <Check className="h-3 w-3 stroke-[3]" />
                            </span>
                          )}
                          <div className="h-14 w-14 overflow-hidden rounded-xl border border-white/20 mb-2">
                            <img
                              src={av.imageSrc}
                              alt={av.name}
                              className="h-full w-full object-cover transition-transform group-hover:scale-110"
                            />
                          </div>
                          <div className="text-xs font-bold text-white truncate max-w-full">
                            {av.name}
                          </div>
                          <div className="text-[10px] text-white/50 truncate max-w-full">
                            {av.village}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Avatar Chakra Background */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-orange-400 mb-2">
                    3. Avatar Chakra Aura Background
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {AVATAR_BG_OPTIONS.map((bg) => {
                      const isSelected = draftAvatarBg === bg.id;
                      return (
                        <button
                          key={bg.id}
                          type="button"
                          onClick={() => setDraftAvatarBg(bg.id)}
                          className={`flex items-center gap-2.5 rounded-xl p-2.5 text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'border-2 border-amber-400 bg-amber-500/20 shadow-md'
                              : 'border border-white/10 bg-white/5 hover:bg-white/10'
                          }`}
                        >
                          <span
                            className="h-6 w-6 rounded-lg shrink-0 border border-white/30 shadow-inner"
                            style={{ background: bg.cssBackground }}
                          />
                          <span className="text-xs font-bold text-white truncate">{bg.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Profile Frame */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-orange-400 mb-2">
                    4. Profile Avatar Frame
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {FRAME_OPTIONS.map((frm) => {
                      const isSelected = draftFrame === frm.id;
                      return (
                        <button
                          key={frm.id}
                          type="button"
                          onClick={() => setDraftFrame(frm.id)}
                          className={`flex flex-col rounded-xl p-2.5 text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'border-2 border-orange-400 bg-orange-500/20 shadow-md'
                              : 'border border-white/10 bg-white/5 hover:bg-white/10'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="text-xs font-bold text-white truncate">{frm.label}</span>
                            {isSelected && <Check className="h-3 w-3 text-orange-400 shrink-0" />}
                          </div>
                          <span className="text-[10px] font-mono text-white/50">{frm.tag}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 5. Profile Banner */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-orange-400 mb-2">
                    5. Profile Header Banner
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {BANNER_OPTIONS.map((banId) => {
                      const isSelected = draftBanner === banId;
                      return (
                        <button
                          key={banId}
                          type="button"
                          onClick={() => setDraftBanner(banId)}
                          className={`group relative overflow-hidden rounded-xl p-2.5 text-left transition-all cursor-pointer border ${
                            isSelected
                              ? 'border-2 border-orange-400 shadow-md ring-2 ring-orange-400/30'
                              : 'border-white/10 hover:border-white/30'
                          }`}
                          style={getBannerStyle(banId)}
                        >
                          <div className="relative z-10 flex items-center justify-between">
                            <span className="text-xs font-bold text-white drop-shadow-md truncate">
                              {getBannerLabel(banId)}
                            </span>
                            {isSelected && <Check className="h-3 w-3 text-orange-300 drop-shadow" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 6. Accent Color */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-orange-400 mb-2">
                    6. Theme Accent Glow
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {ACCENT_OPTIONS.map((acc) => {
                      const isSelected = draftAccent === acc.id;
                      return (
                        <button
                          key={acc.id}
                          type="button"
                          onClick={() => setDraftAccent(acc.id)}
                          className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold transition-all cursor-pointer ${
                            isSelected
                              ? 'border-2 border-white bg-white/15 text-white shadow-lg'
                              : 'border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          <span
                            className="h-3.5 w-3.5 rounded-full border border-white/40"
                            style={{ backgroundColor: acc.hex }}
                          />
                          <span>{acc.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-white/10">
                  <button
                    type="submit"
                    className="btn-primary flex-1 w-full inline-flex items-center justify-center gap-2 rounded-2xl py-3.5 text-base font-bold shadow-xl cursor-pointer"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Customization</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('profile')}
                    className="btn-secondary w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold cursor-pointer"
                  >
                    <span>Cancel</span>
                  </button>
                </div>
              </form>
            ) : (
              /* ════ SHINOBI DOSSIER / STATS TAB ════ */
              <div className="space-y-6">
                {/* Shinobi Mastery Overview */}
                <div className="surface-dark-card rounded-3xl p-6 sm:p-7 border border-white/15 shadow-xl">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase text-white flex items-center gap-2">
                        <Award className="h-6 w-6 text-orange-400" />
                        <span>Shinobi Rank & Trials Mastery</span>
                      </h2>
                      <p className="text-xs text-white/50">
                        Detailed track record across all 4 trial difficulties and 50 levels.
                      </p>
                    </div>
                  </div>

                  {/* Stage-by-Stage Breakdown Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {STAGES.map((stg) => {
                      const diffStats = stats.byDifficulty[stg.difficulty];
                      const isComplete = diffStats.completed === diffStats.total;
                      return (
                        <div
                          key={stg.difficulty}
                          className={`rounded-2xl p-4 border transition-all ${
                            isComplete
                              ? 'bg-emerald-950/20 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                              : 'bg-white/5 border-white/10'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-orange-400">
                              {stg.rangeLabel}
                            </span>
                            <span
                              className={`text-xs font-mono font-bold ${
                                isComplete ? 'text-emerald-400' : 'text-white/60'
                              }`}
                            >
                              {diffStats.completed}/{diffStats.total} Cleared
                            </span>
                          </div>

                          <h3 className="font-display text-lg font-bold uppercase text-white">
                            {stg.title}
                          </h3>
                          <div className="text-[11px] text-white/50 mb-3">{stg.japaneseSubtitle}</div>

                          <div className="progress-track h-2 mb-2 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full"
                              style={{
                                width: `${Math.round((diffStats.completed / diffStats.total) * 100)}%`,
                              }}
                            />
                          </div>

                          <div className="flex items-center justify-between text-[11px] text-white/50">
                            <span>1st Try (2X): {diffStats.firstAttempt}</span>
                            <span>2nd Try: {diffStats.secondAttempt}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Performance Analytics Card */}
                <div className="surface-dark-card rounded-3xl p-6 border border-white/15 shadow-xl">
                  <h3 className="font-display text-xl font-bold uppercase text-white mb-4 flex items-center gap-2">
                    <Target className="h-5 w-5 text-emerald-400" />
                    <span>Trial Combat Metrics</span>
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                    <div className="rounded-2xl bg-white/5 p-3.5 border border-white/10">
                      <div className="font-mono text-2xl font-bold text-emerald-400">
                        {stats.firstAttemptCount}
                      </div>
                      <div className="text-xs text-white/70 font-semibold mt-0.5">2X Multipliers</div>
                      <div className="text-[10px] text-white/40">First-try answers</div>
                    </div>

                    <div className="rounded-2xl bg-white/5 p-3.5 border border-white/10">
                      <div className="font-mono text-2xl font-bold text-amber-400">
                        {stats.secondAttemptCount}
                      </div>
                      <div className="text-xs text-white/70 font-semibold mt-0.5">100pt Clears</div>
                      <div className="text-[10px] text-white/40">Second-try recoveries</div>
                    </div>

                    <div className="rounded-2xl bg-white/5 p-3.5 border border-white/10">
                      <div className="font-mono text-2xl font-bold text-red-400">
                        {progress.totalWrongAnswers}
                      </div>
                      <div className="text-xs text-white/70 font-semibold mt-0.5">Wrong Attempts</div>
                      <div className="text-[10px] text-white/40">Seals broken</div>
                    </div>

                    <div className="rounded-2xl bg-white/5 p-3.5 border border-white/10">
                      <div className="font-mono text-2xl font-bold text-sky-400">
                        {stats.accuracyPercentage}%
                      </div>
                      <div className="text-xs text-white/70 font-semibold mt-0.5">Overall Accuracy</div>
                      <div className="text-[10px] text-white/40">Success ratio</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
