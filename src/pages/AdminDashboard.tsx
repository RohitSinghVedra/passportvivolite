import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Award, 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Globe,
  FileText,
  Shield,
  Download,
  Search,
  Filter
} from 'lucide-react';
import { motion } from 'framer-motion';
import { mockAnalytics } from '../data/mockData';

export const AdminDashboard: React.FC = () => {
  const stats = [
    {
      icon: Users,
      label: 'Total Users',
      value: mockAnalytics.totalUsers.toLocaleString(),
      color: 'emerald',
      trend: '+12%',
      link: '/admin/users'
    },
    {
      icon: BarChart3,
      label: 'Completed Surveys',
      value: mockAnalytics.completedSurveys.toLocaleString(),
      color: 'blue',
      trend: '+8%',
      link: '/admin/analytics'
    },
    {
      icon: Award,
      label: 'Certificates Issued',
      value: mockAnalytics.certificatesIssued.toLocaleString(),
      color: 'yellow',
      trend: '+15%',
      link: '/admin/certificates'
    },
    {
      icon: Globe,
      label: 'Public Certificates',
      value: mockAnalytics.publicCertificates.toLocaleString(),
      color: 'purple',
      trend: '+23%',
      link: '/admin/certificates'
    },
    {
      icon: TrendingUp,
      label: 'Average Score',
      value: mockAnalytics.averageScore.toString(),
      color: 'green',
      trend: '+2.1',
      link: '/admin/analytics'
    },
    {
      icon: Calendar,
      label: 'Completion Rate',
      value: `${Math.round((mockAnalytics.completedSurveys / mockAnalytics.totalUsers) * 100)}%`,
      color: 'orange',
      trend: '+5%',
      link: '/admin/analytics'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Overview</h1>
          <p className="text-gray-400">Monitor platform performance and user engagement</p>
        </div>
        
        <div className="flex gap-3">
          <Link
            to="/admin/users"
            className="bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            Search Users
          </Link>
          <button className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Data
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <Link
                to={stat.link}
                className="block bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/20 hover:border-emerald-400/40 transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`bg-${stat.color}-500/20 rounded-full p-3 group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-400`} />
                  </div>
                  <span className="text-emerald-400 text-sm font-medium">
                    {stat.trend}
                  </span>
                </div>
                
                <div className="text-2xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">
                  {stat.label}
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          to="/admin/users"
          className="bg-gray-800/30 hover:bg-gray-800/50 rounded-xl p-4 border border-gray-700/50 hover:border-emerald-500/30 transition-all duration-200 flex items-center gap-3"
        >
          <Users className="w-5 h-5 text-emerald-400" />
          <span className="text-white font-medium">Manage Users</span>
        </Link>
        
        <Link
          to="/admin/certificates"
          className="bg-gray-800/30 hover:bg-gray-800/50 rounded-xl p-4 border border-gray-700/50 hover:border-emerald-500/30 transition-all duration-200 flex items-center gap-3"
        >
          <FileText className="w-5 h-5 text-yellow-400" />
          <span className="text-white font-medium">View Certificates</span>
        </Link>
        
        <Link
          to="/admin/analytics"
          className="bg-gray-800/30 hover:bg-gray-800/50 rounded-xl p-4 border border-gray-700/50 hover:border-emerald-500/30 transition-all duration-200 flex items-center gap-3"
        >
          <BarChart3 className="w-5 h-5 text-blue-400" />
          <span className="text-white font-medium">View Analytics</span>
        </Link>
        
        <Link
          to="/admin/settings"
          className="bg-gray-800/30 hover:bg-gray-800/50 rounded-xl p-4 border border-gray-700/50 hover:border-emerald-500/30 transition-all duration-200 flex items-center gap-3"
        >
          <Shield className="w-5 h-5 text-purple-400" />
          <span className="text-white font-medium">Admin Settings</span>
        </Link>
      </div>

      {/* Category Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/20"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">User Categories</h3>
          <Link
            to="/admin/analytics"
            className="text-emerald-400 hover:text-emerald-300 text-sm transition-colors"
          >
            View Details →
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(mockAnalytics.categoryDistribution).map(([category, count]) => (
            <div key={category} className="text-center">
              <div className="text-2xl font-bold text-emerald-400 mb-1">
                {count}
              </div>
              <div className="text-sm text-gray-400 capitalize">
                {category.replace('_', ' ')}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/20"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Daily Signups (Last 7 Days)</h3>
          <Link
            to="/admin/analytics"
            className="text-emerald-400 hover:text-emerald-300 text-sm transition-colors"
          >
            Full Analytics →
          </Link>
        </div>
        
        <div className="space-y-3">
          {mockAnalytics.dailySignups.map((day, index) => {
            const maxCount = Math.max(...mockAnalytics.dailySignups.map(d => d.count));
            const percentage = (day.count / maxCount) * 100;
            
            return (
              <div key={index} className="flex items-center gap-4">
                <div className="w-20 text-sm text-gray-400">
                  {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
                <div className="flex-1 bg-gray-700/50 rounded-full h-6 relative">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="bg-emerald-500 h-6 rounded-full"
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                    {day.count} users
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