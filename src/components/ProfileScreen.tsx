import React, { useState } from 'react';
import { ArrowLeft, Award, Check, Edit3, Home, RotateCcw, Shield, Target, Trophy, X } from 'lucide-react';
import { getAvatarById, SHINOBI_AVATARS } from '../data/avatars';
import { STAGES } from '../data/questions';
import { AvatarId, PlayerProfile, ProfileAccentId, ProfileBannerId, ProfileFrameId, SavedProgress } from '../types/quiz';
import { computeQuizStats } from '../utils/storage';
import {
  getAccentClasses,
  getAccentLabel,
  getBannerLabel,
  getBannerStyle,
  getFrameLabel,
  getFrameStyle,
} from '../utils/profileUtils';
import { useAnimatedNumber } from '../utils/useAnimatedNumber';
import {
  ChakraGemIcon,
  ImageWithFallback,
  KonohaLeafSymbol,
  RankBadge,
  ShinobiCoinIcon,
  WarmDivider,
} from './ShinobiGraphics';

interface ProfileScreenProps {
  profile: PlayerProfile;
  progress: SavedProgress;
  onUpdateProfile: (name: string, avatarId: AvatarId, frameId: ProfileFrameId, bannerId: ProfileBannerId, accentId: ProfileAccentId) => void;
  onBackHome: () => void;
  onContinueGame: () => void;
}

const FRAME_OPTIONS: ProfileFrameId[]  = ['none', 'orange', 'gold', 'red', 'emerald', 'sky', 'rainbow'];
const BANNER_OPTIONS: ProfileBannerId[] = ['default', 'fire', 'forest', 'storm', 'night', 'sakura'];
const ACCENT_OPTIONS: ProfileAccentId[] = ['orange', 'red', 'gold', 'emerald', 'sky', 'purple'];

const ACCENT_HEX: Record<ProfileAccentId, string> = {
  orange: '#f97316', red: '#ef4444', gold: '#f59e0b', emerald: '#10b981', sky: '#0ea5e9', purple: '#8b5cf6',
};
const FRAME_HEX: Record<ProfileFrameId, string> = {
  none: '#e8d5b7', orange: '#f97316', gold: '#f59e0b', red: '#ef4444', emerald: '#10b981', sky: '#0ea5e9', rainbow: '#f97316',
};

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  profile, progress, onUpdateProfile, onBackHome, onContinueGame,
}) => {
  const [isEditing, setIsEditing]       = useState(false);
  const [draftName, setDraftName]       = useState(profile.playerName);
  const [draftAvatar, setDraftAvatar]   = useState<AvatarId>(profile.avatarId);
  const [draftFrame, setDraftFrame]     = useState<ProfileFrameId>(profile.frameId ?? 'orange');
  const [draftBanner, setDraftBanner]   = useState<ProfileBannerId>(profile.bannerId ?? 'default');
  const [draftAccent, setDraftAccent]   = useState<ProfileAccentId>(profile.accentId ?? 'orange');
  const [previewMode, setPreviewMode]   = useState(false);

  const stats         = computeQuizStats(progress);
  const currentAvatar = getAvatarById(profile.avatarId);
  const accent        = getAccentClasses(profile.accentId ?? 'orange');

  const previewAvatar = getAvatarById(previewMode ? draftAvatar : profile.avatarId);
  const previewAccent = getAccentClasses(previewMode ? draftAccent : (profile.accentId ?? 'orange'));
  const previewFrame  = previewMode ? draftFrame : (profile.frameId ?? 'orange');
  const previewBanner = previewMode ? draftBanner : (profile.bannerId ?? 'default');
  const previewName   = previewMode ? (draftName.trim() || 'Konoha Shinobi') : profile.playerName;

  const animatedScore      = useAnimatedNumber(progress.totalScore);
  const animatedCoins      = useAnimatedNumber(progress.totalCoins);
  const animatedGems       = useAnimatedNumber(progress.totalGems);
  const animatedAccuracy   = useAnimatedNumber(stats.accuracyPercentage);
  const animatedCompletion = useAnimatedNumber(stats.completionPercentage);

  const handleOpenEdit = () => {
    setDraftName(profile.playerName);
    setDraftAvatar(profile.avatarId);
    setDraftFrame(profile.frameId ?? 'orange');
    setDraftBanner(profile.bannerId ?? 'default');
    setDraftAccent(profile.accentId ?? 'orange');
    setPreviewMode(false);
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = draftName.trim().slice(0, 24) || 'Konoha Shinobi';
    onUpdateProfile(cleaned, draftAvatar, draftFrame, draftBanner, draftAccent);
    setDraftName(cleaned);
    setIsEditing(false);
    setPreviewMode(false);
  };

  const handleRestoreDefaults = () => {
    setDraftAvatar('uzumaki');
    setDraftFrame('orange');
    setDraftBanner('default');
    setDraftAccent('orange');
    setDraftName('Konoha Shinobi');
    setPreviewMode(true);
  };

  return (
    <div className="animate-screen-enter w-full" style={{ background: '#f5ede0', minHeight: 'calc(100dvh - 64px)' }}>
      <div className="mx-auto max-w-5xl px-3 sm:px-5 lg:px-8 py-6 sm:py-8">

        {/* Nav row */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <button type="button" onClick={onBackHome}
            className="btn-ghost inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold cursor-pointer">
            <ArrowLeft className="h-3.5 w-3.5 text-orange-500 shrink-0" />
            <span>Dashboard</span>
          </button>
          <button type="button" onClick={onBackHome}
            className="btn-ghost inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium cursor-pointer">
            <Home className="h-3.5 w-3.5 shrink-0" />
            <span>Home</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* ── LEFT: Profile Card + Edit ── */}
          <div className="lg:col-span-5">

            {/* Profile Display Card */}
            <div className="rounded-3xl overflow-hidden shadow-xl mb-5" style={{ boxShadow: '0 12px 40px rgba(0,0,0,0.12)' }}>
              {/* Banner */}
              <div className="relative h-28 sm:h-32" style={getBannerStyle(previewBanner)}>
                <div className="pointer-events-none absolute top-3 right-3 opacity-20">
                  <KonohaLeafSymbol size={40} className="text-white" />
                </div>
                {/* Avatar */}
                <div className="absolute -bottom-8 left-6">
                  <div className="relative h-20 w-20 overflow-hidden rounded-2xl" style={getFrameStyle(previewFrame, FRAME_HEX[previewFrame])}>
                    <ImageWithFallback src={previewAvatar.imageSrc} alt={previewAvatar.name} className="h-full w-full object-cover" />
                  </div>
                </div>
              </div>

              {/* Info section */}
              <div className="surface-card pt-10 pb-5 px-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <RankBadge rank={stats.shinobiRank} />
                      <span className="text-[10px] font-mono text-amber-700/40">ID: {profile.playerId}</span>
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase text-[#1a1208] tracking-wide">
                      {previewName}
                    </h2>
                    <p className={`text-xs font-semibold mt-0.5 ${previewAccent.textClass}`}>
                      {previewAvatar.title}
                    </p>
                  </div>
                </div>

                {previewMode && (
                  <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 bg-orange-50 border border-orange-200 rounded-xl px-3 py-1">
                    <span>Preview Mode</span>
                  </div>
                )}

                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-[#5c4a2e]">
                  <span>Level <strong className="font-mono text-[#1a1208]">{progress.highestUnlockedLevel}</strong></span>
                  <span className="text-amber-700/30">·</span>
                  <span>Cleared <strong className="font-mono text-emerald-700">{stats.totalCompleted}/50</strong></span>
                  <span className="text-amber-700/30">·</span>
                  <span>Accuracy <strong className="font-mono text-orange-600">{stats.accuracyPercentage}%</strong></span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {!isEditing ? (
                    <>
                      <button type="button" onClick={handleOpenEdit}
                        className="btn-primary inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold cursor-pointer">
                        <Edit3 className="h-3.5 w-3.5 shrink-0" />
                        <span>Customize Profile</span>
                      </button>
                      <button type="button" onClick={onContinueGame}
                        className="btn-ghost inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer">
                        <span>Play Level {progress.highestUnlockedLevel}</span>
                      </button>
                    </>
                  ) : (
                    <button type="button" onClick={() => { setIsEditing(false); setPreviewMode(false); }}
                      className="btn-ghost inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer">
                      <X className="h-3.5 w-3.5 shrink-0" />
                      <span>Cancel Edit</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-2.5 mb-5">
              {[
                { label: 'Score',  val: animatedScore.toLocaleString(), icon: <Trophy className="h-4 w-4 text-orange-500" />, cls: 'surface-orange', textCls: 'text-orange-800' },
                { label: 'Coins',  val: animatedCoins.toLocaleString(), icon: <ShinobiCoinIcon size={18} />,                  cls: 'surface-gold',   textCls: 'text-amber-800' },
                { label: 'Gems',   val: animatedGems.toLocaleString(),  icon: <ChakraGemIcon size={18} />,                   cls: 'surface-sky',    textCls: 'text-sky-800'   },
              ].map((s) => (
                <div key={s.label} className={`${s.cls} rounded-2xl p-3 text-center`}>
                  <div className="flex justify-center mb-1">{s.icon}</div>
                  <div className={`font-mono text-lg font-bold tabular-nums ${s.textCls}`}>{s.val}</div>
                  <div className="text-[10px] text-current opacity-50">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Edit Form or Stats ── */}
          <div className="lg:col-span-7">

            {isEditing ? (
              /* ── EDIT FORM ── */
              <form onSubmit={handleSave} className="surface-card rounded-3xl p-5 sm:p-6 animate-panel-enter">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-display text-2xl font-bold uppercase text-[#1a1208]">Customize Profile</h2>
                  <div className="flex items-center gap-2">
                    <button type="button" onClick={() => setPreviewMode((p) => !p)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        previewMode ? 'bg-orange-100 text-orange-700 border border-orange-300' : 'btn-ghost'
                      }`}>
                      {previewMode ? <Check className="h-3 w-3" /> : null}
                      Preview
                    </button>
                    <button type="button" onClick={handleRestoreDefaults}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold btn-ghost cursor-pointer">
                      <RotateCcw className="h-3 w-3" />
                      Defaults
                    </button>
                  </div>
                </div>

                <div className="space-y-5">
                  {/* Name */}
                  <div>
                    <label htmlFor="shinobi-name" className="block text-xs font-bold tracking-wider uppercase text-amber-700/60 mb-2">
                      Shinobi Name (max 24 chars)
                    </label>
                    <input
                      id="shinobi-name"
                      type="text"
                      maxLength={24}
                      value={draftName}
                      onChange={(e) => { setDraftName(e.target.value); setPreviewMode(true); }}
                      placeholder="Enter shinobi name"
                      className="w-full rounded-xl px-4 py-2.5 text-sm font-semibold text-[#1a1208] placeholder-amber-700/30 focus:outline-none transition-all"
                      style={{ background: '#fdf8f0', border: '2px solid #e8d5b7', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}
                      onFocus={(e) => e.target.style.borderColor = '#f97316'}
                      onBlur={(e) => e.target.style.borderColor = '#e8d5b7'}
                    />
                  </div>

                  {/* Avatar Selection */}
                  <div>
                    <div className="text-xs font-bold tracking-wider uppercase text-amber-700/60 mb-2">Select Avatar</div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {SHINOBI_AVATARS.map((av) => {
                        const sel = draftAvatar === av.id;
                        return (
                          <button key={av.id} type="button"
                            onClick={() => { setDraftAvatar(av.id); setPreviewMode(true); }}
                            className={`rounded-2xl p-2 border-2 text-left transition-all cursor-pointer ${
                              sel ? 'border-orange-500 bg-orange-50 shadow-md' : 'border-amber-200 bg-white hover:border-orange-300'
                            }`}>
                            <div className="relative aspect-square overflow-hidden rounded-xl mb-1.5">
                              <ImageWithFallback src={av.imageSrc} alt={av.name} className="h-full w-full object-cover" />
                              {sel && (
                                <div className="absolute top-1 right-1 h-5 w-5 rounded-full bg-orange-500 flex items-center justify-center">
                                  <Check className="h-3 w-3 text-white" strokeWidth={3} />
                                </div>
                              )}
                            </div>
                            <div className="text-xs font-bold text-[#1a1208] truncate">{av.name}</div>
                            <div className="text-[10px] text-amber-700/50 truncate">{av.title}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Profile Frame */}
                  <div>
                    <div className="text-xs font-bold tracking-wider uppercase text-amber-700/60 mb-2">Profile Frame</div>
                    <div className="flex flex-wrap gap-2">
                      {FRAME_OPTIONS.map((f) => {
                        const sel = draftFrame === f;
                        const hex = FRAME_HEX[f];
                        return (
                          <button key={f} type="button"
                            onClick={() => { setDraftFrame(f); setPreviewMode(true); }}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border-2 transition-all cursor-pointer ${sel ? 'shadow-sm' : ''}`}
                            style={{
                              borderColor: sel ? hex : '#e8d5b7',
                              background: sel ? `${hex}18` : '#fdf8f0',
                              color: sel ? hex : '#9c7c50',
                            }}>
                            <span className="h-3 w-3 rounded-full" style={{ background: hex, boxShadow: `0 0 4px ${hex}80` }} />
                            {getFrameLabel(f)}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Banner */}
                  <div>
                    <div className="text-xs font-bold tracking-wider uppercase text-amber-700/60 mb-2">Profile Banner</div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {BANNER_OPTIONS.map((b) => {
                        const sel = draftBanner === b;
                        return (
                          <button key={b} type="button"
                            onClick={() => { setDraftBanner(b); setPreviewMode(true); }}
                            className={`relative h-10 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${sel ? 'border-orange-500 scale-105 shadow-md' : 'border-transparent'}`}
                            style={getBannerStyle(b)}>
                            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white/90 tracking-wide">
                              {getBannerLabel(b)}
                            </span>
                            {sel && (
                              <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-orange-500 flex items-center justify-center">
                                <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Accent Color */}
                  <div>
                    <div className="text-xs font-bold tracking-wider uppercase text-amber-700/60 mb-2">Accent Color</div>
                    <div className="flex flex-wrap gap-2">
                      {ACCENT_OPTIONS.map((a) => {
                        const sel = draftAccent === a;
                        const hex = ACCENT_HEX[a];
                        return (
                          <button key={a} type="button"
                            onClick={() => { setDraftAccent(a); setPreviewMode(true); }}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border-2 transition-all cursor-pointer ${sel ? 'shadow-sm' : ''}`}
                            style={{
                              borderColor: sel ? hex : '#e8d5b7',
                              background: sel ? `${hex}18` : '#fdf8f0',
                              color: sel ? hex : '#9c7c50',
                            }}>
                            <span className="h-3 w-3 rounded-full" style={{ background: hex }} />
                            {getAccentLabel(a)}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <WarmDivider />

                {/* Save / Cancel */}
                <div className="flex gap-2.5 mt-4">
                  <button type="button"
                    onClick={() => { setIsEditing(false); setPreviewMode(false); }}
                    className="btn-ghost flex-1 px-4 py-3 rounded-xl text-sm font-semibold cursor-pointer">
                    Cancel
                  </button>
                  <button type="submit"
                    className="btn-primary flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold cursor-pointer">
                    <Check className="h-4 w-4 shrink-0" />
                    Save Profile
                  </button>
                </div>
              </form>
            ) : (
              /* ── STATS VIEW ── */
              <div className="space-y-4">

                {/* Precision Card */}
                <div className="surface-card rounded-3xl p-5 sm:p-6">
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="h-8 w-8 rounded-xl bg-emerald-100 flex items-center justify-center">
                      <Target className="h-4 w-4 text-emerald-600" />
                    </div>
                    <span className="text-sm font-bold text-[#1a1208]">Shinobi Precision</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="surface-emerald rounded-2xl p-3.5">
                      <div className="text-xs text-emerald-700/60 mb-0.5">1st Attempt</div>
                      <div className="font-display text-2xl font-bold text-emerald-800 tabular-nums">{stats.firstAttemptCount}</div>
                      <div className="text-[11px] text-emerald-700/50">2× Score</div>
                    </div>
                    <div className="surface-gold rounded-2xl p-3.5">
                      <div className="text-xs text-amber-700/60 mb-0.5">2nd Attempt</div>
                      <div className="font-display text-2xl font-bold text-amber-800 tabular-nums">{stats.secondAttemptCount}</div>
                      <div className="text-[11px] text-amber-700/50">Clutch</div>
                    </div>
                  </div>

                  <div className="space-y-3.5">
                    {[
                      { label: 'Accuracy', value: animatedAccuracy, pct: stats.accuracyPercentage, fill: 'progress-fill-emerald', text: 'text-emerald-700' },
                      { label: 'Completion', value: animatedCompletion, pct: stats.completionPercentage, fill: 'progress-fill-orange', text: 'text-orange-700', sub: `(${stats.totalCompleted}/50)` },
                    ].map((s) => (
                      <div key={s.label}>
                        <div className="flex justify-between text-xs font-semibold mb-1.5">
                          <span className="text-[#5c4a2e]">{s.label}</span>
                          <span className={`font-mono tabular-nums ${s.text}`}>{s.value}% {s.sub ?? ''}</span>
                        </div>
                        <div className="progress-track h-2.5">
                          <div className={`h-full ${s.fill} progress-bar-fill rounded-full transition-all duration-700`} style={{ width: `${s.pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stage Mastery */}
                <div className="surface-card rounded-3xl p-5 sm:p-6">
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="h-8 w-8 rounded-xl bg-orange-100 flex items-center justify-center">
                      <Shield className="h-4 w-4 text-orange-600" />
                    </div>
                    <span className="text-sm font-bold text-[#1a1208]">Stage Mastery</span>
                  </div>

                  <div className="space-y-3.5">
                    {STAGES.map((stage) => {
                      const bucket = stats.byDifficulty[stage.difficulty];
                      const pct    = Math.round((bucket.completed / bucket.total) * 100);
                      return (
                        <div key={stage.difficulty}>
                          <div className="flex items-baseline justify-between text-xs font-semibold mb-1.5">
                            <span className="text-[#5c4a2e]">{stage.title} <span className="text-amber-700/40">({stage.difficulty})</span></span>
                            <span className="font-mono text-[#5c4a2e] tabular-nums shrink-0 ml-2">{bucket.completed}/{bucket.total}</span>
                          </div>
                          <div className="progress-track h-2">
                            <div className="h-full rounded-full transition-all duration-700"
                              style={{ width: `${pct}%`, backgroundColor: stage.accentHex, boxShadow: `0 0 6px ${stage.accentHex}80` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-4 pt-4 divider-warm" />
                  <div className="flex items-center justify-between text-xs text-amber-700/50 mt-3">
                    <span className="flex items-center gap-1.5">
                      <Award className="h-3.5 w-3.5 text-amber-500" />
                      Highest Level: <strong className="font-mono text-[#5c4a2e] ml-1">Lv.{progress.highestUnlockedLevel}</strong>
                    </span>
                    <span className="font-mono">{progress.hasCompletedAll ? '🏆 Hokage' : 'Active Run'}</span>
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
