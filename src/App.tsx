import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageProvider } from './components/LanguageProvider';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';
import { Breadcrumbs } from './components/layout/Breadcrumbs';
import { AuthScreen } from './components/auth/AuthScreen';
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
import { mockUsers } from './data/mockData';
import type { User, UserCategory, SurveyResponse } from './types';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [responses, setResponses] = useState<SurveyResponse[]>([]);

  const handleAuth = (authData: { 
    email: string; 
    name: string; 
    category?: UserCategory;
    state?: string;
    city?: string;
    ageRange?: string;
  }) => {
    // Check if user exists in mock data
    const existingUser = mockUsers.find(u => u.email === authData.email);
    
    if (existingUser) {
      setUser(existingUser);
    } else {
      // Create new user
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email: authData.email,
        name: authData.name,
        category: authData.category || 'student',
        state: authData.state || 'SP',
        city: authData.city || 'São Paulo',
        ageRange: authData.ageRange || '18-25',
        language: 'pt',
        completedOnboarding: true,
        surveyCompleted: false,
        createdAt: new Date(),
        lastActivity: new Date(),
        certificateVisibility: 'private',
        role: authData.email === 'admin@passaportevivo.com' ? 'admin' : 'user'
      };
      setUser(newUser);
    }
  };

  const handleSurveyComplete = (surveyResponses: SurveyResponse[]) => {
    setResponses(surveyResponses);
    
    const totalScore = surveyResponses.reduce((sum, response) => sum + response.points, 0);
    const level = calculateLevel(surveyResponses);
    const badge = getBadgeEmoji(level);

    setUser(prev => prev ? {
      ...prev,
      surveyCompleted: true,
      score: totalScore,
      level,
      badge,
      lastActivity: new Date()
    } : null);
  };

  const handleLogout = () => {
    setUser(null);
    setResponses([]);
  };

  const handleRetakeSurvey = () => {
    setResponses([]);
    setUser(prev => prev ? {
      ...prev,
      surveyCompleted: false,
      score: undefined,
      level: undefined,
      badge: undefined
    } : null);
  };

  const handleUpdateUser = (updates: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...updates } : null);
  };

  const handleDeleteAccount = () => {
    setUser(null);
    setResponses([]);
  };

  // Protected Route Component
  const ProtectedRoute: React.FC<{ children: React.ReactNode; adminOnly?: boolean }> = ({ 
    children, 
    adminOnly = false 
  }) => {
    if (!user) {
      return <Navigate to="/auth" replace />;
    }
    
    if (adminOnly && user.role !== 'admin') {
      return <Navigate to="/me" replace />;
    }
    
    return <>{children}</>;
  };

  // Layout Component
  const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900">
      <Header user={user} onLogout={handleLogout} />
      <div className="flex">
        {user && <Sidebar user={user} />}
        <main className="flex-1 lg:ml-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20 lg:pb-8">
            <Breadcrumbs />
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  );

  if (!user) {
    return (
      <LanguageProvider>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900">
          <AuthScreen onAuth={handleAuth} />
        </div>
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/auth" element={<AuthScreen onAuth={handleAuth} />} />
          
          {/* Survey Flow */}
          <Route path="/survey" element={
            <Layout>
              <SurveyScreen onComplete={handleSurveyComplete} />
            </Layout>
          } />
          
          <Route path="/results" element={
            <Layout>
              <ResultsScreen 
                category={user.category}
                responses={responses}
                onGenerateCertificate={() => {}}
              />
            </Layout>
          } />

          {/* User Dashboard Routes */}
          <Route path="/me" element={
            <ProtectedRoute>
              <Layout>
                <UserDashboard user={user} />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/me/certificates" element={
            <ProtectedRoute>
              <Layout>
                <UserCertificates user={user} />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/me/history" element={
            <ProtectedRoute>
              <Layout>
                <UserHistory user={user} onRetakeSurvey={handleRetakeSurvey} />
              </Layout>
            </ProtectedRoute>
          } />
          
          <Route path="/me/settings" element={
            <ProtectedRoute>
              <Layout>
                <UserSettings 
                  user={user} 
                  onUpdateUser={handleUpdateUser}
                  onDeleteAccount={handleDeleteAccount}
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

          {/* Default Routes */}
          <Route path="/" element={<Navigate to="/me" replace />} />
          <Route path="*" element={<Navigate to="/me" replace />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;