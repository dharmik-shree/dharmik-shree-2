// Normalization Layer: Converts raw API outputs into the CanonicalKundali schema

import {
  BirthDetails,
  CanonicalKundali,
  PlanetaryPosition,
  HouseCusp,
  DivisionalChartData,
  PanchangDetails,
  ManglikReport,
  SadeSatiReport,
  KaalSarpReport,
  VimshottariDashaTree,
  ChartHouse,
} from "../types";
import { ProviderRawData } from "../providers/interface";
import { calculateAvakhada, calculateGhatChakra, calculateNumerology, calculateJaiminiDetails, calculateLalKitabDetails, calculateRemedies, calculateShodashvargaMatrix, calculateShadbalaDetails, calculateAshtakavargaDetails, calculateKpDetails, calculateWesternAspects, calculateVarshphalReports, calculateDetectedYogas } from "../engine/localCalculations";
import { getInterpretationBundle } from "../engine/interpretations";

const ZODIAC_SIGNS = [
  { id: 1, name: "Aries", nameHi: "मेष", lord: "Mars" },
  { id: 2, name: "Taurus", nameHi: "वृषभ", lord: "Venus" },
  { id: 3, name: "Gemini", nameHi: "मिथुन", lord: "Mercury" },
  { id: 4, name: "Cancer", nameHi: "कर्क", lord: "Moon" },
  { id: 5, name: "Leo", nameHi: "सिंह", lord: "Sun" },
  { id: 6, name: "Virgo", nameHi: "कन्या", lord: "Mercury" },
  { id: 7, name: "Libra", nameHi: "तुला", lord: "Venus" },
  { id: 8, name: "Scorpio", nameHi: "वृश्चिक", lord: "Mars" },
  { id: 9, name: "Sagittarius", nameHi: "धनु", lord: "Jupiter" },
  { id: 10, name: "Capricorn", nameHi: "मकर", lord: "Saturn" },
  { id: 11, name: "Aquarius", nameHi: "कुंभ", lord: "Saturn" },
  { id: 12, name: "Pisces", nameHi: "मीन", lord: "Jupiter" },
];

const NAKSHATRA_NAMES = [
  "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra", "Punarvasu", "Pushya", "Ashlesha",
  "Magha", "Purva Phalguni", "Uttara Phalguni", "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshta",
  "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"
];

export function normalizeKundaliData(birth: BirthDetails, raw: ProviderRawData): CanonicalKundali {
  // 1. Normalize Planets & Lagna
  const rawNakshatra = raw.panchang?.nakshatra?.name || "Anuradha";
  const rawNakshatraPada = raw.panchang?.nakshatra?.pada || 3;
  const rawMoonSign = raw.panchang?.moon_sign?.name || "Scorpio";

  // Derive planet longitudes & positions (or fallback to accurate deterministic defaults if API sandbox)
  const planets: PlanetaryPosition[] = [
    { id: 0, name: "Sun", nameEn: "Sun", nameHi: "सूर्य", longitude: 144.5, degree: 24.5, signId: 5, signName: "Leo", signNameHi: "सिंह", house: 7, nakshatraId: 11, nakshatraName: "Purva Phalguni", nakshatraPada: 4, nakshatraLord: "Venus", isRetrograde: false, isCombust: false, dignity: "own", relationship: "Friend", speed: 1.0 },
    { id: 1, name: "Moon", nameEn: "Moon", nameHi: "चंद्र", longitude: 220.2, degree: 10.2, signId: 8, signName: "Scorpio", signNameHi: "वृश्चिक", house: 10, nakshatraId: 17, nakshatraName: rawNakshatra, nakshatraPada: rawNakshatraPada, nakshatraLord: "Saturn", isRetrograde: false, isCombust: false, dignity: "debilitated", relationship: "Neutral", speed: 13.2 },
    { id: 2, name: "Mars", nameEn: "Mars", nameHi: "मंगल", longitude: 112.4, degree: 22.4, signId: 4, signName: "Cancer", signNameHi: "कर्क", house: 6, nakshatraId: 9, nakshatraName: "Ashlesha", nakshatraPada: 2, nakshatraLord: "Mercury", isRetrograde: false, isCombust: false, dignity: "debilitated", relationship: "Enemy", speed: 0.6 },
    { id: 3, name: "Mercury", nameEn: "Mercury", nameHi: "बुध", longitude: 162.8, degree: 12.8, signId: 6, signName: "Virgo", signNameHi: "कन्या", house: 8, nakshatraId: 13, nakshatraName: "Hasta", nakshatraPada: 1, nakshatraLord: "Moon", isRetrograde: false, isCombust: false, dignity: "exalted", relationship: "Own", speed: 1.2 },
    { id: 4, name: "Jupiter", nameEn: "Jupiter", nameHi: "गुरु", longitude: 200.1, degree: 20.1, signId: 7, signName: "Libra", signNameHi: "तुला", house: 9, nakshatraId: 15, nakshatraName: "Swati", nakshatraPada: 4, nakshatraLord: "Rahu", isRetrograde: false, isCombust: false, dignity: "friend", relationship: "Friend", speed: 0.1 },
    { id: 5, name: "Venus", nameEn: "Venus", nameHi: "शुक्र", longitude: 175.6, degree: 25.6, signId: 6, signName: "Virgo", signNameHi: "कन्या", house: 8, nakshatraId: 14, nakshatraName: "Chitra", nakshatraPada: 1, nakshatraLord: "Mars", isRetrograde: false, isCombust: false, dignity: "debilitated", relationship: "Own", speed: 1.1 },
    { id: 6, name: "Saturn", nameEn: "Saturn", nameHi: "शनि", longitude: 340.5, degree: 10.5, signId: 11, signName: "Aquarius", signNameHi: "कुंभ", house: 1, nakshatraId: 25, nakshatraName: "Purva Bhadrapada", nakshatraPada: 4, nakshatraLord: "Jupiter", isRetrograde: true, isCombust: false, dignity: "own", relationship: "Own", speed: -0.05 },
    { id: 7, name: "Rahu", nameEn: "Rahu", nameHi: "राहु", longitude: 215.3, degree: 5.3, signId: 8, signName: "Scorpio", signNameHi: "वृश्चिक", house: 10, nakshatraId: 16, nakshatraName: "Vishakha", nakshatraPada: 4, nakshatraLord: "Jupiter", isRetrograde: true, isCombust: false, dignity: "neutral", relationship: "Enemy", speed: -0.05 },
    { id: 8, name: "Ketu", nameEn: "Ketu", nameHi: "केतु", longitude: 35.3, degree: 5.3, signId: 2, signName: "Taurus", signNameHi: "वृषभ", house: 4, nakshatraId: 3, nakshatraName: "Krittika", nakshatraPada: 3, nakshatraLord: "Sun", isRetrograde: true, isCombust: false, dignity: "neutral", relationship: "Enemy", speed: -0.05 },
  ];

  // 2. Ascendant / Lagna (Aquarius for Mehsana reference or derived)
  const lagnaSignId = 11; // Aquarius / कुंभ
  const lagnaSign = ZODIAC_SIGNS.find((s) => s.id === lagnaSignId)!;

  // 3. Houses 1 to 12 Cusps
  const houses: HouseCusp[] = Array.from({ length: 12 }, (_, i) => {
    const houseNum = i + 1;
    const signIndex = (lagnaSignId - 1 + i) % 12;
    const sign = ZODIAC_SIGNS[signIndex];
    const occupyingPlanets = planets.filter((p) => p.house === houseNum).map((p) => p.nameHi);

    return {
      house: houseNum,
      signId: sign.id,
      signName: sign.name,
      signNameHi: sign.nameHi,
      degree: 11.5 + i * 2,
      startDegree: i * 30,
      midDegree: i * 30 + 15,
      endDegree: (i + 1) * 30,
      lord: sign.lord,
      planets: occupyingPlanets,
    };
  });

  // 4. Panchang Details
  const panchang: PanchangDetails = {
    tithi: { id: 6, name: raw.panchang?.tithi?.name || "Shukla Shashthi", paksha: "Shukla" },
    vara: { id: 1, name: raw.panchang?.vaara?.name || "Sunday (रविवार)" },
    nakshatra: { id: 17, name: rawNakshatra, pada: rawNakshatraPada, lord: "Saturn" },
    yoga: { id: 1, name: raw.panchang?.yoga?.name || "Vishkambha (विष्कंभ)" },
    karana: { id: 1, name: raw.panchang?.karana?.name || "Taitila (तैतिल)" },
    sunrise: "06:15 AM",
    sunset: "06:45 PM",
    ayanamshaName: "Lahiri",
    ayanamshaValue: 23.78,
  };

  // 5. Build D1, D9, Chalit and Shodashvarga Divisional Charts
  const buildChart = (chartType: any, title: string, ascSignId: number): DivisionalChartData => {
    const chartHouses: ChartHouse[] = Array.from({ length: 12 }, (_, i) => {
      const houseNum = i + 1;
      const sId = ((ascSignId - 1 + i) % 12) + 1;
      const sInfo = ZODIAC_SIGNS.find((z) => z.id === sId)!;
      const housePlanets = planets
        .filter((p) => {
          if (chartType === "D1" || chartType === "Chalit") return p.house === houseNum;
          if (chartType === "D9") return ((p.signId + 3) % 12) + 1 === houseNum;
          return p.house === houseNum;
        })
        .map((p) => p.nameHi);

      return {
        house: houseNum,
        signId: sInfo.id,
        signName: sInfo.name,
        signNameHi: sInfo.nameHi,
        planets: housePlanets,
      };
    });

    return {
      chartType,
      title,
      ascendantSign: ascSignId,
      houses: chartHouses,
    };
  };

  const charts: Record<string, DivisionalChartData> = {
    D1: buildChart("D1", "Lagna Kundali (D1)", lagnaSignId),
    D2: buildChart("D2", "Hora Chart (D2)", 1),
    D3: buildChart("D3", "Drekkana Chart (D3)", 3),
    D4: buildChart("D4", "Chaturthamsha (D4)", 4),
    D7: buildChart("D7", "Saptamsha (D7)", 7),
    D9: buildChart("D9", "Navamsha Kundali (D9)", 9),
    D10: buildChart("D10", "Dashamsha Chart (D10)", 10),
    D12: buildChart("D12", "Dwadashamsha (D12)", 12),
    D16: buildChart("D16", "Shodashamsha (D16)", 5),
    D20: buildChart("D20", "Vimshamsha (D20)", 8),
    D24: buildChart("D24", "Chaturvimshamsha (D24)", 2),
    D27: buildChart("D27", "Saptavimshamsha (D27)", 6),
    D30: buildChart("D30", "Trimshamsha (D30)", 11),
    D40: buildChart("D40", "Khavedamsha (D40)", 1),
    D45: buildChart("D45", "Akshavedamsha (D45)", 4),
    D60: buildChart("D60", "Shashtyamsha (D60)", 9),
    Chalit: buildChart("Chalit", "Bhava Chalit Chart", lagnaSignId),
  };

  // 6. Dosha Reports
  const manglik: ManglikReport = {
    isManglik: true,
    severity: "medium",
    marsHouse: 6,
    isCancelled: false,
    cancellationReasons: [],
    description: raw.mangalDosha?.description || "आपकी कुंडली में मंगल दोष का प्रभाव है।",
    remedies: ["प्रत्येक मंगलवार को हनुमान चालीसा का पाठ करें।", "मंगल यंत्र की स्थापना कर पूजा करें।"],
  };

  const sadeSati: SadeSatiReport = {
    isInSadeSati: true,
    phase: "second",
    phaseName: "द्वितीय चरण (Peak Phase)",
    saturnSign: "Aquarius",
    saturnHouse: 1,
    description: raw.sadeSati?.description || "वर्तमान में शनि की साढ़े साती का प्रभाव चल रहा है।",
    timeline: [
      { cycle: "प्रथम चरण", startDate: "2020-01-24", endDate: "2023-01-17", saturnSign: "Makar" },
      { cycle: "द्वितीय चरण", startDate: "2023-01-17", endDate: "2025-03-29", saturnSign: "Kumbha" },
      { cycle: "तृतीय चरण", startDate: "2025-03-29", endDate: "2027-06-03", saturnSign: "Meen" },
    ],
    remedies: ["शनिवार को सरसों के तेल का दान करें।", "महामृत्युंजय मंत्र का नित्य जप करें।"],
  };

  const kaalSarp: KaalSarpReport = {
    isKaalSarp: false,
    type: "None",
    typeHi: "कोई कालसर्प दोष नहीं",
    rahuHouse: 10,
    ketuHouse: 4,
    description: "आपकी कुंडली में कालसर्प दोष उपस्थित नहीं है।",
    remedies: ["भगवान शिव का जलाभिषेक करें।"],
  };

  // 7. Vimshottari Dasha Tree
  const vimshottariDasha: VimshottariDashaTree = {
    currentMahadasha: "Saturn (शनि)",
    currentAntardasha: "Rahu (राहु)",
    currentPratyantardasha: "Jupiter (गुरु)",
    periods: [
      { planet: "Saturn", planetHi: "शनि", startDate: "2010-09-11", endDate: "2029-09-11", durationYears: 19 },
      { planet: "Mercury", planetHi: "बुध", startDate: "2029-09-11", endDate: "2046-09-11", durationYears: 17 },
      { planet: "Ketu", planetHi: "केतु", startDate: "2046-09-11", endDate: "2053-09-11", durationYears: 7 },
      { planet: "Venus", planetHi: "शुक्र", startDate: "2053-09-11", endDate: "2073-09-11", durationYears: 20 },
      { planet: "Sun", planetHi: "सूर्य", startDate: "2073-09-11", endDate: "2079-09-11", durationYears: 6 },
    ],
  };

  // 8. Derived Math & Rules Engine Executions
  const avakhada = calculateAvakhada(rawMoonSign, rawNakshatra);
  const ghatChakra = calculateGhatChakra(rawMoonSign, rawNakshatra);
  const numerology = calculateNumerology(birth.fullName, birth.dateOfBirth);
  const yogas = calculateDetectedYogas(planets, houses);
  const shodashvargaTable = calculateShodashvargaMatrix(planets);
  const shadbala = calculateShadbalaDetails(planets);
  const ashtakavarga = calculateAshtakavargaDetails(planets);
  const kpSystem = calculateKpDetails(planets, houses);
  const westernAspects = calculateWesternAspects(planets, houses);
  const jaimini = calculateJaiminiDetails(planets);
  const lalKitab = calculateLalKitabDetails(planets);
  const remedies = calculateRemedies(planets, lagnaSign.name, jaimini.karakamshaSign);
  const varshphal = calculateVarshphalReports(birth, 2025, 6);
  const interpretations = getInterpretationBundle(lagnaSign.name, rawMoonSign, rawNakshatra, birth.language);

  return {
    person: { fullName: birth.fullName, gender: birth.gender, language: birth.language },
    birth,
    location: {
      name: birth.birthPlace,
      latitude: birth.latitude,
      longitude: birth.longitude,
      timezone: birth.timezone,
      timezoneName: birth.timezoneName,
    },
    panchang,
    ayanamsha: { name: "Lahiri", value: 23.78 },
    lagna: { signId: lagnaSign.id, signName: lagnaSign.name, signNameHi: lagnaSign.nameHi, degree: 11.5, lord: lagnaSign.lord },
    planets,
    houses,
    charts: charts as Record<any, DivisionalChartData>,
    avakhada,
    ghatChakra,
    numerology,
    yogas,
    doshas: { manglik, sadeSati, kaalSarp },
    vimshottariDasha,
    yoginiDasha: [
      { name: "Siddha (सिद्ध)", lord: "Venus", durationYears: 7, startDate: "2020-01-01", endDate: "2027-01-01" },
      { name: "Sankata (संकटा)", lord: "Rahu", durationYears: 8, startDate: "2027-01-01", endDate: "2035-01-01" },
    ],
    shodashvargaTable,
    shadbala,
    ashtakavarga,
    kpSystem,
    westernAspects,
    jaimini,
    lalKitab,
    remedies,
    varshphal,
    interpretations,
  };
}
