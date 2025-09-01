import type { User, UserCategory, Language } from '../types';

export interface SurveyQuestion {
  id: string;
  category: UserCategory[];        // Which user types see this
  industry?: string[];            // Industry-specific questions
  location?: string[];            // Location-specific questions
  interests?: string[];           // Interest-based questions
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  question: {
    en: string;
    pt: string;
  };
  options: Array<{
    value: string;
    label: { en: string; pt: string };
    points: number;
    explanation?: { en: string; pt: string };
  }>;
  fact: {
    en: string;
    pt: string;
  };
  hint?: {
    en: string;
    pt: string;
  };
  priority: number;
  isActive: boolean;
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

export interface SurveyResponse {
  questionId: string;
  selectedValue: string;
  points: number;
}

// Sample questions for different user types and scenarios
export const sampleSurveyQuestions: SurveyQuestion[] = [
  // ===== STUDENT QUESTIONS =====
  {
    id: 'student_education_1',
    category: ['student'],
    difficulty: 'beginner',
    question: {
      en: 'How often do you use public transportation to get to your educational institution?',
      pt: 'Com que frequência você usa transporte público para ir à sua instituição educacional?'
    },
    options: [
      {
        value: 'never',
        label: { en: 'Never', pt: 'Nunca' },
        points: 0,
        explanation: { en: 'Consider trying public transport to reduce your carbon footprint', pt: 'Considere experimentar o transporte público para reduzir sua pegada de carbono' }
      },
      {
        value: 'rarely',
        label: { en: 'Rarely (1-2 times per week)', pt: 'Raramente (1-2 vezes por semana)' },
        points: 2
      },
      {
        value: 'sometimes',
        label: { en: 'Sometimes (3-4 times per week)', pt: 'Às vezes (3-4 vezes por semana)' },
        points: 4
      },
      {
        value: 'often',
        label: { en: 'Often (5+ times per week)', pt: 'Frequentemente (5+ vezes por semana)' },
        points: 6
      }
    ],
    fact: {
      en: 'Students who use public transport reduce their carbon footprint by 40% compared to driving.',
      pt: 'Estudantes que usam transporte público reduzem sua pegada de carbono em 40% em comparação com dirigir.'
    },
    hint: {
      en: 'Public transport in São Paulo prevents 1.2 million tons of CO2 emissions annually.',
      pt: 'O transporte público em São Paulo previne 1,2 milhão de toneladas de emissões de CO2 anualmente.'
    },
    priority: 1,
    isActive: true
  },

  // ===== EMPLOYEE QUESTIONS =====
  {
    id: 'employee_workplace_1',
    category: ['employee'],
    difficulty: 'beginner',
    question: {
      en: 'Does your workplace have a sustainability policy or environmental initiatives?',
      pt: 'Seu local de trabalho tem uma política de sustentabilidade ou iniciativas ambientais?'
    },
    options: [
      {
        value: 'no',
        label: { en: 'No', pt: 'Não' },
        points: 0,
        explanation: { en: 'Consider suggesting sustainability initiatives to your employer', pt: 'Considere sugerir iniciativas de sustentabilidade ao seu empregador' }
      },
      {
        value: 'basic',
        label: { en: 'Basic recycling program', pt: 'Programa básico de reciclagem' },
        points: 2
      },
      {
        value: 'moderate',
        label: { en: 'Moderate initiatives (energy saving, waste reduction)', pt: 'Iniciativas moderadas (economia de energia, redução de resíduos)' },
        points: 4
      },
      {
        value: 'comprehensive',
        label: { en: 'Comprehensive sustainability program', pt: 'Programa abrangente de sustentabilidade' },
        points: 6
      }
    ],
    fact: {
      en: '65% of Brazilian employees now work in companies with environmental policies.',
      pt: '65% dos funcionários brasileiros agora trabalham em empresas com políticas ambientais.'
    },
    priority: 1,
    isActive: true
  },

  // ===== COMPANY OWNER QUESTIONS =====
  {
    id: 'owner_business_1',
    category: ['company_owner'],
    difficulty: 'intermediate',
    question: {
      en: 'What percentage of your business operations use renewable energy sources?',
      pt: 'Que porcentagem das suas operações comerciais usa fontes de energia renovável?'
    },
    options: [
      {
        value: '0',
        label: { en: '0% - No renewable energy', pt: '0% - Sem energia renovável' },
        points: 0,
        explanation: { en: 'Consider exploring renewable energy options to reduce costs and environmental impact', pt: 'Considere explorar opções de energia renovável para reduzir custos e impacto ambiental' }
      },
      {
        value: '25',
        label: { en: '1-25%', pt: '1-25%' },
        points: 2
      },
      {
        value: '50',
        label: { en: '26-50%', pt: '26-50%' },
        points: 4
      },
      {
        value: '75',
        label: { en: '51-75%', pt: '51-75%' },
        points: 6
      },
      {
        value: '100',
        label: { en: '76-100%', pt: '76-100%' },
        points: 8
      }
    ],
    fact: {
      en: 'Brazilian companies with strong ESG practices show 23% higher profitability.',
      pt: 'Empresas brasileiras com fortes práticas ESG mostram 23% maior lucratividade.'
    },
    priority: 1,
    isActive: true
  },

  // ===== GOVERNMENT QUESTIONS =====
  {
    id: 'government_policy_1',
    category: ['government'],
    difficulty: 'advanced',
    question: {
      en: 'How involved are you in implementing environmental policies in your government role?',
      pt: 'Como você está envolvido na implementação de políticas ambientais em sua função governamental?'
    },
    options: [
      {
        value: 'not_involved',
        label: { en: 'Not involved in environmental policies', pt: 'Não envolvido em políticas ambientais' },
        points: 0,
        explanation: { en: 'Consider advocating for environmental initiatives in your department', pt: 'Considere defender iniciativas ambientais em seu departamento' }
      },
      {
        value: 'aware',
        label: { en: 'Aware of policies but not directly involved', pt: 'Ciente das políticas, mas não diretamente envolvido' },
        points: 2
      },
      {
        value: 'participating',
        label: { en: 'Participating in policy implementation', pt: 'Participando da implementação de políticas' },
        points: 4
      },
      {
        value: 'leading',
        label: { en: 'Leading environmental policy initiatives', pt: 'Liderando iniciativas de políticas ambientais' },
        points: 6
      }
    ],
    fact: {
      en: 'Brazilian environmental policies have prevented 2.3 million tons of CO2 emissions annually since 2020.',
      pt: 'Políticas ambientais brasileiras evitaram 2,3 milhões de toneladas de emissões de CO2 anualmente desde 2020.'
    },
    priority: 1,
    isActive: true
  },

  // ===== LOCATION-SPECIFIC QUESTIONS =====
  {
    id: 'sp_transport_1',
    category: ['student', 'employee'],
    location: ['SP', 'São Paulo'],
    difficulty: 'beginner',
    question: {
      en: 'How do you primarily commute in São Paulo?',
      pt: 'Como você se desloca principalmente em São Paulo?'
    },
    options: [
      {
        value: 'car',
        label: { en: 'Personal car', pt: 'Carro pessoal' },
        points: 0,
        explanation: { en: 'São Paulo\'s public transport system prevents 1.2 million tons of CO2 emissions annually', pt: 'O sistema de transporte público de São Paulo previne 1,2 milhão de toneladas de emissões de CO2 anualmente' }
      },
      {
        value: 'metro',
        label: { en: 'Metro/Subway', pt: 'Metrô' },
        points: 5
      },
      {
        value: 'bus',
        label: { en: 'Bus', pt: 'Ônibus' },
        points: 4
      },
      {
        value: 'bike',
        label: { en: 'Bicycle', pt: 'Bicicleta' },
        points: 6
      },
      {
        value: 'walk',
        label: { en: 'Walking', pt: 'A pé' },
        points: 6
      }
    ],
    fact: {
      en: 'São Paulo aims to be carbon neutral by 2050 and has already reduced emissions by 20% since 2015.',
      pt: 'São Paulo visa ser neutra em carbono até 2050 e já reduziu as emissões em 20% desde 2015.'
    },
    priority: 2,
    isActive: true
  },

  // ===== INDUSTRY-SPECIFIC QUESTIONS =====
  {
    id: 'tech_energy_1',
    category: ['employee', 'company_owner'],
    industry: ['technology', 'tech'],
    difficulty: 'intermediate',
    question: {
      en: 'What type of energy does your tech company primarily use for data centers?',
      pt: 'Que tipo de energia sua empresa de tecnologia usa principalmente para data centers?'
    },
    options: [
      {
        value: 'fossil',
        label: { en: 'Fossil fuel-based energy', pt: 'Energia baseada em combustíveis fósseis' },
        points: 0,
        explanation: { en: 'Tech companies can reduce energy costs by 30% by switching to renewable sources', pt: 'Empresas de tecnologia podem reduzir custos de energia em 30% mudando para fontes renováveis' }
      },
      {
        value: 'mixed',
        label: { en: 'Mixed energy sources', pt: 'Fontes de energia mistas' },
        points: 3
      },
      {
        value: 'renewable',
        label: { en: 'Primarily renewable energy', pt: 'Primariamente energia renovável' },
        points: 6
      },
      {
        value: 'carbon_neutral',
        label: { en: 'Carbon-neutral operations', pt: 'Operações neutras em carbono' },
        points: 8
      }
    ],
    fact: {
      en: 'São Paulo tech companies use 40% renewable energy on average.',
      pt: 'Empresas de tecnologia de São Paulo usam 40% de energia renovável em média.'
    },
    priority: 2,
    isActive: true
  },

  // ===== INTEREST-BASED QUESTIONS =====
  {
    id: 'carbon_footprint_1',
    category: ['student', 'employee', 'company_owner', 'government'],
    interests: ['Carbon Footprint Reduction'],
    difficulty: 'beginner',
    question: {
      en: 'How do you track your personal or organizational carbon footprint?',
      pt: 'Como você rastreia sua pegada de carbono pessoal ou organizacional?'
    },
    options: [
      {
        value: 'not_tracking',
        label: { en: 'Not tracking at all', pt: 'Não rastreando de forma alguma' },
        points: 0,
        explanation: { en: 'Tracking is the first step to reduction. Consider using carbon footprint calculators', pt: 'O rastreamento é o primeiro passo para a redução. Considere usar calculadoras de pegada de carbono' }
      },
      {
        value: 'basic',
        label: { en: 'Basic awareness of activities', pt: 'Consciência básica das atividades' },
        points: 2
      },
      {
        value: 'manual',
        label: { en: 'Manual tracking of key activities', pt: 'Rastreamento manual de atividades-chave' },
        points: 4
      },
      {
        value: 'automated',
        label: { en: 'Automated tracking system', pt: 'Sistema de rastreamento automatizado' },
        points: 6
      },
      {
        value: 'comprehensive',
        label: { en: 'Comprehensive carbon management', pt: 'Gestão abrangente de carbono' },
        points: 8
      }
    ],
    fact: {
      en: 'Brazilians can reduce their carbon footprint by 40% through simple lifestyle changes.',
      pt: 'Brasileiros podem reduzir sua pegada de carbono em 40% através de mudanças simples no estilo de vida.'
    },
    priority: 2,
    isActive: true
  }
];

// Function to get personalized questions for a user
export const getPersonalizedQuestions = (user: User, count: number = 10): SurveyQuestion[] => {
  let relevantQuestions: SurveyQuestion[] = [];
  
  // Filter questions based on user category
  const categoryQuestions = sampleSurveyQuestions.filter(q => 
    q.category.includes(user.category)
  );
  relevantQuestions.push(...categoryQuestions);

  // Filter questions based on location
  const locationQuestions = sampleSurveyQuestions.filter(q => 
    q.location && (q.location.includes(user.state) || q.location.includes(user.city))
  );
  relevantQuestions.push(...locationQuestions);

  // Filter questions based on industry
  if (user.industry) {
    const industryQuestions = sampleSurveyQuestions.filter(q => 
      q.industry && q.industry.some(ind => 
        user.industry!.toLowerCase().includes(ind.toLowerCase())
      )
    );
    relevantQuestions.push(...industryQuestions);
  }

  // Filter questions based on interests
  if (user.sustainabilityInterests) {
    user.sustainabilityInterests.forEach(interest => {
      const interestQuestions = sampleSurveyQuestions.filter(q => 
        q.interests && q.interests.includes(interest)
      );
      relevantQuestions.push(...interestQuestions);
    });
  }

  // Remove duplicates and sort by priority
  const uniqueQuestions = relevantQuestions.filter((q, index, self) => 
    index === self.findIndex(question => question.id === q.id)
  );

  const sortedQuestions = uniqueQuestions.sort((a, b) => b.priority - a.priority);

  // Return the requested number of questions
  return sortedQuestions.slice(0, count);
};

// Function to get questions by difficulty
export const getQuestionsByDifficulty = (
  questions: SurveyQuestion[], 
  difficulty: 'beginner' | 'intermediate' | 'advanced'
): SurveyQuestion[] => {
  return questions.filter(q => q.difficulty === difficulty);
};

// Function to calculate survey score
export const calculateSurveyScore = (responses: SurveyResponse[]): number => {
  return responses.reduce((total, response) => total + response.points, 0);
};

// Function to determine level based on score
export const getLevelFromScore = (score: number): { level: string; badge: string } => {
  if (score >= 40) {
    return { level: 'expert', badge: '🏆' };
  } else if (score >= 25) {
    return { level: 'advanced', badge: '⭐' };
  } else if (score >= 15) {
    return { level: 'intermediate', badge: '🌱' };
  } else {
    return { level: 'beginner', badge: '🌿' };
  }
};