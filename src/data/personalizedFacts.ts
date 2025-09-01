import type { User } from '../types';

export interface PersonalizedFact {
  id: string;
  category: string;
  title: string;
  content: string;
  source?: string;
  relevance: string[];
  priority: number;
}

// Climate and ESG facts personalized for different user profiles
export const personalizedFacts: PersonalizedFact[] = [
  // Student-focused facts
  {
    id: 'student_education_1',
    category: 'student',
    title: 'Education for Sustainability',
    content: 'Brazilian universities are increasingly integrating sustainability into their curricula. Over 60% of Brazilian students now have access to environmental education programs.',
    relevance: ['student'],
    priority: 1
  },
  {
    id: 'student_youth_1',
    category: 'student',
    title: 'Youth Climate Action',
    content: 'Young Brazilians are leading climate initiatives. 78% of Brazilian youth aged 18-25 are actively involved in environmental causes.',
    relevance: ['student', '18-25'],
    priority: 2
  },

  // Employee-focused facts
  {
    id: 'employee_workplace_1',
    category: 'employee',
    title: 'Green Workplace Trends',
    content: 'Brazilian companies are adopting sustainable practices rapidly. 65% of Brazilian employees now work in companies with environmental policies.',
    relevance: ['employee'],
    priority: 1
  },
  {
    id: 'employee_tech_1',
    category: 'employee',
    title: 'Tech Industry Sustainability',
    content: 'Brazil\'s tech sector is leading in renewable energy adoption. São Paulo tech companies use 40% renewable energy on average.',
    relevance: ['employee', 'technology'],
    priority: 2
  },

  // Company owner facts
  {
    id: 'owner_business_1',
    category: 'company_owner',
    title: 'Sustainable Business Growth',
    content: 'Brazilian companies with strong ESG practices show 23% higher profitability and 15% better employee retention.',
    relevance: ['company_owner'],
    priority: 1
  },
  {
    id: 'owner_small_business_1',
    category: 'company_owner',
    title: 'Small Business Impact',
    content: 'Small businesses in Brazil can reduce operational costs by up to 30% through sustainable practices.',
    relevance: ['company_owner', 'small'],
    priority: 2
  },

  // Government facts
  {
    id: 'government_policy_1',
    category: 'government',
    title: 'Policy Impact',
    content: 'Brazilian environmental policies have prevented 2.3 million tons of CO2 emissions annually since 2020.',
    relevance: ['government'],
    priority: 1
  },

  // Location-specific facts
  {
    id: 'sp_climate_1',
    category: 'location',
    title: 'São Paulo Climate Action',
    content: 'São Paulo aims to be carbon neutral by 2050. The city has already reduced emissions by 20% since 2015.',
    relevance: ['SP', 'São Paulo'],
    priority: 1
  },
  {
    id: 'rj_sustainability_1',
    category: 'location',
    title: 'Rio de Janeiro Sustainability',
    content: 'Rio de Janeiro leads in renewable energy adoption among Brazilian cities, with 35% of energy from clean sources.',
    relevance: ['RJ', 'Rio de Janeiro'],
    priority: 1
  },
  {
    id: 'mg_innovation_1',
    category: 'location',
    title: 'Minas Gerais Innovation',
    content: 'Minas Gerais is Brazil\'s leader in green technology startups, with 150+ companies focused on sustainability.',
    relevance: ['MG', 'Minas Gerais'],
    priority: 1
  },

  // Industry-specific facts
  {
    id: 'agriculture_brazil_1',
    category: 'industry',
    title: 'Sustainable Agriculture',
    content: 'Brazil is the world\'s largest producer of sustainable coffee, with 85% of production following environmental standards.',
    relevance: ['agriculture', 'food'],
    priority: 1
  },
  {
    id: 'manufacturing_brazil_1',
    category: 'industry',
    title: 'Green Manufacturing',
    content: 'Brazilian manufacturing sector has reduced energy consumption by 25% through sustainable practices since 2018.',
    relevance: ['manufacturing', 'industrial'],
    priority: 1
  },
  {
    id: 'finance_esg_1',
    category: 'industry',
    title: 'ESG Investment Growth',
    content: 'ESG investments in Brazil grew by 45% in 2023, reaching R$ 1.2 trillion in assets under management.',
    relevance: ['finance', 'banking'],
    priority: 1
  },

  // Interest-specific facts
  {
    id: 'carbon_footprint_1',
    category: 'interest',
    title: 'Carbon Footprint Reduction',
    content: 'Brazilians can reduce their carbon footprint by 40% through simple lifestyle changes like using public transport.',
    relevance: ['Carbon Footprint Reduction'],
    priority: 1
  },
  {
    id: 'renewable_energy_1',
    category: 'interest',
    title: 'Renewable Energy Growth',
    content: 'Brazil generates 83% of its electricity from renewable sources, primarily hydroelectric power.',
    relevance: ['Renewable Energy'],
    priority: 1
  },
  {
    id: 'biodiversity_1',
    category: 'interest',
    title: 'Biodiversity Protection',
    content: 'Brazil is home to 20% of the world\'s biodiversity. Conservation efforts have protected 17% of Brazilian territory.',
    relevance: ['Biodiversity Protection'],
    priority: 1
  },
  {
    id: 'waste_management_1',
    category: 'interest',
    title: 'Waste Management Innovation',
    content: 'Brazil recycles 3% of its waste, but innovative programs in São Paulo have achieved 15% recycling rates.',
    relevance: ['Waste Management'],
    priority: 1
  },
  {
    id: 'water_conservation_1',
    category: 'interest',
    title: 'Water Conservation',
    content: 'Brazil has 12% of the world\'s freshwater. Conservation programs have saved 2.5 billion liters annually.',
    relevance: ['Water Conservation'],
    priority: 1
  },
  {
    id: 'sustainable_transport_1',
    category: 'interest',
    title: 'Sustainable Transportation',
    content: 'São Paulo\'s public transport system prevents 1.2 million tons of CO2 emissions annually.',
    relevance: ['Sustainable Transportation'],
    priority: 1
  },
  {
    id: 'green_building_1',
    category: 'interest',
    title: 'Green Building Growth',
    content: 'Brazil has 1,200+ LEED-certified buildings, with São Paulo leading in sustainable construction.',
    relevance: ['Green Building'],
    priority: 1
  },
  {
    id: 'circular_economy_1',
    category: 'interest',
    title: 'Circular Economy',
    content: 'Brazil\'s circular economy initiatives have created 50,000+ jobs and generated R$ 2.5 billion in economic value.',
    relevance: ['Circular Economy'],
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
