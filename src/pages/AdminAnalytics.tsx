import React from 'react';
import { BarChart3, TrendingUp, Users, Award, Globe, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { mockAnalytics } from '../data/mockData';
import { useLanguage } from '../hooks/useLanguage';

export const AdminAnalytics: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Analytics Dashboard</h1>
        <p className="text-gray-400">Detailed insights into platform usage and user behavior</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/20"
        >
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-8 h-8 text-emerald-400" />
            <div>
              <div className="text-2xl font-bold text-white">
                {mockAnalytics.totalUsers.toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">Total Users</div>
            </div>
          </div>
          <div className="text-emerald-400 text-sm">+12% this month</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/20"
        >
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="w-8 h-8 text-blue-400" />
            <div>
              <div className="text-2xl font-bold text-white">
                {Math.round((mockAnalytics.completedSurveys / mockAnalytics.totalUsers) * 100)}%
              </div>
              <div className="text-sm text-gray-400">Completion Rate</div>
            </div>
          </div>
          <div className="text-blue-400 text-sm">+5% this month</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/20"
        >
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-8 h-8 text-yellow-400" />
            <div>
              <div className="text-2xl font-bold text-white">
                {mockAnalytics.averageScore}
              </div>
              <div className="text-sm text-gray-400">Average Score</div>
            </div>
          </div>
          <div className="text-yellow-400 text-sm">+2.1 this month</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/20"
        >
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-8 h-8 text-purple-400" />
            <div>
              <div className="text-2xl font-bold text-white">
                {Math.round((mockAnalytics.publicCertificates / mockAnalytics.certificatesIssued) * 100)}%
              </div>
              <div className="text-sm text-gray-400">Public Certificates</div>
            </div>
          </div>
          <div className="text-purple-400 text-sm">+23% this month</div>
        </motion.div>
      </div>

      {/* Level Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/20"
      >
        <h3 className="text-lg font-semibold text-white mb-6">Level Distribution</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Object.entries(mockAnalytics.levelDistribution).map(([level, count]) => (
            <div key={level} className="text-center">
              <div className="text-2xl font-bold text-emerald-400 mb-1">
                {count}
              </div>
              <div className="text-sm text-gray-400">
                {t(`level.${level}`)}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Category Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/20"
      >
        <h3 className="text-lg font-semibold text-white mb-6">User Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(mockAnalytics.categoryDistribution).map(([category, count]) => (
            <div key={category} className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1">
                {count}
              </div>
              <div className="text-sm text-gray-400">
                {t(`category.${category}`)}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Geographic Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/20"
      >
        <h3 className="text-lg font-semibold text-white mb-6">Top States (UF)</h3>
        <div className="space-y-3">
          {Object.entries(mockAnalytics.stateDistribution)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 10)
            .map(([state, count], index) => {
              const maxCount = Math.max(...Object.values(mockAnalytics.stateDistribution));
              const percentage = (count / maxCount) * 100;
              
              return (
                <div key={state} className="flex items-center gap-4">
                  <div className="w-8 text-sm text-gray-400 font-medium">
                    {state}
                  </div>
                  <div className="flex-1 bg-gray-700/50 rounded-full h-6 relative">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      className="bg-emerald-500 h-6 rounded-full"
                    />
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                      {count} users
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </motion.div>

      {/* Monthly Signups Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/20"
      >
        <h3 className="text-lg font-semibold text-white mb-6">Monthly Signups</h3>
        <div className="space-y-3">
          {mockAnalytics.monthlySignups.map((month, index) => {
            const maxCount = Math.max(...mockAnalytics.monthlySignups.map(m => m.count));
            const percentage = (month.count / maxCount) * 100;
            
            return (
              <div key={month.month} className="flex items-center gap-4">
                <div className="w-20 text-sm text-gray-400">
                  {new Date(month.month + '-01').toLocaleDateString('en-US', { month: 'short', year: '2-digit' })}
                </div>
                <div className="flex-1 bg-gray-700/50 rounded-full h-6 relative">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="bg-blue-500 h-6 rounded-full"
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                    {month.count} users
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};