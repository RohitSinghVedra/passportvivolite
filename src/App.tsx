import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageProvider } from './components/LanguageProvider';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Layout } from './components/layout/Layout';
import { Breadcrumbs } from './components/layout/Breadcrumbs';
import { AuthScreen } from './components/auth/AuthScreen';
import { ProfileCompletionScreen } from './components/auth/ProfileCompletionScreen';
import { OnboardingScreen } from './components/onboarding/OnboardingScreen';
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
import { calculateLevel, getBadgeEmoji } from './utils/scoring';
import type { SurveyResponse } from './types';

function App() {
  const [responses, setResponses] = useState<SurveyResponse[]>([]);

  const handleSurveyComplete = (surveyResponses: SurveyResponse[], score: number) => {
    setResponses(surveyResponses);
    // Update user with survey results
    if (currentUser) {
      // This would typically update the user in the database
      console.log('Survey completed with score:', score);
    }
  };

  const handleRetakeSurvey = () => {
    setResponses([]);
  };

  return (
    <AuthProvider>
      <AppContent 
        responses={responses}
        onSurveyComplete={handleSurveyComplete}
        onRetakeSurvey={handleRetakeSurvey}
      />
    </AuthProvider>
  );
}

function AppContent({ 
  responses, 
  onSurveyComplete, 
  onRetakeSurvey 
}: { 
  responses: SurveyResponse[];
  onSurveyComplete: (responses: SurveyResponse[], score: number) => void;
  onRetakeSurvey: () => void;
}) {
  const { currentUser, loading, logout } = useAuth();
  
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
      <LanguageProvider>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900">
          <AuthScreen />
        </div>
      </LanguageProvider>
    );
  }

  // Show profile completion screen only for Google users who haven't completed onboarding
  if (currentUser && !currentUser.completedOnboarding && currentUser.signUpMethod === 'google') {
    console.log('Google user needs profile completion - showing ProfileCompletionScreen');
    return (
      <LanguageProvider>
        <ProfileCompletionScreen />
      </LanguageProvider>
    );
  }

  console.log('User authenticated and onboarded - showing main app');

  return (
    <LanguageProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/auth" element={<AuthScreen />} />
          
          {/* Survey Flow */}
          <Route path="/survey" element={
            <Layout>
              <SurveyScreen onComplete={onSurveyComplete} />
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
                <UserHistory user={currentUser!} onRetakeSurvey={onRetakeSurvey} />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/me/settings" element={
            <ProtectedRoute>
              <Layout>
                <UserSettings user={currentUser!} />
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

          {/* Default Routes */}
          <Route path="/" element={<Navigate to="/me" replace />} />
          <Route path="*" element={<Navigate to="/me" replace />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;