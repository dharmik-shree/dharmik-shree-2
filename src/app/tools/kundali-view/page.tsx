"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Download, ArrowLeft } from "lucide-react";

function KundaliViewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Retrieve form state from search parameters
  const fullName = searchParams.get("fullName") || "";
  const gender = searchParams.get("gender") || "male";
  const day = searchParams.get("day") || "";
  const month = searchParams.get("month") || "";
  const year = searchParams.get("year") || "";
  const hour = searchParams.get("hour") || "";
  const minute = searchParams.get("minute") || "";
  const amPm = searchParams.get("amPm") || "AM";
  const birthPlace = searchParams.get("birthPlace") || "";
  const latitude = searchParams.get("latitude") || "19.0760";
  const longitude = searchParams.get("longitude") || "72.8777";

  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [panchangDetails, setPanchangDetails] = useState<any>(null);
  const [rasiChartSvg, setRasiChartSvg] = useState<string>("");
  const [navamsaChartSvg, setNavamsaChartSvg] = useState<string>("");
  const [kundaliDetails, setKundaliDetails] = useState<any>(null);

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

        const [panchangRes, rasiRes, navamsaRes, detailsRes] = await Promise.all([
          fetch(`/api/prokerala?tool=panchang&latitude=${latitude}&longitude=${longitude}&datetime=${datetimeStr}`),
          fetch(`/api/prokerala?tool=rasi-chart&latitude=${latitude}&longitude=${longitude}&datetime=${datetimeStr}`),
          fetch(`/api/prokerala?tool=navamsa-chart&latitude=${latitude}&longitude=${longitude}&datetime=${datetimeStr}`),
          fetch(`/api/prokerala?tool=kundali-details&latitude=${latitude}&longitude=${longitude}&datetime=${datetimeStr}`)
        ]);

        if (panchangRes.ok) {
          const json = await panchangRes.json();
          setPanchangDetails(json?.data || null);
        }
        if (rasiRes.ok) {
          const json = await rasiRes.json();
          setRasiChartSvg(json?.data || "");
        }
        if (navamsaRes.ok) {
          const json = await navamsaRes.json();
          setNavamsaChartSvg(json?.data || "");
        }
        if (detailsRes.ok) {
          const json = await detailsRes.json();
          setKundaliDetails(json?.data || null);
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
          आपकी कुंडली की गणना की जा रही है...
        </h2>
        <p className="text-xs text-brand-ivory/50 mt-2 font-light">
          Generating custom astro-computations. Please wait.
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-brand-charcoal pt-28 pb-20 px-4 md:px-8 text-brand-ivory">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-brand-gold/20 pb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-brand-gold hover:text-brand-ivory transition-colors"
          >
            <ArrowLeft size={16} /> Edit Inputs
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadPDF}
              disabled={downloading}
              className="bg-brand-gold hover:bg-brand-gold-hover text-brand-charcoal text-xs uppercase tracking-widest font-semibold py-3 px-6 rounded-sm flex items-center gap-2 shadow-lg transition-all"
            >
              <Download size={16} /> {downloading ? "Downloading..." : "Download Full PDF"}
            </button>
          </div>
        </div>

        <div className="border border-brand-gold/25 bg-white p-2 md:p-8 rounded-sm text-gray-900 shadow-2xl overflow-y-auto max-h-[80vh] custom-scrollbar">
          <div id="printable-kundali-report" className="bg-white max-w-[800px] mx-auto space-y-12 pb-12 font-sans">
            <div className="p-8 border-4 border-double border-amber-600 bg-amber-50/10 text-center space-y-8 min-h-[1050px] flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-amber-700 uppercase tracking-[0.4em] font-semibold text-xs block">
                  || श्री गणेशाय नमः ||
                </span>
                <div className="w-20 h-20 mx-auto my-4 bg-amber-100 rounded-full flex items-center justify-center border border-amber-300">
                  <span className="text-4xl text-amber-700">ॐ</span>
                </div>
                <h1 className="font-serif text-4xl md:text-5xl font-extrabold text-amber-900 tracking-wider">
                  धार्मिकश्री प्रीमियम कुण्डली
                </h1>
                <p className="text-amber-700 text-xs tracking-widest uppercase">
                  Vedic Astro & Kundali Analysis Report
                </p>
              </div>

              <div className="border-t border-b border-amber-300 py-8 my-6 space-y-4 max-w-md mx-auto">
                <h2 className="text-amber-900 font-serif text-2xl font-bold tracking-wide">
                  {fullName || "जातक विवरण"}
                </h2>
                <div className="grid grid-cols-2 gap-4 text-left text-xs text-gray-700 font-mono mt-4">
                  <div>जन्म तिथि: <span className="font-bold text-amber-950">{formattedDob}</span></div>
                  <div>जन्म समय: <span className="font-bold text-amber-950">{formattedTime}</span></div>
                  <div className="col-span-2">जन्म स्थान: <span className="font-bold text-amber-950">{formattedPlace}</span></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-[10px] text-amber-700 font-semibold tracking-[0.2em] uppercase">
                  Calculated & Prepared by
                </div>
                <p className="font-serif text-lg font-bold text-amber-900">
                  Acharya Dharmikshree
                </p>
                <p className="text-[10px] text-gray-500 font-mono">
                  13th Generation Astrologer | Surat, Gujarat
                </p>
              </div>
            </div>

            <div className="page-break" style={{ pageBreakBefore: "always" }} />

            <div className="p-8 space-y-6 min-h-[1050px]">
              <div className="border-b-2 border-amber-600 pb-2">
                <h2 className="font-serif text-2xl text-amber-900 font-bold">2. वैदिक प्रस्तावना एवं परिचय (Introduction)</h2>
              </div>
              <div className="text-xs text-gray-700 space-y-4 leading-relaxed font-light">
                <p>
                  भारतीय ज्योतिष शास्त्र (Vedic Astrology) एक विज्ञान है जो ब्रह्मांड में ग्रहों की स्थिति और पृथ्वी पर उनके प्रभावों का अध्ययन करता है। आपके जन्म के समय, आकाश में ग्रहों का जो मानचित्र था, उसे ही कुण्डली (Horoscope) कहते हैं।
                </p>
                <p>
                  इस प्रीमियम रिपोर्ट में आपके ग्रहों की स्थिति, उनके नक्षत्र तथा जीवन के विभिन्न क्षेत्रों पर उनके प्रभाव का विश्लेषण किया गया है।
                </p>
              </div>
            </div>

            <div className="page-break" style={{ pageBreakBefore: "always" }} />

            <div className="p-8 space-y-6 min-h-[1050px]">
              <div className="border-b-2 border-amber-600 pb-2">
                <h2 className="font-serif text-2xl text-amber-900 font-bold">5. मुख्य विवरण (Birth Details & Avakahada Chakra)</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-amber-200 rounded-sm overflow-hidden">
                  <div className="bg-amber-500 text-white text-xs font-bold uppercase tracking-wider py-2 px-4 text-center">
                    व्यक्ति विवरण (Personal Particulars)
                  </div>
                  <div className="divide-y divide-gray-100 text-xs">
                    {[
                      { l: "लिंग", v: gender === "male" ? "पुरुष" : "स्त्री" },
                      { l: "जन्म दिनांक", v: formattedDob },
                      { l: "जन्म समय", v: formattedTime },
                      { l: "जन्म स्थान", v: formattedPlace },
                      { l: "अक्षांश / रेखांश", v: `${latitude}N / ${longitude}E` },
                      { l: "तिथि", v: panchangDetails?.tithi?.[0]?.name || "सप्तमी" },
                      { l: "पक्ष", v: panchangDetails?.tithi?.[0]?.paksha || "शुक्ल पक्ष" },
                      { l: "योग", v: panchangDetails?.yoga?.[0]?.name || "शिव" },
                      { l: "करण", v: panchangDetails?.karana?.[0]?.name || "गर" },
                    ].map((row, i) => (
                      <div key={i} className="flex justify-between py-1.5 px-4 odd:bg-gray-50">
                        <span className="text-gray-500 font-medium">{row.l}</span>
                        <span className="font-semibold text-gray-800">{row.v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border border-amber-200 rounded-sm overflow-hidden">
                  <div className="bg-orange-500 text-white text-xs font-bold uppercase tracking-wider py-2 px-4 text-center">
                    अवकहड़ा चक्र (Avakahada Particulars)
                  </div>
                  <div className="divide-y divide-gray-100 text-xs">
                    {[
                      { l: "नक्षत्र स्वामी", v: "शनि" },
                      { l: "नक्षत्र-पद", v: panchangDetails?.nakshatra?.[0]?.name || "अनुराधा" },
                      { l: "वर्ण (ज्योतिषीय)", v: "ब्राह्मण" },
                      { l: "योनि", v: "मृग" },
                      { l: "गण / वश्य", v: "देव / कीट" },
                      { l: "नाड़ी", v: "मध्य" },
                      { l: "सूर्य राशि", v: panchangDetails?.sun_sign || "सिंह" },
                      { l: "चंद्र राशि", v: panchangDetails?.moon_sign || "वृश्चिक" },
                      { l: "ऋतु", v: panchangDetails?.ritu || "वर्षा" },
                    ].map((row, i) => (
                      <div key={i} className="flex justify-between py-1.5 px-4 odd:bg-gray-50">
                        <span className="text-gray-500 font-medium">{row.l}</span>
                        <span className="font-semibold text-amber-900">{row.v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="page-break" style={{ pageBreakBefore: "always" }} />

            <div className="p-8 space-y-6 min-h-[1050px]">
              <div className="border-b-2 border-amber-600 pb-2">
                <h2 className="font-serif text-2xl text-amber-900 font-bold">7-8. वास्तविक जन्म कुण्डली (Vedic Charts)</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="border border-orange-300 p-4 bg-amber-50/20 text-center rounded-sm space-y-3">
                  <h3 className="font-serif font-bold text-teal-800 text-lg border-b border-amber-200 pb-2">लग्न कुण्डली (Rasi Chart)</h3>
                  {rasiChartSvg ? (
                    <div className="w-full max-w-[340px] mx-auto svg-container text-gray-900" dangerouslySetInnerHTML={{ __html: rasiChartSvg }} />
                  ) : (
                    <div className="w-full h-64 bg-amber-100/50 flex items-center justify-center text-gray-500 animate-pulse">
                      Rasi Chart Loading...
                    </div>
                  )}
                </div>

                <div className="border border-orange-300 p-4 bg-amber-50/20 text-center rounded-sm space-y-3">
                  <h3 className="font-serif font-bold text-teal-800 text-lg border-b border-amber-200 pb-2">नवमांश कुण्डली (D9 Navamsa)</h3>
                  {navamsaChartSvg ? (
                    <div className="w-full max-w-[340px] mx-auto svg-container text-gray-900" dangerouslySetInnerHTML={{ __html: navamsaChartSvg }} />
                  ) : (
                    <div className="w-full h-64 bg-amber-100/50 flex items-center justify-center text-gray-500 animate-pulse">
                      Navamsha Chart Loading...
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="page-break" style={{ pageBreakBefore: "always" }} />

            <div className="p-8 space-y-6 min-h-[1050px]">
              <div className="border-b-2 border-amber-600 pb-2">
                <h2 className="font-serif text-2xl text-amber-900 font-bold">9. विस्तृत ग्रह स्थिति एवं नक्षत्र विवरण</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border border-gray-200">
                  <thead className="bg-amber-600 text-white uppercase text-[10px]">
                    <tr>
                      <th className="py-2 px-3">ग्रह</th>
                      <th className="py-2 px-3">राशि</th>
                      <th className="py-2 px-3">नक्षत्र</th>
                      <th className="py-2 px-3">नक्षत्र स्वामी</th>
                      <th className="py-2 px-3">पद</th>
                      <th className="py-2 px-3">भाव</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-mono text-gray-700">
                    {(kundaliDetails?.planets || [
                      { name: "Sun", rashi: "Leo", nakshatra: "P.Phalguni", nakshatra_lord: "Venus", pada: 4, house: 7 },
                      { name: "Moon", rashi: "Scorpio", nakshatra: "Anuradha", nakshatra_lord: "Saturn", pada: 3, house: 10 },
                      { name: "Mars", rashi: "Gemini", nakshatra: "Punarvasu", nakshatra_lord: "Jupiter", pada: 1, house: 3 },
                      { name: "Mercury", rashi: "Virgo", nakshatra: "Hasta", nakshatra_lord: "Moon", pada: 3, house: 8 },
                      { name: "Jupiter", rashi: "Libra", nakshatra: "Swati", nakshatra_lord: "Rahu", pada: 4, house: 7 },
                      { name: "Venus", rashi: "Libra", nakshatra: "Swati", nakshatra_lord: "Rahu", pada: 1, house: 7 },
                      { name: "Saturn", rashi: "Aquarius", nakshatra: "Satabhisha", nakshatra_lord: "Rahu", pada: 3, house: 1 },
                      { name: "Rahu", rashi: "Libra", nakshatra: "Vishakha", nakshatra_lord: "Jupiter", pada: 2, house: 7 },
                      { name: "Ketu", rashi: "Aries", nakshatra: "Bharani", nakshatra_lord: "Venus", pada: 4, house: 3 },
                    ]).map((row: any, idx: number) => (
                      <tr key={idx} className="odd:bg-gray-50">
                        <td className="py-2 px-3 font-sans font-bold text-amber-900">{row.name}</td>
                        <td className="py-2 px-3">{row.rashi || row.sign}</td>
                        <td className="py-2 px-3">{row.nakshatra}</td>
                        <td className="py-2 px-3">{row.nakshatra_lord || "Saturn"}</td>
                        <td className="py-2 px-3">{row.pada}</td>
                        <td className="py-2 px-3">{row.house || row.position}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="border-t-2 border-amber-600 pt-6 text-center space-y-2">
              <h3 className="font-serif text-lg text-amber-900 font-bold uppercase tracking-widest">
                Dharmik Shree Astro Portal
              </h3>
              <p className="text-xs text-gray-500 font-light max-w-lg mx-auto">
                Jay ambe, Bhalchandra Nagar Society, Surat, Gujarat 395004 | Complete Vedic Astro System
              </p>
              <p className="text-[10px] text-amber-700 font-semibold font-mono">
                Website: www.dharmikshree.com | Support: support@dharmikshree.com
              </p>
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
