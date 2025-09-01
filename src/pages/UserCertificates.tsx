import React, { useState, useEffect } from 'react';
import { Award, Eye, Download, Share2, Globe, Lock, MoreVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { useAuth } from '../contexts/AuthContext';
import type { User, Certificate } from '../types';

interface UserCertificatesProps {
  user: User;
}

export const UserCertificates: React.FC<UserCertificatesProps> = ({ user }) => {
  const { t } = useLanguage();
  const { currentUser, getUserCertificates } = useAuth();
  const [certificates, setCertificates] = useState<any[]>([]);
  const [showMenu, setShowMenu] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Load real certificates from database
  useEffect(() => {
    const loadCertificates = async () => {
      if (currentUser) {
        try {
          const userCerts = await getUserCertificates(currentUser.id);
          // Filter out any certificates with invalid data and ensure all dates are valid
          const validCertificates = userCerts.filter(cert => {
            // Ensure all required fields exist and dates are valid
            return cert && 
                   cert.id && 
                   cert.certificateCode && 
                   cert.completedAt && 
                   (cert.completedAt instanceof Date || !isNaN(new Date(cert.completedAt).getTime()));
          }).map(cert => ({
            ...cert,
            // Ensure completedAt is always a valid Date object
            completedAt: cert.completedAt instanceof Date ? cert.completedAt : new Date(cert.completedAt),
            // Ensure createdAt is always a valid Date object
            createdAt: cert.createdAt instanceof Date ? cert.createdAt : new Date(cert.createdAt || Date.now())
          }));
          setCertificates(validCertificates);
        } catch (error) {
          console.error('Error loading certificates:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    
    loadCertificates();
  }, [currentUser, getUserCertificates]);

  const toggleVisibility = (certId: string) => {
    setCertificates(prev => prev.map(cert => 
      cert.id === certId 
        ? { ...cert, visibility: cert.visibility === 'public' ? 'private' : 'public' }
        : cert
    ));
    setShowMenu(null);
  };

  const handleView = (cert: any) => {
    // Open certificate in new tab with the same styling as generated certificate
    const certificateUrl = `${window.location.origin}/certificate/${cert.certificateCode}`;
    window.open(certificateUrl, '_blank');
  };

  const handleDownload = (cert: any) => {
    // Create certificate image with same styling as generated certificate
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 1200;
    canvas.height = 800;

    // Create gradient background (same as generated certificate)
    const gradient = ctx.createLinearGradient(0, 0, 1200, 800);
    gradient.addColorStop(0, '#0f2a19');
    gradient.addColorStop(1, '#081a10');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1200, 800);

    // Add certificate content
    ctx.fillStyle = '#e6fff0';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Climate Role Certificate', 600, 100);

    ctx.font = '32px Arial';
    ctx.fillText(cert.userName, 600, 180);

    ctx.font = '24px Arial';
    ctx.fillText(`${cert.badge} ${t(`level.${cert.level}`)}`, 600, 230);

    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${cert.score}/50`, 600, 280);

    ctx.font = '16px Arial';
    ctx.fillText(`Code: ${cert.certificateCode}`, 600, 330);

    ctx.font = '14px Arial';
    ctx.fillText(`Issued: ${cert.completedAt instanceof Date ? cert.completedAt.toLocaleDateString() : new Date(cert.completedAt).toLocaleDateString()}`, 600, 360);

    // Add logos (placeholder for now)
    ctx.fillStyle = '#00c853';
    ctx.font = '12px Arial';
    ctx.fillText('Passaporte VIVO', 600, 750);

    const link = document.createElement('a');
    link.download = `passaporte-vivo-${cert.certificateCode}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const handleShare = (cert: any) => {
    const text = `Check out my climate certificate from Passaporte VIVO! ${cert.badge} ${t(`level.${cert.level}`)} - Code: ${cert.certificateCode}`;
    const shareUrl = `${window.location.origin}/certificate/${cert.certificateCode}`;
    
    if (navigator.share) {
      navigator.share({
        title: t('certificate.title'),
        text,
        url: shareUrl
      }).catch(() => {
        // Fallback to copying link
        navigator.clipboard.writeText(shareUrl).then(() => {
          alert('Certificate link copied to clipboard!');
        });
      });
    } else {
      // Fallback to copying link
      navigator.clipboard.writeText(shareUrl).then(() => {
        alert('Certificate link copied to clipboard!');
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">
          {t('nav.certificates')}
        </h1>
        <div className="text-sm text-gray-400">
          {certificates.length} {certificates.length === 1 ? 'certificate' : 'certificates'}
        </div>
      </div>

      {loading ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/30 rounded-xl p-12 border border-gray-700/50 text-center"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading certificates...</p>
        </motion.div>
      ) : certificates.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/30 rounded-xl p-12 border border-gray-700/50 text-center"
        >
          <Award className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-300 mb-2">
            {t('certificates.empty_title')}
          </h3>
          <p className="text-gray-500 mb-6">
            {t('certificates.empty_desc')}
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-medium transition-colors">
              {t('dashboard.start_assessment')}
            </button>
          </motion.div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/20 hover:border-emerald-400/40 transition-all duration-200 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{cert.badge}</span>
                  <div>
                    <div className="font-semibold text-white">{cert.certificateCode}</div>
                    <div className="text-sm text-gray-400">
                      {cert.completedAt instanceof Date ? cert.completedAt.toLocaleDateString() : new Date(cert.completedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <button
                    onClick={() => setShowMenu(showMenu === cert.id ? null : cert.id)}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                  
                  <AnimatePresence>
                    {showMenu === cert.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl border border-gray-700 py-2 z-10"
                      >
                        <button
                          onClick={() => toggleVisibility(cert.id)}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors w-full text-left"
                        >
                          {cert.visibility === 'public' ? <Lock className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
                          {cert.visibility === 'public' ? t('certificate.make_private') : t('certificate.make_public')}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-lg font-semibold text-white mb-1">
                  {t(`level.${cert.level}`)}
                </div>
                <div className="text-emerald-400 font-medium">
                  Score: {cert.score}/50
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  cert.visibility === 'public' 
                    ? 'bg-emerald-500/20 text-emerald-400' 
                    : 'bg-gray-500/20 text-gray-400'
                }`}>
                  {cert.visibility === 'public' ? (
                    <div className="flex items-center gap-1">
                      <Globe className="w-3 h-3" />
                      {t('certificate.public')}
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      {t('certificate.private')}
                    </div>
                  )}
                </span>
              </div>

              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleView(cert)}
                  className="flex-1 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  {t('certificate.view')}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDownload(cert)}
                  className="flex-1 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  {t('download')}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleShare(cert)}
                  className="flex-1 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  {t('share')}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};