import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, User, Mail, Calendar, Award, Target, MapPin, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { recommendations } from '../data/recommendations';
import { mockUsers, mockCertificates } from '../data/mockData';

export const AdminUserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();
  
  const user = mockUsers.find(u => u.id === id);
  const userCertificates = mockCertificates.filter(cert => cert.userId === id);
  const userRecommendations = user?.category ? recommendations[user.category] : [];

  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-white mb-4">User not found</h2>
        <Link
          to="/admin/users"
          className="text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          ← Back to Users
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          to="/admin/users"
          className="p-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">User Details</h1>
          <p className="text-gray-400">Viewing profile for {user.name}</p>
        </div>
      </div>

      {/* User Profile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/20"
      >
        <div className="flex items-center gap-6 mb-6">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full p-4">
            <User className="w-12 h-12 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{user.name}</h2>
            <div className="flex items-center gap-2 text-gray-400">
              <Mail className="w-4 h-4" />
              {user.email}
            </div>
            <div className="flex items-center gap-4 mt-2">
              <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-sm font-medium">
                {t(`category.${user.category}`)}
              </span>
              <span className="text-gray-400 text-sm flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {user.city}, {user.state}
              </span>
              <span className="text-gray-400 text-sm flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {user.createdAt.toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-gray-400">Age Range:</span>
            <div className="font-medium text-white">{user.ageRange}</div>
          </div>
          <div>
            <span className="text-gray-400">Language:</span>
            <div className="font-medium text-white">
              {user.language === 'pt' ? 'Portuguese' : 'English'}
            </div>
          </div>
          <div>
            <span className="text-gray-400">Role:</span>
            <div className="font-medium text-white capitalize">{user.role}</div>
          </div>
          <div>
            <span className="text-gray-400">Last Activity:</span>
            <div className="font-medium text-white">
              {user.lastActivity.toLocaleDateString()}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Climate Assessment Results */}
      {user.surveyCompleted && user.score && user.level && user.badge && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-xl p-6 border border-emerald-500/30"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-400" />
            Climate Assessment Results
          </h3>
          
          <div className="flex items-center gap-6 mb-4">
            <div className="text-center">
              <div className="text-4xl mb-2">{user.badge}</div>
              <div className="text-sm text-gray-400">Badge</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-400">{user.score}/50</div>
              <div className="text-sm text-gray-400">Score</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-white">
                {t(`level.${user.level}`)}
              </div>
              <div className="text-sm text-gray-400">Level</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-emerald-400">
                {Math.round((user.score / 50) * 100)}%
              </div>
              <div className="text-sm text-gray-400">Completion</div>
            </div>
          </div>

          <div className="w-full bg-gray-700/50 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full transition-all"
              style={{ width: `${Math.round((user.score / 50) * 100)}%` }}
            />
          </div>
        </motion.div>
      )}

      {/* Certificates */}
      {userCertificates.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/20"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Certificates</h3>
          
          <div className="space-y-3">
            {userCertificates.map((cert) => (
              <div
                key={cert.id}
                className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{cert.badge}</span>
                    <div>
                      <div className="font-medium text-white">{cert.code}</div>
                      <div className="text-sm text-gray-400">
                        {cert.issuedAt.toLocaleDateString()} • {t(`level.${cert.level}`)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      cert.visibility === 'public' 
                        ? 'bg-emerald-500/20 text-emerald-400' 
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      <Globe className="w-3 h-3 inline mr-1" />
                      {cert.visibility === 'public' ? 'Public' : 'Private'}
                    </span>
                    
                    <button className="text-emerald-400 hover:text-emerald-300 text-sm transition-colors">
                      View Certificate
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Personalized Recommendations */}
      {user.category && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/20"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-emerald-400" />
            Personalized Recommendations
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userRecommendations.slice(0, 4).map((rec) => (
              <div
                key={rec.id}
                className="border border-gray-600/30 rounded-lg p-4 bg-gray-700/20"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-3 h-3 rounded-full mt-2 ${
                    rec.priority === 'high' ? 'bg-red-500' :
                    rec.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`} />
                  <div>
                    <h4 className="font-medium text-white mb-1">
                      {rec.title[language]}
                    </h4>
                    <p className="text-sm text-gray-400">
                      {rec.description[language]}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};