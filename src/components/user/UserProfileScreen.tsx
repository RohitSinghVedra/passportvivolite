import React from 'react';
import { User, Award, Calendar, Target, Share2, Download, ArrowLeft, Settings } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { LanguageToggle } from '../LanguageToggle';
import { recommendations } from '../../data/recommendations';
import type { User as UserType, SurveyResponse } from '../../types';

interface UserProfileScreenProps {
  user: UserType;
  responses: SurveyResponse[];
  onBack: () => void;
  onRetakeSurvey: () => void;
}

export const UserProfileScreen: React.FC<UserProfileScreenProps> = ({
  user,
  responses,
  onBack,
  onRetakeSurvey
}) => {
  const { t, language } = useLanguage();
  
  const maxScore = 50;
  const percentage = user.score ? Math.round((user.score / maxScore) * 100) : 0;
  const categoryRecommendations = recommendations[user.category!] || [];

  const handleShare = () => {
    const text = `I completed my climate assessment with Passaporte VIVO and earned ${user.badge} ${t(`level.${user.level}`)} level!`;
    const url = window.location.href;
    
    if (navigator.share) {
      navigator.share({
        title: t('certificate.title'),
        text,
        url
      }).catch(() => {
        const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        window.open(shareUrl, '_blank');
      });
    } else {
      const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
      window.open(shareUrl, '_blank');
    }
  };

  const handleDownload = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 600;

    const gradient = ctx.createLinearGradient(0, 0, 800, 600);
    gradient.addColorStop(0, '#10B981');
    gradient.addColorStop(1, '#14B8A6');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 600);

    ctx.fillStyle = 'white';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Climate Role Certificate', 400, 100);

    ctx.font = '32px Arial';
    ctx.fillText(user.name, 400, 200);

    ctx.font = '24px Arial';
    ctx.fillText(`${user.badge} ${t(`level.${user.level!}`)}`, 400, 250);

    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${user.score}/${maxScore}`, 400, 300);

    const link = document.createElement('a');
    link.download = 'passaporte-vivo-certificate.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl p-8 mb-6 shadow-sm border border-emerald-100">
          <div className="flex items-center gap-6 mb-6">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full p-4">
              <User className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
              <p className="text-gray-600">{user.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                  {t(`category.${user.category}`)}
                </span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600 text-sm flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {user.createdAt.toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Climate Score Card */}
        {user.surveyCompleted && user.score && user.level && user.badge && (
          <div className="bg-white rounded-2xl p-8 mb-6 shadow-sm border border-emerald-100">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{user.badge}</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {t(`level.${user.level}`)}
              </h2>
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="text-3xl font-bold text-emerald-600">
                  {user.score}
                </div>
                <div className="text-gray-400">/</div>
                <div className="text-xl text-gray-600">{maxScore}</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-6 max-w-md mx-auto">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="text-lg text-gray-600 mb-6">
                {percentage}% {t('results.score')}
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleShare}
                  className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-emerald-700 transition-all flex items-center gap-2"
                >
                  <Share2 className="w-5 h-5" />
                  {t('share')}
                </button>
                
                <button
                  onClick={handleDownload}
                  className="bg-white border border-emerald-600 text-emerald-600 px-6 py-3 rounded-xl font-medium hover:bg-emerald-50 transition-all flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  {t('download')}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Recommendations */}
        {user.surveyCompleted && (
          <div className="bg-white rounded-2xl p-8 mb-6 shadow-sm border border-emerald-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Target className="w-6 h-6 text-emerald-600" />
              {t('results.recommendations')}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categoryRecommendations.slice(0, 4).map((rec) => (
                <div
                  key={rec.id}
                  className="border border-gray-200 rounded-xl p-4 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all"
                >
                  <div className="flex items-start gap-3 mb-2">
                    <div className={`w-3 h-3 rounded-full mt-1 ${
                      rec.priority === 'high' ? 'bg-red-500' :
                      rec.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`} />
                    <h4 className="font-semibold text-gray-800 text-sm">
                      {rec.title[language]}
                    </h4>
                  </div>
                  <p className="text-gray-600 text-xs leading-relaxed ml-6">
                    {rec.description[language]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-emerald-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-emerald-600" />
            Actions
          </h3>
          
          <div className="space-y-3">
            {!user.surveyCompleted && (
              <button
                onClick={onRetakeSurvey}
                className="w-full bg-emerald-600 text-white py-3 rounded-xl font-medium hover:bg-emerald-700 transition-all"
              >
                Complete Climate Assessment
              </button>
            )}
            
            {user.surveyCompleted && (
              <button
                onClick={onRetakeSurvey}
                className="w-full bg-white border border-emerald-600 text-emerald-600 py-3 rounded-xl font-medium hover:bg-emerald-50 transition-all"
              >
                Retake Assessment
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};