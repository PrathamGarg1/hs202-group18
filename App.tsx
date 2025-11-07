
import React, { useState } from 'react';
import Sidebar, { MobileNav } from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Chatbot from './components/Chatbot';
import Journal from './components/Journal';
import Resources from './components/Resources';
import Exercises from './components/Exercises';
import Relief from './components/Relief';
import Counselor from './components/Counselor';
import { Page } from './types';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>(Page.Dashboard);

  const renderPage = () => {
    switch (activePage) {
      case Page.Dashboard:
        return <Dashboard setActivePage={setActivePage} />;
      case Page.Chat:
        return <Chatbot />;
      case Page.Journal:
        return <Journal />;
      case Page.Resources:
        return <Resources />;
      case Page.Exercises:
        return <Exercises />;
      case Page.Relief:
        return <Relief />;
      case Page.Counselor:
        return <Counselor />;
      default:
        return <Dashboard setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="h-screen w-screen flex bg-background font-sans">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <main className="flex-1 h-screen overflow-y-auto pb-16 md:pb-0">
        {renderPage()}
      </main>
      <MobileNav activePage={activePage} setActivePage={setActivePage} />
    </div>
  );
};

export default App;