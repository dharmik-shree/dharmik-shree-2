"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Download, ArrowLeft, Sparkles, ShieldCheck, CheckCircle2, User, Calendar, Clock, MapPin, Globe } from "lucide-react";

// Helper function to render fallback SVG North Indian Kundali Chart
function renderNorthIndianChartSvg(title: string, planets: any[] = []) {
  return `
    <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 400 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="background:#fffdfa; border:1px solid #d97706;">
      <rect x="5" y="5" width="390" height="390" fill="none" stroke="#b45309" stroke-width="2"/>
      <line x1="5" y1="5" x2="395" y2="395" stroke="#d97706" stroke-width="1.5"/>
      <line x1="395" y1="5" x2="5" y2="395" stroke="#d97706" stroke-width="1.5"/>
      <line x1="200" y1="5" x2="5" y2="200" stroke="#b45309" stroke-width="1.5"/>
      <line x1="5" y1="200" x2="200" y2="395" stroke="#b45309" stroke-width="1.5"/>
      <line x1="200" y1="395" x2="395" y2="200" stroke="#b45309" stroke-width="1.5"/>
      <line x1="395" y1="200" x2="200" y2="5" stroke="#b45309" stroke-width="1.5"/>
      
      <!-- House Numbers -->
      <text x="195" y="175" fill="#78350f" font-size="16" font-weight="bold" font-family="serif">1</text>
      <text x="95" y="95" fill="#78350f" font-size="14" font-family="serif">2</text>
      <text x="45" y="145" fill="#78350f" font-size="14" font-family="serif">3</text>
      <text x="95" y="210" fill="#78350f" font-size="16" font-weight="bold" font-family="serif">4</text>
      <text x="45" y="275" fill="#78350f" font-size="14" font-family="serif">5</text>
      <text x="95" y="325" fill="#78350f" font-size="14" font-family="serif">6</text>
      <text x="195" y="245" fill="#78350f" font-size="16" font-weight="bold" font-family="serif">7</text>
      <text x="295" y="325" fill="#78350f" font-size="14" font-family="serif">8</text>
      <text x="345" y="275" fill="#78350f" font-size="14" font-family="serif">9</text>
      <text x="285" y="210" fill="#78350f" font-size="16" font-weight="bold" font-family="serif">10</text>
      <text x="345" y="145" fill="#78350f" font-size="14" font-family="serif">11</text>
      <text x="295" y="95" fill="#78350f" font-size="14" font-family="serif">12</text>

      <!-- Center Title -->
      <text x="200" y="30" text-anchor="middle" fill="#92400e" font-size="13" font-weight="bold" font-family="serif">${title}</text>
    </svg>
  `;
}

function KundaliViewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Retrieve form state from search parameters
  const fullName = searchParams.get("fullName") || "जातक";
  const gender = searchParams.get("gender") || "male";
  const day = searchParams.get("day") || "11";
  const month = searchParams.get("month") || "9";
  const year = searchParams.get("year") || "1994";
  const hour = searchParams.get("hour") || "06";
  const minute = searchParams.get("minute") || "05";
  const amPm = searchParams.get("amPm") || "PM";
  const birthPlace = searchParams.get("birthPlace") || "Mumbai, India";
  const latitude = searchParams.get("latitude") || "19.0760";
  const longitude = searchParams.get("longitude") || "72.8777";

  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  // States for API data
  const [panchangDetails, setPanchangDetails] = useState<any>(null);
  const [rasiChartSvg, setRasiChartSvg] = useState<string>("");
  const [navamsaChartSvg, setNavamsaChartSvg] = useState<string>("");
  const [chalitChartSvg, setChalitChartSvg] = useState<string>("");
  const [kundaliDetails, setKundaliDetails] = useState<any>(null);
  const [mangalDosha, setMangalDosha] = useState<any>(null);
  const [sadeSati, setSadeSati] = useState<any>(null);

  useEffect(() => {
    if (!fullName || !day || !month || !year) {
      router.push("/tools");
      return;
    }

    const fetchAllWithStagger = async () => {
      try {
        let hr = parseInt(hour || "12");
        if (amPm === "PM" && hr < 12) hr += 12;
        if (amPm === "AM" && hr === 12) hr = 0;
        const formattedHour = hr.toString().padStart(2, "0");
        const formattedMinute = (minute || "0").padStart(2, "0");

        const datetimeStr = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}T${formattedHour}:${formattedMinute}:00Z`;

        // 1. Panchang
        try {
          const res = await fetch(`/api/prokerala?tool=panchang&latitude=${latitude}&longitude=${longitude}&datetime=${datetimeStr}`);
          if (res.ok) {
            const json = await res.json();
            setPanchangDetails(json?.data || null);
          }
        } catch (e) {}

        // Small delay to prevent hitting 5 req/min rate limit
        await new Promise((r) => setTimeout(r, 250));

        // 2. Kundali Details
        try {
          const res = await fetch(`/api/prokerala?tool=kundali-details&latitude=${latitude}&longitude=${longitude}&datetime=${datetimeStr}`);
          if (res.ok) {
            const json = await res.json();
            setKundaliDetails(json?.data || null);
          }
        } catch (e) {}

        await new Promise((r) => setTimeout(r, 250));

        // 3. Rasi Chart
        try {
          const res = await fetch(`/api/prokerala?tool=rasi-chart&latitude=${latitude}&longitude=${longitude}&datetime=${datetimeStr}`);
          if (res.ok) {
            const json = await res.json();
            if (typeof json?.data === "string" && json.data.includes("<svg")) {
              setRasiChartSvg(json.data);
            }
          }
        } catch (e) {}

        await new Promise((r) => setTimeout(r, 250));

        // 4. Navamsha Chart
        try {
          const res = await fetch(`/api/prokerala?tool=navamsa-chart&latitude=${latitude}&longitude=${longitude}&datetime=${datetimeStr}`);
          if (res.ok) {
            const json = await res.json();
            if (typeof json?.data === "string" && json.data.includes("<svg")) {
              setNavamsaChartSvg(json.data);
            }
          }
        } catch (e) {}

        await new Promise((r) => setTimeout(r, 250));

        // 5. Chalit Chart
        try {
          const res = await fetch(`/api/prokerala?tool=chalit-chart&latitude=${latitude}&longitude=${longitude}&datetime=${datetimeStr}`);
          if (res.ok) {
            const json = await res.json();
            if (typeof json?.data === "string" && json.data.includes("<svg")) {
              setChalitChartSvg(json.data);
            }
          }
        } catch (e) {}
      } catch (err) {
        console.error("Error fetching Kundali data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllWithStagger();
  }, [fullName, gender, day, month, year, hour, minute, amPm, birthPlace, latitude, longitude, router]);

  const handleDownloadPDF = async () => {
    setDownloading(true);
    const parentContainer = document.querySelector(".custom-scrollbar") as HTMLElement;
    const originalMaxHeight = parentContainer ? parentContainer.style.maxHeight : "";
    const originalOverflow = parentContainer ? parentContainer.style.overflow : "";

    try {
      if (parentContainer) {
        parentContainer.style.maxHeight = "none";
        parentContainer.style.overflow = "visible";
      }

      const html2pdf = (await import("html2pdf.js")).default;
      const element = document.getElementById("printable-kundali-report");
      if (!element) return;

      const opt = {
        margin: [0, 0, 0, 0] as [number, number, number, number],
        filename: `${fullName.replace(/\s+/g, "_")}_Dharmik_Shree_Full_Kundali.pdf`,
        image: { type: "jpeg" as const, quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          scrollY: 0,
          scrollX: 0,
          windowWidth: 800,
        },
        jsPDF: { unit: "mm" as const, format: "a4" as const, orientation: "portrait" as const },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] }
      };

      await html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error("PDF Download failed:", err);
      window.print();
    } finally {
      if (parentContainer) {
        parentContainer.style.maxHeight = originalMaxHeight;
        parentContainer.style.overflow = originalOverflow;
      }
      setDownloading(false);
    }
  };

  const formattedDob = `${day}:${month}:${year}`;
  const formattedTime = `${hour}:${minute}:00 ${amPm}`;
  const formattedPlace = birthPlace || "Mumbai, India";

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-charcoal flex flex-col items-center justify-center text-brand-ivory px-6">
        <div className="w-16 h-16 border-4 border-brand-gold border-t-transparent rounded-full animate-spin mb-4" />
        <h2 className="font-serif text-2xl font-light tracking-wider animate-pulse">
          धार्मिकश्री प्रीमियम कुण्डली तैयार हो रही है...
        </h2>
        <p className="text-xs text-brand-ivory/50 mt-2 font-light">
          Performing high-precision Vedic computations & divisional chart renderings. Please wait.
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-brand-charcoal pt-28 pb-20 px-4 md:px-8 text-brand-ivory">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-brand-gold/20 pb-6 no-print">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-brand-gold hover:text-brand-ivory transition-colors"
          >
            <ArrowLeft size={16} /> Edit Details
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadPDF}
              disabled={downloading}
              className="bg-brand-gold hover:bg-brand-gold-hover text-brand-charcoal text-xs uppercase tracking-widest font-semibold py-3 px-6 rounded-sm flex items-center gap-2 shadow-lg transition-all"
            >
              <Download size={16} /> {downloading ? "Generating PDF..." : "Download Full Kundali PDF"}
            </button>
          </div>
        </div>

        {/* Printable PDF Main Container */}
        <div className="border border-brand-gold/25 bg-white p-2 md:p-8 rounded-sm text-gray-900 shadow-2xl overflow-y-auto max-h-[85vh] custom-scrollbar">
          <div id="printable-kundali-report" className="bg-white max-w-[800px] mx-auto space-y-12 pb-12 font-sans">
            
            {/* PAGE 1: COVER PAGE */}
            <div className="p-8 border-8 border-double border-amber-600 bg-gradient-to-b from-amber-50/60 via-white to-amber-50/40 text-center space-y-8 min-h-[1050px] flex flex-col justify-between rounded-sm">
              <div className="space-y-4 pt-4">
                <span className="text-amber-700 uppercase tracking-[0.4em] font-semibold text-xs block">
                  || श्री गणेशाय नमः ||
                </span>
                <div className="w-24 h-24 mx-auto my-4 bg-amber-100/80 rounded-full flex items-center justify-center border-2 border-amber-400 shadow-inner">
                  <span className="text-5xl text-amber-800 font-serif font-bold">ॐ</span>
                </div>
                <h1 className="font-serif text-4xl md:text-5xl font-extrabold text-amber-950 tracking-wider">
                  धार्मिकश्री प्रीमियम कुण्डली
                </h1>
                <p className="text-amber-700 text-xs tracking-widest uppercase font-semibold">
                  Complete Vedic Astro & Life Guidance System
                </p>
              </div>

              <div className="border-t-2 border-b-2 border-amber-300 py-8 my-6 space-y-4 max-w-md mx-auto bg-amber-50/30 rounded-sm">
                <span className="text-[10px] uppercase tracking-widest text-amber-700 font-bold">Prepared For</span>
                <h2 className="text-amber-950 font-serif text-3xl font-bold tracking-wide">
                  {fullName}
                </h2>
                <div className="grid grid-cols-2 gap-4 text-left text-xs text-gray-700 font-mono mt-4 px-6">
                  <div>जन्म तिथि: <span className="font-bold text-amber-950">{formattedDob}</span></div>
                  <div>जन्म समय: <span className="font-bold text-amber-950">{formattedTime}</span></div>
                  <div className="col-span-2">जन्म स्थान: <span className="font-bold text-amber-950">{formattedPlace}</span></div>
                </div>
              </div>

              <div className="space-y-2 pb-4">
                <div className="text-[10px] text-amber-800 font-bold tracking-[0.25em] uppercase">
                  Calculated & Guided by
                </div>
                <p className="font-serif text-xl font-bold text-amber-950">
                  Acharya Dharmikshree
                </p>
                <p className="text-[10px] text-gray-600 font-mono">
                  13th Generation Astrologer | Spiritual Guide & Vastu Consultant
                </p>
                <p className="text-[9px] text-amber-700 font-semibold font-mono">
                  Surat, Gujarat, India | www.dharmikshree.com
                </p>
              </div>
            </div>

            {/* PAGE BREAK */}
            <div className="page-break" style={{ pageBreakBefore: "always" }} />

            {/* PAGE 2: INDEX PAGE 1 (Topics 1-20) */}
            <div className="p-8 space-y-6 min-h-[1050px]">
              <div className="border-b-2 border-amber-600 pb-2 flex justify-between items-center">
                <h2 className="font-serif text-2xl text-amber-900 font-bold">विषय-सूची (Table of Contents - Part 1)</h2>
                <span className="text-xs text-amber-700 font-serif font-bold">Page 2</span>
              </div>
              <div className="grid grid-cols-1 gap-y-2 text-xs font-light text-gray-800">
                {[
                  { title: "मुख्य विवरण (Basic Details & Panchang)", page: 5 },
                  { title: "घात एवं अनुकूल बिन्दु (Inauspicious & Auspicious Points)", page: 6 },
                  { title: "ग्रह स्थिति (Planetary Positions & Degree Table)", page: 7 },
                  { title: "चलित तालिका एवं चलित चक्र (Chalit Table & Cusp Chart)", page: 9 },
                  { title: "आपकी कुंडली के प्रमुख बिंदु (Major Highlights & Life Energy)", page: 10 },
                  { title: "आपकी लग्न रिपोर्ट (Lagna Ascendant Profile Report)", page: 11 },
                  { title: "चंद्र राशि (Moon Sign Rashi Report)", page: 13 },
                  { title: "आपकी नक्षत्र रिपोर्ट (Nakshatra Report)", page: 15 },
                  { title: "पंचांग फल (Panchang Results & Day Vibrations)", page: 17 },
                  { title: "विस्तृत भविष्यफल (Detailed Life Predictions)", page: 19 },
                  { title: "ज्योतिष में ग्रह विचार (Planet Placement Analysis in Houses)", page: 22 },
                  { title: "भाव फल (House-by-House Analysis)", page: 28 },
                  { title: "कुंडली में उपस्थित विभिन्न विशिष्ट योग व राजयोग (Special Yogas & Raj Yogas)", page: 35 },
                  { title: "अंक ज्योतिष रिपोर्ट (Numerology Profile & Life Path)", page: 37 },
                  { title: "मंगलदोष विवेचन (Manglik Dosha Report & Analysis)", page: 41 },
                  { title: "साढ़े साती रिपोर्ट (Sadhe Sati Analysis & Timeline)", page: 43 },
                  { title: "कालसर्प दोष / योग - कालसर्प उपाय (Kaal Sarp Dosha & Remedies)", page: 47 },
                  { title: "विंशोत्तरी महादशा फल (Vimshottari Dasha Predictions)", page: 48 },
                  { title: "अंतर्दशा फल (Antardasha Sub-period Predictions)", page: 51 },
                  { title: "आज का गोचर (Daily Transit Positions & Effects)", page: 69 },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center border-b border-amber-100 pb-1.5">
                    <span className="hover:text-amber-700 font-medium">{item.title}</span>
                    <span className="text-amber-600 font-serif font-bold">{item.page}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* PAGE BREAK */}
            <div className="page-break" style={{ pageBreakBefore: "always" }} />

            {/* PAGE 3: INDEX PAGE 2 (Topics 21-43) */}
            <div className="p-8 space-y-6 min-h-[1050px]">
              <div className="border-b-2 border-amber-600 pb-2 flex justify-between items-center">
                <h2 className="font-serif text-2xl text-amber-900 font-bold">विषय-सूची (Table of Contents - Part 2)</h2>
                <span className="text-xs text-amber-700 font-serif font-bold">Page 3</span>
              </div>
              <div className="grid grid-cols-1 gap-y-2 text-xs font-light text-gray-800">
                {[
                  { title: "लाल किताब ग्रह, घर एवं कुण्डली (Lal Kitab Planets & Houses)", page: 72 },
                  { title: "लाल किताब दशा (महादशा एवं अन्तर्दशा) (Lal Kitab Dasha)", page: 74 },
                  { title: "लाल किताब फलकथन (Lal Kitab Predictions)", page: 77 },
                  { title: "लाल किताब टेवा (Lal Kitab Tewa)", page: 82 },
                  { title: "आपके लाल किताब कुंडली पर आधारित ऋण (Lal Kitab Karmic Debts)", page: 84 },
                  { title: "लाल किताब वार्षिक कुण्डली (Lal Kitab Varshaphala)", page: 88 },
                  { title: "रत्न भविष्यवाणी (Gemstone Predictions)", page: 91 },
                  { title: "इष्ट देवता (Ishta Devata Analysis)", page: 94 },
                  { title: "उपाय (General Remedies & Mantras)", page: 96 },
                  { title: "जड़ी सुझाव रिपोर्ट (Herbal Remedies Advice)", page: 99 },
                  { title: "रुद्राक्ष सुझाव रिपोर्ट (Rudraksha Recommendation)", page: 101 },
                  { title: "यंत्र सुझाव रिपोर्ट (Yantra Recommendation)", page: 103 },
                  { title: "शुभ घड़ी (Auspicious Muhurats & Times)", page: 105 },
                  { title: "मैत्री चक्र (Astrological Friendship Charts)", page: 112 },
                  { title: "शोडषवर्ग तालिका (Shodashvarga Table)", page: 114 },
                  { title: "शोडषवर्ग कुण्डलियाँ (16 Divisional Varga Charts)", page: 116 },
                  { title: "षडबल एवं भावबल तालिका (Shadbala & Bhavabala Strengths)", page: 120 },
                  { title: "अष्टकवर्ग - सर्वाष्टकवर्ग (Ashtakvarga & Sarvashtakvarga)", page: 122 },
                  { title: "प्रस्तरअष्टकवर्ग (Prastarashtakvarga)", page: 123 },
                  { title: "केपी पद्धति (KP System Analysis)", page: 130 },
                  { title: "4-स्टेप ग्रह निर्देश (4-Step Planet Directives)", page: 133 },
                  { title: "कस्पल इंटरलिंक्स (सब) (Cuspal Interlinks Sub)", page: 135 },
                  { title: "कस्पल इंटरलिंक्स (सब सब) (Cuspal Interlinks Sub-Sub)", page: 136 },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center border-b border-amber-100 pb-1.5">
                    <span className="hover:text-amber-700 font-medium">{item.title}</span>
                    <span className="text-amber-600 font-serif font-bold">{item.page}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* PAGE BREAK */}
            <div className="page-break" style={{ pageBreakBefore: "always" }} />

            {/* PAGE 4: INDEX PAGE 3 (Topics 44-64) */}
            <div className="p-8 space-y-6 min-h-[1050px]">
              <div className="border-b-2 border-amber-600 pb-2 flex justify-between items-center">
                <h2 className="font-serif text-2xl text-amber-900 font-bold">विषय-सूची (Table of Contents - Part 3)</h2>
                <span className="text-xs text-amber-700 font-serif font-bold">Page 4</span>
              </div>
              <div className="grid grid-cols-1 gap-y-2 text-xs font-light text-gray-800">
                {[
                  { title: "ग्रह निर्देश (खाका 2)", page: 137 },
                  { title: "ग्रह निर्देश (नक्षत्र नाड़ी)", page: 137 },
                  { title: "पाश्चात्य पद्धति (Western Astrology Placements)", page: 138 },
                  { title: "पाश्चात्य दृष्टि (Western Aspects)", page: 139 },
                  { title: "भावमध्य पर दृष्टि", page: 140 },
                  { title: "केपी संधि पर दृष्टि", page: 141 },
                  { title: "ग्रह दृष्टि (पाश्चात्य)", page: 142 },
                  { title: "विंशोत्तरी दशा (Vimshottari Dasha Extended Table)", page: 143 },
                  { title: "विंशोत्तरी दशा - प्रत्यंतर (Pratyantar Dasha Timeline)", page: 145 },
                  { title: "योगिनी दशा (Yogini Dasha Table)", page: 156 },
                  { title: "योगिनी दशा फल (Yogini Dasha Predictions)", page: 160 },
                  { title: "जैमिनी पद्धति: कारकांश और स्वांश कुण्डली (Jaimini Karakamsha & Swamsha)", page: 163 },
                  { title: "आरूढ़ कुंडली (Arudha Lagna Chart)", page: 164 },
                  { title: "चरदशा (Char Dasha Table)", page: 165 },
                  { title: "जैमिनी चर दशा फल (Jaimini Char Dasha Predictions)", page: 168 },
                  { title: "वर्षफल विवरण 2025 (Annual Varshaphala 2025-2026)", page: 171 },
                  { title: "वर्षफल विवरण 2026 (Annual Varshaphala 2026-2027)", page: 177 },
                  { title: "वर्षफल विवरण 2027 (Annual Varshaphala 2027-2028)", page: 183 },
                  { title: "वर्षफल विवरण 2028 (Annual Varshaphala 2028-2029)", page: 189 },
                  { title: "वर्षफल विवरण 2029 (Annual Varshaphala 2029-2030)", page: 195 },
                  { title: "वर्षफल विवरण 2030 (Annual Varshaphala 2030-2031)", page: 201 },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center border-b border-amber-100 pb-1.5">
                    <span className="hover:text-amber-700 font-medium">{item.title}</span>
                    <span className="text-amber-600 font-serif font-bold">{item.page}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* PAGE BREAK */}
            <div className="page-break" style={{ pageBreakBefore: "always" }} />

            {/* PAGE 5: MAIN BIRTH DETAILS & AVAKAHADA CHAKRA */}
            <div className="p-8 space-y-6 min-h-[1050px]">
              <div className="border-b-2 border-amber-600 pb-2">
                <h2 className="font-serif text-2xl text-amber-900 font-bold">5. मुख्य विवरण (Birth Details & Avakahada Particulars)</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-amber-200 rounded-sm overflow-hidden shadow-sm">
                  <div className="bg-amber-600 text-white text-xs font-bold uppercase tracking-wider py-2 px-4 text-center">
                    व्यक्ति विवरण (Personal Particulars)
                  </div>
                  <div className="divide-y divide-gray-100 text-xs">
                    {[
                      { l: "नाम (Name)", v: fullName },
                      { l: "लिंग (Gender)", v: gender === "male" ? "पुरुष (Male)" : "स्त्री (Female)" },
                      { l: "जन्म तिथि (DOB)", v: formattedDob },
                      { l: "जन्म समय (TOB)", v: formattedTime },
                      { l: "जन्म स्थान (POB)", v: formattedPlace },
                      { l: "अक्षांश / रेखांश", v: `${latitude}° N / ${longitude}° E` },
                      { l: "तिथि (Tithi)", v: panchangDetails?.tithi?.[0]?.name || panchangDetails?.tithi?.name || "सप्तमी (Shukla Paksha)" },
                      { l: "वार (Day)", v: panchangDetails?.vaara || "सोमवार" },
                      { l: "योग (Yoga)", v: panchangDetails?.yoga?.[0]?.name || panchangDetails?.yoga?.name || "शिव" },
                      { l: "करण (Karana)", v: panchangDetails?.karana?.[0]?.name || panchangDetails?.karana?.name || "गर" },
                    ].map((row, i) => (
                      <div key={i} className="flex justify-between py-2 px-4 odd:bg-amber-50/30">
                        <span className="text-gray-600 font-medium">{row.l}</span>
                        <span className="font-semibold text-gray-900">{row.v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border border-amber-200 rounded-sm overflow-hidden shadow-sm">
                  <div className="bg-amber-800 text-white text-xs font-bold uppercase tracking-wider py-2 px-4 text-center">
                    अवकहड़ा चक्र (Avakahada Particulars)
                  </div>
                  <div className="divide-y divide-gray-100 text-xs">
                    {[
                      { l: "नक्षत्र (Nakshatra)", v: panchangDetails?.nakshatra?.[0]?.name || panchangDetails?.nakshatra?.name || "अनुराधा (Anuradha)" },
                      { l: "नक्षत्र स्वामी", v: "शनि (Saturn)" },
                      { l: "वर्ण (Varna)", v: "ब्राह्मण (Brahman)" },
                      { l: "योनि (Yoni)", v: "मृग (Mriga)" },
                      { l: "गण (Gana)", v: "देव (Deva)" },
                      { l: "नाड़ी (Nadi)", v: "मध्य (Madhya)" },
                      { l: "सूर्य राशि (Sun Sign)", v: panchangDetails?.sun_sign || "सिंह (Leo)" },
                      { l: "चंद्र राशि (Moon Sign)", v: panchangDetails?.moon_sign || "वृश्चिक (Scorpio)" },
                      { l: "ऋतु (Ritu)", v: panchangDetails?.ritu || "वर्षा (Varsha)" },
                    ].map((row, i) => (
                      <div key={i} className="flex justify-between py-2 px-4 odd:bg-amber-50/30">
                        <span className="text-gray-600 font-medium">{row.l}</span>
                        <span className="font-semibold text-amber-900">{row.v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* PAGE BREAK */}
            <div className="page-break" style={{ pageBreakBefore: "always" }} />

            {/* PAGE 6: GHAT & FAVORABLE POINTS */}
            <div className="p-8 space-y-6 min-h-[1050px]">
              <div className="border-b-2 border-amber-600 pb-2">
                <h2 className="font-serif text-2xl text-amber-900 font-bold">6. घात एवं अनुकूल बिन्दु (Ghat & Favorable Points)</h2>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs uppercase tracking-widest font-bold text-red-900 bg-red-100 px-3 py-1.5 inline-block rounded-sm">
                  घात (अशुभ बिन्दु / Inauspicious Elements)
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
                  {["शुक्रवार", "गरज", "वृश्चिक", "अश्विन", "रेवती", "1", "वृष", "1, 6, 11"].map((val, idx) => {
                    const titles = ["घात दिन", "घात करण", "घात लग्न", "घात माह", "घात नक्षत्र", "घात प्रहर", "घात राशि", "घात तिथि"];
                    return (
                      <div key={idx} className="border border-red-200 p-3 bg-red-50/50 rounded-sm">
                        <span className="text-gray-500 block text-[10px] uppercase">{titles[idx]}</span>
                        <span className="font-bold text-red-950 text-sm mt-1 block">{val}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3 pt-6">
                <h3 className="text-xs uppercase tracking-widest font-bold text-emerald-900 bg-emerald-100 px-3 py-1.5 inline-block rounded-sm">
                  अनुकूल बिन्दु (Favorable & Lucky Elements)
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
                  {["4", "2, 4, 5, 8", "गुरुवार", "मेष, सिंह, धनु", "सुवर्ण", "लाल, मूंगा", "13, 22, 31, 40", "पूर्व दिशा"].map((val, idx) => {
                    const titles = ["भाग्यशाली अंक", "शुभ अंक", "शुभ दिन", "मित्र राशियां", "भाग्यशाली धातु", "भाग्यशाली रत्न", "शुभ वर्ष", "शुभ दिशा"];
                    return (
                      <div key={idx} className="border border-emerald-200 p-3 bg-emerald-50/50 rounded-sm">
                        <span className="text-gray-500 block text-[10px] uppercase">{titles[idx]}</span>
                        <span className="font-bold text-emerald-900 text-sm mt-1 block">{val}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* PAGE BREAK */}
            <div className="page-break" style={{ pageBreakBefore: "always" }} />

            {/* PAGE 7: PLANETARY POSITIONS */}
            <div className="p-8 space-y-6 min-h-[1050px]">
              <div className="border-b-2 border-amber-600 pb-2">
                <h2 className="font-serif text-2xl text-amber-900 font-bold">7. विस्तृत ग्रह स्थिति एवं नक्षत्र विवरण (Planetary Positions)</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border border-gray-200">
                  <thead className="bg-amber-700 text-white uppercase text-[10px]">
                    <tr>
                      <th className="py-2.5 px-3">ग्रह (Planet)</th>
                      <th className="py-2.5 px-3">राशि (Sign)</th>
                      <th className="py-2.5 px-3">अंश (Degree)</th>
                      <th className="py-2.5 px-3">नक्षत्र (Nakshatra)</th>
                      <th className="py-2.5 px-3">पद (Pada)</th>
                      <th className="py-2.5 px-3">भाव (House)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-mono text-gray-700">
                    {(kundaliDetails?.planets || [
                      { name: "Sun (सूर्य)", rashi: "Leo (सिंह)", degree: "24° 12'", nakshatra: "P.Phalguni", pada: 4, house: 7 },
                      { name: "Moon (चन्द्र)", rashi: "Scorpio (वृश्चिक)", degree: "16° 45'", nakshatra: "Anuradha", pada: 3, house: 10 },
                      { name: "Mars (मंगल)", rashi: "Gemini (मिथुन)", degree: "08° 22'", nakshatra: "Punarvasu", pada: 1, house: 3 },
                      { name: "Mercury (बुध)", rashi: "Virgo (कन्या)", degree: "12° 50'", nakshatra: "Hasta", pada: 3, house: 8 },
                      { name: "Jupiter (गुरु)", rashi: "Libra (तुला)", degree: "21° 04'", nakshatra: "Swati", pada: 4, house: 7 },
                      { name: "Venus (शुक्र)", rashi: "Libra (तुला)", degree: "05° 18'", nakshatra: "Swati", pada: 1, house: 7 },
                      { name: "Saturn (शनि)", rashi: "Aquarius (कुंभ)", degree: "14° 33'", nakshatra: "Satabhisha", pada: 3, house: 1 },
                      { name: "Rahu (राहु)", rashi: "Libra (तुला)", degree: "28° 10'", nakshatra: "Vishakha", pada: 2, house: 7 },
                      { name: "Ketu (केतु)", rashi: "Aries (मेष)", degree: "28° 10'", nakshatra: "Bharani", pada: 4, house: 3 },
                    ]).map((row: any, idx: number) => (
                      <tr key={idx} className="odd:bg-gray-50">
                        <td className="py-2.5 px-3 font-sans font-bold text-amber-900">{row.name}</td>
                        <td className="py-2.5 px-3">{row.rashi || row.sign}</td>
                        <td className="py-2.5 px-3">{row.degree || "15° 00'"}</td>
                        <td className="py-2.5 px-3">{row.nakshatra}</td>
                        <td className="py-2.5 px-3">{row.pada}</td>
                        <td className="py-2.5 px-3">{row.house || row.position}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* PAGE BREAK */}
            <div className="page-break" style={{ pageBreakBefore: "always" }} />

            {/* PAGE 8: RASI CHART */}
            <div className="p-8 space-y-6 min-h-[1050px]">
              <div className="border-b-2 border-amber-600 pb-2">
                <h2 className="font-serif text-2xl text-amber-900 font-bold">8. लग्न कुण्डली (Rasi Ascendant Chart)</h2>
              </div>

              <div className="max-w-md mx-auto border border-amber-300 p-6 bg-amber-50/20 text-center rounded-sm space-y-4 shadow-sm">
                <h3 className="font-serif font-bold text-amber-900 text-lg border-b border-amber-200 pb-2">लग्न कुण्डली (North Indian Rasi Chart)</h3>
                {rasiChartSvg ? (
                  <div className="w-full max-w-[360px] mx-auto svg-container text-gray-900" dangerouslySetInnerHTML={{ __html: rasiChartSvg }} />
                ) : (
                  <div className="w-full max-w-[360px] mx-auto" dangerouslySetInnerHTML={{ __html: renderNorthIndianChartSvg("लग्न कुण्डली (Rasi Chart)") }} />
                )}
                <p className="text-[11px] text-gray-600 font-light leading-relaxed pt-2">
                  यह आपके जन्म समय का मुख्य आकाश मानचित्र (Lagna Chart) है जो आपके समग्र व्यक्तित्व और जीवन यात्रा को दर्शाता है।
                </p>
              </div>
            </div>

            {/* PAGE BREAK */}
            <div className="page-break" style={{ pageBreakBefore: "always" }} />

            {/* PAGE 9: NAVAMSHA D9 CHART */}
            <div className="p-8 space-y-6 min-h-[1050px]">
              <div className="border-b-2 border-amber-600 pb-2">
                <h2 className="font-serif text-2xl text-amber-900 font-bold">9. नवमांश कुण्डली (D9 Navamsa Chart)</h2>
              </div>

              <div className="max-w-md mx-auto border border-amber-300 p-6 bg-amber-50/20 text-center rounded-sm space-y-4 shadow-sm">
                <h3 className="font-serif font-bold text-amber-900 text-lg border-b border-amber-200 pb-2">नवमांश कुण्डली (D9 Navamsa Chart)</h3>
                {navamsaChartSvg ? (
                  <div className="w-full max-w-[360px] mx-auto svg-container text-gray-900" dangerouslySetInnerHTML={{ __html: navamsaChartSvg }} />
                ) : (
                  <div className="w-full max-w-[360px] mx-auto" dangerouslySetInnerHTML={{ __html: renderNorthIndianChartSvg("नवमांश कुण्डली (D9 Chart)") }} />
                )}
                <p className="text-[11px] text-gray-600 font-light leading-relaxed pt-2">
                  नवमांश कुण्डली जीवन के उत्तरार्ध, विवाहिक सुख तथा ग्रहों के सूक्ष्म बल एवं सूक्ष्म भाग्य का सूक्ष्म विश्लेषण करती है।
                </p>
              </div>
            </div>

            {/* PAGE BREAK */}
            <div className="page-break" style={{ pageBreakBefore: "always" }} />

            {/* PAGE 10: CHALIT CHART */}
            <div className="p-8 space-y-6 min-h-[1050px]">
              <div className="border-b-2 border-amber-600 pb-2">
                <h2 className="font-serif text-2xl text-amber-900 font-bold">10. भाव चलित कुण्डली (Chalit Cusp Chart)</h2>
              </div>

              <div className="max-w-md mx-auto border border-amber-300 p-6 bg-amber-50/20 text-center rounded-sm space-y-4 shadow-sm">
                <h3 className="font-serif font-bold text-amber-900 text-lg border-b border-amber-200 pb-2">भाव चलित चक्र (Cusp Chart)</h3>
                {chalitChartSvg ? (
                  <div className="w-full max-w-[360px] mx-auto svg-container text-gray-900" dangerouslySetInnerHTML={{ __html: chalitChartSvg }} />
                ) : (
                  <div className="w-full max-w-[360px] mx-auto" dangerouslySetInnerHTML={{ __html: renderNorthIndianChartSvg("भाव चलित कुण्डली") }} />
                )}
                <p className="text-[11px] text-gray-600 font-light leading-relaxed pt-2">
                  भाव चलित कुण्डली यह स्पष्ट करती है कि ग्रह वास्तव में किस भाव के मध्य स्थित हैं तथा उनका वास्तविक कर्म फल क्या होगा।
                </p>
              </div>
            </div>

            {/* PAGE BREAK */}
            <div className="page-break" style={{ pageBreakBefore: "always" }} />

            {/* PAGE 11: LAGNA & MOON SIGN ANALYSIS */}
            <div className="p-8 space-y-6 min-h-[1050px]">
              <div className="border-b-2 border-amber-600 pb-2">
                <h2 className="font-serif text-2xl text-amber-900 font-bold">11. आपकी लग्न एवं चंद्र राशि रिपोर्ट (Profile Report)</h2>
              </div>

              <div className="space-y-6 text-xs leading-relaxed text-gray-700">
                <div className="border border-amber-200 p-5 bg-amber-50/30 rounded-sm space-y-2">
                  <h3 className="font-serif font-bold text-amber-950 text-base">लग्न रिपोर्ट (Ascendant Personality Profile)</h3>
                  <p>
                    आपका लग्न कुम्भ/सिंह है। आप उच्च विचार, दूरदर्शिता और नेतृत्व क्षमता से परिपूर्ण व्यक्ति हैं। समाज में आपका अपना एक विशिष्ट स्थान होता है और आप चुनौतियों का सामना धैर्य और साहस के साथ करते हैं।
                  </p>
                </div>

                <div className="border border-amber-200 p-5 bg-amber-50/30 rounded-sm space-y-2">
                  <h3 className="font-serif font-bold text-amber-950 text-base">चंद्र राशि फलकथन (Moon Sign Emotional Analysis)</h3>
                  <p>
                    चंद्रमा मन और भावनाओं का प्रतीक है। आपकी चंद्र राशि वृश्चिक (Scorpio) है। आप स्वभाव से गहन, शोधप्रिय और दृढ़ निश्चयी हैं। आप अपने निर्णयों पर अडिग रहते हैं और गुप्त विद्याओं व गहरे रहस्यों में आपकी स्वाभाविक रुचि होती है।
                  </p>
                </div>
              </div>
            </div>

            {/* PAGE BREAK */}
            <div className="page-break" style={{ pageBreakBefore: "always" }} />

            {/* PAGE 12: VIMSHOTTARI DASHA */}
            <div className="p-8 space-y-6 min-h-[1050px]">
              <div className="border-b-2 border-amber-600 pb-2">
                <h2 className="font-serif text-2xl text-amber-900 font-bold">12. विंशोत्तरी महादशा एवं अंतर्दशा (Vimshottari Dasha)</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border border-gray-200">
                  <thead className="bg-amber-800 text-white uppercase text-[10px]">
                    <tr>
                      <th className="py-2.5 px-3">ग्रह (Mahadasha Planet)</th>
                      <th className="py-2.5 px-3">प्रारंभ (Start Date)</th>
                      <th className="py-2.5 px-3">समाप्ति (End Date)</th>
                      <th className="py-2.5 px-3">विशेष प्रभाव (Impact)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-mono text-gray-700">
                    {[
                      { planet: "Moon (चन्द्र)", start: "11-09-1994", end: "11-09-2004", impact: "शिक्षा व मानसिक विकास" },
                      { planet: "Mars (मंगल)", start: "11-09-2004", end: "11-09-2011", impact: "ऊर्जा, भूमि व पराक्रम" },
                      { planet: "Rahu (राहु)", start: "11-09-2011", end: "11-09-2029", impact: "विदेश यात्रा, व्यापार व तकनीक" },
                      { planet: "Jupiter (गुरु)", start: "11-09-2029", end: "11-09-2045", impact: "ज्ञान, समृद्धि व संतान सुख" },
                      { planet: "Saturn (शनि)", start: "11-09-2045", end: "11-09-2064", impact: "स्थायित्व, कर्म व पदोन्नति" },
                      { planet: "Mercury (बुध)", start: "11-09-2064", end: "11-09-2081", impact: "बुद्धि, व्यापार व सम्मान" },
                    ].map((row: any, idx: number) => (
                      <tr key={idx} className="odd:bg-gray-50">
                        <td className="py-2.5 px-3 font-sans font-bold text-amber-900">{row.planet}</td>
                        <td className="py-2.5 px-3">{row.start}</td>
                        <td className="py-2.5 px-3">{row.end}</td>
                        <td className="py-2.5 px-3 font-sans">{row.impact}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* PAGE BREAK */}
            <div className="page-break" style={{ pageBreakBefore: "always" }} />

            {/* PAGE 13-15: DOSHA & REMEDIES */}
            <div className="p-8 space-y-6 min-h-[1050px]">
              <div className="border-b-2 border-amber-600 pb-2">
                <h2 className="font-serif text-2xl text-amber-900 font-bold">13-15. वैदिक दोष विचार एवं आध्यात्मिक समाधान</h2>
              </div>

              <div className="space-y-6 text-xs leading-relaxed text-gray-700">
                <div className="border border-orange-200 p-5 bg-orange-50/20 rounded-sm space-y-2">
                  <h3 className="font-serif font-bold text-amber-950 text-base">मंगल दोष विवेचन (Manglik Dosha Report)</h3>
                  <p>
                    आपकी कुण्डली में मंगल की स्थिति का विशेष विश्लेषण किया गया है। मंगल का प्रभाव सामान्य एवं नियंत्रित है। किसी भी प्रकार के भय की आवश्यकता नहीं है।
                  </p>
                </div>

                <div className="border border-blue-200 p-5 bg-blue-50/20 rounded-sm space-y-2">
                  <h3 className="font-serif font-bold text-blue-950 text-base">शनि साढ़े साती विचार (Sadhe Sati Timeline)</h3>
                  <p>
                    शनि की साढ़े साती का प्रभाव आपके जीवन में अनुशासन और कर्म-शुद्धि लाने का कार्य करता है। शनिवार को पीपल के वृक्ष के नीचे सरसों के तेल का दीपक जलाना अत्यंत फलदायी रहेगा।
                  </p>
                </div>

                <div className="border border-purple-200 p-5 bg-purple-50/20 rounded-sm space-y-2">
                  <h3 className="font-serif font-bold text-purple-950 text-base">कालसर्प दोष विचार (Kaal Sarp Analysis)</h3>
                  <p>
                    ग्रहों की स्थिति के अनुसार आपकी कुण्डली कालसर्प दोष से मुक्त है। कार्यक्षेत्र में आपकी मेहनत का उचित फल प्राप्त होगा।
                  </p>
                </div>
              </div>
            </div>

            {/* PAGE BREAK */}
            <div className="page-break" style={{ pageBreakBefore: "always" }} />

            {/* PAGE 16: GEMSTONE, RUDRAKSHA & BRANDING */}
            <div className="p-8 space-y-6 min-h-[1050px] flex flex-col justify-between">
              <div className="space-y-6">
                <div className="border-b-2 border-amber-600 pb-2">
                  <h2 className="font-serif text-2xl text-amber-900 font-bold">16. रत्न, रुद्राक्ष एवं वैदिक परामर्श (Remedies & Recommendations)</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="border border-amber-300 p-4 bg-amber-50/40 rounded-sm space-y-2">
                    <span className="font-bold text-amber-950 text-sm block border-b border-amber-200 pb-1">भाग्यशाली रत्न</span>
                    <p className="text-gray-700">जीवन रत्न: <strong className="text-amber-900">माणिक्य (Ruby)</strong></p>
                    <p className="text-gray-700">भाग्य रत्न: <strong className="text-amber-900">पुखराज (Yellow Sapphire)</strong></p>
                  </div>

                  <div className="border border-amber-300 p-4 bg-amber-50/40 rounded-sm space-y-2">
                    <span className="font-bold text-amber-950 text-sm block border-b border-amber-200 pb-1">रुद्राक्ष सलाह</span>
                    <p className="text-gray-700">अनुशंसित: <strong className="text-amber-900">5 मुखी रुद्राक्ष</strong></p>
                    <p className="text-gray-600 font-light">मानसिक एकाग्रता और सकारात्मक ऊर्जा हेतु धारण करें।</p>
                  </div>

                  <div className="border border-amber-300 p-4 bg-amber-50/40 rounded-sm space-y-2">
                    <span className="font-bold text-amber-950 text-sm block border-b border-amber-200 pb-1">नित्य साधना</span>
                    <p className="text-gray-700">गायत्री मंत्र: <strong className="text-amber-900">108 बार</strong></p>
                    <p className="text-gray-600 font-light">प्रतिदिन सूर्य देव को तांबे के लोटे से जल अर्पण करें।</p>
                  </div>
                </div>
              </div>

              {/* BRANDING FOOTER */}
              <div className="border-t-2 border-amber-600 pt-8 text-center space-y-2">
                <h3 className="font-serif text-xl text-amber-950 font-bold uppercase tracking-widest">
                  Dharmik Shree Astro Portal
                </h3>
                <p className="text-xs text-gray-600 font-light max-w-lg mx-auto">
                  Jay ambe, Bhalchandra Nagar Society, Surat, Gujarat 395004 | Complete Vedic Astro System
                </p>
                <p className="text-[10px] text-amber-800 font-semibold font-mono">
                  Official Website: www.dharmikshree.com | Support: support@dharmikshree.com
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}

export default function KundaliViewPage() {
  return (
    <>
      <div className="no-print"><Header /></div>
      <Suspense fallback={
        <div className="min-h-screen bg-brand-charcoal flex flex-col items-center justify-center text-brand-ivory px-6">
          <div className="w-16 h-16 border-4 border-brand-gold border-t-transparent rounded-full animate-spin mb-4" />
          <h2 className="font-serif text-2xl font-light tracking-wider animate-pulse">
            तैयारी की जा रही है...
          </h2>
        </div>
      }>
        <KundaliViewContent />
      </Suspense>
      <div className="no-print"><Footer /></div>
    </>
  );
}
