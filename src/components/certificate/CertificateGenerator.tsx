import React, { useRef } from 'react';
import { Award, Share2, Download, QrCode } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import type { User, SurveyResponse } from '../../types';
import { Ag3roLogo } from '../logos/3AgroLogo';
import { VedraLabsLogo } from '../logos/VedraLabsLogo';

interface CertificateGeneratorProps {
  user: User;
  score: number;
  level: string;
  badge: string;
  certificateCode: string;
  completedAt: Date;
  onDownload: () => void;
  onShare: () => void;
}

export const CertificateGenerator: React.FC<CertificateGeneratorProps> = ({
  user,
  score,
  level,
  badge,
  certificateCode,
  completedAt,
  onDownload,
  onShare
}) => {
  const { t, language } = useLanguage();
  const certificateRef = useRef<HTMLDivElement>(null);

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

  const generateQRCode = (text: string) => {
    // Simple QR code generation using a service
    return `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(text)}`;
  };

  const handleDownload = () => {
    if (certificateRef.current) {
      // Use html2canvas to capture the certificate
      import('html2canvas').then((html2canvas) => {
        html2canvas.default(certificateRef.current!, {
          backgroundColor: '#ffffff',
          scale: 2,
          useCORS: true
        }).then((canvas) => {
          const link = document.createElement('a');
          link.download = `certificate-${certificateCode}.png`;
          link.href = canvas.toDataURL();
          link.click();
        }).catch((error) => {
          console.error('Error generating certificate:', error);
          // Fallback: just trigger the callback
          onDownload();
        });
      }).catch((error) => {
        console.error('Error loading html2canvas:', error);
        // Fallback: just trigger the callback
        onDownload();
      });
    } else {
      onDownload();
    }
  };

  const handleShare = () => {
    const shareData = {
      title: 'Passaporte VIVO Certificate',
      text: `I achieved ${level} level in climate action! Check out my certificate:`,
      url: `${window.location.origin}/certificate/${certificateCode}`
    };

    if (navigator.share) {
      navigator.share(shareData);
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareData.url);
      alert('Certificate link copied to clipboard!');
    }
    onShare();
  };

  return (
    <div className="space-y-6">
      {/* Certificate Preview */}
      <div 
        ref={certificateRef}
        className="bg-gradient-to-br from-emerald-50 to-teal-50 border-8 border-emerald-200 rounded-3xl p-8 max-w-2xl mx-auto"
        style={{ aspectRatio: '1.414' }} // A4 ratio
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🌱</div>
          <h1 className="text-3xl font-bold text-emerald-800 mb-2">
            Passaporte VIVO
          </h1>
          <p className="text-emerald-600 font-medium">
            Climate Action Certificate
          </p>
        </div>

        {/* Main Content */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{getBadgeEmoji(level)}</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {t(`level.${level}`)}
          </h2>
          <p className="text-gray-600 mb-4">
            This certificate is awarded to
          </p>
          <p className="text-xl font-bold text-emerald-700 mb-4">
            {user.name}
          </p>
          <p className="text-gray-600 mb-4">
            for completing the Climate Action Assessment
          </p>
          <div className="flex justify-center items-center gap-4 mb-4">
            <span className="text-lg font-semibold text-emerald-600">
              Score: {score}
            </span>
          </div>
        </div>

                 {/* Footer */}
         <div className="flex justify-between items-end">
           <div className="text-sm text-gray-500">
             <p>Issued: {formatDate(completedAt)}</p>
             <p>Code: {certificateCode}</p>
           </div>
           <div className="text-right">
             <img 
               src={generateQRCode(`${window.location.origin}/certificate/${certificateCode}`)}
               alt="QR Code"
               className="w-16 h-16"
             />
             <p className="text-xs text-gray-500 mt-1">Scan to verify</p>
           </div>
         </div>

         {/* Company Logos */}
                         <div className="flex justify-between items-center mt-8 pt-4 border-t border-emerald-200">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <img 
                        src="/logos/3agro-logo.png" 
                        alt="3Agro" 
                        className="h-6 w-auto"
                        onError={(e) => {
                          // Fallback to SVG if PNG fails
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.nextElementSibling!.style.display = 'block';
                        }}
                      />
                      <div style={{ display: 'none' }}>
                        <Ag3roLogo className="h-6 w-auto" />
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">Product Owner</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <img 
                        src="/logos/vedra-labs-logo.png" 
                        alt="Vedra Labs" 
                        className="h-6 w-auto"
                        onError={(e) => {
                          // Fallback to SVG if PNG fails
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.nextElementSibling!.style.display = 'block';
                        }}
                      />
                      <div style={{ display: 'none' }}>
                        <VedraLabsLogo className="h-6 w-auto" />
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">Developed by</p>
                  </div>
                </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all"
        >
          <Download className="w-5 h-5" />
          {t('results.download_certificate')}
        </button>
        
        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all"
        >
          <Share2 className="w-5 h-5" />
          {t('results.share_certificate')}
        </button>
      </div>

      {/* Certificate Code Display */}
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-2">
          {t('results.certificate_code')}: <span className="font-mono font-bold">{certificateCode}</span>
        </p>
        <p className="text-xs text-gray-500">
          Use this code to verify your certificate
        </p>
      </div>
    </div>
  );
};
