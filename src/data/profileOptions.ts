import type { Language } from '../types';

export interface ProfileOption {
  value: string;
  label: Record<Language, string>;
}

export const companySizes: ProfileOption[] = [
  { value: 'micro', label: { en: 'Micro (1-9 employees)', pt: 'Micro (1-9 funcionários)' } },
  { value: 'small', label: { en: 'Small (10-49 employees)', pt: 'Pequena (10-49 funcionários)' } },
  { value: 'medium', label: { en: 'Medium (50-249 employees)', pt: 'Média (50-249 funcionários)' } },
  { value: 'large', label: { en: 'Large (250+ employees)', pt: 'Grande (250+ funcionários)' } },
  { value: 'not_applicable', label: { en: 'Not applicable', pt: 'Não se aplica' } }
];

export const industries: ProfileOption[] = [
  { value: 'agriculture', label: { en: 'Agriculture & Food', pt: 'Agricultura e Alimentação' } },
  { value: 'automotive', label: { en: 'Automotive', pt: 'Automotivo' } },
  { value: 'construction', label: { en: 'Construction', pt: 'Construção' } },
  { value: 'education', label: { en: 'Education', pt: 'Educação' } },
  { value: 'energy', label: { en: 'Energy & Utilities', pt: 'Energia e Serviços Públicos' } },
  { value: 'finance', label: { en: 'Finance & Banking', pt: 'Finanças e Bancos' } },
  { value: 'healthcare', label: { en: 'Healthcare', pt: 'Saúde' } },
  { value: 'manufacturing', label: { en: 'Manufacturing', pt: 'Manufatura' } },
  { value: 'retail', label: { en: 'Retail & Commerce', pt: 'Varejo e Comércio' } },
  { value: 'technology', label: { en: 'Technology', pt: 'Tecnologia' } },
  { value: 'transportation', label: { en: 'Transportation & Logistics', pt: 'Transporte e Logística' } },
  { value: 'other', label: { en: 'Other', pt: 'Outro' } }
];

export const sustainabilityInterests: ProfileOption[] = [
  { value: 'carbon_footprint', label: { en: 'Carbon Footprint Reduction', pt: 'Redução da Pegada de Carbono' } },
  { value: 'renewable_energy', label: { en: 'Renewable Energy', pt: 'Energia Renovável' } },
  { value: 'waste_management', label: { en: 'Waste Management', pt: 'Gestão de Resíduos' } },
  { value: 'water_conservation', label: { en: 'Water Conservation', pt: 'Conservação da Água' } },
  { value: 'sustainable_transport', label: { en: 'Sustainable Transportation', pt: 'Transporte Sustentável' } },
  { value: 'green_building', label: { en: 'Green Building', pt: 'Construção Verde' } },
  { value: 'biodiversity', label: { en: 'Biodiversity Protection', pt: 'Proteção da Biodiversidade' } },
  { value: 'circular_economy', label: { en: 'Circular Economy', pt: 'Economia Circular' } }
];

export const educationLevels: ProfileOption[] = [
  { value: 'elementary', label: { en: 'Elementary School', pt: 'Ensino Fundamental' } },
  { value: 'high_school', label: { en: 'High School', pt: 'Ensino Médio' } },
  { value: 'technical', label: { en: 'Technical/Vocational', pt: 'Técnico/Profissionalizante' } },
  { value: 'undergraduate', label: { en: 'Undergraduate', pt: 'Graduação' } },
  { value: 'graduate', label: { en: 'Graduate/Postgraduate', pt: 'Pós-graduação' } },
  { value: 'doctorate', label: { en: 'Doctorate/PhD', pt: 'Doutorado/PhD' } }
];

export const governmentLevels: ProfileOption[] = [
  { value: 'municipal', label: { en: 'Municipal', pt: 'Municipal' } },
  { value: 'state', label: { en: 'State', pt: 'Estadual' } },
  { value: 'federal', label: { en: 'Federal', pt: 'Federal' } },
  { value: 'legislative', label: { en: 'Legislative', pt: 'Legislativo' } },
  { value: 'judiciary', label: { en: 'Judiciary', pt: 'Judiciário' } }
];

export const ageRanges: ProfileOption[] = [
  { value: 'under-18', label: { en: 'Under 18', pt: 'Menor de 18' } },
  { value: '18-25', label: { en: '18-25', pt: '18-25' } },
  { value: '26-35', label: { en: '26-35', pt: '26-35' } },
  { value: '36-45', label: { en: '36-45', pt: '36-45' } },
  { value: '46-55', label: { en: '46-55', pt: '46-55' } },
  { value: '56-65', label: { en: '56-65', pt: '56-65' } },
  { value: 'over-65', label: { en: 'Over 65', pt: 'Acima de 65' } }
];
