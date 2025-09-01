import { sampleSurveyQuestions } from '../data/surveyQuestions';
import type { SurveyQuestion } from '../types';

// Function to populate database with survey questions
export const populateSurveyQuestions = async (saveSurveyQuestions: (questions: SurveyQuestion[]) => Promise<void>) => {
  try {
    console.log('Populating database with survey questions...');
    await saveSurveyQuestions(sampleSurveyQuestions);
    console.log('Database populated successfully!');
  } catch (error) {
    console.error('Error populating database:', error);
    throw error;
  }
};

// Function to check if database has questions
export const checkDatabaseStatus = async (getSurveyQuestions: () => Promise<SurveyQuestion[]>) => {
  try {
    const questions = await getSurveyQuestions();
    console.log(`Database has ${questions.length} questions`);
    return questions.length > 0;
  } catch (error) {
    console.error('Error checking database status:', error);
    return false;
  }
};

// Function to initialize database if empty
export const initializeDatabase = async (
  getSurveyQuestions: () => Promise<SurveyQuestion[]>,
  saveSurveyQuestions: (questions: SurveyQuestion[]) => Promise<void>
) => {
  try {
    const hasQuestions = await checkDatabaseStatus(getSurveyQuestions);
    
    if (!hasQuestions) {
      console.log('Database is empty, populating with survey questions...');
      await populateSurveyQuestions(saveSurveyQuestions);
      return true;
    } else {
      console.log('Database already has questions');
      return false;
    }
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};
