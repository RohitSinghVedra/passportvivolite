import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  MapPin, 
  Calendar, 
  Building, 
  Briefcase, 
  GraduationCap, 
  Heart,
  Globe,
  Award,
  Users,
  Leaf,
  Shield
} from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { brazilianStates } from '../../data/brazilianStates';
import { 
  companySizes, 
  industries, 
  sustainabilityInterests, 
  educationLevels, 
  governmentLevels,
  ageRanges
} from '../../data/profileOptions';
import type { User as UserType } from '../../types';

interface UserProfileDisplayProps {
  user: UserType;
}

export const UserProfileDisplay: React.FC<UserProfileDisplayProps> = ({ user }) => {
  const { language, t } = useLanguage();

  const getStateName = (code: string) => {
    const state = brazilianStates.find(s => s.code === code);
    return state ? state.name : code;
  };

  const getLabel = (value: string, options: any[]) => {
    const option = options.find(opt => opt.value === value);
    return option ? option.label[language] : value;
  };

  const getCategoryLabel = (category: string) => {
    const categories = {
      student: { en: 'Student', pt: 'Estudante' },
      employee: { en: 'Employee', pt: 'Funcionário' },
      company_owner: { en: 'Company Owner', pt: 'Proprietário de Empresa' },
      government: { en: 'Government', pt: 'Governo' }
    };
    return categories[category as keyof typeof categories]?.[language] || category;
  };

  const getVisibilityLabel = (visibility: string) => {
    return visibility === 'public' 
      ? t('profile.public')
      : t('profile.private');
  };

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/20"
      >
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-emerald-400" />
          {t('profile.basic_info')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
            <User className="w-5 h-5 text-emerald-400" />
            <div>
              <p className="text-sm text-gray-400">{t('profile.name')}</p>
              <p className="text-white font-medium">{user.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
            <Mail className="w-5 h-5 text-emerald-400" />
            <div>
              <p className="text-sm text-gray-400">{t('profile.email')}</p>
              <p className="text-white font-medium">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
            <Award className="w-5 h-5 text-emerald-400" />
            <div>
              <p className="text-sm text-gray-400">{t('profile.role')}</p>
              <p className="text-white font-medium">{getCategoryLabel(user.category)}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
            <Calendar className="w-5 h-5 text-emerald-400" />
            <div>
              <p className="text-sm text-gray-400">{t('profile.age_range')}</p>
              <p className="text-white font-medium">{getLabel(user.ageRange, ageRanges)}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
            <MapPin className="w-5 h-5 text-emerald-400" />
            <div>
              <p className="text-sm text-gray-400">{t('profile.location')}</p>
              <p className="text-white font-medium">{user.city}, {getStateName(user.state)}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
            <Globe className="w-5 h-5 text-emerald-400" />
            <div>
              <p className="text-sm text-gray-400">{t('profile.language')}</p>
              <p className="text-white font-medium">{language === 'en' ? 'English' : 'Português'}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Professional Information */}
      {(user.organizationName || user.position || user.industry || user.companySize || user.educationLevel || user.governmentLevel) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/20"
        >
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Building className="w-5 h-5 text-emerald-400" />
            {t('profile.professional_info')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {user.organizationName && (
              <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
                <Building className="w-5 h-5 text-emerald-400" />
                <div>
                  <p className="text-sm text-gray-400">
                    {t('profile.organization')}
                  </p>
                  <p className="text-white font-medium">{user.organizationName}</p>
                </div>
              </div>
            )}

            {user.position && (
              <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
                <Briefcase className="w-5 h-5 text-emerald-400" />
                <div>
                  <p className="text-sm text-gray-400">
                    {t('profile.position')}
                  </p>
                  <p className="text-white font-medium">{user.position}</p>
                </div>
              </div>
            )}

            {user.industry && (
              <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
                <Building className="w-5 h-5 text-emerald-400" />
                <div>
                  <p className="text-sm text-gray-400">
                    {t('profile.industry')}
                  </p>
                  <p className="text-white font-medium">{getLabel(user.industry, industries)}</p>
                </div>
              </div>
            )}

            {user.companySize && (
              <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
                <Users className="w-5 h-5 text-emerald-400" />
                <div>
                  <p className="text-sm text-gray-400">
                    {t('profile.company_size')}
                  </p>
                  <p className="text-white font-medium">{getLabel(user.companySize, companySizes)}</p>
                </div>
              </div>
            )}

            {user.educationLevel && (
              <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
                <GraduationCap className="w-5 h-5 text-emerald-400" />
                <div>
                  <p className="text-sm text-gray-400">
                    {t('profile.education_level')}
                  </p>
                  <p className="text-white font-medium">{getLabel(user.educationLevel, educationLevels)}</p>
                </div>
              </div>
            )}

            {user.governmentLevel && (
              <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
                <Building className="w-5 h-5 text-emerald-400" />
                <div>
                  <p className="text-sm text-gray-400">
                    {t('profile.government_level')}
                  </p>
                  <p className="text-white font-medium">{getLabel(user.governmentLevel, governmentLevels)}</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Sustainability Interests */}
      {user.sustainabilityInterests && user.sustainabilityInterests.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/20"
        >
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5 text-emerald-400" />
            {t('profile.sustainability_interests')}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {user.sustainabilityInterests.map((interest, index) => (
              <div key={interest} className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                <Leaf className="w-4 h-4 text-emerald-400" />
                <span className="text-white text-sm">
                  {getLabel(interest, sustainabilityInterests)}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Account Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/20"
      >
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-emerald-400" />
          {t('profile.account_info')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
            <Shield className="w-5 h-5 text-emerald-400" />
            <div>
              <p className="text-sm text-gray-400">
                {t('profile.certificate_visibility')}
              </p>
              <p className="text-white font-medium">{getVisibilityLabel(user.certificateVisibility)}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
            <Calendar className="w-5 h-5 text-emerald-400" />
            <div>
              <p className="text-sm text-gray-400">
                {t('profile.member_since')}
              </p>
              <p className="text-white font-medium">
                {user.createdAt instanceof Date 
                  ? user.createdAt.toLocaleDateString(language === 'en' ? 'en-US' : 'pt-BR')
                  : new Date(user.createdAt).toLocaleDateString(language === 'en' ? 'en-US' : 'pt-BR')
                }
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
            <Calendar className="w-5 h-5 text-emerald-400" />
            <div>
              <p className="text-sm text-gray-400">
                {t('profile.last_activity')}
              </p>
              <p className="text-white font-medium">
                {user.lastActivity instanceof Date 
                  ? user.lastActivity.toLocaleDateString(language === 'en' ? 'en-US' : 'pt-BR')
                  : new Date(user.lastActivity).toLocaleDateString(language === 'en' ? 'en-US' : 'pt-BR')
                }
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
            <Award className="w-5 h-5 text-emerald-400" />
            <div>
              <p className="text-sm text-gray-400">
                {t('profile.account_status')}
              </p>
              <p className="text-white font-medium">
                {user.completedOnboarding 
                  ? t('profile.complete')
                  : t('profile.incomplete')
                }
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
