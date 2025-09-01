import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  MapPin, 
  Calendar, 
  Building, 
  Briefcase, 
  GraduationCap, 
  Heart,
  CheckCircle
} from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { useAuth } from '../../contexts/AuthContext';
import { brazilianStates, getCitiesByState } from '../../data/brazilianStates';
import { 
  companySizes, 
  industries, 
  sustainabilityInterests, 
  educationLevels, 
  governmentLevels,
  ageRanges
} from '../../data/profileOptions';
import type { UserCategory } from '../../types';

export const ProfileCompletionScreen: React.FC = () => {
  const { t, language } = useLanguage();
  const { currentUser, updateUserProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  // Form state
  const [category, setCategory] = useState<UserCategory | ''>('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [ageRange, setAgeRange] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [position, setPosition] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [industry, setIndustry] = useState('');
  const [educationLevel, setEducationLevel] = useState('');
  const [governmentLevel, setGovernmentLevel] = useState('');
  const [selectedSustainabilityInterests, setSelectedSustainabilityInterests] = useState<string[]>([]);
  
  // Available cities based on selected state
  const availableCities = selectedState ? getCitiesByState(selectedState) : [];

  const handleSustainabilityInterestToggle = (interest: string) => {
    setSelectedSustainabilityInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const validateForm = (): string | null => {
    if (!category) return language === 'en' ? 'Please select your role' : 'Por favor, selecione seu papel';
    if (!selectedState) return language === 'en' ? 'Please select your state' : 'Por favor, selecione seu estado';
    if (!selectedCity) return language === 'en' ? 'Please select your city' : 'Por favor, selecione sua cidade';
    if (!ageRange) return language === 'en' ? 'Please select your age range' : 'Por favor, selecione sua faixa etária';
    
    // Category-specific validations
    if (category === 'employee' || category === 'company_owner') {
      if (!industry) return language === 'en' ? 'Please select your industry' : 'Por favor, selecione seu setor';
      if (category === 'company_owner' && !companySize) {
        return language === 'en' ? 'Please select company size' : 'Por favor, selecione o tamanho da empresa';
      }
    }
    
    if (category === 'student' && !educationLevel) {
      return language === 'en' ? 'Please select your education level' : 'Por favor, selecione seu nível de educação';
    }
    
    if (category === 'government' && !governmentLevel) {
      return language === 'en' ? 'Please select government level' : 'Por favor, selecione o nível governamental';
    }
    
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const validationError = validateForm();
      if (validationError) {
        throw new Error(validationError);
      }

      await updateUserProfile({
        category: category as UserCategory,
        state: selectedState,
        city: selectedCity,
        ageRange,
        organizationName: organizationName.trim() || undefined,
        position: position.trim() || undefined,
        companySize: companySize || undefined,
        industry: industry || undefined,
        educationLevel: educationLevel || undefined,
        governmentLevel: governmentLevel || undefined,
        sustainabilityInterests: selectedSustainabilityInterests.length > 0 ? selectedSustainabilityInterests : undefined,
        completedOnboarding: true
      });

      setSuccess(true);
    } catch (error: any) {
      console.error('Profile completion error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to render category-specific fields
  const renderCategorySpecificFields = () => {
    switch (category) {
      case 'student':
        return (
          <div>
            <label className="block text-sm font-medium text-emerald-300 mb-2">
              <GraduationCap className="inline w-4 h-4 mr-2" />
              {language === 'en' ? 'Education Level' : 'Nível de Educação'}
            </label>
            <select
              value={educationLevel}
              onChange={(e) => setEducationLevel(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
              required
            >
              <option value="">{language === 'en' ? 'Select education level...' : 'Selecione o nível...'}</option>
              {educationLevels.map(level => (
                <option key={level.value} value={level.value}>{level.label[language]}</option>
              ))}
            </select>
          </div>
        );
      
      case 'employee':
      case 'company_owner':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-emerald-300 mb-2">
                <Building className="inline w-4 h-4 mr-2" />
                {language === 'en' ? 'Organization Name' : 'Nome da Organização'}
              </label>
              <input
                type="text"
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                placeholder={language === 'en' ? 'Your company/organization' : 'Sua empresa/organização'}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-emerald-300 mb-2">
                <Briefcase className="inline w-4 h-4 mr-2" />
                {language === 'en' ? 'Position/Role' : 'Cargo/Função'}
              </label>
              <input
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                placeholder={language === 'en' ? 'Your position' : 'Seu cargo'}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-emerald-300 mb-2">
                {language === 'en' ? 'Industry Sector' : 'Setor Industrial'}
              </label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                required
              >
                <option value="">{language === 'en' ? 'Select industry...' : 'Selecione o setor...'}</option>
                {industries.map(ind => (
                  <option key={ind.value} value={ind.value}>{ind.label[language]}</option>
                ))}
              </select>
            </div>
            
            {category === 'company_owner' && (
              <div>
                <label className="block text-sm font-medium text-emerald-300 mb-2">
                  {language === 'en' ? 'Company Size' : 'Tamanho da Empresa'}
                </label>
                <select
                  value={companySize}
                  onChange={(e) => setCompanySize(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  required
                >
                  <option value="">{language === 'en' ? 'Select company size...' : 'Selecione o tamanho...'}</option>
                  {companySizes.map(size => (
                    <option key={size.value} value={size.value}>{size.label[language]}</option>
                  ))}
                </select>
              </div>
            )}
          </>
        );
      
      case 'government':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-emerald-300 mb-2">
                <Building className="inline w-4 h-4 mr-2" />
                {language === 'en' ? 'Government Institution' : 'Instituição Governamental'}
              </label>
              <input
                type="text"
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                placeholder={language === 'en' ? 'Ministry, secretariat, etc.' : 'Ministério, secretaria, etc.'}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-emerald-300 mb-2">
                {language === 'en' ? 'Government Level' : 'Nível Governamental'}
              </label>
              <select
                value={governmentLevel}
                onChange={(e) => setGovernmentLevel(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                required
              >
                <option value="">{language === 'en' ? 'Select level...' : 'Selecione o nível...'}</option>
                {governmentLevels.map(level => (
                  <option key={level.value} value={level.value}>{level.label[language]}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-emerald-300 mb-2">
                <Briefcase className="inline w-4 h-4 mr-2" />
                {language === 'en' ? 'Position/Role' : 'Cargo/Função'}
              </label>
              <input
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                placeholder={language === 'en' ? 'Your position' : 'Seu cargo'}
              />
            </div>
          </>
        );
      
      default:
        return null;
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 max-w-md w-full text-center"
        >
          <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">
            {language === 'en' ? 'Profile Complete!' : 'Perfil Completo!'}
          </h2>
          <p className="text-gray-300 mb-6">
            {language === 'en' 
              ? 'Your profile has been successfully updated. You can now access all features.'
              : 'Seu perfil foi atualizado com sucesso. Agora você pode acessar todos os recursos.'
            }
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/me'}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 rounded-xl font-semibold"
          >
            {language === 'en' ? 'Go to Dashboard' : 'Ir para o Painel'}
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 max-w-2xl w-full"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            {language === 'en' ? 'Complete Your Profile' : 'Complete Seu Perfil'}
          </h1>
          <p className="text-gray-300">
            {language === 'en' 
              ? 'Please provide some additional information to personalize your experience.'
              : 'Por favor, forneça algumas informações adicionais para personalizar sua experiência.'
            }
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 flex items-center gap-2">
            <span>⚠️</span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-emerald-300 mb-2">
              <User className="inline w-4 h-4 mr-2" />
              {language === 'en' ? 'Your Role' : 'Seu Papel'}
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as UserCategory)}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
              required
            >
              <option value="">{language === 'en' ? 'Select your role...' : 'Selecione seu papel...'}</option>
              <option value="student">{language === 'en' ? 'Student' : 'Estudante'}</option>
              <option value="employee">{language === 'en' ? 'Employee' : 'Funcionário'}</option>
              <option value="company_owner">{language === 'en' ? 'Company Owner' : 'Proprietário de Empresa'}</option>
              <option value="government">{language === 'en' ? 'Government' : 'Governo'}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-emerald-300 mb-2">
              <MapPin className="inline w-4 h-4 mr-2" />
              {language === 'en' ? 'State' : 'Estado'}
            </label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
              required
            >
              <option value="">{language === 'en' ? 'Select your state...' : 'Selecione seu estado...'}</option>
              {brazilianStates.map(state => (
                <option key={state.code} value={state.code}>{state.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-emerald-300 mb-2">
              {language === 'en' ? 'City' : 'Cidade'}
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
              required
              disabled={!selectedState}
            >
              <option value="">{language === 'en' ? 'Select your city...' : 'Selecione sua cidade...'}</option>
              {availableCities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-emerald-300 mb-2">
              <Calendar className="inline w-4 h-4 mr-2" />
              {language === 'en' ? 'Age Range' : 'Faixa Etária'}
            </label>
            <select
              value={ageRange}
              onChange={(e) => setAgeRange(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
              required
            >
              <option value="">{language === 'en' ? 'Select age range...' : 'Selecione a faixa etária...'}</option>
              {ageRanges.map(range => (
                <option key={range.value} value={range.value}>{range.label[language]}</option>
              ))}
            </select>
          </div>

          {/* Category-specific fields */}
          {renderCategorySpecificFields()}

          {/* Sustainability Interests */}
          <div>
            <label className="block text-sm font-medium text-emerald-300 mb-3">
              <Heart className="inline w-4 h-4 mr-2" />
              {language === 'en' ? 'Sustainability Interests (Optional)' : 'Interesses em Sustentabilidade (Opcional)'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {sustainabilityInterests.map(interest => (
                <label key={interest.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedSustainabilityInterests.includes(interest.value)}
                    onChange={() => handleSustainabilityInterestToggle(interest.value)}
                    className="rounded border-gray-600 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-0"
                  />
                  <span className="text-sm text-gray-300">{interest.label[language]}</span>
                </label>
              ))}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {language === 'en' ? 'Saving...' : 'Salvando...'}
              </div>
            ) : (
              language === 'en' ? 'Complete Profile' : 'Completar Perfil'
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};
