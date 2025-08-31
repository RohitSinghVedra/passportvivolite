import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Leaf, 
  Mail, 
  Lock, 
  User, 
  MapPin, 
  Calendar, 
  ArrowRight,
  Globe,
  Award,
  BarChart3,
  Users,
  Sparkles,
  ChevronDown,
  Play
} from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { LanguageToggle } from '../LanguageToggle';
import type { UserCategory } from '../../types';

interface AuthScreenProps {
  onAuth: (user: { 
    email: string; 
    name: string; 
    category?: UserCategory;
    location?: string;
    birthYear?: number;
  }) => void;
}

const features = [
  {
    icon: BarChart3,
    title: { en: 'Climate Assessment', pt: 'Avaliação Climática' },
    description: { en: 'Discover your environmental impact with our comprehensive 10-question assessment', pt: 'Descubra seu impacto ambiental com nossa avaliação abrangente de 10 perguntas' }
  },
  {
    icon: Award,
    title: { en: 'Digital Certificates', pt: 'Certificados Digitais' },
    description: { en: 'Earn verified certificates showcasing your climate action level', pt: 'Ganhe certificados verificados mostrando seu nível de ação climática' }
  },
  {
    icon: Users,
    title: { en: 'Personalized Insights', pt: 'Insights Personalizados' },
    description: { en: 'Get tailored recommendations based on your role and location in Brazil', pt: 'Receba recomendações personalizadas baseadas em seu papel e localização no Brasil' }
  },
  {
    icon: Globe,
    title: { en: 'Community Impact', pt: 'Impacto Comunitário' },
    description: { en: 'Join thousands of Brazilians taking action for climate change', pt: 'Junte-se a milhares de brasileiros agindo pela mudança climática' }
  }
];

const stats = [
  { value: '1,247', label: { en: 'Active Users', pt: 'Usuários Ativos' } },
  { value: '892', label: { en: 'Assessments Completed', pt: 'Avaliações Concluídas' } },
  { value: '856', label: { en: 'Certificates Issued', pt: 'Certificados Emitidos' } },
  { value: '4.8/5', label: { en: 'User Rating', pt: 'Avaliação dos Usuários' } }
];

export const AuthScreen: React.FC<AuthScreenProps> = ({ onAuth }) => {
  const { t, language } = useLanguage();
  const [showAuth, setShowAuth] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState<UserCategory | ''>('');
  const [location, setLocation] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [currentFeature, setCurrentFeature] = useState(0);

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password && (isSignUp ? (name && category && location && birthYear) : true)) {
      onAuth({ 
        email, 
        name: name || email.split('@')[0],
        category: category as UserCategory || undefined,
        location: location || undefined,
        birthYear: birthYear ? parseInt(birthYear) : undefined
      });
    }
  };

  const handleSocialAuth = (provider: 'google' | 'apple') => {
    onAuth({ 
      email: `user@${provider}.com`, 
      name: `${provider} User` 
    });
  };

  const handleAdminAccess = () => {
    onAuth({ 
      email: 'admin@passaportevivo.com', 
      name: 'Admin',
      category: 'government',
      location: 'Brasília, DF',
      birthYear: 1980
    });
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 80 }, (_, i) => currentYear - 15 - i);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="absolute top-4 right-4 z-50">
        <LanguageToggle />
      </div>

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {!showAuth ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="min-h-screen flex flex-col"
            >
              {/* Hero Section */}
              <div className="flex-1 flex items-center justify-center px-4 py-16">
                <div className="max-w-6xl mx-auto text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-8"
                  >
                    <div className="flex items-center justify-center mb-6">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full p-6 shadow-2xl"
                      >
                        <Leaf className="w-16 h-16 text-white" />
                      </motion.div>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                      <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                        Passaporte
                      </span>
                      <br />
                      <span className="text-white">VIVO</span>
                    </h1>
                    
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="text-xl md:text-2xl text-emerald-100 mb-8 max-w-3xl mx-auto leading-relaxed"
                    >
                      {language === 'en' 
                        ? 'Every individual matters in the climate journey. Whether you\'re a student shaping tomorrow\'s policies, an employee driving workplace sustainability, a business owner implementing green practices, or a government administrator crafting environmental legislation — your actions create ripple effects that transform communities, institutions, and ultimately our planet. Map your unique climate impact and discover how your role contributes to Brazil\'s sustainable future.'
                        : 'Cada indivíduo importa na jornada climática. Seja você um estudante moldando as políticas de amanhã, um funcionário promovendo sustentabilidade no trabalho, um empresário implementando práticas verdes, ou um administrador público criando legislação ambiental — suas ações criam efeitos multiplicadores que transformam comunidades, instituições e, em última instância, nosso planeta. Mapeie seu impacto climático único e descubra como seu papel contribui para o futuro sustentável do Brasil.'
                      }
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowAuth(true)}
                        className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 flex items-center gap-3"
                      >
                        <Play className="w-6 h-6" />
                        {language === 'en' ? 'Start Your Journey' : 'Comece Sua Jornada'}
                        <ArrowRight className="w-6 h-6" />
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleAdminAccess}
                        className="bg-gray-800/50 backdrop-blur-sm text-white px-6 py-4 rounded-2xl font-medium border border-gray-700/50 hover:border-emerald-500/50 transition-all duration-300"
                      >
                        {language === 'en' ? 'Admin Access' : 'Acesso Admin'}
                      </motion.button>
                    </motion.div>
                  </motion.div>

                  {/* Scroll Indicator */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="mt-16"
                  >
                    <motion.div
                      animate={{ y: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="flex flex-col items-center text-emerald-300"
                    >
                      <span className="text-sm mb-2">
                        {language === 'en' ? 'Get Started' : 'Comece Agora'}
                      </span>
                      <ChevronDown className="w-6 h-6" />
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="auth"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="min-h-screen flex items-center justify-center px-4 py-8"
            >
              <div className="w-full max-w-md">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-8"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="flex items-center justify-center mb-6"
                  >
                    <div className="bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full p-4 shadow-2xl">
                      <Leaf className="w-12 h-12 text-white" />
                    </div>
                  </motion.div>
                  
                  <h1 className="text-3xl font-bold text-white mb-2">
                    {isSignUp 
                      ? (language === 'en' ? 'Join Passaporte VIVO' : 'Junte-se ao Passaporte VIVO')
                      : (language === 'en' ? 'Welcome Back' : 'Bem-vindo de Volta')
                    }
                  </h1>
                  <p className="text-emerald-100">
                    {isSignUp
                      ? (language === 'en' ? 'Start your climate action journey' : 'Comece sua jornada de ação climática')
                      : (language === 'en' ? 'Continue your climate journey' : 'Continue sua jornada climática')
                    }
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-emerald-500/20"
                >
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <AnimatePresence>
                      {isSignUp && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-4"
                        >
                          <div>
                            <label className="block text-sm font-medium text-emerald-300 mb-2">
                              {language === 'en' ? 'Full Name' : 'Nome Completo'}
                            </label>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-emerald-400" />
                              <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                                placeholder={language === 'en' ? 'Enter your full name' : 'Digite seu nome completo'}
                                required
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-emerald-300 mb-2">
                              {language === 'en' ? 'Your Role' : 'Seu Papel'}
                            </label>
                            <select
                              value={category}
                              onChange={(e) => setCategory(e.target.value as UserCategory)}
                              className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                              required
                            >
                              <option value="">{language === 'en' ? 'Select your role...' : 'Selecione seu papel...'}</option>
                              <option value="student">{t('category.student')}</option>
                              <option value="employee">{t('category.employee')}</option>
                              <option value="company_owner">{t('category.company_owner')}</option>
                              <option value="government">{t('category.government')}</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-emerald-300 mb-2">
                              {language === 'en' ? 'Location (City, State)' : 'Localização (Cidade, Estado)'}
                            </label>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-emerald-400" />
                              <input
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                                placeholder="e.g., São Paulo, SP"
                                required
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-emerald-300 mb-2">
                              {language === 'en' ? 'Birth Year' : 'Ano de Nascimento'}
                            </label>
                            <div className="relative">
                              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-emerald-400" />
                              <select
                                value={birthYear}
                                onChange={(e) => setBirthYear(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                                required
                              >
                                <option value="">{language === 'en' ? 'Select birth year...' : 'Selecione o ano...'}</option>
                                {years.map(year => (
                                  <option key={year} value={year}>{year}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    <div>
                      <label className="block text-sm font-medium text-emerald-300 mb-2">
                        {t('auth.email')}
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-emerald-400" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                          placeholder={language === 'en' ? 'Enter your email' : 'Digite seu e-mail'}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-emerald-300 mb-2">
                        {t('auth.password')}
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-emerald-400" />
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                          placeholder={language === 'en' ? 'Enter your password' : 'Digite sua senha'}
                          required
                        />
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
                    >
                      {isSignUp ? t('auth.signup') : t('auth.signin')}
                    </motion.button>
                  </form>

                  <div className="text-center my-6">
                    <span className="text-gray-400 text-sm">{t('auth.or')}</span>
                  </div>

                  <div className="space-y-3 mb-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSocialAuth('google')}
                      className="w-full bg-white/10 backdrop-blur-sm border border-gray-600/50 text-white py-3 rounded-xl font-medium hover:bg-white/20 transition-all duration-200 flex items-center justify-center gap-3"
                    >
                      <div className="w-5 h-5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
                      {t('auth.google')}
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSocialAuth('apple')}
                      className="w-full bg-black/50 backdrop-blur-sm border border-gray-600/50 text-white py-3 rounded-xl font-medium hover:bg-black/70 transition-all duration-200 flex items-center justify-center gap-3"
                    >
                      <div className="w-5 h-5 bg-white rounded-sm"></div>
                      {t('auth.apple')}
                    </motion.button>
                  </div>

                  <div className="text-center space-y-3">
                    <button
                      onClick={() => setIsSignUp(!isSignUp)}
                      className="text-emerald-400 text-sm hover:text-emerald-300 transition-colors"
                    >
                      {isSignUp 
                        ? (language === 'en' ? 'Already have an account? Sign in' : 'Já tem uma conta? Entre')
                        : (language === 'en' ? 'Need an account? Sign up' : 'Precisa de uma conta? Cadastre-se')
                      }
                    </button>
                    
                    <div className="pt-4 border-t border-gray-700/50">
                      <button
                        onClick={() => setShowAuth(false)}
                        className="text-xs text-gray-500 hover:text-gray-400 transition-colors"
                      >
                        ← {language === 'en' ? 'Back to home' : 'Voltar ao início'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            className="absolute w-2 h-2 bg-emerald-400/30 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
};