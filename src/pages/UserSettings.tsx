import React, { useState } from 'react';
import { User, Mail, MapPin, Calendar, Globe, Shield, Trash2, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { LanguageToggle } from '../components/LanguageToggle';
import type { User as UserType, UserCategory } from '../types';

interface UserSettingsProps {
  user: UserType;
  onUpdateUser: (updates: Partial<UserType>) => void;
  onDeleteAccount: () => void;
}

export const UserSettings: React.FC<UserSettingsProps> = ({ user, onUpdateUser, onDeleteAccount }) => {
  const { t } = useLanguage();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    category: user.category,
    state: user.state,
    city: user.city,
    ageRange: user.ageRange,
    certificateVisibility: user.certificateVisibility
  });

  const handleSave = () => {
    onUpdateUser(formData);
  };

  const handleDeleteConfirm = () => {
    setShowDeleteModal(false);
    onDeleteAccount();
  };

  const brazilianStates = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  const ageRanges = ['18-25', '26-35', '36-45', '46-55', '56-65', '65+'];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">
        {t('nav.settings')}
      </h1>

      {/* Profile Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/20"
      >
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-emerald-400" />
          Profile Information
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <div className="flex items-center gap-2 bg-gray-700/30 border border-gray-600 rounded-lg px-4 py-3">
              <Mail className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400">{user.email}</span>
              <span className="text-xs text-gray-500 ml-auto">Read-only</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as UserCategory }))}
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            >
              <option value="student">{t('category.student')}</option>
              <option value="employee">{t('category.employee')}</option>
              <option value="company_owner">{t('category.company_owner')}</option>
              <option value="government">{t('category.government')}</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                State (UF)
              </label>
              <select
                value={formData.state}
                onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              >
                {brazilianStates.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                City
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Age Range
            </label>
            <select
              value={formData.ageRange}
              onChange={(e) => setFormData(prev => ({ ...prev, ageRange: e.target.value }))}
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            >
              {ageRanges.map(range => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSave}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105"
          >
            Save Changes
          </button>
        </div>
      </motion.div>

      {/* Language Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/20"
      >
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5 text-emerald-400" />
          Language Preferences
        </h2>
        
        <div className="flex items-center justify-between">
          <div>
            <div className="text-white font-medium">Interface Language</div>
            <div className="text-sm text-gray-400">Choose your preferred language</div>
          </div>
          <LanguageToggle />
        </div>
      </motion.div>

      {/* Privacy Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/20"
      >
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-emerald-400" />
          Privacy & Consent
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-medium">Certificate Visibility</div>
              <div className="text-sm text-gray-400">Default visibility for new certificates</div>
            </div>
            <select
              value={formData.certificateVisibility}
              onChange={(e) => setFormData(prev => ({ ...prev, certificateVisibility: e.target.value as 'public' | 'private' }))}
              className="bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            >
              <option value="private">{t('certificate.private')}</option>
              <option value="public">{t('certificate.public')}</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-red-900/20 backdrop-blur-sm rounded-xl p-6 border border-red-500/20"
      >
        <h2 className="text-lg font-semibold text-red-400 mb-4 flex items-center gap-2">
          <Trash2 className="w-5 h-5" />
          Danger Zone
        </h2>
        
        <div className="flex items-center justify-between">
          <div>
            <div className="text-white font-medium">Delete Account</div>
            <div className="text-sm text-gray-400">Permanently delete your account and all data</div>
          </div>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="bg-red-600/20 hover:bg-red-600/30 text-red-400 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
          >
            Delete Account
          </button>
        </div>
      </motion.div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
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
              className="bg-gray-800 rounded-2xl p-6 max-w-md w-full border border-red-500/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-red-400" />
                <h3 className="text-lg font-semibold text-white">
                  Delete Account
                </h3>
              </div>
              
              <p className="text-gray-300 mb-6">
                This action cannot be undone. All your data, certificates, and survey history will be permanently deleted.
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-xl font-medium transition-colors"
                >
                  {t('common.cancel')}
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-medium transition-colors"
                >
                  Delete Forever
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};