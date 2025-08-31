import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm rounded-full p-1 border border-gray-700/50">
      <Globe className="w-4 h-4 text-white/70" />
      <button
        onClick={() => setLanguage('pt')}
        className={`px-3 py-1 rounded-full text-sm transition-all ${
          language === 'pt'
            ? 'bg-emerald-500 text-white font-medium shadow-lg'
            : 'text-white/70 hover:text-white'
        }`}
      >
        PT
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded-full text-sm transition-all ${
          language === 'en'
            ? 'bg-emerald-500 text-white font-medium shadow-lg'
            : 'text-white/70 hover:text-white'
        }`}
      >
        EN
      </button>
    </div>
  );
};