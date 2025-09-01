import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Award, BarChart3, History, TrendingUp, Eye, Download, Share2, Lightbulb, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { useAuth } from '../contexts/AuthContext';
import { getRandomPersonalizedFact, getContextualFacts } from '../data/personalizedFacts';
import type { User, PersonalizedFact } from '../types';

interface UserDashboardProps {
  user: User;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({ user }) => {
  const { t, language } = useLanguage();
  const { currentUser } = useAuth();
  const [personalizedFact, setPersonalizedFact] = useState<PersonalizedFact | null>(null);
  const [isLoadingFact, setIsLoadingFact] = useState(false);
  
  // Get real user data (for now, we'll use the user prop but this will be replaced with real Firestore data)
  const userCertificates = currentUser?.certificates || [];
  const userRuns = currentUser?.surveyRuns || [];
  const latestRun = userRuns[0];
  
  // Load personalized fact
  useEffect(() => {
    if (user) {
      const fact = getRandomPersonalizedFact(user);
      setPersonalizedFact(fact);
    }
  }, [user]);
  
  const refreshFact = () => {
    setIsLoadingFact(true);
    setTimeout(() => {
      const newFact = getRandomPersonalizedFact(user);
      setPersonalizedFact(newFact);
      setIsLoadingFact(false);
    }, 500);
  };

  const handleShare = () => {
    const badge = user.badge || '🌱';
    const level = user.level ? t(`level.${user.level}`) : t('level.beginner');
    const text = `I completed my climate assessment with Passaporte VIVO and earned ${badge} ${level} level!`;
    
    if (navigator.share) {
      navigator.share({
        title: t('certificate.title'),
        text,
        url: window.location.href
      }).catch(() => {
        const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
        window.open(shareUrl, '_blank');
      });
    } else {
      const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
      window.open(shareUrl, '_blank');
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-emerald-500/20"
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {t('dashboard.welcome')}, {user.name}
            </h1>
            {latestRun && user.badge && user.level && (
              <div className="flex items-center gap-3">
                <span className="text-emerald-300">
                  {t('dashboard.latest_level')}:
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{user.badge}</span>
                  <span className="text-lg font-semibold text-white">
                    {t(`level.${user.level}`)}
                  </span>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex gap-3">
            {latestRun ? (
              <>
                <Link
                  to="/results"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105"
                >
                  {t('dashboard.view_result')}
                </Link>
                <Link
                  to="/me/certificates"
                  className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105"
                >
                  {t('dashboard.manage_certificate')}
                </Link>
              </>
            ) : (
              <Link
                to="/survey"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105"
              >
                {t('dashboard.start_assessment')}
              </Link>
            )}
          </div>
        </div>
      </motion.div>

      {/* Personalized Climate Fact */}
      {personalizedFact && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-gradient-to-br from-emerald-800/50 to-teal-800/50 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/30"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-500/20 rounded-lg p-2">
                <Lightbulb className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {t('dashboard.personalized_insight')}
                </h3>
                <p className="text-sm text-emerald-300">
                  {t('dashboard.based_on_your_profile')}
                </p>
              </div>
            </div>
            <button
              onClick={refreshFact}
              disabled={isLoadingFact}
              className="p-2 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 rounded-lg transition-all duration-200 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isLoadingFact ? 'animate-spin' : ''}`} />
            </button>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-lg font-medium text-white">
              {personalizedFact.title[language]}
            </h4>
            <p className="text-emerald-100 leading-relaxed">
              {personalizedFact.content[language]}
            </p>
            {personalizedFact.source && (
              <p className="text-xs text-emerald-300/70">
                Source: {personalizedFact.source}
              </p>
            )}
          </div>
        </motion.div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/20"
        >
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="w-6 h-6 text-emerald-400" />
            <h3 className="text-lg font-semibold text-white">
              {t('dashboard.climate_score')}
            </h3>
          </div>
          <div className="text-3xl font-bold text-emerald-400 mb-1">
            {user.score || 0}/50
          </div>
          <div className="text-sm text-gray-400">
            {user.score ? `${Math.round((user.score / 50) * 100)}% complete` : 'Not assessed'}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/20"
        >
          <div className="flex items-center gap-3 mb-2">
            <Award className="w-6 h-6 text-yellow-400" />
            <h3 className="text-lg font-semibold text-white">
              {t('nav.certificates')}
            </h3>
          </div>
          <div className="text-3xl font-bold text-yellow-400 mb-1">
            {userCertificates.length}
          </div>
          <div className="text-sm text-gray-400">
            {userCertificates.filter(c => c.visibility === 'public').length} public
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/20"
        >
          <div className="flex items-center gap-3 mb-2">
            <History className="w-6 h-6 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">
              {t('nav.history')}
            </h3>
          </div>
          <div className="text-3xl font-bold text-blue-400 mb-1">
            {userRuns.length}
          </div>
          <div className="text-sm text-gray-400">
            Survey runs
          </div>
        </motion.div>
      </div>

      {/* Recent Certificates */}
      {userCertificates.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/20"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">
              {t('dashboard.recent_certificates')}
            </h3>
            <Link
              to="/me/certificates"
              className="text-emerald-400 hover:text-emerald-300 text-sm transition-colors"
            >
              {t('dashboard.view_all')}
            </Link>
          </div>
          
          <div className="space-y-3">
            {userCertificates.slice(0, 2).map((cert) => (
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
                        {cert.issuedAt.toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      cert.visibility === 'public' 
                        ? 'bg-emerald-500/20 text-emerald-400' 
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {t(`certificate.${cert.visibility}`)}
                    </span>
                    
                    <div className="flex gap-1">
                      <button className="p-1.5 text-gray-400 hover:text-white transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-white transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={handleShare}
                        className="p-1.5 text-gray-400 hover:text-white transition-colors"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Empty State */}
      {userCertificates.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gray-800/30 rounded-xl p-8 border border-gray-700/50 text-center"
        >
          <Award className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-300 mb-2">
            {t('dashboard.no_certificates')}
          </h3>
          <p className="text-gray-500 mb-4">
            {t('dashboard.no_certificates_desc')}
          </p>
          <Link
            to="/survey"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 inline-block"
          >
            {t('dashboard.start_assessment')}
          </Link>
        </motion.div>
      )}
    </div>
  );
};