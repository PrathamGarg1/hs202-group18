
export enum Page {
  Dashboard = 'Dashboard',
  Chat = 'Chat',
  Journal = 'Journal',
  Resources = 'Resources',
  Exercises = 'Exercises',
  Relief = 'Relief',
  Counselor = 'Counselor',
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  mood: Mood;
  title: string;
  content: string;
  analysis?: JournalAnalysis;
}

export type Mood = 'Happy' | 'Calm' | 'Okay' | 'Anxious' | 'Sad';

export interface JournalAnalysis {
  sentiment: string;
  keyThemes: string[];
  suggestions: string[];
}

export interface Resource {
    title: string;
    uri: string;
}