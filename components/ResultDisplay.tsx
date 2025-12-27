
import React from 'react';
import { CheckCircle2, Info, Lightbulb, Target, Sparkles, BookOpen } from 'lucide-react';
import { AIResponse } from '../types';

interface ResultDisplayProps {
  data: AIResponse;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ data }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Analysis Card */}
      <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Info className="w-24 h-24" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-indigo-600" />
          ZPD Analysis & Operational Strategy
        </h2>
        <p className="text-slate-600 leading-relaxed text-sm whitespace-pre-wrap">
          {data.analysis}
        </p>
      </section>

      {/* Differentiation Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 shadow-sm">
          <h3 className="text-emerald-800 font-bold mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Tier 1: Emerging
          </h3>
          <p className="text-sm text-emerald-900 leading-relaxed whitespace-pre-wrap">
            {data.tiers.emerging}
          </p>
        </div>

        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 shadow-sm">
          <h3 className="text-indigo-800 font-bold mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Tier 2: Proficient
          </h3>
          <p className="text-sm text-indigo-900 leading-relaxed whitespace-pre-wrap">
            {data.tiers.proficient}
          </p>
        </div>

        <div className="bg-purple-50 border border-purple-100 rounded-2xl p-6 shadow-sm">
          <h3 className="text-purple-800 font-bold mb-3 flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            Tier 3: Advanced
          </h3>
          <p className="text-sm text-purple-900 leading-relaxed whitespace-pre-wrap">
            {data.tiers.advanced}
          </p>
        </div>
      </div>

      {/* Smart Tool Section */}
      <section className="bg-slate-900 text-white rounded-2xl p-8 relative overflow-hidden group">
        <div className="absolute -right-8 -bottom-8 bg-indigo-500/10 w-48 h-48 rounded-full transition-transform group-hover:scale-110 duration-1000"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-indigo-600 rounded-xl">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Smart Classroom Integration</h2>
              <p className="text-indigo-300 text-sm">Real-time engagement activity</p>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
            <p className="text-indigo-100 leading-relaxed whitespace-pre-wrap">
              {data.smartIntegration}
            </p>
          </div>
        </div>
      </section>

      {/* Socratic Checkpoint */}
      <section className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6 relative">
        <div className="absolute -top-3 left-6 bg-amber-200 text-amber-900 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          Critical Thinking
        </div>
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <BookOpen className="w-8 h-8 text-amber-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-amber-900 mb-2">Socratic Checkpoint</h3>
            <p className="text-amber-800 font-medium italic">
              "{data.socraticCheckpoint}"
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResultDisplay;
