import React, { useState } from 'react';
import { Shield, Lock, Mail, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { LanguageToggle } from '../LanguageToggle';

interface AdminLoginScreenProps {
  onAdminAuth: () => void;
  onBack: () => void;
}

export const AdminLoginScreen: React.FC<AdminLoginScreenProps> = ({ onAdminAuth, onBack }) => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock admin credentials
    if (email === 'admin@passaportevivo.com' && password === 'admin123') {
      onAdminAuth();
    } else {
      setError('Invalid admin credentials');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-gray-900 flex items-center justify-center p-4">
      <div className="absolute top-4 left-4">
        <button
          onClick={onBack}
          className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      <div className="absolute top-4 right-4">
        <LanguageToggle />
      </div>
      
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
              <Shield className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Admin Access
          </h1>
          <p className="text-slate-300">
            Secure administrator portal
          </p>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
                  placeholder="admin@passaportevivo.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
                  placeholder="Enter admin password"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-slate-800 text-white py-3 rounded-xl font-medium hover:bg-slate-900 transform hover:scale-[1.02] transition-all shadow-lg"
            >
              Access Admin Dashboard
            </button>
          </form>

          <div className="mt-6 p-4 bg-slate-50 rounded-xl">
            <p className="text-xs text-slate-600 mb-2">Demo Credentials:</p>
            <p className="text-xs text-slate-500">Email: admin@passaportevivo.com</p>
            <p className="text-xs text-slate-500">Password: admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
};