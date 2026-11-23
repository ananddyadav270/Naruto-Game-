import { QUIZ_QUESTIONS } from '../data/questions';
import { AvatarId, Difficulty, LevelRewardBreakdown, PlayerProfile, ProfileAccentId, ProfileBannerId, ProfileFrameId, SavedProgress } from '../types/quiz';
import { calculateLevelReward } from './rewards';

const PROGRESS_STORAGE_KEY = 'naruto_ultimate_quiz_save_v1';
const PROFILE_STORAGE_KEY = 'naruto_ultimate_quiz_profile_v1';

export const DEFAULT_PROGRESS: SavedProgress = {
  highestUnlockedLevel: 1,
  completedLevels: [],
  levelOutcomes: {},
  totalScore: 0,
  totalCoins: 0,
  totalGems: 0,
  totalWrongAnswers: 0,
  hasCompletedAll: false,
  lastUpdated: new Date().toISOString(),
};

function generateShinobiId(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let suffix = '';
  for (let i = 0; i < 4; i++) {
    suffix += chars[Math.floor(Math.random() * chars.length)];
  }
  const num = Math.floor(1000 + Math.random() * 9000);
  return `KNH-${num}-${suffix}`;
}

export function loadProfile(): PlayerProfile {
  try {
    const raw = window.localStorage.getItem(PROFILE_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<PlayerProfile>;
      const validAvatars: AvatarId[] = [
        'uzumaki', 'uchiha', 'kunoichi', 'sensei',
        'sage', 'shadow', 'sand', 'yellowflash',
      ];
      const validFrames: ProfileFrameId[] = [
        'none', 'orange', 'gold', 'red', 'emerald', 'sky', 'rainbow',
        'wood', 'chunin', 'jonin', 'anbu', 'hokage', 'sage', 'celestial',
      ];
      const validBanners: ProfileBannerId[] = [
        'default', 'fire', 'forest', 'storm', 'night', 'sakura',
        'hokage_rock', 'valley_end',
      ];
      const validAccents: ProfileAccentId[] = ['orange', 'red', 'gold', 'emerald', 'sky', 'purple'];

      const avatarId = validAvatars.includes(parsed.avatarId as AvatarId)
        ? (parsed.avatarId as AvatarId)
        : 'uzumaki';
      const frameId = validFrames.includes(parsed.frameId as ProfileFrameId)
        ? (parsed.frameId as ProfileFrameId)
        : 'hokage';
      const bannerId = validBanners.includes(parsed.bannerId as ProfileBannerId)
        ? (parsed.bannerId as ProfileBannerId)
        : 'default';
      const accentId = validAccents.includes(parsed.accentId as ProfileAccentId)
        ? (parsed.accentId as ProfileAccentId)
        : 'orange';
      const avatarBgId = parsed.avatarBgId ?? 'fire';

      const profile: PlayerProfile = {
        playerId: typeof parsed.playerId === 'string' && parsed.playerId ? parsed.playerId : generateShinobiId(),
        playerName:
          typeof parsed.playerName === 'string' && parsed.playerName.trim()
            ? parsed.playerName.trim().slice(0, 24)
            : 'Konoha Shinobi',
        avatarId,
        avatarBgId,
        frameId,
        bannerId,
        accentId,
        createdAt: typeof parsed.createdAt === 'string' ? parsed.createdAt : new Date().toISOString(),
      };
      return profile;
    }
  } catch {
    // Ignore storage read error
  }

  const freshProfile: PlayerProfile = {
    playerId: generateShinobiId(),
    playerName: 'Konoha Shinobi',
    avatarId: 'uzumaki',
    avatarBgId: 'fire',
    frameId: 'hokage',
    bannerId: 'default',
    accentId: 'orange',
    createdAt: new Date().toISOString(),
  };
  saveProfile(freshProfile);
  return freshProfile;
}

export function saveProfile(profile: PlayerProfile): void {
  try {
    window.localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // Ignore storage errors
  }
}

export function loadProgress(): SavedProgress {
  try {
    const raw = window.localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!raw) return { ...DEFAULT_PROGRESS };
    const parsed = JSON.parse(raw) as Partial<SavedProgress>;

    const completedLevels = Array.isArray(parsed.completedLevels)
      ? Array.from(new Set(parsed.completedLevels.filter((n) => typeof n === 'number' && n >= 1 && n <= 50))).sort(
          (a, b) => a - b
        )
      : [];

    const levelOutcomes = parsed.levelOutcomes ?? {};

    // Backfill score/coins/gems accurately if upgrading from an earlier save without totals
    let derivedScore = 0;
    let derivedCoins = 0;
    let derivedGems = 0;
    for (const lvl of completedLevels) {
      const outcome = levelOutcomes[lvl];
      const attempt = outcome?.attemptSolved === 2 ? 2 : 1;
      const calc = calculateLevelReward(lvl, attempt, false);
      derivedScore += outcome?.scoreEarned ?? calc.scoreEarned;
      derivedCoins += outcome?.coinsEarned ?? calc.coinsEarned;
      derivedGems += outcome?.gemsEarned ?? calc.totalGemsEarned;
    }

    const totalScore = typeof parsed.totalScore === 'number' ? Math.max(parsed.totalScore, derivedScore) : derivedScore;
    const totalCoins = typeof parsed.totalCoins === 'number' ? Math.max(parsed.totalCoins, derivedCoins) : derivedCoins;
    const totalGems = typeof parsed.totalGems === 'number' ? Math.max(parsed.totalGems, derivedGems) : derivedGems;

    const highestUnlockedLevel =
      typeof parsed.highestUnlockedLevel === 'number' &&
      parsed.highestUnlockedLevel >= 1 &&
      parsed.highestUnlockedLevel <= 50
        ? Math.max(parsed.highestUnlockedLevel, Math.min(50, completedLevels.length + 1))
        : Math.min(50, completedLevels.length + 1);

    const hasCompletedAll = Boolean(parsed.hasCompletedAll || completedLevels.length >= 50);

    return {
      highestUnlockedLevel,
      completedLevels,
      levelOutcomes,
      totalScore,
      totalCoins,
      totalGems,
      totalWrongAnswers: typeof parsed.totalWrongAnswers === 'number' ? parsed.totalWrongAnswers : 0,
      hasCompletedAll,
      lastUpdated: typeof parsed.lastUpdated === 'string' ? parsed.lastUpdated : new Date().toISOString(),
    };
  } catch {
    return { ...DEFAULT_PROGRESS };
  }
}

export function saveProgress(progress: SavedProgress): void {
  try {
    window.localStorage.setItem(
      PROGRESS_STORAGE_KEY,
      JSON.stringify({
        ...progress,
        lastUpdated: new Date().toISOString(),
      })
    );
  } catch {
    // Gracefully ignore storage quota / privacy mode errors
  }
}

export function clearProgress(): SavedProgress {
  const fresh: SavedProgress = {
    ...DEFAULT_PROGRESS,
    lastUpdated: new Date().toISOString(),
  };
  try {
    window.localStorage.removeItem(PROGRESS_STORAGE_KEY);
  } catch {
    // Ignore storage removal errors
  }
  return fresh;
}

export function recordWrongAttempt(current: SavedProgress): SavedProgress {
  const updated: SavedProgress = {
    ...current,
    totalWrongAnswers: current.totalWrongAnswers + 1,
    lastUpdated: new Date().toISOString(),
  };
  saveProgress(updated);
  return updated;
}

export function recordLevelCompletion(
  current: SavedProgress,
  level: number,
  attemptSolved: 1 | 2
): { progress: SavedProgress; reward: LevelRewardBreakdown } {
  const alreadyCompleted = current.completedLevels.includes(level) || Boolean(current.levelOutcomes[level]);
  const reward = calculateLevelReward(level, attemptSolved, alreadyCompleted);

  if (alreadyCompleted) {
    return { progress: current, reward };
  }

  const completedLevels = [...current.completedLevels, level].sort((a, b) => a - b);
  const levelOutcomes = {
    ...current.levelOutcomes,
    [level]: {
      attemptSolved,
      scoreEarned: reward.scoreEarned,
      coinsEarned: reward.coinsEarned,
      gemsEarned: reward.totalGemsEarned,
      completedAt: new Date().toISOString(),
    },
  };

  const hasCompletedAll = current.hasCompletedAll || level === 50 || completedLevels.length === 50;
  const nextLevel = Math.min(50, level + 1);
  const highestUnlockedLevel = Math.max(current.highestUnlockedLevel, nextLevel);

  const updated: SavedProgress = {
    highestUnlockedLevel,
    completedLevels,
    levelOutcomes,
    totalScore: current.totalScore + reward.scoreEarned,
    totalCoins: current.totalCoins + reward.coinsEarned,
    totalGems: current.totalGems + reward.totalGemsEarned,
    totalWrongAnswers: current.totalWrongAnswers,
    hasCompletedAll,
    lastUpdated: new Date().toISOString(),
  };

  saveProgress(updated);
  return { progress: updated, reward };
}

export interface QuizStats {
  totalCompleted: number;
  completionPercentage: number;
  firstAttemptCount: number;
  secondAttemptCount: number;
  accuracyPercentage: number;
  shinobiRank: string;
  byDifficulty: Record<
    Difficulty,
    {
      total: number;
      completed: number;
      firstAttempt: number;
      secondAttempt: number;
    }
  >;
}

export function getShinobiRank(completedCount: number): string {
  if (completedCount >= 50) return 'Hokage';
  if (completedCount >= 31) return 'Jonin';
  if (completedCount >= 16) return 'Chunin';
  if (completedCount >= 1) return 'Genin';
  return 'Academy Student';
}

export function computeQuizStats(progress: SavedProgress): QuizStats {
  const byDifficulty: QuizStats['byDifficulty'] = {
    'Very Easy': { total: 15, completed: 0, firstAttempt: 0, secondAttempt: 0 },
    Easy: { total: 15, completed: 0, firstAttempt: 0, secondAttempt: 0 },
    Normal: { total: 15, completed: 0, firstAttempt: 0, secondAttempt: 0 },
    Hard: { total: 5, completed: 0, firstAttempt: 0, secondAttempt: 0 },
  };

  let firstAttemptCount = 0;
  let secondAttemptCount = 0;

  for (const level of progress.completedLevels) {
    const q = QUIZ_QUESTIONS.find((item) => item.level === level);
    if (!q) continue;
    const outcome = progress.levelOutcomes[level];
    const diffBucket = byDifficulty[q.difficulty];
    diffBucket.completed += 1;
    if (outcome?.attemptSolved === 2) {
      secondAttemptCount += 1;
      diffBucket.secondAttempt += 1;
    } else {
      firstAttemptCount += 1;
      diffBucket.firstAttempt += 1;
    }
  }

  const totalCompleted = progress.completedLevels.length;
  const totalSubmissions = totalCompleted + progress.totalWrongAnswers;
  const accuracyPercentage =
    totalSubmissions > 0 ? Math.round((totalCompleted / totalSubmissions) * 100) : 0;

  return {
    totalCompleted,
    completionPercentage: Math.round((totalCompleted / 50) * 100),
    firstAttemptCount,
    secondAttemptCount,
    accuracyPercentage,
    shinobiRank: getShinobiRank(totalCompleted),
    byDifficulty,
  };
}
