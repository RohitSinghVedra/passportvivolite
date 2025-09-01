import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-gray-900 text-white py-8 mt-auto lg:block hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left side - App info */}
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h3 className="text-lg font-semibold text-emerald-400 mb-2">
              Passaporte VIVO
            </h3>
            <p className="text-gray-400 text-sm">
              {language === 'en' 
                ? 'Your Climate Action Journey' 
                : 'Sua Jornada de Ação Climática'
              }
            </p>
          </div>

          {/* Center - Copyright */}
          <div className="text-center mb-4 md:mb-0">
            <p className="text-gray-400 text-sm">
              © 2025 3agro. {language === 'en' ? 'All rights reserved.' : 'Todos os direitos reservados.'}
            </p>
          </div>

                            {/* Right side - Logos */}
                  <div className="flex items-center gap-6">
                    {/* 3agro Logo */}
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <img 
                          src="/logos/3agro-logo.png" 
                          alt="3Agro" 
                          className="h-8 w-auto"
                          onError={(e) => {
                            // Fallback to text if PNG fails
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.nextElementSibling!.style.display = 'block';
                          }}
                        />
                        <div className="text-2xl font-bold text-emerald-400" style={{ display: 'none' }}>
                          3agro
                        </div>
                      </div>
                      <p className="text-xs text-gray-400">
                        {language === 'en' ? 'Product Owner' : 'Proprietário do Produto'}
                      </p>
                    </div>

                    {/* Separator */}
                    <div className="w-px h-8 bg-gray-600"></div>

                    {/* Vedra Labs Logo */}
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <img 
                          src="/logos/vedra-labs-logo.png" 
                          alt="Vedra Labs" 
                          className="h-8 w-auto"
                          onError={(e) => {
                            // Fallback to text if PNG fails
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.nextElementSibling!.style.display = 'block';
                          }}
                        />
                        <div className="text-lg font-semibold text-blue-400" style={{ display: 'none' }}>
                          Vedra Labs
                        </div>
                      </div>
                      <p className="text-xs text-gray-400">
                        {language === 'en' ? 'Developed by' : 'Desenvolvido por'}
                      </p>
                    </div>
                  </div>
        </div>
      </div>
    </footer>
  );
};
