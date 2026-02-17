
import { DietType, TransportMode, WasteDisposal } from './types';

/**
 * Emission factors (kg CO₂e per unit)
 * Sources: CEA India (Grid), IPCC, Indian Railways Sustainability Reports.
 */
export const EMISSION_FACTORS = {
  // Electricity in India is coal-heavy (~0.82 kg/kWh average)
  ELECTRICITY: 0.82, 
  
  // LPG/PNG ~ 3kg CO₂ per kg fuel
  GAS_PER_KG: 3.0,

  // Transport (per km) - Keys mapped to Enum Values
  TRANSPORT: {
    [TransportMode.METRO]: 0.02,
    [TransportMode.TWO_WHEELER]: 0.08,
    [TransportMode.EV_TWO_WHEELER]: 0.025,
    [TransportMode.CAR_PETROL]: 0.19,
    [TransportMode.CAR_DIESEL]: 0.17,
    [TransportMode.CAR_EV]: 0.05,
    [TransportMode.AUTO_RICKSHAW]: 0.09
  },

  // Rail travel (kg CO₂e per km) - India average for electrified rail
  RAIL: 0.008,

  // Flights (per hour)
  FLIGHT_DOMESTIC: 150,
  FLIGHT_INTL: 200,

  // Diet (Annual estimate base in kg CO₂e) - Keys mapped to Enum Values
  DIET: {
    [DietType.VEGAN]: 1000,
    [DietType.VEGETARIAN]: 1400,
    [DietType.EGGETARIAN]: 1600,
    [DietType.NON_VEG_LOW]: 2200,
    [DietType.NON_VEG_HIGH]: 3500
  },

  // Waste (per kg) - Keys mapped to Enum Values
  WASTE: {
    [WasteDisposal.LANDFILL]: 0.6,
    [WasteDisposal.PARTIAL_RECYCLE]: 0.3,
    [WasteDisposal.COMPOST_RECYCLE]: 0.05
  },

  // Lifestyle (per 1000 INR spending)
  CLOTHING: 12.0,
  ELECTRONICS: 25.0
};

export const INDIAN_AVERAGE_FOOTPRINT = 1900; // kg CO₂e per capita per year
export const GLOBAL_AVERAGE_FOOTPRINT = 4700; // kg CO₂e per capita per year
