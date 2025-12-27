
import React from 'react';
import { Layout, BrainCircuit, GraduationCap } from 'lucide-react';

interface HeaderProps {
  activeView: 'dashboard' | 'planner' | 'resources' | 'portal';
  onNavigate: (view: 'dashboard' | 'planner' | 'resources' | 'portal') => void;
}

const Header: React.FC<HeaderProps> = ({ activeView, onNavigate }) => {
  const getLinkClass = (view: string) => {
    const base = "text-sm font-medium transition px-1 py-4 border-b-2 ";
    return activeView === view 
      ? base + "text-indigo-600 border-indigo-600" 
      : base + "text-slate-500 hover:text-slate-900 border-transparent";
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('planner')}>
            <div className="p-2 bg-indigo-600 rounded-lg">
              <BrainCircuit className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">
              EduTech <span className="text-indigo-600">Nexus</span>
            </span>
          </div>
          
          <nav className="hidden md:flex space-x-8 h-full items-center">
            <button 
              onClick={() => onNavigate('dashboard')}
              className={getLinkClass('dashboard')}
            >
              Dashboard
            </button>
            <button 
              onClick={() => onNavigate('planner')}
              className={getLinkClass('planner')}
            >
              Lesson Planner
            </button>
            <button 
              onClick={() => onNavigate('resources')}
              className={getLinkClass('resources')}
            >
              Resources
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <button className="text-slate-500 hover:text-slate-900 p-2">
              <Layout className="w-5 h-5" />
            </button>
            <button 
              onClick={() => onNavigate('portal')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition ${activeView === 'portal' ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'}`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${activeView === 'portal' ? 'bg-white/20' : 'bg-indigo-100'}`}>
                <GraduationCap className={`w-4 h-4 ${activeView === 'portal' ? 'text-white' : 'text-indigo-600'}`} />
              </div>
              <span className="text-xs font-semibold">Teacher Portal</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
