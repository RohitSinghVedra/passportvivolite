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
  const { currentUser, getUserSurveyHistory, getUserCertificates } = useAuth();
  const [personalizedFact, setPersonalizedFact] = useState<PersonalizedFact | null>(null);
  const [isLoadingFact, setIsLoadingFact] = useState(false);
  const [userRuns, setUserRuns] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Load user data from database
  useEffect(() => {
    const loadUserData = async () => {
      if (currentUser) {
        try {
          const runs = await getUserSurveyHistory(currentUser.id);
          const userCerts = await getUserCertificates(currentUser.id);
          
          console.log('Dashboard data:', { runs: runs.length, certificates: userCerts.length });
          
          // Filter and validate survey runs
          const validRuns = runs.filter(run => {
            return run && 
                   run.id && 
                   run.completedAt && 
                   (run.completedAt instanceof Date || !isNaN(new Date(run.completedAt).getTime()));
          }).map(run => ({
            ...run,
            completedAt: run.completedAt instanceof Date ? run.completedAt : new Date(run.completedAt)
          }));
          
          // Filter and validate certificates
          const validCertificates = userCerts.filter(cert => {
            return cert && 
                   cert.id && 
                   cert.certificateCode && 
                   cert.completedAt && 
                   (cert.completedAt instanceof Date || !isNaN(new Date(cert.completedAt).getTime()));
          }).map(cert => ({
            ...cert,
            completedAt: cert.completedAt instanceof Date ? cert.completedAt : new Date(cert.completedAt),
            createdAt: cert.createdAt instanceof Date ? cert.createdAt : new Date(cert.createdAt || Date.now())
          }));
          
          setUserRuns(validRuns);
          setCertificates(validCertificates);
        } catch (error) {
          console.error('Error loading user data:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    
    loadUserData();
  }, [currentUser, getUserSurveyHistory, getUserCertificates]);
  
  // Get real user data
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
    <div className="space-y-6">
      {loading ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/30 rounded-xl p-12 border border-gray-700/50 text-center"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your dashboard...</p>
        </motion.div>
      ) : (
        <>
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-emerald-800/50 to-teal-800/50 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/30"
          >
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome back, {currentUser?.name}!
              </h1>
              <p className="text-emerald-200">
                Your climate action journey continues
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800/50 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-2">
                  {userRuns.length}
                </div>
                <div className="text-sm text-gray-400">
                  Surveys Completed
                </div>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">
                  {certificates.length}
                </div>
                <div className="text-sm text-gray-400">
                  Certificates Earned
                </div>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  {currentUser?.level ? t(`level.${currentUser.level}`) : 'Beginner'}
                </div>
                <div className="text-sm text-gray-400">
                  Current Level
                </div>
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
                      Climate Insight
                    </h3>
                    <p className="text-sm text-emerald-300">
                      Based on your profile
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

          {/* Survey History */}
          {userRuns.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/20"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">
                  Your Survey History
                </h2>
                <Link
                  to="/me/certificates"
                  className="text-emerald-400 hover:text-emerald-300 text-sm transition-colors"
                >
                  View All Certificates
                </Link>
              </div>
              
              <div className="space-y-4">
                {userRuns.slice(0, 3).map((run, index) => (
                  <motion.div
                    key={run.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30 hover:border-emerald-500/30 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="bg-emerald-500/20 rounded-full p-3">
                          <BarChart3 className="w-6 h-6 text-emerald-400" />
                        </div>
                        <div>
                          <div className="font-semibold text-white mb-1">
                            Survey #{userRuns.length - index}
                          </div>
                          <div className="text-sm text-gray-400">
                            {run.completedAt instanceof Date ? run.completedAt.toLocaleDateString() : new Date(run.completedAt).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                            <span>Score: {run.score}/50</span>
                            <span>•</span>
                            <span>{t(`level.${run.level}`)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Link
                          to={`/results?sessionId=${run.id}`}
                          className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3" />
                          View Results
                        </Link>
                        
                        {certificates.find(cert => cert.certificateCode === run.certificateCode) && (
                          <Link
                            to={`/certificate/${run.certificateCode}`}
                            className="bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1"
                          >
                            <Award className="w-3 h-3" />
                            Certificate
                          </Link>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {userRuns.length > 3 && (
                <div className="mt-4 text-center">
                  <Link
                    to="/me/certificates"
                    className="text-emerald-400 hover:text-emerald-300 text-sm transition-colors"
                  >
                    View all {userRuns.length} surveys →
                  </Link>
                </div>
              )}
            </motion.div>
          )}

          {/* Start New Survey */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-br from-emerald-800/50 to-teal-800/50 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/30 text-center"
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready for Your Next Assessment?
            </h2>
            <p className="text-emerald-200 mb-6">
              Take a new survey to track your progress and earn new certificates
            </p>
            <Link
              to="/survey"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 inline-block"
            >
              Start New Survey
            </Link>
          </motion.div>
        </>
      )}
    </div>
  );
};