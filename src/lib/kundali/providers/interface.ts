// Abstract Interface for External Astrology Data Providers

import { BirthDetails } from "../types";

export interface ProviderRawData {
  kundli: any;
  panchang: any;
  charts: Record<string, any>;
  mangalDosha: any;
  sadeSati: any;
  kaalSarp: any;
  vimshottariDasha: any;
  varshphal?: any;
}

export interface AstrologyProvider {
  name: string;
  version: string;
  fetchFullKundaliData(birth: BirthDetails): Promise<ProviderRawData>;
}
