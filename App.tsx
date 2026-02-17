
import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CalculatorForm from './components/CalculatorForm';
import ResultsDashboard from './components/ResultsDashboard';
import { ConsumptionData, EmissionBreakdown, AIAdvice } from './types';
import { EMISSION_FACTORS } from './constants';
import { getAIInsights } from './services/geminiService';

const App: React.FC = () => {
  const [breakdown, setBreakdown] = useState<EmissionBreakdown | null>(null);
  const [formData, setFormData] = useState<ConsumptionData | null>(null);
  const [aiAdvice, setAIAdvice] = useState<AIAdvice | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);

  const calculateFootprint = async (data: ConsumptionData) => {
    // Scaling Factor: If it's a household, we divide shared resources by members to get individual footprint
    const scale = data.isHousehold ? data.householdMembers : 1;

    // 1. Energy Use: Shared, divided by scale
    const energy = 
      ((data.electricityKwh * 12 * EMISSION_FACTORS.ELECTRICITY) +
      (data.gasConsumptionKg * 12 * EMISSION_FACTORS.GAS_PER_KG)) / scale;

    // 2. Transportation: Individual
    const transportation =
      (data.commuteDistanceKm * 300 * (EMISSION_FACTORS.TRANSPORT[data.transportMode] || 0)) +
      (data.flightsDomesticHours * EMISSION_FACTORS.FLIGHT_DOMESTIC) +
      (data.flightsIntlHours * EMISSION_FACTORS.FLIGHT_INTL) +
      (data.railTravelKm * EMISSION_FACTORS.RAIL);

    // 3. Food Habits: Individual
    const dietBase = EMISSION_FACTORS.DIET[data.dietType] || 1400;
    const food = dietBase * (1 + (data.foodWastePercentage / 100));

    // 4. Waste Management: Shared, divided by scale
    const waste = (data.wasteKgsPerDay * 365 * (EMISSION_FACTORS.WASTE[data.wasteDisposal] || 0.6)) / scale;

    // 5. Life Style: Individual
    // Clothing is monthly (multiplied by 12), Electronics is now yearly
    const lifestyle = 
      ((data.clothingSpending * 12 / 1000) * EMISSION_FACTORS.CLOTHING) +
      ((data.electronicsSpending / 1000) * EMISSION_FACTORS.ELECTRONICS);

    const total = energy + transportation + food + waste + lifestyle;
    
    const result: EmissionBreakdown = { 
      energy, 
      transportation, 
      food, 
      waste, 
      lifestyle, 
      total,
      isHousehold: data.isHousehold,
      householdMembers: data.householdMembers
    };
    
    setBreakdown(result);
    setFormData(data);
    setLoadingAI(true);
    setAIAdvice(null);

    // Fetch AI insights
    try {
      const advice = await getAIInsights(data, result);
      setAIAdvice(advice);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAI(false);
    }
  };

  const handleReset = () => {
    setBreakdown(null);
    setFormData(null);
    setAIAdvice(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-12 max-w-6xl">
        {!breakdown ? (
          <div className="space-y-12">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-extrabold text-purple-900 tracking-tight leading-tight">
                Indian Standard <span className="text-purple-600">Carbon Calculator</span>
              </h1>
              <p className="text-lg text-gray-600">
                A scientific approach to measuring your yearly CO₂ emissions across 5 core topics based on Indian consumption patterns.
              </p>
            </div>
            
            <CalculatorForm onCalculate={calculateFootprint} />

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-16 pt-16 border-t border-gray-100">
                <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-50">
                    <div className="text-xl mb-2">⚡</div>
                    <h4 className="font-bold text-gray-800 text-xs uppercase">Energy Use</h4>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-50">
                    <div className="text-xl mb-2">🚗</div>
                    <h4 className="font-bold text-gray-800 text-xs uppercase">Transport</h4>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-50">
                    <div className="text-xl mb-2">🍛</div>
                    <h4 className="font-bold text-gray-800 text-xs uppercase">Food Habits</h4>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-50">
                    <div className="text-xl mb-2">🗑️</div>
                    <h4 className="font-bold text-gray-800 text-xs uppercase">Waste</h4>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-50">
                    <div className="text-xl mb-2">🛍️</div>
                    <h4 className="font-bold text-gray-800 text-xs uppercase">Life Style</h4>
                </div>
            </div>
          </div>
        ) : (
          <ResultsDashboard 
            breakdown={breakdown} 
            data={formData!} 
            aiAdvice={aiAdvice}
            loadingAI={loadingAI}
            onReset={handleReset}
          />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;
