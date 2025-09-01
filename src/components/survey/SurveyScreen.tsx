import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Lightbulb } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { LanguageToggle } from '../LanguageToggle';
import { sampleSurveyQuestions, getPersonalizedQuestions, calculateSurveyScore, getLevelFromScore } from '../../data/surveyQuestions';
import { useAuth } from '../../contexts/AuthContext';
import type { SurveyResponse } from '../../types';

interface SurveyScreenProps {
  onComplete: (responses: SurveyResponse[], score: number) => void;
}

export const SurveyScreen: React.FC<SurveyScreenProps> = ({ onComplete }) => {
  const { t, language } = useLanguage();
  const { currentUser, saveSurveySession, updateUserSurveyResults } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [showFact, setShowFact] = useState(false);
  const [questions, setQuestions] = useState<SurveyQuestion[]>([]);
  const [loading, setLoading] = useState(true);

  // Load questions from database or fallback to local questions
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        if (currentUser) {
          const personalizedQuestions = getPersonalizedQuestions(currentUser, 10);
          setQuestions(personalizedQuestions);
        } else {
          setQuestions(sampleSurveyQuestions);
        }
      } catch (error) {
        console.error('Error loading questions from database, using local questions:', error);
        // Fallback to local questions if database fails
        if (currentUser) {
          const personalizedQuestions = getPersonalizedQuestions(currentUser, 10);
          setQuestions(personalizedQuestions);
        } else {
          setQuestions(sampleSurveyQuestions);
        }
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 flex items-center justify-center">
        <div className="text-white text-lg">Loading survey...</div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const currentResponse = responses.find(r => r.questionId === question.id);

  const handleAnswer = (value: string, points: number) => {
    const newResponses = responses.filter(r => r.questionId !== question.id);
    newResponses.push({
      questionId: question.id,
      selectedValue: value,
      points
    });
    setResponses(newResponses);
    setShowFact(true);
  };

  const handleNext = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowFact(false);
    } else {
      try {
        // Calculate personalized score
        const score = calculateSurveyScore(responses, currentUser!);
        const { level, badge } = getLevelFromScore(score);
        
        // Save survey session to database
        if (currentUser) {
          const sessionData = {
            userId: currentUser.id,
            questions: questions.map(q => q.id),
            responses,
            score,
            level,
            badge,
            completedAt: new Date(),
            personalizedFacts: questions.map(q => q.fact[language])
          };
          
          await saveSurveySession(sessionData);
          await updateUserSurveyResults(currentUser.id, score, level, badge);
        }
        
        onComplete(responses, score);
      } catch (error) {
        console.error('Error saving survey results:', error);
        // Still complete the survey even if saving fails
        const score = calculateSurveyScore(responses, currentUser!);
        onComplete(responses, score);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowFact(false);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 p-4">
      <div className="absolute top-4 right-4">
        <LanguageToggle />
      </div>

      <div className="max-w-2xl mx-auto pt-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">
            {t('survey.title')}
          </h1>
          <p className="text-emerald-100">
            {t('survey.subtitle')}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="bg-white/20 rounded-full h-2 mb-8">
          <div 
            className="bg-white rounded-full h-2 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 mb-6">
          <div className="mb-6">
            <div className="text-sm text-emerald-600 font-medium mb-2">
              {t('survey.question')} {currentQuestion + 1} / {questions.length}
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              {question.question[language]}
            </h2>

            <div className="space-y-3">
              {question.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value, option.points)}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all hover:bg-emerald-50 ${
                    currentResponse?.selectedValue === option.value
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  {option.label[language]}
                </button>
              ))}
            </div>
          </div>

          {showFact && (
            <div className="bg-gradient-to-r from-lime-50 to-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6 animate-fade-in">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium text-emerald-700 mb-1">
                    {t('survey.climate_fact')}
                  </div>
                  <p className="text-sm text-emerald-600">
                    {question.fact[language]}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
            {t('back')}
          </button>

          <button
            onClick={handleNext}
            disabled={!currentResponse}
            className="flex items-center gap-2 px-6 py-3 bg-white text-emerald-600 rounded-xl font-medium hover:bg-emerald-50 transform hover:scale-105 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {currentQuestion === questions.length - 1 ? t('survey.complete') : t('survey.next')}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};