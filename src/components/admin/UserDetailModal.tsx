import React from 'react';
import { X, User, Mail, Calendar, Award, Target } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { recommendations } from '../../data/recommendations';
import type { User as UserType } from '../../types';

interface UserDetailModalProps {
  user: UserType;
  onClose: () => void;
}

export const UserDetailModal: React.FC<UserDetailModalProps> = ({ user, onClose }) => {
  const { t, language } = useLanguage();
  const userRecommendations = user.category ? recommendations[user.category] : [];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-xl font-bold text-gray-900">User Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* User Info */}
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-emerald-600 rounded-full p-3">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                <p className="text-gray-600 flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {user.email}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Category:</span>
                <div className="font-medium text-gray-900">
                  {user.category ? t(`category.${user.category}`) : 'Not set'}
                </div>
              </div>
              <div>
                <span className="text-gray-500">Language:</span>
                <div className="font-medium text-gray-900">
                  {user.language === 'pt' ? 'Portuguese' : 'English'}
                </div>
              </div>
              <div>
                <span className="text-gray-500">Joined:</span>
                <div className="font-medium text-gray-900 flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {user.createdAt.toLocaleDateString()}
                </div>
              </div>
              <div>
                <span className="text-gray-500">Status:</span>
                <div className="font-medium text-gray-900">
                  {user.surveyCompleted ? 'Survey Complete' : 'In Progress'}
                </div>
              </div>
            </div>
          </div>

          {/* Climate Score */}
          {user.surveyCompleted && user.score && user.level && user.badge && (
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-600" />
                Climate Assessment Results
              </h4>
              
              <div className="flex items-center gap-6 mb-4">
                <div className="text-center">
                  <div className="text-4xl mb-2">{user.badge}</div>
                  <div className="text-sm text-gray-600">Badge</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">{user.score}/50</div>
                  <div className="text-sm text-gray-600">Score</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">
                    {t(`level.${user.level}`)}
                  </div>
                  <div className="text-sm text-gray-600">Level</div>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full transition-all"
                  style={{ width: `${Math.round((user.score / 50) * 100)}%` }}
                />
              </div>
            </div>
          )}

          {/* Recommendations */}
          {user.category && (
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-emerald-600" />
                Personalized Recommendations
              </h4>
              
              <div className="space-y-3">
                {userRecommendations.slice(0, 3).map((rec) => (
                  <div
                    key={rec.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-3 h-3 rounded-full mt-2 ${
                        rec.priority === 'high' ? 'bg-red-500' :
                        rec.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`} />
                      <div>
                        <h5 className="font-medium text-gray-900 mb-1">
                          {rec.title[language]}
                        </h5>
                        <p className="text-sm text-gray-600">
                          {rec.description[language]}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};