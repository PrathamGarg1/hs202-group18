import React, { useState, useEffect } from 'react';
import { JournalEntry, Mood } from '../types';
import { analyzeJournalEntry } from '../services/geminiService';
import { SparklesIcon } from './common/Icons';

const moods: Mood[] = ['Happy', 'Calm', 'Okay', 'Anxious', 'Sad'];
const moodColors: Record<Mood, string> = {
  Happy: 'bg-yellow-300',
  Calm: 'bg-blue-300',
  Okay: 'bg-green-300',
  Anxious: 'bg-purple-300',
  Sad: 'bg-indigo-300',
};

const TrashIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);


interface NewEntryFormProps {
  title: string;
  setTitle: (title: string) => void;
  content: string;
  setContent: (content: string) => void;
  selectedMood: Mood;
  setSelectedMood: (mood: Mood) => void;
  handleSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const NewEntryForm: React.FC<NewEntryFormProps> = ({
  title,
  setTitle,
  content,
  setContent,
  selectedMood,
  setSelectedMood,
  handleSubmit,
  onCancel
}) => (
    <div className="bg-card p-6 rounded-xl shadow-lg mb-8 border border-gray-200">
      <h2 className="text-2xl font-bold mb-4">New Journal Entry</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-text-secondary font-medium mb-2">How are you feeling?</label>
          <div className="flex flex-wrap gap-2">
            {moods.map(mood => (
              <button
                key={mood}
                type="button"
                onClick={() => setSelectedMood(mood)}
                className={`px-4 py-2 text-sm rounded-full transition-all ${selectedMood === mood ? `${moodColors[mood]} ring-2 ring-offset-2 ring-primary` : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                {mood}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="title" className="block text-text-secondary font-medium mb-2">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 bg-white text-text-primary border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-focus focus:border-transparent transition-all"
            placeholder="A title for your entry"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-text-secondary font-medium mb-2">Your thoughts</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            className="w-full p-3 bg-white text-text-primary border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-focus focus:border-transparent transition-all"
            placeholder="Write about your day..."
          />
        </div>
        <div className="flex justify-end space-x-4">
            <button type="button" onClick={onCancel} className="px-4 py-2 rounded-md text-text-secondary hover:bg-gray-100">Cancel</button>
            <button type="submit" className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-focus">Save</button>
        </div>
      </form>
    </div>
);


const Journal: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    try {
        const savedEntries = window.localStorage.getItem('journalEntries');
        return savedEntries ? JSON.parse(savedEntries) : [];
    } catch (error) {
        console.error("Could not load journal entries from localStorage", error);
        return [];
    }
  });
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [selectedMood, setSelectedMood] = useState<Mood>('Okay');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState<string | null>(null); // holds entry id

  useEffect(() => {
    try {
        window.localStorage.setItem('journalEntries', JSON.stringify(entries));
    } catch (error) {
        console.error("Could not save journal entries to localStorage", error);
    }
  }, [entries]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newEntry: JournalEntry = {
      id: new Date().toISOString(),
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      mood: selectedMood,
      title,
      content,
    };

    setEntries([newEntry, ...entries]);
    setTitle('');
    setContent('');
    setSelectedMood('Okay');
    setIsCreating(false);
  };
  
  const handleAnalyze = async (entry: JournalEntry) => {
    if (entry.analysis) return;
    setIsAnalyzing(entry.id);
    const analysisResult = await analyzeJournalEntry(entry.content);
    if(analysisResult) {
        setEntries(prevEntries => prevEntries.map(e => e.id === entry.id ? {...e, analysis: analysisResult} : e));
    }
    setIsAnalyzing(null);
  };

  const handleDelete = (id: string) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this journal entry?');
    if (shouldDelete) {
        setEntries(prevEntries => prevEntries.filter(entry => entry.id !== id));
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Journal</h1>
        {!isCreating && (
          <button onClick={() => setIsCreating(true)} className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-focus">
            + New Entry
          </button>
        )}
      </div>

      {isCreating && <NewEntryForm 
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        selectedMood={selectedMood}
        setSelectedMood={setSelectedMood}
        handleSubmit={handleSubmit}
        onCancel={() => setIsCreating(false)}
      />}

      <div className="space-y-6">
        {entries.length === 0 ? (
           !isCreating && <p className="text-center text-text-secondary py-10">No entries yet. Click "+ New Entry" to start journaling.</p>
        ) : (
          entries.map(entry => (
            <div key={entry.id} className="bg-card p-6 rounded-xl shadow-md border border-gray-100">
              <div className="flex justify-between items-start">
                  <div>
                      <div className="flex items-center mb-2">
                        <span className={`w-4 h-4 rounded-full ${moodColors[entry.mood]} mr-2`}></span>
                        <span className="font-semibold">{entry.mood}</span>
                      </div>
                      <h3 className="text-xl font-bold text-text-primary">{entry.title}</h3>
                      <p className="text-sm text-text-secondary mb-3">{entry.date}</p>
                  </div>
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    {!entry.analysis && (
                        <button 
                            onClick={() => handleAnalyze(entry)}
                            disabled={isAnalyzing === entry.id}
                            className="flex items-center text-sm px-3 py-1.5 bg-secondary text-accent border border-accent/20 rounded-full hover:bg-secondary-focus disabled:opacity-50 transition-colors"
                        >
                            {isAnalyzing === entry.id ? 'Analyzing...' : <><SparklesIcon className="w-4 h-4 mr-1.5"/> Get Insights</>}
                        </button>
                    )}
                    <button onClick={() => handleDelete(entry.id)} className="text-gray-400 hover:text-red-500 p-1.5 rounded-full hover:bg-red-50 transition-colors">
                        <TrashIcon className="w-5 h-5"/>
                    </button>
                  </div>
              </div>
              <p className="text-text-primary whitespace-pre-wrap">{entry.content}</p>
              {entry.analysis && (
                <div className="mt-4 pt-4 border-t border-gray-200 bg-secondary/50 p-4 rounded-md">
                    <h4 className="font-bold text-accent flex items-center"><SparklesIcon className="w-5 h-5 mr-2"/> AI Insights</h4>
                    <p className="mt-2"><strong className="font-semibold">Sentiment:</strong> {entry.analysis.sentiment}</p>
                    <p className="mt-1"><strong className="font-semibold">Key Themes:</strong> {entry.analysis.keyThemes.join(', ')}</p>
                    <div className="mt-2">
                        <strong className="font-semibold">Suggestions:</strong>
                        <ul className="list-disc list-inside ml-1 mt-1 space-y-1">
                            {entry.analysis.suggestions.map((s, i) => <li key={i}>{s}</li>)}
                        </ul>
                    </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Journal;