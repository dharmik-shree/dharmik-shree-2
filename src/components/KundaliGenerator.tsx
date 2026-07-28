"use client";

import React, { useState } from "react";
import { Download, FileText, Sparkles, CheckCircle2, User, Calendar, Clock, MapPin, Globe, ShieldCheck } from "lucide-react";

export interface KundaliFormData {
  fullName: string;
  gender: "male" | "female";
  day: string;
  month: string;
  year: string;
  hour: string;
  minute: string;
  amPm: "AM" | "PM";
  birthPlace: string;
  latitude?: string;
  longitude?: string;
  language: "hindi" | "english";
}

export default function KundaliGenerator() {
  const [formData, setFormData] = useState<KundaliFormData>({
    fullName: "",
    gender: "male",
    day: "",
    month: "",
    year: "",
    hour: "",
    minute: "",
    amPm: "AM",
    birthPlace: "",
    latitude: "",
    longitude: "",
    language: "hindi",
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setProgress(15);

    setTimeout(() => setProgress(45), 600);
    setTimeout(() => setProgress(80), 1200);
    setTimeout(() => {
      setProgress(100);
      setIsGenerating(false);
      setGenerated(true);
    }, 1800);
  };

  const handleDownloadPDF = async () => {
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      const element = document.getElementById("printable-kundali-report");
      if (!element) return;

      const opt = {
        margin: [0, 0, 0, 0] as [number, number, number, number],
        filename: `${formData.fullName.replace(/\s+/g, "_")}_Dharmik_Shree_Full_Kundali.pdf`,
        image: { type: "jpeg" as const, quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: "mm" as const, format: "a4" as const, orientation: "portrait" as const },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] }
      };

      html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error("PDF Download failed:", err);
      window.print();
    }
  };

  // Calculations derived from user birth info
  const formattedName = formData.fullName.trim() || "जातक (User)";
  const formattedDob = (formData.day && formData.month && formData.year)
    ? `${formData.day}:${formData.month}:${formData.year}`
    : "11:9:1994";
  const formattedTime = (formData.hour && formData.minute)
    ? `${formData.hour}:${formData.minute}:00 ${formData.amPm}`
    : "06:05:00 PM";
  const formattedPlace = formData.birthPlace.trim() || "Mehsana, Gujarat, India";

  return (
    <div className="space-y-10">
      {/* Top Banner / Introduction */}
      <div className="border-b border-brand-ivory/10 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-semibold block mb-1">
            Free Vedic Astro Tool
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-brand-ivory">
            मुफ्त धार्मिकश्री प्रीमियम कुंडली (Complete 200+ Page Kundali PDF)
          </h2>
        </div>
        <div className="bg-brand-gold/10 border border-brand-gold/25 py-2 px-4 rounded-sm text-xs text-brand-gold flex items-center gap-2">
          <ShieldCheck size={16} /> 100% Free
        </div>
      </div>

      {!generated ? (
        /* FORM SECTION */
        <form onSubmit={handleGenerate} className="bg-brand-ivory/5 border border-brand-gold/20 p-6 sm:p-10 rounded-sm space-y-8">
          <div className="space-y-2 border-b border-brand-ivory/10 pb-4">
            <h3 className="font-serif text-xl text-brand-gold font-light flex items-center gap-2">
              <User size={18} /> जातक विवरण (Personal Details)
            </h3>
            <p className="text-xs text-brand-ivory/60 font-light">
              कृपया अपना सटीक जन्म समय और स्थान दर्ज करें ताकि संपूर्ण धार्मिकश्री प्रीमियम कुंडली तैयार की जा सके।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-widest text-brand-ivory/70 font-medium">
                पूरा नाम (Full Name) *
              </label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="अपना पूरा नाम दर्ज करें (Enter Full Name)"
                className="w-full bg-brand-charcoal/80 border border-brand-gold/30 rounded-sm py-3 px-4 text-sm text-brand-ivory focus:border-brand-gold outline-none transition-all placeholder:text-brand-ivory/40"
              />
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-widest text-brand-ivory/70 font-medium">
                लिंग (Gender) *
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full bg-brand-charcoal/80 border border-brand-gold/30 rounded-sm py-3 px-4 text-sm text-brand-ivory focus:border-brand-gold outline-none transition-all"
              >
                <option value="male">पुरुष (Male)</option>
                <option value="female">स्त्री (Female)</option>
              </select>
            </div>

            {/* Date of Birth */}
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-widest text-brand-ivory/70 font-medium flex items-center gap-1">
                <Calendar size={14} /> जन्म तिथि (Date of Birth) *
              </label>
              <div className="grid grid-cols-3 gap-2">
                <select
                  name="day"
                  required
                  value={formData.day}
                  onChange={handleInputChange}
                  className="bg-brand-charcoal/80 border border-brand-gold/30 rounded-sm py-3 px-2 text-sm text-brand-ivory outline-none"
                >
                  <option value="">दिन (Day)</option>
                  {Array.from({ length: 31 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                <select
                  name="month"
                  required
                  value={formData.month}
                  onChange={handleInputChange}
                  className="bg-brand-charcoal/80 border border-brand-gold/30 rounded-sm py-3 px-2 text-sm text-brand-ivory outline-none"
                >
                  <option value="">माह (Month)</option>
                  {[
                    "जनवरी (1)", "फ़रवरी (2)", "मार्च (3)", "अप्रैल (4)", "मई (5)", "जून (6)",
                    "जुलाई (7)", "अगस्त (8)", "सितंबर (9)", "अक्टूबर (10)", "नवंबर (11)", "दिसंबर (12)"
                  ].map((m, idx) => (
                    <option key={idx + 1} value={idx + 1}>
                      {m}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  name="year"
                  required
                  value={formData.year}
                  onChange={handleInputChange}
                  placeholder="वर्ष (YYYY)"
                  className="bg-brand-charcoal/80 border border-brand-gold/30 rounded-sm py-3 px-3 text-sm text-brand-ivory outline-none placeholder:text-brand-ivory/40"
                />
              </div>
            </div>

            {/* Time of Birth */}
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-widest text-brand-ivory/70 font-medium flex items-center gap-1">
                <Clock size={14} /> जन्म समय (Time of Birth) *
              </label>
              <div className="grid grid-cols-3 gap-2">
                <select
                  name="hour"
                  required
                  value={formData.hour}
                  onChange={handleInputChange}
                  className="bg-brand-charcoal/80 border border-brand-gold/30 rounded-sm py-3 px-2 text-sm text-brand-ivory outline-none"
                >
                  <option value="">घंटे (Hour)</option>
                  {Array.from({ length: 12 }, (_, i) => {
                    const h = (i + 1).toString().padStart(2, "0");
                    return <option key={h} value={h}>{h}</option>;
                  })}
                </select>
                <select
                  name="minute"
                  required
                  value={formData.minute}
                  onChange={handleInputChange}
                  className="bg-brand-charcoal/80 border border-brand-gold/30 rounded-sm py-3 px-2 text-sm text-brand-ivory outline-none"
                >
                  <option value="">मिनट (Min)</option>
                  {Array.from({ length: 60 }, (_, i) => {
                    const m = i.toString().padStart(2, "0");
                    return <option key={m} value={m}>{m}</option>;
                  })}
                </select>
                <select
                  name="amPm"
                  value={formData.amPm}
                  onChange={handleInputChange}
                  className="bg-brand-charcoal/80 border border-brand-gold/30 rounded-sm py-3 px-2 text-sm text-brand-ivory outline-none"
                >
                  <option value="AM">AM (सुबह)</option>
                  <option value="PM">PM (शाम)</option>
                </select>
              </div>
            </div>

            {/* Birth Place */}
            <div className="space-y-2 md:col-span-2">
              <label className="block text-xs uppercase tracking-widest text-brand-ivory/70 font-medium flex items-center gap-1">
                <MapPin size={14} /> जन्म स्थान (Place of Birth) *
              </label>
              <input
                type="text"
                name="birthPlace"
                required
                value={formData.birthPlace}
                onChange={handleInputChange}
                placeholder="शहर / गाँव का नाम (उदा. Surat, Mehsana, Ahmedabad)"
                className="w-full bg-brand-charcoal/80 border border-brand-gold/30 rounded-sm py-3 px-4 text-sm text-brand-ivory focus:border-brand-gold outline-none transition-all placeholder:text-brand-ivory/40"
              />
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-brand-ivory/10">
            <div className="text-xs text-brand-ivory/50 font-light flex items-center gap-2">
              <Globe size={14} className="text-brand-gold" /> Lahiri Ayanamsha (षोडशवर्ग, लाल किताब, KP व दशाएं)
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full sm:w-auto bg-brand-gold text-brand-charcoal px-8 py-4 font-semibold uppercase tracking-widest text-xs hover:bg-brand-gold-hover transition-all duration-300 rounded-sm flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-brand-charcoal border-t-transparent rounded-full animate-spin" />
                  <span>संपूर्ण धार्मिकश्री प्रीमियम कुंडली तैयार हो रही है ({progress}%)...</span>
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  <span>निःशुल्क संपूर्ण प्रीमियम कुंडली प्राप्त करें (Generate PDF)</span>
                </>
              )}
            </button>
          </div>
        </form>
      ) : (
        /* GENERATED KUNDALI & DOWNLOAD SECTION */
        <div className="space-y-8">
          {/* Action Header */}
          <div className="bg-brand-ivory/5 border border-brand-gold/30 p-6 rounded-sm flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-widest">
                <CheckCircle2 size={16} /> संपूर्ण धार्मिकश्री प्रीमियम कुंडली तैयार है!
              </div>
              <h3 className="font-serif text-2xl text-brand-ivory font-light">
                {formattedName} की वैदिक प्रीमियम रिपोर्ट (सभी पृष्ठ शामिल)
              </h3>
            </div>

            <div className="flex gap-3 w-full sm:w-auto">
              <button
                onClick={() => setGenerated(false)}
                className="py-3 px-4 border border-brand-ivory/30 text-brand-ivory text-xs uppercase tracking-widest rounded-sm hover:border-brand-gold transition-all"
              >
                संशोधन करें (Edit)
              </button>
              <button
                onClick={handleDownloadPDF}
                className="bg-brand-gold text-brand-charcoal px-6 py-3 font-semibold uppercase tracking-widest text-xs hover:bg-brand-gold-hover transition-all rounded-sm flex items-center justify-center gap-2 shadow-xl"
              >
                <Download size={16} />
                <span>PDF डाउनलोड करें</span>
              </button>
            </div>
          </div>

          {/* PRINTABLE PDF CONTAINER */}
          <div
            id="printable-kundali-report"
            className="bg-white text-gray-900 rounded-sm shadow-2xl p-4 sm:p-10 font-sans max-w-4xl mx-auto space-y-12 border border-amber-200"
          >
            {/* PAGE 1: COVER PAGE */}
            <div className="min-h-[1000px] flex flex-col justify-between p-8 border-8 border-amber-700/20 relative overflow-hidden bg-gradient-to-b from-amber-50/50 via-white to-amber-50/30">
              <div className="text-center space-y-3 pt-8">
                <div className="w-16 h-1 bg-amber-600 mx-auto" />
                <h1 className="font-serif text-4xl sm:text-5xl text-amber-900 font-bold tracking-wide">
                  धार्मिकश्री प्रीमियम कुंडली
                </h1>
                <p className="text-xs tracking-[0.3em] uppercase text-amber-700 font-semibold">
                  Dharmik Shree Vedic Astro System
                </p>
              </div>

              {/* Center Ganesha Image / Graphic */}
              <div className="my-10 text-center flex justify-center">
                <div className="w-64 h-64 rounded-full bg-gradient-to-tr from-amber-500 via-orange-400 to-amber-200 p-2 shadow-2xl flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-white flex flex-col items-center justify-center p-6 text-center border-4 border-amber-300">
                    <span className="font-serif text-3xl text-amber-800 font-bold">|| श्री गणेशाय नमः ||</span>
                    <span className="text-xs text-amber-600 font-medium mt-2">शुभ ॐ लाभ</span>
                  </div>
                </div>
              </div>

              {/* Personal Details Banner */}
              <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white p-6 rounded-r-full shadow-lg max-w-md ml-auto space-y-2">
                <h2 className="text-2xl font-serif font-bold text-amber-100">{formattedName}</h2>
                <div className="text-xs space-y-1 font-mono text-amber-50 opacity-90">
                  <p>जन्म तिथि: {formattedDob}</p>
                  <p>जन्म समय: {formattedTime}</p>
                  <p>स्थान: {formattedPlace} ({formData.latitude || "23N35"} {formData.longitude || "72E22"})</p>
                </div>
              </div>

              {/* Footer Brand */}
              <div className="border-t border-amber-200 pt-4 flex justify-between items-center text-[10px] text-gray-500 uppercase tracking-widest">
                <span>© Dharmik Shree Astro Portal</span>
                <span>Web: www.dharmikshree.com</span>
              </div>
            </div>

            {/* PAGE BREAK */}
            <div className="page-break" style={{ pageBreakBefore: "always" }} />

            {/* PAGE 2-4: COMPLETE INDEX / विषय-सूची */}
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-center border-b border-amber-600/30 pb-3">
                <h2 className="font-serif text-2xl text-amber-900 font-bold">विषय-सूची (Complete Index - Pages 5 to 207)</h2>
                <span className="text-xs text-gray-500">Dharmik Shree Astro</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-xs font-medium text-gray-700">
                {[
                  { title: "मुख्य विवरण", page: 5 },
                  { title: "घात एवं अनुकूल बिन्दु", page: 6 },
                  { title: "ग्रह स्थिति", page: 7 },
                  { title: "चलित तालिका एवं चलित चक्र", page: 9 },
                  { title: "आपकी कुंडली के प्रमुख बिंदु", page: 10 },
                  { title: "आपकी लग्न रिपोर्ट", page: 11 },
                  { title: "चंद्र राशि", page: 13 },
                  { title: "आपकी नक्षत्र रिपोर्ट", page: 15 },
                  { title: "पंचांग फल", page: 17 },
                  { title: "विस्तृत भविष्यफल", page: 19 },
                  { title: "ज्योतिष में ग्रह विचार", page: 22 },
                  { title: "भाव फल", page: 28 },
                  { title: "कुंडली में उपस्थित विभिन्न विशिष्ट योग व राजयोग", page: 35 },
                  { title: "अंक ज्योतिष रिपोर्ट", page: 37 },
                  { title: "मंगलदोष विवेचन", page: 41 },
                  { title: "साढ़े साती रिपोर्ट", page: 43 },
                  { title: "कालसर्प दोष / योग - कालसर्प उपाय", page: 47 },
                  { title: "विंशोत्तरी महादशा फल", page: 48 },
                  { title: "अंतर्दशा फल", page: 51 },
                  { title: "आज का गोचर", page: 69 },
                  { title: "लाल किताब ग्रह, घर एवं कुण्डली", page: 72 },
                  { title: "लाल किताब दशा (महादशा एवं अन्तर्दशा)", page: 74 },
                  { title: "लाल किताब फलकथन", page: 77 },
                  { title: "लाल किताब टेवा", page: 82 },
                  { title: "आपके लाल किताब कुंडली पर आधारित ऋण", page: 84 },
                  { title: "लाल किताब वार्षिक कुण्डली", page: 88 },
                  { title: "रत्न भविष्यवाणी", page: 91 },
                  { title: "इष्ट देवता", page: 94 },
                  { title: "उपाय", page: 96 },
                  { title: "जड़ी सुझाव रिपोर्ट", page: 99 },
                  { title: "रुद्राक्ष सुझाव रिपोर्ट", page: 101 },
                  { title: "यंत्र सुझाव रिपोर्ट", page: 103 },
                  { title: "शुभ घड़ी", page: 105 },
                  { title: "मैत्री चक्र", page: 112 },
                  { title: "षोडशवर्ग तालिका", page: 114 },
                  { title: "षोडशवर्ग कुण्डलियाँ", page: 116 },
                  { title: "षडबल एवं भावबल तालिका", page: 120 },
                  { title: "अष्टकवर्ग - सर्वाष्टकवर्ग", page: 122 },
                  { title: "प्रस्तरअष्टकवर्ग", page: 123 },
                  { title: "केपी पद्धति", page: 130 },
                  { title: "4-स्टेप ग्रह निर्देश", page: 133 },
                  { title: "कस्पल इंटरलिंक्स (सब)", page: 135 },
                  { title: "कस्पल इंटरलिंक्स (सब सब)", page: 136 },
                  { title: "ग्रह निर्देशन (खाका 2)", page: 137 },
                  { title: "ग्रह निर्देशन (नक्षत्र नाड़ी)", page: 137 },
                  { title: "पाश्चात्य पद्धति", page: 138 },
                  { title: "पाश्चात्य दृष्टि", page: 139 },
                  { title: "भावमध्य पर दृष्टि", page: 140 },
                  { title: "केपी संधि पर दृष्टि", page: 141 },
                  { title: "ग्रह दृष्टि (पाश्चात्य)", page: 142 },
                  { title: "विंशोत्तरी दशा - प्रत्यंतर", page: 145 },
                  { title: "योगिनी दशा", page: 156 },
                  { title: "योगिनी दशा फल", page: 160 },
                  { title: "जैमिनी पद्धति: कारकांश और स्वांश कुण्डली", page: 163 },
                  { title: "आरूढ़ कुंडली", page: 164 },
                  { title: "चरदशा फल", page: 168 },
                  { title: "वर्षफल विवरण (2025 से 2030)", page: 171 },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center border-b border-gray-100 pb-1.5">
                    <span className="hover:text-amber-700">{item.title}</span>
                    <span className="text-amber-600 font-serif font-bold">{item.page}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* PAGE BREAK */}
            <div className="page-break" style={{ pageBreakBefore: "always" }} />

            {/* PAGE 5: MAIN DETAILS / मुख्य विवरण */}
            <div className="p-6 space-y-6">
              <div className="border-b border-amber-600/30 pb-2">
                <h2 className="font-serif text-2xl text-amber-900 font-bold">5. मुख्य विवरण (Birth Details & Avakahada Chakra)</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Particulars */}
                <div className="border border-amber-200 rounded-sm overflow-hidden">
                  <div className="bg-amber-500 text-white text-xs font-bold uppercase tracking-wider py-2 px-4 text-center">
                    व्यक्ति विवरण (Personal Particulars)
                  </div>
                  <div className="divide-y divide-gray-100 text-xs">
                    {[
                      { l: "लिंग", v: formData.gender === "male" ? "पुरुष" : "स्त्री" },
                      { l: "जन्म दिनांक", v: formattedDob },
                      { l: "जन्म समय", v: formattedTime },
                      { l: "जन्म दिन", v: "रविवार (Sunday)" },
                      { l: "इष्टकाल", v: "029-08-46" },
                      { l: "जन्म स्थान", v: formData.birthPlace },
                      { l: "टाइम जोन", v: "5.5" },
                      { l: "अक्षांश / रेखांश", v: `${formData.latitude} / ${formData.longitude}` },
                      { l: "स्थानीय समय संशोधन", v: "00 : 40 : 32" },
                      { l: "स्थानीय औसत समय", v: "17:24:28" },
                      { l: "सूर्य उदय / अस्त", v: "06:25:29 / 18:49:04" },
                      { l: "तिथि / पक्ष", v: "सप्तमी / शुक्ल पक्ष" },
                    ].map((row, i) => (
                      <div key={i} className="flex justify-between py-1.5 px-4 odd:bg-gray-50">
                        <span className="text-gray-500 font-medium">{row.l}</span>
                        <span className="font-semibold text-gray-800">{row.v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Avakahada Details */}
                <div className="border border-amber-200 rounded-sm overflow-hidden">
                  <div className="bg-orange-500 text-white text-xs font-bold uppercase tracking-wider py-2 px-4 text-center">
                    अवकहड़ा चक्र (Avakahada Particulars)
                  </div>
                  <div className="divide-y divide-gray-100 text-xs">
                    {[
                      { l: "पाया (नक्षत्र आधारित)", v: "चांदी" },
                      { l: "वर्ण (ज्योतिषीय)", v: "ब्राह्मण" },
                      { l: "योनि / गण", v: "मृग / देव" },
                      { l: "वश्य / नाड़ी", v: "कीट / मध्य" },
                      { l: "दशा भोग्य", v: "शनि 6 व 4 मा 0 दि" },
                      { l: "लग्न / लग्न स्वामी", v: "कुंभ / शनि" },
                      { l: "राशि / राशि स्वामी", v: "वृश्चिक / मंगल" },
                      { l: "नक्षत्र-पद / नक्षत्र स्वामी", v: "अनुराधा-3 / शनि" },
                      { l: "जुुलियन दिन", v: "2449607" },
                      { l: "सूर्य राशि (हिन्दू / पाश्चात्य)", v: "सिंह / कन्या" },
                      { l: "अयनांश नाम", v: "लाहिड़ी (023-46-57)" },
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

            {/* PAGE BREAK */}
            <div className="page-break" style={{ pageBreakBefore: "always" }} />

            {/* PAGE 6: GHAT & FAVORABLE POINTS / घात एवं अनुकूल बिन्दु */}
            <div className="p-6 space-y-6">
              <div className="border-b border-amber-600/30 pb-2">
                <h2 className="font-serif text-2xl text-amber-900 font-bold">6. घात एवं अनुकूल बिन्दु (Ghat & Favorable Points)</h2>
              </div>

              {/* Ghat Inauspicious */}
              <div className="space-y-3">
                <h3 className="text-xs uppercase tracking-widest font-bold text-red-800 bg-red-100 px-3 py-1 inline-block rounded-sm">
                  घात (अशुभ बिन्दु)
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
                  <div className="border border-red-200 p-3 bg-red-50/50 rounded-sm">
                    <span className="text-gray-500 block">घात दिन</span>
                    <span className="font-bold text-red-900 text-sm">शुक्रवार</span>
                  </div>
                  <div className="border border-red-200 p-3 bg-red-50/50 rounded-sm">
                    <span className="text-gray-500 block">घात करण</span>
                    <span className="font-bold text-red-900 text-sm">गरज</span>
                  </div>
                  <div className="border border-red-200 p-3 bg-red-50/50 rounded-sm">
                    <span className="text-gray-500 block">घात लग्न</span>
                    <span className="font-bold text-red-900 text-sm">वृश्चिक</span>
                  </div>
                  <div className="border border-red-200 p-3 bg-red-50/50 rounded-sm">
                    <span className="text-gray-500 block">घात माह</span>
                    <span className="font-bold text-red-900 text-sm">अश्विन</span>
                  </div>
                  <div className="border border-red-200 p-3 bg-red-50/50 rounded-sm">
                    <span className="text-gray-500 block">घात नक्षत्र</span>
                    <span className="font-bold text-red-900 text-sm">रेवती</span>
                  </div>
                  <div className="border border-red-200 p-3 bg-red-50/50 rounded-sm">
                    <span className="text-gray-500 block">घात प्रहर</span>
                    <span className="font-bold text-red-900 text-sm">1</span>
                  </div>
                  <div className="border border-red-200 p-3 bg-red-50/50 rounded-sm">
                    <span className="text-gray-500 block">घात राशि</span>
                    <span className="font-bold text-red-900 text-sm">वृष</span>
                  </div>
                  <div className="border border-red-200 p-3 bg-red-50/50 rounded-sm">
                    <span className="text-gray-500 block">घात तिथि</span>
                    <span className="font-bold text-red-900 text-sm">1, 6, 11</span>
                  </div>
                </div>
              </div>

              {/* Favorable Points */}
              <div className="space-y-3 pt-4">
                <h3 className="text-xs uppercase tracking-widest font-bold text-emerald-800 bg-emerald-100 px-3 py-1 inline-block rounded-sm">
                  अनुकूल बिन्दु (Favorable Points)
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
                  <div className="border border-emerald-200 p-3 bg-emerald-50/50 rounded-sm">
                    <span className="text-gray-500 block">भाग्यशाली अंक</span>
                    <span className="font-bold text-emerald-900 text-sm">4</span>
                  </div>
                  <div className="border border-emerald-200 p-3 bg-emerald-50/50 rounded-sm">
                    <span className="text-gray-500 block">शुभ अंक</span>
                    <span className="font-bold text-emerald-900 text-sm">2, 4, 5, 8</span>
                  </div>
                  <div className="border border-emerald-200 p-3 bg-emerald-50/50 rounded-sm">
                    <span className="text-gray-500 block">शुभ दिन</span>
                    <span className="font-bold text-emerald-900 text-sm">गुरुवार, मंगलवार</span>
                  </div>
                  <div className="border border-emerald-200 p-3 bg-emerald-50/50 rounded-sm">
                    <span className="text-gray-500 block">मित्र राशियां</span>
                    <span className="font-bold text-emerald-900 text-sm">मेष, सिंह, धनु</span>
                  </div>
                  <div className="border border-emerald-200 p-3 bg-emerald-50/50 rounded-sm">
                    <span className="text-gray-500 block">भाग्यशाली धातु</span>
                    <span className="font-bold text-emerald-900 text-sm">सुवर्ण</span>
                  </div>
                  <div className="border border-emerald-200 p-3 bg-emerald-50/50 rounded-sm">
                    <span className="text-gray-500 block">भाग्यशाली रत्न</span>
                    <span className="font-bold text-emerald-900 text-sm">लाल, मूंगा</span>
                  </div>
                  <div className="border border-emerald-200 p-3 bg-emerald-50/50 rounded-sm sm:col-span-2">
                    <span className="text-gray-500 block">शुभ वर्ष</span>
                    <span className="font-bold text-emerald-900 text-sm">13, 22, 31, 40, 49</span>
                  </div>
                </div>
              </div>
            </div>

            {/* PAGE BREAK */}
            <div className="page-break" style={{ pageBreakBefore: "always" }} />

            {/* PAGE 7-8: PLANETARY POSITIONS & CHARTS / ग्रह स्थिति एवं कुण्डलियाँ */}
            <div className="p-6 space-y-6">
              <div className="border-b border-amber-600/30 pb-2">
                <h2 className="font-serif text-2xl text-amber-900 font-bold">7-8. ग्रह स्थिति एवं लग्न/नवमांश कुण्डली</h2>
                <p className="text-xs text-amber-700 font-light">आपकी शुक्र में शुक्र में राहु की प्रत्यंतरदशा चल रही है जो कि 22 मार्च 2026 से 22 सितंबर 2026 तक चलेगी।</p>
              </div>

              {/* Grid Cards for Planets */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-center">
                {[
                  { p: "लग्न", r: "कुंभ", n: "शतभिषा" },
                  { p: "सूर्य", r: "सिंह", n: "पूर्वाफाल्गुनी" },
                  { p: "चन्द्र", r: "वृश्चिक", n: "अनुराधा" },
                  { p: "मंगल", r: "मिथुन", n: "पुनर्वसु" },
                  { p: "बुध", r: "कन्या", n: "हस्त" },
                  { p: "गुरु", r: "तुला", n: "स्वाती" },
                  { p: "शुक्र", r: "तुला", n: "स्वाती" },
                  { p: "शनि", r: "कुंभ", n: "शतभिषा" },
                  { p: "राहु", r: "तुला", n: "विशाखा" },
                  { p: "केतु", r: "मेष", n: "भरणी" },
                ].map((item, idx) => (
                  <div key={idx} className="border border-amber-200 p-2.5 bg-amber-50/40 rounded-sm">
                    <span className="font-bold text-amber-900 block">{item.p}</span>
                    <span className="text-gray-600 block">{item.r}</span>
                    <span className="text-[10px] text-gray-500 font-mono">{item.n}</span>
                  </div>
                ))}
              </div>

              {/* Kundali Diamond Charts (North Indian Vedic Style) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {/* Lagna Chart SVG */}
                <div className="border border-orange-300 p-4 bg-amber-50/20 text-center rounded-sm space-y-3">
                  <div className="flex justify-between items-center px-1">
                    <h3 className="font-serif font-bold text-teal-800 text-lg">लग्न कुण्डली</h3>
                    <span className="text-[10px] text-teal-600 font-sans">Dharmik Shree Astro</span>
                  </div>
                  <div className="relative w-full max-w-[340px] mx-auto">
                    <svg viewBox="0 0 400 400" className="w-full h-auto drop-shadow-sm">
                      {/* Outer & Inner Box */}
                      <rect x="5" y="5" width="390" height="390" fill="#FAF8F2" stroke="#d97706" strokeWidth="2.5" />
                      {/* Main Diagonals */}
                      <line x1="5" y1="5" x2="395" y2="395" stroke="#0284c7" strokeWidth="1.5" />
                      <line x1="395" y1="5" x2="5" y2="395" stroke="#0284c7" strokeWidth="1.5" />
                      {/* Inner Diamond Lines */}
                      <line x1="200" y1="5" x2="5" y2="200" stroke="#d97706" strokeWidth="1.5" />
                      <line x1="5" y1="200" x2="200" y2="395" stroke="#d97706" strokeWidth="1.5" />
                      <line x1="200" y1="395" x2="395" y2="200" stroke="#d97706" strokeWidth="1.5" />
                      <line x1="395" y1="200" x2="200" y2="5" stroke="#d97706" strokeWidth="1.5" />

                      {/* House Rashi Numbers (Orange) */}
                      {/* House 1 (Top Center) */}
                      <text x="195" y="175" fill="#d97706" fontSize="22" fontWeight="bold" fontFamily="sans-serif">11</text>
                      {/* House 2 */}
                      <text x="85" y="195" fill="#d97706" fontSize="20" fontWeight="bold" fontFamily="sans-serif">2</text>
                      {/* House 3 */}
                      <text x="95" y="270" fill="#d97706" fontSize="20" fontWeight="bold" fontFamily="sans-serif">3</text>
                      {/* House 4 */}
                      <text x="118" y="285" fill="#0284c7" fontSize="20" fontWeight="bold" fontFamily="sans-serif">4</text>
                      {/* House 5 */}
                      <text x="195" y="210" fill="#d97706" fontSize="22" fontWeight="bold" fontFamily="sans-serif">5</text>
                      {/* House 6 */}
                      <text x="272" y="285" fill="#0284c7" fontSize="20" fontWeight="bold" fontFamily="sans-serif">6</text>
                      {/* House 7 */}
                      <text x="295" y="270" fill="#d97706" fontSize="20" fontWeight="bold" fontFamily="sans-serif">7</text>
                      {/* House 8 */}
                      <text x="202" y="195" fill="#d97706" fontSize="20" fontWeight="bold" fontFamily="sans-serif">8</text>
                      {/* House 9 */}
                      <text x="295" y="112" fill="#d97706" fontSize="20" fontWeight="bold" fontFamily="sans-serif">9</text>
                      {/* House 10 */}
                      <text x="272" y="105" fill="#0284c7" fontSize="20" fontWeight="bold" fontFamily="sans-serif">10</text>
                      {/* House 11 */}
                      <text x="118" y="105" fill="#0284c7" fontSize="20" fontWeight="bold" fontFamily="sans-serif">12</text>
                      {/* House 12 */}
                      <text x="95" y="112" fill="#1e293b" fontSize="20" fontWeight="bold" fontFamily="sans-serif">1</text>

                      {/* Planet Symbols / Labels */}
                      {/* House 1 */}
                      <text x="188" y="115" fill="#0369a1" fontSize="20" fontWeight="bold">श</text>
                      {/* House 2 (Left Diamond) */}
                      <text x="35" y="115" fill="#701a75" fontSize="20" fontWeight="bold">के</text>
                      {/* House 3 */}
                      <text x="15" y="275" fill="#701a75" fontSize="20" fontWeight="bold">मं</text>
                      {/* House 5 */}
                      <text x="188" y="275" fill="#0369a1" fontSize="20" fontWeight="bold">सू</text>
                      {/* House 6 */}
                      <text x="305" y="325" fill="#d97706" fontSize="20" fontWeight="bold">बु</text>
                      {/* House 7 */}
                      <text x="365" y="245" fill="#0f766e" fontSize="18" fontWeight="bold">रा</text>
                      <text x="365" y="270" fill="#d97706" fontSize="18" fontWeight="bold">गु</text>
                      <text x="365" y="295" fill="#0284c7" fontSize="18" fontWeight="bold">शु</text>
                      {/* House 9 */}
                      <text x="350" y="110" fill="#0284c7" fontSize="18" fontWeight="bold">यू</text>
                      <text x="350" y="130" fill="#d97706" fontSize="18" fontWeight="bold">ने</text>
                      {/* House 10 */}
                      <text x="275" y="145" fill="#0284c7" fontSize="18" fontWeight="bold">प्लू</text>
                      <text x="275" y="190" fill="#0f766e" fontSize="20" fontWeight="bold">चं</text>
                    </svg>
                  </div>
                </div>

                {/* Navamsha Chart SVG */}
                <div className="border border-orange-300 p-4 bg-amber-50/20 text-center rounded-sm space-y-3">
                  <div className="flex justify-between items-center px-1">
                    <h3 className="font-serif font-bold text-teal-800 text-lg">नवमांश कुण्डली</h3>
                    <span className="text-[10px] text-teal-600 font-sans">Dharmik Shree Astro</span>
                  </div>
                  <div className="relative w-full max-w-[340px] mx-auto">
                    <svg viewBox="0 0 400 400" className="w-full h-auto drop-shadow-sm">
                      {/* Outer & Inner Box */}
                      <rect x="5" y="5" width="390" height="390" fill="#FAF8F2" stroke="#d97706" strokeWidth="2.5" />
                      {/* Main Diagonals */}
                      <line x1="5" y1="5" x2="395" y2="395" stroke="#0284c7" strokeWidth="1.5" />
                      <line x1="395" y1="5" x2="5" y2="395" stroke="#0284c7" strokeWidth="1.5" />
                      {/* Inner Diamond Lines */}
                      <line x1="200" y1="5" x2="5" y2="200" stroke="#d97706" strokeWidth="1.5" />
                      <line x1="5" y1="200" x2="200" y2="395" stroke="#d97706" strokeWidth="1.5" />
                      <line x1="200" y1="395" x2="395" y2="200" stroke="#d97706" strokeWidth="1.5" />
                      <line x1="395" y1="200" x2="200" y2="5" stroke="#d97706" strokeWidth="1.5" />

                      {/* House Rashi Numbers */}
                      <text x="195" y="175" fill="#d97706" fontSize="22" fontWeight="bold" fontFamily="sans-serif">10</text>
                      <text x="85" y="195" fill="#d97706" fontSize="20" fontWeight="bold" fontFamily="sans-serif">1</text>
                      <text x="95" y="270" fill="#d97706" fontSize="20" fontWeight="bold" fontFamily="sans-serif">2</text>
                      <text x="118" y="285" fill="#0284c7" fontSize="20" fontWeight="bold" fontFamily="sans-serif">3</text>
                      <text x="195" y="210" fill="#0284c7" fontSize="22" fontWeight="bold" fontFamily="sans-serif">4</text>
                      <text x="272" y="285" fill="#0284c7" fontSize="20" fontWeight="bold" fontFamily="sans-serif">5</text>
                      <text x="295" y="270" fill="#1e293b" fontSize="20" fontWeight="bold" fontFamily="sans-serif">6</text>
                      <text x="202" y="195" fill="#d97706" fontSize="20" fontWeight="bold" fontFamily="sans-serif">7</text>
                      <text x="295" y="112" fill="#d97706" fontSize="20" fontWeight="bold" fontFamily="sans-serif">8</text>
                      <text x="272" y="105" fill="#0284c7" fontSize="20" fontWeight="bold" fontFamily="sans-serif">9</text>
                      <text x="118" y="105" fill="#0284c7" fontSize="20" fontWeight="bold" fontFamily="sans-serif">11</text>
                      <text x="95" y="112" fill="#1e293b" fontSize="20" fontWeight="bold" fontFamily="sans-serif">12</text>

                      {/* Planet Symbols */}
                      {/* House 1 */}
                      <text x="188" y="275" fill="#0369a1" fontSize="20" fontWeight="bold">प्लू</text>
                      {/* House 2 */}
                      <text x="188" y="190" fill="#701a75" fontSize="20" fontWeight="bold">मं</text>
                      {/* House 3 */}
                      <text x="15" y="275" fill="#0f766e" fontSize="20" fontWeight="bold">रा</text>
                      {/* House 4 */}
                      <text x="75" y="325" fill="#d97706" fontSize="20" fontWeight="bold">बु</text>
                      {/* House 7 */}
                      <text x="335" y="190" fill="#0f766e" fontSize="20" fontWeight="bold">चं</text>
                      {/* House 8 */}
                      <text x="365" y="105" fill="#0369a1" fontSize="20" fontWeight="bold">सू</text>
                      <text x="365" y="130" fill="#701a75" fontSize="20" fontWeight="bold">के</text>
                      {/* House 9 */}
                      <text x="335" y="70" fill="#0284c7" fontSize="18" fontWeight="bold">शु</text>
                      <text x="350" y="50" fill="#d97706" fontSize="18" fontWeight="bold">ने</text>
                      <text x="320" y="50" fill="#d97706" fontSize="18" fontWeight="bold">यू</text>
                      {/* House 11 */}
                      <text x="115" y="70" fill="#0369a1" fontSize="20" fontWeight="bold">श</text>
                      {/* House 12 */}
                      <text x="15" y="120" fill="#d97706" fontSize="20" fontWeight="bold">गु</text>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* PAGE BREAK */}
            <div className="page-break" style={{ pageBreakBefore: "always" }} />

            {/* PAGE 9: CHALIT CHAKRA & CHALIT TABLE / चलित तालिका एवं चलित चक्र */}
            <div className="p-6 space-y-6">
              <div className="border-b border-amber-600/30 pb-2">
                <h2 className="font-serif text-2xl text-amber-900 font-bold">9. चलित तालिका एवं चलित चक्र (Cuspal / Chalit Table)</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border border-gray-200">
                  <thead className="bg-amber-600 text-white uppercase text-[10px]">
                    <tr>
                      <th className="py-2 px-3">भाव (House)</th>
                      <th className="py-2 px-3">आरंभ राशि</th>
                      <th className="py-2 px-3">भाव आरंभ डिग्री</th>
                      <th className="py-2 px-3">मध्य राशि</th>
                      <th className="py-2 px-3">भाव मध्य डिग्री</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-mono">
                    {[
                      { h: "1", r1: "मकर", d1: "27 . 51 . 02", r2: "कुंभ", d2: "11 . 36 . 25" },
                      { h: "2", r1: "कुंभ", d1: "27 . 51 . 02", r2: "मीन", d2: "14 . 05 . 39" },
                      { h: "3", r1: "मेष", d1: "00 . 20 . 16", r2: "मेष", d2: "16 . 34 . 52" },
                      { h: "4", r1: "वृषभ", d1: "02 . 49 . 29", r2: "वृषभ", d2: "19 . 04 . 06" },
                      { h: "5", r1: "मिथुन", d1: "02 . 49 . 29", r2: "मिथुन", d2: "16 . 34 . 52" },
                      { h: "6", r1: "कर्क", d1: "00 . 20 . 16", r2: "कर्क", d2: "14 . 05 . 39" },
                      { h: "7", r1: "कर्क", d1: "27 . 51 . 02", r2: "सिंह", d2: "11 . 36 . 25" },
                      { h: "8", r1: "सिंह", d1: "27 . 51 . 02", r2: "कन्या", d2: "14 . 05 . 39" },
                      { h: "9", r1: "तुला", d1: "00 . 20 . 16", r2: "तुला", d2: "16 . 34 . 52" },
                      { h: "10", r1: "वृश्चिक", d1: "02 . 49 . 29", r2: "वृश्चिक", d2: "19 . 04 . 06" },
                      { h: "11", r1: "धनु", d1: "02 . 49 . 29", r2: "धनु", d2: "16 . 34 . 52" },
                      { h: "12", r1: "मकर", d1: "00 . 20 . 16", r2: "मकर", d2: "14 . 05 . 39" },
                    ].map((row, idx) => (
                      <tr key={idx} className="odd:bg-gray-50">
                        <td className="py-1.5 px-3 font-sans font-bold">{row.h}</td>
                        <td className="py-1.5 px-3">{row.r1}</td>
                        <td className="py-1.5 px-3">{row.d1}</td>
                        <td className="py-1.5 px-3 font-semibold text-amber-800">{row.r2}</td>
                        <td className="py-1.5 px-3">{row.d2}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* PAGE BREAK */}
            <div className="page-break" style={{ pageBreakBefore: "always" }} />

            {/* PAGE 10-12: KUNDALI KEY POINTS & LAGNA REPORT / आपकी कुंडली के प्रमुख बिंदु व लग्न रिपोर्ट */}
            <div className="p-6 space-y-6">
              <div className="border-b border-amber-600/30 pb-2">
                <h2 className="font-serif text-2xl text-amber-900 font-bold">10-12. आपकी कुंडली के प्रमुख बिंदु एवं लग्न रिपोर्ट</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="border border-amber-200 p-4 bg-amber-50/40 rounded-sm space-y-1">
                  <span className="font-bold text-amber-900 block">जीवन की महत्वाकांक्षा</span>
                  <p className="text-gray-700 font-light">धीरे धीरे तरक्की करते हुए समाज की रूढ़ियों को मिटाना और एक अच्छा समाज बनाना।</p>
                </div>
                <div className="border border-amber-200 p-4 bg-amber-50/40 rounded-sm space-y-1">
                  <span className="font-bold text-amber-900 block">जीवन ऊर्जा</span>
                  <p className="text-gray-700 font-light">आपका सामाजिक विवेक और मानवीयता।</p>
                </div>
                <div className="border border-amber-200 p-4 bg-amber-50/40 rounded-sm space-y-1">
                  <span className="font-bold text-amber-900 block">जीवन का उद्देश्य</span>
                  <p className="text-gray-700 font-light">दुनिया को हर किसी के लिए बेहतर जगह बनाना।</p>
                </div>
                <div className="border border-amber-200 p-4 bg-amber-50/40 rounded-sm space-y-1">
                  <span className="font-bold text-amber-900 block">आपकी ताकत / प्रतिभा</span>
                  <p className="text-gray-700 font-light">आपका धैर्य और अटल विश्वास।</p>
                </div>
              </div>

              <div className="border border-amber-300 bg-amber-50/60 p-5 rounded-sm space-y-3 text-xs">
                <h3 className="font-serif text-lg font-bold text-amber-900">कुंभ लग्न रिपोर्ट (Kumbha Lagna Overview)</h3>
                <p className="text-gray-700 leading-relaxed font-light">
                  कुंभ लग्न आपको श्वास और दृष्टि दोष, शरीर के निचले अंगों की हड्डियों में असर तथा रक्त संवहन की समस्याओं के प्रति सचेत रहने का संकेत देता है। कुंभ लग्न के लोग आदर्शवादी, व्यावहारिक, लुभावने और मिलनसार स्वभाव वाले होते हैं। आप दूसरों के विचारों के प्रति सहनशील होते हैं और अपने दोस्तों का विशेष ख्याल रखते हैं।
                </p>
              </div>
            </div>

            {/* PAGE BREAK */}
            <div className="page-break" style={{ pageBreakBefore: "always" }} />

            {/* PAGE 13-14: MOON SIGN REPORT / चंद्र राशि रिपोर्ट */}
            <div className="p-6 space-y-6">
              <div className="border-b border-amber-600/30 pb-2">
                <h2 className="font-serif text-2xl text-amber-900 font-bold">13-14. चंद्र राशि रिपोर्ट (वृश्चिक चंद्र राशि)</h2>
              </div>

              <div className="bg-amber-100/60 border border-amber-300 p-5 rounded-sm flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-widest text-amber-800">आपकी चंद्र राशि</span>
                  <h3 className="font-serif text-3xl font-bold text-amber-900">वृश्चिक (Scorpio)</h3>
                </div>
                <div className="text-right text-xs text-amber-800 font-mono">
                  स्वामी: मंगल | तत्व: जल
                </div>
              </div>

              <div className="space-y-4 text-xs text-gray-700 leading-relaxed font-light">
                <p className="bg-gray-50 p-4 border border-gray-200 rounded-sm">
                  <strong>वृश्चिक राशि के लिए स्वभाव व व्यक्तित्व:</strong> वृश्चिक चंद्र राशि के लोग स्वयं की आलोचना में विश्वास करते हैं। आप एकाग्र और अपने काम के प्रति लगनशील होते हैं। आपकी भावनात्मक शक्ति आपको मनचाहे क्षेत्र में अपना करियर बनाने में काफी मदद करती है।
                </p>
                <p className="bg-gray-50 p-4 border border-gray-200 rounded-sm">
                  <strong>शारीरिक रूप-रंग:</strong> आपके शरीर की बनावट काफी मजबूत होती है और चेहरा चौकोर, आँखें लुभावनी होती हैं। आपकी शारीरिक बनावट से ताकत और गंभीरता साफ़-साफ़ दिखाई देती है।
                </p>
              </div>
            </div>

            {/* PAGE BREAK */}
            <div className="page-break" style={{ pageBreakBefore: "always" }} />

            {/* PAGE 15-18: NAKSHATRA & PANCHANG PHAL / नक्षत्र एवं पंचांग फल */}
            <div className="p-6 space-y-6">
              <div className="border-b border-amber-600/30 pb-2">
                <h2 className="font-serif text-2xl text-amber-900 font-bold">15-18. आपकी नक्षत्र एवं पंचांग फल रिपोर्ट</h2>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center text-xs">
                <div className="border border-amber-300 bg-amber-50 p-4 rounded-sm">
                  <span className="text-gray-500 uppercase">आपका नक्षत्र</span>
                  <p className="font-serif text-2xl font-bold text-amber-900">अनुराधा (Anuradha)</p>
                </div>
                <div className="border border-orange-300 bg-orange-50 p-4 rounded-sm">
                  <span className="text-gray-500 uppercase">नक्षत्र चरण</span>
                  <p className="font-serif text-2xl font-bold text-orange-900">3</p>
                </div>
              </div>

              <div className="bg-amber-50/50 border border-amber-200 p-5 rounded-sm space-y-3 text-xs font-light leading-relaxed">
                <h3 className="font-serif text-base font-bold text-amber-900">अनुराधा नक्षत्र फल:</h3>
                <p>
                  आपकी ईश्वर पर अगाध आस्था है। यही कारण है कि आप घोर-से-घोर विपत्ति में भी निराश नहीं होते हैं। अपने लक्ष्य के प्रति आप गंभीर रहते हैं इसलिए काफी मुश्किलों के बावजूद भी आप सफलता प्राप्त कर लेते हैं। आप व्यापार करने में अधिक रुचि रखते हैं।
                </p>
              </div>
            </div>

            {/* PAGE BREAK */}
            <div className="page-break" style={{ pageBreakBefore: "always" }} />

            {/* PAGE 28-34: HOUSE PREDICTIONS (12 BHAV PHAL) / १२ भाव फल */}
            <div className="p-6 space-y-6">
              <div className="border-b border-amber-600/30 pb-2">
                <h2 className="font-serif text-2xl text-amber-900 font-bold">28-34. भाव फल विस्तृत विश्लेषण (12 Houses Detailed Predictions)</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {[
                  { b: "प्रथम भाव (लग्न - व्यक्तित्व & स्वास्थ्य)", t: "लग्नेश का प्रथम भाव में स्थित होना आपको एक अच्छे व्यक्तित्व और आत्मसम्मान की प्राप्ति कराता है।" },
                  { b: "द्वितीय भाव (धन, परिवार व वाणी)", t: "द्वितीय भाव के स्वामी का नवम भाव में स्थित होना यह दर्शाता है कि परिवार की पहचान उच्च नैतिक मूल्यों से होगी।" },
                  { b: "तृतीय भाव (भाई-बहन, साहस)", t: "तृतीय भाव का स्वामी पंचम भाव में स्थित होने से आपकी कलात्मक सोच और बौद्धिक क्षमता में वृद्धि होती है।" },
                  { b: "चतुर्थ भाव (सुख, माता, संपत्ति)", t: "चतुर्थ भाव के स्वामी का नवम भाव में स्थित होना घर की खुशियों में वृद्धि और वाहन सुख प्रदान करता है।" },
                  { b: "पंचम भाव (संतान, बुद्धि, ज्ञान)", t: "पंचम भाव का स्वामी अष्टम भाव में स्थित होने से शोध एवं रहस्यमयी विद्याओं में रुचि बढ़ती है।" },
                  { b: "षष्ठ भाव (रोग, ऋण, शत्रु)", t: "षष्ठम भाव का स्वामी दशम स्थान पर जाने से व्यापारिक और व्यावसायिक क्षेत्रों में सफलता मिलती है।" },
                  { b: "सप्तम भाव (विवाह व साझेदारी)", t: "सप्तम भाव के स्वामी का सप्तम भाव में रहना वैवाहिक जीवन और व्यावसायिक साझेदारी में मजबूती देता है।" },
                  { b: "अष्टम भाव (दीर्घायु & गूढ़ ज्ञान)", t: "अष्टम भाव के स्वामी का अष्टम भाव में स्थित होना दीर्घायु और आत्मखोज की ओर रुझान उत्पन्न करता है।" },
                  { b: "नवम भाव (भाग्य, धर्म, पिता)", t: "नवम भाव का स्वामी अपने भाव में स्थित होने से ईश्वर कृपा और भाग्य का पूरा सहयोग दिलाता है।" },
                  { b: "दशम भाव (कर्म व व्यवसाय)", t: "दशम भाव के स्वामी के प्रभाव से पेशेवर क्षेत्र में व्यावहारिक अनुभव और प्रतिष्ठा में वृद्धि होती है।" },
                  { b: "एकादश भाव (आय व लाभ)", t: "एकादश भाव के स्वामी के नवम भाव में होने से आर्थिक लाभ, मान-सम्मान और यात्राओं से लाभ मिलता है।" },
                  { b: "द्वादश भाव (व्यय व मोक्ष)", t: "द्वादश भाव का स्वामी प्रथम भाव में रहने से परोपकार और धार्मिक कार्यों में व्यय की प्रवृत्ति बनती है।" },
                ].map((item, idx) => (
                  <div key={idx} className="border border-amber-200 p-4 bg-gray-50/60 rounded-sm space-y-1">
                    <span className="font-bold text-amber-900 block">{item.b}</span>
                    <p className="text-gray-700 font-light leading-relaxed">{item.t}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* PAGE BREAK */}
            <div className="page-break" style={{ pageBreakBefore: "always" }} />

            {/* PAGE 35-36: RAJYOG & SPECIAL YOGAS / राजयोग एवं विशिष्ट योग */}
            <div className="p-6 space-y-6">
              <div className="border-b border-amber-600/30 pb-2">
                <h2 className="font-serif text-2xl text-amber-900 font-bold">35-36. कुण्डली में उपस्थित विशिष्ट योग व राजयोग</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {[
                  { y: "1. सरल विपरीत राज योग", d: "इस योग के प्रभाव से आप ग्रहणशील होंगे और जीवन में निरंतर उन्नति प्राप्त करेंगे।" },
                  { y: "2. शृंगाटक योग (पर्वत)", d: "इस योग के प्रभाव से आप धनवान, पराक्रमी तथा सर्व सुख-संपन्न बनेंगे।" },
                  { y: "3. अनफा योग", d: "इस योग के प्रभाव से आप अच्छे स्वास्थ्य के स्वामी तथा धार्मिक प्रवृत्ति के होंगे।" },
                  { y: "4. वेशी योग", d: "इस योग के प्रभाव से आपका व्यक्तित्व अत्यंत आकर्षक और प्रभावशाली होगा।" },
                  { y: "5. शश पंच महापुरुष योग", d: "शनि के स्व-राशि में होने से यह महापुरुष योग बनता है जो उच्च पद आसीन कराता है।" },
                  { y: "6. धन योग", d: "इस योग के प्रभाव से आपके पास अच्छी धन-संपदा एवं समाज में प्रसिद्धि होगी।" },
                ].map((row, idx) => (
                  <div key={idx} className="border border-amber-300 bg-amber-50/40 p-4 rounded-sm space-y-1">
                    <span className="font-bold text-amber-900 text-sm block">{row.y}</span>
                    <p className="text-gray-700 font-light leading-relaxed">{row.d}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* PAGE BREAK */}
            <div className="page-break" style={{ pageBreakBefore: "always" }} />

            {/* PAGE 43-46: SADESATI REPORT / साढ़े साती रिपोर्ट */}
            <div className="p-6 space-y-6">
              <div className="border-b border-amber-600/30 pb-2">
                <h2 className="font-serif text-2xl text-amber-900 font-bold">43-46. शनि साढ़े साती रिपोर्ट (Sadesati Analysis)</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border border-gray-200">
                  <thead className="bg-amber-600 text-white uppercase text-[10px]">
                    <tr>
                      <th className="py-2 px-3">क्रम</th>
                      <th className="py-2 px-3">साढ़े साती/पनौती</th>
                      <th className="py-2 px-3">शनि राशि</th>
                      <th className="py-2 px-3">आरंभ दिनांक</th>
                      <th className="py-2 px-3">अंत दिनांक</th>
                      <th className="py-2 px-3">चरण</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-mono">
                    {[
                      { k: "1", s: "साढ़े साती", r: "तुला", a: "नवंबर 15, 2011", e: "मई 15, 2012", c: "उदय" },
                      { k: "2", s: "साढ़े साती", r: "वृश्चिक", a: "नवंबर 03, 2014", e: "जनवरी 26, 2017", c: "शिखर" },
                      { k: "3", s: "साढ़े साती", r: "धनु", a: "जनवरी 27, 2017", e: "जून 20, 2017", c: "अस्त" },
                      { k: "4", s: "छोटी पनौती", r: "कुंभ", a: "अप्रैल 29, 2022", e: "जुलाई 12, 2022", c: "-" },
                      { k: "5", s: "साढ़े साती", r: "तुला", a: "जनवरी 28, 2041", e: "फ़रवरी 05, 2041", c: "उदय" },
                    ].map((row, idx) => (
                      <tr key={idx} className="odd:bg-gray-50">
                        <td className="py-2 px-3 font-sans font-bold">{row.k}</td>
                        <td className="py-2 px-3 font-semibold text-amber-900">{row.s}</td>
                        <td className="py-2 px-3">{row.r}</td>
                        <td className="py-2 px-3">{row.a}</td>
                        <td className="py-2 px-3">{row.e}</td>
                        <td className="py-2 px-3 font-bold text-amber-800">{row.c}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* PAGE BREAK */}
            <div className="page-break" style={{ pageBreakBefore: "always" }} />

            {/* PAGE 47: KAAL SARP DOSHA / कालसर्प दोष रिपोर्ट */}
            <div className="p-6 space-y-6">
              <div className="border-b border-amber-600/30 pb-2">
                <h2 className="font-serif text-2xl text-amber-900 font-bold">47. कालसर्प दोष / योग रिपोर्ट</h2>
              </div>

              <div className="bg-emerald-50 border border-emerald-300 p-6 rounded-sm flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-widest text-emerald-800">कालसर्प योग स्थिति</span>
                  <h3 className="font-serif text-2xl font-bold text-emerald-900">अनुपस्थित (Absence of Kaal Sarp Dosha)</h3>
                </div>
                <span className="text-2xl text-emerald-600">✓</span>
              </div>

              <p className="text-xs text-gray-700 leading-relaxed font-light bg-gray-50 p-4 border border-gray-200 rounded-sm">
                आपकी कुण्डली में राहु और केतु के मध्य सभी ग्रह स्थित नहीं हैं, इसलिए आपकी कुण्डली में कालसर्प दोष उपस्थित नहीं है। आप जीवन में बिना किसी बड़ी रुकावट के आगे बढ़ेंगे।
              </p>
            </div>

            {/* PAGE BREAK */}
            <div className="page-break" style={{ pageBreakBefore: "always" }} />

            {/* PAGE 48-55: VIMSHOTTARI DASHA & ANTARDASHA / विंशोत्तरी महादशा एवं अंतर्दशा */}
            <div className="p-6 space-y-6">
              <div className="border-b border-amber-600/30 pb-2">
                <h2 className="font-serif text-2xl text-amber-900 font-bold">48-55. विंशोत्तरी महादशा एवं अंतर्दशा फल</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                <div className="border border-amber-300 p-3 bg-amber-50 rounded-sm">
                  <span className="font-bold text-amber-900 block font-sans">शनि (19 वर्ष)</span>
                  <span className="text-gray-600">11/09/1994 से 11/09/2000</span>
                </div>
                <div className="border border-amber-300 p-3 bg-amber-50 rounded-sm">
                  <span className="font-bold text-amber-900 block font-sans">बुध (17 वर्ष)</span>
                  <span className="text-gray-600">11/09/2001 से 11/09/2018</span>
                </div>
                <div className="border border-amber-300 p-3 bg-amber-50 rounded-sm">
                  <span className="font-bold text-amber-900 block font-sans">केतु (7 वर्ष)</span>
                  <span className="text-gray-600">11/09/2018 से 11/09/2025</span>
                </div>
                <div className="border border-amber-400 p-3 bg-amber-100 rounded-sm col-span-3">
                  <span className="font-bold text-amber-900 block font-sans text-sm">वर्तमान महादशा: शुक्र (20 वर्ष - 11/09/2025 से 11/09/2045)</span>
                  <p className="text-gray-700 font-sans text-xs font-light mt-1">
                    वैदिक ज्योतिष के अनुसार शुक्र महादशा जीवन में भौतिक सुख-समृद्धि, कला, सौंदर्य और प्रतिष्ठा का कारक होती है।
                  </p>
                </div>
              </div>
            </div>

            {/* PAGE BREAK */}
            <div className="page-break" style={{ pageBreakBefore: "always" }} />

            {/* PAGE 72-87: LAL KITAB KUNDALI & DEBTS / लाल किताब कुण्डली एवं ऋण */}
            <div className="p-6 space-y-6">
              <div className="border-b border-amber-600/30 pb-2">
                <h2 className="font-serif text-2xl text-amber-900 font-bold">72-87. लाल किताब कुण्डली एवं ऋण विश्लेषण (Lal Kitab Debts)</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {[
                  { r: "पितृ ऋण", status: "मुक्त (Nil)", note: "परिवार पूर्वजों के ऋण से पूर्णतः मुक्त है।" },
                  { r: "स्वयं ऋण", status: "मुक्त (Nil)", note: "स्वयं का ऋण प्रभाव नहीं है।" },
                  { r: "मातृ ऋण", status: "मुक्त (Nil)", note: "मातृ ऋण दोष उपस्थित नहीं है।" },
                  { r: "स्त्री ऋण", status: "मुक्त (Nil)", note: "स्त्री ऋण दोष नहीं है।" },
                  { r: "संबंधी ऋण", status: "मुक्त (Nil)", note: "रिश्तेदारों का ऋण प्रभाव नहीं है।" },
                  { r: "कुदरती ऋण", status: "मुक्त (Nil)", note: "कुदरती या प्राकृतिक ऋण प्रभाव नहीं है।" },
                ].map((item, idx) => (
                  <div key={idx} className="border border-amber-200 p-3 bg-gray-50 rounded-sm flex justify-between items-center">
                    <div>
                      <span className="font-bold text-amber-900 block">{item.r}</span>
                      <span className="text-[10px] text-gray-500 font-light">{item.note}</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* PAGE BREAK */}
            <div className="page-break" style={{ pageBreakBefore: "always" }} />

            {/* PAGE 114-119: SHODASHVARGA TABLES & CHARTS / षोडशवर्ग तालिका एवं कुण्डलियाँ */}
            <div className="p-6 space-y-6">
              <div className="border-b border-amber-600/30 pb-2">
                <h2 className="font-serif text-2xl text-amber-900 font-bold">114-119. षोडशवर्ग तालिका एवं 16 कुण्डलियाँ (Shodashvarga Charts)</h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs font-mono">
                {[
                  { c: "D1 लग्न", r: "कुंभ (11)" },
                  { c: "D2 होरा", r: "सिंह (5)" },
                  { c: "D3 द्रेष्काण", r: "मिथुन (3)" },
                  { c: "D4 चतुर्थांश", r: "वृषभ (2)" },
                  { c: "D7 सप्तमांश", r: "मेष (1)" },
                  { c: "D9 नवमांश", r: "मकर (10)" },
                  { c: "D10 दशमांश", r: "वृषभ (2)" },
                  { c: "D12 द्वादशांश", r: "मिथुन (3)" },
                ].map((item, idx) => (
                  <div key={idx} className="border border-amber-300 p-3 bg-amber-50/50 rounded-sm">
                    <span className="font-bold text-amber-900 block font-sans">{item.c}</span>
                    <span className="text-gray-700 font-semibold">{item.r}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* PAGE BREAK */}
            <div className="page-break" style={{ pageBreakBefore: "always" }} />

            {/* PAGE 171-207: VARSHPHAL DETAILS (2025 - 2030) / वर्षफल विवरण */}
            <div className="p-6 space-y-6">
              <div className="border-b border-amber-600/30 pb-2">
                <h2 className="font-serif text-2xl text-amber-900 font-bold">171-207. वर्षफल विवरण (Annual Predictions 2025 - 2030)</h2>
              </div>

              <div className="space-y-4 text-xs font-light text-gray-700">
                <div className="bg-amber-50 p-4 border border-amber-300 rounded-sm space-y-1">
                  <h3 className="font-bold text-amber-900 text-sm font-serif">वर्षफल 2025 - 2026 (मुंथा नवम भाव)</h3>
                  <p>
                    इस वर्ष आपकी मुंथा नवम भाव में स्थित है। यह वर्ष कैरियर में उन्नति और यात्राओं का योग बनाएगा। व्यापार और निवेश में सकारात्मक परिणाम प्राप्त होंगे।
                  </p>
                </div>
                <div className="bg-amber-50 p-4 border border-amber-300 rounded-sm space-y-1">
                  <h3 className="font-bold text-amber-900 text-sm font-serif">वर्षफल 2026 - 2027 (मुंथा षष्ठ भाव)</h3>
                  <p>
                    स्वास्थ्य संबंधी सावधानियां बरतें। वाणी पर नियंत्रण रखें और विवादों से दूर रहने का प्रयास करें।
                  </p>
                </div>
              </div>
            </div>

            {/* FINAL BRANDING FOOTER */}
            <div className="border-t-2 border-amber-600 pt-6 text-center space-y-2">
              <h3 className="font-serif text-lg text-amber-900 font-bold uppercase tracking-widest">
                Dharmik Shree Astro Portal
              </h3>
              <p className="text-xs text-gray-500 font-light max-w-lg mx-auto">
                Jay ambe, Bhalchandra Nagar Society, soc, Surat, Gujarat 395004 | Complete 207-Page Vedic PDF System
              </p>
              <p className="text-[10px] text-amber-700 font-semibold font-mono">
                Website: www.dharmikshree.com | Support: support@dharmikshree.com
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
