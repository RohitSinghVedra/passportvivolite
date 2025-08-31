import type { SurveyResponse } from '../types';

export const calculateLevel = (responses: SurveyResponse[]): string => {
  const totalScore = responses.reduce((sum, response) => sum + response.points, 0);
  const maxScore = responses.length * 5;
  const percentage = (totalScore / maxScore) * 100;

  if (percentage >= 90) return 'champion';
  if (percentage >= 75) return 'leader';
  if (percentage >= 60) return 'active';
  if (percentage >= 40) return 'aware';
  return 'beginner';
};

export const getBadgeEmoji = (level: string): string => {
  const badges = {
    champion: '🏆',
    leader: '🌟',
    active: '⚡',
    aware: '🌱',
    beginner: '🌿'
  };
  return badges[level as keyof typeof badges] || '🌿';
};