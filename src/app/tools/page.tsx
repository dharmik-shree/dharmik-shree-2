"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Clock,
  Sunrise,
  ArrowRight,
  Sun,
  Award,
  BookOpen,
  Calendar,
  Sparkles,
  Search,
  CheckCircle,
  Copy,
  ChevronRight
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ToolsPage() {
  type ToolType = "panchang" | "horoscope" | "wisdom" | "muhurat" | "calendar" | "hora" | "vastu" | "sadhana";
  const [activeTab, setActiveTab] = useState<ToolType>("panchang");
  const [selectedZodiac, setSelectedZodiac] = useState<string>("Aries");
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const zodiacSigns = [
    { name: "Aries", sanskrit: "Mesha" },
    { name: "Taurus", sanskrit: "Vrishabha" },
    { name: "Gemini", sanskrit: "Mithuna" },
    { name: "Cancer", sanskrit: "Karka" },
    { name: "Leo", sanskrit: "Simha" },
    { name: "Virgo", sanskrit: "Kanya" },
    { name: "Libra", sanskrit: "Tula" },
    { name: "Scorpio", sanskrit: "Vrishchika" },
    { name: "Sagittarius", sanskrit: "Dhanu" },
    { name: "Capricorn", sanskrit: "Makara" },
    { name: "Aquarius", sanskrit: "Kumbha" },
    { name: "Pisces", sanskrit: "Meena" }
  ];

  // --- TOOL 1: Panchang Data ---
  const panchangData = {
    tithi: "Shukla Dwadashi (till 04:32 PM, then Trayodashi)",
    nakshatra: "Jyeshtha (till 06:14 PM, then Moola)",
    yoga: "Shubha (till 08:24 AM, then Shukla)",
    karana: "Bava (till 04:32 PM, then Balava)",
    sunrise: "05:48 AM",
    sunset: "07:12 PM",
    rahuKaal: "07:30 AM - 09:00 AM",
    gulikaKaal: "01:30 PM - 03:00 PM",
    abhijitMuhurat: "11:55 AM - 12:47 PM"
  };

  const [coords, setCoords] = useState<{ latitude: number; longitude: number }>({
    latitude: 19.0760, // Mumbai default
    longitude: 72.8777
  });
  const [activePanchang, setActivePanchang] = useState(panchangData);
  const [apiHoroscope, setApiHoroscope] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Geolocation and clock setup
  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 60000);

    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.warn("Geolocation unavailable. Defaulting to Mumbai coordinates.");
        }
      );
    }

    return () => clearInterval(timer);
  }, []);

  // Fetch Panchang & Horoscope from Route Handler
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const datetimeStr = new Date().toISOString();
        
        // Query Panchang
        const panchangRes = await fetch(
          `/api/prokerala?tool=panchang&latitude=${coords.latitude}&longitude=${coords.longitude}&datetime=${datetimeStr}`
        );
        if (panchangRes.ok) {
          const panchangJson = await panchangRes.json();
          if (panchangJson?.data) {
            const d = panchangJson.data;
            // Map keys safely
            setActivePanchang({
              tithi: d.tithi?.[0]?.name || d.tithi?.name || panchangData.tithi,
              nakshatra: d.nakshatra?.[0]?.name || d.nakshatra?.name || panchangData.nakshatra,
              yoga: d.yoga?.[0]?.name || d.yoga?.name || panchangData.yoga,
              karana: d.karana?.[0]?.name || d.karana?.name || panchangData.karana,
              sunrise: d.sunrise || panchangData.sunrise,
              sunset: d.sunset || panchangData.sunset,
              rahuKaal: d.rahu_kaal?.[0]?.time || d.rahu_kaal?.time || panchangData.rahuKaal,
              gulikaKaal: d.gulika_kaal?.[0]?.time || d.gulika_kaal?.time || panchangData.gulikaKaal,
              abhijitMuhurat: d.abhijit_muhurat?.[0]?.time || d.abhijit_muhurat?.time || panchangData.abhijitMuhurat
            });
          }
        }

        // Query Horoscope
        const horoscopeRes = await fetch(
          `/api/prokerala?tool=horoscope&zodiac=${selectedZodiac}&latitude=${coords.latitude}&longitude=${coords.longitude}&datetime=${datetimeStr}`
        );
        if (horoscopeRes.ok) {
          const horoscopeJson = await horoscopeRes.json();
          if (horoscopeJson?.data) {
            setApiHoroscope(horoscopeJson.data);
          }
        }
      } catch (err) {
        console.warn("Offline or missing credentials. Falling back to local offline calculations.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [coords, selectedZodiac]);

  // --- TOOL 2: Daily Horoscope Data ---

  const horoscopeDetails = {
    Aries: {
      career: 85,
      love: 78,
      health: 92,
      finance: 80,
      luckyColor: "Temple Gold",
      luckyNumber: "9",
      advice: "A high-energy day for strategic business proposals. Maintain alignment and speak from a place of quiet confidence."
    },
    Taurus: {
      career: 80,
      love: 88,
      health: 85,
      finance: 90,
      luckyColor: "Ivory White",
      luckyNumber: "6",
      advice: "Financial stability continues. Avoid sudden space re-arrangements today; let spatial energy settle naturally."
    },
    Gemini: {
      career: 75,
      love: 90,
      health: 80,
      finance: 70,
      luckyColor: "Emerald Green",
      luckyNumber: "5",
      advice: "Focus on deep communication. Write down your strategic ideas instead of expressing them out loud too early."
    },
    Cancer: {
      career: 90,
      love: 82,
      health: 88,
      finance: 75,
      luckyColor: "Moonlight Silver",
      luckyNumber: "2",
      advice: "Trust your inner intuition. A quiet hour of meditation before noon will yield answers to a lingering question."
    },
    Leo: {
      career: 88,
      love: 70,
      health: 85,
      finance: 95,
      luckyColor: "Saffron Gold",
      luckyNumber: "1",
      advice: "Leadership opportunities are presenting themselves. Speak with humility; authority is most powerful when quiet."
    },
    Virgo: {
      career: 82,
      love: 85,
      health: 90,
      finance: 88,
      luckyColor: "Bronze Brown",
      luckyNumber: "3",
      advice: "Perfect day to audit your physical office or workspace. Rearrange desk files to declutter spatial energy."
    },
    Libra: {
      career: 85,
      love: 95,
      health: 80,
      finance: 82,
      luckyColor: "Rose Burgundy",
      luckyNumber: "7",
      advice: "Relationships require balanced listening. Dedicate the evening hours to family and listening without advising."
    },
    Scorpio: {
      career: 92,
      love: 80,
      health: 78,
      finance: 85,
      luckyColor: "Deep Maroon",
      luckyNumber: "9",
      advice: "Intensity is your strength today. Focus it on solving a lingering challenge; avoid arguments with partners."
    },
    Sagittarius: {
      career: 78,
      love: 88,
      health: 95,
      finance: 80,
      luckyColor: "Mustard Yellow",
      luckyNumber: "3",
      advice: "A day of physical vitality. Spend time outdoors at sunset to recharge your solar channels."
    },
    Capricorn: {
      career: 85,
      love: 82,
      health: 88,
      finance: 90,
      luckyColor: "Charcoal Black",
      luckyNumber: "8",
      advice: "Discipline is key. Stick to your structured agenda; avoid taking on uncalculated responsibilities."
    },
    Aquarius: {
      career: 88,
      love: 78,
      health: 85,
      finance: 82,
      luckyColor: "Sky Blue",
      luckyNumber: "4",
      advice: "A creative breakthrough is close. Spend some moments in breathing exercises to release mental tension."
    },
    Pisces: {
      career: 80,
      love: 92,
      health: 90,
      finance: 85,
      luckyColor: "Sea Foam Green",
      luckyNumber: "7",
      advice: "Quiet contemplation brings peace. Avoid busy social events; spend quality time in self-study."
    }
  };

  const baseHoroscope = horoscopeDetails[selectedZodiac as keyof typeof horoscopeDetails] || horoscopeDetails.Aries;
  const activeHoroscope = {
    ...baseHoroscope,
    advice: apiHoroscope?.daily_prediction?.prediction || baseHoroscope.advice
  };

  // --- TOOL 3: Daily Vedic Wisdom Data ---
  const gitaVerse = {
    verse: "2.47",
    sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन |\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ||",
    translation: "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself to be the cause of the results of your activities, nor be attached to inaction.",
    meaning: "Perform your absolute best in business and life without being emotionally crippled by potential outcomes. Focus fully on execution; when you release the anxiety of results, clarity emerges naturally."
  };

  const handleCopyWisdom = () => {
    const textToCopy = `Bhagavad Gita Verse ${gitaVerse.verse}\n\n${gitaVerse.sanskrit}\n\nTranslation: ${gitaVerse.translation}\n\n- Via Dharmik Shree Vedic Guide`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- TOOL 4: Muhurat Finder ---
  const [selectedMuhuratType, setSelectedMuhuratType] = useState<string>("business");
  const muhuratDetails = {
    marriage: {
      title: "Vivah Muhurat",
      status: "Highly Auspicious Timing Available",
      time: "07:22 AM to 11:30 AM",
      nakshatra: "Rohini",
      notes: "The moon sits in an exalted position, invoking steady emotional connection and long-lasting domestic abundance."
    },
    business: {
      title: "Vyapaar Muhurat (Business Launch / Signing)",
      status: "Auspicious Timing",
      time: "11:55 AM to 01:40 PM (Abhijit + Shubh Hora)",
      nakshatra: "Jyeshtha",
      notes: "Best for signing major expansion plans, launching digital platforms, and executing key transactions."
    },
    housewarming: {
      title: "Griha Pravesh Muhurat",
      status: "Moderate Auspicious Timing",
      time: "02:15 PM to 03:45 PM",
      nakshatra: "Uttara Phalguni",
      notes: "Ensure the main threshold is purified with turmeric and incense before entering during this hour."
    },
    vehicle: {
      title: "Vahan Kharidi Muhurat",
      status: "Auspicious Timing",
      time: "05:10 PM to 06:45 PM",
      nakshatra: "Chitra",
      notes: "A highly grounded energy suitable for purchasing machinery, vehicles, and metal-bound equipment."
    },
    travel: {
      title: "Yatra Muhurat",
      status: "Avoid Rahu Kaal (07:30 AM - 09:00 AM)",
      time: "Best: 06:00 AM to 07:15 AM",
      nakshatra: "Hasta",
      notes: "Eastward and Northward travel is highly aligned. Avoid Southward travel during evening hours."
    },
    investment: {
      title: "Nivesh Muhurat (Asset Purchase)",
      status: "Excellent Long-Term Yield Muhurat",
      time: "11:55 AM to 12:47 PM",
      nakshatra: "Pushya",
      notes: "Highly grounded earth element active. Perfect for purchasing gold, real estate, and long-term security bonds."
    }
  };

  const activeMuhurat = muhuratDetails[selectedMuhuratType as keyof typeof muhuratDetails] || muhuratDetails.business;

  // --- TOOL 5: Festival Calendar ---
  const currentMonthFestivals = [
    { date: 24, name: "Pradosh Vrat", type: "Shivratri/Pradosh" },
    { date: 26, name: "Shravan Shivratri", type: "Shivratri" },
    { date: 28, name: "Hariyali Amavasya", type: "Amavasya" },
    { date: 31, name: "Hariyali Teej", type: "Festival" }
  ];

  // --- TOOL 6: Hora Calculator State ---
  const [selectedGoal, setSelectedGoal] = useState<string>("communication");
  const horaData = {
    communication: {
      activeHora: "Budha (Mercury)",
      status: "Ideal",
      advice: "Perfect for negotiating agreements, launching new communication channels, writing, and intellectual design.",
      element: "Ether",
    },
    wisdom: {
      activeHora: "Guru (Jupiter)",
      status: "Highly Auspicious",
      advice: "Best for educational pursuits, consulting mentors, financial planning, and wisdom retreats.",
      element: "Space",
    },
    action: {
      activeHora: "Surya (Sun)",
      status: "Powerful",
      advice: "Perfect for strategic planning, leadership alignment, health check-ups, and initiating bold ventures.",
      element: "Fire",
    },
    rest: {
      activeHora: "Shani (Saturn)",
      status: "Inward Focus Required",
      advice: "Ideal for structural review, clearing debts, quiet meditation, and solitary discipline. Avoid outward expansion.",
      element: "Earth",
    },
  };
  const activeHoraDetail = horaData[selectedGoal as keyof typeof horaData] || horaData.communication;

  // --- TOOL 7: Vastu Direction State ---
  const [selectedRoom, setSelectedRoom] = useState<string>("office");
  const vastuData = {
    office: {
      bestDirection: "North / East",
      elements: "Water & Air",
      guidance: [
        "Position your desk facing East to capture morning solar alignment, or North for mental clarity.",
        "Keep the Northeast zone completely open, clean, and decorated with a simple brass bowl of clean water.",
        "Avoid placing heavy storage cabinets in the Northeast. Keep them in the Southwest corner.",
      ]
    },
    bedroom: {
      bestDirection: "South / Southwest",
      elements: "Earth",
      guidance: [
        "Place the bed headboard facing South to ensure grounding magnetic alignment during sleep.",
        "Avoid mirrors directly facing the bed to prevent energetic restlessness.",
        "Use warm, grounding terracotta, temple bronze, and beige color palettes to induce deep rest.",
      ]
    },
    pooja: {
      bestDirection: "Northeast",
      elements: "Pure Consciousness",
      guidance: [
        "Establish your quiet altar or meditation corner in the Northeast sector to channel morning cosmic radiation.",
        "Sit facing East while meditating to invoke deep insights and calm the nervous system.",
        "Limit decor to one focus point—a brass diya, oil lamp, or a single natural flower.",
      ]
    },
  };
  const activeVastuDetail = vastuData[selectedRoom as keyof typeof vastuData] || vastuData.office;

  // --- TOOL 8: Sadhana State ---
  const [energyState, setEnergyState] = useState<string>("overwhelmed");
  const sadhanaData = {
    overwhelmed: {
      practice: "Nadi Shodhana Pranayama",
      duration: "10 Minutes",
      description: "Alternate nostril breathing designed to balance the left and right hemispheres of the brain, inducing immediate spatial calm.",
      mantra: "Om Shanti Shanti Shanti",
    },
    fatigued: {
      practice: "Surya Bhedana & Kapalabhati",
      duration: "5 Minutes",
      description: "Right-nostril-dominated breathing combined with rapid exhalations to stimulate the solar nerve pathway, raising alertness.",
      mantra: "Om Suryaya Namaha",
    },
    growth: {
      practice: "Soham Breath Meditation",
      duration: "15 Minutes",
      description: "Silent awareness observation linked to the breath, tracking the mental sound 'So' on inhale and 'Ham' on exhale.",
      mantra: "Soham (I Am That)",
    },
  };
  const activeSadhanaDetail = sadhanaData[energyState as keyof typeof sadhanaData] || sadhanaData.overwhelmed;

  const toolCategories: { id: ToolType; label: string; icon: any }[] = [
    { id: "panchang", label: "Daily Panchang", icon: Sun },
    { id: "horoscope", label: "Daily Horoscope", icon: Sparkles },
    { id: "wisdom", label: "Vedic Wisdom", icon: BookOpen },
    { id: "muhurat", label: "Muhurat Finder", icon: Clock },
    { id: "calendar", label: "Festival Calendar", icon: Calendar },
    { id: "hora", label: "Vedic Hora Hour", icon: Sunrise },
    { id: "vastu", label: "Vastu Alignment", icon: Compass },
    { id: "sadhana", label: "Sadhana Planner", icon: Award },
  ];

  return (
    <>
      <Header />

      <main className="min-h-screen bg-brand-ivory pt-32 pb-24 px-4 sm:px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.35em] text-brand-gold font-medium block">
              Digital Sanctuary
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-light text-brand-charcoal tracking-wide">
              Vedic Wisdom Portal
            </h1>
            <p className="text-sm md:text-base text-brand-charcoal/70 font-light leading-relaxed max-w-xl mx-auto">
              Interactive guides to align your daily tasks, workspace coordinates, and spiritual practice with ancient heritage systems.
            </p>
            <div className="w-16 h-px bg-brand-gold mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Sidebar Controls */}
            <div className="lg:col-span-3 space-y-2 lg:border-r lg:border-brand-gold/15 lg:pr-8">
              <span className="text-[10px] uppercase tracking-[0.25em] text-brand-gold font-semibold mb-4 block">
                Select Tool
              </span>
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                {toolCategories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveTab(cat.id)}
                      className={`flex items-center gap-3 py-3 px-4 text-left text-xs uppercase tracking-wider rounded-sm transition-all duration-300 border ${
                        activeTab === cat.id
                          ? "bg-brand-charcoal border-brand-charcoal text-brand-ivory font-semibold shadow-md"
                          : "border-brand-gold/15 hover:border-brand-gold text-brand-charcoal/80"
                      }`}
                    >
                      <Icon size={14} className={activeTab === cat.id ? "text-brand-gold" : "text-brand-charcoal/60"} />
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Display Panel */}
            <div className="lg:col-span-9">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-brand-charcoal text-brand-ivory rounded-sm border border-brand-gold/15 p-6 sm:p-10 md:p-12 shadow-2xl relative overflow-hidden min-h-[500px]"
                >
                  <div className="absolute right-0 top-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

                  {/* 1. TODAY'S PANCHANG */}
                  {activeTab === "panchang" && (
                    <div className="space-y-8">
                      <div className="flex justify-between items-start border-b border-brand-ivory/10 pb-6 flex-wrap gap-4">
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase tracking-widest text-brand-gold font-medium">Daily Vedic Panchang</span>
                          <h2 className="font-serif text-3xl font-light">Today's Alignment</h2>
                        </div>
                        <div className="bg-brand-gold/10 border border-brand-gold/20 py-2 px-4 rounded-sm text-xs font-serif text-brand-gold">
                          {currentDate || "Loading Date..."}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                        {/* Left Column: Core Astrological Data */}
                        <div className="space-y-6">
                          <div className="border-b border-brand-ivory/10 pb-4">
                            <span className="text-[10px] uppercase tracking-widest text-brand-ivory/50">Tithi</span>
                            <p className="text-sm font-light mt-1">{activePanchang.tithi}</p>
                          </div>
                          <div className="border-b border-brand-ivory/10 pb-4">
                            <span className="text-[10px] uppercase tracking-widest text-brand-ivory/50">Nakshatra</span>
                            <p className="text-sm font-light mt-1">{activePanchang.nakshatra}</p>
                          </div>
                          <div className="border-b border-brand-ivory/10 pb-4">
                            <span className="text-[10px] uppercase tracking-widest text-brand-ivory/50">Yoga</span>
                            <p className="text-sm font-light mt-1">{activePanchang.yoga}</p>
                          </div>
                          <div className="border-b border-brand-ivory/10 pb-4">
                            <span className="text-[10px] uppercase tracking-widest text-brand-ivory/50">Karana</span>
                            <p className="text-sm font-light mt-1">{activePanchang.karana}</p>
                          </div>
                        </div>

                        {/* Right Column: Timings */}
                        <div className="space-y-6 bg-brand-ivory/5 border border-brand-gold/20 p-6 rounded-sm">
                          <h3 className="text-xs uppercase tracking-widest text-brand-gold font-semibold border-b border-brand-ivory/10 pb-3">Solar & Auspicious Timings</h3>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <span className="text-[10px] uppercase tracking-widest text-brand-ivory/50">Sunrise</span>
                              <p className="text-sm font-light mt-1">{activePanchang.sunrise}</p>
                            </div>
                            <div>
                              <span className="text-[10px] uppercase tracking-widest text-brand-ivory/50">Sunset</span>
                              <p className="text-sm font-light mt-1">{activePanchang.sunset}</p>
                            </div>
                          </div>

                          <div className="border-t border-brand-ivory/10 pt-4 space-y-4">
                            <div>
                              <span className="text-[10px] uppercase tracking-widest text-brand-gold/80">Abhijit Muhurat</span>
                              <p className="text-sm font-medium text-brand-gold mt-1">{activePanchang.abhijitMuhurat}</p>
                            </div>
                            <div>
                              <span className="text-[10px] uppercase tracking-widest text-brand-ivory/50">Rahu Kaal (Avoid starting events)</span>
                              <p className="text-xs font-light text-brand-ivory/70 mt-1">{activePanchang.rahuKaal}</p>
                            </div>
                            <div>
                              <span className="text-[10px] uppercase tracking-widest text-brand-ivory/50">Gulika Kaal</span>
                              <p className="text-xs font-light text-brand-ivory/70 mt-1">{activePanchang.gulikaKaal}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 2. DAILY HOROSCOPE */}
                  {activeTab === "horoscope" && (
                    <div className="space-y-8">
                      <div className="border-b border-brand-ivory/10 pb-6">
                        <span className="text-[10px] uppercase tracking-widest text-brand-gold font-medium">Alignment Metrics</span>
                        <h2 className="font-serif text-3xl font-light">Daily Alignment</h2>
                      </div>

                      {/* Sign Selection Grid */}
                      <div className="space-y-2">
                        <span className="text-[10px] uppercase tracking-widest text-brand-ivory/60 block">Select Zodiac (Moon Sign / Rashi)</span>
                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                          {zodiacSigns.map((z) => (
                            <button
                              key={z.name}
                              onClick={() => setSelectedZodiac(z.name)}
                              className={`py-2 px-3 text-center rounded-sm text-xs border transition-all duration-300 ${
                                selectedZodiac === z.name
                                  ? "bg-brand-gold border-brand-gold text-brand-charcoal font-semibold"
                                  : "border-brand-ivory/10 text-brand-ivory hover:border-brand-gold/50"
                              }`}
                            >
                              <span className="block font-medium">{z.name}</span>
                              <span className="text-[9px] opacity-60 tracking-wider font-light">{z.sanskrit}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Horoscope Results Display */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-6 border-t border-brand-ivory/10">
                        {/* Progress Indicators */}
                        <div className="md:col-span-5 space-y-4">
                          <span className="text-[10px] uppercase tracking-widest text-brand-gold font-semibold block">Aspect Alignment</span>
                          {[
                            { label: "Career & Focus", val: activeHoroscope.career },
                            { label: "Love & Harmony", val: activeHoroscope.love },
                            { label: "Health & Vitality", val: activeHoroscope.health },
                            { label: "Wealth & Finance", val: activeHoroscope.finance }
                          ].map((item) => (
                            <div key={item.label} className="space-y-1">
                              <div className="flex justify-between text-xs font-light">
                                <span>{item.label}</span>
                                <span>{item.val}%</span>
                              </div>
                              <div className="h-1 bg-brand-ivory/10 rounded-full overflow-hidden">
                                <div className="h-full bg-brand-gold transition-all duration-500" style={{ width: `${item.val}%` }} />
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Text Advice */}
                        <div className="md:col-span-7 space-y-6 bg-brand-ivory/5 border border-brand-gold/20 p-6 rounded-sm">
                          <div className="grid grid-cols-2 gap-4 border-b border-brand-ivory/10 pb-4">
                            <div>
                              <span className="text-[10px] uppercase tracking-widest text-brand-ivory/50">Lucky Color</span>
                              <p className="text-sm font-medium text-brand-gold">{activeHoroscope.luckyColor}</p>
                            </div>
                            <div>
                              <span className="text-[10px] uppercase tracking-widest text-brand-ivory/50">Lucky Number</span>
                              <p className="text-sm font-medium text-brand-gold">{activeHoroscope.luckyNumber}</p>
                            </div>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase tracking-widest text-brand-gold font-semibold">Today's Wisdom</span>
                            <p className="text-xs text-brand-ivory/80 leading-relaxed font-light mt-2 italic">
                              &ldquo;{activeHoroscope.advice}&rdquo;
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 3. DAILY VEDIC WISDOM */}
                  {activeTab === "wisdom" && (
                    <div className="space-y-8 max-w-3xl mx-auto">
                      <div className="border-b border-brand-ivory/10 pb-6 flex justify-between items-center">
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase tracking-widest text-brand-gold font-medium">Daily Shlok</span>
                          <h2 className="font-serif text-3xl font-light">Bhagavad Gita Verse {gitaVerse.verse}</h2>
                        </div>
                        <button
                          onClick={handleCopyWisdom}
                          className="flex items-center gap-2 text-xs uppercase tracking-widest text-brand-gold border border-brand-gold/20 py-2 px-4 rounded-sm hover:bg-brand-gold hover:text-brand-charcoal transition-all duration-300"
                        >
                          <Copy size={12} />
                          <span>{copied ? "Copied!" : "Share"}</span>
                        </button>
                      </div>

                      {/* Sanskrit Callout */}
                      <div className="bg-brand-ivory/5 border-l-2 border-brand-gold p-8 rounded-sm text-center">
                        <p className="font-serif text-xl sm:text-2xl tracking-wide leading-loose text-brand-gold whitespace-pre-line font-medium">
                          {gitaVerse.sanskrit}
                        </p>
                      </div>

                      {/* Translations */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                        <div className="space-y-2">
                          <span className="text-[10px] uppercase tracking-widest text-brand-ivory/50">English Translation</span>
                          <p className="text-sm font-light text-brand-ivory/80 leading-relaxed">
                            {gitaVerse.translation}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <span className="text-[10px] uppercase tracking-widest text-brand-gold font-semibold">Practical Significance</span>
                          <p className="text-sm font-light text-brand-gold/90 leading-relaxed italic">
                            {gitaVerse.meaning}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 4. TODAY'S MUHURAT FINDER */}
                  {activeTab === "muhurat" && (
                    <div className="space-y-8">
                      <div className="border-b border-brand-ivory/10 pb-6">
                        <span className="text-[10px] uppercase tracking-widest text-brand-gold font-medium">Time Selection</span>
                        <h2 className="font-serif text-3xl font-light">Muhurat Finder</h2>
                      </div>

                      {/* Category Selection Grid */}
                      <div className="space-y-2">
                        <span className="text-[10px] uppercase tracking-widest text-brand-ivory/60 block font-semibold">What venture are you planning today?</span>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {[
                            { id: "business", label: "Business / Signings" },
                            { id: "investment", label: "Financial Purchases" },
                            { id: "housewarming", label: "Griha Pravesh (Housewarming)" },
                            { id: "marriage", label: "Vivah (Marriage Events)" },
                            { id: "vehicle", label: "Vehicle Purchase" },
                            { id: "travel", label: "Travel Planning" }
                          ].map((item) => (
                            <button
                              key={item.id}
                              onClick={() => setSelectedMuhuratType(item.id)}
                              className={`py-3 px-4 rounded-sm text-xs border text-left flex justify-between items-center transition-all duration-300 ${
                                selectedMuhuratType === item.id
                                  ? "bg-brand-gold border-brand-gold text-brand-charcoal font-semibold"
                                  : "border-brand-ivory/10 text-brand-ivory hover:border-brand-gold/50"
                              }`}
                            >
                              <span>{item.label}</span>
                              <ChevronRight size={14} className={selectedMuhuratType === item.id ? "text-brand-charcoal" : "text-brand-gold"} />
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Output details */}
                      <div className="bg-brand-ivory/5 border border-brand-gold/20 p-8 rounded-sm space-y-6 pt-6">
                        <div className="flex justify-between items-center flex-wrap gap-4 border-b border-brand-ivory/10 pb-4">
                          <div className="space-y-1">
                            <span className="text-[10px] uppercase tracking-widest text-brand-ivory/50">Selected Category</span>
                            <h3 className="font-serif text-xl text-brand-gold font-light">{activeMuhurat.title}</h3>
                          </div>
                          <span className="text-xs uppercase tracking-widest px-3 py-1 bg-brand-gold/15 text-brand-gold border border-brand-gold/35 rounded-full font-semibold">
                            {activeMuhurat.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div>
                            <span className="text-[10px] uppercase tracking-widest text-brand-ivory/50 block">Auspicious Windows</span>
                            <span className="text-sm font-semibold text-brand-gold block mt-1">{activeMuhurat.time}</span>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase tracking-widest text-brand-ivory/50 block">Dominant Nakshatra</span>
                            <span className="text-sm font-light block mt-1">{activeMuhurat.nakshatra}</span>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase tracking-widest text-brand-ivory/50 block">Vedic Recommendations</span>
                            <span className="text-xs text-brand-ivory/70 font-light block mt-1 leading-relaxed">{activeMuhurat.notes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 5. FESTIVAL CALENDAR */}
                  {activeTab === "calendar" && (
                    <div className="space-y-8">
                      <div className="border-b border-brand-ivory/10 pb-6 flex justify-between items-center flex-wrap gap-4">
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase tracking-widest text-brand-gold font-medium">Sacred Days</span>
                          <h2 className="font-serif text-3xl font-light">Festival Calendar</h2>
                        </div>
                        <span className="text-sm font-semibold uppercase tracking-widest text-brand-gold border border-brand-gold/25 py-2 px-5 rounded-sm">
                          {new Date().toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
                        </span>
                      </div>

                      {/* Calendar visual layout */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                        <div className="md:col-span-7 bg-brand-ivory/5 border border-brand-gold/15 p-6 rounded-sm">
                          <div className="grid grid-cols-7 gap-2 text-center text-[10px] uppercase tracking-widest text-brand-ivory/40 pb-4 border-b border-brand-ivory/10 mb-4">
                            <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
                          </div>
                          {/* Minimal 31 days calendar block grid starting on appropriate offset */}
                          <div className="grid grid-cols-7 gap-2 text-center text-xs font-light">
                            {/* Empty pads for weekday alignments */}
                            <span></span><span></span><span></span><span></span>
                            {Array.from({ length: 31 }, (_, i) => {
                              const day = i + 1;
                              const isFestival = currentMonthFestivals.some(f => f.date === day);
                              return (
                                <div
                                  key={day}
                                  className={`py-3 relative flex flex-col justify-between items-center rounded-sm transition-all duration-300 ${
                                    isFestival
                                      ? "bg-brand-gold/15 border border-brand-gold text-brand-gold font-semibold cursor-pointer"
                                      : "text-brand-ivory/60 hover:bg-brand-ivory/5"
                                  }`}
                                >
                                  <span>{day}</span>
                                  {isFestival && <span className="absolute bottom-1 w-1 h-1 bg-brand-gold rounded-full" />}
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* List panel */}
                        <div className="md:col-span-5 space-y-4">
                          <span className="text-[10px] uppercase tracking-widest text-brand-gold font-semibold block">Sacred Days This Month</span>
                          <div className="space-y-3">
                            {currentMonthFestivals.map((fest) => (
                              <div
                                key={fest.name}
                                className="border border-brand-gold/15 p-4 rounded-sm flex items-center justify-between"
                              >
                                <div className="space-y-1">
                                  <h4 className="text-sm font-medium text-brand-gold">{fest.name}</h4>
                                  <span className="text-[9px] uppercase tracking-widest text-brand-ivory/40">{fest.type}</span>
                                </div>
                                <span className="text-xs font-serif border border-brand-gold/20 px-3 py-1 text-brand-gold bg-brand-gold/5 rounded-sm">
                                  Date {fest.date}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 6. VEDIC HORA */}
                  {activeTab === "hora" && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                      <div className="lg:col-span-7 space-y-6">
                        <div className="flex items-center gap-3">
                          <Clock className="text-brand-gold" size={20} />
                          <span className="text-xs uppercase tracking-widest text-brand-gold font-medium">
                            Horary Hour Calculator
                          </span>
                        </div>
                        <h2 className="font-serif text-3xl md:text-4xl font-light tracking-wide animate-fade-in">
                          Determine Your Best Actions
                        </h2>
                        <p className="text-brand-ivory/70 text-sm md:text-base font-light leading-relaxed">
                          Vedic Horas segment the day into hourly cosmic intervals ruled by specific planetary forces. Allying your tasks to these currents ensures natural momentum.
                        </p>

                        <div className="pt-4">
                          <label className="block text-xs uppercase tracking-widest text-brand-gold/80 mb-3 font-semibold">
                            What is your primary goal right now?
                          </label>
                          <div className="grid grid-cols-2 gap-3">
                            {[
                              { id: "communication", label: "Negotiate / Write" },
                              { id: "wisdom", label: "Learn / Advise" },
                              { id: "action", label: "Lead / Strategy" },
                              { id: "rest", label: "Review / Meditate" },
                            ].map((item) => (
                              <button
                                key={item.id}
                                onClick={() => setSelectedGoal(item.id)}
                                className={`text-xs uppercase tracking-wider py-3 px-4 border rounded-sm transition-all duration-300 ${
                                  selectedGoal === item.id
                                    ? "bg-brand-gold border-brand-gold text-brand-charcoal font-semibold"
                                    : "border-brand-ivory/20 text-brand-ivory/80 hover:border-brand-gold hover:text-brand-gold"
                                }`}
                              >
                                {item.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="lg:col-span-5 bg-brand-ivory/5 border border-brand-gold/20 p-8 rounded-sm space-y-6">
                        <div className="flex justify-between items-center border-b border-brand-ivory/10 pb-4">
                          <span className="text-[10px] uppercase tracking-widest text-brand-ivory/50">Local time</span>
                          <span className="text-sm font-semibold tracking-widest text-brand-gold">{currentTime}</span>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase tracking-widest text-brand-ivory/50">Ideal Vedic Hora</span>
                          <p className="font-serif text-2xl text-brand-gold font-light">{activeHoraDetail.activeHora}</p>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase tracking-widest text-brand-ivory/50">Ruling Element</span>
                          <p className="text-sm font-light">{activeHoraDetail.element}</p>
                        </div>
                        <div className="space-y-2 pt-2 border-t border-brand-ivory/10">
                          <span className="text-[10px] uppercase tracking-widest text-brand-gold font-semibold">Vedic Guidance</span>
                          <p className="text-xs text-brand-ivory/70 leading-relaxed font-light">
                            {activeHoraDetail.advice}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 7. VASTU ALIGNMENT */}
                  {activeTab === "vastu" && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                      <div className="lg:col-span-7 space-y-6">
                        <div className="flex items-center gap-3">
                          <Compass className="text-brand-gold" size={20} />
                          <span className="text-xs uppercase tracking-widest text-brand-gold font-medium">
                            Spatial Alignment Guide
                          </span>
                        </div>
                        <h2 className="font-serif text-3xl md:text-4xl font-light tracking-wide">
                          Align Your Spatial Geometry
                        </h2>
                        <p className="text-brand-ivory/70 text-sm md:text-base font-light leading-relaxed">
                          Vastu Shastra balances human interaction with spatial fields. Find recommendations to unlock smooth flow and focus in your rooms.
                        </p>

                        <div className="pt-4">
                          <label className="block text-xs uppercase tracking-widest text-brand-gold/80 mb-3 font-semibold">
                            Select Space Category
                          </label>
                          <div className="flex gap-4">
                            {[
                              { id: "office", label: "Study & Office" },
                              { id: "bedroom", label: "Master Bedroom" },
                              { id: "pooja", label: "Meditation Space" },
                            ].map((item) => (
                              <button
                                key={item.id}
                                onClick={() => setSelectedRoom(item.id)}
                                className={`text-xs uppercase tracking-widest py-3 px-6 border rounded-sm transition-all duration-300 ${
                                  selectedRoom === item.id
                                    ? "bg-brand-gold border-brand-gold text-brand-charcoal font-semibold"
                                    : "border-brand-ivory/20 text-brand-ivory hover:border-brand-gold hover:text-brand-gold"
                                }`}
                              >
                                {item.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="lg:col-span-5 bg-brand-ivory/5 border border-brand-gold/20 p-8 rounded-sm space-y-6">
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase tracking-widest text-brand-ivory/50">Ideal Placement Zone</span>
                          <p className="font-serif text-2xl text-brand-gold font-light">{activeVastuDetail.bestDirection}</p>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase tracking-widest text-brand-ivory/50">Dominant Elements</span>
                          <p className="text-sm font-light">{activeVastuDetail.elements}</p>
                        </div>
                        <div className="space-y-3 pt-2 border-t border-brand-ivory/10">
                          <span className="text-[10px] uppercase tracking-widest text-brand-gold font-semibold">Layout Rules</span>
                          <ul className="text-xs text-brand-ivory/80 space-y-2 list-disc list-inside font-light leading-relaxed">
                            {activeVastuDetail.guidance.map((rule, idx) => (
                              <li key={idx}>{rule}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 8. SADHANA PLANNER */}
                  {activeTab === "sadhana" && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                      <div className="lg:col-span-7 space-y-6">
                        <div className="flex items-center gap-3">
                          <Sunrise className="text-brand-gold" size={20} />
                          <span className="text-xs uppercase tracking-widest text-brand-gold font-medium">
                            Daily Alignment Planner
                          </span>
                        </div>
                        <h2 className="font-serif text-3xl md:text-4xl font-light tracking-wide">
                          Tune Your Mind and Breath
                        </h2>
                        <p className="text-brand-ivory/70 text-sm md:text-base font-light leading-relaxed">
                          Sadhana is daily conscious mental purification. Input your current mental state to extract an auspicious breathing and contemplation routine.
                        </p>

                        <div className="pt-4">
                          <label className="block text-xs uppercase tracking-widest text-brand-gold/80 mb-3 font-semibold">
                            How does your mind feel right now?
                          </label>
                          <div className="flex flex-wrap gap-3">
                            {[
                              { id: "overwhelmed", label: "Overwhelmed" },
                              { id: "fatigued", label: "Fatigued" },
                              { id: "growth", label: "Balanced" },
                            ].map((item) => (
                              <button
                                key={item.id}
                                onClick={() => setEnergyState(item.id)}
                                className={`text-xs uppercase tracking-widest py-3 px-5 border rounded-sm transition-all duration-300 ${
                                  energyState === item.id
                                    ? "bg-brand-gold border-brand-gold text-brand-charcoal font-semibold"
                                    : "border-brand-ivory/20 text-brand-ivory hover:border-brand-gold hover:text-brand-gold"
                                }`}
                              >
                                {item.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="lg:col-span-5 bg-brand-ivory/5 border border-brand-gold/20 p-8 rounded-sm space-y-5">
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase tracking-widest text-brand-ivory/50">Prescribed Kriya</span>
                          <p className="font-serif text-xl text-brand-gold font-light">{activeSadhanaDetail.practice}</p>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase tracking-widest text-brand-ivory/50">Ideal Duration</span>
                          <p className="text-sm font-light">{activeSadhanaDetail.duration}</p>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase tracking-widest text-brand-ivory/50">Recommended Mantra</span>
                          <p className="text-sm text-brand-gold font-serif italic">{activeSadhanaDetail.mantra}</p>
                        </div>
                        <div className="space-y-2 pt-2 border-t border-brand-ivory/10">
                          <span className="text-[10px] uppercase tracking-widest text-brand-gold font-semibold">Kriya Description</span>
                          <p className="text-xs text-brand-ivory/70 leading-relaxed font-light">
                            {activeSadhanaDetail.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Book Session CTA Callout */}
          <div className="mt-20 text-center max-w-2xl mx-auto space-y-6">
            <span className="text-brand-gold text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2">
              <Award size={14} /> Custom calculations
            </span>
            <h3 className="font-serif text-2xl font-light text-brand-charcoal">
              Seek Custom Vedic Spatial or Horary Guidance?
            </h3>
            <p className="text-xs md:text-sm text-brand-charcoal/60 leading-relaxed font-light">
              For complete astrological charts, auspicious timelines, or custom commercial Vastu alignment surveys, book a private consultation session directly with Dharmik Shree.
            </p>
            <a
              href="/#journey"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest bg-brand-gold text-brand-charcoal px-8 py-4 font-semibold hover:bg-brand-gold-hover transition-colors duration-300 rounded-sm shadow-md"
            >
              Book Private Consultation <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
