import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis 
} from 'recharts';
import { GitBranch, Star, GitFork, AlertCircle, Cpu, Network, Brain, Eye } from 'lucide-react';
import { REPO_METADATA, ARCHITECTURAL_GOALS, SYSTEM_METRICS } from '../constants';
import { ArchitecturalGoal } from '../types';

const MetricCard: React.FC<{ label: string; value: string | number; icon: React.ReactNode }> = ({ label, value, icon }) => (
  <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-xl flex items-center gap-4 hover:border-cyan-800/50 transition-colors">
    <div className="p-3 bg-slate-900 rounded-lg text-cyan-400">
      {icon}
    </div>
    <div>
      <p className="text-slate-400 text-xs uppercase tracking-wider">{label}</p>
      <p className="text-xl font-mono font-bold text-slate-100">{value}</p>
    </div>
  </div>
);

const GoalCard: React.FC<{ goal: ArchitecturalGoal; icon: React.ReactNode }> = ({ goal, icon }) => (
  <div className="bg-slate-800/30 border border-slate-700/50 p-5 rounded-xl hover:bg-slate-800/50 transition-all group">
    <div className="flex items-start justify-between mb-3">
      <div className="p-2 bg-slate-900 rounded-md text-cyan-500 group-hover:text-cyan-400 transition-colors">
        {icon}
      </div>
      <span className="text-[10px] font-mono text-slate-500 border border-slate-700 px-2 py-0.5 rounded">
        {goal.id.toUpperCase()}
      </span>
    </div>
    <h3 className="text-lg font-semibold text-slate-200 mb-1">{goal.component}</h3>
    <p className="text-sm text-slate-400 leading-relaxed">{goal.focus}</p>
  </div>
);

export const Dashboard: React.FC = () => {
  const getIconForGoal = (component: string) => {
    if (component.includes("Meta")) return <Brain size={20} />;
    if (component.includes("Reasoning")) return <Cpu size={20} />;
    if (component.includes("Memory")) return <Network size={20} />;
    return <Eye size={20} />;
  };

  return (
    <div className="p-6 md:p-8 space-y-8 overflow-y-auto h-full">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard label="Version" value={REPO_METADATA.version} icon={<GitBranch size={20} />} />
        <MetricCard label="Stars" value={REPO_METADATA.stars} icon={<Star size={20} />} />
        <MetricCard label="Forks" value={REPO_METADATA.forks} icon={<GitFork size={20} />} />
        <MetricCard label="Issues" value={REPO_METADATA.pull_requests_open} icon={<AlertCircle size={20} />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Goals Display */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Cpu className="text-cyan-400" /> System Directives
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ARCHITECTURAL_GOALS.map((goal) => (
              <GoalCard key={goal.id} goal={goal} icon={getIconForGoal(goal.component)} />
            ))}
          </div>
        </div>

        {/* Radar Chart for System Health */}
        <div className="bg-slate-800/20 border border-slate-700 rounded-xl p-6 flex flex-col">
          <h2 className="text-lg font-bold text-slate-100 mb-4">Architecture Balance</h2>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={SYSTEM_METRICS}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Quillan v4.2"
                  dataKey="value"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  fill="#06b6d4"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-center text-slate-500 mt-4">
            *Visual representation of component maturity based on latest epoch.
          </p>
        </div>
      </div>
    </div>
  );
};