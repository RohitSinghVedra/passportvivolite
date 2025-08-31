import type { Recommendation, UserCategory } from '../types';

export const recommendations: Record<UserCategory, Recommendation[]> = {
  student: [
    {
      id: 'student-1',
      title: {
        en: 'Join Environmental Student Groups',
        pt: 'Participe de Grupos Estudantis Ambientais'
      },
      description: {
        en: 'Connect with like-minded peers and organize campus sustainability initiatives.',
        pt: 'Conecte-se com colegas com ideias similares e organize iniciativas de sustentabilidade no campus.'
      },
      priority: 'high',
      category: ['student']
    },
    {
      id: 'student-2',
      title: {
        en: 'Choose Sustainable Courses',
        pt: 'Escolha Disciplinas Sustentáveis'
      },
      description: {
        en: 'Enroll in environmental science, renewable energy, or sustainability courses.',
        pt: 'Inscreva-se em cursos de ciências ambientais, energia renovável ou sustentabilidade.'
      },
      priority: 'medium',
      category: ['student']
    },
    {
      id: 'student-3',
      title: {
        en: 'Start a Green Project',
        pt: 'Inicie um Projeto Verde'
      },
      description: {
        en: 'Create a campus recycling program or organize climate awareness events.',
        pt: 'Crie um programa de reciclagem no campus ou organize eventos de conscientização climática.'
      },
      priority: 'high',
      category: ['student']
    }
  ],
  employee: [
    {
      id: 'employee-1',
      title: {
        en: 'Propose Green Office Initiatives',
        pt: 'Proponha Iniciativas de Escritório Verde'
      },
      description: {
        en: 'Suggest recycling programs, energy-saving measures, or remote work policies.',
        pt: 'Sugira programas de reciclagem, medidas de economia de energia ou políticas de trabalho remoto.'
      },
      priority: 'high',
      category: ['employee']
    },
    {
      id: 'employee-2',
      title: {
        en: 'Optimize Your Commute',
        pt: 'Otimize Seu Deslocamento'
      },
      description: {
        en: 'Use public transport, carpool, or negotiate remote work days.',
        pt: 'Use transporte público, compartilhe carona ou negocie dias de trabalho remoto.'
      },
      priority: 'medium',
      category: ['employee']
    },
    {
      id: 'employee-3',
      title: {
        en: 'Join Sustainability Committees',
        pt: 'Participe de Comitês de Sustentabilidade'
      },
      description: {
        en: 'Advocate for environmental policies within your organization.',
        pt: 'Defenda políticas ambientais dentro de sua organização.'
      },
      priority: 'high',
      category: ['employee']
    }
  ],
  company_owner: [
    {
      id: 'owner-1',
      title: {
        en: 'Implement Energy Efficiency',
        pt: 'Implemente Eficiência Energética'
      },
      description: {
        en: 'Switch to LED lighting, optimize HVAC systems, and consider solar panels.',
        pt: 'Mude para iluminação LED, otimize sistemas de ar condicionado e considere painéis solares.'
      },
      priority: 'high',
      category: ['company_owner']
    },
    {
      id: 'owner-2',
      title: {
        en: 'Adopt Circular Economy Practices',
        pt: 'Adote Práticas de Economia Circular'
      },
      description: {
        en: 'Reduce waste, reuse materials, and create sustainable supply chains.',
        pt: 'Reduza resíduos, reutilize materiais e crie cadeias de suprimento sustentáveis.'
      },
      priority: 'medium',
      category: ['company_owner']
    },
    {
      id: 'owner-3',
      title: {
        en: 'Set Science-Based Targets',
        pt: 'Estabeleça Metas Baseadas em Ciência'
      },
      description: {
        en: 'Commit to measurable carbon reduction goals aligned with Paris Agreement.',
        pt: 'Comprometa-se com metas mensuráveis de redução de carbono alinhadas ao Acordo de Paris.'
      },
      priority: 'high',
      category: ['company_owner']
    }
  ],
  government: [
    {
      id: 'gov-1',
      title: {
        en: 'Develop Climate Action Plans',
        pt: 'Desenvolva Planos de Ação Climática'
      },
      description: {
        en: 'Create comprehensive municipal or regional climate strategies with measurable targets.',
        pt: 'Crie estratégias climáticas municipais ou regionais abrangentes com metas mensuráveis.'
      },
      priority: 'high',
      category: ['government']
    },
    {
      id: 'gov-2',
      title: {
        en: 'Invest in Public Transportation',
        pt: 'Invista em Transporte Público'
      },
      description: {
        en: 'Expand and electrify public transit systems to reduce urban emissions.',
        pt: 'Expanda e eletrifica sistemas de transporte público para reduzir emissões urbanas.'
      },
      priority: 'high',
      category: ['government']
    },
    {
      id: 'gov-3',
      title: {
        en: 'Support Green Business Incentives',
        pt: 'Apoie Incentivos para Negócios Verdes'
      },
      description: {
        en: 'Create tax benefits and grants for companies adopting sustainable practices.',
        pt: 'Crie benefícios fiscais e subsídios para empresas que adotam práticas sustentáveis.'
      },
      priority: 'medium',
      category: ['government']
    }
  ]
};