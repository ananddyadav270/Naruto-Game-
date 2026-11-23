import React, { useState } from 'react';
import { Award, Flame, Shield, Sparkles, Star } from 'lucide-react';
import { getAvatarBgById, getAvatarById } from '../data/avatars';
import { AvatarId, ProfileAvatarBgId, ProfileFrameId } from '../types/quiz';
import { getFrameStyle } from '../utils/profileUtils';

/* ─── Sharingan Emblem ──────────────────────────────────────────────────── */
interface SharinganEmblemProps {
  size?: number;
  spinning?: boolean;
  fast?: boolean;
  shattered?: boolean;
  className?: string;
}

export const SharinganEmblem: React.FC<SharinganEmblemProps> = ({
  size = 36,
  spinning = true,
  fast = false,
  shattered = false,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    aria-hidden="true"
    className={`${className} ${
      !shattered && spinning ? (fast ? 'animate-sharingan-fast' : 'animate-sharingan') : ''
    } ${shattered ? 'opacity-40 grayscale' : 'drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]'}`}
  >
    <defs>
      <radialGradient id="sg-iris-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#f43f5e" />
        <stop offset="65%" stopColor="#dc2626" />
        <stop offset="100%" stopColor="#450a0a" />
      </radialGradient>
      <filter id="sharingan-glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <circle cx="50" cy="50" r="47" fill="none" stroke="#ea580c" strokeWidth="2.2" strokeOpacity="0.5" />
    <circle cx="50" cy="50" r="40" fill="url(#sg-iris-glow)" />
    <circle cx="50" cy="50" r="23" fill="none" stroke="#09090b" strokeWidth="2.2" strokeOpacity="0.8" />
    {[0, 120, 240].map((angle) => (
      <g key={angle} transform={`rotate(${angle} 50 50)`}>
        <circle cx="50" cy="26" r="5.5" fill="#09090b" />
        <path d="M 50 20.5 C 57 21, 58.5 28.5, 54.5 32 C 53 28.5, 52 25.5, 50 26 Z" fill="#09090b" />
      </g>
    ))}
    <circle cx="50" cy="50" r="9.5" fill="#09090b" />
    <circle cx="46" cy="46" r="2.8" fill="#fecdd3" fillOpacity="0.6" />
    {shattered && (
      <>
        <path d="M 15 20 L 85 80 M 80 18 L 22 82" stroke="#ef4444" strokeWidth="5" strokeLinecap="round" strokeOpacity="0.9" />
        <path d="M 50 10 L 50 90" stroke="#b91c1c" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.8" />
      </>
    )}
  </svg>
);

/* ─── Konoha Leaf Symbol ─────────────────────────────────────────────────── */
export const KonohaLeafSymbol: React.FC<{ size?: number; className?: string }> = ({
  size = 24,
  className = '',
}) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" className={className}>
    <path
      d="M34.5 14C23.5 14 15 22.4 15 33.2C15 41.8 21.8 48.2 30.2 48.2C36.8 48.2 41.8 43.3 41.8 36.9C41.8 31.8 37.9 28 32.8 28C29 28 26.2 30.8 26.2 34.3C26.2 37.2 28.4 39.2 31.2 39.2C33.3 39.2 34.8 37.7 34.8 35.8"
      stroke="currentColor"
      strokeWidth="3.6"
      strokeLinecap="round"
    />
    <path d="M41.5 41.5L51 47L45 36.5" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15.5 36L9 39" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
  </svg>
);

/* ─── Shinobi Coin Icon ──────────────────────────────────────────────────── */
export const ShinobiCoinIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 18,
  className = '',
}) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true" className={className}>
    <defs>
      <radialGradient id="coin-gold-glow" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#FEF08A" />
        <stop offset="45%" stopColor="#F59E0B" />
        <stop offset="85%" stopColor="#D97706" />
        <stop offset="100%" stopColor="#92400E" />
      </radialGradient>
      <filter id="coin-sparkle">
        <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#f59e0b" floodOpacity="0.4" />
      </filter>
    </defs>
    <g filter="url(#coin-sparkle)">
      <circle cx="16" cy="16" r="14.5" fill="url(#coin-gold-glow)" stroke="#FEF9C3" strokeWidth="1.2" />
      <circle cx="16" cy="16" r="10.5" fill="none" stroke="#78350F" strokeWidth="1.2" strokeDasharray="2 1.5" />
      <circle cx="16" cy="16" r="7.5" fill="#B45309" fillOpacity="0.75" />
      <text x="16" y="20.5" textAnchor="middle" fontFamily="serif" fontSize="12" fontWeight="bold" fill="#FFFBEB">
        忍
      </text>
    </g>
  </svg>
);

/* ─── Chakra Gem Icon ────────────────────────────────────────────────────── */
export const ChakraGemIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 18,
  className = '',
}) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true" className={className}>
    <defs>
      <linearGradient id="gem-chakra-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#bae6fd" />
        <stop offset="30%" stopColor="#38bdf8" />
        <stop offset="70%" stopColor="#0284c7" />
        <stop offset="100%" stopColor="#075985" />
      </linearGradient>
      <filter id="gem-glow">
        <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#38bdf8" floodOpacity="0.5" />
      </filter>
    </defs>
    <g filter="url(#gem-glow)">
      <path
        d="M16 2.5L29 11L24 29.5H8L3 11L16 2.5Z"
        fill="url(#gem-chakra-grad)"
        stroke="#E0F2FE"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M16 2.5L22 12L16 29.5L10 12L16 2.5Z" fill="#7dd3fc" fillOpacity="0.45" />
      <path d="M3 11H29" stroke="#F0F9FF" strokeWidth="1.2" strokeOpacity="0.7" />
      <circle cx="16" cy="16" r="3.5" fill="#ffffff" fillOpacity="0.6" filter="blur(1px)" />
    </g>
  </svg>
);

/* ─── Avatar Image / Stylized Preset Component ───────────────────────────── */
interface AvatarDisplayProps {
  avatarId: AvatarId;
  avatarBgId?: ProfileAvatarBgId;
  frameId?: ProfileFrameId;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showAura?: boolean;
}

export const ShinobiAvatarDisplay: React.FC<AvatarDisplayProps> = ({
  avatarId,
  avatarBgId = 'leaf',
  frameId = 'hokage',
  size = 'md',
  className = '',
  showAura = false,
}) => {
  const avatar = getAvatarById(avatarId);
  const bg = getAvatarBgById(avatarBgId);

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-11 w-11',
    lg: 'h-16 w-16',
    xl: 'h-24 w-24 sm:h-28 sm:w-28',
  }[size];

  return (
    <div className={`relative shrink-0 ${sizeClasses} ${className}`}>
      {/* Background Chakra Aura */}
      {showAura && (
        <div
          className="pointer-events-none absolute -inset-2 rounded-2xl opacity-60 animate-chakra-pulse blur-sm"
          style={{ background: bg.cssBackground }}
        />
      )}

      {/* Frame Container */}
      <div
        className="relative h-full w-full overflow-hidden transition-all duration-300"
        style={{
          ...getFrameStyle(frameId),
          background: bg.cssBackground,
        }}
      >
        <ImageWithFallback
          src={avatar.imageSrc}
          alt={avatar.name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />

        {/* Subtle inner gloss reflection */}
        <div
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%, rgba(0,0,0,0.4) 100%)',
          }}
        />
      </div>
    </div>
  );
};

/* ─── Chakra Aura Burst ──────────────────────────────────────────────────── */
export const ChakraAuraBurst: React.FC<{ color?: 'emerald' | 'gold' | 'orange' | 'red' }> = ({
  color = 'emerald',
}) => {
  const configs = {
    emerald: {
      ring: 'border-emerald-400',
      glow: 'rgba(16,185,129,0.35)',
      bg: 'rgba(16,185,129,0.06)',
    },
    gold: {
      ring: 'border-amber-400',
      glow: 'rgba(245,158,11,0.4)',
      bg: 'rgba(245,158,11,0.08)',
    },
    orange: {
      ring: 'border-orange-500',
      glow: 'rgba(249,115,22,0.4)',
      bg: 'rgba(249,115,22,0.08)',
    },
    red: {
      ring: 'border-red-500',
      glow: 'rgba(239,68,68,0.35)',
      bg: 'rgba(239,68,68,0.06)',
    },
  };
  const cfg = configs[color];
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden flex items-center justify-center z-0"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(circle at 50% 40%, ${cfg.bg} 0%, transparent 70%)` }}
      />
      <div
        className={`absolute w-52 h-52 rounded-full border-2 animate-chakra-pulse ${cfg.ring}`}
        style={{ boxShadow: `0 0 40px ${cfg.glow}` }}
      />
      <div
        className={`absolute w-80 h-80 rounded-full border opacity-30 animate-chakra-pulse ${cfg.ring}`}
        style={{ animationDelay: '0.6s' }}
      />
    </div>
  );
};

/* ─── Rank Badge ─────────────────────────────────────────────────────────── */
export const RankBadge: React.FC<{ rank: string; className?: string }> = ({ rank, className = '' }) => {
  const configs: Record<string, { cls: string; icon: React.ReactNode; label: string }> = {
    'Academy Student': {
      cls: 'rank-badge-student',
      icon: <Shield className="h-3 w-3" />,
      label: 'Student',
    },
    Genin: {
      cls: 'rank-badge-genin',
      icon: <Sparkles className="h-3 w-3 text-emerald-400" />,
      label: 'Genin',
    },
    Chunin: {
      cls: 'rank-badge-chunin',
      icon: <Star className="h-3 w-3 text-sky-400" />,
      label: 'Chunin',
    },
    Jonin: {
      cls: 'rank-badge-jonin',
      icon: <Flame className="h-3 w-3 text-orange-400" />,
      label: 'Jonin',
    },
    Hokage: {
      cls: 'rank-badge-hokage',
      icon: <Award className="h-3 w-3 text-amber-300" />,
      label: 'Hokage',
    },
  };
  const active = configs[rank] ?? configs['Academy Student'];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase backdrop-blur-sm ${active.cls} ${className}`}
    >
      {active.icon}
      <span>{rank}</span>
    </span>
  );
};

/* ─── Ambient Chakra Embers ──────────────────────────────────────────────── */
const EMBER_POSITIONS = [
  { left: '6%',  bottom: '12%', delay: '0s',   size: 'h-1.5 w-1.5', color: 'bg-orange-500 shadow-orange-500/50' },
  { left: '18%', bottom: '28%', delay: '2.2s', size: 'h-1 w-1',     color: 'bg-amber-400 shadow-amber-400/50' },
  { left: '32%', bottom: '10%', delay: '4.8s', size: 'h-2 w-2',     color: 'bg-red-500 shadow-red-500/50' },
  { left: '48%', bottom: '22%', delay: '1.4s', size: 'h-1 w-1',     color: 'bg-orange-400 shadow-orange-400/50' },
  { left: '64%', bottom: '14%', delay: '3.6s', size: 'h-1.5 w-1.5', color: 'bg-amber-300 shadow-amber-300/50' },
  { left: '78%', bottom: '26%', delay: '5.5s', size: 'h-1 w-1',     color: 'bg-orange-500 shadow-orange-500/50' },
  { left: '92%', bottom: '16%', delay: '2.8s', size: 'h-2 w-2',     color: 'bg-red-400 shadow-red-400/50' },
  { left: '42%', bottom: '40%', delay: '7.2s', size: 'h-1 w-1',     color: 'bg-yellow-300 shadow-yellow-300/50' },
  { left: '26%', bottom: '52%', delay: '4.1s', size: 'h-1 w-1',     color: 'bg-orange-400 shadow-orange-400/50' },
];

export const AmbientEmbers: React.FC = () => (
  <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
    {EMBER_POSITIONS.map((e, idx) => (
      <span
        key={idx}
        style={{ left: e.left, bottom: e.bottom, animationDelay: e.delay }}
        className={`absolute rounded-full opacity-0 animate-ember-drift shadow-md ${e.size} ${e.color}`}
      />
    ))}
  </div>
);

/* ─── ImageWithFallback ──────────────────────────────────────────────────── */
interface ImageWithFallbackProps {
  src: string;
  alt: string;
  title?: string;
  className?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  title,
  className = '',
}) => {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#1e1b2b] to-[#2d223c] text-orange-400 p-4 ${className}`}
        role="img"
        aria-label={alt}
      >
        <KonohaLeafSymbol size={36} className="mb-1 text-orange-400/80" />
        {title && (
          <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-orange-300/80 text-center">
            {title}
          </span>
        )}
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
      loading="lazy"
    />
  );
};
