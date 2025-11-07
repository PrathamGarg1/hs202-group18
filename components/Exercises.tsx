import React, { useState, useEffect, useMemo } from 'react';
import { BreathingIcon, GratitudeIcon, MindfulIcon, YogaIcon } from './common/Icons';

const exerciseTypes = [
  { name: 'Pranayama Breathing', key: 'pranayama breathing', icon: BreathingIcon, color: 'text-blue-500', description: 'A 4-7-8 breathing technique to calm your nervous system.' },
  { name: 'Mindful Observation', key: 'mindful observation', icon: MindfulIcon, color: 'text-purple-500', description: 'A grounding exercise to focus on the present moment.' },
  { name: 'Short Yoga Nidra', key: '5-minute yoga nidra', icon: YogaIcon, color: 'text-green-500', description: 'A guided body-scan meditation for deep relaxation.' },
  { name: 'Gratitude Practice', key: 'gratitude practice', icon: GratitudeIcon, color: 'text-pink-500', description: 'An interactive journal to reflect on positive things.' },
];

// --- Breathing Exercise ---
const BreathingExercise: React.FC<{ onExit: () => void }> = ({ onExit }) => {
    const steps = useMemo(() => [
        { phase: 'Breathe In', duration: 4, color: 'bg-blue-300' },
        { phase: 'Hold', duration: 7, color: 'bg-purple-300' },
        { phase: 'Breathe Out', duration: 8, color: 'bg-green-300' },
    ], []);

    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [countdown, setCountdown] = useState(steps[0].duration);
    const [animationKey, setAnimationKey] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown(prev => {
                if (prev > 1) {
                    return prev - 1;
                } else {
                    const nextIndex = (currentStepIndex + 1) % steps.length;
                    setCurrentStepIndex(nextIndex);
                    setAnimationKey(prev => prev + 1);
                    return steps[nextIndex].duration;
                }
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [currentStepIndex, steps]);
    
    const currentStep = steps[currentStepIndex];

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
            <div className={`w-full h-full absolute inset-0 transition-colors duration-1000 ${currentStep.color} opacity-20 pointer-events-none`}></div>
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center">
                <div key={animationKey} className="absolute inset-0 bg-white/50 rounded-full" style={{ animation: `${currentStep.phase === 'Breathe In' ? 'pulse-in' : (currentStep.phase === 'Breathe Out' ? 'pulse-out' : 'pulse-hold')} ${currentStep.duration}s linear infinite` }}></div>
                <div className="relative z-10">
                    <p className="text-3xl sm:text-4xl font-bold text-text-primary mb-2">{currentStep.phase}</p>
                    <p className="text-6xl sm:text-8xl font-light text-text-primary">{countdown}</p>
                </div>
            </div>
            <p className="text-sm text-text-secondary mt-8">Follow the 4-7-8 pattern to calm your mind.</p>
            <button onClick={onExit} className="mt-4 px-6 py-2 bg-card border rounded-lg hover:bg-gray-100 transition-colors">Exit</button>
            <style>{`@keyframes pulse-in { 0% { transform: scale(0.9); opacity: 0.7; } 100% { transform: scale(1.1); opacity: 1; } } @keyframes pulse-out { 0% { transform: scale(1.1); opacity: 1; } 100% { transform: scale(0.9); opacity: 0.7; } } @keyframes pulse-hold { 0%, 100% { transform: scale(1.1); opacity: 1; } }`}</style>
        </div>
    );
};

// --- Mindful Observation Exercise ---
const MindfulObservationExercise: React.FC<{ onExit: () => void }> = ({ onExit }) => {
    const steps = [
        "Find a small object around you. It could be a pen, a leaf, or a coin. Hold it in your hand.",
        "Take a moment to just look at it. Notice its colors, shapes, and textures as if you're seeing it for the first time.",
        "Close your eyes and feel the object. Notice its weight, its temperature, and how it feels against your skin.",
        "Now, focus on any sounds the object makes as you handle it. Is it silent? Does it make a soft noise?",
        "Finally, take a deep breath in and out. Open your eyes. You have successfully practiced mindfulness."
    ];
    const [currentStep, setCurrentStep] = useState(0);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-purple-100/30">
            <div className="max-w-md">
                <MindfulIcon className="w-16 h-16 text-purple-500 mx-auto mb-4"/>
                <h2 className="text-2xl font-bold mb-4">Mindful Observation</h2>
                <div className="bg-card p-6 rounded-lg shadow-md min-h-[10rem] flex items-center justify-center">
                    <p className="text-lg text-text-primary">{steps[currentStep]}</p>
                </div>
                <div className="flex justify-between items-center mt-4 w-full">
                    <button onClick={onExit} className="px-6 py-2 bg-card border rounded-lg hover:bg-gray-100 transition-colors">Exit</button>
                    {currentStep < steps.length - 1 ? (
                        <button onClick={() => setCurrentStep(s => s + 1)} className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-focus">Next</button>
                    ) : (
                        <button onClick={onExit} className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-green-600">Finish</button>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- Yoga Nidra Exercise ---
const YogaNidraExercise: React.FC<{ onExit: () => void }> = ({ onExit }) => {
    const bodyParts = useMemo(() => ["Right foot", "Left foot", "Right leg", "Left leg", "Stomach and chest", "Both arms", "Neck and shoulders", "Your entire face", "Your whole body"], []);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [countdown, setCountdown] = useState(8);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev > 1) return prev - 1;
                if (currentIndex < bodyParts.length - 1) {
                    setCurrentIndex(i => i + 1);
                    return 8;
                }
                return 0;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [currentIndex, bodyParts.length]);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-green-100/30">
             <div className="max-w-md">
                <YogaIcon className="w-16 h-16 text-green-500 mx-auto mb-4"/>
                <h2 className="text-2xl font-bold mb-2">Yoga Nidra Body Scan</h2>
                <p className="text-text-secondary mb-4">Bring gentle awareness to each part of your body.</p>
                <div className="bg-card p-6 rounded-lg shadow-md">
                    {currentIndex < bodyParts.length - 1 ? (
                        <>
                            <p className="text-lg text-text-secondary">Focus on your...</p>
                            <p className="text-4xl font-bold text-accent my-4">{bodyParts[currentIndex]}</p>
                            <p className="text-xl">{countdown}</p>
                        </>
                    ) : (
                        <p className="text-3xl font-bold text-accent my-4">Relaxation complete. Well done.</p>
                    )}
                </div>
                <button onClick={onExit} className="mt-4 px-6 py-2 bg-card border rounded-lg hover:bg-gray-100 transition-colors">
                    {currentIndex < bodyParts.length - 1 ? 'Exit' : 'Finish'}
                </button>
             </div>
        </div>
    );
};

// --- Gratitude Practice Exercise ---
const GratitudePracticeExercise: React.FC<{ onExit: () => void }> = ({ onExit }) => {
    const prompts = useMemo(() => [
        "What is one thing that made you smile today?",
        "Who is someone you are grateful for and why?",
        "What is a simple pleasure you enjoyed recently?"
    ], []);
    const [currentPrompt, setCurrentPrompt] = useState(0);
    const [answers, setAnswers] = useState<string[]>(Array(prompts.length).fill(''));

    const handleAnswerChange = (text: string) => {
        setAnswers(ans => {
            const newAnswers = [...ans];
            newAnswers[currentPrompt] = text;
            return newAnswers;
        });
    };
    
    return (
         <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-pink-100/30">
            <div className="max-w-md w-full">
                <GratitudeIcon className="w-16 h-16 text-pink-500 mx-auto mb-4"/>
                <h2 className="text-2xl font-bold mb-4">Gratitude Practice</h2>
                {currentPrompt < prompts.length ? (
                    <>
                        <p className="text-lg text-text-primary mb-3">{prompts[currentPrompt]}</p>
                        <textarea
                            value={answers[currentPrompt]}
                            onChange={(e) => handleAnswerChange(e.target.value)}
                            rows={4}
                            className="w-full p-3 bg-white text-text-primary border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-focus focus:border-transparent transition-all"
                            placeholder="Write your thoughts here..."
                        />
                    </>
                ) : (
                    <div className="bg-card p-4 rounded-lg shadow-inner">
                        <h3 className="text-xl font-bold mb-2">Thank you for sharing!</h3>
                        <p className="text-text-secondary">Carrying gratitude can brighten your entire day.</p>
                    </div>
                )}
                <div className="flex justify-between items-center mt-4 w-full">
                    <button onClick={onExit} className="px-6 py-2 bg-card border rounded-lg hover:bg-gray-100 transition-colors">Exit</button>
                    {currentPrompt < prompts.length - 1 ? (
                        <button onClick={() => setCurrentPrompt(p => p + 1)} className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-focus">Next</button>
                    ) : (
                        <button onClick={() => currentPrompt === prompts.length ? onExit() : setCurrentPrompt(p => p + 1)} className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-green-600">Finish</button>
                    )}
                </div>
            </div>
        </div>
    );
};


const Exercises: React.FC = () => {
  const [activeExercise, setActiveExercise] = useState<string | null>(null);

  const renderActiveExercise = () => {
    switch(activeExercise) {
        case 'pranayama breathing': return <BreathingExercise onExit={() => setActiveExercise(null)} />;
        case 'mindful observation': return <MindfulObservationExercise onExit={() => setActiveExercise(null)} />;
        case '5-minute yoga nidra': return <YogaNidraExercise onExit={() => setActiveExercise(null)} />;
        case 'gratitude practice': return <GratitudePracticeExercise onExit={() => setActiveExercise(null)} />;
        default: return null;
    }
  }

  if (activeExercise) {
    return (
        <div className="fixed inset-0 bg-background z-50 animate-fade-in">
            {renderActiveExercise()}
            <style>{`@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }`}</style>
        </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-2">Wellness Exercises</h1>
      <p className="text-text-secondary mb-6">Choose an exercise to calm your mind and find focus.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {exerciseTypes.map((exercise) => (
          <button
            key={exercise.key}
            onClick={() => setActiveExercise(exercise.key)}
            className="p-4 text-left rounded-lg transition-all duration-200 flex items-start gap-4 bg-card border hover:shadow-md hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <div className={`p-2 rounded-full bg-secondary ${exercise.color}`}>
                <exercise.icon className="w-8 h-8 flex-shrink-0" />
            </div>
            <div>
              <p className="font-semibold text-lg">{exercise.name}</p>
              <p className="text-sm text-text-secondary">{exercise.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Exercises;