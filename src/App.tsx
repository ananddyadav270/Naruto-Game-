import { useCallback, useState } from 'react';
import { Home, RotateCcw, Trophy, Volume2, VolumeX } from 'lucide-react';
import { ConfirmLeaveModal } from './components/ConfirmLeaveModal';
import { ConfirmResetModal } from './components/ConfirmResetModal';
import { GameOverScreen } from './components/GameOverScreen';
import { HomeScreen } from './components/HomeScreen';
import { LevelCompleteScreen } from './components/LevelCompleteScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { QuestionScreen } from './components/QuestionScreen';
import {
  AmbientEmbers,
  ChakraGemIcon,
  ImageWithFallback,
  KonohaLeafSymbol,
  ShinobiCoinIcon,
} from './components/ShinobiGraphics';
import { StageTransitionScreen } from './components/StageTransitionScreen';
import { VictoryScreen } from './components/VictoryScreen';
import { getAvatarById } from './data/avatars';
import { getStageForLevel, HERO_BACKDROP_IMAGE, QUIZ_QUESTIONS } from './data/questions';
import { AvatarId, LevelRewardBreakdown, PlayerProfile, ProfileAccentId, ProfileBannerId, ProfileFrameId, SavedProgress, ScreenState } from './types/quiz';
import { calculateLevelReward } from './utils/rewards';
import { soundEngine } from './utils/sound';
import {
  clearProgress,
  loadProfile,
  loadProgress,
  recordLevelCompletion,
  recordWrongAttempt,
  saveProfile,
} from './utils/storage';
import { useAnimatedNumber } from './utils/useAnimatedNumber';
import { getAccentClasses } from './utils/profileUtils';

const STAGE_START_LEVELS = new Set([1, 16, 31, 46]);

export default function App() {
  const [profile, setProfile] = useState<PlayerProfile>(() => loadProfile());
  const [progress, setProgress] = useState<SavedProgress>(() => loadProgress());
  const [screen, setScreen] = useState<ScreenState>('HOME');
  const [currentLevel, setCurrentLevel] = useState<number>(() => loadProgress().highestUnlockedLevel);
  const [lastReward, setLastReward] = useState<LevelRewardBreakdown | null>(null);
  const [retryNonce, setRetryNonce] = useState(0);
  const [muted, setMuted] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);

  const animatedHeaderScore = useAnimatedNumber(progress.totalScore, 450);
  const animatedHeaderCoins = useAnimatedNumber(progress.totalCoins, 450);
  const animatedHeaderGems  = useAnimatedNumber(progress.totalGems, 450);

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    soundEngine.setMuted(next);
  };

  const launchLevel = useCallback((level: number, showTransitionIfBoundary: boolean) => {
    setCurrentLevel(level);
    setRetryNonce((n) => n + 1);
    if (showTransitionIfBoundary && STAGE_START_LEVELS.has(level)) {
      soundEngine.playStageUnlock();
      setScreen('STAGE_TRANSITION');
    } else {
      setScreen('PLAYING');
    }
  }, []);

  const handleStartOrContinue = () => {
    if (progress.hasCompletedAll && progress.completedLevels.length >= 50) {
      setScreen('VICTORY');
      return;
    }
    const targetLevel = progress.highestUnlockedLevel;
    const isFreshStart = progress.completedLevels.length === 0 && targetLevel === 1;
    launchLevel(targetLevel, isFreshStart);
  };

  const handleSelectLevel = (level: number) => {
    launchLevel(level, STAGE_START_LEVELS.has(level));
  };

  const handleLevelComplete = useCallback((level: number, attemptSolved: 1 | 2) => {
    setProgress((prev) => {
      const { progress: updated, reward } = recordLevelCompletion(prev, level, attemptSolved);
      setLastReward(reward);
      return updated;
    });
  }, []);

  const handleWrongAttempt = useCallback(() => {
    setProgress((prev) => recordWrongAttempt(prev));
  }, []);

  const handleShowLevelComplete = useCallback(() => {
    setScreen('LEVEL_COMPLETE');
  }, []);

  const handleContinueAfterLevelComplete = useCallback(() => {
    if (currentLevel >= 50) {
      soundEngine.playStageUnlock();
      setScreen('VICTORY');
      return;
    }
    const nextLevel = currentLevel + 1;
    launchLevel(nextLevel, STAGE_START_LEVELS.has(nextLevel));
  }, [currentLevel, launchLevel]);

  const handleGameOver = useCallback((failedLevel: number) => {
    setCurrentLevel(failedLevel);
    setScreen('GAME_OVER');
  }, []);

  const handleRetryFailedLevel = () => {
    setRetryNonce((n) => n + 1);
    setScreen('PLAYING');
  };

  const handleConfirmReset = () => {
    const fresh = clearProgress();
    setProgress(fresh);
    setCurrentLevel(1);
    setLastReward(null);
    setIsResetModalOpen(false);
    launchLevel(1, true);
  };

  const handlePlayAgainFromVictory = () => {
    const fresh = clearProgress();
    setProgress(fresh);
    setCurrentLevel(1);
    setLastReward(null);
    launchLevel(1, true);
  };

  const handleUpdateProfile = (
    name: string,
    avatarId: AvatarId,
    frameId: ProfileFrameId,
    bannerId: ProfileBannerId,
    accentId: ProfileAccentId,
  ) => {
    const updated: PlayerProfile = { ...profile, playerName: name, avatarId, frameId, bannerId, accentId };
    setProfile(updated);
    saveProfile(updated);
  };

  const handleRequestHomeNavigation = () => {
    if (screen === 'PLAYING') {
      setIsLeaveModalOpen(true);
    } else {
      setScreen('HOME');
    }
  };

  const handleConfirmLeaveToHome = () => {
    setIsLeaveModalOpen(false);
    setScreen('HOME');
  };

  const activeQuestion = QUIZ_QUESTIONS[currentLevel - 1] ?? QUIZ_QUESTIONS[0];
  const activeStage    = getStageForLevel(currentLevel);
  const avatar         = getAvatarById(profile.avatarId);
  const accent         = getAccentClasses(profile.accentId);
  const isPlaying      = screen === 'PLAYING';

  return (
    <div className="relative min-h-screen min-h-dvh flex flex-col overflow-x-hidden" style={{ background: '#120e08' }}>

      {/* ── Cinematic Background ── */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <ImageWithFallback
          src={HERO_BACKDROP_IMAGE}
          alt="Hidden Leaf Village backdrop"
          className="h-full w-full object-cover opacity-[0.12] scale-[1.04]"
        />
        {/* Warm gradient layer */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(160deg, #1a1208 0%, #2d1a08 35%, #3a1806 55%, #1a0a0a 100%)' }} />
        {/* Subtle vignette */}
        <div className="absolute inset-0 opacity-60"
          style={{ background: 'radial-gradient(ellipse at 70% 20%, rgba(249,115,22,0.07) 0%, transparent 55%)' }} />
        <div className="absolute inset-0 opacity-40"
          style={{ background: 'radial-gradient(ellipse at 10% 80%, rgba(220,38,38,0.06) 0%, transparent 50%)' }} />
      </div>

      {/* ── Embers ── */}
      <AmbientEmbers />

      {/* ─────────── NAVBAR ─────────── */}
      <header className="sticky top-0 z-40 safe-top" role="banner">
        <div className="surface-dark">
          <div className="mx-auto max-w-6xl px-3 sm:px-5 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">

            {/* Brand */}
            <button
              type="button"
              onClick={handleRequestHomeNavigation}
              className="inline-flex items-center gap-2 cursor-pointer group min-w-0 shrink-0"
              aria-label="Return to home"
            >
              <KonohaLeafSymbol size={20} className="text-orange-400 shrink-0 transition-transform group-hover:scale-110" />
              <div className="flex flex-col leading-none min-w-0">
                <span className="font-display text-sm sm:text-xl lg:text-2xl font-bold tracking-wide uppercase text-orange-50 truncate">
                  Naruto Ultimate Quiz
                </span>
                <span className="hidden sm:block text-[9px] font-mono tracking-[0.2em] text-orange-400/60 uppercase">
                  50 Shinobi Trials
                </span>
              </div>
            </button>

            {/* Desktop HUD */}
            <div className="hidden lg:flex items-center gap-2">
              <div className="hud-pill">
                <Trophy className="h-3.5 w-3.5 text-orange-400" />
                <span className="font-mono text-orange-50 tabular-nums">{animatedHeaderScore.toLocaleString()}</span>
              </div>
              <div className="hud-pill">
                <ShinobiCoinIcon size={14} />
                <span className="font-mono text-amber-200 tabular-nums">{animatedHeaderCoins.toLocaleString()}</span>
              </div>
              <div className="hud-pill">
                <ChakraGemIcon size={14} />
                <span className="font-mono text-sky-200 tabular-nums">{animatedHeaderGems.toLocaleString()}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Profile */}
              <button
                type="button"
                onClick={() => setScreen('PROFILE')}
                title="Open Player Profile"
                className={`inline-flex items-center gap-1.5 sm:gap-2 pl-1 pr-2.5 py-1 rounded-xl transition-all cursor-pointer ${
                  screen === 'PROFILE'
                    ? 'bg-orange-500/20 border border-orange-400/40 text-orange-100'
                    : 'border border-white/10 hover:border-orange-400/30 text-orange-50/80'
                }`}
                style={screen !== 'PROFILE' ? { background: 'rgba(253,248,240,0.07)' } : undefined}
              >
                <div className={`h-6 w-6 sm:h-7 sm:w-7 overflow-hidden rounded-lg border-2 shrink-0 ${accent.borderClass}`}>
                  <ImageWithFallback src={avatar.imageSrc} alt={profile.playerName} className="h-full w-full object-cover" />
                </div>
                <span className="hidden sm:inline text-xs font-semibold max-w-[80px] lg:max-w-[110px] truncate">
                  {profile.playerName}
                </span>
              </button>

              {/* Mute */}
              <button
                type="button"
                onClick={toggleMute}
                aria-label={muted ? 'Unmute' : 'Mute'}
                className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl border border-white/10 flex items-center justify-center transition-colors cursor-pointer"
                style={{ background: 'rgba(253,248,240,0.07)' }}
              >
                {muted ? <VolumeX className="h-3.5 w-3.5 text-orange-50/40" /> : <Volume2 className="h-3.5 w-3.5 text-orange-400" />}
              </button>

              {/* Home / Reset */}
              {screen !== 'HOME' ? (
                <button
                  type="button"
                  onClick={handleRequestHomeNavigation}
                  className="btn-dark inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer"
                >
                  <Home className="h-3.5 w-3.5 text-orange-400 shrink-0" />
                  <span className="hidden sm:inline">Home</span>
                </button>
              ) : (
                (progress.completedLevels.length > 0 || progress.highestUnlockedLevel > 1) && (
                  <button
                    type="button"
                    onClick={() => setIsResetModalOpen(true)}
                    className="btn-dark inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer"
                  >
                    <RotateCcw className="h-3.5 w-3.5 shrink-0" />
                    <span className="hidden sm:inline">Reset</span>
                  </button>
                )
              )}
            </div>
          </div>

          {/* Mobile HUD while playing */}
          {isPlaying && (
            <div className="lg:hidden flex items-center justify-center gap-3 pb-2 px-4">
              <div className="hud-pill text-xs">
                <Trophy className="h-3 w-3 text-orange-400" />
                <span className="font-mono text-orange-50 tabular-nums">{animatedHeaderScore.toLocaleString()}</span>
              </div>
              <div className="hud-pill text-xs">
                <ShinobiCoinIcon size={12} />
                <span className="font-mono text-amber-200 tabular-nums">{animatedHeaderCoins.toLocaleString()}</span>
              </div>
              <div className="hud-pill text-xs">
                <ChakraGemIcon size={12} />
                <span className="font-mono text-sky-200 tabular-nums">{animatedHeaderGems.toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* ── Screen Router ── */}
      <main className="relative z-10 flex-1 flex flex-col justify-center" role="main">
        {screen === 'HOME' && (
          <HomeScreen
            key="home"
            profile={profile}
            progress={progress}
            onStartNewOrContinue={handleStartOrContinue}
            onSelectLevel={handleSelectLevel}
            onOpenProfile={() => setScreen('PROFILE')}
            onRequestReset={() => setIsResetModalOpen(true)}
            onOpenVictory={() => setScreen('VICTORY')}
          />
        )}
        {screen === 'PROFILE' && (
          <ProfileScreen
            key="profile"
            profile={profile}
            progress={progress}
            onUpdateProfile={handleUpdateProfile}
            onBackHome={() => setScreen('HOME')}
            onContinueGame={handleStartOrContinue}
          />
        )}
        {screen === 'STAGE_TRANSITION' && (
          <StageTransitionScreen
            key={`stage-${activeStage.difficulty}-${currentLevel}`}
            stage={activeStage}
            targetLevel={currentLevel}
            onContinue={() => setScreen('PLAYING')}
          />
        )}
        {screen === 'PLAYING' && (
          <QuestionScreen
            key={`q-${currentLevel}-${retryNonce}`}
            question={activeQuestion}
            completedCount={progress.completedLevels.length}
            onLevelComplete={handleLevelComplete}
            onWrongAttempt={handleWrongAttempt}
            onShowLevelComplete={handleShowLevelComplete}
            onGameOver={handleGameOver}
            onRequestHome={() => setIsLeaveModalOpen(true)}
          />
        )}
        {screen === 'LEVEL_COMPLETE' && (
          <LevelCompleteScreen
            key={`complete-${currentLevel}`}
            question={activeQuestion}
            reward={lastReward ?? calculateLevelReward(currentLevel, 1, true)}
            totalScore={progress.totalScore}
            totalCoins={progress.totalCoins}
            totalGems={progress.totalGems}
            onContinue={handleContinueAfterLevelComplete}
            onGoHome={() => setScreen('HOME')}
          />
        )}
        {screen === 'GAME_OVER' && (
          <GameOverScreen
            key={`gameover-${currentLevel}`}
            failedQuestion={activeQuestion}
            completedCount={progress.completedLevels.length}
            onRetry={handleRetryFailedLevel}
            onGoHome={() => setScreen('HOME')}
          />
        )}
        {screen === 'VICTORY' && (
          <VictoryScreen
            key="victory"
            profile={profile}
            progress={progress}
            onPlayAgain={handlePlayAgainFromVictory}
            onGoHome={() => setScreen('HOME')}
          />
        )}
      </main>

      {/* ── Modals ── */}
      <ConfirmResetModal
        isOpen={isResetModalOpen}
        completedCount={progress.completedLevels.length}
        onConfirm={handleConfirmReset}
        onCancel={() => setIsResetModalOpen(false)}
      />
      <ConfirmLeaveModal
        isOpen={isLeaveModalOpen}
        currentLevel={currentLevel}
        onConfirmLeave={handleConfirmLeaveToHome}
        onCancel={() => setIsLeaveModalOpen(false)}
      />
    </div>
  );
}
