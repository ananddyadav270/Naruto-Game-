import React, { useEffect } from 'react';
import { ArrowRight, Flame, Sparkles } from 'lucide-react';
import { StageMetadata } from '../types/quiz';
import { ImageWithFallback, KonohaLeafSymbol, SharinganEmblem } from './ShinobiGraphics';

interface StageTransitionScreenProps {
  stage: StageMetadata;
  targetLevel: number;
  onContinue: () => void;
}

export const StageTransitionScreen: React.FC<StageTransitionScreenProps> = ({
  stage,
  targetLevel,
  onContinue,
}) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onContinue();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onContinue]);

  return (
    <div
      className="animate-screen-enter w-full py-8 sm:py-16"
      style={{ minHeight: 'calc(100dvh - 64px)' }}
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="surface-dark-card rounded-3xl overflow-hidden border border-orange-500/30 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Visual Side */}
            <div className="relative min-h-[240px] sm:min-h-[320px] md:min-h-[440px] overflow-hidden">
              <ImageWithFallback
                src={stage.imageSrc}
                alt={stage.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to right, transparent 50%, rgba(20,16,28,0.95) 100%)',
                }}
              />
              <div
                className="absolute inset-0 md:hidden"
                style={{
                  background:
                    'linear-gradient(to bottom, transparent 40%, rgba(20,16,28,0.98) 100%)',
                }}
              />

              <div className="absolute top-4 left-4 flex items-center gap-2 rounded-xl bg-black/70 px-3 py-1.5 backdrop-blur-md border border-white/10">
                <SharinganEmblem size={20} fast />
                <span className="text-xs font-mono font-bold text-orange-200">
                  {stage.rangeLabel}
                </span>
              </div>
            </div>

            {/* Content Side */}
            <div className="p-7 sm:p-10 flex flex-col justify-center bg-[#181423]">
              <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/15 border border-orange-500/30 px-3 py-1 text-xs font-bold uppercase tracking-widest text-orange-400 mb-4 w-fit">
                <Sparkles className="h-3.5 w-3.5" />
                <span>New Stage Unlocked</span>
              </div>

              <div className="text-xs font-mono font-bold text-white/50 uppercase tracking-wider mb-1">
                {stage.difficulty} Trials
              </div>

              <h1 className="font-display text-4xl sm:text-5xl font-bold uppercase text-white tracking-tight mb-1">
                {stage.title}
              </h1>

              <p className="text-sm font-semibold text-orange-400/90 mb-6 font-mono">
                {stage.japaneseSubtitle}
              </p>

              <div className="h-px bg-white/10 mb-6" />

              <p className="text-sm sm:text-base leading-relaxed text-white/70 mb-8">
                {stage.description}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={onContinue}
                  className="btn-primary inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl font-bold text-base cursor-pointer shadow-xl"
                >
                  <KonohaLeafSymbol size={18} className="shrink-0" />
                  <span>Enter Level {targetLevel}</span>
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </button>

                <span className="text-xs text-white/40 text-center sm:text-left">
                  2 Fresh Attempts · Press <kbd className="font-mono bg-white/10 px-1.5 py-0.5 rounded text-white/70">Enter</kbd>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
