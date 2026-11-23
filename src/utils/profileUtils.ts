import React from 'react';
import { ProfileAccentId, ProfileAvatarBgId, ProfileBannerId, ProfileFrameId } from '../types/quiz';

export interface AccentClasses {
  borderClass: string;
  textClass: string;
  bgClass: string;
  ringClass: string;
  shadowColor: string;
  hex: string;
  gradient: string;
}

export function getAccentClasses(accentId: ProfileAccentId = 'orange'): AccentClasses {
  const map: Record<ProfileAccentId, AccentClasses> = {
    orange: {
      borderClass: 'border-orange-500',
      textClass: 'text-orange-500',
      bgClass: 'bg-orange-500/10',
      ringClass: 'ring-orange-500/40',
      shadowColor: 'rgba(249,115,22,0.4)',
      hex: '#f97316',
      gradient: 'linear-gradient(135deg, #ff7a1a 0%, #ea580c 50%, #dc2626 100%)',
    },
    red: {
      borderClass: 'border-red-500',
      textClass: 'text-red-500',
      bgClass: 'bg-red-500/10',
      ringClass: 'ring-red-500/40',
      shadowColor: 'rgba(239,68,68,0.4)',
      hex: '#ef4444',
      gradient: 'linear-gradient(135deg, #f43f5e 0%, #dc2626 50%, #991b1b 100%)',
    },
    gold: {
      borderClass: 'border-amber-500',
      textClass: 'text-amber-500',
      bgClass: 'bg-amber-500/10',
      ringClass: 'ring-amber-500/40',
      shadowColor: 'rgba(245,158,11,0.4)',
      hex: '#f59e0b',
      gradient: 'linear-gradient(135deg, #fbbf24 0%, #d97706 60%, #b45309 100%)',
    },
    emerald: {
      borderClass: 'border-emerald-500',
      textClass: 'text-emerald-500',
      bgClass: 'bg-emerald-500/10',
      ringClass: 'ring-emerald-500/40',
      shadowColor: 'rgba(16,185,129,0.4)',
      hex: '#10b981',
      gradient: 'linear-gradient(135deg, #34d399 0%, #059669 60%, #064e3b 100%)',
    },
    sky: {
      borderClass: 'border-sky-500',
      textClass: 'text-sky-500',
      bgClass: 'bg-sky-500/10',
      ringClass: 'ring-sky-500/40',
      shadowColor: 'rgba(14,165,233,0.4)',
      hex: '#0ea5e9',
      gradient: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 60%, #0c4a6e 100%)',
    },
    purple: {
      borderClass: 'border-violet-500',
      textClass: 'text-violet-500',
      bgClass: 'bg-violet-500/10',
      ringClass: 'ring-violet-500/40',
      shadowColor: 'rgba(139,92,246,0.4)',
      hex: '#8b5cf6',
      gradient: 'linear-gradient(135deg, #a78bfa 0%, #7c3aed 60%, #4c1d95 100%)',
    },
  };
  return map[accentId] ?? map.orange;
}

export function getFrameStyle(frameId: ProfileFrameId, hex: string = '#f97316'): React.CSSProperties {
  switch (frameId) {
    case 'none':
      return { border: '2px solid rgba(228,217,199,0.6)', borderRadius: '1rem' };
    case 'wood':
      return {
        border: '3px solid #854d0e',
        boxShadow: '0 0 0 2px #d97706, inset 0 0 8px rgba(113,63,18,0.8), 0 4px 12px rgba(0,0,0,0.5)',
        borderRadius: '1.1rem',
      };
    case 'chunin':
      return {
        border: '3px solid #94a3b8',
        boxShadow: '0 0 0 2px #334155, 0 0 14px rgba(148,163,184,0.4), inset 0 0 6px rgba(255,255,255,0.4)',
        borderRadius: '1.1rem',
      };
    case 'jonin':
      return {
        border: '3px solid #e2e8f0',
        boxShadow: '0 0 0 2px #475569, 0 0 18px rgba(226,232,240,0.6), inset 0 0 10px rgba(56,189,248,0.3)',
        borderRadius: '1.1rem',
      };
    case 'anbu':
      return {
        border: '3px solid #1e1b24',
        boxShadow: '0 0 0 2px #f59e0b, 0 0 16px rgba(245,158,11,0.5), inset 0 0 8px rgba(0,0,0,0.9)',
        borderRadius: '1.1rem',
      };
    case 'hokage':
    case 'gold':
      return {
        border: '3px solid #fbbf24',
        boxShadow: '0 0 0 2px #b45309, 0 0 22px rgba(245,158,11,0.7), inset 0 0 10px rgba(251,191,36,0.4)',
        borderRadius: '1.1rem',
      };
    case 'sage':
      return {
        border: '3px solid #eab308',
        boxShadow: '0 0 0 2px #ca8a04, 0 0 20px rgba(234,179,8,0.65), inset 0 0 8px rgba(253,224,71,0.5)',
        borderRadius: '1.1rem',
      };
    case 'celestial':
    case 'rainbow':
      return {
        border: '3px solid transparent',
        backgroundImage: 'linear-gradient(#1a1721, #1a1721), linear-gradient(135deg, #ff7a1a, #fbbf24, #10b981, #0ea5e9, #a855f7, #ff7a1a)',
        backgroundOrigin: 'border-box',
        backgroundClip: 'padding-box, border-box',
        boxShadow: '0 0 20px rgba(255,122,26,0.4), 0 0 30px rgba(168,85,247,0.3)',
        borderRadius: '1.1rem',
      };
    case 'red':
      return {
        border: '3px solid #ef4444',
        boxShadow: '0 0 0 2px #7f1d1d, 0 0 18px rgba(239,68,68,0.6)',
        borderRadius: '1.1rem',
      };
    case 'emerald':
      return {
        border: '3px solid #10b981',
        boxShadow: '0 0 0 2px #064e3b, 0 0 18px rgba(16,185,129,0.6)',
        borderRadius: '1.1rem',
      };
    case 'sky':
      return {
        border: '3px solid #0ea5e9',
        boxShadow: '0 0 0 2px #0c4a6e, 0 0 18px rgba(14,165,233,0.6)',
        borderRadius: '1.1rem',
      };
    case 'orange':
    default:
      return {
        border: `3px solid ${hex}`,
        boxShadow: `0 0 0 2px rgba(26,18,8,0.8), 0 0 16px ${hex}70`,
        borderRadius: '1.1rem',
      };
  }
}

export function getBannerStyle(bannerId: ProfileBannerId = 'default'): React.CSSProperties {
  const banners: Record<ProfileBannerId, React.CSSProperties> = {
    default: {
      background: 'linear-gradient(135deg, #130f1d 0%, #291b2e 35%, #42203b 70%, #61293f 100%)',
    },
    fire: {
      background: 'linear-gradient(135deg, #2a0b06 0%, #6e1c0d 35%, #b91c1c 70%, #f97316 100%)',
    },
    forest: {
      background: 'linear-gradient(135deg, #051e12 0%, #0d4023 35%, #15803d 70%, #22c55e 100%)',
    },
    storm: {
      background: 'linear-gradient(135deg, #040916 0%, #0e2448 35%, #1d4ed8 70%, #38bdf8 100%)',
    },
    night: {
      background: 'linear-gradient(135deg, #05040a 0%, #15102a 40%, #2e1065 75%, #581c87 100%)',
    },
    sakura: {
      background: 'linear-gradient(135deg, #240a16 0%, #581639 35%, #9d174d 70%, #f472b6 100%)',
    },
    hokage_rock: {
      background: 'linear-gradient(135deg, #24180d 0%, #573315 35%, #854d0e 70%, #ca8a04 100%)',
    },
    valley_end: {
      background: 'linear-gradient(135deg, #090e1f 0%, #1e1b4b 35%, #431407 70%, #991b1b 100%)',
    },
  };
  return banners[bannerId] ?? banners.default;
}

export function getBannerLabel(bannerId: ProfileBannerId): string {
  const labels: Record<ProfileBannerId, string> = {
    default: 'Konoha Dusk',
    fire: 'Will of Fire Blaze',
    forest: 'Hidden Leaf Sanctuary',
    storm: 'Chidori Tempest',
    night: 'Tsukuyomi Midnight',
    sakura: 'Haruno Sakura Garden',
    hokage_rock: 'Great Hokage Monument',
    valley_end: 'Valley of the End',
  };
  return labels[bannerId] ?? 'Default';
}

export function getAccentLabel(accentId: ProfileAccentId): string {
  const labels: Record<ProfileAccentId, string> = {
    orange: 'Naruto Fiery Orange',
    red: 'Sharingan Crimson',
    gold: 'Hokage Amber Gold',
    emerald: 'Sage Jade Emerald',
    sky: 'Chidori Lightning Sky',
    purple: 'Rinnegan Amethyst',
  };
  return labels[accentId] ?? 'Orange';
}

export function getFrameLabel(frameId: ProfileFrameId): string {
  const labels: Record<ProfileFrameId, string> = {
    none: 'Classic Trim',
    wood: 'Academy Timber Seal',
    chunin: 'Chunin Steel Plate',
    jonin: 'Jonin Silver Mantle',
    anbu: 'Anbu Shadow Mask',
    hokage: 'Hokage Vermilion Crest',
    sage: 'Sage Mode Aura',
    celestial: 'Celestial Chakra Seal',
    orange: 'Flame Border',
    gold: 'Gold Border',
    red: 'Crimson Border',
    emerald: 'Emerald Border',
    sky: 'Sky Border',
    rainbow: 'Prismatic Seal',
  };
  return labels[frameId] ?? 'Frame';
}
