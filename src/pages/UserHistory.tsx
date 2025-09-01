import React, { useState, useEffect } from 'react';
import { Calendar, BarChart3, Eye, RotateCcw, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { useAuth } from '../contexts/AuthContext';
import type { User, SurveyRun } from '../types';

interface UserHistoryProps {
  user: User;
  onRetakeSurvey: () => void;
}

export const UserHistory: React.FC<UserHistoryProps> = ({ user, onRetakeSurvey }) => {
  const { t } = useLanguage();
  const { currentUser, getUserSurveyHistory } = useAuth();
  const [showRetakeModal, setShowRetakeModal] = useState(false);
  const [selectedRun, setSelectedRun] = useState<SurveyRun | null>(null);
  const [userRuns, setUserRuns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Load real survey history from database
  useEffect(() => {
    const loadHistory = async () => {
      if (currentUser) {
        try {
          const runs = await getUserSurveyHistory(currentUser.id);
          setUserRuns(runs);
        } catch (error) {
          console.error('Error loading survey history:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    
    loadHistory();
  }, [currentUser, getUserSurveyHistory]);

  const handleRetake = () => {
    setShowRetakeModal(false);
    onRetakeSurvey();
  };

  const viewAnswers = (run: SurveyRun) => {
    setSelectedRun(run);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">
          {t('nav.history')}
        </h1>
        <div className="text-sm text-gray-400">
          {userRuns.length} {userRuns.length === 1 ? 'run' : 'runs'}
        </div>
      </div>

      {userRuns.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/30 rounded-xl p-12 border border-gray-700/50 text-center"
        >
          <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-300 mb-2">
            {t('history.empty_title')}
          </h3>
          <p className="text-gray-500 mb-6">
            {t('history.empty_desc')}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRetakeSurvey}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-medium transition-colors"
          >
            {t('dashboard.start_assessment')}
          </motion.button>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {userRuns.map((run, index) => (
            <motion.div
              key={run.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/20 hover:border-emerald-400/40 transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-emerald-500/20 rounded-full p-3">
                    <BarChart3 className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-white mb-1">
                      {run.date.toLocaleDateString()} - {t(`category.${run.category}`)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span>Score: {run.score}/50</span>
                      <span>•</span>
                      <span>{t(`level.${run.level}`)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => viewAnswers(run)}
                    className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    {t('history.view_answers')}
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowRetakeModal(true)}
                    className="bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    {t('history.retake')}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Retake Confirmation Modal */}
      <AnimatePresence>
        {showRetakeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-gray-800 rounded-2xl p-6 max-w-md w-full border border-gray-700"
            >
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-yellow-400" />
                <h3 className="text-lg font-semibold text-white">
                  {t('history.retake_confirm_title')}
                </h3>
              </div>
              
              <p className="text-gray-300 mb-6">
                {t('history.retake_confirm_desc')}
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowRetakeModal(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-xl font-medium transition-colors"
                >
                  {t('common.cancel')}
                </button>
                <button
                  onClick={handleRetake}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-medium transition-colors"
                >
                  {t('history.retake')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};