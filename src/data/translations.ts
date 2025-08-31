import type { Language } from '../types';

export const translations: Record<string, Record<Language, string>> = {
  // Navigation & General
  'app.title': { en: 'Passaporte VIVO', pt: 'Passaporte VIVO' },
  'app.tagline': { en: 'Your Climate Action Journey', pt: 'Sua Jornada de Ação Climática' },
  'language.en': { en: 'English', pt: 'Inglês' },
  'language.pt': { en: 'Portuguese', pt: 'Português' },
  'continue': { en: 'Continue', pt: 'Continuar' },
  'next': { en: 'Next', pt: 'Próximo' },
  'back': { en: 'Back', pt: 'Voltar' },
  'complete': { en: 'Complete', pt: 'Concluir' },
  'share': { en: 'Share', pt: 'Compartilhar' },
  'download': { en: 'Download', pt: 'Baixar' },

  // Navigation
  'nav.home': { en: 'Home', pt: 'Início' },
  'nav.survey': { en: 'Survey', pt: 'Questionário' },
  'nav.me': { en: 'Me', pt: 'Eu' },
  'nav.dashboard': { en: 'My Dashboard', pt: 'Meu Painel' },
  'nav.certificates': { en: 'My Certificates', pt: 'Meus Certificados' },
  'nav.history': { en: 'History', pt: 'Histórico' },
  'nav.settings': { en: 'Settings', pt: 'Configurações' },

  // Dashboard
  'dashboard.welcome': { en: 'Welcome back', pt: 'Bem-vindo(a) de volta' },
  'dashboard.latest_level': { en: 'Latest level', pt: 'Nível mais recente' },
  'dashboard.view_result': { en: 'View Result', pt: 'Ver Resultado' },
  'dashboard.manage_certificate': { en: 'Manage Certificate', pt: 'Gerenciar Certificado' },
  'dashboard.start_assessment': { en: 'Start Assessment', pt: 'Iniciar Avaliação' },
  'dashboard.climate_score': { en: 'Climate Score', pt: 'Pontuação Climática' },
  'dashboard.recent_certificates': { en: 'Recent Certificates', pt: 'Certificados Recentes' },
  'dashboard.view_all': { en: 'View All', pt: 'Ver Todos' },
  'dashboard.no_certificates': { en: 'No certificates yet', pt: 'Ainda sem certificados' },
  'dashboard.no_certificates_desc': { en: 'Complete your climate assessment to earn your first certificate', pt: 'Complete sua avaliação climática para ganhar seu primeiro certificado' },

  // Certificates
  'certificate.public': { en: 'Public', pt: 'Público' },
  'certificate.private': { en: 'Private', pt: 'Privado' },
  'certificate.view': { en: 'View', pt: 'Ver' },
  'certificate.make_public': { en: 'Make Public', pt: 'Tornar Público' },
  'certificate.make_private': { en: 'Make Private', pt: 'Tornar Privado' },
  'certificates.empty_title': { en: 'No certificates yet', pt: 'Ainda sem certificados' },
  'certificates.empty_desc': { en: 'Complete your climate assessment to earn your first certificate', pt: 'Complete sua avaliação climática para ganhar seu primeiro certificado' },

  // History
  'history.view_answers': { en: 'View Answers', pt: 'Ver Respostas' },
  'history.retake': { en: 'Retake', pt: 'Refazer' },
  'history.retake_confirm_title': { en: 'Retake Survey?', pt: 'Refazer Questionário?' },
  'history.retake_confirm_desc': { en: 'This will start a new assessment. Your previous results will be saved in history.', pt: 'Isso iniciará uma nova avaliação. Seus resultados anteriores serão salvos no histórico.' },
  'history.empty_title': { en: 'No survey history', pt: 'Sem histórico de questionários' },
  'history.empty_desc': { en: 'Complete your first climate assessment to see your history here', pt: 'Complete sua primeira avaliação climática para ver seu histórico aqui' },

  // Common
  'common.cancel': { en: 'Cancel', pt: 'Cancelar' },
  'common.confirm': { en: 'Confirm', pt: 'Confirmar' },

  // Authentication
  'auth.welcome': { en: 'Welcome to Passaporte VIVO', pt: 'Bem-vindo ao Passaporte VIVO' },
  'auth.subtitle': { en: 'Discover your role in Brazil\'s climate transition', pt: 'Descubra seu papel na transição climática do Brasil' },
  'auth.email': { en: 'Email', pt: 'E-mail' },
  'auth.password': { en: 'Password', pt: 'Senha' },
  'auth.signin': { en: 'Sign In', pt: 'Entrar' },
  'auth.signup': { en: 'Sign Up', pt: 'Cadastrar' },
  'auth.signout': { en: 'Sign Out', pt: 'Sair' },
  'auth.google': { en: 'Continue with Google', pt: 'Continuar com Google' },
  'auth.apple': { en: 'Continue with Apple', pt: 'Continuar com Apple' },
  'auth.or': { en: 'or', pt: 'ou' },

  // Onboarding
  'onboarding.title': { en: 'Let\'s personalize your experience', pt: 'Vamos personalizar sua experiência' },
  'onboarding.subtitle': { en: 'Choose your category to receive tailored climate insights', pt: 'Escolha sua categoria para receber insights climáticos personalizados' },
  'category.student': { en: 'Student', pt: 'Estudante' },
  'category.employee': { en: 'Employee', pt: 'Funcionário' },
  'category.company_owner': { en: 'Company Owner', pt: 'Proprietário de Empresa' },
  'category.government': { en: 'Government Administrator', pt: 'Administrador Público' },

  // Climate Data
  'climate.title': { en: 'Climate Impact in Brazil', pt: 'Impacto Climático no Brasil' },
  'climate.subtitle': { en: 'Understanding the current situation', pt: 'Entendendo a situação atual' },

  // Survey
  'survey.title': { en: 'Climate Action Assessment', pt: 'Avaliação de Ação Climática' },
  'survey.subtitle': { en: 'Answer 10 questions to discover your climate impact', pt: 'Responda 10 perguntas para descobrir seu impacto climático' },
  'survey.question': { en: 'Question', pt: 'Pergunta' },
  'survey.select': { en: 'Select an option...', pt: 'Selecione uma opção...' },

  // Results
  'results.title': { en: 'Your Climate Role', pt: 'Seu Papel Climático' },
  'results.score': { en: 'Climate Score', pt: 'Pontuação Climática' },
  'results.level': { en: 'Level', pt: 'Nível' },
  'results.recommendations': { en: 'Recommended Actions', pt: 'Ações Recomendadas' },

  // Certificate
  'certificate.title': { en: 'Climate Role Certificate', pt: 'Certificado de Papel Climático' },
  'certificate.issued': { en: 'Issued on', pt: 'Emitido em' },
  'certificate.verified': { en: 'Verified by Passaporte VIVO', pt: 'Verificado pelo Passaporte VIVO' },

  // Levels
  'level.beginner': { en: 'Climate Beginner', pt: 'Iniciante Climático' },
  'level.aware': { en: 'Climate Aware', pt: 'Consciente Climático' },
  'level.active': { en: 'Climate Active', pt: 'Ativo Climático' },
  'level.leader': { en: 'Climate Leader', pt: 'Líder Climático' },
  'level.champion': { en: 'Climate Champion', pt: 'Campeão Climático' },
};