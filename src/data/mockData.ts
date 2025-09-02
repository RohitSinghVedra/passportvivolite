import type { User, AppAnalytics, Certificate, SurveyRun } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'maria.silva@email.com',
    name: 'Maria Silva',
    category: 'student',
    state: 'SP',
    city: 'São Paulo',
    ageRange: '18-25',
    language: 'pt',
    completedOnboarding: true,
    surveyCompleted: true,
    score: 42,
    level: 'active',
    badge: '⚡',
    createdAt: new Date('2024-12-15'),
    lastActivity: new Date('2024-12-20'),
    certificateVisibility: 'public',
    role: 'user'
  },
  {
    id: '2',
    email: 'joao.santos@empresa.com',
    name: 'João Santos',
    category: 'employee',
    state: 'RJ',
    city: 'Rio de Janeiro',
    ageRange: '26-35',
    language: 'pt',
    completedOnboarding: true,
    surveyCompleted: true,
    score: 38,
    level: 'aware',
    badge: '🌱',
    createdAt: new Date('2024-12-14'),
    lastActivity: new Date('2024-12-19'),
    certificateVisibility: 'private',
    role: 'user'
  },
  {
    id: '3',
    email: 'ana.costa@startup.com',
    name: 'Ana Costa',
    category: 'company_owner',
    state: 'MG',
    city: 'Belo Horizonte',
    ageRange: '36-45',
    language: 'en',
    completedOnboarding: true,
    surveyCompleted: true,
    score: 47,
    level: 'champion',
    badge: '🏆',
    createdAt: new Date('2024-12-13'),
    lastActivity: new Date('2024-12-18'),
    certificateVisibility: 'public',
    role: 'user'
  },
  {
    id: '4',
    email: 'carlos.oliveira@gov.br',
    name: 'Carlos Oliveira',
    category: 'government',
    state: 'DF',
    city: 'Brasília',
    ageRange: '46-55',
    language: 'pt',
    completedOnboarding: true,
    surveyCompleted: true,
    score: 45,
    level: 'leader',
    badge: '🌟',
    createdAt: new Date('2024-12-12'),
    lastActivity: new Date('2024-12-17'),
    certificateVisibility: 'public',
    role: 'user'
  },
  {
    id: 'admin',
    email: 'admin@passaporteverde.com',
    name: 'Admin User',
    category: 'government',
    state: 'DF',
    city: 'Brasília',
    ageRange: '36-45',
    language: 'pt',
    completedOnboarding: true,
    surveyCompleted: true,
    score: 50,
    level: 'champion',
    badge: '🏆',
    createdAt: new Date('2024-01-01'),
    lastActivity: new Date(),
    certificateVisibility: 'private',
    role: 'admin'
  }
];

export const mockCertificates: Certificate[] = [
  {
    id: '1',
    code: 'PV-2024-001',
    userId: '1',
    userName: 'Maria Silva',
    category: 'student',
    score: 42,
    level: 'active',
    badge: '⚡',
    issuedAt: new Date('2024-12-15'),
    visibility: 'public',
    isValid: true
  },
  {
    id: '2',
    code: 'PV-2024-002',
    userId: '2',
    userName: 'João Santos',
    category: 'employee',
    score: 38,
    level: 'aware',
    badge: '🌱',
    issuedAt: new Date('2024-12-14'),
    visibility: 'private',
    isValid: true
  },
  {
    id: '3',
    code: 'PV-2024-003',
    userId: '3',
    userName: 'Ana Costa',
    category: 'company_owner',
    score: 47,
    level: 'champion',
    badge: '🏆',
    issuedAt: new Date('2024-12-13'),
    visibility: 'public',
    isValid: true
  },
  {
    id: '4',
    code: 'PV-2024-004',
    userId: '4',
    userName: 'Carlos Oliveira',
    category: 'government',
    score: 45,
    level: 'leader',
    badge: '🌟',
    issuedAt: new Date('2024-12-12'),
    visibility: 'public',
    isValid: true
  }
];

export const mockSurveyRuns: SurveyRun[] = [
  {
    id: '1',
    userId: '1',
    date: new Date('2024-12-15'),
    category: 'student',
    score: 42,
    level: 'active',
    responses: []
  },
  {
    id: '2',
    userId: '2',
    date: new Date('2024-12-14'),
    category: 'employee',
    score: 38,
    level: 'aware',
    responses: []
  },
  {
    id: '3',
    userId: '3',
    date: new Date('2024-12-13'),
    category: 'company_owner',
    score: 47,
    level: 'champion',
    responses: []
  },
  {
    id: '4',
    userId: '4',
    date: new Date('2024-12-12'),
    category: 'government',
    score: 45,
    level: 'leader',
    responses: []
  }
];

export const mockAnalytics: AppAnalytics = {
  totalUsers: 1247,
  completedSurveys: 892,
  averageScore: 39.2,
  certificatesIssued: 856,
  publicCertificates: 423,
  categoryDistribution: {
    student: 456,
    employee: 523,
    company_owner: 178,
    government: 90
  },
  levelDistribution: {
    beginner: 234,
    aware: 298,
    active: 245,
    leader: 89,
    champion: 26
  },
  stateDistribution: {
    'SP': 312,
    'RJ': 198,
    'MG': 156,
    'RS': 134,
    'PR': 98,
    'SC': 87,
    'BA': 76,
    'GO': 65,
    'DF': 54,
    'PE': 67
  },
  monthlySignups: [
    { month: '2024-06', count: 89 },
    { month: '2024-07', count: 134 },
    { month: '2024-08', count: 167 },
    { month: '2024-09', count: 198 },
    { month: '2024-10', count: 234 },
    { month: '2024-11', count: 267 },
    { month: '2024-12', count: 158 }
  ],
  scoreDistribution: [
    { range: '0-10', count: 45 },
    { range: '11-20', count: 123 },
    { range: '21-30', count: 234 },
    { range: '31-40', count: 298 },
    { range: '41-50', count: 192 }
  ],
  dailySignups: [
    { date: '2024-12-14', count: 23 },
    { date: '2024-12-15', count: 31 },
    { date: '2024-12-16', count: 28 },
    { date: '2024-12-17', count: 35 },
    { date: '2024-12-18', count: 42 },
    { date: '2024-12-19', count: 38 },
    { date: '2024-12-20', count: 29 }
  ],
  languageDistribution: {
    pt: 892,
    en: 355
  }
};