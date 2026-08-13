"use client";

import React, { useState } from "react";
import { Sparkles, User, Calendar, Clock, MapPin, Globe, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

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
  latitude: string;
  longitude: string;
  language: "hi" | "en";
}

export default function KundaliForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<KundaliFormValues>({
    fullName: "",
    gender: "male",
    day: "11",
    month: "9",
    year: "1994",
    hour: "06",
    minute: "05",
    amPm: "PM",
    birthPlace: "Mehsana, Gujarat, India",
    latitude: "23.588",
    longitude: "72.369",
    language: "hi",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let hr = parseInt(formData.hour || "12", 10);
      if (formData.amPm === "PM" && hr < 12) hr += 12;
      if (formData.amPm === "AM" && hr === 12) hr = 0;
      const formattedTime = `${hr.toString().padStart(2, "0")}:${formData.minute.padStart(2, "0")}:00`;
      const formattedDob = `${formData.year}-${formData.month.padStart(2, "0")}-${formData.day.padStart(2, "0")}`;

      const res = await fetch("/api/kundali/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName || "जातक",
          gender: formData.gender,
          dateOfBirth: formattedDob,
          timeOfBirth: formattedTime,
          birthPlace: formData.birthPlace,
          latitude: formData.latitude,
          longitude: formData.longitude,
          language: formData.language,
        }),
      });

      const json = await res.json();
      if (res.ok && json.status === "success") {
        // Trigger report generation job
        const reportRes = await fetch("/api/kundali/generate-report", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ canonicalData: json.data }),
        });
        const reportJson = await reportRes.json();
        if (reportJson.reportId) {
          router.push(`/tools/kundali/${reportJson.reportId}`);
        }
      }
    } catch (err) {
      console.error("Error submitting Kundali form:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="border-b border-amber-500/20 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-amber-400 font-semibold block mb-1">
            Official Vedic Astrology Module
          </span>
          <h1 className="font-serif text-3xl md:text-4xl font-light text-amber-100">
            धार्मिकश्री सम्पूर्ण प्रीमियम कुण्डली (200+ Page Report)
          </h1>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/30 py-2 px-4 rounded text-xs text-amber-400 flex items-center gap-2">
          <ShieldCheck size={16} /> 100% Certified Vedic Engine
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-stone-900/80 border border-amber-500/30 p-8 rounded-lg space-y-8 shadow-2xl">
        <div className="space-y-2 border-b border-amber-500/20 pb-4">
          <h3 className="font-serif text-xl text-amber-300 flex items-center gap-2">
            <User size={18} /> जन्म विवरण (Personal Birth Details)
          </h3>
          <p className="text-xs text-amber-100/60">
            सटीक कुंडली फलादेश एवं 200+ पृष्ठों की विस्तृत रिपोर्ट के लिए अपना पूर्ण जन्म समय एवं स्थान दर्ज करें।
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
              placeholder="उदा. Binju Jani"
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
                {["1 (जनवरी)", "2 (फ़रवरी)", "3 (मार्च)", "4 (अप्रैल)", "5 (मई)", "6 (जून)", "7 (जुलाई)", "8 (अगस्त)", "9 (सितंबर)", "10 (अक्टूबर)", "11 (नवंबर)", "12 (दिसंबर)"].map((m, idx) => (
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
                  return <option key={h} value={h}>{h}</option>;
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
                  return <option key={m} value={m}>{m}</option>;
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

          {/* Birth Place */}
          <div className="space-y-2 md:col-span-2">
            <label className="block text-xs uppercase tracking-widest text-amber-200/80 font-medium flex items-center gap-1">
              <MapPin size={14} /> जन्म स्थान (Place of Birth) *
            </label>
            <input
              type="text"
              name="birthPlace"
              required
              value={formData.birthPlace}
              onChange={handleChange}
              placeholder="शहर या गाँव का नाम दर्ज करें (उदा. Mehsana, Surat, Mumbai, Delhi)"
              className="w-full bg-black/60 border border-amber-500/30 rounded py-3 px-4 text-sm text-amber-100 focus:border-amber-400 outline-none transition-all"
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-amber-500/20">
          <div className="text-xs text-amber-100/50 flex items-center gap-2">
            <Globe size={14} className="text-amber-400" /> Lahiri Ayanamsha (षोडशवर्ग, विंशोत्तरी, लाल किताब व वर्षफल)
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 px-8 py-4 font-bold uppercase tracking-widest text-xs rounded transition-all duration-300 flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
                <span>गणना की जा रही है...</span>
              </>
            ) : (
              <>
                <Sparkles size={16} />
                <span>संपूर्ण 200+ पृष्ठों की कुंडली तैयार करें (Generate Full Report)</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
