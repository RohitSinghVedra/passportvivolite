import React, { useState } from 'react';
import { 
  Users, 
  BarChart3, 
  Award, 
  TrendingUp, 
  Search, 
  Filter,
  LogOut,
  Eye,
  Download,
  Calendar
} from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { LanguageToggle } from '../LanguageToggle';
import { mockUsers, mockAnalytics } from '../../data/mockData';
import type { User } from '../../types';

interface AdminDashboardProps {
  onLogout: () => void;
  onViewUser: (user: User) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, onViewUser }) => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'analytics'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || user.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const exportUserData = () => {
    const csvContent = [
      ['Name', 'Email', 'Category', 'Score', 'Level', 'Survey Completed', 'Created At'],
      ...mockUsers.map(user => [
        user.name,
        user.email,
        user.category || '',
        user.score?.toString() || '',
        user.level || '',
        user.surveyCompleted ? 'Yes' : 'No',
        user.createdAt.toLocaleDateString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'passaporte-vivo-users.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-600 rounded-lg p-2">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">
                Passaporte VIVO Admin
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              <LanguageToggle />
              <button
                onClick={onLogout}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'users', label: 'Users', icon: Users },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-8 h-8 text-emerald-600" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {mockAnalytics.totalUsers.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">Total Users</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <Award className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {mockAnalytics.completedSurveys.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">Completed Surveys</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {mockAnalytics.averageScore}
                    </p>
                    <p className="text-sm text-gray-600">Average Score</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="w-8 h-8 text-orange-600" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {Math.round((mockAnalytics.completedSurveys / mockAnalytics.totalUsers) * 100)}%
                    </p>
                    <p className="text-sm text-gray-600">Completion Rate</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Distribution */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">User Categories</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(mockAnalytics.categoryDistribution).map(([category, count]) => (
                  <div key={category} className="text-center">
                    <div className="text-2xl font-bold text-emerald-600 mb-1">
                      {count}
                    </div>
                    <div className="text-sm text-gray-600 capitalize">
                      {t(`category.${category}`)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
              <button
                onClick={exportUserData}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="sm:w-48">
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="all">All Categories</option>
                    <option value="student">Students</option>
                    <option value="employee">Employees</option>
                    <option value="company_owner">Company Owners</option>
                    <option value="government">Government</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Score
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {user.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {user.email}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                            {user.category ? t(`category.${user.category}`) : 'Not set'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {user.badge && <span className="text-lg">{user.badge}</span>}
                            <span className="text-sm font-medium text-gray-900">
                              {user.score || 'N/A'}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.surveyCompleted 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {user.surveyCompleted ? 'Completed' : 'In Progress'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => onViewUser(user)}
                            className="text-emerald-600 hover:text-emerald-900 transition-colors flex items-center gap-1"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
            
            {/* Level Distribution */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Level Distribution</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries(mockAnalytics.levelDistribution).map(([level, count]) => (
                  <div key={level} className="text-center">
                    <div className="text-2xl font-bold text-emerald-600 mb-1">
                      {count}
                    </div>
                    <div className="text-sm text-gray-600">
                      {t(`level.${level}`)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Language Distribution */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Language Preferences</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(mockAnalytics.languageDistribution).map(([lang, count]) => (
                  <div key={lang} className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {count}
                    </div>
                    <div className="text-sm text-gray-600">
                      {lang === 'pt' ? 'Portuguese' : 'English'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Signups Chart */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Signups (Last 7 Days)</h3>
              <div className="space-y-3">
                {mockAnalytics.dailySignups.map((day, index) => {
                  const maxCount = Math.max(...mockAnalytics.dailySignups.map(d => d.count));
                  const percentage = (day.count / maxCount) * 100;
                  
                  return (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-20 text-sm text-gray-600">
                        {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                      <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                        <div 
                          className="bg-emerald-500 h-6 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                        <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-gray-700">
                          {day.count} users
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};