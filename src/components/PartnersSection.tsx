import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';

const PartnersSection: React.FC = () => {
  const { language } = useLanguage();

  const partners = [
    {
      name: 'VEDRA LABS',
      logo: '/logos/partnerlogos/11.png',
      description: { en: 'Technology Partner', pt: 'Parceiro Tecnológico' }
    },
    {
      name: 'FUNDAÇÃO MAIS CERRADO',
      logo: '/logos/partnerlogos/12.png',
      description: { en: 'Environmental Partner', pt: 'Parceiro Ambiental' }
    },
    {
      name: 'PARTNER 3',
      logo: '/logos/partnerlogos/13.png',
      description: { en: 'Strategic Partner', pt: 'Parceiro Estratégico' }
    },
    {
      name: 'INSTITUTO VEADEIROS',
      logo: '/logos/partnerlogos/14.png',
      description: { en: 'Research Partner', pt: 'Parceiro de Pesquisa' }
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.7 }}
      className="mt-16"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          {language === 'en' ? 'Our Partners' : 'Nossos Parceiros'}
        </h2>
        <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
          {language === 'en' 
            ? 'Collaborating with leading organizations to drive climate action in Brazil'
            : 'Colaborando com organizações líderes para impulsionar a ação climática no Brasil'
          }
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        {partners.map((partner, index) => (
          <motion.div
            key={partner.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 group"
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 p-4 bg-gray-700/30 rounded-lg group-hover:bg-emerald-500/20 transition-colors duration-300">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-12 w-auto max-w-full object-contain filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'block';
                  }}
                />
                <div 
                  className="text-sm font-semibold text-emerald-400" 
                  style={{ display: 'none' }}
                >
                  {partner.name}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Decorative elements */}
      <div className="flex justify-center mt-8">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </motion.div>
  );
};

export default PartnersSection;
