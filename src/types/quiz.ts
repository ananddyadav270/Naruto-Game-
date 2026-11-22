export type Difficulty = 'Very Easy' | 'Easy' | 'Normal' | 'Hard';

export type ScreenState =
  | 'HOME'
  | 'PROFILE'
  | 'STAGE_TRANSITION'
  | 'PLAYING'
  | 'LEVEL_COMPLETE'
  | 'GAME_OVER'
  | 'VICTORY';

export type AvatarId = 'uzumaki' | 'uchiha' | 'kunoichi' | 'sensei';

export type ProfileFrameId = 'none' | 'orange' | 'gold' | 'red' | 'emerald' | 'sky' | 'rainbow';

export type ProfileBannerId = 'default' | 'fire' | 'forest' | 'storm' | 'night' | 'sakura';

export type ProfileAccentId = 'orange' | 'red' | 'gold' | 'emerald' | 'sky' | 'purple';

export interface ShinobiAvatar {
  id: AvatarId;
  name: string;
  title: string;
  imageSrc: string;
  accentClass: string;
}

export interface PlayerProfile {
  playerId: string;
  playerName: string;
  avatarId: AvatarId;
  frameId: ProfileFrameId;
  bannerId: ProfileBannerId;
  accentId: ProfileAccentId;
  createdAt: string;
}

export interface QuizQuestion {
  level: number;
  difficulty: Difficulty;
  stageTitle: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
}

export interface LevelRewardBreakdown {
  level: number;
  attemptSolved: 1 | 2;
  scoreEarned: number;
  coinsEarned: number;
  milestoneGems: number;
  stageBonusGems: number;
  totalGemsEarned: number;
  isFirstTimeClaim: boolean;
  is2xBonus: boolean;
  isMajorMilestone: boolean;
  completedStageTitle?: string;
}

export interface LevelOutcome {
  attemptSolved: 1 | 2;
  scoreEarned: number;
  coinsEarned: number;
  gemsEarned: number;
  completedAt: string;
}

export interface SavedProgress {
  highestUnlockedLevel: number;
  completedLevels: number[];
  levelOutcomes: Record<number, LevelOutcome>;
  totalScore: number;
  totalCoins: number;
  totalGems: number;
  totalWrongAnswers: number;
  hasCompletedAll: boolean;
  lastUpdated: string;
}

export interface StageMetadata {
  difficulty: Difficulty;
  title: string;
  japaneseSubtitle: string;
  rangeLabel: string;
  startLevel: number;
  endLevel: number;
  description: string;
  imageSrc: string;
  accentHex: string;
}
