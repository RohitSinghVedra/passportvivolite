import React from 'react';
import { Award, Share2, Download, QrCode, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { LanguageToggle } from '../LanguageToggle';
import type { UserCategory } from '../../types';

interface CertificateScreenProps {
  userName: string;
  category: UserCategory;
  score: number;
  level: string;
  badge: string;
  onViewProfile: () => void;
}

export const CertificateScreen: React.FC<CertificateScreenProps> = ({
  userName,
  category,
  score,
  level,
  badge,
  onViewProfile
}) => {
  const { t, language } = useLanguage();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: t('certificate.title'),
        text: `${userName} completed their climate assessment with Passaporte VIVO!`,
        url: window.location.href
      }).catch(() => {
        // Fallback if share fails or is denied
        const text = `${userName} completed their climate assessment with Passaporte VIVO!`;
        const url = window.location.href;
        const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        window.open(shareUrl, '_blank');
      });
    } else {
      // Fallback for browsers without Web Share API
      const text = `${userName} completed their climate assessment with Passaporte VIVO!`;
      const url = window.location.href;
      const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
      window.open(shareUrl, '_blank');
    }
  };

  const handleDownload = () => {
    // Create a canvas to generate certificate image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 600;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 800, 600);
    gradient.addColorStop(0, '#10B981');
    gradient.addColorStop(1, '#14B8A6');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 600);

    // Text
    ctx.fillStyle = 'white';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Climate Role Certificate', 400, 100);

    ctx.font = '32px Arial';
    ctx.fillText(userName, 400, 200);

    ctx.font = '24px Arial';
    ctx.fillText(`${badge} ${t(`level.${level}`)}`, 400, 250);

    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}/50`, 400, 300);

    const link = document.createElement('a');
    link.download = 'climate-certificate.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const generateQRCode = () => {
    // Simplified QR code representation
    return `https://passaporte-vivo.com/verify/${Math.random().toString(36).substr(2, 9)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {t('certificate.title')}
          </h1>
        </div>

        {/* Certificate */}
        <div className="bg-white rounded-2xl p-8 shadow-2xl mb-8 transform rotate-1 hover:rotate-0 transition-transform">
          <div className="text-center">
            <div className="text-6xl mb-4">{badge}</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {t('certificate.title')}
            </h2>
            <div className="w-24 h-1 bg-emerald-500 mx-auto mb-6"></div>
            
            <p className="text-lg text-gray-600 mb-4">
              This certifies that
            </p>
            <h3 className="text-3xl font-bold text-emerald-600 mb-4">
              {userName}
            </h3>
            <p className="text-lg text-gray-600 mb-2">
              has completed the climate assessment as a
            </p>
            <p className="text-xl font-semibold text-gray-800 mb-6">
              {t(`category.${category}`)}
            </p>
            
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">{score}/50</div>
                <div className="text-sm text-gray-600">Score</div>
              </div>
              <div className="w-px h-12 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-800">
                  {t(`level.${level}`)}
                </div>
                <div className="text-sm text-gray-600">Level</div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-4">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              {t('certificate.verified')}
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
              <QrCode className="w-4 h-4" />
              QR: {generateQRCode().slice(-9)}
            </div>

            <div className="text-xs text-gray-400 mt-4">
              {t('certificate.issued')}: {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-4">
          <button
            onClick={handleShare}
            className="flex-1 bg-emerald-600 text-white py-4 rounded-xl font-medium hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
          >
            <Share2 className="w-5 h-5" />
            {t('share')}
          </button>
          
          <button
            onClick={handleDownload}
            className="flex-1 bg-white border border-emerald-600 text-emerald-600 py-4 rounded-xl font-medium hover:bg-emerald-50 transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            {t('download')}
          </button>
        </div>
        
        <div className="text-center">
          <button
            onClick={onViewProfile}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-all"
          >
            View My Profile
          </button>
        </div>
      </div>
    </div>
  );
};