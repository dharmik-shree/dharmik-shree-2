"use client";

import React, { useState } from "react";
import { Sparkles, User, Calendar, Clock, MapPin, Globe, ShieldCheck } from "lucide-react";

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
  latitude: string;
  longitude: string;
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
    latitude: "19.0760", // Mumbai Default
    longitude: "72.8777",
    language: "hindi",
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    const query = new URLSearchParams({
      fullName: formData.fullName,
      gender: formData.gender,
      day: formData.day,
      month: formData.month,
      year: formData.year,
      hour: formData.hour,
      minute: formData.minute,
      amPm: formData.amPm,
      birthPlace: formData.birthPlace,
      latitude: formData.latitude,
      longitude: formData.longitude,
    });

    window.location.href = `/tools/kundali-view?${query.toString()}`;
  };

  return (
    <div className="space-y-10">
      {/* Top Banner */}
      <div className="border-b border-brand-ivory/10 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-semibold block mb-1">
            Free Vedic Astro Tool
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-brand-ivory">
            मुफ्त धार्मिकश्री प्रीमियम कुंडली (Complete Premium Kundali PDF)
          </h2>
        </div>
        <div className="bg-brand-gold/10 border border-brand-gold/25 py-2 px-4 rounded-sm text-xs text-brand-gold flex items-center gap-2">
          <ShieldCheck size={16} /> 100% Verified Calculations
        </div>
      </div>

      {/* FORM SECTION */}
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

          {/* Birth Place Name */}
          <div className="space-y-2">
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

          {/* Latitude and Longitude */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-widest text-brand-ivory/70 font-medium">
                अक्षांश (Latitude)
              </label>
              <input
                type="text"
                name="latitude"
                value={formData.latitude}
                onChange={handleInputChange}
                placeholder="19.0760"
                className="w-full bg-brand-charcoal/80 border border-brand-gold/30 rounded-sm py-3 px-4 text-sm text-brand-ivory focus:border-brand-gold outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-widest text-brand-ivory/70 font-medium">
                रेखांश (Longitude)
              </label>
              <input
                type="text"
                name="longitude"
                value={formData.longitude}
                onChange={handleInputChange}
                placeholder="72.8777"
                className="w-full bg-brand-charcoal/80 border border-brand-gold/30 rounded-sm py-3 px-4 text-sm text-brand-ivory focus:border-brand-gold outline-none"
              />
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-brand-ivory/10">
          <div className="text-xs text-brand-ivory/50 font-light flex items-center gap-2">
            <Globe size={14} className="text-brand-gold" /> Lahiri Ayanamsha (षोडशवर्ग, विंशोत्तरी व योग)
          </div>

          <button
            type="submit"
            disabled={isGenerating}
            className="w-full sm:w-auto bg-brand-gold text-brand-charcoal px-8 py-4 font-semibold uppercase tracking-widest text-xs hover:bg-brand-gold-hover transition-all duration-300 rounded-sm flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-brand-charcoal border-t-transparent rounded-full animate-spin" />
                <span>धार्मिकश्री प्रीमियम कुंडली तैयार हो रही है...</span>
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
    </div>
  );
}
