import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { ChatInterface } from './components/ChatInterface';
import { MemoryVisualizer } from './components/MemoryVisualizer';
import { ViewState } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'chat':
        return <ChatInterface />;
      case 'memory':
        return <MemoryVisualizer />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-900 text-slate-200 font-sans selection:bg-cyan-500/30">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="flex-1 h-full overflow-hidden relative">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-5" 
             style={{ 
                 backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)',
                 backgroundSize: '40px 40px'
             }}>
        </div>
        
        {renderView()}
      </main>
    </div>
  );
};

export default App;