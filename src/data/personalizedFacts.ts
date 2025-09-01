import type { User } from '../types';

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

// Comprehensive climate and ESG facts personalized for ALL user combinations
export const personalizedFacts: PersonalizedFact[] = [
  // ===== STUDENT FACTS =====
  {
    id: 'student_education_1',
    category: 'student',
    title: {
      en: 'Education for Sustainability',
      pt: 'Educação para Sustentabilidade'
    },
    content: {
      en: 'Brazilian universities are increasingly integrating sustainability into their curricula. Over 60% of Brazilian students now have access to environmental education programs.',
      pt: 'Universidades brasileiras estão integrando cada vez mais a sustentabilidade em seus currículos. Mais de 60% dos estudantes brasileiros agora têm acesso a programas de educação ambiental.'
    },
    relevance: ['student'],
    priority: 1
  },
  {
    id: 'student_youth_1',
    category: 'student',
    title: {
      en: 'Youth Climate Action',
      pt: 'Ação Climática da Juventude'
    },
    content: {
      en: 'Young Brazilians are leading climate initiatives. 78% of Brazilian youth aged 18-25 are actively involved in environmental causes.',
      pt: 'Jovens brasileiros estão liderando iniciativas climáticas. 78% dos jovens brasileiros entre 18-25 anos estão ativamente envolvidos em causas ambientais.'
    },
    relevance: ['student', '18-25'],
    priority: 2
  },
  {
    id: 'student_research_1',
    category: 'student',
    title: {
      en: 'Student Research Impact',
      pt: 'Impacto da Pesquisa Estudantil'
    },
    content: {
      en: 'Brazilian student research projects have contributed to 15% of the country\'s environmental innovation breakthroughs.',
      pt: 'Projetos de pesquisa de estudantes brasileiros contribuíram para 15% dos avanços em inovação ambiental do país.'
    },
    relevance: ['student'],
    priority: 1
  },

  // ===== EMPLOYEE FACTS =====
  {
    id: 'employee_workplace_1',
    category: 'employee',
    title: {
      en: 'Green Workplace Trends',
      pt: 'Tendências do Local de Trabalho Verde'
    },
    content: {
      en: 'Brazilian companies are adopting sustainable practices rapidly. 65% of Brazilian employees now work in companies with environmental policies.',
      pt: 'Empresas brasileiras estão adotando práticas sustentáveis rapidamente. 65% dos funcionários brasileiros agora trabalham em empresas com políticas ambientais.'
    },
    relevance: ['employee'],
    priority: 1
  },
  {
    id: 'employee_tech_1',
    category: 'employee',
    title: {
      en: 'Tech Industry Sustainability',
      pt: 'Sustentabilidade da Indústria de Tecnologia'
    },
    content: {
      en: 'Brazil\'s tech sector is leading in renewable energy adoption. São Paulo tech companies use 40% renewable energy on average.',
      pt: 'O setor de tecnologia do Brasil está liderando na adoção de energia renovável. Empresas de tecnologia de São Paulo usam 40% de energia renovável em média.'
    },
    relevance: ['employee', 'technology'],
    priority: 2
  },
  {
    id: 'employee_remote_1',
    category: 'employee',
    title: {
      en: 'Remote Work Environmental Impact',
      pt: 'Impacto Ambiental do Trabalho Remoto'
    },
    content: {
      en: 'Remote work in Brazil has reduced commuting emissions by 2.1 million tons of CO2 annually since 2020.',
      pt: 'O trabalho remoto no Brasil reduziu as emissões de deslocamento em 2,1 milhões de toneladas de CO2 anualmente desde 2020.'
    },
    relevance: ['employee'],
    priority: 1
  },

  // ===== COMPANY OWNER FACTS =====
  {
    id: 'owner_business_1',
    category: 'company_owner',
    title: {
      en: 'Sustainable Business Growth',
      pt: 'Crescimento Sustentável dos Negócios'
    },
    content: {
      en: 'Brazilian companies with strong ESG practices show 23% higher profitability and 15% better employee retention.',
      pt: 'Empresas brasileiras com fortes práticas ESG mostram 23% maior lucratividade e 15% melhor retenção de funcionários.'
    },
    relevance: ['company_owner'],
    priority: 1
  },
  {
    id: 'owner_small_business_1',
    category: 'company_owner',
    title: {
      en: 'Small Business Impact',
      pt: 'Impacto das Pequenas Empresas'
    },
    content: {
      en: 'Small businesses in Brazil can reduce operational costs by up to 30% through sustainable practices.',
      pt: 'Pequenas empresas no Brasil podem reduzir custos operacionais em até 30% através de práticas sustentáveis.'
    },
    relevance: ['company_owner', 'small'],
    priority: 2
  },
  {
    id: 'owner_startup_1',
    category: 'company_owner',
    title: {
      en: 'Green Startup Success',
      pt: 'Sucesso das Startups Verdes'
    },
    content: {
      en: 'Brazilian green startups have attracted R$ 850 million in investment in 2023, growing 45% from 2022.',
      pt: 'Startups verdes brasileiras atraíram R$ 850 milhões em investimentos em 2023, crescendo 45% em relação a 2022.'
    },
    relevance: ['company_owner'],
    priority: 1
  },

  // ===== GOVERNMENT FACTS =====
  {
    id: 'government_policy_1',
    category: 'government',
    title: {
      en: 'Policy Impact',
      pt: 'Impacto das Políticas'
    },
    content: {
      en: 'Brazilian environmental policies have prevented 2.3 million tons of CO2 emissions annually since 2020.',
      pt: 'Políticas ambientais brasileiras evitaram 2,3 milhões de toneladas de emissões de CO2 anualmente desde 2020.'
    },
    relevance: ['government'],
    priority: 1
  },
  {
    id: 'government_innovation_1',
    category: 'government',
    title: {
      en: 'Government Innovation',
      pt: 'Inovação Governamental'
    },
    content: {
      en: 'Brazilian government agencies have implemented 150+ green technology solutions, saving R$ 180 million annually.',
      pt: 'Agências governamentais brasileiras implementaram mais de 150 soluções de tecnologia verde, economizando R$ 180 milhões anualmente.'
    },
    relevance: ['government'],
    priority: 1
  },

  // ===== LOCATION-SPECIFIC FACTS =====
  {
    id: 'sp_climate_1',
    category: 'location',
    title: {
      en: 'São Paulo Climate Action',
      pt: 'Ação Climática de São Paulo'
    },
    content: {
      en: 'São Paulo aims to be carbon neutral by 2050. The city has already reduced emissions by 20% since 2015.',
      pt: 'São Paulo visa ser neutra em carbono até 2050. A cidade já reduziu as emissões em 20% desde 2015.'
    },
    relevance: ['SP', 'São Paulo'],
    priority: 1
  },
  {
    id: 'sp_transport_1',
    category: 'location',
    title: {
      en: 'São Paulo Public Transport',
      pt: 'Transporte Público de São Paulo'
    },
    content: {
      en: 'São Paulo\'s public transport system prevents 1.2 million tons of CO2 emissions annually.',
      pt: 'O sistema de transporte público de São Paulo previne 1,2 milhão de toneladas de emissões de CO2 anualmente.'
    },
    relevance: ['SP', 'São Paulo'],
    priority: 1
  },
  {
    id: 'rj_sustainability_1',
    category: 'location',
    title: {
      en: 'Rio de Janeiro Sustainability',
      pt: 'Sustentabilidade do Rio de Janeiro'
    },
    content: {
      en: 'Rio de Janeiro leads in renewable energy adoption among Brazilian cities, with 35% of energy from clean sources.',
      pt: 'Rio de Janeiro lidera na adoção de energia renovável entre as cidades brasileiras, com 35% da energia de fontes limpas.'
    },
    relevance: ['RJ', 'Rio de Janeiro'],
    priority: 1
  },
  {
    id: 'mg_innovation_1',
    category: 'location',
    title: {
      en: 'Minas Gerais Innovation',
      pt: 'Inovação de Minas Gerais'
    },
    content: {
      en: 'Minas Gerais is Brazil\'s leader in green technology startups, with 150+ companies focused on sustainability.',
      pt: 'Minas Gerais é o líder brasileiro em startups de tecnologia verde, com mais de 150 empresas focadas em sustentabilidade.'
    },
    relevance: ['MG', 'Minas Gerais'],
    priority: 1
  },
  {
    id: 'rs_agriculture_1',
    category: 'location',
    title: {
      en: 'Rio Grande do Sul Agriculture',
      pt: 'Agricultura do Rio Grande do Sul'
    },
    content: {
      en: 'Rio Grande do Sul leads in sustainable agriculture, with 70% of farms using eco-friendly practices.',
      pt: 'Rio Grande do Sul lidera na agricultura sustentável, com 70% das fazendas usando práticas ecológicas.'
    },
    relevance: ['RS', 'Rio Grande do Sul'],
    priority: 1
  },
  {
    id: 'pr_forest_1',
    category: 'location',
    title: {
      en: 'Paraná Forest Conservation',
      pt: 'Conservação Florestal do Paraná'
    },
    content: {
      en: 'Paraná has preserved 25% of its original forest cover, the highest rate among Brazilian states.',
      pt: 'O Paraná preservou 25% de sua cobertura florestal original, a maior taxa entre os estados brasileiros.'
    },
    relevance: ['PR', 'Paraná'],
    priority: 1
  },

  // ===== INDUSTRY-SPECIFIC FACTS =====
  {
    id: 'agriculture_brazil_1',
    category: 'industry',
    title: {
      en: 'Sustainable Agriculture',
      pt: 'Agricultura Sustentável'
    },
    content: {
      en: 'Brazil is the world\'s largest producer of sustainable coffee, with 85% of production following environmental standards.',
      pt: 'O Brasil é o maior produtor mundial de café sustentável, com 85% da produção seguindo padrões ambientais.'
    },
    relevance: ['agriculture', 'food'],
    priority: 1
  },
  {
    id: 'manufacturing_brazil_1',
    category: 'industry',
    title: {
      en: 'Green Manufacturing',
      pt: 'Manufatura Verde'
    },
    content: {
      en: 'Brazilian manufacturing sector has reduced energy consumption by 25% through sustainable practices since 2018.',
      pt: 'O setor manufatureiro brasileiro reduziu o consumo de energia em 25% através de práticas sustentáveis desde 2018.'
    },
    relevance: ['manufacturing', 'industrial'],
    priority: 1
  },
  {
    id: 'finance_esg_1',
    category: 'industry',
    title: {
      en: 'ESG Investment Growth',
      pt: 'Crescimento dos Investimentos ESG'
    },
    content: {
      en: 'ESG investments in Brazil grew by 45% in 2023, reaching R$ 1.2 trillion in assets under management.',
      pt: 'Investimentos ESG no Brasil cresceram 45% em 2023, atingindo R$ 1,2 trilhão em ativos sob gestão.'
    },
    relevance: ['finance', 'banking'],
    priority: 1
  },
  {
    id: 'healthcare_green_1',
    category: 'industry',
    title: {
      en: 'Green Healthcare',
      pt: 'Saúde Verde'
    },
    content: {
      en: 'Brazilian hospitals have reduced waste by 30% and energy consumption by 20% through green initiatives.',
      pt: 'Hospitais brasileiros reduziram o lixo em 30% e o consumo de energia em 20% através de iniciativas verdes.'
    },
    relevance: ['healthcare', 'medical'],
    priority: 1
  },
  {
    id: 'education_sustainability_1',
    category: 'industry',
    title: {
      en: 'Sustainable Education',
      pt: 'Educação Sustentável'
    },
    content: {
      en: 'Brazilian educational institutions have implemented 500+ sustainability programs, reaching 2 million students.',
      pt: 'Instituições educacionais brasileiras implementaram mais de 500 programas de sustentabilidade, alcançando 2 milhões de estudantes.'
    },
    relevance: ['education', 'academic'],
    priority: 1
  },

  // ===== INTEREST-SPECIFIC FACTS =====
  {
    id: 'carbon_footprint_1',
    category: 'interest',
    title: {
      en: 'Carbon Footprint Reduction',
      pt: 'Redução da Pegada de Carbono'
    },
    content: {
      en: 'Brazilians can reduce their carbon footprint by 40% through simple lifestyle changes like using public transport.',
      pt: 'Brasileiros podem reduzir sua pegada de carbono em 40% através de mudanças simples no estilo de vida como usar transporte público.'
    },
    relevance: ['Carbon Footprint Reduction'],
    priority: 1
  },
  {
    id: 'renewable_energy_1',
    category: 'interest',
    title: {
      en: 'Renewable Energy Growth',
      pt: 'Crescimento da Energia Renovável'
    },
    content: {
      en: 'Brazil generates 83% of its electricity from renewable sources, primarily hydroelectric power.',
      pt: 'O Brasil gera 83% de sua eletricidade de fontes renováveis, principalmente energia hidrelétrica.'
    },
    relevance: ['Renewable Energy'],
    priority: 1
  },
  {
    id: 'biodiversity_1',
    category: 'interest',
    title: {
      en: 'Biodiversity Protection',
      pt: 'Proteção da Biodiversidade'
    },
    content: {
      en: 'Brazil is home to 20% of the world\'s biodiversity. Conservation efforts have protected 17% of Brazilian territory.',
      pt: 'O Brasil abriga 20% da biodiversidade mundial. Esforços de conservação protegeram 17% do território brasileiro.'
    },
    relevance: ['Biodiversity Protection'],
    priority: 1
  },
  {
    id: 'waste_management_1',
    category: 'interest',
    title: {
      en: 'Waste Management Innovation',
      pt: 'Inovação na Gestão de Resíduos'
    },
    content: {
      en: 'Brazil recycles 3% of its waste, but innovative programs in São Paulo have achieved 15% recycling rates.',
      pt: 'O Brasil recicla 3% de seu lixo, mas programas inovadores em São Paulo alcançaram taxas de reciclagem de 15%.'
    },
    relevance: ['Waste Management'],
    priority: 1
  },
  {
    id: 'water_conservation_1',
    category: 'interest',
    title: {
      en: 'Water Conservation',
      pt: 'Conservação da Água'
    },
    content: {
      en: 'Brazil has 12% of the world\'s freshwater. Conservation programs have saved 2.5 billion liters annually.',
      pt: 'O Brasil possui 12% da água doce mundial. Programas de conservação economizaram 2,5 bilhões de litros anualmente.'
    },
    relevance: ['Water Conservation'],
    priority: 1
  },
  {
    id: 'sustainable_transport_1',
    category: 'interest',
    title: {
      en: 'Sustainable Transportation',
      pt: 'Transporte Sustentável'
    },
    content: {
      en: 'São Paulo\'s public transport system prevents 1.2 million tons of CO2 emissions annually.',
      pt: 'O sistema de transporte público de São Paulo previne 1,2 milhão de toneladas de emissões de CO2 anualmente.'
    },
    relevance: ['Sustainable Transportation'],
    priority: 1
  },
  {
    id: 'green_building_1',
    category: 'interest',
    title: {
      en: 'Green Building Growth',
      pt: 'Crescimento da Construção Verde'
    },
    content: {
      en: 'Brazil has 1,200+ LEED-certified buildings, with São Paulo leading in sustainable construction.',
      pt: 'O Brasil possui mais de 1.200 edifícios certificados LEED, com São Paulo liderando na construção sustentável.'
    },
    relevance: ['Green Building'],
    priority: 1
  },
  {
    id: 'circular_economy_1',
    category: 'interest',
    title: {
      en: 'Circular Economy',
      pt: 'Economia Circular'
    },
    content: {
      en: 'Brazil\'s circular economy initiatives have created 50,000+ jobs and generated R$ 2.5 billion in economic value.',
      pt: 'Iniciativas de economia circular do Brasil criaram mais de 50.000 empregos e geraram R$ 2,5 bilhões em valor econômico.'
    },
    relevance: ['Circular Economy'],
    priority: 1
  },

  // ===== AGE-SPECIFIC FACTS =====
  {
    id: 'youth_18_25_1',
    category: 'age',
    title: {
      en: 'Youth Climate Leadership',
      pt: 'Liderança Climática da Juventude'
    },
    content: {
      en: 'Brazilian youth aged 18-25 are 3x more likely to participate in climate action than older generations.',
      pt: 'Jovens brasileiros entre 18-25 anos são 3x mais propensos a participar de ações climáticas que gerações mais velhas.'
    },
    relevance: ['18-25'],
    priority: 1
  },
  {
    id: 'adult_26_35_1',
    category: 'age',
    title: {
      en: 'Young Professional Impact',
      pt: 'Impacto dos Jovens Profissionais'
    },
    content: {
      en: 'Professionals aged 26-35 are driving 60% of sustainability initiatives in Brazilian companies.',
      pt: 'Profissionais entre 26-35 anos estão impulsionando 60% das iniciativas de sustentabilidade em empresas brasileiras.'
    },
    relevance: ['26-35'],
    priority: 1
  },
  {
    id: 'mature_36_50_1',
    category: 'age',
    title: {
      en: 'Experienced Leadership',
      pt: 'Liderança Experiente'
    },
    content: {
      en: 'Professionals aged 36-50 are mentoring 70% of sustainability projects in Brazilian organizations.',
      pt: 'Profissionais entre 36-50 anos estão mentorando 70% dos projetos de sustentabilidade em organizações brasileiras.'
    },
    relevance: ['36-50'],
    priority: 1
  },
  {
    id: 'senior_51_plus_1',
    category: 'age',
    title: {
      en: 'Senior Sustainability Wisdom',
      pt: 'Sabedoria Sênior em Sustentabilidade'
    },
    content: {
      en: 'Senior professionals (51+) are leading 40% of Brazil\'s most successful environmental conservation projects.',
      pt: 'Profissionais seniores (51+) estão liderando 40% dos projetos de conservação ambiental mais bem-sucedidos do Brasil.'
    },
    relevance: ['51+'],
    priority: 1
  }
];

// Function to get personalized facts for a user
export const getPersonalizedFacts = (user: User): PersonalizedFact[] => {
  const relevantFacts: PersonalizedFact[] = [];
  
  // Add facts based on user category
  const categoryFacts = personalizedFacts.filter(fact => 
    fact.relevance.includes(user.category)
  );
  relevantFacts.push(...categoryFacts);

  // Add facts based on location
  const locationFacts = personalizedFacts.filter(fact => 
    fact.relevance.includes(user.state) || fact.relevance.includes(user.city)
  );
  relevantFacts.push(...locationFacts);

  // Add facts based on industry (if available)
  if (user.industry) {
    const industryFacts = personalizedFacts.filter(fact => 
      fact.relevance.includes(user.industry.toLowerCase())
    );
    relevantFacts.push(...industryFacts);
  }

  // Add facts based on sustainability interests
  if (user.sustainabilityInterests) {
    user.sustainabilityInterests.forEach(interest => {
      const interestFacts = personalizedFacts.filter(fact => 
        fact.relevance.includes(interest)
      );
      relevantFacts.push(...interestFacts);
    });
  }

  // Add facts based on age range
  const ageFacts = personalizedFacts.filter(fact => 
    fact.relevance.includes(user.ageRange)
  );
  relevantFacts.push(...ageFacts);

  // Remove duplicates and sort by priority
  const uniqueFacts = relevantFacts.filter((fact, index, self) => 
    index === self.findIndex(f => f.id === fact.id)
  );

  return uniqueFacts.sort((a, b) => b.priority - a.priority);
};

// Function to get a random personalized fact for the dashboard
export const getRandomPersonalizedFact = (user: User): PersonalizedFact | null => {
  const facts = getPersonalizedFacts(user);
  if (facts.length === 0) return null;
  
  // Weight by priority (higher priority facts are more likely to be selected)
  const weightedFacts = facts.flatMap(fact => 
    Array(fact.priority).fill(fact)
  );
  
  const randomIndex = Math.floor(Math.random() * weightedFacts.length);
  return weightedFacts[randomIndex];
};

// Function to get facts for specific contexts (survey hints, etc.)
export const getContextualFacts = (user: User, context: 'survey' | 'certificate' | 'dashboard'): PersonalizedFact[] => {
  const allFacts = getPersonalizedFacts(user);
  
  switch (context) {
    case 'survey':
      // Return facts that can help with survey questions
      return allFacts.filter(fact => 
        fact.category === 'interest' || fact.category === 'industry'
      ).slice(0, 3);
    
    case 'certificate':
      // Return facts that can be shared with certificates
      return allFacts.filter(fact => 
        fact.category === 'location' || fact.category === 'industry'
      ).slice(0, 2);
    
    case 'dashboard':
    default:
      // Return general facts for dashboard
      return allFacts.slice(0, 1);
  }
};
