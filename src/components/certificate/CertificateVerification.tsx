import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
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

export const CertificateVerification: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const { t, language } = useLanguage();
  const [certificate, setCertificate] = useState<CertificateData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      if (!code) {
        setError('Invalid certificate code');
        setLoading(false);
        return;
      }

      try {
        // Import Firebase functions dynamically
        const { collection, query, where, getDocs } = await import('firebase/firestore');
        const { db } = await import('../../config/firebase');
        
        // Fetch certificate from database
        const certificatesRef = collection(db, 'certificates');
        const q = query(certificatesRef, where('certificateCode', '==', code));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const certDoc = querySnapshot.docs[0];
          const certData = certDoc.data();
          
          // Check if certificate is public or if user has access
          // For now, allow all certificates to be viewed (we can add owner check later)
          // if (certData.visibility === 'private') {
          //   setError('This certificate is private and cannot be viewed');
          //   setLoading(false);
          //   return;
          // }
          
          const certificate: CertificateData = {
            user: {
              name: certData.userName || "Unknown",
              category: certData.category || "individual",
              city: certData.city || "Unknown",
              state: certData.state || "Unknown",
              ageRange: certData.ageRange || "Unknown"
            },
            score: certData.score || 0,
            level: certData.level || "beginner",
            badge: certData.badge || "🌿",
            grade: certData.grade || "F",
            percentage: certData.percentage || 0,
            completedAt: certData.completedAt?.toDate() || new Date(),
            certificateCode: code
          };
          
          setCertificate(certificate);
        } else {
          setError('Certificate not found');
        }
      } catch (error) {
        console.error('Error fetching certificate:', error);
        setError('Error loading certificate');
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [code]);

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
    return `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(text)}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying certificate...</p>
        </div>
      </div>
    );
  }

  if (error || !certificate) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Certificate Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The certificate with code "{code}" could not be found or has been invalidated.
          </p>
          <Link 
            to="/"
            className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Certificate Verification
          </h1>
          <p className="text-gray-600">
            This certificate has been verified and is authentic
          </p>
        </div>

        {/* Certificate Display */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-8 border-emerald-200 rounded-3xl p-8 max-w-2xl mx-auto mb-8">
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
            <div className="text-6xl mb-4">{getBadgeEmoji(certificate.level)}</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {t(`level.${certificate.level}`)}
            </h2>
            <p className="text-gray-600 mb-4">
              This certificate is awarded to
            </p>
            <p className="text-xl font-bold text-emerald-700 mb-2">
              {certificate.user.name}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              {certificate.user.category === 'company_owner' ? 'Company Owner' : 
               certificate.user.category === 'student' ? 'Student' : 
               certificate.user.category === 'government' ? 'Government Official' : 
               certificate.user.category === 'individual' ? 'Individual' : 'Professional'}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              {certificate.user.city}, {certificate.user.state} • Age: {certificate.user.ageRange}
            </p>
            <p className="text-gray-600 mb-4">
              for completing the Climate Action Assessment
            </p>
            <div className="flex justify-center items-center gap-4 mb-4">
              <span className="text-lg font-semibold text-emerald-600">
                Score: {certificate.score}
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-end">
            <div className="text-sm text-gray-500">
              <p>Issued: {formatDate(certificate.completedAt)}</p>
              <p>Code: {certificate.certificateCode}</p>
            </div>
            <div className="text-right">
              <img 
                src={generateQRCode(`${window.location.origin}/certificate/${certificate.certificateCode}`)}
                alt="QR Code"
                className="w-16 h-16"
              />
              <p className="text-xs text-gray-500 mt-1">Scan to verify</p>
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
              <p className="text-xs text-gray-400 font-medium">Product Owner</p>
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
              <p className="text-xs text-gray-400 font-medium">Developed by</p>
            </div>
          </div>
        </div>

        {/* Verification Status */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full mb-4">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="font-medium">Certificate Verified</span>
          </div>
          <p className="text-sm text-gray-600">
            This certificate was issued on {formatDate(certificate.completedAt)} and is valid.
          </p>
        </div>
      </div>
    </div>
  );
};
