import React from 'react';
import { Page } from '../types';

const ChatIllustration = () => (
    <div className="absolute -right-2 -top-2 w-24 h-24 text-current opacity-20">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 40 C30 20, 70 20, 80 40 S70 60, 50 60 S30 60, 20 40" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M25 55 C35 35, 65 35, 75 55 S65 75, 50 75 S35 75, 25 55" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
        </svg>
    </div>
);

const JournalIllustration = () => (
    <div className="absolute -right-2 -top-2 w-24 h-24 text-current opacity-20">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 20 C60 40, 60 60, 50 80" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
            <path d="M50 20 C40 40, 40 60, 50 80" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
            <path d="M40 25 C45 40, 55 40, 60 25" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.7"/>
            <path d="M30 60 C50 50, 50 70, 70 60" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.5"/>
        </svg>
    </div>
);

const ExerciseIllustration = () => (
    <div className="absolute -right-2 -top-2 w-24 h-24 text-current opacity-20">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="4"/>
            <path d="M50 20 V80" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
            <path d="M20 50 H80" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
            <path d="M30 30 L70 70" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.5"/>
            <path d="M30 70 L70 30" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.5"/>
        </svg>
    </div>
);

const ResourcesIllustration = () => (
   <div className="absolute -right-2 -top-2 w-24 h-24 text-current opacity-20">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 80 V50" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
            <path d="M50 50 L30 30" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
            <path d="M50 50 L70 30" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
            <path d="M30 30 L20 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.6"/>
            <path d="M30 30 L40 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.6"/>
            <path d="M70 30 L60 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.6"/>
            <path d="M70 30 L80 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.6"/>
        </svg>
    </div>
);

const ReliefIllustration = () => (
    <div className="absolute -right-2 -top-2 w-24 h-24 text-current opacity-20">
         <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 20 C30 30, 20 50, 30 70 S50 90, 70 70 S90 50, 70 30 S50 10, 50 20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M50 30 C40 40, 40 60, 50 70 S60 60, 60 40 S50 20, 50 30" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
         </svg>
     </div>
 );

const CounselorIllustration = () => (
    <div className="absolute -right-2 -top-2 w-24 h-24 text-current opacity-20">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 10 L15 30 L15 70 L50 90 L85 70 L85 30 Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
            <path d="M35 50 L45 60 L65 40" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    </div>
);


interface DashboardProps {
    setActivePage: (page: Page) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setActivePage }) => {
    const date = new Date();
    const greeting = `Namaste, welcome back!`;
    const quote = `"You have to grow from the inside out. None can teach you, none can make you spiritual. There is no other teacher but your own soul." - Swami Vivekananda`;

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-text-primary">{greeting}</h1>
                <p className="text-md text-text-secondary mt-2">Today is {date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </header>

            <div className="bg-gradient-to-r from-blue-500 to-primary p-6 rounded-2xl shadow-lg text-white mb-8">
                <p className="text-lg italic mb-2">"{quote.split('" - ')[0].substring(1)}"</p>
                <p className="text-right font-semibold">- {quote.split('" - ')[1]}</p>
            </div>

            <section>
                <h2 className="text-2xl font-bold text-text-primary mb-4">How can we help you today?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ActionCard
                        title="Talk to Gem"
                        description="Chat with your AI companion for support and guidance, anytime."
                        color="bg-blue-100 text-blue-800"
                        illustration={<ChatIllustration />}
                        onClick={() => setActivePage(Page.Chat)}
                    />
                    <ActionCard
                        title="Write in Journal"
                        description="Reflect on your day and track your mood to understand your feelings better."
                        color="bg-green-100 text-green-800"
                        illustration={<JournalIllustration />}
                        onClick={() => setActivePage(Page.Journal)}
                    />
                    <ActionCard
                        title="Quick Exercise"
                        description="Try a short, guided exercise to calm your mind and reduce stress."
                        color="bg-purple-100 text-purple-800"
                        illustration={<ExerciseIllustration />}
                        onClick={() => setActivePage(Page.Exercises)}
                    />
                     <ActionCard
                        title="Explore Resources"
                        description="Find articles and tools to help you navigate college life challenges."
                        color="bg-yellow-100 text-yellow-800"
                        illustration={<ResourcesIllustration />}
                        onClick={() => setActivePage(Page.Resources)}
                    />
                    <ActionCard
                        title="Find Relief"
                        description="Visit a quiet space with calming images and sounds to relax."
                        color="bg-pink-100 text-pink-800"
                        illustration={<ReliefIllustration />}
                        onClick={() => setActivePage(Page.Relief)}
                    />
                    <ActionCard
                        title="Counselor Connect"
                        description="Connect with professional resources from IIT Ropar for support."
                        color="bg-indigo-100 text-indigo-800"
                        illustration={<CounselorIllustration />}
                        onClick={() => setActivePage(Page.Counselor)}
                    />
                </div>
            </section>
        </div>
    );
};

interface ActionCardProps {
    title: string;
    description: string;
    color: string;
    illustration: React.ReactNode;
    onClick: () => void;
}

const ActionCard: React.FC<ActionCardProps> = ({ title, description, color, illustration, onClick }) => (
    <button
        onClick={onClick}
        className={`relative overflow-hidden p-6 rounded-2xl text-left transform hover:-translate-y-1 transition-transform duration-200 shadow-sm hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${color}`}
    >
        {illustration}
        <div className="relative z-10">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-sm">{description}</p>
        </div>
    </button>
);

export default Dashboard;