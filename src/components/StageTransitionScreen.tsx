import React, { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { StageMetadata } from '../types/quiz';
import { ImageWithFallback, KonohaLeafSymbol, SharinganEmblem } from './ShinobiGraphics';

interface StageTransitionScreenProps {
  stage: StageMetadata;
  targetLevel: number;
  onContinue: () => void;
}

export const StageTransitionScreen: React.FC<StageTransitionScreenProps> = ({
  stage, targetLevel, onContinue,
}) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onContinue(); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onContinue]);

  return (
    <div className="animate-screen-enter w-full" style={{ background: '#f5ede0', minHeight: 'calc(100dvh - 64px)' }}>
      <div className="mx-auto max-w-4xl px-3 sm:px-5 py-8 sm:py-14">
        <div className="surface-card rounded-3xl overflow-hidden shadow-2xl"
          style={{ boxShadow: '0 24px 60px rgba(249,115,22,0.15)' }}>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image side */}
            <div className="relative min-h-[220px] sm:min-h-[280px] md:min-h-[400px] overflow-hidden">
              <ImageWithFallback
                src={stage.imageSrc}
                alt={stage.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 md:hidden" style={{ background: 'linear-gradient(to bottom, transparent 50%, #fdf8f0 100%)' }} />
            </div>

            {/* Content side */}
            <div className="p-7 sm:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <SharinganEmblem size={30} fast />
                <div>
                  <div className="text-[10px] font-bold tracking-widest uppercase text-orange-500">New Stage Unlocked</div>
                  <div className="text-xs text-amber-700/60 font-mono">{stage.rangeLabel}</div>
                </div>
              </div>

              <div className="text-sm font-bold text-amber-700/60 tracking-wide mb-1">{stage.difficulty}</div>

              <h1 className="font-display text-4xl sm:text-5xl font-bold uppercase text-[#1a1208] tracking-wide mb-1">
                {stage.title}
              </h1>

              <p className="text-sm font-semibold text-orange-500/80 mb-5">{stage.japaneseSubtitle}</p>

              <div className="divider-warm mb-5" />

              <p className="text-sm sm:text-base leading-relaxed text-[#5c4a2e] mb-8">
                {stage.description}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button type="button" onClick={onContinue}
                  className="btn-primary inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl font-bold text-base cursor-pointer">
                  <KonohaLeafSymbol size={18} className="shrink-0" />
                  <span>Enter Level {targetLevel}</span>
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </button>
                <span className="text-xs text-amber-700/50">2 fresh attempts · <kbd className="font-mono bg-amber-100 px-1 rounded text-amber-700">Enter</kbd></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
