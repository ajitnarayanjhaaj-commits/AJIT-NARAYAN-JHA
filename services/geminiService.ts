
import { GoogleGenAI, Type } from "@google/genai";
import { ConsumptionData, EmissionBreakdown, AIAdvice } from "../types";

export async function getAIInsights(data: ConsumptionData, breakdown: EmissionBreakdown): Promise<AIAdvice> {
  // Initialize Gemini with the provided API Key
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Act as a professional Indian sustainability consultant and senior climate scientist. 
    Analyze the following annual carbon footprint data for an individual living in India.
    
    USER PROFILE & CONSUMPTION DATA:
    1. Energy: Consumes ${data.electricityKwh} Units (kWh) of electricity and ${data.gasConsumptionKg} Kg of LPG/PNG monthly.
    2. Transport: Primary mode is ${data.transportMode} with a daily commute of ${data.commuteDistanceKm} km. 
       - Annual Rail Travel: ${data.railTravelKm} Kms.
       - Annual Flights: ${data.flightsDomesticHours}h Domestic, ${data.flightsIntlHours}h International.
    3. Food: Follows a ${data.dietType} diet with ${data.foodWastePercentage}% reported food waste.
    4. Waste: Generates ${data.wasteKgsPerDay} kg trash daily, disposed via: ${data.wasteDisposal}.
    5. Lifestyle: Spends ₹${data.clothingSpending} monthly on clothes and ₹${data.electronicsSpending} annually on electronics.

    CALCULATED EMISSIONS (kg CO₂e/year):
    - Total: ${breakdown.total.toFixed(0)} kg
    - Energy: ${breakdown.energy.toFixed(0)} kg
    - Transportation: ${breakdown.transportation.toFixed(0)} kg
    - Food Habits: ${breakdown.food.toFixed(0)} kg
    - Waste Management: ${breakdown.waste.toFixed(0)} kg
    - Life Style: ${breakdown.lifestyle.toFixed(0)} kg

    INSTRUCTIONS:
    - Provide a short, encouraging summary of their current impact compared to the Indian average of ~1900kg.
    - Give 4 highly specific, actionable recommendations.
    - Mention specific Indian context: BEE Star labels, PM-KUSUM solar scheme, FAME-II for EVs, IRCTC sustainability, local composting, or traditional low-waste practices.
    - Be realistic for the Indian socioeconomic context.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { 
              type: Type.STRING,
              description: "A 2-3 sentence overview of the user's carbon footprint."
            },
            recommendations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  impact: { type: Type.STRING, enum: ['High', 'Medium', 'Low'] }
                },
                required: ['title', 'description', 'impact']
              }
            }
          },
          required: ['summary', 'recommendations']
        }
      }
    });

    const text = response.text || "{}";
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      summary: `Your yearly footprint is estimated at ${(breakdown.total / 1000).toFixed(2)} tons of CO₂e. This is based on your lifestyle patterns in India.`,
      recommendations: [
        { 
          title: "Optimize Household Energy", 
          description: `With ${data.electricityKwh} units of monthly usage, consider BEE 5-star rated appliances to lower Energy emissions.`, 
          impact: "High" 
        },
        { 
          title: "Eco-friendly Commute", 
          description: `Since you commute ${data.commuteDistanceKm} km via ${data.transportMode}, consider EV options under FAME-II.`, 
          impact: "High" 
        }
      ]
    };
  }
}
