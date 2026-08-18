"use client";

import React, { useState } from "react";
import { Sparkles, User, Calendar, Clock, MapPin, Globe, ShieldCheck, Download, ExternalLink, RefreshCw, AlertCircle, CheckCircle2, FileText } from "lucide-react";

export interface KundaliFormValues {
  fullName: string;
  gender: "male" | "female";
  day: string;
  month: string;
  year: string;
  hour: string;
  minute: string;
  amPm: "AM" | "PM";
  birthPlace: string;
  language: "hi" | "en";
}

export default function KundaliForm() {
  const [formData, setFormData] = useState<KundaliFormValues>({
    fullName: "",
    gender: "male",
    day: "20",
    month: "10",
    year: "1995",
    hour: "02",
    minute: "30",
    amPm: "PM",
    birthPlace: "Sanosara, Gujarat, India",
    language: "hi",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pdfResult, setPdfResult] = useState<{
    pdfUrl: string;
    dbRecordId?: string;
    name: string;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage(null);
  };

  const validateForm = (): boolean => {
    if (!formData.fullName.trim()) {
      setErrorMessage("कृपया अपना नाम दर्ज करें (Please enter full name).");
      return false;
    }
    if (!formData.birthPlace.trim()) {
      setErrorMessage("कृपया अपना जन्म स्थान दर्ज करें (Please enter birth place).");
      return false;
    }
    const d = parseInt(formData.day, 10);
    const m = parseInt(formData.month, 10);
    const y = parseInt(formData.year, 10);
    if (isNaN(d) || d < 1 || d > 31 || isNaN(m) || m < 1 || m > 12 || isNaN(y) || y < 1900 || y > 2100) {
      setErrorMessage("कृपया सही जन्म तिथि दर्ज करें (Please select a valid date of birth).");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      let hr = parseInt(formData.hour || "12", 10);
      if (formData.amPm === "PM" && hr < 12) hr += 12;
      if (formData.amPm === "AM" && hr === 12) hr = 0;

      const res = await fetch("/api/kundali/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName.trim(),
          gender: formData.gender,
          day: parseInt(formData.day, 10),
          month: parseInt(formData.month, 10),
          year: parseInt(formData.year, 10),
          hour: hr,
          minute: parseInt(formData.minute, 10),
          place: formData.birthPlace.trim(),
          language: formData.language,
        }),
      });

      const json = await res.json();

      if (res.ok && json.status === "success" && json.pdfUrl) {
        setPdfResult({
          pdfUrl: json.pdfUrl,
          dbRecordId: json.dbRecordId,
          name: formData.fullName.trim(),
        });
      } else {
        setErrorMessage(json.message || json.error || "कुण्डली रिपोर्ट तैयार करने में विफलता हुई। कृपया पुनः प्रयास करें।");
      }
    } catch (err: any) {
      console.error("Error submitting Kundali form:", err);
      setErrorMessage(err.message || "नेटवर्क त्रुटि। कृपया पुनः प्रयास करें।");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setPdfResult(null);
    setErrorMessage(null);
  };

  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="border-b border-amber-500/20 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-amber-400 font-semibold block mb-1">
            Official Vedic Horoscope PDF Service
          </span>
          <h1 className="font-serif text-3xl md:text-4xl font-light text-amber-100">
            धार्मिकश्री वैदिक कुण्डली रिपोर्ट (Basic Horoscope PDF)
          </h1>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/30 py-2 px-4 rounded text-xs text-amber-400 flex items-center gap-2">
          <ShieldCheck size={16} /> Authentic Astrology API Engine
        </div>
      </div>

      {/* ERROR ALERT */}
      {errorMessage && (
        <div className="bg-red-950/60 border border-red-500/50 p-4 rounded-lg flex items-start gap-3 text-red-200 text-sm shadow-xl">
          <AlertCircle size={20} className="text-red-400 shrink-0 mt-0.5" />
          <div className="flex-1">{errorMessage}</div>
        </div>
      )}

      {/* FORM INPUT SECTION */}
      {!pdfResult ? (
        <form onSubmit={handleSubmit} className="bg-stone-900/80 border border-amber-500/30 p-8 rounded-lg space-y-8 shadow-2xl">
          <div className="space-y-2 border-b border-amber-500/20 pb-4">
            <h3 className="font-serif text-xl text-amber-300 flex items-center gap-2">
              <User size={18} /> जन्म विवरण (Personal Birth Details)
            </h3>
            <p className="text-xs text-amber-100/60">
              सटीक वैदिक कुंडली एवं रिपोर्ट तैयार करने के लिए अपना पूर्ण नाम, समय, स्थान व भाषा चुनें।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-widest text-amber-200/80 font-medium">
                पूरा नाम (Full Name) *
              </label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="उदा. Mahendra Sankhavara"
                className="w-full bg-black/60 border border-amber-500/30 rounded py-3 px-4 text-sm text-amber-100 focus:border-amber-400 outline-none transition-all"
              />
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-widest text-amber-200/80 font-medium">
                लिंग (Gender) *
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full bg-black/60 border border-amber-500/30 rounded py-3 px-4 text-sm text-amber-100 focus:border-amber-400 outline-none"
              >
                <option value="male">पुरुष (Male)</option>
                <option value="female">स्त्री (Female)</option>
              </select>
            </div>

            {/* Date of Birth */}
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-widest text-amber-200/80 font-medium flex items-center gap-1">
                <Calendar size={14} /> जन्म तिथि (Date of Birth) *
              </label>
              <div className="grid grid-cols-3 gap-2">
                <select
                  name="day"
                  value={formData.day}
                  onChange={handleChange}
                  className="bg-black/60 border border-amber-500/30 rounded py-3 px-2 text-sm text-amber-100 outline-none"
                >
                  {Array.from({ length: 31 }, (_, i) => (
                    <option key={i + 1} value={(i + 1).toString()}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                <select
                  name="month"
                  value={formData.month}
                  onChange={handleChange}
                  className="bg-black/60 border border-amber-500/30 rounded py-3 px-2 text-sm text-amber-100 outline-none"
                >
                  {[
                    "1 (जनवरी)",
                    "2 (फ़रवरी)",
                    "3 (मार्च)",
                    "4 (अप्रैल)",
                    "5 (मई)",
                    "6 (जून)",
                    "7 (जुलाई)",
                    "8 (अगस्त)",
                    "9 (सितंबर)",
                    "10 (अक्टूबर)",
                    "11 (नवंबर)",
                    "12 (दिसंबर)",
                  ].map((m, idx) => (
                    <option key={idx + 1} value={(idx + 1).toString()}>
                      {m}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  name="year"
                  required
                  value={formData.year}
                  onChange={handleChange}
                  placeholder="YYYY"
                  className="bg-black/60 border border-amber-500/30 rounded py-3 px-3 text-sm text-amber-100 outline-none"
                />
              </div>
            </div>

            {/* Time of Birth */}
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-widest text-amber-200/80 font-medium flex items-center gap-1">
                <Clock size={14} /> जन्म समय (Time of Birth) *
              </label>
              <div className="grid grid-cols-3 gap-2">
                <select
                  name="hour"
                  value={formData.hour}
                  onChange={handleChange}
                  className="bg-black/60 border border-amber-500/30 rounded py-3 px-2 text-sm text-amber-100 outline-none"
                >
                  {Array.from({ length: 12 }, (_, i) => {
                    const h = (i + 1).toString().padStart(2, "0");
                    return (
                      <option key={h} value={h}>
                        {h}
                      </option>
                    );
                  })}
                </select>
                <select
                  name="minute"
                  value={formData.minute}
                  onChange={handleChange}
                  className="bg-black/60 border border-amber-500/30 rounded py-3 px-2 text-sm text-amber-100 outline-none"
                >
                  {Array.from({ length: 60 }, (_, i) => {
                    const m = i.toString().padStart(2, "0");
                    return (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    );
                  })}
                </select>
                <select
                  name="amPm"
                  value={formData.amPm}
                  onChange={handleChange}
                  className="bg-black/60 border border-amber-500/30 rounded py-3 px-2 text-sm text-amber-100 outline-none"
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>

            {/* Birth Place and Country */}
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-widest text-amber-200/80 font-medium flex items-center gap-1">
                <MapPin size={14} /> जन्म स्थान व देश (Birth Place & Country) *
              </label>
              <input
                type="text"
                name="birthPlace"
                required
                value={formData.birthPlace}
                onChange={handleChange}
                placeholder="उदा. Sanosara, Gujarat, India"
                className="w-full bg-black/60 border border-amber-500/30 rounded py-3 px-4 text-sm text-amber-100 focus:border-amber-400 outline-none transition-all"
              />
            </div>

            {/* Report Language */}
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-widest text-amber-200/80 font-medium flex items-center gap-1">
                <Globe size={14} /> रिपोर्ट भाषा (Report Language) *
              </label>
              <select
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="w-full bg-black/60 border border-amber-500/30 rounded py-3 px-4 text-sm text-amber-100 focus:border-amber-400 outline-none"
              >
                <option value="hi">हिन्दी (Hindi)</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>

          {/* Submit Action Button */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-amber-500/20">
            <div className="text-xs text-amber-100/50 flex items-center gap-2">
              <Globe size={14} className="text-amber-400" /> Vedic Astrology Engine (Basic Horoscope Report)
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 px-8 py-4 font-bold uppercase tracking-widest text-xs rounded transition-all duration-300 flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
                  <span>रिपोर्ट जनरेट हो रही है...</span>
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  <span>कुण्डली रिपोर्ट तैयार करें (Generate PDF Report)</span>
                </>
              )}
            </button>
          </div>
        </form>
      ) : (
        /* PDF RESULT VIEWER & DOWNLOAD SECTION */
        <div className="space-y-6">
          {/* Header Action Bar */}
          <div className="bg-stone-900/90 border border-amber-500/40 p-6 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-500/20 text-emerald-400 p-2.5 rounded-full border border-emerald-500/40 shrink-0">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-amber-100 flex items-center gap-2">
                  <FileText size={18} className="text-amber-400" /> {pdfResult.name} की वैदिक कुण्डली तैयार है
                </h3>
                <p className="text-xs text-amber-100/60 mt-0.5">
                  Your Horoscope PDF has been successfully generated via Astrology API.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleReset}
                className="bg-stone-800 hover:bg-stone-700 text-amber-200 border border-amber-500/30 text-xs font-bold uppercase tracking-widest py-3 px-4 rounded flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <RefreshCw size={14} /> नई कुण्डली
              </button>

              <a
                href={pdfResult.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-stone-800 hover:bg-stone-700 text-amber-200 border border-amber-500/30 text-xs font-bold uppercase tracking-widest py-3 px-4 rounded flex items-center justify-center gap-2 transition-all"
              >
                <ExternalLink size={14} /> नई टैब में खोलें
              </a>

              <a
                href={pdfResult.pdfUrl}
                download={`${pdfResult.name.replace(/\s+/g, "_")}_Kundali_Report.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-widest py-3 px-6 rounded flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <Download size={16} /> डाउनलोड पीडीऍफ़ (Download PDF)
              </a>
            </div>
          </div>

          {/* Embedded PDF Viewer */}
          <div className="border border-amber-500/30 rounded-lg overflow-hidden h-[850px] shadow-2xl bg-white relative">
            <iframe
              src={pdfResult.pdfUrl}
              className="w-full h-full border-none"
              title={`${pdfResult.name} Kundali PDF Report`}
            />
          </div>
        </div>
      )}
    </div>
  );
}
