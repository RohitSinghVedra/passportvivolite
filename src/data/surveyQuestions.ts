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

// Comprehensive questions for different user types and scenarios
export const sampleSurveyQuestions: SurveyQuestion[] = [
  // ===== STUDENT QUESTIONS (10+ questions) =====
  {
    id: 'student_transport_1',
    category: ['student'],
    difficulty: 'beginner',
    question: {
      en: 'How do you typically commute to your educational institution?',
      pt: 'Como você normalmente se desloca para sua instituição educacional?'
    },
    options: [
      {
        value: 'car',
        label: { en: 'Personal car', pt: 'Carro pessoal' },
        points: 0,
        explanation: { en: 'Consider carpooling or public transport to reduce emissions', pt: 'Considere carona solidária ou transporte público para reduzir emissões' }
      },
      {
        value: 'public',
        label: { en: 'Public transportation', pt: 'Transporte público' },
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
      },
      {
        value: 'carpool',
        label: { en: 'Carpooling', pt: 'Carona solidária' },
        points: 3
      }
    ],
    fact: {
      en: 'Students who use sustainable transport reduce their carbon footprint by 40% compared to driving alone.',
      pt: 'Estudantes que usam transporte sustentável reduzem sua pegada de carbono em 40% em comparação com dirigir sozinhos.'
    },
    hint: {
      en: 'Many universities offer free or discounted public transport passes for students.',
      pt: 'Muitas universidades oferecem passes de transporte público gratuitos ou com desconto para estudantes.'
    },
    priority: 1,
    isActive: true
  },

  {
    id: 'student_campus_1',
    category: ['student'],
    difficulty: 'beginner',
    question: {
      en: 'How do you handle waste on campus?',
      pt: 'Como você lida com resíduos no campus?'
    },
    options: [
      {
        value: 'no_separation',
        label: { en: 'No separation - throw everything together', pt: 'Sem separação - jogo tudo junto' },
        points: 0,
        explanation: { en: 'Start with basic recycling - paper, plastic, and organic waste', pt: 'Comece com reciclagem básica - papel, plástico e resíduos orgânicos' }
      },
      {
        value: 'basic_recycling',
        label: { en: 'Basic recycling (paper, plastic)', pt: 'Reciclagem básica (papel, plástico)' },
        points: 3
      },
      {
        value: 'comprehensive',
        label: { en: 'Comprehensive separation (paper, plastic, organic, electronics)', pt: 'Separação abrangente (papel, plástico, orgânico, eletrônicos)' },
        points: 5
      },
      {
        value: 'zero_waste',
        label: { en: 'Zero waste approach - minimize all waste', pt: 'Abordagem lixo zero - minimizar todos os resíduos' },
        points: 7
      }
    ],
    fact: {
      en: 'Brazilian universities generate 2.3 million tons of waste annually. Proper separation can reduce this by 60%.',
      pt: 'Universidades brasileiras geram 2,3 milhões de toneladas de resíduos anualmente. Separação adequada pode reduzir isso em 60%.'
    },
    priority: 1,
    isActive: true
  },

  {
    id: 'student_research_1',
    category: ['student'],
    difficulty: 'intermediate',
    question: {
      en: 'How do you approach research projects with environmental impact?',
      pt: 'Como você aborda projetos de pesquisa com impacto ambiental?'
    },
    options: [
      {
        value: 'no_consideration',
        label: { en: 'No environmental consideration', pt: 'Sem consideração ambiental' },
        points: 0,
        explanation: { en: 'Consider the environmental impact of your research methods and materials', pt: 'Considere o impacto ambiental de seus métodos e materiais de pesquisa' }
      },
      {
        value: 'basic_awareness',
        label: { en: 'Basic awareness of environmental impact', pt: 'Consciência básica do impacto ambiental' },
        points: 2
      },
      {
        value: 'sustainable_methods',
        label: { en: 'Use sustainable research methods when possible', pt: 'Uso métodos de pesquisa sustentáveis quando possível' },
        points: 4
      },
      {
        value: 'environmental_focus',
        label: { en: 'Focus research on environmental solutions', pt: 'Foco da pesquisa em soluções ambientais' },
        points: 6
      }
    ],
    fact: {
      en: 'Research projects focused on sustainability receive 30% more funding in Brazil.',
      pt: 'Projetos de pesquisa focados em sustentabilidade recebem 30% mais financiamento no Brasil.'
    },
    priority: 2,
    isActive: true
  },

  {
    id: 'student_digital_1',
    category: ['student'],
    difficulty: 'beginner',
    question: {
      en: 'How do you manage digital resources for your studies?',
      pt: 'Como você gerencia recursos digitais para seus estudos?'
    },
    options: [
      {
        value: 'no_optimization',
        label: { en: 'No optimization - use as needed', pt: 'Sem otimização - uso conforme necessário' },
        points: 0,
        explanation: { en: 'Digital optimization can reduce energy consumption significantly', pt: 'Otimização digital pode reduzir o consumo de energia significativamente' }
      },
      {
        value: 'basic_optimization',
        label: { en: 'Basic optimization (turn off devices)', pt: 'Otimização básica (desligar dispositivos)' },
        points: 2
      },
      {
        value: 'efficient_usage',
        label: { en: 'Efficient usage (cloud storage, digital notes)', pt: 'Uso eficiente (armazenamento em nuvem, notas digitais)' },
        points: 4
      },
      {
        value: 'green_computing',
        label: { en: 'Green computing practices', pt: 'Práticas de computação verde' },
        points: 6
      }
    ],
    fact: {
      en: 'Digital education reduces paper waste by 85% and energy consumption by 40% compared to traditional methods.',
      pt: 'Educação digital reduz resíduos de papel em 85% e consumo de energia em 40% em comparação com métodos tradicionais.'
    },
    priority: 2,
    isActive: true
  },

  {
    id: 'student_food_1',
    category: ['student'],
    difficulty: 'beginner',
    question: {
      en: 'What is your approach to food consumption on campus?',
      pt: 'Qual é sua abordagem ao consumo de alimentos no campus?'
    },
    options: [
      {
        value: 'no_consideration',
        label: { en: 'No environmental consideration', pt: 'Sem consideração ambiental' },
        points: 0,
        explanation: { en: 'Food choices have significant environmental impact', pt: 'Escolhas alimentares têm impacto ambiental significativo' }
      },
      {
        value: 'avoid_waste',
        label: { en: 'Avoid food waste', pt: 'Evitar desperdício de alimentos' },
        points: 2
      },
      {
        value: 'local_organic',
        label: { en: 'Choose local and organic when possible', pt: 'Escolher local e orgânico quando possível' },
        points: 4
      },
      {
        value: 'plant_based',
        label: { en: 'Include plant-based options regularly', pt: 'Incluir opções à base de plantas regularmente' },
        points: 6
      }
    ],
    fact: {
      en: 'Plant-based meals reduce carbon footprint by 50% compared to meat-based meals.',
      pt: 'Refeições à base de plantas reduzem a pegada de carbono em 50% em comparação com refeições à base de carne.'
    },
    priority: 1,
    isActive: true
  },

  // ===== EMPLOYEE QUESTIONS (10+ questions) =====
  {
    id: 'employee_workplace_1',
    category: ['employee'],
    difficulty: 'beginner',
    question: {
      en: 'Does your workplace have environmental sustainability policies?',
      pt: 'Seu local de trabalho tem políticas de sustentabilidade ambiental?'
    },
    options: [
      {
        value: 'no',
        label: { en: 'No policies', pt: 'Sem políticas' },
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
      en: '65% of Brazilian employees work in companies with environmental policies, up from 45% in 2020.',
      pt: '65% dos funcionários brasileiros trabalham em empresas com políticas ambientais, acima de 45% em 2020.'
    },
    priority: 1,
    isActive: true
  },

  {
    id: 'employee_remote_1',
    category: ['employee'],
    difficulty: 'beginner',
    question: {
      en: 'How often do you work remotely?',
      pt: 'Com que frequência você trabalha remotamente?'
    },
    options: [
      {
        value: 'never',
        label: { en: 'Never work remotely', pt: 'Nunca trabalho remotamente' },
        points: 0,
        explanation: { en: 'Remote work can significantly reduce commuting emissions', pt: 'Trabalho remoto pode reduzir significativamente as emissões de deslocamento' }
      },
      {
        value: 'occasionally',
        label: { en: 'Occasionally (1-2 days per week)', pt: 'Ocasionalmente (1-2 dias por semana)' },
        points: 3
      },
      {
        value: 'hybrid',
        label: { en: 'Hybrid model (3-4 days remote)', pt: 'Modelo híbrido (3-4 dias remoto)' },
        points: 5
      },
      {
        value: 'fully_remote',
        label: { en: 'Fully remote', pt: 'Totalmente remoto' },
        points: 6
      }
    ],
    fact: {
      en: 'Remote work reduces carbon emissions by 54% per employee annually in Brazil.',
      pt: 'Trabalho remoto reduz emissões de carbono em 54% por funcionário anualmente no Brasil.'
    },
    priority: 1,
    isActive: true
  },

  {
    id: 'employee_energy_1',
    category: ['employee'],
    difficulty: 'intermediate',
    question: {
      en: 'How energy-efficient is your workplace?',
      pt: 'Quão eficiente em energia é seu local de trabalho?'
    },
    options: [
      {
        value: 'not_efficient',
        label: { en: 'Not energy efficient', pt: 'Não é eficiente em energia' },
        points: 0,
        explanation: { en: 'Energy efficiency can reduce costs by 20-30%', pt: 'Eficiência energética pode reduzir custos em 20-30%' }
      },
      {
        value: 'basic_efficiency',
        label: { en: 'Basic efficiency (LED lights, automatic switches)', pt: 'Eficiência básica (luzes LED, interruptores automáticos)' },
        points: 2
      },
      {
        value: 'advanced_efficiency',
        label: { en: 'Advanced efficiency (smart systems, renewable energy)', pt: 'Eficiência avançada (sistemas inteligentes, energia renovável)' },
        points: 4
      },
      {
        value: 'carbon_neutral',
        label: { en: 'Carbon-neutral operations', pt: 'Operações neutras em carbono' },
        points: 6
      }
    ],
    fact: {
      en: 'Energy-efficient workplaces in Brazil save an average of R$ 15,000 annually in energy costs.',
      pt: 'Locais de trabalho eficientes em energia no Brasil economizam em média R$ 15.000 anualmente em custos de energia.'
    },
    priority: 2,
    isActive: true
  },

  // ===== TECH INDUSTRY SPECIFIC QUESTIONS =====
  {
    id: 'tech_software_1',
    category: ['employee', 'company_owner'],
    industry: ['technology', 'software', 'tech'],
    difficulty: 'intermediate',
    question: {
      en: 'How do you optimize code for energy efficiency?',
      pt: 'Como você otimiza código para eficiência energética?'
    },
    options: [
      {
        value: 'no_optimization',
        label: { en: 'No energy optimization', pt: 'Sem otimização de energia' },
        points: 0,
        explanation: { en: 'Code optimization can reduce server energy consumption by 40%', pt: 'Otimização de código pode reduzir o consumo de energia do servidor em 40%' }
      },
      {
        value: 'basic_optimization',
        label: { en: 'Basic optimization (efficient algorithms)', pt: 'Otimização básica (algoritmos eficientes)' },
        points: 3
      },
      {
        value: 'advanced_optimization',
        label: { en: 'Advanced optimization (caching, compression)', pt: 'Otimização avançada (cache, compressão)' },
        points: 5
      },
      {
        value: 'green_coding',
        label: { en: 'Green coding practices (minimal resource usage)', pt: 'Práticas de codificação verde (uso mínimo de recursos)' },
        points: 7
      }
    ],
    fact: {
      en: 'Optimized code can reduce data center energy consumption by 40%, saving millions in energy costs.',
      pt: 'Código otimizado pode reduzir o consumo de energia do data center em 40%, economizando milhões em custos de energia.'
    },
    priority: 2,
    isActive: true
  },

  {
    id: 'tech_cloud_1',
    category: ['employee', 'company_owner'],
    industry: ['technology', 'cloud', 'saas'],
    difficulty: 'intermediate',
    question: {
      en: 'What type of cloud infrastructure does your company use?',
      pt: 'Que tipo de infraestrutura em nuvem sua empresa usa?'
    },
    options: [
      {
        value: 'traditional_hosting',
        label: { en: 'Traditional hosting (on-premise servers)', pt: 'Hospedagem tradicional (servidores locais)' },
        points: 0,
        explanation: { en: 'Cloud providers often have better energy efficiency', pt: 'Provedores de nuvem geralmente têm melhor eficiência energética' }
      },
      {
        value: 'basic_cloud',
        label: { en: 'Basic cloud services', pt: 'Serviços básicos em nuvem' },
        points: 3
      },
      {
        value: 'green_cloud',
        label: { en: 'Green cloud providers (renewable energy)', pt: 'Provedores de nuvem verde (energia renovável)' },
        points: 5
      },
      {
        value: 'carbon_neutral_cloud',
        label: { en: 'Carbon-neutral cloud infrastructure', pt: 'Infraestrutura em nuvem neutra em carbono' },
        points: 7
      }
    ],
    fact: {
      en: 'Green cloud providers use 100% renewable energy and are 30% more energy-efficient than traditional hosting.',
      pt: 'Provedores de nuvem verde usam 100% de energia renovável e são 30% mais eficientes em energia que hospedagem tradicional.'
    },
    priority: 2,
    isActive: true
  },

  {
    id: 'tech_hardware_1',
    category: ['employee', 'company_owner'],
    industry: ['technology', 'hardware', 'manufacturing'],
    difficulty: 'intermediate',
    question: {
      en: 'How does your company handle electronic waste?',
      pt: 'Como sua empresa lida com lixo eletrônico?'
    },
    options: [
      {
        value: 'no_program',
        label: { en: 'No e-waste program', pt: 'Sem programa de lixo eletrônico' },
        points: 0,
        explanation: { en: 'E-waste contains valuable materials that can be recycled', pt: 'Lixo eletrônico contém materiais valiosos que podem ser reciclados' }
      },
      {
        value: 'basic_recycling',
        label: { en: 'Basic recycling program', pt: 'Programa básico de reciclagem' },
        points: 2
      },
      {
        value: 'comprehensive_recycling',
        label: { en: 'Comprehensive e-waste management', pt: 'Gestão abrangente de lixo eletrônico' },
        points: 4
      },
      {
        value: 'circular_economy',
        label: { en: 'Circular economy approach (repair, reuse, recycle)', pt: 'Abordagem de economia circular (consertar, reutilizar, reciclar)' },
        points: 6
      }
    ],
    fact: {
      en: 'Only 3% of electronic waste in Brazil is properly recycled. Proper recycling can recover 95% of valuable materials.',
      pt: 'Apenas 3% do lixo eletrônico no Brasil é reciclado adequadamente. Reciclagem adequada pode recuperar 95% dos materiais valiosos.'
    },
    priority: 2,
    isActive: true
  },

  {
    id: 'tech_remote_work_1',
    category: ['employee', 'company_owner'],
    industry: ['technology', 'software', 'tech'],
    difficulty: 'beginner',
    question: {
      en: 'What is your company\'s approach to remote work and digital collaboration?',
      pt: 'Qual é a abordagem da sua empresa para trabalho remoto e colaboração digital?'
    },
    options: [
      {
        value: 'no_remote',
        label: { en: 'No remote work allowed', pt: 'Trabalho remoto não permitido' },
        points: 0,
        explanation: { en: 'Remote work can significantly reduce commuting emissions', pt: 'Trabalho remoto pode reduzir significativamente as emissões de deslocamento' }
      },
      {
        value: 'hybrid_model',
        label: { en: 'Hybrid model (part remote, part office)', pt: 'Modelo híbrido (parte remoto, parte escritório)' },
        points: 3
      },
      {
        value: 'fully_remote',
        label: { en: 'Fully remote with digital tools', pt: 'Totalmente remoto com ferramentas digitais' },
        points: 5
      },
      {
        value: 'digital_first',
        label: { en: 'Digital-first approach with sustainability focus', pt: 'Abordagem digital-first com foco em sustentabilidade' },
        points: 7
      }
    ],
    fact: {
      en: 'Tech companies with remote work policies reduce their carbon footprint by 54% per employee annually.',
      pt: 'Empresas de tecnologia com políticas de trabalho remoto reduzem sua pegada de carbono em 54% por funcionário anualmente.'
    },
    priority: 1,
    isActive: true
  },

  {
    id: 'tech_development_1',
    category: ['employee', 'company_owner'],
    industry: ['technology', 'software', 'tech'],
    difficulty: 'intermediate',
    question: {
      en: 'How does your development team approach sustainable software practices?',
      pt: 'Como sua equipe de desenvolvimento aborda práticas de software sustentável?'
    },
    options: [
      {
        value: 'no_consideration',
        label: { en: 'No sustainability consideration', pt: 'Sem consideração de sustentabilidade' },
        points: 0,
        explanation: { en: 'Sustainable software practices can reduce energy consumption significantly', pt: 'Práticas de software sustentável podem reduzir o consumo de energia significativamente' }
      },
      {
        value: 'basic_optimization',
        label: { en: 'Basic code optimization', pt: 'Otimização básica de código' },
        points: 2
      },
      {
        value: 'green_development',
        label: { en: 'Green development practices', pt: 'Práticas de desenvolvimento verde' },
        points: 4
      },
      {
        value: 'sustainable_architecture',
        label: { en: 'Sustainable architecture and design patterns', pt: 'Arquitetura sustentável e padrões de design' },
        points: 6
      }
    ],
    fact: {
      en: 'Sustainable software development can reduce server energy consumption by 40% and improve performance by 25%.',
      pt: 'Desenvolvimento de software sustentável pode reduzir o consumo de energia do servidor em 40% e melhorar o desempenho em 25%.'
    },
    priority: 2,
    isActive: true
  },

  {
    id: 'tech_data_1',
    category: ['employee', 'company_owner'],
    industry: ['technology', 'software', 'tech'],
    difficulty: 'intermediate',
    question: {
      en: 'How does your company manage data storage and processing efficiency?',
      pt: 'Como sua empresa gerencia eficiência de armazenamento e processamento de dados?'
    },
    options: [
      {
        value: 'no_optimization',
        label: { en: 'No data optimization', pt: 'Sem otimização de dados' },
        points: 0,
        explanation: { en: 'Data optimization can significantly reduce energy consumption', pt: 'Otimização de dados pode reduzir significativamente o consumo de energia' }
      },
      {
        value: 'basic_optimization',
        label: { en: 'Basic data optimization', pt: 'Otimização básica de dados' },
        points: 2
      },
      {
        value: 'advanced_optimization',
        label: { en: 'Advanced data optimization and compression', pt: 'Otimização avançada e compressão de dados' },
        points: 4
      },
      {
        value: 'green_data',
        label: { en: 'Green data practices with minimal footprint', pt: 'Práticas de dados verdes com pegada mínima' },
        points: 6
      }
    ],
    fact: {
      en: 'Optimized data storage can reduce energy consumption by 60% and improve system performance by 30%.',
      pt: 'Armazenamento de dados otimizado pode reduzir o consumo de energia em 60% e melhorar o desempenho do sistema em 30%.'
    },
    priority: 2,
    isActive: true
  },

  // ===== FINANCE INDUSTRY QUESTIONS =====
  {
    id: 'finance_esg_1',
    category: ['employee', 'company_owner'],
    industry: ['finance', 'banking', 'investment'],
    difficulty: 'intermediate',
    question: {
      en: 'How does your organization approach ESG investments?',
      pt: 'Como sua organização aborda investimentos ESG?'
    },
    options: [
      {
        value: 'no_esg',
        label: { en: 'No ESG consideration', pt: 'Sem consideração ESG' },
        points: 0,
        explanation: { en: 'ESG investments often perform better and reduce risk', pt: 'Investimentos ESG frequentemente têm melhor desempenho e reduzem risco' }
      },
      {
        value: 'basic_esg',
        label: { en: 'Basic ESG screening', pt: 'Triagem ESG básica' },
        points: 3
      },
      {
        value: 'integrated_esg',
        label: { en: 'Integrated ESG analysis', pt: 'Análise ESG integrada' },
        points: 5
      },
      {
        value: 'impact_investing',
        label: { en: 'Impact investing focus', pt: 'Foco em investimento de impacto' },
        points: 7
      }
    ],
    fact: {
      en: 'ESG investments in Brazil grew 156% in 2023, with 23% higher returns than traditional investments.',
      pt: 'Investimentos ESG no Brasil cresceram 156% em 2023, com 23% de retornos maiores que investimentos tradicionais.'
    },
    priority: 2,
    isActive: true
  },

  // ===== GENERAL QUESTIONS FOR ALL CATEGORIES =====
  {
    id: 'general_transport_1',
    category: ['student', 'employee', 'company_owner', 'government'],
    difficulty: 'beginner',
    question: {
      en: 'How do you typically commute to work or school?',
      pt: 'Como você normalmente se desloca para o trabalho ou escola?'
    },
    options: [
      {
        value: 'car',
        label: { en: 'Personal car', pt: 'Carro pessoal' },
        points: 0,
        explanation: { en: 'Consider carpooling or public transport to reduce emissions', pt: 'Considere carona solidária ou transporte público para reduzir emissões' }
      },
      {
        value: 'public',
        label: { en: 'Public transportation', pt: 'Transporte público' },
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
      },
      {
        value: 'carpool',
        label: { en: 'Carpooling', pt: 'Carona solidária' },
        points: 3
      }
    ],
    fact: {
      en: 'Sustainable transport reduces CO2 emissions by 40% compared to driving alone.',
      pt: 'Transporte sustentável reduz emissões de CO2 em 40% em comparação com dirigir sozinho.'
    },
    priority: 1,
    isActive: true
  },

  {
    id: 'general_energy_1',
    category: ['student', 'employee', 'company_owner', 'government'],
    difficulty: 'beginner',
    question: {
      en: 'How energy-efficient is your home or workplace?',
      pt: 'Quão eficiente em energia é sua casa ou local de trabalho?'
    },
    options: [
      {
        value: 'not_efficient',
        label: { en: 'Not energy efficient', pt: 'Não é eficiente em energia' },
        points: 0,
        explanation: { en: 'Energy efficiency can reduce costs by 20-30%', pt: 'Eficiência energética pode reduzir custos em 20-30%' }
      },
      {
        value: 'basic_efficiency',
        label: { en: 'Basic efficiency (LED lights, automatic switches)', pt: 'Eficiência básica (luzes LED, interruptores automáticos)' },
        points: 2
      },
      {
        value: 'advanced_efficiency',
        label: { en: 'Advanced efficiency (smart systems, renewable energy)', pt: 'Eficiência avançada (sistemas inteligentes, energia renovável)' },
        points: 4
      },
      {
        value: 'carbon_neutral',
        label: { en: 'Carbon-neutral operations', pt: 'Operações neutras em carbono' },
        points: 6
      }
    ],
    fact: {
      en: 'Energy-efficient buildings in Brazil save an average of R$ 15,000 annually in energy costs.',
      pt: 'Edifícios eficientes em energia no Brasil economizam em média R$ 15.000 anualmente em custos de energia.'
    },
    priority: 1,
    isActive: true
  },

  {
    id: 'general_waste_1',
    category: ['student', 'employee', 'company_owner', 'government'],
    difficulty: 'beginner',
    question: {
      en: 'How do you handle waste and recycling?',
      pt: 'Como você lida com resíduos e reciclagem?'
    },
    options: [
      {
        value: 'no_separation',
        label: { en: 'No separation - throw everything together', pt: 'Sem separação - jogo tudo junto' },
        points: 0,
        explanation: { en: 'Start with basic recycling - paper, plastic, and organic waste', pt: 'Comece com reciclagem básica - papel, plástico e resíduos orgânicos' }
      },
      {
        value: 'basic_recycling',
        label: { en: 'Basic recycling (paper, plastic)', pt: 'Reciclagem básica (papel, plástico)' },
        points: 3
      },
      {
        value: 'comprehensive',
        label: { en: 'Comprehensive separation (paper, plastic, organic, electronics)', pt: 'Separação abrangente (papel, plástico, orgânico, eletrônicos)' },
        points: 5
      },
      {
        value: 'zero_waste',
        label: { en: 'Zero waste approach - minimize all waste', pt: 'Abordagem lixo zero - minimizar todos os resíduos' },
        points: 7
      }
    ],
    fact: {
      en: 'Proper waste separation can reduce landfill waste by 60% and recover valuable materials.',
      pt: 'Separação adequada de resíduos pode reduzir resíduos em aterros em 60% e recuperar materiais valiosos.'
    },
    priority: 1,
    isActive: true
  },

  {
    id: 'general_consumption_1',
    category: ['student', 'employee', 'company_owner', 'government'],
    difficulty: 'beginner',
    question: {
      en: 'How do you approach sustainable consumption?',
      pt: 'Como você aborda o consumo sustentável?'
    },
    options: [
      {
        value: 'no_consideration',
        label: { en: 'No environmental consideration', pt: 'Sem consideração ambiental' },
        points: 0,
        explanation: { en: 'Sustainable consumption can reduce environmental impact significantly', pt: 'Consumo sustentável pode reduzir o impacto ambiental significativamente' }
      },
      {
        value: 'avoid_waste',
        label: { en: 'Avoid waste and overconsumption', pt: 'Evitar desperdício e superconsumo' },
        points: 2
      },
      {
        value: 'choose_sustainable',
        label: { en: 'Choose sustainable products when possible', pt: 'Escolher produtos sustentáveis quando possível' },
        points: 4
      },
      {
        value: 'minimal_consumption',
        label: { en: 'Minimal consumption lifestyle', pt: 'Estilo de vida de consumo mínimo' },
        points: 6
      }
    ],
    fact: {
      en: 'Sustainable consumption can reduce your carbon footprint by 30% and save money.',
      pt: 'Consumo sustentável pode reduzir sua pegada de carbono em 30% e economizar dinheiro.'
    },
    priority: 1,
    isActive: true
  },

  {
    id: 'general_awareness_1',
    category: ['student', 'employee', 'company_owner', 'government'],
    difficulty: 'beginner',
    question: {
      en: 'How informed are you about environmental issues?',
      pt: 'Quão informado você está sobre questões ambientais?'
    },
    options: [
      {
        value: 'not_informed',
        label: { en: 'Not very informed', pt: 'Não muito informado' },
        points: 0,
        explanation: { en: 'Education is the first step to making positive changes', pt: 'Educação é o primeiro passo para fazer mudanças positivas' }
      },
      {
        value: 'basic_knowledge',
        label: { en: 'Basic knowledge of environmental issues', pt: 'Conhecimento básico de questões ambientais' },
        points: 2
      },
      {
        value: 'well_informed',
        label: { en: 'Well informed about environmental topics', pt: 'Bem informado sobre tópicos ambientais' },
        points: 4
      },
      {
        value: 'actively_learning',
        label: { en: 'Actively learning and staying updated', pt: 'Aprendendo ativamente e mantendo-se atualizado' },
        points: 6
      }
    ],
    fact: {
      en: 'Environmental awareness has increased 67% among Brazilians in the last 5 years.',
      pt: 'A consciência ambiental aumentou 67% entre os brasileiros nos últimos 5 anos.'
    },
    priority: 1,
    isActive: true
  },

  // ===== HEALTHCARE INDUSTRY QUESTIONS =====
  {
    id: 'healthcare_waste_1',
    category: ['employee', 'company_owner'],
    industry: ['healthcare', 'medical', 'hospital'],
    difficulty: 'intermediate',
    question: {
      en: 'How does your healthcare facility manage medical waste?',
      pt: 'Como sua instalação de saúde gerencia resíduos médicos?'
    },
    options: [
      {
        value: 'basic_disposal',
        label: { en: 'Basic disposal methods', pt: 'Métodos básicos de descarte' },
        points: 0,
        explanation: { en: 'Proper medical waste management is crucial for public health', pt: 'Gestão adequada de resíduos médicos é crucial para a saúde pública' }
      },
      {
        value: 'proper_separation',
        label: { en: 'Proper separation and disposal', pt: 'Separação e descarte adequados' },
        points: 3
      },
      {
        value: 'advanced_treatment',
        label: { en: 'Advanced treatment and recycling', pt: 'Tratamento avançado e reciclagem' },
        points: 5
      },
      {
        value: 'zero_waste',
        label: { en: 'Zero waste healthcare approach', pt: 'Abordagem de saúde lixo zero' },
        points: 7
      }
    ],
    fact: {
      en: 'Brazilian hospitals generate 2.5 million tons of medical waste annually. Proper management can reduce this by 70%.',
      pt: 'Hospitais brasileiros geram 2,5 milhões de toneladas de resíduos médicos anualmente. Gestão adequada pode reduzir isso em 70%.'
    },
    priority: 2,
    isActive: true
  },

  // ===== COMPANY OWNER QUESTIONS (10+ questions) =====
  {
    id: 'owner_energy_1',
    category: ['company_owner'],
    difficulty: 'intermediate',
    question: {
      en: 'What percentage of your business operations use renewable energy?',
      pt: 'Que porcentagem das suas operações comerciais usa energia renovável?'
    },
    options: [
      {
        value: '0',
        label: { en: '0% - No renewable energy', pt: '0% - Sem energia renovável' },
        points: 0,
        explanation: { en: 'Renewable energy can reduce costs by 30% and improve brand reputation', pt: 'Energia renovável pode reduzir custos em 30% e melhorar a reputação da marca' }
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
      en: 'Brazilian companies with strong ESG practices show 23% higher profitability and 40% better employee retention.',
      pt: 'Empresas brasileiras com fortes práticas ESG mostram 23% maior lucratividade e 40% melhor retenção de funcionários.'
    },
    priority: 1,
    isActive: true
  },

  {
    id: 'owner_supply_chain_1',
    category: ['company_owner'],
    difficulty: 'advanced',
    question: {
      en: 'How sustainable is your supply chain?',
      pt: 'Quão sustentável é sua cadeia de suprimentos?'
    },
    options: [
      {
        value: 'no_consideration',
        label: { en: 'No sustainability consideration', pt: 'Sem consideração de sustentabilidade' },
        points: 0,
        explanation: { en: 'Sustainable supply chains reduce risks and improve efficiency', pt: 'Cadeias de suprimentos sustentáveis reduzem riscos e melhoram eficiência' }
      },
      {
        value: 'basic_assessment',
        label: { en: 'Basic sustainability assessment', pt: 'Avaliação básica de sustentabilidade' },
        points: 2
      },
      {
        value: 'sustainable_partners',
        label: { en: 'Work with sustainable partners', pt: 'Trabalhar com parceiros sustentáveis' },
        points: 4
      },
      {
        value: 'circular_supply',
        label: { en: 'Circular supply chain approach', pt: 'Abordagem de cadeia de suprimentos circular' },
        points: 6
      }
    ],
    fact: {
      en: 'Sustainable supply chains reduce costs by 15% and improve customer satisfaction by 25%.',
      pt: 'Cadeias de suprimentos sustentáveis reduzem custos em 15% e melhoram a satisfação do cliente em 25%.'
    },
    priority: 2,
    isActive: true
  },

  // ===== GOVERNMENT QUESTIONS (10+ questions) =====
  {
    id: 'government_policy_1',
    category: ['government'],
    difficulty: 'advanced',
    question: {
      en: 'How involved are you in implementing environmental policies?',
      pt: 'Como você está envolvido na implementação de políticas ambientais?'
    },
    options: [
      {
        value: 'not_involved',
        label: { en: 'Not involved in environmental policies', pt: 'Não envolvido em políticas ambientais' },
        points: 0,
        explanation: { en: 'Environmental policies can improve public health and economic efficiency', pt: 'Políticas ambientais podem melhorar a saúde pública e eficiência econômica' }
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

  {
    id: 'government_procurement_1',
    category: ['government'],
    difficulty: 'intermediate',
    question: {
      en: 'Does your government institution have green procurement policies?',
      pt: 'Sua instituição governamental tem políticas de compras verdes?'
    },
    options: [
      {
        value: 'no',
        label: { en: 'No green procurement', pt: 'Sem compras verdes' },
        points: 0,
        explanation: { en: 'Green procurement can save money and reduce environmental impact', pt: 'Compras verdes podem economizar dinheiro e reduzir impacto ambiental' }
      },
      {
        value: 'basic',
        label: { en: 'Basic green procurement', pt: 'Compras verdes básicas' },
        points: 3
      },
      {
        value: 'comprehensive',
        label: { en: 'Comprehensive green procurement program', pt: 'Programa abrangente de compras verdes' },
        points: 5
      },
      {
        value: 'leading',
        label: { en: 'Leading green procurement practices', pt: 'Práticas líderes em compras verdes' },
        points: 7
      }
    ],
    fact: {
      en: 'Green government procurement in Brazil saves R$ 2.1 billion annually and reduces emissions by 15%.',
      pt: 'Compras governamentais verdes no Brasil economizam R$ 2,1 bilhões anualmente e reduzem emissões em 15%.'
    },
    priority: 2,
    isActive: true
  }
];

// Function to get personalized questions for a user
export const getPersonalizedQuestions = (user: User, count: number = 10): SurveyQuestion[] => {
  let relevantQuestions: SurveyQuestion[] = [];
  
  // Step 1: Get category-specific questions (always include these)
  const categoryQuestions = sampleSurveyQuestions.filter(q => 
    q.category.includes(user.category) && !q.industry // Only general category questions
  );
  relevantQuestions.push(...categoryQuestions);

  // Step 2: Get industry-specific questions (only if user has industry)
  if (user.industry) {
    const industryQuestions = sampleSurveyQuestions.filter(q => 
      q.industry && q.industry.some(ind => 
        user.industry!.toLowerCase().includes(ind.toLowerCase())
      )
    );
    relevantQuestions.push(...industryQuestions);
  }

  // Step 3: Get location-specific questions
  const locationQuestions = sampleSurveyQuestions.filter(q => 
    q.location && (q.location.includes(user.state) || q.location.includes(user.city))
  );
  relevantQuestions.push(...locationQuestions);

  // Step 4: Get interest-based questions
  if (user.sustainabilityInterests) {
    user.sustainabilityInterests.forEach(interest => {
      const interestQuestions = sampleSurveyQuestions.filter(q => 
        q.interests && q.interests.includes(interest)
      );
      relevantQuestions.push(...interestQuestions);
    });
  }

  // Step 5: Remove duplicates and sort by priority
  const uniqueQuestions = relevantQuestions.filter((q, index, self) => 
    index === self.findIndex(question => question.id === q.id)
  );

  const sortedQuestions = uniqueQuestions.sort((a, b) => b.priority - a.priority);

  // Step 6: Ensure we have at least 10 questions
  if (sortedQuestions.length < count) {
    // Add more general questions to reach the minimum
    const generalQuestions = sampleSurveyQuestions.filter(q => 
      !sortedQuestions.find(existing => existing.id === q.id)
    );
    const additionalQuestions = generalQuestions
      .sort((a, b) => b.priority - a.priority)
      .slice(0, count - sortedQuestions.length);
    
    sortedQuestions.push(...additionalQuestions);
  }

  // Return exactly the requested number of questions
  return sortedQuestions.slice(0, count);
};

// Function to get questions by difficulty
export const getQuestionsByDifficulty = (
  questions: SurveyQuestion[], 
  difficulty: 'beginner' | 'intermediate' | 'advanced'
): SurveyQuestion[] => {
  return questions.filter(q => q.difficulty === difficulty);
};

// Function to calculate survey score with personalized weighting
export const calculateSurveyScore = (responses: SurveyResponse[], user: User): number => {
  let baseScore = responses.reduce((total, response) => total + response.points, 0);
  
  // Calculate maximum possible score (6 points per question)
  const maxPossibleScore = responses.length * 6;
  
  // Apply user-specific multipliers (but cap at max possible score)
  let multiplier = 1.0;
  
  // Industry-specific multipliers (reduced to prevent exceeding max score)
  if (user.industry) {
    if (user.industry.toLowerCase().includes('technology')) {
      multiplier *= 1.05; // Tech companies get 5% bonus (reduced from 10%)
    } else if (user.industry.toLowerCase().includes('finance')) {
      multiplier *= 1.03; // Finance gets 3% bonus (reduced from 5%)
    } else if (user.industry.toLowerCase().includes('healthcare')) {
      multiplier *= 1.04; // Healthcare gets 4% bonus (reduced from 8%)
    }
  }
  
  // Category-specific multipliers (reduced to prevent exceeding max score)
  if (user.category === 'government') {
    multiplier *= 1.08; // Government gets 8% bonus (reduced from 15%)
  } else if (user.category === 'company_owner') {
    multiplier *= 1.06; // Company owners get 6% bonus (reduced from 12%)
  }
  
  // Location-specific bonuses (reduced to prevent exceeding max score)
  if (user.state === 'SP' || user.city === 'São Paulo') {
    multiplier *= 1.02; // São Paulo gets 2% bonus (reduced from 5%)
  }
  
  // Calculate final score but cap it at maximum possible
  const finalScore = Math.round(baseScore * multiplier);
  return Math.min(finalScore, maxPossibleScore);
};

// Function to determine level based on score
export const getLevelFromScore = (score: number): { level: string; badge: string } => {
  if (score >= 80) {
    return { level: 'champion', badge: '🏆' };
  } else if (score >= 60) {
    return { level: 'leader', badge: '🌟' };
  } else if (score >= 40) {
    return { level: 'active', badge: '⚡' };
  } else if (score >= 20) {
    return { level: 'aware', badge: '🌱' };
  } else {
    return { level: 'beginner', badge: '🌿' };
  }
};