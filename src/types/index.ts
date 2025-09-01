export interface User {
  id: string;
  email: string;
  name: string;
  category: UserCategory;
  state: string;
  city: string;
  ageRange: string;
  language: Language;
  completedOnboarding: boolean;
  surveyCompleted: boolean;
  score?: number;
  level?: string;
  badge?: string;
  createdAt: Date;
  lastActivity: Date;
  certificateVisibility: 'public' | 'private';
  role: 'user' | 'admin';
  // Enhanced profile fields
  companySize?: string;
  industry?: string;
  educationLevel?: string;
  governmentLevel?: string;
  sustainabilityInterests?: string[];
  organizationName?: string;
  position?: string;
  // Sign-up method tracking
  signUpMethod?: 'email' | 'google';
}

export type UserCategory = 'student' | 'employee' | 'company_owner' | 'government';

export type Language = 'en' | 'pt';

export interface PersonalizedFact {
  id: string;
  category: string;
  title: {
    en: string;
    pt: string;
  };
  content: {
    en: string;
    pt: string;
  };
  source?: string;
  relevance: string[];
  priority: number;
}

export interface SurveyQuestion {
  id: string;
  category: UserCategory[];        // Which user types see this
  industry?: string[];            // Industry-specific questions
  location?: string[];            // Location-specific questions
  interests?: string[];           // Interest-based questions
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  question: Record<Language, string>;
  options: Array<{
    value: string;
    label: Record<Language, string>;
    points: number;
    explanation?: Record<Language, string>;
  }>;
  fact: Record<Language, string>;
  hint?: Record<Language, string>;
  priority: number;
  isActive: boolean;
}

export interface SurveyResponse {
  questionId: string;
  selectedValue: string;
  points: number;
}

export interface SurveySession {
  id: string;
  userId: string;
  questions: string[];           // Question IDs used
  responses: SurveyResponse[];
  score: number;
  level: string;
  badge: string;
  completedAt: Date;
  personalizedFacts: string[];   // Facts shown during survey
}

export interface SurveyRun {
  id: string;
  userId: string;
  date: Date;
  category: UserCategory;
  score: number;
  level: string;
  responses: SurveyResponse[];
}

export interface Certificate {
  id: string;
  code: string;
  userId: string;
  userName: string;
  category: UserCategory;
  score: number;
  level: string;
  badge: string;
  issuedAt: Date;
  visibility: 'public' | 'private';
  isValid: boolean;
}

export interface Recommendation {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  priority: 'high' | 'medium' | 'low';
  category: UserCategory[];
}

export interface ClimateData {
  category: UserCategory;
  title: Record<Language, string>;
  description: Record<Language, string>;
  stats: Array<{
    label: Record<Language, string>;
    value: string;
    trend: 'up' | 'down' | 'stable';
  }>;
}

export interface AppAnalytics {
  totalUsers: number;
  completedSurveys: number;
  averageScore: number;
  certificatesIssued: number;
  publicCertificates: number;
  categoryDistribution: Record<UserCategory, number>;
  levelDistribution: Record<string, number>;
  stateDistribution: Record<string, number>;
  monthlySignups: Array<{ month: string; count: number }>;
  scoreDistribution: Array<{ range: string; count: number }>;
  dailySignups: Array<{ date: string; count: number }>;
  languageDistribution: Record<Language, number>;
}