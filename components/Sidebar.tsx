import React from 'react';
import { ViewState } from '../types';
import { LayoutDashboard, MessageSquareCode, Database, Settings, Activity } from 'lucide-react';

interface SidebarProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const navItems: { id: ViewState; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Overview', icon: <LayoutDashboard size={20} /> },
    { id: 'chat', label: 'Neural Interface', icon: <MessageSquareCode size={20} /> },
    { id: 'memory', label: 'Memory Fabric', icon: <Database size={20} /> },
  ];

  return (
    <div className="w-full md:w-64 bg-slate-900 border-r border-slate-700 flex flex-col h-full">
      <div className="p-6 border-b border-slate-700 flex items-center gap-3">
        <Activity className="text-cyan-400 animate-pulse" />
        <div>
          <h1 className="text-xl font-bold text-slate-100 tracking-wider">QUILLAN</h1>
          <p className="text-xs text-slate-400 font-mono">SYS.VER.4.2</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              currentView === item.id
                ? 'bg-cyan-900/30 text-cyan-400 border border-cyan-800/50'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            {item.icon}
            <span className="font-medium text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center gap-2 text-slate-500 text-xs px-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-ping"></div>
          <span>SYSTEM ONLINE</span>
        </div>
        <button 
          onClick={() => {}} 
          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-slate-400 hover:bg-slate-800 transition-colors text-sm"
        >
          <Settings size={18} />
          <span>System Config</span>
        </button>
      </div>
    </div>
  );
};