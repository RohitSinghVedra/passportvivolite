import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider
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
  limit,
  deleteDoc,
  writeBatch
} from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import type { User, SurveyQuestion, SurveySession, SurveyResponse } from '../types';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: Partial<User>) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (updates: Partial<User>) => Promise<void>;
  deleteAccount: () => Promise<void>;
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
      console.log('Attempting to sign in with email:', email);
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log('Sign in successful for user:', result.user.uid);
    } catch (error) {
      console.error('Error signing in:', error);
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

  // Delete user account and all associated data
  const deleteAccount = async () => {
    if (!currentUser) throw new Error('No user logged in');
    
    try {
      const batch = writeBatch(db);
      const userId = currentUser.id;

      // Delete user's survey sessions
      const surveySessionsQuery = query(
        collection(db, 'surveySessions'),
        where('userId', '==', userId)
      );
      const surveySessionsSnapshot = await getDocs(surveySessionsQuery);
      surveySessionsSnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });

      // Delete user's certificates
      const certificatesQuery = query(
        collection(db, 'certificates'),
        where('userId', '==', userId)
      );
      const certificatesSnapshot = await getDocs(certificatesQuery);
      certificatesSnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });

      // Delete user document
      const userRef = doc(db, 'users', userId);
      batch.delete(userRef);

      // Commit all deletions
      await batch.commit();

      // Try to delete Firebase Auth user, but don't let it break the process
      if (auth.currentUser) {
        try {
          await deleteUser(auth.currentUser);
          console.log('Firebase Auth user deleted successfully');
        } catch (error: any) {
          console.log('Firebase Auth user deletion failed:', error.message);
          
          // If deletion fails, just sign out normally
          if (error.code === 'auth/requires-recent-login') {
            console.log('User needs recent login for deletion, signing out instead');
          }
          
          // Sign out normally without throwing error
          await signOut(auth);
        }
      }

      // Clear local state
      setCurrentUser(null);
      
      console.log('Account data deleted successfully');
    } catch (error) {
      console.error('Error deleting account:', error);
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
      const collections = ['surveySessions', 'survey_results', 'surveys', 'userSurveys', 'certificates'];
      let sessions: SurveySession[] = [];
      
      for (const collectionName of collections) {
        try {
          const sessionsRef = collection(db, collectionName);
          
          // For certificates, we need to check different field names
          if (collectionName === 'certificates') {
            // Try different possible field names for user ID
            const possibleFields = ['userId', 'user_id', 'user', 'uid'];
            
            for (const fieldName of possibleFields) {
              try {
                const q = query(sessionsRef, where(fieldName, '==', userId));
                const querySnapshot = await getDocs(q);
                
                console.log(`Found ${querySnapshot.size} documents in ${collectionName} with field '${fieldName}'`);
                
                querySnapshot.forEach((doc) => {
                  const data = doc.data();
                  console.log('Certificate data:', data);
                  
                  // Check if certificate has associated survey data
                  if (data.completedAt && data.score !== undefined) {
                    sessions.push({ 
                      id: doc.id, 
                      userId: data.userId || data.user_id || data.user || data.uid || userId,
                      completedAt: data.completedAt?.toDate() || new Date(),
                      score: data.score,
                      level: data.level,
                      responses: [], // Certificates don't have responses
                      certificateCode: data.certificateCode
                    } as SurveySession);
                  }
                });
                
                if (sessions.length > 0) {
                  console.log(`Using data from ${collectionName} with field '${fieldName}'`);
                  break;
                }
              } catch (error) {
                console.log(`Field '${fieldName}' not found in ${collectionName}:`, error);
              }
            }
          } else {
            // Regular survey session collections
            const q = query(sessionsRef, where('userId', '==', userId));
            const querySnapshot = await getDocs(q);
            
            console.log(`Found ${querySnapshot.size} documents in ${collectionName}`);
            
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              console.log('Survey data:', data);
              sessions.push({ id: doc.id, ...data } as SurveySession);
            });
          }
          
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
    console.log('Setting up auth state listener...');
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('Auth state changed:', firebaseUser ? `User logged in (${firebaseUser.uid})` : 'User logged out');
      
      if (firebaseUser) {
        try {
          console.log('Loading user data from Firestore for:', firebaseUser.uid);
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
            
            console.log('User data loaded successfully:', convertedUserData);
            setCurrentUser(convertedUserData);
          } else {
            console.log('User document not found in Firestore for:', firebaseUser.uid);
            setCurrentUser(null);
          }
        } catch (error) {
          console.error('Error loading user data from Firestore:', error);
          setCurrentUser(null);
        }
      } else {
        console.log('No Firebase user, setting currentUser to null');
        setCurrentUser(null);
      }
      
      console.log('Setting loading to false');
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    currentUser,
    loading,
    signUp,
    signIn,
    logout,
    updateUserProfile,
    deleteAccount,
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
