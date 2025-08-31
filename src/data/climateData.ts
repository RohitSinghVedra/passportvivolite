import type { ClimateData, UserCategory } from '../types';

export const climateData: Record<UserCategory, ClimateData> = {
  student: {
    category: 'student',
    title: {
      en: 'Climate Education Impact',
      pt: 'Impacto da Educação Climática'
    },
    description: {
      en: 'As a student, you\'re part of Brazil\'s future climate leadership. Your generation will drive the transition to sustainability.',
      pt: 'Como estudante, você faz parte da futura liderança climática do Brasil. Sua geração impulsionará a transição para a sustentabilidade.'
    },
    stats: [
      {
        label: { en: 'Young people engaged in climate action', pt: 'Jovens engajados em ação climática' },
        value: '23%',
        trend: 'up'
      },
      {
        label: { en: 'Universities with sustainability programs', pt: 'Universidades com programas de sustentabilidade' },
        value: '67%',
        trend: 'up'
      },
      {
        label: { en: 'Student-led environmental initiatives', pt: 'Iniciativas ambientais lideradas por estudantes' },
        value: '+45%',
        trend: 'up'
      }
    ]
  },
  employee: {
    category: 'employee',
    title: {
      en: 'Workplace Climate Action',
      pt: 'Ação Climática no Trabalho'
    },
    description: {
      en: 'Employees are key drivers of corporate sustainability. Your actions and advocacy can transform workplace practices.',
      pt: 'Funcionários são peças-chave da sustentabilidade corporativa. Suas ações e advocacia podem transformar práticas no local de trabalho.'
    },
    stats: [
      {
        label: { en: 'Companies with climate commitments', pt: 'Empresas com compromissos climáticos' },
        value: '34%',
        trend: 'up'
      },
      {
        label: { en: 'Employees wanting greener workplaces', pt: 'Funcionários que desejam locais de trabalho mais verdes' },
        value: '78%',
        trend: 'up'
      },
      {
        label: { en: 'Remote work CO2 reduction', pt: 'Redução de CO2 com trabalho remoto' },
        value: '-41%',
        trend: 'down'
      }
    ]
  },
  company_owner: {
    category: 'company_owner',
    title: {
      en: 'Business Climate Leadership',
      pt: 'Liderança Climática Empresarial'
    },
    description: {
      en: 'As a business owner, you have direct power to implement sustainable practices and lead by example in your industry.',
      pt: 'Como proprietário de empresa, você tem poder direto para implementar práticas sustentáveis e liderar pelo exemplo em seu setor.'
    },
    stats: [
      {
        label: { en: 'Brazilian companies adopting ESG', pt: 'Empresas brasileiras adotando ESG' },
        value: '52%',
        trend: 'up'
      },
      {
        label: { en: 'Cost reduction from efficiency', pt: 'Redução de custos por eficiência' },
        value: '18%',
        trend: 'down'
      },
      {
        label: { en: 'Revenue from green products', pt: 'Receita de produtos verdes' },
        value: '+62%',
        trend: 'up'
      }
    ]
  },
  government: {
    category: 'government',
    title: {
      en: 'Public Policy Impact',
      pt: 'Impacto de Políticas Públicas'
    },
    description: {
      en: 'Government administrators shape climate policy and public awareness. Your decisions affect millions of Brazilians.',
      pt: 'Administradores públicos moldam políticas climáticas e conscientização pública. Suas decisões afetam milhões de brasileiros.'
    },
    stats: [
      {
        label: { en: 'Cities with climate plans', pt: 'Cidades com planos climáticos' },
        value: '28%',
        trend: 'up'
      },
      {
        label: { en: 'Public investment in renewables', pt: 'Investimento público em renováveis' },
        value: 'R$ 45B',
        trend: 'up'
      },
      {
        label: { en: 'Forest protection programs', pt: 'Programas de proteção florestal' },
        value: '+34%',
        trend: 'up'
      }
    ]
  }
};