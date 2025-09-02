import React, { useState } from 'react';
import { Search, Filter, Download, Eye, MoreVertical, Globe, Lock, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { mockCertificates } from '../data/mockData';
import { useLanguage } from '../hooks/useLanguage';
import type { Certificate } from '../types';

export const AdminCertificates: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [visibilityFilter, setVisibilityFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredCertificates = mockCertificates.filter(cert => {
    const matchesSearch = cert.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesVisibility = visibilityFilter === 'all' || cert.visibility === visibilityFilter;
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'valid' && cert.isValid) ||
                         (statusFilter === 'invalid' && !cert.isValid);
    return matchesSearch && matchesVisibility && matchesStatus;
  });

  const exportCertificates = () => {
    const csvContent = [
      ['Code', 'User Name', 'Category', 'Score', 'Level', 'Visibility', 'Status', 'Issued Date'],
      ...filteredCertificates.map(cert => [
        cert.code,
        cert.userName,
        cert.category,
        cert.score.toString(),
        cert.level,
        cert.visibility,
        cert.isValid ? 'Valid' : 'Invalid',
        cert.issuedAt.toLocaleDateString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
            link.download = 'passaporte-verde-certificates.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Certificate Management</h1>
          <p className="text-gray-400">{filteredCertificates.length} certificates found</p>
        </div>
        <button
          onClick={exportCertificates}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-emerald-500/20"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by certificate code or user name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <select
              value={visibilityFilter}
              onChange={(e) => setVisibilityFilter(e.target.value)}
              className="px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            >
              <option value="all">All Visibility</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            >
              <option value="all">All Status</option>
              <option value="valid">Valid</option>
              <option value="invalid">Invalid</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Certificates Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-emerald-500/20 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Certificate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Score & Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Visibility
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Issued
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {filteredCertificates.map((cert, index) => (
                <motion.tr
                  key={cert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="hover:bg-gray-700/30 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{cert.badge}</span>
                      <div>
                        <div className="text-sm font-medium text-white">
                          {cert.code}
                        </div>
                        <div className="text-sm text-gray-400">
                          {t(`category.${cert.category}`)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">
                      {cert.userName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-emerald-400">
                      {cert.score}/50
                    </div>
                    <div className="text-sm text-gray-400">
                      {t(`level.${cert.level}`)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      cert.visibility === 'public' 
                        ? 'bg-emerald-500/20 text-emerald-400' 
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {cert.visibility === 'public' ? (
                        <>
                          <Globe className="w-3 h-3 mr-1" />
                          Public
                        </>
                      ) : (
                        <>
                          <Lock className="w-3 h-3 mr-1" />
                          Private
                        </>
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      cert.isValid 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {cert.isValid ? 'Valid' : 'Invalid'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {cert.issuedAt.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button className="text-emerald-400 hover:text-emerald-300 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-yellow-400 hover:text-yellow-300 transition-colors">
                        <AlertTriangle className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};