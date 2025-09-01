import React, { useEffect, useState } from 'react';
import { Award, Share2, Download, Star, Target, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { LanguageToggle } from '../LanguageToggle';
import { recommendations } from '../../data/recommendations';
import { calculateSurveyScore, getLevelFromScore } from '../../data/surveyQuestions';
import { useAuth } from '../../contexts/AuthContext';
import { CertificateGenerator } from '../certificate/CertificateGenerator';
import type { UserCategory, SurveyResponse } from '../../types';

interface ResultsScreenProps {
  category: UserCategory;
  responses: SurveyResponse[];
  onGenerateCertificate: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({ 
  category, 
  responses, 
  onGenerateCertificate 
}) => {
  const { t, language } = useLanguage();
  const { currentUser, saveSurveySession, updateUserSurveyResults, saveCertificate } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [certificateCode, setCertificateCode] = useState<string>('');
  const [showCertificate, setShowCertificate] = useState(false);

  // Calculate personalized score using the proper scoring mechanism
  const score = calculateSurveyScore(responses, currentUser!);
  const { level, badge } = getLevelFromScore(score);
  
  // Calculate max possible score (each question has max 6 points)
  const maxPossibleScore = responses.length * 6;
  const percentage = Math.min(Math.round((score / maxPossibleScore) * 100), 100);
  
  // Get grade based on percentage
  const getGrade = (percentage: number) => {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B+';
    if (percentage >= 60) return 'B';
    if (percentage >= 50) return 'C+';
    if (percentage >= 40) return 'C';
    if (percentage >= 30) return 'D';
    return 'F';
  };
  
  const grade = getGrade(percentage);

  const getBadgeEmoji = (level: string) => {
    const badges = {
      champion: '🏆',
      leader: '🌟',
      active: '⚡',
      aware: '🌱',
      beginner: '🌿'
    };
    return badges[level as keyof typeof badges];
  };

  const badgeEmoji = getBadgeEmoji(level);
  
  // Get dynamic recommendations based on actual responses and score
  const getDynamicRecommendations = () => {
    let recommendations = [];
    
    // Analyze responses to determine areas of improvement
    const lowScoreResponses = responses.filter(r => r.points <= 2);
    const highScoreResponses = responses.filter(r => r.points >= 4);
    const perfectResponses = responses.filter(r => r.points === 6);
    
    console.log('Response analysis:', {
      total: responses.length,
      lowScore: lowScoreResponses.length,
      highScore: highScoreResponses.length,
      perfect: perfectResponses.length,
      score,
      percentage
    });
    
    // Score-based recommendations with more specific thresholds
    if (percentage < 40) {
      recommendations.push({
        id: 'score-low-1',
        title: { en: 'Start with Basic Actions', pt: 'Comece com Ações Básicas' },
        description: { 
          en: `Your score of ${percentage}% shows room for improvement. Focus on simple daily habits like turning off lights, reducing water usage, and recycling.`,
          pt: `Sua pontuação de ${percentage}% mostra espaço para melhoria. Concentre-se em hábitos diários simples como desligar as luzes, reduzir o uso de água e reciclar.`
        },
        priority: 'high',
        category: [category]
      });
    } else if (percentage < 70) {
      recommendations.push({
        id: 'score-medium-1',
        title: { en: 'Expand Your Impact', pt: 'Expanda Seu Impacto' },
        description: { 
          en: `With ${percentage}%, you're making progress! Consider energy-efficient appliances, sustainable transportation, and community involvement.`,
          pt: `Com ${percentage}%, você está progredindo! Considere eletrodomésticos eficientes, transporte sustentável e envolvimento comunitário.`
        },
        priority: 'high',
        category: [category]
      });
    } else if (percentage < 90) {
      recommendations.push({
        id: 'score-high-1',
        title: { en: 'Lead by Example', pt: 'Lidere pelo Exemplo' },
        description: { 
          en: `Excellent ${percentage}%! Share your knowledge, mentor others, and advocate for systemic change in your community.`,
          pt: `Excelente ${percentage}%! Compartilhe seu conhecimento, oriente outros e defenda mudanças sistêmicas em sua comunidade.`
        },
        priority: 'high',
        category: [category]
      });
    } else {
      recommendations.push({
        id: 'score-perfect-1',
        title: { en: 'Climate Champion', pt: 'Campeão Climático' },
        description: { 
          en: `Perfect ${percentage}%! You're a climate action leader. Inspire others and drive systemic change in your organization and community.`,
          pt: `Perfeito ${percentage}%! Você é um líder em ação climática. Inspire outros e promova mudanças sistêmicas em sua organização e comunidade.`
        },
        priority: 'high',
        category: [category]
      });
    }
    
    // Response-based recommendations with specific counts
    if (lowScoreResponses.length > 0) {
      recommendations.push({
        id: 'improvement-1',
        title: { en: 'Focus on Improvement Areas', pt: 'Foque nas Áreas de Melhoria' },
        description: { 
          en: `You have ${lowScoreResponses.length} areas that need attention. Focus on these specific areas to improve your overall impact.`,
          pt: `Você tem ${lowScoreResponses.length} áreas que precisam de atenção. Concentre-se nessas áreas específicas para melhorar seu impacto geral.`
        },
        priority: 'high',
        category: [category]
      });
    }
    
    if (perfectResponses.length > 0) {
      recommendations.push({
        id: 'excellence-1',
        title: { en: 'Maintain Excellence', pt: 'Mantenha a Excelência' },
        description: { 
          en: `Outstanding! You excelled in ${perfectResponses.length} areas. Keep up the excellent work and share your expertise with others.`,
          pt: `Excepcional! Você se destacou em ${perfectResponses.length} áreas. Continue o excelente trabalho e compartilhe sua experiência com outros.`
        },
        priority: 'medium',
        category: [category]
      });
    }
    
    // Category-specific recommendations
    if (category === 'company_owner') {
      recommendations.push({
        id: 'business-1',
        title: { en: 'Business Sustainability', pt: 'Sustentabilidade Empresarial' },
        description: { 
          en: `As a company owner with ${percentage}%, consider implementing ESG policies, sustainable supply chains, and green business practices.`,
          pt: `Como proprietário de empresa com ${percentage}%, considere implementar políticas ESG, cadeias de suprimentos sustentáveis e práticas empresariais verdes.`
        },
        priority: 'high',
        category: [category]
      });
    } else if (category === 'student') {
      recommendations.push({
        id: 'education-1',
        title: { en: 'Educational Impact', pt: 'Impacto Educacional' },
        description: { 
          en: `With your ${percentage}% score, join environmental clubs, take sustainability courses, and organize campus green initiatives.`,
          pt: `Com sua pontuação de ${percentage}%, participe de clubes ambientais, faça cursos de sustentabilidade e organize iniciativas verdes no campus.`
        },
        priority: 'high',
        category: [category]
      });
    } else if (category === 'government') {
      recommendations.push({
        id: 'government-1',
        title: { en: 'Policy Leadership', pt: 'Liderança em Políticas' },
        description: { 
          en: `With ${percentage}%, you can drive policy changes. Advocate for sustainable regulations and green infrastructure projects.`,
          pt: `Com ${percentage}%, você pode impulsionar mudanças políticas. Defenda regulamentações sustentáveis e projetos de infraestrutura verde.`
        },
        priority: 'high',
        category: [category]
      });
    }
    
    return recommendations.slice(0, 3); // Return top 3 recommendations
  };
  
  const categoryRecommendations = getDynamicRecommendations();

  // Save survey results to database with proper error handling
  useEffect(() => {
    if (!currentUser || isSaved) return;
    
    console.log('Starting to save survey results...', {
      currentUser: currentUser.id,
      responses: responses.length,
      score,
      level,
      badge,
      grade
    });
    
    setIsSaving(true);
    
    const saveResults = async () => {
      try {
        // Generate certificate code
        const code = `CERT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        setCertificateCode(code);

        // Save survey session and update user results
        const sessionData = {
          userId: currentUser.id,
          questions: responses.map(r => r.questionId),
          responses,
          score,
          level,
          badge,
          grade,
          percentage,
          completedAt: new Date(),
          personalizedFacts: [],
          certificateCode: code
        };
        
        // Save survey session
        console.log('Saving survey session...');
        await saveSurveySession({
          userId: currentUser!.uid,
          responses,
          score: score,
          level,
          badge,
          grade,
          percentage,
          certificateCode: code,
          completedAt: new Date(),
          category: currentUser!.category
        });
        
        // Update user's survey results
        console.log('Updating user survey results...');
        await updateUserSurveyResults(currentUser!.uid, score, level, badge);
        
        // Save certificate data
        console.log('Saving certificate data...');
        await saveCertificate({
          userId: currentUser!.uid,
          certificateCode: code,
          userName: currentUser!.name,
          category: currentUser!.category,
          city: currentUser!.city,
          state: currentUser!.state,
          ageRange: currentUser!.ageRange,
          score: score,
          level,
          badge,
          grade,
          percentage,
          completedAt: new Date(),
          visibility: currentUser!.certificateVisibility || 'private'
        });
        
        setIsSaved(true);
        console.log('Survey results and certificate saved successfully!');
      } catch (error) {
        console.error('Error saving survey results:', error);
        // Still mark as saved to allow certificate generation
        setIsSaved(true);
        console.log('Survey results ready for certificate generation (database save failed)');
      } finally {
        setIsSaving(false);
      }
    };

    saveResults();
  }, [currentUser, responses, score, level, badge, grade, percentage, saveSurveySession, updateUserSurveyResults, isSaved]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {t('results.title')}
          </h1>
        </div>

        {/* Score Card */}
        <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm border border-emerald-100">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">{badgeEmoji}</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {t(`level.${level}`)}
            </h2>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="text-3xl font-bold text-emerald-600">
                {score}
              </div>
              <div className="text-gray-400">/</div>
              <div className="text-xl text-gray-600">{maxPossibleScore}</div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full transition-all duration-1000"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <div className="text-lg text-gray-600 mb-2">
              {percentage}% {t('results.score')}
            </div>
            <div className="text-2xl font-bold text-emerald-600">
              Grade: {grade}
            </div>
            
            {/* Survey Completion Status */}
            {isSaved && (
              <div className="mt-4 flex items-center justify-center gap-2 text-emerald-600">
                <CheckCircle className="w-5 h-5" />
                Survey completed successfully!
              </div>
            )}
          </div>

          <button
            onClick={() => setShowCertificate(true)}
            disabled={!isSaved}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-xl font-medium hover:from-emerald-700 hover:to-teal-700 transform hover:scale-[1.02] transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Award className="w-5 h-5" />
            {t('results.generate_certificate')}
          </button>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-emerald-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Target className="w-6 h-6 text-emerald-600" />
            {t('results.recommendations')}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categoryRecommendations.map((rec) => (
              <div
                key={rec.id}
                className="border border-gray-200 rounded-xl p-6 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-3 h-3 rounded-full mt-2 ${
                    rec.priority === 'high' ? 'bg-red-500' :
                    rec.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`} />
                  <h4 className="font-semibold text-gray-800">
                    {rec.title[language]}
                  </h4>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {rec.description[language]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {t('certificate.title')}
              </h2>
              <button
                onClick={() => setShowCertificate(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <CertificateGenerator
              user={currentUser!}
              score={score}
              level={level}
              badge={badge}
              certificateCode={certificateCode}
              completedAt={new Date()}
              onDownload={() => {
                console.log('Certificate downloaded');
              }}
              onShare={() => {
                console.log('Certificate shared');
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};