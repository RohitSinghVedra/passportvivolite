import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';

interface CertificateData {
  user: {
    name: string;
    category: string;
    city: string;
    state: string;
    ageRange: string;
  };
  score: number;
  level: string;
  badge: string;
  grade: string;
  percentage: number;
  completedAt: Date;
  certificateCode: string;
}

interface CertificateGeneratorProps {
  certificate: CertificateData;
  language: 'en' | 'pt';
}

export const CertificateGenerator: React.FC<CertificateGeneratorProps> = ({ certificate, language }) => {
  const { t } = useLanguage();

  const getBadgeEmoji = (level: string) => {
    const badges = {
      champion: '🏆',
      leader: '🌟',
      active: '⚡',
      aware: '🌱',
      beginner: '🌿'
    };
    return badges[level as keyof typeof badges];
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(language === 'en' ? 'en-US' : 'pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const getCategoryLabel = (category: string) => {
    if (language === 'pt') {
      const categories = {
        company_owner: 'Proprietário de Empresa',
        student: 'Estudante',
        government: 'Funcionário Público',
        individual: 'Individual',
        professional: 'Profissional'
      };
      return categories[category as keyof typeof categories] || 'Individual';
    } else {
      const categories = {
        company_owner: 'Company Owner',
        student: 'Student',
        government: 'Government Official',
        individual: 'Individual',
        professional: 'Professional'
      };
      return categories[category as keyof typeof categories] || 'Individual';
    }
  };

  const getCertificateText = () => {
    if (language === 'pt') {
      return {
        title: 'Certificado de Ação Climática',
        subtitle: 'Passaporte VIVO',
        awardedTo: 'Este certificado é concedido a',
        forCompleting: 'por completar a Avaliação de Ação Climática',
        score: 'Pontuação',
        issued: 'Emitido',
        code: 'Código',
        verified: 'Verificado',
        scanToVerify: 'Escanear para verificar'
      };
    } else {
      return {
        title: 'Climate Action Certificate',
        subtitle: 'Passaporte VIVO',
        awardedTo: 'This certificate is awarded to',
        forCompleting: 'for completing the Climate Action Assessment',
        score: 'Score',
        issued: 'Issued',
        code: 'Code',
        verified: 'Verified',
        scanToVerify: 'Scan to verify'
      };
    }
  };

  const text = getCertificateText();

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-8 border-emerald-200 rounded-3xl p-8 max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-4xl mb-2">🌱</div>
        <h1 className="text-3xl font-bold text-emerald-800 mb-2">
          {text.subtitle}
        </h1>
        <p className="text-emerald-600 font-medium">
          {text.title}
        </p>
      </div>

      {/* Main Content */}
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">{getBadgeEmoji(certificate.level)}</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {t(`level.${certificate.level}`)}
        </h2>
        <p className="text-gray-600 mb-4">
          {text.awardedTo}
        </p>
        <p className="text-xl font-bold text-emerald-700 mb-2">
          {certificate.user.name}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          {getCategoryLabel(certificate.user.category)}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          {certificate.user.city}, {certificate.user.state} • {language === 'pt' ? 'Idade' : 'Age'}: {certificate.user.ageRange}
        </p>
        <p className="text-gray-600 mb-4">
          {text.forCompleting}
        </p>
        <div className="flex justify-center items-center gap-4 mb-4">
          <span className="text-lg font-semibold text-emerald-600">
            {text.score}: {certificate.score}/50
          </span>
        </div>
      </div>

             {/* Footer */}
       <div className="flex justify-between items-end">
         <div className="text-sm text-gray-500">
           <p>{text.issued}: {formatDate(certificate.completedAt)}</p>
           <p>{text.code}: {certificate.certificateCode}</p>
         </div>
         <div className="text-right">
           <img 
             src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(`${window.location.origin}/certificate/${certificate.certificateCode}`)}`}
             alt="QR Code"
             className="w-16 h-16"
           />
           <p className="text-xs text-gray-500 mt-1">{text.scanToVerify}</p>
         </div>
       </div>

      {/* Company Logos */}
      <div className="flex justify-between items-center mt-8 pt-4 border-t border-emerald-200 bg-gray-900 p-4 rounded-lg">
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <img 
              src="/logos/3agro-logo.png" 
              alt="3Agro" 
              className="h-8 w-auto"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling!.style.display = 'block';
              }}
            />
            <div className="text-lg font-bold text-emerald-400" style={{ display: 'none' }}>
              3agro
            </div>
          </div>
          <p className="text-xs text-gray-400 font-medium">
            {language === 'pt' ? 'Proprietário do Produto' : 'Product Owner'}
          </p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <img 
              src="/logos/vedra-labs-logo.png" 
              alt="Vedra Labs" 
              className="h-8 w-auto"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling!.style.display = 'block';
              }}
            />
            <div className="text-sm font-semibold text-blue-400" style={{ display: 'none' }}>
              Vedra Labs
            </div>
          </div>
          <p className="text-xs text-gray-400 font-medium">
            {language === 'pt' ? 'Desenvolvido por' : 'Developed by'}
          </p>
        </div>
      </div>
    </div>
  );
};
