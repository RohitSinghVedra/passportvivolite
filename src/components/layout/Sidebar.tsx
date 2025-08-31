import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  User, 
  Award, 
  History, 
  Settings,
  Users,
  BarChart3,
  Shield,
  FileText
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';
import type { User as UserType } from '../../types';

interface SidebarProps {
  user: UserType;
}

export const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  const { t } = useLanguage();
  const location = useLocation();

  const userNavItems = [
    { path: '/me', icon: Home, label: t('nav.dashboard') },
    { path: '/me/certificates', icon: Award, label: t('nav.certificates') },
    { path: '/me/history', icon: History, label: t('nav.history') },
    { path: '/me/settings', icon: Settings, label: t('nav.settings') }
  ];

  const adminNavItems = [
    { path: '/admin', icon: Shield, label: 'Overview' },
    { path: '/admin/users', icon: Users, label: 'Users' },
    { path: '/admin/certificates', icon: FileText, label: 'Certificates' },
    { path: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/admin/settings', icon: Settings, label: 'Settings' }
  ];

  const isAdminRoute = location.pathname.startsWith('/admin');
  const navItems = isAdminRoute ? adminNavItems : userNavItems;

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-gray-900/50 backdrop-blur-sm border-r border-emerald-500/20">
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                isActive
                  ? 'text-emerald-400 bg-emerald-500/10'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-emerald-500/10 rounded-lg border border-emerald-500/20"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <Icon className="w-5 h-5 relative z-10" />
              <span className="relative z-10">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};