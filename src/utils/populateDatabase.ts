import { sampleSurveyQuestions } from '../data/surveyQuestions';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import type { SurveyQuestion } from '../types';

// Function to manually populate the database
export const populateDatabase = async () => {
  try {
    console.log('Starting database population...');
    
    // Check if questions already exist
    const questionsRef = collection(db, 'surveyQuestions');
    const existingQuestions = await getDocs(questionsRef);
    
    if (!existingQuestions.empty) {
      console.log('Database already has questions, skipping population');
      return;
    }
    
    // Add questions to database
    const promises = sampleSurveyQuestions.map(question => 
      addDoc(questionsRef, {
        ...question,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    );
    
    await Promise.all(promises);
    console.log(`Successfully added ${sampleSurveyQuestions.length} questions to database`);
    
  } catch (error) {
    console.error('Error populating database:', error);
    throw error;
  }
};

// Function to check database status
export const checkDatabase = async () => {
  try {
    const questionsRef = collection(db, 'surveyQuestions');
    const sessionsRef = collection(db, 'surveySessions');
    
    const questionsSnapshot = await getDocs(questionsRef);
    const sessionsSnapshot = await getDocs(sessionsRef);
    
    console.log('Database Status:');
    console.log(`- Survey Questions: ${questionsSnapshot.size} documents`);
    console.log(`- Survey Sessions: ${sessionsSnapshot.size} documents`);
    
    return {
      questionsCount: questionsSnapshot.size,
      sessionsCount: sessionsSnapshot.size
    };
  } catch (error) {
    console.error('Error checking database:', error);
    throw error;
  }
};
