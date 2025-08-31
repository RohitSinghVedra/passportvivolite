import React, { useState } from 'react';
import { GraduationCap, Briefcase, Building, MapPin, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { LanguageToggle } from '../LanguageToggle';
import type { UserCategory } from '../../types';

interface OnboardingScreenProps {
  onComplete: (category: UserCategory) => void;
}

const categoryIcons = {
  student: GraduationCap,
  employee: Briefcase,
  company_owner: Building,
  government: MapPin,
};

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<UserCategory | null>(null);

  const categories: UserCategory[] = ['student', 'employee', 'company_owner', 'government'];

  const handleComplete = () => {
    if (selectedCategory) {
      onComplete(selectedCategory);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 p-4">
      <div className="absolute top-4 right-4">
        <LanguageToggle />
      </div>

      <div className="max-w-2xl mx-auto pt-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-4">
            {t('onboarding.title')}
          </h1>
          <p className="text-emerald-100 text-lg">
            {t('onboarding.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {categories.map((category) => {
            const Icon = categoryIcons[category];
            const isSelected = selectedCategory === category;
            
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`p-6 rounded-2xl transition-all transform hover:scale-105 ${
                  isSelected
                    ? 'bg-white text-emerald-600 shadow-xl scale-105'
                    : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
                }`}
              >
                <Icon className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-lg font-semibold">
                  {t(`category.${category}`)}
                </h3>
              </button>
            );
          })}
        </div>

        {selectedCategory && (
          <div className="text-center">
            <button
              onClick={handleComplete}
              className="bg-white text-emerald-600 px-8 py-4 rounded-xl font-medium hover:bg-emerald-50 transform hover:scale-105 transition-all shadow-lg flex items-center gap-2 mx-auto"
            >
              {t('continue')}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};