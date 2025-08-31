import React from 'react';
import { Award, Share2, Download, Star, Target } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { LanguageToggle } from '../LanguageToggle';
import { recommendations } from '../../data/recommendations';
import type { UserCategory, SurveyResponse } from '../../types';

interface ResultsScreenProps {
  category: UserCategory;
  responses: SurveyResponse[];
  onGenerateCertificate: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({ 
  category, 
  responses, 
  onGenerateCertificate 
}) => {
  const { t, language } = useLanguage();
  
  const totalScore = responses.reduce((sum, response) => sum + response.points, 0);
  const maxScore = responses.length * 5;
  const percentage = Math.round((totalScore / maxScore) * 100);

  const getLevel = (percentage: number) => {
    if (percentage >= 90) return 'champion';
    if (percentage >= 75) return 'leader';
    if (percentage >= 60) return 'active';
    if (percentage >= 40) return 'aware';
    return 'beginner';
  };

  const getBadgeEmoji = (level: string) => {
    const badges = {
      champion: '🏆',
      leader: '🌟',
      active: '⚡',
      aware: '🌱',
      beginner: '🌿'
    };
    return badges[level as keyof typeof badges];
  };

  const level = getLevel(percentage);
  const badge = getBadgeEmoji(level);
  const categoryRecommendations = recommendations[category].slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {t('results.title')}
          </h1>
        </div>

        {/* Score Card */}
        <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm border border-emerald-100">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">{badge}</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {t(`level.${level}`)}
            </h2>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="text-3xl font-bold text-emerald-600">
                {totalScore}
              </div>
              <div className="text-gray-400">/</div>
              <div className="text-xl text-gray-600">{maxScore}</div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full transition-all duration-1000"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <div className="text-lg text-gray-600">
              {percentage}% {t('results.score')}
            </div>
          </div>

          <button
            onClick={onGenerateCertificate}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-xl font-medium hover:from-emerald-700 hover:to-teal-700 transform hover:scale-[1.02] transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <Award className="w-5 h-5" />
            {t('certificate.title')}
          </button>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-emerald-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Target className="w-6 h-6 text-emerald-600" />
            {t('results.recommendations')}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categoryRecommendations.map((rec) => (
              <div
                key={rec.id}
                className="border border-gray-200 rounded-xl p-6 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-3 h-3 rounded-full mt-2 ${
                    rec.priority === 'high' ? 'bg-red-500' :
                    rec.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`} />
                  <h4 className="font-semibold text-gray-800">
                    {rec.title[language]}
                  </h4>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {rec.description[language]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};