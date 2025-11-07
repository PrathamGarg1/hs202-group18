import React from 'react';
import { Page } from '../types';
import { HomeIcon, ChatIcon, JournalIcon, ResourcesIcon, ExerciseIcon, ReliefIcon, CounselorIcon } from './common/Icons';

interface SidebarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const navItems = [
  { page: Page.Dashboard, icon: HomeIcon, label: 'Dashboard' },
  { page: Page.Chat, icon: ChatIcon, label: 'AI Chat' },
  { page: Page.Journal, icon: JournalIcon, label: 'Journal' },
  { page: Page.Resources, icon: ResourcesIcon, label: 'Resources' },
  { page: Page.Exercises, icon: ExerciseIcon, label: 'Exercises' },
  { page: Page.Relief, icon: ReliefIcon, label: 'Relief' },
  { page: Page.Counselor, icon: CounselorIcon, label: 'Counselor' },
];

const MindWellLogo = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 5C11.716 5 5 11.716 5 20C5 28.284 11.716 35 20 35C28.284 35 35 28.284 35 20C35 15.433 32.937 11.332 29.667 8.333" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 12C18.9 12 18 12.9 18 14V20C18 21.1 18.9 22 20 22C21.1 22 22 21.1 22 20V14C22 12.9 21.1 12 20 12Z" fill="currentColor"/>
        <path d="M26 18C24.9 18 24 18.9 24 20V26C24 27.1 24.9 28 26 28C27.1 28 28 27.1 28 26V20C28 18.9 27.1 18 26 18Z" fill="currentColor"/>
        <path d="M14 18C12.9 18 12 18.9 12 20V26C12 27.1 12.9 28 14 28C15.1 28 16 27.1 16 26V20C16 18.9 15.1 18 14 18Z" fill="currentColor"/>
    </svg>
);


const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => {
  const NavItem: React.FC<{ item: typeof navItems[0] }> = ({ item }) => {
    const isActive = activePage === item.page;
    return (
      <button
        onClick={() => setActivePage(item.page)}
        className={`flex items-center w-full px-4 py-3 text-left rounded-lg transition-colors duration-200 ${
          isActive
            ? 'bg-primary text-white shadow-md'
            : 'text-text-secondary hover:bg-gray-200 hover:text-text-primary'
        }`}
      >
        <item.icon className="w-6 h-6 mr-4" />
        <span className="font-medium">{item.label}</span>
      </button>
    );
  };

  return (
    <aside className="bg-card w-64 p-4 flex-shrink-0 hidden md:flex flex-col border-r border-gray-200">
      <div className="flex items-center mb-8">
        <div className="bg-primary p-1 rounded-full mr-3 text-white">
            <MindWellLogo className="w-8 h-8"/>
        </div>
        <h1 className="text-2xl font-bold text-primary">MindWell</h1>
      </div>
      <nav className="flex flex-col space-y-2">
        {navItems.map((item) => (
          <NavItem key={item.page} item={item} />
        ))}
      </nav>
      <div className="mt-auto bg-secondary p-4 rounded-lg">
        <h3 className="font-bold text-accent">Emergency Support</h3>
        <p className="text-sm text-text-secondary mt-1 mb-3">
          If you are in a crisis, please reach out for help immediately.
        </p>
        <a href="tel:1800-599-0019" className="block w-full text-center bg-accent text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors">
          Call KIRAN Helpline
        </a>
      </div>
    </aside>
  );
};

export const MobileNav: React.FC<SidebarProps> = ({ activePage, setActivePage }) => {
    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-gray-200 shadow-lg">
            <div className="flex justify-around">
                {navItems.map(item => {
                    const isActive = activePage === item.page;
                    return (
                        <button
                            key={item.page}
                            onClick={() => setActivePage(item.page)}
                            className={`flex flex-col items-center justify-center p-2 w-full transition-colors duration-200 ${
                                isActive ? 'text-primary' : 'text-gray-400 hover:text-primary'
                            }`}
                        >
                            <item.icon className="w-6 h-6 mb-1" />
                            <span className="text-xs font-medium">{item.label}</span>
                        </button>
                    )
                })}
            </div>
        </nav>
    )
}

export default Sidebar;