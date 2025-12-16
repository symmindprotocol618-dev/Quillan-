import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PERFORMANCE_HISTORY } from '../constants';
import { Database, Search, Zap } from 'lucide-react';

export const MemoryVisualizer: React.FC = () => {
  return (
    <div className="p-6 md:p-8 h-full overflow-y-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
            <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
                <Database className="text-purple-400" />
                Global Memory Fabric
            </h2>
            <p className="text-slate-400 text-sm mt-1">Real-time visualization of tensor retrieval and context density.</p>
        </div>
        <div className="flex gap-2">
            <span className="px-3 py-1 bg-green-900/30 text-green-400 border border-green-800/50 rounded text-xs font-mono">WRITE: ACTIVE</span>
            <span className="px-3 py-1 bg-cyan-900/30 text-cyan-400 border border-cyan-800/50 rounded text-xs font-mono">READ: OPTIMAL</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Chart */}
        <div className="lg:col-span-2 bg-slate-800/30 border border-slate-700 rounded-xl p-6 min-h-[400px] flex flex-col">
            <h3 className="text-lg font-semibold text-slate-200 mb-6 flex items-center gap-2">
                <Zap size={18} className="text-yellow-400"/> Retrieval Latency & Accuracy
            </h3>
            <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={PERFORMANCE_HISTORY}>
                        <defs>
                            <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorSpeed" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                        <XAxis dataKey="epoch" stroke="#64748b" tickFormatter={(v) => `Ep ${v}`} />
                        <YAxis stroke="#64748b" />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }}
                            itemStyle={{ fontSize: '12px' }}
                        />
                        <Area type="monotone" dataKey="accuracy" stroke="#06b6d4" fillOpacity={1} fill="url(#colorAccuracy)" name="Ctx Accuracy (%)" />
                        <Area type="monotone" dataKey="retrievalSpeed" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorSpeed)" name="Latency (ms)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Logs / Stats */}
        <div className="space-y-4">
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-2">
                    <Search size={20} className="text-slate-400" />
                    <h4 className="text-slate-200 font-medium">Index Health</h4>
                </div>
                <div className="text-3xl font-mono text-cyan-400 font-bold">99.8%</div>
                <p className="text-xs text-slate-500 mt-1">Vector consistency check passed.</p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 flex-1 h-[250px] overflow-hidden flex flex-col">
                <h4 className="text-slate-200 font-medium mb-3 text-sm uppercase tracking-wider">Recent Writes</h4>
                <div className="space-y-3 font-mono text-xs overflow-y-auto pr-2 custom-scrollbar">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="flex gap-2 text-slate-400 border-b border-slate-700/50 pb-2 last:border-0">
                            <span className="text-cyan-600">{new Date().toLocaleTimeString()}</span>
                            <span>Shard_0{i}: Block committed.</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};