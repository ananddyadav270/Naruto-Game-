import { ProfileAccentId, ProfileBannerId, ProfileFrameId } from '../types/quiz';

export interface AccentClasses {
  borderClass: string;
  textClass: string;
  bgClass: string;
  shadowColor: string;
  hex: string;
}

export function getAccentClasses(accentId: ProfileAccentId): AccentClasses {
  const map: Record<ProfileAccentId, AccentClasses> = {
    orange:  { borderClass: 'border-orange-400',  textClass: 'text-orange-600',  bgClass: 'bg-orange-50',  shadowColor: 'rgba(249,115,22,0.35)',  hex: '#f97316' },
    red:     { borderClass: 'border-red-400',     textClass: 'text-red-600',     bgClass: 'bg-red-50',     shadowColor: 'rgba(239,68,68,0.35)',   hex: '#ef4444' },
    gold:    { borderClass: 'border-amber-400',   textClass: 'text-amber-600',   bgClass: 'bg-amber-50',   shadowColor: 'rgba(245,158,11,0.35)',  hex: '#f59e0b' },
    emerald: { borderClass: 'border-emerald-400', textClass: 'text-emerald-600', bgClass: 'bg-emerald-50', shadowColor: 'rgba(16,185,129,0.35)',  hex: '#10b981' },
    sky:     { borderClass: 'border-sky-400',     textClass: 'text-sky-600',     bgClass: 'bg-sky-50',     shadowColor: 'rgba(14,165,233,0.35)',  hex: '#0ea5e9' },
    purple:  { borderClass: 'border-violet-400',  textClass: 'text-violet-600',  bgClass: 'bg-violet-50',  shadowColor: 'rgba(139,92,246,0.35)',  hex: '#8b5cf6' },
  };
  return map[accentId] ?? map.orange;
}

export function getFrameStyle(frameId: ProfileFrameId, hex: string): React.CSSProperties {
  if (frameId === 'none') return { border: '2px solid #e8d5b7' };
  if (frameId === 'rainbow') {
    return {
      border: '3px solid transparent',
      backgroundImage: `linear-gradient(#fff, #fff), linear-gradient(135deg, #f97316, #f59e0b, #10b981, #0ea5e9, #8b5cf6, #f97316)`,
      backgroundOrigin: 'border-box',
      backgroundClip: 'padding-box, border-box',
    } as React.CSSProperties;
  }
  return {
    border: `3px solid ${hex}`,
    boxShadow: `0 0 14px ${hex}60`,
  };
}

export function getBannerStyle(bannerId: ProfileBannerId): React.CSSProperties {
  const banners: Record<ProfileBannerId, React.CSSProperties> = {
    default: { background: 'linear-gradient(135deg, #1a1208 0%, #2d1a08 50%, #3a1806 100%)' },
    fire:    { background: 'linear-gradient(135deg, #1a0800 0%, #7c2d12 40%, #dc2626 70%, #f97316 100%)' },
    forest:  { background: 'linear-gradient(135deg, #052e16 0%, #14532d 50%, #166534 80%, #15803d 100%)' },
    storm:   { background: 'linear-gradient(135deg, #030712 0%, #1e3a5f 40%, #1d4ed8 70%, #3b82f6 100%)' },
    night:   { background: 'linear-gradient(135deg, #000000 0%, #1e1b4b 50%, #312e81 80%, #4c1d95 100%)' },
    sakura:  { background: 'linear-gradient(135deg, #2d1515 0%, #7c2d6e 40%, #be185d 70%, #f9a8d4 100%)' },
  };
  return banners[bannerId] ?? banners.default;
}

export function getBannerLabel(bannerId: ProfileBannerId): string {
  const labels: Record<ProfileBannerId, string> = {
    default: 'Dark Gold',
    fire:    'Will of Fire',
    forest:  'Hidden Leaf',
    storm:   'Storm Release',
    night:   'Midnight Seal',
    sakura:  'Cherry Blossom',
  };
  return labels[bannerId] ?? 'Default';
}

export function getAccentLabel(accentId: ProfileAccentId): string {
  const labels: Record<ProfileAccentId, string> = {
    orange:  'Naruto Orange',
    red:     'Sharingan Red',
    gold:    'Hokage Gold',
    emerald: 'Sage Emerald',
    sky:     'Lightning Sky',
    purple:  'Rinnegan Purple',
  };
  return labels[accentId] ?? 'Orange';
}

export function getFrameLabel(frameId: ProfileFrameId): string {
  const labels: Record<ProfileFrameId, string> = {
    none:    'No Frame',
    orange:  'Flame Frame',
    gold:    'Gold Frame',
    red:     'Red Frame',
    emerald: 'Jade Frame',
    sky:     'Sky Frame',
    rainbow: 'Rainbow Seal',
  };
  return labels[frameId] ?? 'None';
}
