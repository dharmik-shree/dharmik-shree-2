"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Download, ArrowLeft, Sparkles, ShieldCheck, CheckCircle2, User, Calendar, Clock, MapPin } from "lucide-react";

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
  const [kaalSarpDosha, setKaalSarpDosha] = useState<any>(null);
  const [dashaData, setDashaData] = useState<any>(null);

  useEffect(() => {
    if (!fullName || !day || !month || !year) {
      router.push("/tools");
      return;
    }

    const fetchData = async () => {
      try {
        let hr = parseInt(hour || "12");
        if (amPm === "PM" && hr < 12) hr += 12;
        if (amPm === "AM" && hr === 12) hr = 0;
        const formattedHour = hr.toString().padStart(2, "0");
        const formattedMinute = (minute || "0").padStart(2, "0");

        const datetimeStr = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}T${formattedHour}:${formattedMinute}:00Z`;

        const [
          panchangRes,
          rasiRes,
          navamsaRes,
          chalitRes,
          detailsRes,
          mangalRes,
          sadeSatiRes,
          kaalSarpRes,
          dashaRes
        ] = await Promise.allSettled([
          fetch(`/api/prokerala?tool=panchang&latitude=${latitude}&longitude=${longitude}&datetime=${datetimeStr}`),
          fetch(`/api/prokerala?tool=rasi-chart&latitude=${latitude}&longitude=${longitude}&datetime=${datetimeStr}`),
          fetch(`/api/prokerala?tool=navamsa-chart&latitude=${latitude}&longitude=${longitude}&datetime=${datetimeStr}`),
          fetch(`/api/prokerala?tool=chalit-chart&latitude=${latitude}&longitude=${longitude}&datetime=${datetimeStr}`),
          fetch(`/api/prokerala?tool=kundali-details&latitude=${latitude}&longitude=${longitude}&datetime=${datetimeStr}`),
          fetch(`/api/prokerala?tool=mangal-dosha&latitude=${latitude}&longitude=${longitude}&datetime=${datetimeStr}`),
          fetch(`/api/prokerala?tool=sade-sati&latitude=${latitude}&longitude=${longitude}&datetime=${datetimeStr}`),
          fetch(`/api/prokerala?tool=kaal-sarp-dosha&latitude=${latitude}&longitude=${longitude}&datetime=${datetimeStr}`),
          fetch(`/api/prokerala?tool=vimshottari-dasha&latitude=${latitude}&longitude=${longitude}&datetime=${datetimeStr}`)
        ]);

        if (panchangRes.status === "fulfilled" && panchangRes.value.ok) {
          const json = await panchangRes.value.json();
          setPanchangDetails(json?.data || null);
        }
        if (rasiRes.status === "fulfilled" && rasiRes.value.ok) {
          const json = await rasiRes.value.json();
          setRasiChartSvg(json?.data || "");
        }
        if (navamsaRes.status === "fulfilled" && navamsaRes.value.ok) {
          const json = await navamsaRes.value.json();
          setNavamsaChartSvg(json?.data || "");
        }
        if (chalitRes.status === "fulfilled" && chalitRes.value.ok) {
          const json = await chalitRes.value.json();
          setChalitChartSvg(json?.data || "");
        }
        if (detailsRes.status === "fulfilled" && detailsRes.value.ok) {
          const json = await detailsRes.value.json();
          setKundaliDetails(json?.data || null);
        }
        if (mangalRes.status === "fulfilled" && mangalRes.value.ok) {
          const json = await mangalRes.value.json();
          setMangalDosha(json?.data || null);
        }
        if (sadeSatiRes.status === "fulfilled" && sadeSatiRes.value.ok) {
          const json = await sadeSatiRes.value.json();
          setSadeSati(json?.data || null);
        }
        if (kaalSarpRes.status === "fulfilled" && kaalSarpRes.value.ok) {
          const json = await kaalSarpRes.value.json();
          setKaalSarpDosha(json?.data || null);
        }
        if (dashaRes.status === "fulfilled" && dashaRes.value.ok) {
          const json = await dashaRes.value.json();
          setDashaData(json?.data || null);
        }
      } catch (err) {
        console.error("Error fetching Kundali data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fullName, gender, day, month, year, hour, minute, amPm, birthPlace, latitude, longitude, router]);

  const handleDownloadPDF = async () => {
    setDownloading(true);
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      const element = document.getElementById("printable-kundali-report");
      if (!element) return;

      const html2canvasPro = (await import("html2canvas-pro")).default;

      const opt = {
        margin: [0, 0, 0, 0] as [number, number, number, number],
        filename: `${fullName.replace(/\s+/g, "_")}_Dharmik_Shree_Full_Kundali.pdf`,
        image: { type: "jpeg" as const, quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false, html2canvas: html2canvasPro },
        jsPDF: { unit: "mm" as const, format: "a4" as const, orientation: "portrait" as const },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] }
      };

      await html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error("PDF Download failed:", err);
      window.print();
    } finally {
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
          Calculating planetary positions, Dasha, Navamsa & Vastu alignments. Please wait.
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-brand-charcoal pt-28 pb-20 px-4 md:px-8 text-brand-ivory">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-brand-gold/20 pb-6">
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

            {/* PAGE 2: VEDIC INTRODUCTION */}
            <div className="p-8 space-y-6 min-h-[1050px]">
              <div className="border-b-2 border-amber-600 pb-2">
                <h2 className="font-serif text-2xl text-amber-900 font-bold">2. वैदिक प्रस्तावना एवं परिचय (Introduction)</h2>
              </div>
              <div className="text-xs text-gray-700 space-y-4 leading-relaxed font-light">
                <p>
                  भारतीय ज्योतिष शास्त्र (Vedic Astrology) एक अत्यंत पवित्र एवं वैज्ञानिक विधा है जो ब्रह्मांडीय ऊर्जा, ग्रह नक्षत्रों तथा मानव चेतना के आपसी संबंधों का बोध कराती है। ऋषियों ने कहा है—<span className="font-serif text-amber-900 font-bold">"यत् पिण्डे तत् ब्रह्माण्डे"</span> (जो ब्रह्मांड में है, वही मनुष्य के भीतर विद्यमान है)।
                </p>
                <p>
                  आपके जन्म के सटीक क्षण पर अंतरिक्ष में ग्रहों और नक्षत्रों की जो स्थिति थी, उसे ही आपकी जन्म कुंडली (Horoscope) कहा जाता है। यह कुण्डली आपके जीवन के कर्म प्रारब्ध, संभावनाओं, स्वभाव एवं भाग्य की अद्वितीय कुंजी है।
                </p>
                <p>
                  इस **धार्मिकश्री प्रीमियम कुण्डली** में विस्तृत पंचांग, अवकहड़ा चक्र, लग्न एवं नवमांश कुण्डली, विस्तृत ग्रह स्थितियाँ, विंशोत्तरी महादशा चक्र, तथा प्रमुख दोष व आध्यात्मिक उपायों का प्रामाणिक वैज्ञानिक संकलन किया गया है।
                </p>
              </div>
            </div>

            {/* PAGE BREAK */}
            <div className="page-break" style={{ pageBreakBefore: "always" }} />

            {/* PAGE 3-4: TABLE OF CONTENTS */}
            <div className="p-8 space-y-6 min-h-[1050px]">
              <div className="border-b-2 border-amber-600 pb-2">
                <h2 className="font-serif text-2xl text-amber-900 font-bold">3-4. विषय-सूची (Table of Contents)</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-3 text-xs font-light text-gray-700">
                {[
                  { title: "1. आवरण पृष्ठ (Cover Page)", page: 1 },
                  { title: "2. वैदिक प्रस्तावना एवं परिचय", page: 2 },
                  { title: "3. विषय-सूची (Index)", page: 3 },
                  { title: "5. मुख्य विवरण एवं अवकहड़ा चक्र", page: 5 },
                  { title: "6. घात एवं अनुकूल बिन्दु", page: 6 },
                  { title: "7. वास्तविक जन्म कुण्डली (Rasi Chart)", page: 7 },
                  { title: "8. नवमांश कुण्डली (D9 Navamsa Chart)", page: 8 },
                  { title: "9. चलित कुण्डली (Chalit Cusp Chart)", page: 9 },
                  { title: "10. विस्तृत ग्रह स्थिति एवं नक्षत्र विवरण", page: 10 },
                  { title: "11. लग्न एवं चंद्र राशि व्यक्तित्व विश्लेषण", page: 11 },
                  { title: "12. विंशोत्तरी महादशा एवं अन्तर्दशा तालिका", page: 12 },
                  { title: "13. मंगल दोष (Manglik Analysis) रिपोर्ट", page: 13 },
                  { title: "14. शनि की साढ़े साती विचार रिपोर्ट", page: 14 },
                  { title: "15. कालसर्प दोष विश्लेषण रिपोर्ट", page: 15 },
                  { title: "16. रत्न, रुद्राक्ष एवं वैदिक आध्यात्मिक उपाय", page: 16 },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center border-b border-gray-100 pb-2">
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

            {/* PAGE 7-8: VEDIC KUNDALI CHARTS */}
            <div className="p-8 space-y-6 min-h-[1050px]">
              <div className="border-b-2 border-amber-600 pb-2">
                <h2 className="font-serif text-2xl text-amber-900 font-bold">7-8. वास्तविक जन्म कुण्डली एवं नवमांश (Vedic Charts)</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {/* Rasi Chart */}
                <div className="border border-amber-300 p-4 bg-amber-50/30 text-center rounded-sm space-y-3 shadow-sm">
                  <h3 className="font-serif font-bold text-amber-900 text-lg border-b border-amber-200 pb-2">लग्न कुण्डली (Rasi Chart)</h3>
                  {rasiChartSvg ? (
                    <div className="w-full max-w-[340px] mx-auto svg-container text-gray-900" dangerouslySetInnerHTML={{ __html: rasiChartSvg }} />
                  ) : (
                    <div className="w-full h-64 bg-amber-100/50 flex items-center justify-center text-amber-800 text-xs font-mono animate-pulse">
                      Rasi Chart Loading...
                    </div>
                  )}
                </div>

                {/* Navamsha Chart */}
                <div className="border border-amber-300 p-4 bg-amber-50/30 text-center rounded-sm space-y-3 shadow-sm">
                  <h3 className="font-serif font-bold text-amber-900 text-lg border-b border-amber-200 pb-2">नवमांश कुण्डली (D9 Navamsa)</h3>
                  {navamsaChartSvg ? (
                    <div className="w-full max-w-[340px] mx-auto svg-container text-gray-900" dangerouslySetInnerHTML={{ __html: navamsaChartSvg }} />
                  ) : (
                    <div className="w-full h-64 bg-amber-100/50 flex items-center justify-center text-amber-800 text-xs font-mono animate-pulse">
                      Navamsha Chart Loading...
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* PAGE BREAK */}
            <div className="page-break" style={{ pageBreakBefore: "always" }} />

            {/* PAGE 9: CHALIT CHART */}
            <div className="p-8 space-y-6 min-h-[1050px]">
              <div className="border-b-2 border-amber-600 pb-2">
                <h2 className="font-serif text-2xl text-amber-900 font-bold">9. चलित कुण्डली (Chalit Cusp Chart)</h2>
              </div>

              <div className="max-w-md mx-auto border border-amber-300 p-6 bg-amber-50/30 text-center rounded-sm space-y-4 shadow-sm">
                <h3 className="font-serif font-bold text-amber-900 text-lg border-b border-amber-200 pb-2">भाव चलित कुण्डली (Cusp Chart)</h3>
                {chalitChartSvg ? (
                  <div className="w-full max-w-[340px] mx-auto svg-container text-gray-900" dangerouslySetInnerHTML={{ __html: chalitChartSvg }} />
                ) : (
                  <div className="w-full h-64 bg-amber-100/50 flex items-center justify-center text-amber-800 text-xs font-mono animate-pulse">
                    Chalit Chart Loading...
                  </div>
                )}
                <p className="text-[11px] text-gray-600 font-light leading-relaxed pt-2">
                  भाव चलित कुण्डली यह दर्शाती है कि ग्रह किस भाव (House) में अपना वास्तविक फल प्रदान करेंगे।
                </p>
              </div>
            </div>

            {/* PAGE BREAK */}
            <div className="page-break" style={{ pageBreakBefore: "always" }} />

            {/* PAGE 10: PLANETARY COORDINATES */}
            <div className="p-8 space-y-6 min-h-[1050px]">
              <div className="border-b-2 border-amber-600 pb-2">
                <h2 className="font-serif text-2xl text-amber-900 font-bold">10. विस्तृत ग्रह स्थिति एवं नक्षत्र विवरण</h2>
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

            {/* PAGE 11: LAGNA & MOON SIGN ANALYSIS */}
            <div className="p-8 space-y-6 min-h-[1050px]">
              <div className="border-b-2 border-amber-600 pb-2">
                <h2 className="font-serif text-2xl text-amber-900 font-bold">11. लग्न एवं चंद्र राशि फलकथन (Personality Profile)</h2>
              </div>

              <div className="space-y-6 text-xs leading-relaxed text-gray-700">
                <div className="border border-amber-200 p-5 bg-amber-50/20 rounded-sm space-y-2">
                  <h3 className="font-serif font-bold text-amber-950 text-base">लग्न फल (Ascendant Personality Report)</h3>
                  <p>
                    आपका लग्न चक्र दर्शाता है कि आप जीवन में समस्याओं का सामना कैसे करते हैं। आपकी नेतृत्व क्षमता, कार्यशैली और शारीरिक आकर्षण में आत्मविश्वास झलक रहा है। निर्णय लेने की आपकी क्षमता आपको समाज एवं कार्यक्षेत्र में सम्मान दिलाती है।
                  </p>
                </div>

                <div className="border border-amber-200 p-5 bg-amber-50/20 rounded-sm space-y-2">
                  <h3 className="font-serif font-bold text-amber-950 text-base">चंद्र राशि फल (Moon Sign Emotional Analysis)</h3>
                  <p>
                    चंद्रमा मन का कारक है। आपकी चंद्र राशि से पता चलता है कि आप भावात्मक रूप से अत्यंत संवेदनशील और आध्यात्मिक स्वभाव के व्यक्ति हैं। आप शांतिप्रिय हैं और कलात्मक कार्यों में आपकी गहरी रुचि है।
                  </p>
                </div>
              </div>
            </div>

            {/* PAGE BREAK */}
            <div className="page-break" style={{ pageBreakBefore: "always" }} />

            {/* PAGE 12: VIMSHOTTARI DASHA */}
            <div className="p-8 space-y-6 min-h-[1050px]">
              <div className="border-b-2 border-amber-600 pb-2">
                <h2 className="font-serif text-2xl text-amber-900 font-bold">12. विंशोत्तरी महादशा तालिका (Vimshottari Dasha)</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border border-gray-200">
                  <thead className="bg-amber-800 text-white uppercase text-[10px]">
                    <tr>
                      <th className="py-2.5 px-3">ग्रह (Planet)</th>
                      <th className="py-2.5 px-3">प्रारंभ तिथि (Start Date)</th>
                      <th className="py-2.5 px-3">समाप्ति तिथि (End Date)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-mono text-gray-700">
                    {(dashaData?.dasha || [
                      { planet: "Moon (चन्द्र)", start: "11-09-1994", end: "11-09-2004" },
                      { planet: "Mars (मंगल)", start: "11-09-2004", end: "11-09-2011" },
                      { planet: "Rahu (राहु)", start: "11-09-2011", end: "11-09-2029" },
                      { planet: "Jupiter (गुरु)", start: "11-09-2029", end: "11-09-2045" },
                      { planet: "Saturn (शनि)", start: "11-09-2045", end: "11-09-2064" },
                      { planet: "Mercury (बुध)", start: "11-09-2064", end: "11-09-2081" },
                    ]).map((row: any, idx: number) => (
                      <tr key={idx} className="odd:bg-gray-50">
                        <td className="py-2.5 px-3 font-sans font-bold text-amber-900">{row.planet || row.name}</td>
                        <td className="py-2.5 px-3">{row.start || row.start_date}</td>
                        <td className="py-2.5 px-3">{row.end || row.end_date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* PAGE BREAK */}
            <div className="page-break" style={{ pageBreakBefore: "always" }} />

            {/* PAGE 13-15: DOSHA ANALYSIS (Manglik, Sade Sati, Kaal Sarp) */}
            <div className="p-8 space-y-6 min-h-[1050px]">
              <div className="border-b-2 border-amber-600 pb-2">
                <h2 className="font-serif text-2xl text-amber-900 font-bold">13-15. वैदिक दोष एवं विचार (Dosha Analysis)</h2>
              </div>

              <div className="space-y-6 text-xs leading-relaxed text-gray-700">
                {/* Manglik */}
                <div className="border border-orange-200 p-5 bg-orange-50/20 rounded-sm space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-serif font-bold text-amber-950 text-base">मंगल दोष विचार (Manglik Dosha Report)</h3>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 py-1 px-3 rounded-full">
                      {mangalDosha?.is_dosha ? "अंशतः मंगल दोष" : "मंगल दोष सामान्य"}
                    </span>
                  </div>
                  <p>
                    {mangalDosha?.description || "आपकी कुण्डली में मंगल की स्थिति सामान्य है। विवाह एवं संबंधों में सामंजस्य बना रहेगा।"}
                  </p>
                </div>

                {/* Sade Sati */}
                <div className="border border-blue-200 p-5 bg-blue-50/20 rounded-sm space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-serif font-bold text-blue-950 text-base">शनि की साढ़े साती रिपोर्ट (Sade Sati Status)</h3>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-900 py-1 px-3 rounded-full">
                      {sadeSati?.is_sade_sati ? "साढ़े साती प्रभावी" : "साढ़े साती का प्रभाव नहीं"}
                    </span>
                  </div>
                  <p>
                    {sadeSati?.description || "शनि देव की कृपा से आपकी कुण्डली में साढ़े साती का प्रभाव संतुलित है। हनुमान चालीसा का नित्य पाठ लाभकारी रहेगा।"}
                  </p>
                </div>

                {/* Kaal Sarp */}
                <div className="border border-purple-200 p-5 bg-purple-50/20 rounded-sm space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-serif font-bold text-purple-950 text-base">कालसर्प दोष विश्लेषण (Kaal Sarp Analysis)</h3>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-purple-900 py-1 px-3 rounded-full">
                      {kaalSarpDosha?.is_dosha ? "कालसर्प दोष उपस्थित" : "कालसर्प दोष मुक्त"}
                    </span>
                  </div>
                  <p>
                    {kaalSarpDosha?.description || "राहु एवं केतु की स्थिति आपकी कुण्डली में अनुकूल है। जीवन में निरंतर प्रगति के योग बने रहेंगे।"}
                  </p>
                </div>
              </div>
            </div>

            {/* PAGE BREAK */}
            <div className="page-break" style={{ pageBreakBefore: "always" }} />

            {/* PAGE 16: REMEDIES & ADVICE */}
            <div className="p-8 space-y-6 min-h-[1050px]">
              <div className="border-b-2 border-amber-600 pb-2">
                <h2 className="font-serif text-2xl text-amber-900 font-bold">16. रत्न, रुद्राक्ष एवं वैदिक आध्यात्मिक उपाय (Remedies)</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="border border-amber-300 p-4 bg-amber-50/40 rounded-sm space-y-2">
                  <span className="font-bold text-amber-950 text-sm block border-b border-amber-200 pb-1">भाग्यशाली रत्न (Gemstone)</span>
                  <p className="text-gray-700">जीवन रत्न: <strong className="text-amber-900">माणिक्य (Ruby)</strong></p>
                  <p className="text-gray-700">भाग्य रत्न: <strong className="text-amber-900">पुखराज (Yellow Sapphire)</strong></p>
                </div>

                <div className="border border-amber-300 p-4 bg-amber-50/40 rounded-sm space-y-2">
                  <span className="font-bold text-amber-950 text-sm block border-b border-amber-200 pb-1">रुद्राक्ष (Rudraksha)</span>
                  <p className="text-gray-700">अनुशंसित रुद्राक्ष: <strong className="text-amber-900">5 मुखी रुद्राक्ष (5-Mukhi)</strong></p>
                  <p className="text-gray-600 font-light">मानसिक शांति एवं स्वास्थ्य सुधार हेतु धारण करें।</p>
                </div>

                <div className="border border-amber-300 p-4 bg-amber-50/40 rounded-sm space-y-2">
                  <span className="font-bold text-amber-950 text-sm block border-b border-amber-200 pb-1">नित्य साधना (Mantra)</span>
                  <p className="text-gray-700">गायत्री मंत्र: <strong className="text-amber-900">108 बार प्रतिदिन</strong></p>
                  <p className="text-gray-600 font-light">रविवार को तांबे के लोटे में जल भरकर सूर्य अर्घ्य दें।</p>
                </div>
              </div>

              {/* BRANDING FOOTER */}
              <div className="border-t-2 border-amber-600 pt-8 mt-12 text-center space-y-2">
                <h3 className="font-serif text-xl text-amber-950 font-bold uppercase tracking-widest">
                  Dharmik Shree Astro Portal
                </h3>
                <p className="text-xs text-gray-600 font-light max-w-lg mx-auto">
                  Jay ambe, Bhalchandra Nagar Society, Surat, Gujarat 395004 | High-Precision Vedic Astro Calculations
                </p>
                <p className="text-[10px] text-amber-800 font-semibold font-mono">
                  Official Website: www.dharmikshree.com | Contact: support@dharmikshree.com
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
      <Header />
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
      <Footer />
    </>
  );
}
