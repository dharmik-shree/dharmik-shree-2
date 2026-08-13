// Modular 207-Page Report Section Manifest

export interface ReportSectionMeta {
  id: string;
  title: string;
  titleHi: string;
  category: "basic" | "personal" | "predictions" | "doshas" | "dashas" | "lalkitab" | "remedies" | "math" | "systems" | "varshphal";
  approxPages: number;
  enabled: boolean;
}

export const KUNDALI_REPORT_MANIFEST: ReportSectionMeta[] = [
  { id: "cover", title: "Cover Page", titleHi: "आवरण पृष्ठ", category: "basic", approxPages: 1, enabled: true },
  { id: "toc", title: "Table of Contents", titleHi: "विषय सूची", category: "basic", approxPages: 3, enabled: true },
  { id: "birth-details", title: "Birth Details & Avakhada", titleHi: "मुख्य विवरण एवं अवकहड़ा चक्र", category: "basic", approxPages: 1, enabled: true },
  { id: "ghat-chakra", title: "Ghat & Favourable Points", titleHi: "घात चक्र एवं अनुकूल बिंदु", category: "basic", approxPages: 2, enabled: true },
  { id: "planetary-positions", title: "Planetary Positions & D1/D9", titleHi: "ग्रह स्थिति एवं लग्न/नवमांश", category: "basic", approxPages: 1, enabled: true },
  { id: "bhava-chalit", title: "Bhava Chalit Table & Chart", titleHi: "चलित तालिका एवं चलित चक्र", category: "basic", approxPages: 1, enabled: true },
  { id: "key-points", title: "Key Kundali Points", titleHi: "आपकी कुंडली के प्रमुख बिंदु", category: "personal", approxPages: 1, enabled: true },
  { id: "lagna-report", title: "Lagna Report", titleHi: "आपकी लग्न रिपोर्ट", category: "personal", approxPages: 2, enabled: true },
  { id: "rashi-report", title: "Moon Sign Report", titleHi: "चंद्र राशि रिपोर्ट", category: "personal", approxPages: 2, enabled: true },
  { id: "nakshatra-report", title: "Nakshatra Report", titleHi: "आपकी नक्षत्र रिपोर्ट", category: "personal", approxPages: 2, enabled: true },
  { id: "panchang-phala", title: "Panchang Interpretations", titleHi: "पंचांग फल", category: "personal", approxPages: 2, enabled: true },
  { id: "general-predictions", title: "Detailed Predictions", titleHi: "विस्तृत भविष्यफल", category: "predictions", approxPages: 3, enabled: true },
  { id: "grah-vichar", title: "Grah Vichar", titleHi: "ज्योतिष में ग्रह विचार", category: "predictions", approxPages: 2, enabled: true },
  { id: "house-analysis", title: "House Analysis (1-12)", titleHi: "भाव फल (1 से 12 भाव)", category: "predictions", approxPages: 11, enabled: true },
  { id: "yogas", title: "Special Yogas & Raj Yogas", titleHi: "विशेष योग व राजयोग", category: "predictions", approxPages: 2, enabled: true },
  { id: "numerology", title: "Numerology Report", titleHi: "अंक ज्योतिष रिपोर्ट", category: "personal", approxPages: 4, enabled: true },
  { id: "manglik-dosha", title: "Manglik Dosha Analysis", titleHi: "मंगलदोष विवेचन", category: "doshas", approxPages: 3, enabled: true },
  { id: "sade-sati", title: "Saturn Sade Sati Report", titleHi: "साढ़े साती रिपोर्ट", category: "doshas", approxPages: 3, enabled: true },
  { id: "kaal-sarp", title: "Kaal Sarp Dosha Report", titleHi: "कालसर्प दोष एवं उपाय", category: "doshas", approxPages: 1, enabled: true },
  { id: "vimshottari-mahadasha", title: "Vimshottari Mahadasha", titleHi: "विंशोत्तरी महादशा फल", category: "dashas", approxPages: 3, enabled: true },
  { id: "vimshottari-antardasha", title: "Vimshottari Antardasha", titleHi: "अंतर्दशा फल", category: "dashas", approxPages: 18, enabled: true },
  { id: "current-transit", title: "Current Transit (Gochar)", titleHi: "आज का गोचर", category: "dashas", approxPages: 3, enabled: true },
  { id: "lal-kitab", title: "Lal Kitab Planets & Teva", titleHi: "लाल किताब ग्रह, घर व टेवा", category: "lalkitab", approxPages: 16, enabled: true },
  { id: "lal-kitab-varshphal", title: "Lal Kitab Annual Kundali", titleHi: "लाल किताब वार्षिक कुंडली", category: "lalkitab", approxPages: 3, enabled: true },
  { id: "remedies-gemstones", title: "Gemstone Recommendation", titleHi: "रत्न भविष्यवाणी", category: "remedies", approxPages: 3, enabled: true },
  { id: "ishta-devata", title: "Ishta Devata & Worship", titleHi: "इष्ट देवता", category: "remedies", approxPages: 2, enabled: true },
  { id: "remedies-general", title: "Astrological Remedies", titleHi: "उपाय एवं जड़ी सुझाव", category: "remedies", approxPages: 5, enabled: true },
  { id: "rudraksha-yantra", title: "Rudraksha & Yantra Suggestions", titleHi: "रुद्राक्ष व यंत्र सुझाव", category: "remedies", approxPages: 4, enabled: true },
  { id: "shubh-ghadi", title: "Auspicious Timings & Maitri", titleHi: "शुभ घड़ी एवं मैत्री चक्र", category: "math", approxPages: 9, enabled: true },
  { id: "shodashvarga", title: "Shodashvarga Table & 16 Charts", titleHi: "षोडशवर्ग तालिका एवं कुंडलियाँ", category: "math", approxPages: 6, enabled: true },
  { id: "shadbala-bhavabala", title: "Shadbala & Bhavabala Tables", titleHi: "षट्बल एवं भावबल तालिका", category: "math", approxPages: 2, enabled: true },
  { id: "ashtakavarga", title: "Ashtakavarga & Prastara Tables", titleHi: "अष्टकवर्ग एवं प्रस्तार तालिका", category: "math", approxPages: 8, enabled: true },
  { id: "kp-astrology", title: "KP Astrology System", titleHi: "केपी पद्धति", category: "systems", approxPages: 8, enabled: true },
  { id: "western-aspects", title: "Western Astrology & Aspects", titleHi: "पाश्चात्य पद्धति एवं दृष्टि", category: "systems", approxPages: 5, enabled: true },
  { id: "vimshottari-extended", title: "Extended Vimshottari Tree", titleHi: "विंशोत्तरी दशा - प्रत्यंतर", category: "dashas", approxPages: 17, enabled: true },
  { id: "yogini-dasha", title: "Yogini Dasha System", titleHi: "योगिनी दशा एवं फल", category: "dashas", approxPages: 4, enabled: true },
  { id: "jaimini-astrology", title: "Jaimini Astrology & Chara Dasha", titleHi: "जैमिनी पद्धति व चरदशा", category: "systems", approxPages: 7, enabled: true },
  { id: "varshphal-annual", title: "Varshphal Solar Return (6 Years)", titleHi: "वर्षफल विवरण (2025 से 2030)", category: "varshphal", approxPages: 37, enabled: true },
];
