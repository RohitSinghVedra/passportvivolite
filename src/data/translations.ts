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
  
  // Profile & Settings
  'profile.basic_info': { en: 'Basic Information', pt: 'Informações Básicas' },
  'profile.professional_info': { en: 'Professional Information', pt: 'Informações Profissionais' },
  'profile.sustainability_interests': { en: 'Sustainability Interests', pt: 'Interesses em Sustentabilidade' },
  'profile.account_info': { en: 'Account Information', pt: 'Informações da Conta' },
  'profile.name': { en: 'Name', pt: 'Nome' },
  'profile.email': { en: 'Email', pt: 'E-mail' },
  'profile.role': { en: 'Role', pt: 'Papel' },
  'profile.age_range': { en: 'Age Range', pt: 'Faixa Etária' },
  'profile.location': { en: 'Location', pt: 'Localização' },
  'profile.language': { en: 'Language', pt: 'Idioma' },
  'profile.organization': { en: 'Organization', pt: 'Organização' },
  'profile.position': { en: 'Position', pt: 'Cargo' },
  'profile.industry': { en: 'Industry', pt: 'Setor' },
  'profile.company_size': { en: 'Company Size', pt: 'Tamanho da Empresa' },
  'profile.education_level': { en: 'Education Level', pt: 'Nível de Educação' },
  'profile.government_level': { en: 'Government Level', pt: 'Nível Governamental' },
  'profile.certificate_visibility': { en: 'Certificate Visibility', pt: 'Visibilidade do Certificado' },
  'profile.member_since': { en: 'Member Since', pt: 'Membro Desde' },
  'profile.last_activity': { en: 'Last Activity', pt: 'Última Atividade' },
  'profile.account_status': { en: 'Account Status', pt: 'Status da Conta' },
  'profile.complete': { en: 'Profile Complete', pt: 'Perfil Completo' },
  'profile.incomplete': { en: 'Profile Incomplete', pt: 'Perfil Incompleto' },
  'profile.public': { en: 'Public', pt: 'Público' },
  'profile.private': { en: 'Private', pt: 'Privado' },
  
  // Form Labels & Placeholders
  'form.full_name': { en: 'Full Name', pt: 'Nome Completo' },
  'form.enter_full_name': { en: 'Enter your full name', pt: 'Digite seu nome completo' },
  'form.your_role': { en: 'Your Role', pt: 'Seu Papel' },
  'form.select_role': { en: 'Select your role...', pt: 'Selecione seu papel...' },
  'form.state': { en: 'State', pt: 'Estado' },
  'form.select_state': { en: 'Select your state...', pt: 'Selecione seu estado...' },
  'form.city': { en: 'City', pt: 'Cidade' },
  'form.select_city': { en: 'Select your city...', pt: 'Selecione sua cidade...' },
  'form.select_age_range': { en: 'Select age range...', pt: 'Selecione a faixa etária...' },
  'form.organization_name': { en: 'Organization Name', pt: 'Nome da Organização' },
  'form.your_company': { en: 'Your company/organization', pt: 'Sua empresa/organização' },
  'form.position_role': { en: 'Position/Role', pt: 'Cargo/Função' },
  'form.your_position': { en: 'Your position', pt: 'Seu cargo' },
  'form.industry_sector': { en: 'Industry Sector', pt: 'Setor Industrial' },
  'form.select_industry': { en: 'Select industry...', pt: 'Selecione o setor...' },
  'form.select_company_size': { en: 'Select company size...', pt: 'Selecione o tamanho...' },
  'form.government_institution': { en: 'Government Institution', pt: 'Instituição Governamental' },
  'form.ministry_secretariat': { en: 'Ministry, secretariat, etc.', pt: 'Ministério, secretaria, etc.' },
  'form.select_level': { en: 'Select level...', pt: 'Selecione o nível...' },
  'form.select_education': { en: 'Select education level...', pt: 'Selecione o nível...' },
  'form.sustainability_optional': { en: 'Sustainability Interests (Optional)', pt: 'Interesses em Sustentabilidade (Opcional)' },
  'form.enter_email': { en: 'Enter your email', pt: 'Digite seu e-mail' },
  'form.enter_password': { en: 'Enter your password', pt: 'Digite sua senha' },
  
  // Validation Messages
  'validation.name_required': { en: 'Name is required', pt: 'Nome é obrigatório' },
  'validation.email_required': { en: 'Email is required', pt: 'E-mail é obrigatório' },
  'validation.password_required': { en: 'Password is required', pt: 'Senha é obrigatória' },
  'validation.select_role': { en: 'Please select your role', pt: 'Por favor, selecione seu papel' },
  'validation.select_state': { en: 'Please select your state', pt: 'Por favor, selecione seu estado' },
  'validation.select_city': { en: 'Please select your city', pt: 'Por favor, selecione sua cidade' },
  'validation.select_age_range': { en: 'Please select your age range', pt: 'Por favor, selecione sua faixa etária' },
  'validation.select_industry': { en: 'Please select your industry', pt: 'Por favor, selecione seu setor' },
  'validation.select_company_size': { en: 'Please select company size', pt: 'Por favor, selecione o tamanho da empresa' },
  'validation.select_education': { en: 'Please select your education level', pt: 'Por favor, selecione seu nível de educação' },
  'validation.select_government': { en: 'Please select government level', pt: 'Por favor, selecione o nível governamental' },
  'validation.enter_email_password': { en: 'Please enter email and password', pt: 'Por favor, insira email e senha' },
  'validation.error_occurred': { en: 'An error occurred. Please try again.', pt: 'Ocorreu um erro. Tente novamente.' },
  
  // Auth & Profile Completion
  'auth.start_journey': { en: 'Start Your Journey', pt: 'Comece Sua Jornada' },
  'auth.get_started': { en: 'Get Started', pt: 'Comece Agora' },
  'auth.join_passaporte': { en: 'Join Passaporte VIVO', pt: 'Junte-se ao Passaporte VIVO' },
  'auth.welcome_back': { en: 'Welcome Back', pt: 'Bem-vindo de Volta' },
  'auth.start_climate_journey': { en: 'Start your climate action journey', pt: 'Comece sua jornada de ação climática' },
  'auth.continue_climate_journey': { en: 'Continue your climate journey', pt: 'Continue sua jornada climática' },
  'auth.processing': { en: 'Processing...', pt: 'Processando...' },
  'auth.saving': { en: 'Saving...', pt: 'Salvando...' },
  'auth.complete_profile': { en: 'Complete Profile', pt: 'Completar Perfil' },
  'auth.profile_complete': { en: 'Profile Complete!', pt: 'Perfil Completo!' },
  'auth.profile_updated': { en: 'Your profile has been successfully updated. You can now access all features.', pt: 'Seu perfil foi atualizado com sucesso. Agora você pode acessar todos os recursos.' },
  'auth.go_to_dashboard': { en: 'Go to Dashboard', pt: 'Ir para o Painel' },
  'auth.complete_your_profile': { en: 'Complete Your Profile', pt: 'Complete Seu Perfil' },
  'auth.profile_personalize': { en: 'Please provide some additional information to personalize your experience.', pt: 'Por favor, forneça algumas informações adicionais para personalizar sua experiência.' },
  'auth.already_have_account': { en: 'Already have an account? Sign in', pt: 'Já tem uma conta? Entre' },
  'auth.need_account': { en: 'Need an account? Sign up', pt: 'Precisa de uma conta? Cadastre-se' },
  'auth.back_to_home': { en: 'Back to home', pt: 'Voltar ao início' },
  
  // Settings
  'settings.profile': { en: 'Profile', pt: 'Perfil' },
  'settings.settings': { en: 'Settings', pt: 'Configurações' },
  'level.aware': { en: 'Climate Aware', pt: 'Consciente Climático' },
  'level.active': { en: 'Climate Active', pt: 'Ativo Climático' },
  'level.leader': { en: 'Climate Leader', pt: 'Líder Climático' },
  'level.champion': { en: 'Climate Champion', pt: 'Campeão Climático' },
};