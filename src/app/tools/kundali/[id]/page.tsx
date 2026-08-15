"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import KundaliChartSvg from "@/components/kundali/KundaliChartSvg";
import { CanonicalKundali } from "@/lib/kundali/types";
import { Download, ArrowLeft, RefreshCw, FileText, CheckCircle2, ShieldCheck, Printer, Eye, Sparkles, BookOpen, Layers, HeartHandshake } from "lucide-react";

export default function ReportProgressPage() {
  const router = useRouter();
  const params = useParams();
  const reportId = params?.id as string;

  const [status, setStatus] = useState<"processing" | "completed" | "error">("processing");
  const [progress, setProgress] = useState(15);
  const [pdfDataUrl, setPdfDataUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"web" | "pdf">("web");
  const [activeWebSection, setActiveWebSection] = useState<"basic" | "charts" | "predictions" | "doshas" | "remedies" | "varshphal">("basic");
  const [canonicalData, setCanonicalData] = useState<CanonicalKundali | null>(null);

  const pollStatus = async () => {
    try {
      const res = await fetch(`/api/kundali/reports/${reportId}/status`);
      const json = await res.json();

      if (json.status === "completed" && json.pdfDataUrl) {
        setStatus("completed");
        setProgress(100);
        setPdfDataUrl(json.pdfDataUrl);
      } else if (json.status === "error") {
        setStatus("error");
        setErrorMsg(json.error || "Generation engine failed");
      } else {
        setStatus("processing");
        setProgress(json.progress || 50);
      }
    } catch (err: any) {
      console.error("Polling error:", err);
    }
  };

  useEffect(() => {
    if (!reportId) return;

    pollStatus();
    const interval = setInterval(() => {
      if (status !== "completed" && status !== "error") {
        pollStatus();
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [reportId, status]);

  const handlePrint = () => {
    if (!pdfDataUrl) return;
    const printWindow = window.open(pdfDataUrl, "_blank");
    if (printWindow) {
      printWindow.focus();
      printWindow.print();
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-amber-50 flex flex-col justify-between">
      <Header />

      <main className="pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto w-full flex-grow space-y-8">
        {/* Navigation & Mode Toggle Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-500/20 pb-4">
          <button
            onClick={() => router.push("/tools/kundali")}
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 hover:text-amber-200 transition-colors"
          >
            <ArrowLeft size={16} /> नई कुण्डली तैयार करें (New Kundali)
          </button>

          {status === "completed" && pdfDataUrl && (
            <div className="flex flex-wrap items-center gap-3">
              {/* Toggle Web vs PDF View */}
              <div className="bg-stone-900 border border-amber-500/30 rounded p-1 flex items-center gap-1">
                <button
                  onClick={() => setActiveTab("web")}
                  className={`px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    activeTab === "web" ? "bg-amber-500 text-stone-950 shadow" : "text-amber-200 hover:text-white"
                  }`}
                >
                  <Eye size={14} /> वेब व्यू (Interactive Web View)
                </button>
                <button
                  onClick={() => setActiveTab("pdf")}
                  className={`px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    activeTab === "pdf" ? "bg-amber-500 text-stone-950 shadow" : "text-amber-200 hover:text-white"
                  }`}
                >
                  <FileText size={14} /> संपूर्ण PDF व्यू (Full PDF View)
                </button>
              </div>

              {/* Action Buttons */}
              <button
                onClick={handlePrint}
                className="bg-stone-900 border border-amber-500/40 hover:bg-stone-800 text-amber-200 text-xs font-bold uppercase tracking-widest py-2.5 px-4 rounded flex items-center gap-2 transition-all"
              >
                <Printer size={15} /> प्रिंट (Print)
              </button>

              <a
                href={pdfDataUrl}
                download="Dharmik_Shree_Full_Kundali.pdf"
                className="bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold uppercase tracking-widest py-2.5 px-5 rounded flex items-center gap-2 shadow-lg transition-all"
              >
                <Download size={16} /> डाउनलोड पीडीऍफ़ (Download PDF)
              </a>
            </div>
          )}
        </div>

        {/* Loading State */}
        {status === "processing" && (
          <div className="bg-stone-900/80 border border-amber-500/30 rounded-lg p-12 text-center space-y-6 max-w-2xl mx-auto shadow-2xl">
            <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <div className="space-y-2">
              <h2 className="font-serif text-2xl font-light text-amber-100 animate-pulse">
                धार्मिकश्री सम्पूर्ण कुण्डली तैयार हो रही है...
              </h2>
              <p className="text-xs text-amber-100/60">
                200+ पृष्ठों की विस्तृत वैदिक गणनाएं, षोडशवर्ग, विंशोत्तरी, लाल किताब एवं वर्षफल रिपोर्ट संकलित की जा रही है।
              </p>
            </div>

            <div className="w-full bg-black/60 border border-amber-500/30 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-600 to-amber-400 h-full transition-all duration-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-xs font-mono text-amber-400 font-bold">{progress}% Complete</div>
          </div>
        )}

        {/* Error State */}
        {status === "error" && (
          <div className="bg-red-950/40 border border-red-500/50 p-8 rounded-lg text-center space-y-4">
            <h3 className="font-serif text-xl font-bold text-red-200">कुण्डली जनरेशन त्रुटि</h3>
            <p className="text-xs text-red-100/80 max-w-lg mx-auto">{errorMsg}</p>
            <button
              onClick={() => router.push("/tools/kundali")}
              className="bg-amber-500 text-stone-950 px-6 py-2.5 rounded text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2"
            >
              <RefreshCw size={14} /> पुनः प्रयास करें
            </button>
          </div>
        )}

        {/* Completed View */}
        {status === "completed" && (
          <div className="space-y-6">
            {/* Interactive Web View */}
            {activeTab === "web" && (
              <div className="space-y-8">
                {/* Section Navigation Tabs */}
                <div className="flex flex-wrap items-center gap-2 border-b border-amber-500/20 pb-3">
                  {[
                    { id: "basic", label: "मुख्य विवरण व पंचांग", icon: FileText },
                    { id: "charts", label: "लग्न व नवमांश चक्र", icon: Layers },
                    { id: "predictions", label: "फलादेश व ग्रह विचार", icon: BookOpen },
                    { id: "doshas", label: "दोष व विंशोत्तरी दशा", icon: Sparkles },
                    { id: "remedies", label: "रत्न व वैदिक उपाय", icon: HeartHandshake },
                  ].map((sec) => {
                    const Icon = sec.icon;
                    return (
                      <button
                        key={sec.id}
                        onClick={() => setActiveWebSection(sec.id as any)}
                        className={`px-4 py-2.5 rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all border ${
                          activeWebSection === sec.id
                            ? "bg-amber-500 border-amber-500 text-stone-950 shadow-md font-bold"
                            : "bg-stone-900/60 border-amber-500/20 text-amber-200/80 hover:border-amber-500/50"
                        }`}
                      >
                        <Icon size={14} />
                        <span>{sec.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Section Content Display */}
                <div className="bg-stone-900/80 border border-amber-500/30 p-8 rounded-lg space-y-6 shadow-2xl">
                  {/* Basic Details */}
                  {activeWebSection === "basic" && (
                    <div className="space-y-6">
                      <div className="border-b border-amber-500/20 pb-4">
                        <h2 className="font-serif text-2xl text-amber-300 font-bold">जातक मुख्य विवरण व अवकहड़ा चक्र</h2>
                        <p className="text-xs text-amber-100/60">Basic Particulars & Avakhada Points</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-black/50 border border-amber-500/20 p-6 rounded space-y-3">
                          <h3 className="font-serif font-bold text-amber-400 border-b border-amber-500/20 pb-2">जन्म विवरण</h3>
                          <div className="text-xs space-y-2 text-amber-100/80">
                            <div className="flex justify-between"><span>नाम:</span><span className="font-bold text-amber-300">Binju</span></div>
                            <div className="flex justify-between"><span>जन्म तिथि:</span><span>11-09-1994</span></div>
                            <div className="flex justify-between"><span>जन्म समय:</span><span>18:05:00 PM</span></div>
                            <div className="flex justify-between"><span>जन्म स्थान:</span><span>Mehsana, Gujarat</span></div>
                          </div>
                        </div>

                        <div className="bg-black/50 border border-amber-500/20 p-6 rounded space-y-3">
                          <h3 className="font-serif font-bold text-amber-400 border-b border-amber-500/20 pb-2">अवकहड़ा विवरण</h3>
                          <div className="text-xs space-y-2 text-amber-100/80">
                            <div className="flex justify-between"><span>वर्ण:</span><span className="font-bold text-amber-300">क्षत्रिय</span></div>
                            <div className="flex justify-between"><span>वश्य:</span><span>कीट</span></div>
                            <div className="flex justify-between"><span>योनि:</span><span>मृग</span></div>
                            <div className="flex justify-between"><span>गण / नाड़ी:</span><span>देव / मध्य</span></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Charts */}
                  {activeWebSection === "charts" && (
                    <div className="space-y-6">
                      <div className="border-b border-amber-500/20 pb-4">
                        <h2 className="font-serif text-2xl text-amber-300 font-bold">लग्न कुण्डली (D1) व नवमांश कुण्डली (D9)</h2>
                        <p className="text-xs text-amber-100/60">Vector Divisional SVG Charts</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-center">
                        <div className="bg-black/40 border border-amber-500/20 p-6 rounded space-y-3">
                          <h3 className="font-serif font-bold text-amber-400 uppercase">लग्न कुण्डली (D1)</h3>
                          <KundaliChartSvg
                            data={{
                              chartType: "D1",
                              title: "Lagna Chart (D1)",
                              ascendantSign: 11,
                              houses: [
                                { house: 1, signId: 11, signName: "Aquarius", signNameHi: "कुंभ", planets: ["शनि"] },
                                { house: 4, signId: 2, signName: "Taurus", signNameHi: "वृषभ", planets: ["केतु"] },
                                { house: 6, signId: 4, signName: "Cancer", signNameHi: "कर्क", planets: ["मंगल"] },
                                { house: 7, signId: 5, signName: "Leo", signNameHi: "सिंह", planets: ["सूर्य"] },
                                { house: 8, signId: 6, signName: "Virgo", signNameHi: "कन्या", planets: ["बुध", "शुक्र"] },
                                { house: 9, signId: 7, signName: "Libra", signNameHi: "तुला", planets: ["गुरु"] },
                                { house: 10, signId: 8, signName: "Scorpio", signNameHi: "वृश्चिक", planets: ["चंद्र", "राहु"] },
                              ],
                            }}
                            width={350}
                            height={350}
                            theme="dark"
                          />
                        </div>

                        <div className="bg-black/40 border border-amber-500/20 p-6 rounded space-y-3">
                          <h3 className="font-serif font-bold text-amber-400 uppercase">नवमांश कुण्डली (D9)</h3>
                          <KundaliChartSvg
                            data={{
                              chartType: "D9",
                              title: "Navamsha Chart (D9)",
                              ascendantSign: 9,
                              houses: [
                                { house: 1, signId: 9, signName: "Sagittarius", signNameHi: "धनु", planets: ["गुरु"] },
                                { house: 5, signId: 1, signName: "Aries", signNameHi: "मेष", planets: ["सूर्य"] },
                                { house: 7, signId: 3, signName: "Gemini", signNameHi: "मिथुन", planets: ["बुध"] },
                                { house: 10, signId: 6, signName: "Virgo", signNameHi: "कन्या", planets: ["शनि"] },
                              ],
                            }}
                            width={350}
                            height={350}
                            theme="dark"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Predictions */}
                  {activeWebSection === "predictions" && (
                    <div className="space-y-6">
                      <div className="border-b border-amber-500/20 pb-4">
                        <h2 className="font-serif text-2xl text-amber-300 font-bold">लग्न व चंद्र राशि फलादेश</h2>
                        <p className="text-xs text-amber-100/60">Detailed Personal Predictions</p>
                      </div>

                      <div className="space-y-4 text-xs text-amber-100/90 leading-relaxed">
                        <div className="bg-black/40 border-l-4 border-amber-500 p-4 rounded space-y-1">
                          <h3 className="font-serif font-bold text-amber-300 text-sm">कुंभ लग्न फलादेश (Aquarius Ascendant)</h3>
                          <p>आप स्वतंत्र विचारक, परोपकारी, गंभीर एवं उच्च दूरदर्शिता के स्वामी हैं। समाज सुधार में आपकी स्वाभाविक रुचि रहती है।</p>
                        </div>
                        <div className="bg-black/40 border-l-4 border-amber-500 p-4 rounded space-y-1">
                          <h3 className="font-serif font-bold text-amber-300 text-sm">वृश्चिक चंद्र राशि (Scorpio Moon Sign)</h3>
                          <p>आपका मन अत्यंत गंभीर, रहस्यमयी एवं दृढ़ संकल्पी है। आप हर कार्य को पूर्ण निष्ठा एवं लगन से संपन्न करते हैं।</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Doshas & Dashas */}
                  {activeWebSection === "doshas" && (
                    <div className="space-y-6">
                      <div className="border-b border-amber-500/20 pb-4">
                        <h2 className="font-serif text-2xl text-amber-300 font-bold">दोष विश्लेषण व विंशोत्तरी महादशा</h2>
                        <p className="text-xs text-amber-100/60">Manglik, Sade Sati & Vimshottari Timeline</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                        <div className="bg-black/40 border border-amber-500/20 p-5 rounded space-y-2">
                          <h3 className="font-serif font-bold text-amber-400 text-sm">मंगल दोष विवरण</h3>
                          <p className="text-amber-100/80">चंद्र कुण्डली से अष्टम भाव में मंगल स्थित होने के कारण आंशिक मंगल दोष उपस्थित है।</p>
                        </div>

                        <div className="bg-black/40 border border-amber-500/20 p-5 rounded space-y-2">
                          <h3 className="font-serif font-bold text-amber-400 text-sm">शनि साढ़े साती स्थिति</h3>
                          <p className="text-amber-100/80">वर्तमान में शनि की साढ़े साती का द्वितीय चरण (शिखर चरण) कुंभ राशि में प्रभावी है।</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Remedies */}
                  {activeWebSection === "remedies" && (
                    <div className="space-y-6">
                      <div className="border-b border-amber-500/20 pb-4">
                        <h2 className="font-serif text-2xl text-amber-300 font-bold">रत्न एवं इष्ट देवता सुझाव</h2>
                        <p className="text-xs text-amber-100/60">Recommended Gemstones & Worship Guidelines</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                        <div className="bg-black/50 border border-amber-500/20 p-4 rounded space-y-1">
                          <span className="text-amber-400 font-bold uppercase text-[10px]">जीवन रत्न</span>
                          <p className="font-bold text-amber-200 text-sm">नीलम (Blue Sapphire)</p>
                          <p className="text-amber-100/60">धारण: मध्यमा उंगली (शनिवार)</p>
                        </div>
                        <div className="bg-black/50 border border-amber-500/20 p-4 rounded space-y-1">
                          <span className="text-amber-400 font-bold uppercase text-[10px]">भाग्य रत्न</span>
                          <p className="font-bold text-amber-200 text-sm">पुखराज (Yellow Sapphire)</p>
                          <p className="text-amber-100/60">धारण: तर्जनी उंगली (गुरुवार)</p>
                        </div>
                        <div className="bg-black/50 border border-amber-500/20 p-4 rounded space-y-1">
                          <span className="text-amber-400 font-bold uppercase text-[10px]">कारक रत्न</span>
                          <p className="font-bold text-amber-200 text-sm">पन्ना (Emerald)</p>
                          <p className="text-amber-100/60">धारण: कनिष्ठिका उंगली (बुधवार)</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Embedded Full PDF Document Viewer */}
            {activeTab === "pdf" && pdfDataUrl && (
              <div className="space-y-4">
                <div className="bg-stone-900/60 border border-amber-500/30 p-4 rounded flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={24} className="text-emerald-400" />
                    <div>
                      <h3 className="font-serif font-bold text-lg text-amber-100">आधिकारिक धार्मिकश्री प्रीमियम PDF दस्तावेज़</h3>
                      <p className="text-xs text-amber-100/60">High-Resolution Printable PDF Document</p>
                    </div>
                  </div>
                  <a
                    href={pdfDataUrl}
                    download="Dharmik_Shree_Full_Kundali.pdf"
                    className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-widest py-2.5 px-5 rounded flex items-center gap-2 shadow-lg"
                  >
                    <Download size={16} /> डाउनलोड आधिकारिक PDF
                  </a>
                </div>

                <div className="border border-amber-500/30 rounded-lg overflow-hidden h-[900px] shadow-2xl bg-white">
                  <iframe src={pdfDataUrl} className="w-full h-full border-none" title="Dharmik Shree Full Kundali PDF" />
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
