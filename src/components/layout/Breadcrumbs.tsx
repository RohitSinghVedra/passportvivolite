import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

export const Breadcrumbs: React.FC = () => {
  const { t } = useLanguage();
  const location = useLocation();
  
  const pathSegments = location.pathname.split('/').filter(Boolean);
  
  if (!pathSegments.length || !pathSegments[0].startsWith('admin')) {
    return null;
  }

  const breadcrumbMap: Record<string, string> = {
    'admin': 'Admin',
    'users': 'Users',
    'certificates': 'Certificates',
    'analytics': 'Analytics',
    'settings': 'Settings'
  };

  return (
    <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
      {pathSegments.map((segment, index) => {
        const isLast = index === pathSegments.length - 1;
        const path = '/' + pathSegments.slice(0, index + 1).join('/');
        const label = breadcrumbMap[segment] || segment;
        
        return (
          <React.Fragment key={segment}>
            {index > 0 && <ChevronRight className="w-4 h-4" />}
            {isLast ? (
              <span className="text-emerald-400 font-medium">{label}</span>
            ) : (
              <Link 
                to={path}
                className="hover:text-white transition-colors"
              >
                {label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};