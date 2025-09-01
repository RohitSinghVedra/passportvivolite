import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User as FirebaseUser,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import type { User, UserCategory } from '../types';

interface AuthContextType {
  currentUser: User | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: Partial<User>) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Create user document in Firestore
  const createUserDocument = async (firebaseUser: FirebaseUser, userData: Partial<User>) => {
    const userRef = doc(db, 'users', firebaseUser.uid);
    
    // Base user object with required fields
    const baseUser = {
      id: firebaseUser.uid,
      email: firebaseUser.email!,
      name: userData.name || firebaseUser.displayName || firebaseUser.email!.split('@')[0],
      category: userData.category || 'student',
      state: userData.state || 'SP',
      city: userData.city || 'São Paulo',
      ageRange: userData.ageRange || '18-25',
      language: userData.language || 'pt',
      completedOnboarding: userData.completedOnboarding || false,
      surveyCompleted: userData.surveyCompleted || false,
      createdAt: new Date(),
      lastActivity: new Date(),
      certificateVisibility: userData.certificateVisibility || 'private',
      role: userData.role || 'user'
    };

    // Add optional fields only if they have values
    const optionalFields: Partial<User> = {};
    if (userData.organizationName) optionalFields.organizationName = userData.organizationName;
    if (userData.position) optionalFields.position = userData.position;
    if (userData.companySize) optionalFields.companySize = userData.companySize;
    if (userData.industry) optionalFields.industry = userData.industry;
    if (userData.educationLevel) optionalFields.educationLevel = userData.educationLevel;
    if (userData.governmentLevel) optionalFields.governmentLevel = userData.governmentLevel;
    if (userData.sustainabilityInterests && userData.sustainabilityInterests.length > 0) {
      optionalFields.sustainabilityInterests = userData.sustainabilityInterests;
    }

    const user = { ...baseUser, ...optionalFields } as User;

    await setDoc(userRef, user);
    return user;
  };

  // Sign up function
  const signUp = async (email: string, password: string, userData: Partial<User>) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = await createUserDocument(result.user, userData);
      setCurrentUser(user);
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  // Sign in function
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
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        // Create new user document for Google sign-in with basic data
        // User will need to complete profile later
        const basicUser = await createUserDocument(result.user, {
          name: result.user.displayName || result.user.email!.split('@')[0],
          email: result.user.email!,
          completedOnboarding: false // Mark as needing profile completion
        });
        setCurrentUser(basicUser);
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  // Reset password function
  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error('Error resetting password:', error);
      throw error;
    }
  };

  // Update user profile
  const updateUserProfile = async (updates: Partial<User>) => {
    if (!currentUser) throw new Error('No user logged in');
    
    try {
      const userRef = doc(db, 'users', currentUser.id);
      
      // Filter out undefined values to prevent Firestore errors
      const filteredUpdates: Partial<User> = {};
      Object.entries(updates).forEach(([key, value]) => {
        if (value !== undefined) {
          filteredUpdates[key as keyof User] = value;
        }
      });
      
      await updateDoc(userRef, {
        ...filteredUpdates,
        lastActivity: new Date()
      });
      
      setCurrentUser(prev => prev ? { ...prev, ...filteredUpdates } : null);
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setFirebaseUser(firebaseUser);
      
      if (firebaseUser) {
        // Get user data from Firestore
        const userRef = doc(db, 'users', firebaseUser.uid);
        const userDoc = await getDoc(userRef);
        
        if (userDoc.exists()) {
          setCurrentUser(userDoc.data() as User);
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
    firebaseUser,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    logout,
    resetPassword,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
