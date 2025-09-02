import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Award, BarChart3, History, TrendingUp, Eye, Download, Share2, Lightbulb, RefreshCw, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { useAuth } from '../contexts/AuthContext';
import { getRandomPersonalizedFact, getContextualFacts } from '../data/personalizedFacts';
import { NewsSection } from '../components/NewsSection';
import type { User, PersonalizedFact } from '../types';

interface UserDashboardProps {
  user: User;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({ user }) => {
  const { t, language } = useLanguage();
  const { currentUser, getUserSurveyHistory, getUserCertificates } = useAuth();
  const navigate = useNavigate();
  const [personalizedFact, setPersonalizedFact] = useState<PersonalizedFact | null>(null);
  const [isLoadingFact, setIsLoadingFact] = useState(false);
  const [userRuns, setUserRuns] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const refreshDashboardData = async () => {
    if (currentUser) {
      setLoading(true);
      try {
        console.log('Manually refreshing dashboard data...');
        const runs = await getUserSurveyHistory(currentUser.id);
        const userCerts = await getUserCertificates(currentUser.id);
        
        console.log('Manual refresh - Raw dashboard data:', { 
          runs: runs.length, 
          certificates: userCerts.length,
          runsData: runs,
          certificatesData: userCerts
        });
        
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
        
        console.log('Manual refresh - Processed dashboard data:', { 
          validRuns: validRuns.length, 
          validCertificates: validCertificates.length,
          latestRun: validRuns[0],
          firstCertificate: validCertificates[0]
        });
        
        setUserRuns(validRuns);
        setCertificates(validCertificates);
      } catch (error) {
        console.error('Error refreshing dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Load user data from database
  useEffect(() => {
    const loadUserData = async () => {
      if (currentUser) {
        try {
          console.log('Loading dashboard data for user:', currentUser.id);
          const runs = await getUserSurveyHistory(currentUser.id);
          const userCerts = await getUserCertificates(currentUser.id);
          
          console.log('Raw dashboard data:', { 
            runs: runs.length, 
            certificates: userCerts.length,
            runsData: runs,
            certificatesData: userCerts
          });
          
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
          
          // Sort runs by completedAt in descending order (most recent first)
          validRuns.sort((a, b) => {
            const dateA = a.completedAt instanceof Date ? a.completedAt : new Date(a.completedAt);
            const dateB = b.completedAt instanceof Date ? b.completedAt : new Date(b.completedAt);
            return dateB.getTime() - dateA.getTime();
          });
          
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
          
          console.log('Processed dashboard data:', { 
            validRuns: validRuns.length, 
            validCertificates: validCertificates.length,
            latestRun: validRuns[0],
            firstCertificate: validCertificates[0]
          });
          
          setUserRuns(validRuns);
          setCertificates(validCertificates);
          
          console.log('Dashboard state updated:', { 
            userRunsLength: validRuns.length, 
            certificatesLength: validCertificates.length,
            loading: false,
            firstRun: validRuns[0],
            lastRun: validRuns[validRuns.length - 1]
          });
        } catch (error) {
          console.error('Error loading user data:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    
    loadUserData();
  }, [currentUser, getUserSurveyHistory, getUserCertificates]);
  
  // Debug state changes
  useEffect(() => {
    console.log('UserDashboard state changed:', { 
      userRunsLength: userRuns.length, 
      certificatesLength: certificates.length,
      loading 
    });
  }, [userRuns.length, certificates.length, loading]);
  
  // Get real user data
  const latestRun = userRuns[0];
  
  // Debug latestRun
  useEffect(() => {
    console.log('Latest run debug:', {
      userRunsLength: userRuns.length,
      latestRun: latestRun,
      latestRunScore: latestRun?.score,
      latestRunLevel: latestRun?.level,
      latestRunBadge: latestRun?.badge,
      latestRunCompletedAt: latestRun?.completedAt
    });
  }, [userRuns, latestRun]);
  
  // Get achievement message based on latest score
  const getAchievementMessage = (score: number) => {
    if (score >= 45) return { en: 'Climate Champion!', pt: 'Campeão Climático!' };
    if (score >= 35) return { en: 'Great Progress!', pt: 'Ótimo Progresso!' };
    if (score >= 25) return { en: 'Well Done!', pt: 'Muito Bem!' };
    if (score >= 15) return { en: 'Getting There!', pt: 'Chegando Lá!' };
    return { en: 'Keep Going!', pt: 'Continue Assim!' };
  };
  
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
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-6xl mb-4"
              >
                🌱
              </motion.div>
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-4xl font-bold text-white mb-3"
              >
                Welcome back, {currentUser?.name}!
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-emerald-200 text-lg mb-6"
              >
                Your climate action journey continues with every step forward
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-emerald-800/50 to-teal-800/50 rounded-xl p-6 text-center border border-emerald-500/30 hover:border-emerald-400/50 transition-all duration-300"
              >
                <div className="text-4xl mb-2 animate-pulse">
                  {loading ? '...' : latestRun ? latestRun.badge || '🌱' : '🌱'}
                </div>
                <div className="text-2xl font-bold text-emerald-400 mb-1">
                  {loading ? '...' : latestRun ? `${latestRun.score}/60` : '0/60'}
                </div>
                <div className="text-sm text-emerald-300 mb-2">
                  {loading ? 'Loading...' : latestRun ? t(`level.${latestRun.level}`) : 'Beginner'}
                </div>
                <div className="text-xs text-gray-400 mb-3">
                  Latest Assessment
                </div>
                {latestRun && (
                  <>
                    <div className="text-xs text-emerald-400 font-medium mb-2">
                      {getAchievementMessage(latestRun.score)[language]}
                    </div>
                    <div className="w-full bg-gray-700/50 rounded-full h-2">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(latestRun.score / 60) * 100}%` }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full"
                      ></motion.div>
                    </div>
                  </>
                )}
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-yellow-800/50 to-orange-800/50 rounded-xl p-6 text-center border border-yellow-500/30 hover:border-yellow-400/50 transition-all duration-300"
              >
                <div className="text-4xl mb-2 animate-bounce">
                  🏆
                </div>
                <div className="text-3xl font-bold text-yellow-400 mb-2">
                  {loading ? '...' : certificates.length}
                </div>
                <div className="text-sm text-yellow-300 mb-3">
                  Certificates Earned
                </div>
                {certificates.length > 0 && (
                  <div className="text-xs text-yellow-400 font-medium">
                    {certificates.length === 1 ? 'First Achievement!' : `${certificates.length} Milestones!`}
                  </div>
                )}
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-blue-800/50 to-indigo-800/50 rounded-xl p-6 text-center border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300"
              >
                <div className="text-4xl mb-2 animate-pulse">
                  ⭐
                </div>
                <div className="text-2xl font-bold text-blue-400 mb-1">
                  {latestRun ? t(`level.${latestRun.level}`) : (currentUser?.level ? t(`level.${currentUser.level}`) : 'Beginner')}
                </div>
                <div className="text-sm text-blue-300 mb-3">
                  Current Level
                </div>
                {(latestRun?.level || currentUser?.level) && (
                  <div className="text-xs text-blue-400 font-medium">
                    {(latestRun?.level || currentUser?.level) === 'champion' ? 'Elite Status!' : 
                     (latestRun?.level || currentUser?.level) === 'leader' ? 'Leading the Way!' :
                     (latestRun?.level || currentUser?.level) === 'active' ? 'Active Participant!' :
                     (latestRun?.level || currentUser?.level) === 'aware' ? 'Climate Conscious!' : 'Getting Started!'}
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>

          {/* Start Assessment Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/survey')}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3 mx-auto"
            >
              <Play className="w-5 h-5" />
              {t('dashboard.start_assessment')}
            </motion.button>
            <div className="flex gap-4 justify-center mt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={refreshDashboardData}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh Data
              </motion.button>
            </div>
            <p className="text-gray-400 text-sm mt-3">
              Take a new assessment to improve your climate action score
            </p>
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
                            <span>Score: {run.score}/60</span>
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

          {/* News Section */}
          <NewsSection />

        </>
      )}
    </div>
  );
};