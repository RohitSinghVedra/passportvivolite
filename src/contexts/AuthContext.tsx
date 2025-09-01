import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  collection, 
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
  limit
} from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import type { User, SurveyQuestion, SurveySession, SurveyResponse } from '../types';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: Partial<User>) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (updates: Partial<User>) => Promise<void>;
  // Survey database functions
  saveSurveyQuestions: (questions: SurveyQuestion[]) => Promise<void>;
  getSurveyQuestions: () => Promise<SurveyQuestion[]>;
  saveSurveySession: (session: Omit<SurveySession, 'id'>) => Promise<string>;
  getUserSurveyHistory: (userId: string) => Promise<SurveySession[]>;
  getUserCertificates: (userId: string) => Promise<any[]>;
  updateUserSurveyResults: (userId: string, score: number, level: string, badge: string) => Promise<void>;
  saveCertificate: (certificateData: {
    userId: string;
    certificateCode: string;
    userName: string;
    category: string;
    city: string;
    state: string;
    ageRange: string;
    score: number;
    level: string;
    badge: string;
    grade: string;
    percentage: number;
    completedAt: Date;
    visibility: 'public' | 'private';
  }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Create user document in Firestore
  const createUserDocument = async (user: FirebaseUser, userData: Partial<User>) => {
    const userRef = doc(db, 'users', user.uid);
    
    // Filter out undefined values
    const filteredUserData = Object.fromEntries(
      Object.entries(userData).filter(([_, value]) => value !== undefined)
    );

    const userDoc = {
      id: user.uid,
      email: user.email!,
      createdAt: new Date(),
      lastActivity: new Date(),
      completedOnboarding: false,
      surveyCompleted: false,
      certificateVisibility: 'public' as const,
      role: 'user' as const,
      ...filteredUserData
    };

    await setDoc(userRef, userDoc);
    return userDoc;
  };

  // Sign up with email and password
  const signUp = async (email: string, password: string, userData: Partial<User>) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const userDoc = await createUserDocument(result.user, {
        ...userData,
        completedOnboarding: true,
        signUpMethod: 'email'
      });
      setCurrentUser(userDoc as User);
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // Check if user document exists
      const userRef = doc(db, 'users', result.user.uid);
      const userSnap = await getDoc(userRef);
      
      if (!userSnap.exists()) {
        // Create new user document for Google sign-in
        await createUserDocument(result.user, {
          name: result.user.displayName || '',
          email: result.user.email!,
          completedOnboarding: false,
          signUpMethod: 'google'
        });
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  };

  // Sign out
  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  // Update user profile
  const updateUserProfile = async (updates: Partial<User>) => {
    if (!currentUser) throw new Error('No user logged in');
    
    try {
      // Filter out undefined values
      const filteredUpdates = Object.fromEntries(
        Object.entries(updates).filter(([_, value]) => value !== undefined)
      );

      const userRef = doc(db, 'users', currentUser.id);
      await updateDoc(userRef, {
        ...filteredUpdates,
        lastActivity: new Date()
      });

      // Update local state
      setCurrentUser(prev => prev ? { ...prev, ...filteredUpdates } : null);
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  };

  // Survey database functions

  // Save survey questions to Firestore
  const saveSurveyQuestions = async (questions: SurveyQuestion[]) => {
    try {
      const questionsRef = collection(db, 'surveyQuestions');
      
      // Clear existing questions (optional - you might want to keep them)
      // const existingQuestions = await getDocs(questionsRef);
      // existingQuestions.forEach(async (doc) => {
      //   await deleteDoc(doc.ref);
      // });

      // Add new questions
      const promises = questions.map(question => 
        addDoc(questionsRef, {
          ...question,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      );

      await Promise.all(promises);
      console.log('Survey questions saved successfully');
    } catch (error) {
      console.error('Error saving survey questions:', error);
      throw error;
    }
  };

  // Get survey questions from Firestore
  const getSurveyQuestions = async (): Promise<SurveyQuestion[]> => {
    try {
      const questionsRef = collection(db, 'surveyQuestions');
      const q = query(questionsRef, where('isActive', '==', true));
      const querySnapshot = await getDocs(q);
      
      const questions: SurveyQuestion[] = [];
      querySnapshot.forEach((doc) => {
        questions.push({ id: doc.id, ...doc.data() } as SurveyQuestion);
      });
      
      // Sort by priority in memory to avoid index requirements
      questions.sort((a, b) => (b.priority || 0) - (a.priority || 0));
      
      return questions;
    } catch (error) {
      console.error('Error getting survey questions:', error);
      throw error;
    }
  };

  // Save survey session
  const saveSurveySession = async (session: Omit<SurveySession, 'id'>): Promise<string> => {
    try {
      const sessionsRef = collection(db, 'surveySessions');
      const docRef = await addDoc(sessionsRef, {
        ...session,
        createdAt: new Date()
      });
      
      console.log('Survey session saved with ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error saving survey session:', error);
      throw error;
    }
  };

  // Get user certificates
  const getUserCertificates = async (userId: string) => {
    try {
      const certificatesRef = collection(db, 'certificates');
      const q = query(certificatesRef, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      
      const certificates: any[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        certificates.push({ 
          id: doc.id, 
          ...data,
          completedAt: data.completedAt?.toDate() || new Date(),
          createdAt: data.createdAt?.toDate() || new Date()
        });
      });
      
      // Sort by completedAt in memory to avoid index requirements
      certificates.sort((a, b) => {
        const dateA = a.completedAt instanceof Date ? a.completedAt : new Date(a.completedAt);
        const dateB = b.completedAt instanceof Date ? b.completedAt : new Date(b.completedAt);
        return dateB.getTime() - dateA.getTime();
      });
      
      return certificates;
    } catch (error) {
      console.error('Error getting user certificates:', error);
      throw error;
    }
  };

  // Get user survey history
  const getUserSurveyHistory = async (userId: string): Promise<SurveySession[]> => {
    try {
      console.log('Fetching survey history for user:', userId);
      
      // Try multiple collections where survey data might be stored
      const collections = ['surveySessions', 'survey_results', 'surveys', 'userSurveys'];
      let sessions: SurveySession[] = [];
      
      for (const collectionName of collections) {
        try {
          const sessionsRef = collection(db, collectionName);
          const q = query(sessionsRef, where('userId', '==', userId));
          const querySnapshot = await getDocs(q);
          
          console.log(`Found ${querySnapshot.size} documents in ${collectionName}`);
          
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            console.log('Survey data:', data);
            sessions.push({ id: doc.id, ...data } as SurveySession);
          });
          
          if (sessions.length > 0) {
            console.log(`Using data from ${collectionName}`);
            break;
          }
        } catch (error) {
          console.log(`Collection ${collectionName} not found or error:`, error);
        }
      }
      
      // Sort by completedAt in memory to avoid index requirements
      sessions.sort((a, b) => {
        const dateA = a.completedAt instanceof Date ? a.completedAt : new Date(a.completedAt);
        const dateB = b.completedAt instanceof Date ? b.completedAt : new Date(b.completedAt);
        return dateB.getTime() - dateA.getTime();
      });
      
      console.log('Final sessions count:', sessions.length);
      return sessions;
    } catch (error) {
      console.error('Error getting user survey history:', error);
      throw error;
    }
  };

  // Update user survey results
  const updateUserSurveyResults = async (userId: string, score: number, level: string, badge: string) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        score,
        level,
        badge,
        surveyCompleted: true,
        lastActivity: new Date()
      });

      // Update local state if it's the current user
      if (currentUser && currentUser.id === userId) {
        setCurrentUser(prev => prev ? { 
          ...prev, 
          score, 
          level, 
          badge, 
          surveyCompleted: true 
        } : null);
      }
    } catch (error) {
      console.error('Error updating user survey results:', error);
      throw error;
    }
  };

  // Save certificate data
  const saveCertificate = async (certificateData: {
    userId: string;
    certificateCode: string;
    userName: string;
    category: string;
    city: string;
    state: string;
    ageRange: string;
    score: number;
    level: string;
    badge: string;
    grade: string;
    percentage: number;
    completedAt: Date;
    visibility: 'public' | 'private';
  }) => {
    try {
      const certificatesRef = collection(db, 'certificates');
      await addDoc(certificatesRef, {
        ...certificateData,
        createdAt: new Date()
      });
      
      console.log('Certificate saved with code:', certificateData.certificateCode);
    } catch (error) {
      console.error('Error saving certificate:', error);
      throw error;
    }
  };

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('Auth state changed:', firebaseUser ? 'User logged in' : 'User logged out');
      
      if (firebaseUser) {
        try {
          const userRef = doc(db, 'users', firebaseUser.uid);
          const userSnap = await getDoc(userRef);
          
          if (userSnap.exists()) {
            const userData = userSnap.data() as any;
            
            // Convert Firestore timestamps to Date objects
            const convertedUserData: User = {
              ...userData,
              createdAt: userData.createdAt?.toDate() || new Date(),
              lastActivity: userData.lastActivity?.toDate() || new Date()
            };
            
            console.log('User data loaded:', convertedUserData);
            setCurrentUser(convertedUserData);
          } else {
            console.log('User document not found');
            setCurrentUser(null);
          }
        } catch (error) {
          console.error('Error loading user data:', error);
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    currentUser,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    logout,
    updateUserProfile,
    saveSurveyQuestions,
    getSurveyQuestions,
    saveSurveySession,
    getUserSurveyHistory,
    getUserCertificates,
    updateUserSurveyResults,
    saveCertificate
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
