import React from 'react';
import { Home, User, Award, BarChart3, LogOut, Leaf } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { LanguageToggle } from '../LanguageToggle';
import type { User as UserType } from '../../types';

interface NavigationBarProps {
  user: UserType;
  currentPage: 'home' | 'profile' | 'certificate' | 'admin';
  onNavigate: (page: 'home' | 'profile' | 'certificate' | 'admin') => void;
  onLogout: () => void;
  isAdmin?: boolean;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  user,
  currentPage,
  onNavigate,
  onLogout,
  isAdmin = false
}) => {
  const { t } = useLanguage();

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'profile', icon: User, label: 'Profile' },
    ...(user.surveyCompleted ? [{ id: 'certificate', icon: Award, label: 'Certificate' }] : []),
    ...(isAdmin ? [{ id: 'admin', icon: BarChart3, label: 'Admin' }] : [])
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-emerald-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-emerald-600 rounded-lg p-2">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-gray-900">
                {t('app.title')}
              </h1>
              <p className="text-xs text-gray-600">
                {t('app.tagline')}
              </p>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id as any)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <LanguageToggle />
            
            {/* User Menu */}
            <div className="flex items-center gap-2">
              <div className="hidden sm:block text-right">
                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                <div className="text-xs text-gray-600">
                  {user.category ? t(`category.${user.category}`) : 'Setup needed'}
                </div>
              </div>
              
              <button
                onClick={onLogout}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};