
import React from 'react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid 
} from 'recharts';
import { EmissionBreakdown, ConsumptionData, AIAdvice } from '../types';
import { INDIAN_AVERAGE_FOOTPRINT, GLOBAL_AVERAGE_FOOTPRINT } from '../constants';

interface Props {
  breakdown: EmissionBreakdown;
  data: ConsumptionData;
  aiAdvice: AIAdvice | null;
  loadingAI: boolean;
  onReset: () => void;
}

const COLORS = ['#8b5cf6', '#3b82f6', '#f59e0b', '#10b981', '#ef4444'];

const ResultsDashboard: React.FC<Props> = ({ breakdown, aiAdvice, loadingAI, onReset }) => {
  const chartData = [
    { name: 'Energy Use', value: breakdown.energy || 0 },
    { name: 'Transportation', value: breakdown.transportation || 0 },
    { name: 'Food Habits', value: breakdown.food || 0 },
    { name: 'Waste Mgmt', value: breakdown.waste || 0 },
    { name: 'Life Style', value: breakdown.lifestyle || 0 },
  ];

  const total = breakdown.total || 0;

  const comparisonData = [
    { name: 'You (Per Person)', value: Math.round(total), fill: '#8b5cf6' },
    { name: 'India Avg', value: INDIAN_AVERAGE_FOOTPRINT, fill: '#94a3b8' },
    { name: 'Global Avg', value: GLOBAL_AVERAGE_FOOTPRINT, fill: '#475569' },
  ];

  // Equivalencies
  const treesPerYear = Math.ceil(total / 20); // ~20kg CO₂ per tree per year
  const smartphoneCharges = Math.round(total / 0.008); // ~0.008kg per charge
  const coalBurnedKg = Math.round(total / 2.42); // ~2.42kg CO₂ per kg of coal

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 0. Context Badge */}
      <div className="flex justify-center">
        <div className="bg-purple-100 text-purple-800 px-6 py-2 rounded-full font-black uppercase tracking-[0.2em] text-[10px] shadow-sm border border-purple-200">
          Reporting Context: {breakdown.isHousehold ? `Household (${breakdown.householdMembers} Members)` : 'Individual Personal'}
        </div>
      </div>

      {/* 1. HERO SECTION: FINAL OUTPUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-3xl p-8 text-white flex flex-col items-center justify-center shadow-2xl relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-400/20 rounded-full blur-xl"></div>
          
          <h2 className="text-sm font-black uppercase tracking-[0.2em] mb-4 opacity-80">Personal Carbon Footprint</h2>
          <div className="text-8xl font-black mb-1 tracking-tighter">{(total / 1000).toFixed(2)}</div>
          <div className="text-xl opacity-90 font-bold mb-8 uppercase tracking-widest text-purple-100">Metric Tons CO₂e / Year</div>
          
          <div className="grid grid-cols-2 gap-3 w-full">
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl text-center">
              <div className="text-xs uppercase font-black opacity-70 mb-1">Daily Personal</div>
              <div className="text-lg font-bold">{(total / 365).toFixed(1)} <span className="text-[10px]">kg</span></div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl text-center">
              <div className="text-xs uppercase font-black opacity-70 mb-1">Monthly Personal</div>
              <div className="text-lg font-bold">{(total / 12).toFixed(0)} <span className="text-[10px]">kg</span></div>
            </div>
          </div>

          {breakdown.isHousehold && (
            <div className="mt-6 pt-6 border-t border-white/20 w-full text-center">
              <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest">
                Household Total: <span className="text-white">{( (total * breakdown.householdMembers) / 1000).toFixed(2)} Tons / Year</span>
              </p>
            </div>
          )}
        </div>

        {/* 2. TOPIC ANALYSIS CHART */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-xl border border-gray-100 flex flex-col">
          <h3 className="text-lg font-black text-gray-800 mb-6 flex items-center">
            <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mr-3 text-sm">📊</span>
            Individual Contribution Breakdown
          </h3>
          <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={85}
                    paddingAngle={8}
                    dataKey="value"
                    animationBegin={0}
                    animationDuration={1500}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                    formatter={(value: number) => [`${value.toFixed(0)} kg`, 'CO₂e']} 
                  />
                  <Legend iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col justify-center space-y-3">
              {chartData.map((item, i) => (
                <div key={item.name} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-3" style={{backgroundColor: COLORS[i]}}></div>
                    <span className="text-sm font-bold text-slate-700">{item.name}</span>
                  </div>
                  <span className="text-sm font-black text-slate-900">
                    {total > 0 ? ((item.value / total) * 100).toFixed(1) : '0.0'}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. TANGIBLE IMPACTS (EQUIVALENCIES) */}
      <div className="bg-white rounded-3xl p-8 shadow-xl border border-purple-50">
        <h3 className="text-lg font-black text-gray-800 mb-8 uppercase tracking-widest text-center">Your Personal Impact Equivalent</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-purple-50 border border-purple-100">
            <div className="text-5xl mb-4">🌳</div>
            <div className="text-3xl font-black text-purple-900 mb-1">{treesPerYear}</div>
            <div className="text-xs uppercase font-black text-purple-700 tracking-wider">Trees needed per year</div>
            <p className="text-[10px] text-purple-600/70 mt-3 font-medium">To offset your share of emissions</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-blue-50 border border-blue-100">
            <div className="text-5xl mb-4">📱</div>
            <div className="text-3xl font-black text-blue-900 mb-1">{smartphoneCharges.toLocaleString()}</div>
            <div className="text-xs uppercase font-black text-blue-700 tracking-wider">Smartphone Charges</div>
            <p className="text-[10px] text-blue-600/70 mt-3 font-medium">Annual energy consumption equivalent</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-100 border border-slate-200">
            <div className="text-5xl mb-4">⛏️</div>
            <div className="text-3xl font-black text-slate-900 mb-1">{coalBurnedKg.toLocaleString()} kg</div>
            <div className="text-xs uppercase font-black text-slate-700 tracking-wider">Coal Burned Equivalent</div>
            <p className="text-[10px] text-slate-500 mt-3 font-medium">Estimated fuel consumption per person</p>
          </div>
        </div>
      </div>

      {/* 4. BENCHMARK COMPARISON */}
      <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-black text-gray-800 uppercase tracking-widest">Global & National Benchmark</h3>
          <div className="text-xs font-bold text-slate-400">Unit: kg CO₂e / Year / Person</div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
              <XAxis type="number" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 800, fill: '#1e293b'}} />
              <Tooltip cursor={{fill: '#f8fafc'}} />
              <Bar dataKey="value" radius={[0, 12, 12, 0]} barSize={40}>
                {comparisonData.map((entry, index) => (
                  <Cell key={`cell-bar-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 5. AI INSIGHTS */}
      <div className="bg-white rounded-3xl p-8 shadow-2xl border-t-[12px] border-purple-500 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
          <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z"/></svg>
        </div>
        
        <div className="flex items-center justify-between mb-10 relative z-10">
          <h3 className="text-2xl font-black text-gray-900 flex items-center">
            <span className="w-12 h-12 bg-purple-500 text-white rounded-2xl flex items-center justify-center mr-4 shadow-lg shadow-purple-200">✨</span>
            Personalized Reduction Roadmap
          </h3>
          {loadingAI && (
            <div className="flex items-center bg-purple-50 px-4 py-2 rounded-full border border-purple-100">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-200"></div>
              </div>
              <span className="ml-3 text-xs font-black text-purple-600 uppercase tracking-widest">Analyzing...</span>
            </div>
          )}
        </div>

        {aiAdvice ? (
          <div className="space-y-10 relative z-10">
            <div className="p-6 bg-slate-50 rounded-2xl border-l-8 border-purple-400">
              <p className="text-lg text-slate-700 leading-relaxed font-medium italic">
                "{aiAdvice.summary}"
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {aiAdvice.recommendations.map((rec, i) => (
                <div key={i} className="group bg-white rounded-2xl p-6 border-2 border-slate-50 shadow-sm hover:shadow-xl hover:border-purple-200 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-lg font-black text-slate-800 group-hover:text-purple-600 transition-colors">{rec.title}</h4>
                    <span className={`text-[10px] uppercase font-black px-3 py-1 rounded-full shadow-sm ${
                      rec.impact === 'High' ? 'bg-rose-500 text-white' :
                      rec.impact === 'Medium' ? 'bg-amber-400 text-white' : 'bg-sky-400 text-white'
                    }`}>
                      {rec.impact} Impact
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed font-semibold">{rec.description}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="py-24 text-center">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
               <span className="text-3xl">🤖</span>
            </div>
            <p className="text-slate-400 font-black tracking-[0.2em] uppercase text-xs">Generating Bharat-specific reduction strategies...</p>
          </div>
        )}
      </div>

      {/* FINAL ACTION AREA */}
      <div className="flex flex-col items-center space-y-6 pt-10">
        <button 
          onClick={onReset}
          className="group bg-slate-900 hover:bg-purple-600 text-white font-black py-5 px-16 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.2)] transition-all duration-500 transform hover:scale-110 active:scale-95 uppercase tracking-widest text-sm flex items-center"
        >
          <span className="mr-3">🔄</span>
          Recalculate Carbon Report
        </button>
        <div className="flex items-center text-slate-400 text-[10px] font-black uppercase tracking-widest space-x-4">
          <span>Certified Indian Standard Methodology</span>
          <span className="text-slate-200">|</span>
          <span>Zero Data Retention Policy</span>
        </div>
      </div>
    </div>
  );
};

export default ResultsDashboard;
