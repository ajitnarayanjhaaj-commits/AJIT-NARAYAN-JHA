
import React, { useState } from 'react';
import { ConsumptionData, DietType, TransportMode, WasteDisposal } from '../types';

interface Props {
  onCalculate: (data: ConsumptionData) => void;
}

const CalculatorForm: React.FC<Props> = ({ onCalculate }) => {
  const [step, setStep] = useState(0); 
  const [data, setData] = useState<ConsumptionData>({
    isHousehold: false,
    householdMembers: 1,
    electricityKwh: 0,
    gasConsumptionKg: 0, 
    commuteDistanceKm: 0,
    transportMode: TransportMode.METRO,
    flightsDomesticHours: 0,
    flightsIntlHours: 0,
    railTravelKm: 0,
    dietType: DietType.VEGETARIAN,
    foodWastePercentage: 0,
    wasteKgsPerDay: 0,
    wasteDisposal: WasteDisposal.LANDFILL,
    clothingSpending: 0,
    electronicsSpending: 0,
  });

  const inputClasses = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2 border bg-white text-gray-900 placeholder-gray-400 font-medium";

  const nextStep = () => setStep(s => Math.min(s + 1, 5));
  const prevStep = () => setStep(s => Math.max(s - 1, 0));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate(data);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-8 animate-fadeIn">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-black text-purple-900 mb-2">How should we calculate?</h3>
              <p className="text-slate-500 font-medium">Choose your reporting context for more accurate results.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button 
                type="button"
                onClick={() => { setData({...data, isHousehold: false, householdMembers: 1}); setStep(1); }}
                className={`p-8 rounded-3xl border-4 text-left transition-all duration-300 transform hover:scale-[1.02] active:scale-95 flex flex-col items-center justify-center space-y-4 ${!data.isHousehold ? 'border-purple-600 bg-purple-50 shadow-xl' : 'border-slate-100 bg-white hover:border-purple-200'}`}
              >
                <div className="text-6xl">👤</div>
                <div className="text-center">
                  <div className="text-xl font-black text-slate-800 uppercase tracking-widest">Individual</div>
                  <p className="text-sm text-slate-500 font-bold mt-1">Calculate just for yourself</p>
                </div>
              </button>

              <div className={`p-8 rounded-3xl border-4 transition-all duration-300 ${data.isHousehold ? 'border-purple-600 bg-purple-50 shadow-xl' : 'border-slate-100 bg-white hover:border-purple-200'}`}>
                <button 
                  type="button"
                  onClick={() => setData({...data, isHousehold: true})}
                  className="w-full flex flex-col items-center justify-center space-y-4 mb-6"
                >
                  <div className="text-6xl">🏠</div>
                  <div className="text-center">
                    <div className="text-xl font-black text-slate-800 uppercase tracking-widest">Household</div>
                    <p className="text-sm text-slate-500 font-bold mt-1">Calculate for your entire home</p>
                  </div>
                </button>
                
                {data.isHousehold && (
                  <div className="space-y-3 animate-slideDown">
                    <label className="block text-center text-xs font-black text-purple-700 uppercase tracking-widest">Number of Individuals</label>
                    <div className="flex items-center justify-center space-x-6">
                      <button 
                        type="button"
                        onClick={() => setData({...data, householdMembers: Math.max(1, data.householdMembers - 1)})}
                        className="w-10 h-10 rounded-full bg-white border-2 border-purple-600 text-purple-600 flex items-center justify-center font-black hover:bg-purple-600 hover:text-white transition-colors"
                      >—</button>
                      <span className="text-3xl font-black text-purple-900 w-12 text-center">{data.householdMembers}</span>
                      <button 
                        type="button"
                        onClick={() => setData({...data, householdMembers: Math.min(20, data.householdMembers + 1)})}
                        className="w-10 h-10 rounded-full bg-white border-2 border-purple-600 text-purple-600 flex items-center justify-center font-black hover:bg-purple-600 hover:text-white transition-colors"
                      >+</button>
                    </div>
                    <button 
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-full bg-purple-600 text-white font-black py-3 rounded-xl mt-4 uppercase tracking-widest text-xs shadow-lg shadow-purple-200"
                    >Continue with Household</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-purple-800 border-b pb-2">1. Energy Use</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700">Monthly Electricity (Units/kWh)</label>
                <input 
                  type="number" 
                  placeholder="e.g. 150"
                  className={inputClasses}
                  value={data.electricityKwh || ''}
                  onChange={e => setData({...data, electricityKwh: Number(e.target.value)})}
                />
                <p className="mt-1 text-xs text-gray-500">
                  <span className="font-medium text-purple-600">Unit Info:</span> {data.isHousehold ? "Enter total household usage." : "Enter your personal usage share."}
                </p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700">Monthly LPG/PNG Consumption (Kg)</label>
                <input 
                  type="number" step="0.1"
                  placeholder="e.g. 14.2"
                  className={inputClasses}
                  value={data.gasConsumptionKg || ''}
                  onChange={e => setData({...data, gasConsumptionKg: Number(e.target.value)})}
                />
                <p className="mt-1 text-xs text-gray-500">
                  <span className="font-medium text-purple-600">Unit Info:</span> {data.isHousehold ? "Total household gas used." : "Your share of gas usage."}
                </p>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-purple-800 border-b pb-2">2. Transportation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700">Daily Commute (Km Roundtrip)</label>
                <input 
                  type="number" 
                  placeholder="e.g. 20"
                  className={inputClasses}
                  value={data.commuteDistanceKm || ''}
                  onChange={e => setData({...data, commuteDistanceKm: Number(e.target.value)})}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700">Primary Commute Mode</label>
                <select 
                  className={inputClasses}
                  value={data.transportMode}
                  onChange={e => setData({...data, transportMode: e.target.value as TransportMode})}
                >
                  {Object.values(TransportMode).map(mode => <option key={mode} value={mode} className="bg-white text-gray-900">{mode}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700">Annual Rail travel (Kms)</label>
                <input 
                  type="number" 
                  placeholder="e.g. 1200"
                  className={inputClasses}
                  value={data.railTravelKm || ''}
                  onChange={e => setData({...data, railTravelKm: Number(e.target.value)})}
                />
                <p className="mt-1 text-xs text-gray-500">
                  <span className="font-medium text-purple-600">Info:</span> Total distance traveled via Indian Railways in the last year.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700">Annual Dom. Flight (h)</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 4"
                    className={inputClasses}
                    value={data.flightsDomesticHours || ''}
                    onChange={e => setData({...data, flightsDomesticHours: Number(e.target.value)})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700">Annual Intl. Flight (h)</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 0"
                    className={inputClasses}
                    value={data.flightsIntlHours || ''}
                    onChange={e => setData({...data, flightsIntlHours: Number(e.target.value)})}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-purple-800 border-b pb-2">3. Food Habits</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700">Dietary Habit</label>
                <select 
                  className={inputClasses}
                  value={data.dietType}
                  onChange={e => setData({...data, dietType: e.target.value as DietType})}
                >
                  {Object.values(DietType).map(type => <option key={type} value={type} className="bg-white text-gray-900">{type}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700">Food Waste (%)</label>
                <input 
                  type="range" min="0" max="50" step="5"
                  className="mt-2 block w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  value={data.foodWastePercentage}
                  onChange={e => setData({...data, foodWastePercentage: Number(e.target.value)})}
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1 uppercase font-bold">
                  <span>0%</span>
                  <span className="text-purple-600">{data.foodWastePercentage}% wasted</span>
                  <span>50%</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-purple-800 border-b pb-2">4. Waste Management</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700">Daily Waste Generated (Kgs)</label>
                <input 
                  type="number" step="0.1"
                  placeholder="e.g. 0.5"
                  className={inputClasses}
                  value={data.wasteKgsPerDay || ''}
                  onChange={e => setData({...data, wasteKgsPerDay: Number(e.target.value)})}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700">Disposal Method</label>
                <select 
                  className={inputClasses}
                  value={data.wasteDisposal}
                  onChange={e => setData({...data, wasteDisposal: e.target.value as WasteDisposal})}
                >
                  {Object.values(WasteDisposal).map(mode => <option key={mode} value={mode} className="bg-white text-gray-900">{mode}</option>)}
                </select>
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-purple-800 border-b pb-2">5. Life Style</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700">Monthly Clothing Spend (INR)</label>
                <input 
                  type="number" 
                  placeholder="e.g. 1500"
                  className={inputClasses}
                  value={data.clothingSpending || ''}
                  onChange={e => setData({...data, clothingSpending: Number(e.target.value)})}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700">Yearly Electronics Spend (INR)</label>
                <input 
                  type="number" 
                  placeholder="e.g. 15000"
                  className={inputClasses}
                  value={data.electronicsSpending || ''}
                  onChange={e => setData({...data, electronicsSpending: Number(e.target.value)})}
                />
              </div>
            </div>
            <div className="mt-8 pt-6 border-t">
               <button 
                onClick={handleSubmit}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-black py-3 px-6 rounded-lg transition-colors shadow-lg uppercase tracking-wider"
               >
                 Calculate Yearly CO₂ Emission
               </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-8 rounded-[40px] shadow-2xl border border-purple-100 max-w-3xl mx-auto overflow-hidden">
      {step > 0 && (
        <div className="flex justify-between mb-8 overflow-x-auto pb-2">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className={`flex items-center ${i < 5 ? 'flex-1' : ''} min-w-[60px]`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-all duration-300 ${step >= i ? 'bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-100' : 'bg-white border-gray-200 text-gray-300'}`}>
                {i}
              </div>
              {i < 5 && <div className={`flex-1 h-1 mx-2 rounded-full ${step > i ? 'bg-purple-600' : 'bg-gray-100'}`} />}
            </div>
          ))}
        </div>
      )}

      <form onSubmit={(e) => e.preventDefault()} className="min-h-[360px] flex flex-col justify-center">
        {renderStep()}
      </form>

      {step > 0 && (
        <div className="flex justify-between mt-12">
          <button 
            onClick={prevStep}
            className={`px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-xs border-2 transition-all duration-300 ${step === 0 ? 'hidden' : 'border-slate-200 text-slate-400 hover:border-purple-600 hover:text-purple-600'}`}
          >
            Back
          </button>
          {step < 5 && step > 0 && (
            <button 
              onClick={nextStep}
              className="px-10 py-3 rounded-2xl font-black uppercase tracking-widest text-xs bg-purple-600 text-white hover:bg-purple-700 shadow-xl shadow-purple-100 transform hover:-translate-y-1 transition-all"
            >
              Continue
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CalculatorForm;
