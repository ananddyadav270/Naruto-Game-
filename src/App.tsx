import { useCallback, useState } from 'react';
import { Award, Home, RotateCcw, Trophy, Volume2, VolumeX } from 'lucide-react';
import { HeaderNavigation } from './components/HeaderNavigation';
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
  RankBadge,
  ShinobiAvatarDisplay,
  ShinobiCoinIcon,
} from './components/ShinobiGraphics';
import { StageTransitionScreen } from './components/StageTransitionScreen';
import { VictoryScreen } from './components/VictoryScreen';
import { getAvatarById } from './data/avatars';
import { getStageForLevel, HERO_BACKDROP_IMAGE, QUIZ_QUESTIONS } from './data/questions';
import {
  AvatarId,
  LevelRewardBreakdown,
  PlayerProfile,
  ProfileAccentId,
  ProfileAvatarBgId,
  ProfileBannerId,
  ProfileFrameId,
  SavedProgress,
  ScreenState,
} from './types/quiz';
import { getAccentClasses } from './utils/profileUtils';
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

  const animatedHeaderScore = useAnimatedNumber(progress.totalScore, 400);
  const animatedHeaderCoins = useAnimatedNumber(progress.totalCoins, 400);
  const animatedHeaderGems = useAnimatedNumber(progress.totalGems, 400);

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
    avatarBgId: ProfileAvatarBgId,
    frameId: ProfileFrameId,
    bannerId: ProfileBannerId,
    accentId: ProfileAccentId
  ) => {
    const updated: PlayerProfile = {
      ...profile,
      playerName: name,
      avatarId,
      avatarBgId,
      frameId,
      bannerId,
      accentId,
    };
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
  const activeStage = getStageForLevel(currentLevel);
  const accent = getAccentClasses(profile.accentId);
  const isPlaying = screen === 'PLAYING';

  return (
    <div
      className="relative min-h-screen min-h-dvh flex flex-col overflow-x-hidden selection:bg-orange-500/30 selection:text-orange-200"
      style={{ backgroundColor: '#0e0c14' }}
    >
      {/* ── High-End Atmospheric Gaming Backdrop ── */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <ImageWithFallback
          src={HERO_BACKDROP_IMAGE}
          alt="Hidden Leaf Village backdrop"
          className="h-full w-full object-cover opacity-[0.14] scale-105 filter blur-[1px]"
        />
        {/* Deep Chakra Atmospheric Gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(165deg, #13101c 0%, #1a1524 35%, #221727 65%, #100b14 100%)',
            mixBlendMode: 'multiply',
          }}
        />
        {/* Top-Right Warm Konoha Fire Glow */}
        <div
          className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full opacity-30 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,122,26,0.5) 0%, transparent 70%)' }}
        />
        {/* Bottom-Left Sharingan Crimson Glow */}
        <div
          className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(220,38,38,0.5) 0%, transparent 70%)' }}
        />
      </div>

      {/* ── Floating Chakra Embers ── */}
      <AmbientEmbers />

      {/* ─────────── TACTICAL SHINOBI HEADER & HUD ─────────── */}
      <HeaderNavigation
        screen={screen}
        profile={profile}
        progress={progress}
        muted={muted}
        onToggleMute={toggleMute}
        onNavigateHome={handleRequestHomeNavigation}
        onNavigateProfile={() => setScreen('PROFILE')}
        onNavigateVictory={() => setScreen('VICTORY')}
        onRequestReset={() => setIsResetModalOpen(true)}
        animatedScore={animatedHeaderScore}
        animatedCoins={animatedHeaderCoins}
        animatedGems={animatedHeaderGems}
      />

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

      {/* ── Dialog Modals ── */}
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
