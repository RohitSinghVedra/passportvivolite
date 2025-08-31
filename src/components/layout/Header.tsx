import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, User, ChevronDown, LogOut, Settings, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';
import { LanguageToggle } from '../LanguageToggle';
import type { User as UserType } from '../../types';

interface HeaderProps {
  user: UserType | null;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  const { t } = useLanguage();
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <header className="bg-gray-900/95 backdrop-blur-sm border-b border-emerald-500/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg p-2 group-hover:scale-110 transition-transform duration-200">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-white">
                {t('app.title')}
              </h1>
              <p className="text-xs text-emerald-300">
                {t('app.tagline')}
              </p>
            </div>
          </Link>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <LanguageToggle />
            
            {user && (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-full px-3 py-2 transition-all duration-200"
                >
                  <div className="bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full p-1.5">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="hidden sm:block text-left">
                    <div className="text-sm font-medium text-white">{user.name}</div>
                    <div className="text-xs text-emerald-300">
                      {user.category ? t(`category.${user.category}`) : 'Setup needed'}
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-xl shadow-xl border border-gray-700 py-2"
                    >
                      <Link
                        to="/me"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <User className="w-4 h-4" />
                        {t('nav.dashboard')}
                      </Link>
                      
                      {user.role === 'admin' && (
                        <Link
                          to="/admin"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <Settings className="w-4 h-4" />
                          Admin
                        </Link>
                      )}
                      
                      <div className="border-t border-gray-700 my-2" />
                      
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          onLogout();
                        }}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-gray-700/50 transition-colors w-full text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        {t('auth.signout')}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};