import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { CertificateGenerator } from './CertificateGenerator';

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
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'pt'>(language);

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
          
          const certificate: CertificateData = {
            user: {
              name: certData.userName || certData.user?.name || "Unknown",
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

    // Start fetching immediately
    fetchCertificate();
  }, [code]);

  const generateQRCode = (text: string) => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(text)}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🌱</div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Verifying certificate...</p>
          <p className="text-sm text-gray-500 mt-2">Please wait while we load your certificate</p>
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
          <p className="text-gray-600 mb-4">
            This certificate has been verified and is authentic
          </p>
          
          {/* Language Toggle */}
          <div className="flex justify-center gap-2 mb-6">
            <button
              onClick={() => setSelectedLanguage('en')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedLanguage === 'en' 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setSelectedLanguage('pt')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedLanguage === 'pt' 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Português
            </button>
          </div>
        </div>

        {/* Certificate Display */}
        <div className="mb-8">
          <CertificateGenerator 
            certificate={certificate} 
            language={selectedLanguage} 
          />
        </div>

        {/* Verification Status */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full mb-4">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="font-medium">Certificate Verified</span>
          </div>
          <p className="text-sm text-gray-600">
            This certificate was issued on {new Intl.DateTimeFormat(selectedLanguage === 'en' ? 'en-US' : 'pt-BR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }).format(certificate.completedAt)} and is valid.
          </p>
        </div>
      </div>
    </div>
  );
};
