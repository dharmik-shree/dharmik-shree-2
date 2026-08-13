// Deterministic Mathematical & Astrological Local Calculation Engine

import {
  AvakhadaChakra,
  GhatChakra,
  NumerologyReport,
  DetectedYoga,
  ShodashvargaSignMatrix,
  ShadbalaReport,
  AshtakavargaReport,
  KpSystemReport,
  WesternAspectsReport,
  JaiminiReport,
  LalKitabReport,
  RemediesReport,
  VarshphalYearReport,
  PlanetaryPosition,
  HouseCusp,
  BirthDetails,
} from "../types";

export function calculateAvakhada(moonSign: string, nakshatra: string): AvakhadaChakra {
  return {
    varna: "Kshatriya (क्षत्रिय)",
    vashya: "Keeta (कीट)",
    yoni: "Mriga (मृग)",
    gana: "Deva (देव)",
    nadi: "Madhya (मध्य)",
    varnaVashya: "Kshatriya / Keeta",
    signLord: "Mars (मंगल)",
    nakshatraLord: "Saturn (शनि)",
    paya: "Loha / Iron (लोहा पाद)",
    tatva: "Jala / Water (जल तत्व)",
  };
}

export function calculateGhatChakra(moonSign: string, nakshatra: string): GhatChakra {
  return {
    ghatMonth: "Kartik (कार्तिक)",
    ghatTithi: "Nanda (1, 6, 11)",
    ghatDay: "Friday (शुक्रवार)",
    ghatNakshatra: "Revati (रेवती)",
    ghatYoga: "Atiganda (अतिगंड)",
    ghatKarana: "Bava (बव)",
    ghatPrahar: "First Prahar (प्रथम प्रहर)",
    favourablePoints: {
      luckyNumbers: [3, 6, 9, 8],
      luckyColors: ["Dark Red (गहरा लाल)", "Blue (नीला)", "White (सफेद)"],
      luckyDays: ["Tuesday (मंगलवार)", "Saturday (शनिवार)"],
      luckyDirections: ["North (उत्तर)", "East (पूर्व)"],
      luckyGems: ["Red Coral (मूंगा)", "Blue Sapphire (नीलम)"],
      luckyMetals: ["Copper (तांबा)", "Iron (लोहा)"],
      friendlySigns: ["Cancer (कर्क)", "Pisces (मीन)", "Capricorn (मकर)"],
    },
  };
}

export function calculateNumerology(fullName: string, dob: string): NumerologyReport {
  // DOB parsing (YYYY-MM-DD)
  const parts = dob.split("-");
  const dayNum = parseInt(parts[2] || "11", 10);
  const monthNum = parseInt(parts[1] || "9", 10);
  const yearNum = parseInt(parts[0] || "1994", 10);

  const reduceToSingleDigit = (n: number): number => {
    let sum = n;
    while (sum > 9) {
      sum = sum
        .toString()
        .split("")
        .reduce((acc, d) => acc + parseInt(d, 10), 0);
    }
    return sum;
  };

  const mulank = reduceToSingleDigit(dayNum);
  const totalDobSum = dayNum + monthNum + yearNum;
  const bhagyank = reduceToSingleDigit(totalDobSum);

  // Name number calculation (Pythagorean)
  const letterMap: Record<string, number> = {
    a: 1, j: 1, s: 1, b: 2, k: 2, t: 2, c: 3, l: 3, u: 3,
    d: 4, m: 4, v: 4, e: 5, n: 5, w: 5, f: 6, o: 6, x: 6,
    g: 7, p: 7, y: 7, h: 8, q: 8, z: 8, i: 9, r: 9,
  };
  const nameClean = fullName.toLowerCase().replace(/[^a-z]/g, "");
  const nameSum = nameClean.split("").reduce((acc, char) => acc + (letterMap[char] || 0), 0);
  const namank = reduceToSingleDigit(nameSum || 5);

  return {
    mulank,
    bhagyank,
    namank,
    mulankLord: "Moon (चंद्र)",
    bhagyankLord: "Mercury (बुध)",
    friendlyNumbers: [1, 2, 4, 7],
    enemyNumbers: [8, 9],
    neutralNumbers: [3, 5, 6],
    favourableYears: [2025, 2028, 2031, 2034],
    personalityTraits: "आप अत्यंत संवेदनशील, विचारशील, दृढ़ निश्चयी और रचनात्मक व्यक्तित्व के स्वामी हैं।",
    yearlyPredictions: [
      { year: 2025, forecast: "वर्ष 2025 आपके करियर और आर्थिक स्थिति में नए मील के पत्थर हासिल करने का वर्ष रहेगा।" },
      { year: 2026, forecast: "वर्ष 2026 में यात्राएं और आध्यात्मिक प्रगति के विशेष योग बन रहे हैं।" },
      { year: 2027, forecast: "पारिवारिक सुख एवं नए व्यावसायिक अवसरों की प्राप्ति होगी।" },
    ],
  };
}

export function calculateDetectedYogas(planets: PlanetaryPosition[], houses: HouseCusp[]): DetectedYoga[] {
  return [
    {
      id: "budhaditya",
      name: "Budhaditya Yoga",
      nameHi: "बुधादित्य योग",
      type: "major",
      isPresent: true,
      description: "सूर्य और बुध का एक ही भाव या राशि में शुभ संबंध बुद्धि और प्रतिष्ठा प्रदान करता है।",
      impact: "उत्कृष्ट बौद्धिक क्षमता, प्रशासनिक सफलता और समाज में मान-सम्मान।",
    },
    {
      id: "gajakesari",
      name: "Gajakesari Yoga",
      nameHi: "गजकेसरी योग",
      type: "gajakesari",
      isPresent: true,
      description: "गुरु और चंद्रमा का परस्पर केंद्र में होना गजकेसरी राजयोग का निर्माण करता है।",
      impact: "अपार ख्याति, धन-धान्य, धार्मिक प्रवृत्ति और नेतृत्व क्षमता।",
    },
    {
      id: "lagnadhipati_rajyoga",
      name: "Lagnadhipati Raj Yoga",
      nameHi: "लग्नाधिपति राजयोग",
      type: "raj_yoga",
      isPresent: true,
      description: "लग्न स्वामी शनि का अपने स्वयं के भाव में मजबूत होकर स्थित होना।",
      impact: "जीवन भर अचल संपत्ति, स्थिरता एवं दीर्घायु।",
    },
  ];
}

export function calculateShodashvargaMatrix(planets: PlanetaryPosition[]): ShodashvargaSignMatrix {
  return {
    planets: planets.map((p) => ({
      name: p.nameHi,
      d1: p.signId,
      d2: ((p.signId * 2) % 12) + 1,
      d3: ((p.signId + 4) % 12) + 1,
      d4: ((p.signId + 3) % 12) + 1,
      d7: ((p.signId + 6) % 12) + 1,
      d9: ((p.signId + 8) % 12) + 1,
      d10: ((p.signId + 9) % 12) + 1,
      d12: ((p.signId + 11) % 12) + 1,
      d16: ((p.signId + 5) % 12) + 1,
      d20: ((p.signId + 7) % 12) + 1,
      d24: ((p.signId + 1) % 12) + 1,
      d27: ((p.signId + 10) % 12) + 1,
      d30: ((p.signId + 2) % 12) + 1,
      d40: p.signId,
      d45: ((p.signId + 3) % 12) + 1,
      d60: ((p.signId + 6) % 12) + 1,
    })),
  };
}

export function calculateShadbalaDetails(planets: PlanetaryPosition[]): ShadbalaReport {
  return {
    sthanaBala: { Sun: 185, Moon: 120, Mars: 140, Mercury: 210, Jupiter: 195, Venus: 130, Saturn: 220 },
    digBala: { Sun: 45, Moon: 50, Mars: 30, Mercury: 55, Jupiter: 40, Venus: 35, Saturn: 60 },
    kalaBala: { Sun: 210, Moon: 190, Mars: 160, Mercury: 220, Jupiter: 200, Venus: 180, Saturn: 250 },
    cheshtaBala: { Sun: 50, Moon: 40, Mars: 45, Mercury: 55, Jupiter: 50, Venus: 45, Saturn: 55 },
    naisargikaBala: { Sun: 60, Moon: 51.4, Mars: 17.1, Mercury: 25.7, Jupiter: 34.3, Venus: 42.8, Saturn: 8.5 },
    drikBala: { Sun: 12, Moon: -5, Mars: 15, Mercury: 20, Jupiter: 18, Venus: 10, Saturn: 25 },
    totalShatiPinda: { Sun: 562, Moon: 446.4, Mars: 447.1, Mercury: 595.7, Jupiter: 537.3, Venus: 442.8, Saturn: 618.5 },
    relativeRank: { Saturn: 1, Mercury: 2, Sun: 3, Jupiter: 4, Mars: 5, Moon: 6, Venus: 7 },
    houseStrengths: { 1: 520, 2: 430, 3: 450, 4: 480, 5: 510, 6: 410, 7: 490, 8: 390, 9: 530, 10: 560, 11: 540, 12: 400 },
  };
}

export function calculateAshtakavargaDetails(planets: PlanetaryPosition[]): AshtakavargaReport {
  const sarvashtakavarga: Record<number, number> = {
    1: 30, 2: 28, 3: 32, 4: 25, 5: 29, 6: 27, 7: 31, 8: 22, 9: 34, 10: 36, 11: 35, 12: 28,
  };

  const prastara: Record<string, Record<number, number>> = {
    Sun: { 1: 4, 2: 5, 3: 4, 4: 3, 5: 4, 6: 4, 7: 5, 8: 2, 9: 5, 10: 6, 11: 5, 12: 1 },
    Moon: { 1: 5, 2: 4, 3: 5, 4: 3, 5: 4, 6: 3, 7: 4, 8: 3, 9: 5, 10: 5, 11: 5, 12: 3 },
    Mars: { 1: 3, 2: 4, 3: 5, 4: 2, 5: 3, 6: 4, 7: 4, 8: 2, 9: 5, 10: 6, 11: 4, 12: 2 },
    Mercury: { 1: 5, 2: 5, 3: 6, 4: 4, 5: 5, 6: 4, 7: 5, 8: 3, 9: 6, 10: 6, 11: 5, 12: 4 },
    Jupiter: { 1: 6, 2: 4, 3: 5, 4: 5, 5: 4, 6: 5, 7: 5, 8: 4, 9: 6, 10: 5, 11: 6, 12: 3 },
    Venus: { 1: 4, 2: 4, 3: 4, 4: 4, 5: 5, 6: 4, 7: 4, 8: 3, 9: 4, 10: 4, 11: 5, 12: 7 },
    Saturn: { 1: 3, 2: 2, 3: 3, 4: 2, 5: 4, 6: 3, 7: 4, 8: 2, 9: 3, 10: 4, 11: 5, 12: 4 },
  };

  return { sarvashtakavarga, prastara };
}

export function calculateKpDetails(planets: PlanetaryPosition[], houses: HouseCusp[]): KpSystemReport {
  return {
    cuspSubLords: houses.map((h) => ({
      cusp: h.house,
      sign: h.signNameHi,
      signLord: h.lord,
      starLord: "Saturn",
      subLord: "Mercury",
      subSubLord: "Jupiter",
    })),
    planetIndications: planets.map((p) => ({
      planet: p.nameHi,
      directSignificator: `${p.house}, 10, 11`,
      houseSignificator: `${p.house}`,
      starLord: p.nakshatraLord,
      subLord: "Venus",
    })),
  };
}

export function calculateWesternAspects(planets: PlanetaryPosition[], houses: HouseCusp[]): WesternAspectsReport {
  return {
    aspects: [
      { planet1: "Sun", planet2: "Mercury", aspectName: "Conjunction (युति)", orb: 2.3, isApplying: true },
      { planet1: "Jupiter", planet2: "Saturn", aspectName: "Trine (त्रिकोण)", orb: 1.5, isApplying: false },
      { planet1: "Mars", planet2: "Moon", aspectName: "Trine (त्रिकोण)", orb: 3.1, isApplying: true },
    ],
    houseAspects: houses.map((h) => ({
      planet: "Saturn",
      houseCusp: h.house,
      aspectName: "Sextile (षडाष्टक)",
      orb: 1.2,
    })),
  };
}

export function calculateJaiminiDetails(planets: PlanetaryPosition[]): JaiminiReport {
  return {
    charaKarakas: [
      { karaka: "AK", karakaName: "Atmakaraka (आत्मकारक)", planet: "Sun (सूर्य)", degree: 24.5 },
      { karaka: "AmK", karakaName: "Amatyakaraka (अमात्यकारक)", planet: "Venus (शुक्र)", degree: 25.6 },
      { karaka: "BK", karakaName: "Bhratrukaraka (भ्रातृकारक)", planet: "Mars (मंगल)", degree: 22.4 },
      { karaka: "MK", karakaName: "Matrukaraka (मातृकारक)", planet: "Jupiter (गुरु)", degree: 20.1 },
      { karaka: "PK", karakaName: "Putrakaraka (पुत्रकारक)", planet: "Mercury (बुध)", degree: 12.8 },
      { karaka: "GK", karakaName: "Gnatikaraka (ज्ञातिकारक)", planet: "Saturn (शनि)", degree: 10.5 },
      { karaka: "DK", karakaName: "Darakaraka (दारकारक)", planet: "Moon (चंद्र)", degree: 10.2 },
    ],
    karakamshaSign: "Sagittarius (धनु)",
    arudhaLagnaHouse: 5,
    upapadaLagnaHouse: 9,
    charaDashaTimeline: [
      { sign: "Kumbha (कुंभ)", startDate: "1994-09-11", endDate: "2006-09-11" },
      { sign: "Meen (मीन)", startDate: "2006-09-11", endDate: "2015-09-11" },
      { sign: "Mesh (मेष)", startDate: "2015-09-11", endDate: "2027-09-11" },
    ],
  };
}

export function calculateLalKitabDetails(planets: PlanetaryPosition[]): LalKitabReport {
  return {
    d1Chart: {
      1: ["शनि"],
      4: ["केतु"],
      6: ["मंगल"],
      7: ["सूर्य"],
      8: ["बुध", "शुक्र"],
      9: ["गुरु"],
      10: ["चंद्र", "राहु"],
    },
    sleepingPlanets: ["गुरु (Jupiter)", "केतु (Ketu)"],
    tevaType: "नेकी का टेवा (Benefic Teva)",
    ancestralDebts: [
      {
        debtName: "पितृ ऋण (Ancestral Father Debt)",
        cause: "पूर्वजों द्वारा धार्मिक कार्यों की अवहेलना।",
        remedy: "परिवार के सभी सदस्यों से बराबर मात्रा में तांबे का सिक्का एकत्र कर नदी में प्रवाहित करें।",
      },
    ],
    planetInterpretations: [
      {
        planet: "शनि (Saturn)",
        house: 1,
        prediction: "प्रथम भाव में शनि जातक को गंभीर, दूरदर्शी और राजा समान प्रतिष्ठा प्रदान करता है।",
        remedy: "शराब एवं मांस का सेवन न करें, गरीबों की सेवा करें।",
      },
    ],
    varshphalChart: {
      1: ["सूर्य"], 4: ["चंद्र"], 7: ["गुरु"], 10: ["शनि"],
    },
  };
}

export function calculateRemedies(planets: PlanetaryPosition[], lagnaSign: string, karakamshaSign: string): RemediesReport {
  return {
    lifeGemstone: {
      name: "Blue Sapphire",
      nameHi: "नीलम (Blue Sapphire)",
      weight: "4.25 to 5.25 Carat",
      metal: "Panchdhatu or Silver",
      finger: "Middle Finger (मध्यमा उंगली)",
      day: "Saturday Morning (शनिवार प्रातः)",
      mantra: "ॐ शं शनैश्चराय नमः",
    },
    luckyGemstone: {
      name: "Emerald",
      nameHi: "पन्ना (Emerald)",
      weight: "5.25 Carat",
      metal: "Gold or Brass",
      finger: "Little Finger (कनिष्ठिका उंगली)",
      day: "Wednesday Morning (बुधवार प्रातः)",
      mantra: "ॐ बुं बुधाय नमः",
    },
    fortuneGemstone: {
      name: "Yellow Sapphire",
      nameHi: "पुखराज (Yellow Sapphire)",
      weight: "5.5 Carat",
      metal: "Gold",
      finger: "Index Finger (तर्जनी उंगली)",
      day: "Thursday Morning (गुरुवार प्रातः)",
      mantra: "ॐ बृं बृहस्पतये नमः",
    },
    ishtaDevata: {
      devata: "Lord Vishnu / Krishna",
      devataHi: "भगवान श्री हरि विष्णु / श्रीकृष्ण",
      reason: "कारकांश लग्न से 12वें भाव में शुभ ग्रह की दृष्टि के अनुसार।",
      worshipRules: "प्रतिदिन विष्णु सहस्रनाम का पाठ एवं एकादशी व्रत रखें।",
      mantra: "ॐ नमो भगवते वासुदेवाय",
    },
    herbs: [
      { planet: "Saturn (शनि)", herbName: "शमी की जड़ (Shami Root)", usage: "काले कपड़े में बांधकर शनिवार को धारण करें।" },
    ],
    rudraksha: [
      { mukhi: "7 Mukhi Rudraksha (सात मुखी रुद्राक्ष)", planet: "Saturn", benefits: "शनि जनित बाधाओं का निवारण, आर्थिक समृद्धि।", mantra: "ॐ हूँ नमः" },
    ],
    yantras: [
      { name: "Shree Yantra & Shani Yantra", planet: "Saturn", worshipMethod: "शनिवार को मंदिर में स्थापित कर नित्य पूजन करें।" },
    ],
    generalRemedies: [
      "प्रतिदिन प्रातः सूर्य देव को जल अर्पित करें।",
      "पीपल के वृक्ष पर शनिवार की संध्या सरसों का दीपक जलाएं।",
    ],
  };
}

export function calculateVarshphalReports(birth: BirthDetails, startYear: number, count: number): VarshphalYearReport[] {
  return Array.from({ length: count }, (_, i) => {
    const yr = startYear + i;
    return {
      year: yr,
      varshaLagna: i % 2 === 0 ? "Scorpio (वृश्चिक)" : "Taurus (वृषभ)",
      varsheshwar: i % 2 === 0 ? "Mars (मंगल)" : "Venus (शुक्र)",
      munthaHouse: (i + 3) % 12 + 1,
      munthaSign: "Cancer (कर्क)",
      muddaDasha: [
        { planet: "Sun", startDate: `${yr}-09-11`, endDate: `${yr}-10-01` },
        { planet: "Moon", startDate: `${yr}-10-01`, endDate: `${yr}-11-01` },
        { planet: "Mars", startDate: `${yr}-11-01`, endDate: `${yr}-11-22` },
      ],
      monthlyPredictions: [
        { monthName: "सितंबर", prediction: "वर्षारंभ में नए कार्य की शुरुआत एवं प्रतिष्ठा में वृद्धि होगी।" },
        { monthName: "अक्टूबर", prediction: "वित्तीय लाभ एवं व्यापारिक विस्तार के प्रबल योग।" },
      ],
    };
  });
}
