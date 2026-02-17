
export enum DietType {
  VEGAN = 'Vegan',
  VEGETARIAN = 'Vegetarian',
  EGGETARIAN = 'Eggetarian',
  NON_VEG_LOW = 'Occasional Non-Veg',
  NON_VEG_HIGH = 'Regular Non-Veg'
}

export enum TransportMode {
  METRO = 'Metro/Public Bus',
  TWO_WHEELER = 'Two Wheeler (Petrol)',
  EV_TWO_WHEELER = 'EV Two Wheeler',
  CAR_PETROL = 'Car (Petrol)',
  CAR_DIESEL = 'Car (Diesel)',
  CAR_EV = 'Car (EV)',
  AUTO_RICKSHAW = 'Auto Rickshaw/CNG'
}

export enum WasteDisposal {
  LANDFILL = 'All to Landfill/Dustbin',
  PARTIAL_RECYCLE = 'Partially Recycled',
  COMPOST_RECYCLE = 'Compost & Recycle (Eco-friendly)'
}

export interface ConsumptionData {
  // Config
  isHousehold: boolean;
  householdMembers: number;

  // 1. Energy Use
  electricityKwh: number;
  gasConsumptionKg: number; // Monthly LPG/PNG in Kg
  
  // 2. Transportation
  commuteDistanceKm: number;
  transportMode: TransportMode;
  flightsDomesticHours: number;
  flightsIntlHours: number;
  railTravelKm: number; // Annual Rail Travel in Kms

  // 3. Food Habits
  dietType: DietType;
  foodWastePercentage: number;

  // 4. Waste Management
  wasteKgsPerDay: number;
  wasteDisposal: WasteDisposal;
  
  // 5. Lifestyle
  clothingSpending: number; // Monthly INR
  electronicsSpending: number; // Monthly INR
}

export interface EmissionBreakdown {
  energy: number;
  transportation: number;
  food: number;
  waste: number;
  lifestyle: number;
  total: number;
  isHousehold: boolean;
  householdMembers: number;
}

export interface AIAdvice {
  summary: string;
  recommendations: {
    title: string;
    description: string;
    impact: 'High' | 'Medium' | 'Low';
  }[];
}
