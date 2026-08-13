// Canonical Kundali Data Structure (TypeScript Definitions)

export type Language = "hi" | "en" | "gu";
export type Gender = "male" | "female";

export interface BirthDetails {
  fullName: string;
  gender: Gender;
  dateOfBirth: string; // YYYY-MM-DD
  timeOfBirth: string; // HH:mm:ss (24h)
  birthPlace: string;
  latitude: number;
  longitude: number;
  timezone: number; // e.g., +5.5 for IST
  timezoneName: string; // e.g., 'Asia/Kolkata'
  language: Language;
}

export interface PanchangDetails {
  tithi: { id: number; name: string; paksha: string; endTime?: string };
  vara: { id: number; name: string };
  nakshatra: { id: number; name: string; pada: number; lord: string; endTime?: string };
  yoga: { id: number; name: string };
  karana: { id: number; name: string };
  sunrise: string;
  sunset: string;
  ayanamshaName: string;
  ayanamshaValue: number;
}

export interface PlanetaryPosition {
  id: number; // 0=Sun, 1=Moon, 2=Mars, 3=Mercury, 4=Jupiter, 5=Venus, 6=Saturn, 7=Rahu, 8=Ketu, 9=Lagna/Asc
  name: string;
  nameEn: string;
  nameHi: string;
  longitude: number; // 0 - 360 deg
  degree: number; // 0 - 30 deg in sign
  signId: number; // 1 to 12 (Aries = 1 ... Pisces = 12)
  signName: string;
  signNameHi: string;
  house: number; // 1 to 12
  nakshatraId: number;
  nakshatraName: string;
  nakshatraPada: number;
  nakshatraLord: string;
  isRetrograde: boolean;
  isCombust: boolean;
  dignity: "exalted" | "debilitated" | "own" | "friend" | "neutral" | "enemy";
  relationship: string;
  speed: number;
}

export interface HouseCusp {
  house: number; // 1 to 12
  signId: number;
  signName: string;
  signNameHi: string;
  degree: number;
  startDegree: number;
  midDegree: number;
  endDegree: number;
  lord: string;
  planets: string[];
}

export type DivisionalChartType =
  | "D1" // Lagna / Rashi
  | "D2" // Hora
  | "D3" // Drekkana
  | "D4" // Chaturthamsha
  | "D7" // Saptamsha
  | "D9" // Navamsha
  | "D10" // Dashamsha
  | "D12" // Dwadashamsha
  | "D16" // Shodashamsha
  | "D20" // Vimshamsha
  | "D24" // Chaturvimshamsha
  | "D27" // Saptavimshamsha
  | "D30" // Trimshamsha
  | "D40" // Khavedamsha
  | "D45" // Akshavedamsha
  | "D60" // Shashtyamsha
  | "Chalit"; // Bhava Chalit

export interface ChartHouse {
  house: number;
  signId: number;
  signName: string;
  signNameHi: string;
  planets: string[];
}

export interface DivisionalChartData {
  chartType: DivisionalChartType;
  title: string;
  ascendantSign: number;
  houses: ChartHouse[];
}

export interface AvakhadaChakra {
  varna: string;
  vashya: string;
  yoni: string;
  gana: string;
  nadi: string;
  varnaVashya: string;
  signLord: string;
  nakshatraLord: string;
  paya: string; // Gold, Silver, Copper, Iron
  tatva: string; // Fire, Earth, Air, Water
}

export interface GhatChakra {
  ghatMonth: string;
  ghatTithi: string;
  ghatDay: string;
  ghatNakshatra: string;
  ghatYoga: string;
  ghatKarana: string;
  ghatPrahar: string;
  favourablePoints: {
    luckyNumbers: number[];
    luckyColors: string[];
    luckyDays: string[];
    luckyDirections: string[];
    luckyGems: string[];
    luckyMetals: string[];
    friendlySigns: string[];
  };
}

export interface NumerologyReport {
  mulank: number; // Radix (Date of Birth)
  bhagyank: number; // Destiny (Total DOB sum)
  namank: number; // Name number
  mulankLord: string;
  bhagyankLord: string;
  friendlyNumbers: number[];
  enemyNumbers: number[];
  neutralNumbers: number[];
  favourableYears: number[];
  personalityTraits: string;
  yearlyPredictions: { year: number; forecast: string }[];
}

export interface DetectedYoga {
  id: string;
  name: string;
  nameHi: string;
  type: "raj_yoga" | "dhana_yoga" | "gajakesari" | "budhaditya" | "major" | "minor";
  isPresent: boolean;
  description: string;
  impact: string;
}

export interface ManglikReport {
  isManglik: boolean;
  severity: "none" | "low" | "medium" | "high";
  marsHouse: number;
  isCancelled: boolean;
  cancellationReasons: string[];
  description: string;
  remedies: string[];
}

export interface SadeSatiReport {
  isInSadeSati: boolean;
  phase: "first" | "second" | "third" | "none";
  phaseName: string;
  saturnSign: string;
  saturnHouse: number;
  description: string;
  timeline: { cycle: string; startDate: string; endDate: string; saturnSign: string }[];
  remedies: string[];
}

export interface KaalSarpReport {
  isKaalSarp: boolean;
  type: string; // e.g., Anant, Kulik, Vasuki, Shankhpal, Padma, etc.
  typeHi: string;
  rahuHouse: number;
  ketuHouse: number;
  description: string;
  remedies: string[];
}

export interface DashaPeriod {
  planet: string;
  planetHi: string;
  startDate: string;
  endDate: string;
  durationYears: number;
  antardashas?: DashaPeriod[];
  pratyantardashas?: DashaPeriod[];
}

export interface VimshottariDashaTree {
  currentMahadasha: string;
  currentAntardasha: string;
  currentPratyantardasha: string;
  periods: DashaPeriod[];
}

export interface YoginiDashaItem {
  name: string;
  lord: string;
  durationYears: number;
  startDate: string;
  endDate: string;
}

export interface ShodashvargaSignMatrix {
  planets: {
    name: string;
    d1: number;
    d2: number;
    d3: number;
    d4: number;
    d7: number;
    d9: number;
    d10: number;
    d12: number;
    d16: number;
    d20: number;
    d24: number;
    d27: number;
    d30: number;
    d40: number;
    d45: number;
    d60: number;
  }[];
}

export interface ShadbalaReport {
  sthanaBala: Record<string, number>;
  digBala: Record<string, number>;
  kalaBala: Record<string, number>;
  cheshtaBala: Record<string, number>;
  naisargikaBala: Record<string, number>;
  drikBala: Record<string, number>;
  totalShatiPinda: Record<string, number>;
  relativeRank: Record<string, number>;
  houseStrengths: Record<number, number>;
}

export interface AshtakavargaReport {
  sarvashtakavarga: Record<number, number>; // House 1 to 12 points (total sum = 337)
  prastara: Record<string, Record<number, number>>; // Planet -> House 1 to 12
}

export interface KpSystemReport {
  cuspSubLords: { cusp: number; sign: string; signLord: string; starLord: string; subLord: string; subSubLord: string }[];
  planetIndications: { planet: string; directSignificator: string; houseSignificator: string; starLord: string; subLord: string }[];
}

export interface WesternAspectsReport {
  aspects: { planet1: string; planet2: string; aspectName: string; orb: number; isApplying: boolean }[];
  houseAspects: { planet: string; houseCusp: number; aspectName: string; orb: number }[];
}

export interface JaiminiReport {
  charaKarakas: { karaka: string; karakaName: string; planet: string; degree: number }[];
  karakamshaSign: string;
  arudhaLagnaHouse: number;
  upapadaLagnaHouse: number;
  charaDashaTimeline: { sign: string; startDate: string; endDate: string }[];
}

export interface LalKitabReport {
  d1Chart: Record<number, string[]>;
  sleepingPlanets: string[];
  tevaType: string; // Dharmi, Andha, Bal-Arishta, etc.
  ancestralDebts: { debtName: string; cause: string; remedy: string }[];
  planetInterpretations: { planet: string; house: number; prediction: string; remedy: string }[];
  varshphalChart: Record<number, string[]>;
}

export interface RemediesReport {
  lifeGemstone: { name: string; nameHi: string; weight: string; metal: string; finger: string; day: string; mantra: string };
  luckyGemstone: { name: string; nameHi: string; weight: string; metal: string; finger: string; day: string; mantra: string };
  fortuneGemstone: { name: string; nameHi: string; weight: string; metal: string; finger: string; day: string; mantra: string };
  ishtaDevata: { devata: string; devataHi: string; reason: string; worshipRules: string; mantra: string };
  herbs: { planet: string; herbName: string; usage: string }[];
  rudraksha: { mukhi: string; planet: string; benefits: string; mantra: string }[];
  yantras: { name: string; planet: string; worshipMethod: string }[];
  generalRemedies: string[];
}

export interface VarshphalYearReport {
  year: number; // e.g. 2025
  varshaLagna: string;
  varsheshwar: string;
  munthaHouse: number;
  munthaSign: string;
  muddaDasha: { planet: string; startDate: string; endDate: string }[];
  monthlyPredictions: { monthName: string; prediction: string }[];
}

export interface InterpretationBundle {
  lagnaReport: { health: string; personality: string; career: string; relationships: string };
  moonSignReport: { health: string; mentalNature: string; emotionalTraits: string };
  nakshatraReport: { general: string; career: string; family: string; health: string };
  generalPredictions: { physical: string; wealth: string; family: string; education: string; career: string; health: string };
  houseReports: Record<number, { lordInfo: string; occupantsInfo: string; generalPrediction: string }>;
  planetVichar: Record<string, { summary: string; positiveTraits: string; negativeTraits: string }>;
}

export interface CanonicalKundali {
  person: { fullName: string; gender: Gender; language: Language };
  birth: BirthDetails;
  location: { name: string; latitude: number; longitude: number; timezone: number; timezoneName: string };
  panchang: PanchangDetails;
  ayanamsha: { name: string; value: number };
  lagna: { signId: number; signName: string; signNameHi: string; degree: number; lord: string };
  planets: PlanetaryPosition[];
  houses: HouseCusp[];
  charts: Record<DivisionalChartType, DivisionalChartData>;
  avakhada: AvakhadaChakra;
  ghatChakra: GhatChakra;
  numerology: NumerologyReport;
  yogas: DetectedYoga[];
  doshas: { manglik: ManglikReport; sadeSati: SadeSatiReport; kaalSarp: KaalSarpReport };
  vimshottariDasha: VimshottariDashaTree;
  yoginiDasha: YoginiDashaItem[];
  shodashvargaTable: ShodashvargaSignMatrix;
  shadbala: ShadbalaReport;
  ashtakavarga: AshtakavargaReport;
  kpSystem: KpSystemReport;
  westernAspects: WesternAspectsReport;
  jaimini: JaiminiReport;
  lalKitab: LalKitabReport;
  remedies: RemediesReport;
  varshphal: VarshphalYearReport[];
  interpretations: InterpretationBundle;
}
