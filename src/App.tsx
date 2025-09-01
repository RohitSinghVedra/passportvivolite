import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageProvider } from './components/LanguageProvider';
import { doc, setDoc } from 'firebase/firestore';
import { db } from './config/firebase';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AuthScreen } from './components/auth/AuthScreen';
import { ProfileCompletionScreen } from './components/auth/ProfileCompletionScreen';
import { SurveyScreen } from './components/survey/SurveyScreen';
import { ResultsScreen } from './components/results/ResultsScreen';
import { UserDashboard } from './pages/UserDashboard';
import { UserCertificates } from './pages/UserCertificates';
import { UserHistory } from './pages/UserHistory';
import { UserSettings } from './pages/UserSettings';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminUsersPage } from './pages/AdminUsersPage';
import { AdminUserDetail } from './pages/AdminUserDetail';
import { AdminCertificates } from './pages/AdminCertificates';
import { AdminAnalytics } from './pages/AdminAnalytics';
import { AdminSettings } from './pages/AdminSettings';
import { Layout } from './components/layout/Layout';
import { initializeDatabase } from './utils/databaseSetup';
import { CertificateVerification } from './components/certificate/CertificateVerification';
import type { SurveyResponse } from './types';

function App() {
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [surveyScore, setSurveyScore] = useState<number>(0);

  return (
    <AuthProvider>
      <LanguageProvider>
        <Router>
          <AppContentWithRouter 
            responses={responses}
            setResponses={setResponses}
            surveyScore={surveyScore}
            setSurveyScore={setSurveyScore}
          />
        </Router>
      </LanguageProvider>
    </AuthProvider>
  );
}

function AppContentWithRouter({ 
  responses, 
  setResponses, 
  surveyScore, 
  setSurveyScore 
}: { 
  responses: SurveyResponse[];
  setResponses: (responses: SurveyResponse[]) => void;
  surveyScore: number;
  setSurveyScore: (score: number) => void;
}) {
  const navigate = useNavigate();
  
  const handleSurveyComplete = (surveyResponses: SurveyResponse[], score: number) => {
    console.log('Survey completed with score:', score);
    setResponses(surveyResponses);
    setSurveyScore(score);
    // Navigate to results page
    navigate('/results');
  };

  const handleRetakeSurvey = () => {
    setResponses([]);
    setSurveyScore(0);
  };

  const { currentUser, loading, logout, getSurveyQuestions, saveSurveyQuestions } = useAuth();
  
  // Initialize database when app starts (non-blocking)
  useEffect(() => {
    const initDB = async () => {
      try {
        console.log('Starting database initialization...');
        try {
          // Initialize database with questions
          await initializeDatabase(getSurveyQuestions, saveSurveyQuestions);
          console.log('Database initialized successfully');
        } catch (error) {
          console.error('Database initialization failed:', error);
          console.log('App will continue without database initialization');
        }
      } catch (error) {
        console.error('Error initializing database:', error);
        // App continues to work with local questions
      }
    };
    
    // Run initialization in background, don't block app startup
    initDB();
  }, [getSurveyQuestions, saveSurveyQuestions]);
  
  console.log('AppContent render:', { 
    currentUser: currentUser ? 'exists' : 'null', 
    loading, 
    userData: currentUser 
  });

  // Protected Route Component
  const ProtectedRoute: React.FC<{ children: React.ReactNode; adminOnly?: boolean }> = ({ 
    children, 
    adminOnly = false 
  }) => {
    if (loading) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 flex items-center justify-center">
          <div className="text-white text-lg">Loading...</div>
        </div>
      );
    }
    
    if (!currentUser) {
      return <Navigate to="/auth" replace />;
    }
    
    if (adminOnly && currentUser.role !== 'admin') {
      return <Navigate to="/me" replace />;
    }
    
    return <>{children}</>;
  };

  console.log('Routing logic:', { 
    hasUser: !!currentUser, 
    completedOnboarding: currentUser?.completedOnboarding, 
    signUpMethod: currentUser?.signUpMethod 
  });

  if (!currentUser) {
    console.log('No user - showing AuthScreen');
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900">
        <AuthScreen />
      </div>
    );
  }

  // Show profile completion screen only for Google users who haven't completed onboarding
  if (currentUser && !currentUser.completedOnboarding && currentUser.signUpMethod === 'google') {
    console.log('Google user needs profile completion - showing ProfileCompletionScreen');
    return (
      <ProfileCompletionScreen />
    );
  }

  console.log('User authenticated and onboarded - showing main app');

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/auth" element={<AuthScreen />} />
      
      {/* Survey Flow */}
      <Route path="/survey" element={
        <Layout>
          <SurveyScreen onComplete={handleSurveyComplete} />
        </Layout>
      } />
      
      <Route path="/results" element={
        <Layout>
          <ResultsScreen 
            category={currentUser!.category}
            responses={responses}
            onGenerateCertificate={() => {}}
          />
        </Layout>
      } />

      {/* User Dashboard Routes */}
      <Route path="/me" element={
        <ProtectedRoute>
          <Layout>
            <UserDashboard user={currentUser!} />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/me/certificates" element={
        <ProtectedRoute>
          <Layout>
            <UserCertificates user={currentUser!} />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/me/history" element={
        <ProtectedRoute>
          <Layout>
            <UserHistory user={currentUser!} onRetakeSurvey={handleRetakeSurvey} />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/me/settings" element={
        <ProtectedRoute>
          <Layout>
            <UserSettings 
              user={currentUser!} 
              onUpdateUser={(updates) => {
                // Handle user updates
                console.log('User updates:', updates);
              }}
              onDeleteAccount={() => {
                // Handle account deletion
                console.log('Account deletion requested');
              }}
            />
          </Layout>
        </ProtectedRoute>
      } />

      {/* Admin Routes */}
      <Route path="/admin" element={
        <ProtectedRoute adminOnly>
          <Layout>
            <AdminDashboard />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/admin/users" element={
        <ProtectedRoute adminOnly>
          <Layout>
            <AdminUsersPage />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/admin/users/:id" element={
        <ProtectedRoute adminOnly>
          <Layout>
            <AdminUserDetail />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/admin/certificates" element={
        <ProtectedRoute adminOnly>
          <Layout>
            <AdminCertificates />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/admin/analytics" element={
        <ProtectedRoute adminOnly>
          <Layout>
            <AdminAnalytics />
          </Layout>
        </ProtectedRoute>
      } />
      
      <Route path="/admin/settings" element={
        <ProtectedRoute adminOnly>
          <Layout>
            <AdminSettings />
          </Layout>
        </ProtectedRoute>
      } />

      {/* Certificate Verification Route (Public) - Must be before catch-all routes */}
      <Route path="/certificate/:code" element={<CertificateVerification />} />

      {/* Default Routes - Only redirect if not a certificate route */}
      <Route path="/" element={<Navigate to="/me" replace />} />
      <Route path="*" element={<Navigate to="/me" replace />} />
    </Routes>
  );
}

export default App;