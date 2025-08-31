import React from 'react';
import { TrendingUp, TrendingDown, Minus, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { LanguageToggle } from '../LanguageToggle';
import { climateData } from '../../data/climateData';
import type { UserCategory } from '../../types';

interface ClimateDataScreenProps {
  category: UserCategory;
  onContinue: () => void;
}

export const ClimateDataScreen: React.FC<ClimateDataScreenProps> = ({ category, onContinue }) => {
  const { t } = useLanguage();
  const data = climateData[category];

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-5 h-5 text-emerald-500" />;
      case 'down':
        return <TrendingDown className="w-5 h-5 text-red-500" />;
      case 'stable':
        return <Minus className="w-5 h-5 text-yellow-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 p-4">
      <div className="absolute top-4 right-4">
        <LanguageToggle />
      </div>

      <div className="max-w-4xl mx-auto pt-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">
            {t('climate.title')}
          </h1>
          <p className="text-emerald-100 text-lg">
            {t('climate.subtitle')}
          </p>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {data.title[useLanguage().language]}
          </h2>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            {data.description[useLanguage().language]}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.stats.map((stat, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl font-bold text-emerald-600">
                    {stat.value}
                  </span>
                  {getTrendIcon(stat.trend)}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {stat.label[useLanguage().language]}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onContinue}
            className="bg-white text-emerald-600 px-8 py-4 rounded-xl font-medium hover:bg-emerald-50 transform hover:scale-105 transition-all shadow-lg flex items-center gap-2 mx-auto"
          >
            {t('continue')}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};