import React, { useState } from 'react';
import { Shield, Database, Users, Globe, AlertTriangle, Save } from 'lucide-react';
import { motion } from 'framer-motion';

export const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    dataRetentionDays: 365,
    allowPublicCertificates: true,
    requireEmailVerification: false,
    enableAnalytics: true,
    maxSurveyRetakes: 5,
    certificateValidityDays: 730
  });

  const handleSave = () => {
    // Save settings logic here
    console.log('Saving settings:', settings);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Admin Settings</h1>
        <p className="text-gray-400">Configure platform policies and data management</p>
      </div>

      {/* Data Management */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/20"
      >
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Database className="w-5 h-5 text-emerald-400" />
          Data Management
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-medium">Data Retention Period</div>
              <div className="text-sm text-gray-400">How long to keep user data after account deletion</div>
            </div>
            <select
              value={settings.dataRetentionDays}
              onChange={(e) => setSettings(prev => ({ ...prev, dataRetentionDays: parseInt(e.target.value) }))}
              className="bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            >
              <option value={30}>30 days</option>
              <option value={90}>90 days</option>
              <option value={365}>1 year</option>
              <option value={730}>2 years</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-medium">Certificate Validity</div>
              <div className="text-sm text-gray-400">How long certificates remain valid</div>
            </div>
            <select
              value={settings.certificateValidityDays}
              onChange={(e) => setSettings(prev => ({ ...prev, certificateValidityDays: parseInt(e.target.value) }))}
              className="bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            >
              <option value={365}>1 year</option>
              <option value={730}>2 years</option>
              <option value={1095}>3 years</option>
              <option value={-1}>Never expire</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* User Policies */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/20"
      >
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-emerald-400" />
          User Policies
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-medium">Allow Public Certificates</div>
              <div className="text-sm text-gray-400">Users can make their certificates publicly visible</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.allowPublicCertificates}
                onChange={(e) => setSettings(prev => ({ ...prev, allowPublicCertificates: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-medium">Require Email Verification</div>
              <div className="text-sm text-gray-400">Users must verify email before accessing features</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.requireEmailVerification}
                onChange={(e) => setSettings(prev => ({ ...prev, requireEmailVerification: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-medium">Maximum Survey Retakes</div>
              <div className="text-sm text-gray-400">How many times users can retake the assessment</div>
            </div>
            <select
              value={settings.maxSurveyRetakes}
              onChange={(e) => setSettings(prev => ({ ...prev, maxSurveyRetakes: parseInt(e.target.value) }))}
              className="bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            >
              <option value={1}>1 time</option>
              <option value={3}>3 times</option>
              <option value={5}>5 times</option>
              <option value={-1}>Unlimited</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Analytics Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/20"
      >
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-emerald-400" />
          Analytics & Privacy
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-medium">Enable Analytics Tracking</div>
              <div className="text-sm text-gray-400">Collect anonymized usage data for platform improvement</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.enableAnalytics}
                onChange={(e) => setSettings(prev => ({ ...prev, enableAnalytics: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
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
          <AlertTriangle className="w-5 h-5" />
          Danger Zone
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-medium">Bulk Data Export</div>
              <div className="text-sm text-gray-400">Export all platform data (use with caution)</div>
            </div>
            <button className="bg-red-600/20 hover:bg-red-600/30 text-red-400 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">
              Export All Data
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-medium">Reset Analytics</div>
              <div className="text-sm text-gray-400">Clear all analytics data (irreversible)</div>
            </div>
            <button className="bg-red-600/20 hover:bg-red-600/30 text-red-400 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">
              Reset Analytics
            </button>
          </div>
        </div>
      </motion.div>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex justify-end"
      >
        <button
          onClick={handleSave}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 flex items-center gap-2"
        >
          <Save className="w-5 h-5" />
          Save Settings
        </button>
      </motion.div>
    </div>
  );
};