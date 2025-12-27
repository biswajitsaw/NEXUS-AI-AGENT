import React, { useState } from 'react';
import Header from './components/Header';
import StudentForm from './components/StudentForm';
import ResultDisplay from './components/ResultDisplay';
import { LessonParams, StudentProfile, AIResponse } from './types';
import { generatePersonalizedPath } from './services/geminiService';
import { 
  Send, Loader2, Sparkles, AlertCircle, BarChart3, Book, Users, 
  TrendingUp, Calendar, Zap, Settings, Shield, Bell, LogOut, 
  ChevronRight, User, Mail, ShieldCheck, Globe
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';

// Renamed to avoid collision with potential Lucide BrainCircuit icon
const LocalBrainIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .52 8.105 4 4 0 0 0 7.327-2.338l.676-1.662" />
    <path d="M9 13a4 4 0 0 1 0-8" />
    <path d="M10 12h4" />
    <path d="M14 8h4" />
    <path d="M15 22v-4a2 2 0 0 0-2-2h-3" />
    <path d="M18 12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2" />
    <circle cx="18" cy="16" r="3" />
    <circle cx="18" cy="16" r="1" />
  </svg>
);

type View = 'dashboard' | 'planner' | 'resources' | 'portal';

const INITIAL_PARAMS: LessonParams = {
  topic: '',
  gradeLevel: '',
  learningGoal: '',
  smartTool: 'Tablets',
  students: []
};

const CHART_DATA = [
  { name: 'Tier 1', value: 25, color: '#10b981' },
  { name: 'Tier 2', value: 45, color: '#4f46e5' },
  { name: 'Tier 3', value: 30, color: '#a855f7' },
];

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('planner');
  const [params, setParams] = useState<LessonParams>(INITIAL_PARAMS);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAddStudent = (student: StudentProfile) => {
    setParams(prev => ({
      ...prev,
      students: [...prev.students, student]
    }));
  };

  const handleRemoveStudent = (id: string) => {
    setParams(prev => ({
      ...prev,
      students: prev.students.filter(s => s.id !== id)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!params.topic || !params.gradeLevel) {
      setError("Please fill in basic lesson details.");
      return;
    }
    if (params.students.length === 0) {
      setError("Please add at least one student profile.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await generatePersonalizedPath(params);
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const renderDashboard = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Paths', value: '12', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Total Students', value: '124', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Smart Activities', value: '48', icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Next Lesson', value: '2pm', icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{stat.label}</p>
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>
      
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-indigo-500" />
          Class Proficiency Overview
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={CHART_DATA}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
              <Tooltip cursor={{fill: '#f8fafc'}} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={60}>
                {CHART_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderResources = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-500">
      {[
        { title: 'Interactive Simulations', count: '124 Materials', description: 'PhET and custom WebGL simulations for science and math.', icon: Book, color: 'bg-blue-500' },
        { title: 'Smart Sensor Guides', count: '12 Manuals', description: 'How to integrate Arduino and IoT sensors into your daily curriculum.', icon: Zap, color: 'bg-amber-500' },
        { title: 'AI Prompt Library', count: '50+ Prompts', description: 'Curated prompts for generating high-quality educational content.', icon: Sparkles, color: 'bg-purple-500' },
        { title: 'Collaborative Boards', count: '8 Templates', description: 'Digital whiteboard templates for real-time student collaboration.', icon: Users, color: 'bg-emerald-500' },
      ].map((res, i) => (
        <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-indigo-300 transition group cursor-pointer">
          <div className="flex gap-4">
            <div className={`w-12 h-12 ${res.color} rounded-xl flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition`}>
              <res.icon className="w-6 h-6" />
            </div>
            <div>
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-slate-900">{res.title}</h3>
                <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full uppercase tracking-tighter">{res.count}</span>
              </div>
              <p className="text-sm text-slate-500">{res.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderPortal = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="h-24 bg-indigo-600 relative">
            <div className="absolute -bottom-10 left-6 w-20 h-20 bg-white rounded-2xl border-4 border-white shadow-lg flex items-center justify-center">
              <User className="w-10 h-10 text-indigo-600" />
            </div>
          </div>
          <div className="pt-12 p-6">
            <h3 className="text-xl font-bold text-slate-900">Alex Thompson, Ed.D</h3>
            <p className="text-slate-500 text-sm mb-4">Senior Instructional Designer</p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Mail className="w-4 h-4" />
                alex.t@edutech-nexus.ai
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Globe className="w-4 h-4" />
                San Francisco Unified District
              </div>
            </div>
            <button className="w-full mt-6 bg-slate-50 text-slate-700 font-semibold py-2 rounded-lg border border-slate-200 hover:bg-slate-100 transition text-sm">
              Edit Profile
            </button>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Settings className="w-5 h-5 text-indigo-500" />
              Teacher Configuration
            </h3>
            <div className="space-y-6">
              {[
                { icon: Shield, title: 'Privacy Controls', desc: 'Manage how student data is anonymized and stored.', toggle: true },
                { icon: Bell, title: 'Notification Center', desc: 'Get alerts when AI detects a critical learning gap.', toggle: true },
                { icon: ShieldCheck, title: 'API Management', desc: 'Your Gemini API connection is active and healthy.', toggle: false, status: 'Active' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-slate-400">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{item.title}</p>
                      <p className="text-xs text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                  {item.toggle ? (
                    <div className="w-10 h-6 bg-indigo-600 rounded-full relative">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                    </div>
                  ) : (
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase">
                      {item.status}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center">
                  <LogOut className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Sign Out</p>
                  <p className="text-xs text-slate-500">Securely end your current session.</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPlanner = () => (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-500" />
            Lesson Configuration
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Lesson Topic</label>
              <input
                type="text"
                placeholder="e.g. Plate Tectonics"
                className="w-full text-sm border border-slate-700 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-900 text-white placeholder-slate-400 shadow-inner"
                value={params.topic}
                onChange={e => setParams({...params, topic: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Grade Level</label>
              <select 
                className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none bg-white text-slate-900 font-medium"
                value={params.gradeLevel}
                onChange={e => setParams({...params, gradeLevel: e.target.value})}
              >
                <option value="" className="text-slate-900 bg-white">Select Grade</option>
                {[...Array(12)].map((_, i) => (
                  <option key={i+1} value={`${i+1}th Grade`} className="text-slate-900 bg-white">
                    {i+1}th Grade
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Specific Goal</label>
              <textarea
                placeholder="e.g. Understanding convection currents"
                className="w-full text-sm border border-slate-700 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none h-20 bg-slate-900 text-white placeholder-slate-400 shadow-inner"
                value={params.learningGoal}
                onChange={e => setParams({...params, learningGoal: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Smart Tool Focus</label>
              <select 
                className="w-full text-sm border border-slate-700 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-900 text-white font-medium shadow-inner"
                value={params.smartTool}
                onChange={e => setParams({...params, smartTool: e.target.value})}
              >
                <option value="Tablets" className="text-white bg-slate-900">Digital Tablets</option>
                <option value="VR/AR" className="text-white bg-slate-900">VR/AR Headsets</option>
                <option value="IoT Sensors" className="text-white bg-slate-900">IoT Environmental Sensors</option>
                <option value="Interactive Whiteboard" className="text-white bg-slate-900">Interactive Whiteboard</option>
                <option value="3D Printing" className="text-white bg-slate-900">3D Printing</option>
              </select>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <span className="text-xs text-red-600">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold py-3 rounded-xl transition shadow-md shadow-indigo-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Orchestrating...</>
              ) : (
                <><Send className="w-4 h-4" /> Generate Learning Path</>
              )}
            </button>
          </form>
        </div>

        <StudentForm 
          students={params.students} 
          onAdd={handleAddStudent} 
          onRemove={handleRemoveStudent} 
        />
      </div>

      <div className="lg:col-span-8">
        {result ? (
          <ResultDisplay data={result} />
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-white rounded-2xl border border-dashed border-slate-300">
            <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
              <LocalBrainIcon className="w-10 h-10 text-indigo-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Ready to Orchestrate?</h2>
            <p className="text-slate-500 max-w-md">
              Configure your lesson topic and student profiles on the left. 
              EduTech Nexus will generate a personalized curriculum roadmap instantly.
            </p>
            
            <div className="mt-12 w-full max-w-md">
               <div className="flex items-center gap-2 mb-4">
                 <BarChart3 className="w-4 h-4 text-slate-400" />
                 <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Class Projection (Demo)</span>
               </div>
               <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={CHART_DATA}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                    <YAxis hide />
                    <Tooltip cursor={{fill: '#f8fafc'}} />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={40}>
                      {CHART_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pb-20">
      <Header activeView={activeView} onNavigate={setActiveView} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {activeView === 'dashboard' ? 'Classroom Overview' : 
             activeView === 'planner' ? 'Lesson Orchestrator' : 
             activeView === 'resources' ? 'Educational Resources' :
             'Teacher Portal'}
          </h1>
          <p className="text-slate-500">
            {activeView === 'dashboard' ? 'Real-time performance metrics and class health.' : 
             activeView === 'planner' ? 'Differentiate and personalize your curriculum.' : 
             activeView === 'resources' ? 'Curated tools and guides for the smart classroom.' :
             'Manage your profile, district settings, and system preferences.'}
          </p>
        </div>

        {activeView === 'dashboard' && renderDashboard()}
        {activeView === 'planner' && renderPlanner()}
        {activeView === 'resources' && renderResources()}
        {activeView === 'portal' && renderPortal()}
      </main>
      
      <footer className="mt-20 border-t border-slate-100 py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
           <div className="flex items-center justify-center gap-2 mb-4 grayscale opacity-50">
             <LocalBrainIcon className="w-5 h-5" />
             <span className="font-bold text-slate-600">EDUTECH NEXUS</span>
           </div>
           <p className="text-sm text-slate-400">Advanced AI Orchestration for Modern Classrooms &copy; 2025</p>
        </div>
      </footer>
    </div>
  );
};

export default App;