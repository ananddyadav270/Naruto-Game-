import { getStageForLevel } from '../data/questions';
import { LevelRewardBreakdown } from '../types/quiz';

const STAGE_COMPLETION_GEM_BONUS: Record<number, { gems: number; stageTitle: string }> = {
  15: { gems: 2, stageTitle: 'Academy Student' },
  30: { gems: 3, stageTitle: 'Chunin Trials' },
  45: { gems: 4, stageTitle: 'Jonin Elite' },
  50: { gems: 10, stageTitle: 'Hokage Summit' },
};

export function calculateLevelReward(
  level: number,
  attemptSolved: 1 | 2,
  alreadyRewarded: boolean
): LevelRewardBreakdown {
  const stageBonusInfo = STAGE_COMPLETION_GEM_BONUS[level];
  const isMajorMilestone = level === 15 || level === 30 || level === 45 || level === 50;

  if (alreadyRewarded) {
    return {
      level,
      attemptSolved,
      scoreEarned: 0,
      coinsEarned: 0,
      milestoneGems: 0,
      stageBonusGems: 0,
      totalGemsEarned: 0,
      isFirstTimeClaim: false,
      is2xBonus: attemptSolved === 1,
      isMajorMilestone,
      completedStageTitle: stageBonusInfo?.stageTitle ?? getStageForLevel(level).title,
    };
  }

  const is2xBonus = attemptSolved === 1;
  const scoreEarned = is2xBonus ? 200 : 100;
  const coinsEarned = is2xBonus ? 20 : 10;
  const milestoneGems = level % 5 === 0 ? 1 : 0;
  const stageBonusGems = stageBonusInfo?.gems ?? 0;
  const totalGemsEarned = milestoneGems + stageBonusGems;

  return {
    level,
    attemptSolved,
    scoreEarned,
    coinsEarned,
    milestoneGems,
    stageBonusGems,
    totalGemsEarned,
    isFirstTimeClaim: true,
    is2xBonus,
    isMajorMilestone,
    completedStageTitle: stageBonusInfo?.stageTitle,
  };
}
