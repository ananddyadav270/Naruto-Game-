import React, { useState } from 'react';

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
    } ${shattered ? 'opacity-30 grayscale' : ''}`}
  >
    <defs>
      <radialGradient id="sg-iris" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#f43f5e" />
        <stop offset="60%" stopColor="#dc2626" />
        <stop offset="100%" stopColor="#7f1d1d" />
      </radialGradient>
    </defs>
    <circle cx="50" cy="50" r="47" fill="none" stroke="#f97316" strokeWidth="1.8" strokeOpacity="0.4" />
    <circle cx="50" cy="50" r="40" fill="url(#sg-iris)" />
    <circle cx="50" cy="50" r="23" fill="none" stroke="#09090b" strokeWidth="2" strokeOpacity="0.7" />
    {[0, 120, 240].map((angle) => (
      <g key={angle} transform={`rotate(${angle} 50 50)`}>
        <circle cx="50" cy="26" r="5.5" fill="#09090b" />
        <path d="M 50 20.5 C 57 21, 58.5 28.5, 54.5 32 C 53 28.5, 52 25.5, 50 26 Z" fill="#09090b" />
      </g>
    ))}
    <circle cx="50" cy="50" r="9.5" fill="#09090b" />
    <circle cx="46" cy="46" r="2.5" fill="#fca5a5" fillOpacity="0.45" />
    {shattered && (
      <path d="M 15 20 L 85 80 M 80 18 L 22 82" stroke="#ef4444" strokeWidth="6" strokeLinecap="round" strokeOpacity="0.9" />
    )}
  </svg>
);

/* ─── Konoha Leaf ────────────────────────────────────────────────────────── */
export const KonohaLeafSymbol: React.FC<{ size?: number; className?: string }> = ({
  size = 24, className = '',
}) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" className={className}>
    <path d="M34.5 14C23.5 14 15 22.4 15 33.2C15 41.8 21.8 48.2 30.2 48.2C36.8 48.2 41.8 43.3 41.8 36.9C41.8 31.8 37.9 28 32.8 28C29 28 26.2 30.8 26.2 34.3C26.2 37.2 28.4 39.2 31.2 39.2C33.3 39.2 34.8 37.7 34.8 35.8"
      stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" />
    <path d="M41.5 41.5L51 47L45 36.5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15.5 36L9 39" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

/* ─── Coin Icon ──────────────────────────────────────────────────────────── */
export const ShinobiCoinIcon: React.FC<{ size?: number; className?: string }> = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true" className={className}>
    <defs>
      <radialGradient id="coin-g" cx="38%" cy="32%" r="65%">
        <stop offset="0%" stopColor="#FDE68A" />
        <stop offset="60%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D97706" />
      </radialGradient>
    </defs>
    <circle cx="16" cy="16" r="14" fill="url(#coin-g)" />
    <circle cx="16" cy="16" r="14" fill="none" stroke="#FEF3C7" strokeWidth="1.5" strokeOpacity="0.8" />
    <circle cx="16" cy="16" r="9" fill="#B45309" fillOpacity="0.6" />
    <text x="16" y="21" textAnchor="middle" fontFamily="serif" fontSize="11" fontWeight="bold" fill="#FEF9C3">¥</text>
  </svg>
);

/* ─── Gem Icon ───────────────────────────────────────────────────────────── */
export const ChakraGemIcon: React.FC<{ size?: number; className?: string }> = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true" className={className}>
    <defs>
      <linearGradient id="gem-g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7dd3fc" />
        <stop offset="100%" stopColor="#0284c7" />
      </linearGradient>
    </defs>
    <path d="M16 3L28 11.5L23 29H9L4 11.5L16 3Z" fill="url(#gem-g)" stroke="#BAE6FD" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M16 3L21.5 12.5L16 29L10.5 12.5L16 3Z" fill="#38bdf8" fillOpacity="0.45" />
    <path d="M4 11.5H28" stroke="#E0F2FE" strokeWidth="1.2" strokeOpacity="0.55" />
  </svg>
);

/* ─── Chakra Aura Burst ──────────────────────────────────────────────────── */
export const ChakraAuraBurst: React.FC<{ color?: 'emerald' | 'gold' | 'orange' | 'red' }> = ({ color = 'emerald' }) => {
  const configs = {
    emerald: { ring: 'border-emerald-300', glow: 'rgba(16,185,129,0.25)', bg: 'rgba(16,185,129,0.04)' },
    gold:    { ring: 'border-amber-300',   glow: 'rgba(245,158,11,0.3)',  bg: 'rgba(245,158,11,0.05)' },
    orange:  { ring: 'border-orange-400',  glow: 'rgba(249,115,22,0.3)',  bg: 'rgba(249,115,22,0.05)' },
    red:     { ring: 'border-red-400',     glow: 'rgba(239,68,68,0.25)',  bg: 'rgba(239,68,68,0.04)' },
  };
  const cfg = configs[color];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden flex items-center justify-center" aria-hidden="true">
      <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 50% 40%, ${cfg.bg} 0%, transparent 70%)` }} />
      <div className={`absolute w-48 h-48 rounded-full border animate-chakra-pulse ${cfg.ring}`} style={{ boxShadow: `0 0 32px ${cfg.glow}` }} />
      <div className={`absolute w-72 h-72 rounded-full border opacity-20 animate-chakra-pulse ${cfg.ring}`} style={{ animationDelay: '0.6s' }} />
    </div>
  );
};

/* ─── Rank Badge ──��──────────────────────────────────────────────────────── */
export const RankBadge: React.FC<{ rank: string; className?: string }> = ({ rank, className = '' }) => {
  const cls: Record<string, string> = {
    'Academy Student': 'rank-student',
    'Genin':           'rank-genin',
    'Chunin':          'rank-chunin',
    'Jonin':           'rank-jonin',
    'Hokage':          'rank-hokage',
  };
  return (
    <span className={`badge-pill ${cls[rank] ?? 'rank-student'} ${className}`}>{rank}</span>
  );
};

/* ─── Warm Divider ───────────────────────────────────────────────────────── */
export const WarmDivider: React.FC<{ label?: string }> = ({ label }) => (
  <div className="flex items-center gap-3 my-1" aria-hidden={!label}>
    <div className="flex-1 divider-warm" />
    {label ? (
      <span className="text-[10px] font-bold tracking-widest uppercase text-amber-700/60 whitespace-nowrap px-1">{label}</span>
    ) : (
      <SharinganEmblem size={14} spinning />
    )}
    <div className="flex-1 divider-warm" />
  </div>
);

/* ─── Ambient Embers ─────────────────────────────────────────────────────── */
const EMBER_POSITIONS = [
  { left: '8%',  bottom: '10%', delay: '0s',   size: 'h-1.5 w-1.5', color: 'bg-orange-500' },
  { left: '19%', bottom: '23%', delay: '2s',   size: 'h-1 w-1',     color: 'bg-amber-400' },
  { left: '33%', bottom: '8%',  delay: '4.5s', size: 'h-1.5 w-1.5', color: 'bg-red-400' },
  { left: '52%', bottom: '17%', delay: '1.1s', size: 'h-1 w-1',     color: 'bg-orange-300' },
  { left: '65%', bottom: '9%',  delay: '3.3s', size: 'h-1.5 w-1.5', color: 'bg-amber-500' },
  { left: '79%', bottom: '21%', delay: '5.2s', size: 'h-1 w-1',     color: 'bg-orange-400' },
  { left: '90%', bottom: '13%', delay: '2.6s', size: 'h-1.5 w-1.5', color: 'bg-red-500' },
  { left: '44%', bottom: '35%', delay: '7s',   size: 'h-0.5 w-0.5', color: 'bg-amber-300' },
  { left: '25%', bottom: '47%', delay: '3.8s', size: 'h-0.5 w-0.5', color: 'bg-orange-400' },
];

export const AmbientEmbers: React.FC = () => (
  <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
    {EMBER_POSITIONS.map((e, idx) => (
      <span
        key={idx}
        style={{ left: e.left, bottom: e.bottom, animationDelay: e.delay }}
        className={`absolute rounded-full opacity-0 animate-ember-drift blur-[0.5px] ${e.size} ${e.color}`}
      />
    ))}
  </div>
);

/* ─── ImageWithFallback ──────────────────────────────────────────────────── */
interface ImageWithFallbackProps {
  src: string; alt: string; title?: string; className?: string;
}
export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ src, alt, title, className = '' }) => {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className={`flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100 text-orange-500/70 p-4 ${className}`}
        role="img" aria-label={alt}>
        <KonohaLeafSymbol size={36} className="mb-1" />
        {title && <span className="text-[10px] font-semibold tracking-wider uppercase text-amber-700/60 text-center">{title}</span>}
      </div>
    );
  }
  return <img src={src} alt={alt} referrerPolicy="no-referrer" onError={() => setFailed(true)} className={className} loading="lazy" />;
};

/* ─── Score Popout ───────────────────────────────────────────────────────── */
export const ScorePopout: React.FC<{ value: number; color?: 'orange' | 'emerald' | 'gold' | 'sky' }> = ({
  value, color = 'orange',
}) => {
  const colors = {
    orange:  'text-orange-600 bg-orange-50 border-orange-200',
    emerald: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    gold:    'text-amber-700 bg-amber-50 border-amber-200',
    sky:     'text-sky-700 bg-sky-50 border-sky-200',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-lg border text-xs font-mono font-bold tabular-nums ${colors[color]}`}>
      +{value.toLocaleString()}
    </span>
  );
};
