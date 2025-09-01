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
    console.log('Checking database initialization status...');
    
    // Try to get questions from database
    let hasQuestions = false;
    try {
      hasQuestions = await checkDatabaseStatus(getSurveyQuestions);
    } catch (error) {
      console.log('Database not accessible, will populate on first use');
      hasQuestions = false;
    }
    
    if (!hasQuestions) {
      console.log('Database is empty or not accessible, populating with survey questions...');
      try {
        await populateSurveyQuestions(saveSurveyQuestions);
        console.log('Database populated successfully!');
        return true;
      } catch (error) {
        console.error('Failed to populate database:', error);
        // Don't throw error, app can still work with local questions
        return false;
      }
    } else {
      console.log('Database already has questions, skipping population');
      return false;
    }
  } catch (error) {
    console.error('Error during database initialization:', error);
    // Don't throw error, app can still work with local questions
    return false;
  }
};
