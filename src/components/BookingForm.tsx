"use client";

import React, { useState } from "react";
import { Sparkles, CheckCircle2, AlertCircle, ArrowRight, User, Phone, MapPin, Mail, Calendar, Clock, Compass, ShieldCheck } from "lucide-react";

export interface BookingFormProps {
  onSuccess?: (leadId: string) => void;
  defaultService?: string;
}

const RASHI_OPTIONS = [
  "Mesha (Aries)",
  "Vrishabha (Taurus)",
  "Mithuna (Gemini)",
  "Karka (Cancer)",
  "Simha (Leo)",
  "Kanya (Virgo)",
  "Tula (Libra)",
  "Vrishchika (Scorpio)",
  "Dhanu (Sagittarius)",
  "Makara (Capricorn)",
  "Kumbha (Aquarius)",
  "Meena (Pisces)",
];

const SERVICE_OPTIONS = [
  { key: "divine_consultation", label: "Divine Consultation (Horoscope & Face Reading)" },
  { key: "kundali_matching", label: "Kundali Matching & Gun Milan" },
  { key: "vastu_residential", label: "Residential Vastu Shastra Audit" },
  { key: "vastu_commercial", label: "Commercial Vastu Shastra Audit" },
  { key: "gemstone_consultation", label: "Gemstone Recommendation & Muhurat" },
  { key: "annual_horoscope", label: "Annual Varshphal & Dasha Analysis" },
  { key: "mahapuja_booking", label: "Special Puja & Vedic Anushthan" },
  { key: "numerology_report", label: "Name & Business Numerology" },
];

export default function BookingForm({ onSuccess, defaultService = "divine_consultation" }: BookingFormProps) {
  const [activeTab, setActiveTab] = useState<"basic" | "kundali">("basic");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    email: "",
    city: "",
    service_interest: defaultService,
    consultation_mode: "online",
    message: "",
    // Kundali Fields
    date_of_birth: "",
    time_of_birth: "",
    birth_place: "",
    gender: "male",
    relation: "self",
    marital_status: "single",
    gotra: "",
    rashi: "",
    occupation: "",
    // Bot Trap
    website_hp: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Name validation
    const trimmedName = formData.full_name.trim();
    if (!trimmedName || trimmedName.length < 2) {
      newErrors.full_name = "Please enter your full name (at least 2 letters)";
    } else if (!/^[a-zA-Z\s\.\'\-]+$/.test(trimmedName)) {
      newErrors.full_name = "Name should contain only letters and spaces";
    }

    // Phone validation (Indian 10-digit mobile check)
    let cleanedPhone = formData.phone.replace(/\D/g, "");
    if (cleanedPhone.length === 12 && cleanedPhone.startsWith("91")) {
      cleanedPhone = cleanedPhone.substring(2);
    }
    if (!cleanedPhone || cleanedPhone.length !== 10) {
      newErrors.phone = "Please enter a valid 10-digit mobile number";
    } else if (!/^[6-9]\d{9}$/.test(cleanedPhone)) {
      newErrors.phone = "Mobile number must start with 6, 7, 8, or 9";
    }

    // City validation
    if (!formData.city.trim() || formData.city.trim().length < 2) {
      newErrors.city = "Please enter your city/location";
    }

    // Email validation (optional but strict if entered)
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    // DOB validation (optional, cannot be future date)
    if (formData.date_of_birth) {
      const dobDate = new Date(formData.date_of_birth);
      if (dobDate > new Date()) {
        newErrors.date_of_birth = "Date of birth cannot be in the future";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Spam honeypot trap
    if (formData.website_hp) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const crmApiUrl = "/api/leads/public-enquiry";

      // Clean phone number format
      let formattedPhone = formData.phone.replace(/\D/g, "");
      if (formattedPhone.length === 10) {
        formattedPhone = "+91" + formattedPhone;
      }

      const payload = {
        full_name: formData.full_name.trim(),
        phone: formattedPhone,
        email: formData.email.trim() || null,
        city: formData.city.trim(),
        service_interest: formData.service_interest,
        consultation_mode: formData.consultation_mode,
        message: formData.message.trim() || null,
        date_of_birth: formData.date_of_birth || null,
        time_of_birth: formData.time_of_birth.trim() || null,
        birth_place: formData.birth_place.trim() || null,
        gender: formData.gender,
        relation: formData.relation,
        marital_status: formData.marital_status,
        gotra: formData.gotra.trim() || null,
        rashi: formData.rashi || null,
        occupation: formData.occupation.trim() || null,
        lead_source: "website",
      };

      const res = await fetch(crmApiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit enquiry");
      }

      setSubmittedLeadId(data.leadId || "CRM-SUCCESS");
      if (onSuccess && data.leadId) {
        onSuccess(data.leadId);
      }
    } catch (err: any) {
      setErrors({ form: err.message || "Failed to connect to booking server. Please try again or WhatsApp directly." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedServiceObj = SERVICE_OPTIONS.find((s) => s.key === formData.service_interest);

  if (submittedLeadId) {
    return (
      <div className="bg-brand-charcoal text-brand-ivory border border-brand-gold/30 rounded-sm p-8 sm:p-12 text-center space-y-6 shadow-2xl animate-fade-in max-w-2xl mx-auto">
        <div className="w-16 h-16 rounded-full bg-brand-gold/20 text-brand-gold border border-brand-gold/40 flex items-center justify-center mx-auto animate-bounce">
          <CheckCircle2 size={32} />
        </div>

        <div className="space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-medium block">
            Jay Shree Mahakal 🙏
          </span>
          <h3 className="font-serif text-2xl sm:text-4xl font-light text-brand-ivory tracking-wide">
            Session Booking Request Received
          </h3>
          <p className="text-brand-ivory/70 font-light text-sm max-w-md mx-auto leading-relaxed pt-1">
            Acharya Dharmikshree&apos;s team has logged your enquiry. We will contact you on WhatsApp (&nbsp;<span className="text-brand-gold font-medium">{formData.phone}</span>&nbsp;) within 24 hours to finalize your consultation time slot.
          </p>
        </div>

        <div className="bg-brand-ivory/5 border border-brand-gold/20 p-5 rounded-sm text-left max-w-md mx-auto text-xs space-y-2 font-light text-brand-ivory/80">
          <div className="flex justify-between border-b border-brand-gold/10 pb-2">
            <span className="text-brand-ivory/50">Selected Service:</span>
            <span className="font-medium text-brand-gold">{selectedServiceObj?.label}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-brand-ivory/50">Consultation Mode:</span>
            <span className="font-medium text-brand-ivory uppercase">{formData.consultation_mode === "offline" ? "Offline (In-Person)" : "Online (Zoom / Meet)"}</span>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => {
              setSubmittedLeadId(null);
              setFormData({
                full_name: "",
                phone: "",
                email: "",
                city: "",
                service_interest: "divine_consultation",
                consultation_mode: "online",
                message: "",
                date_of_birth: "",
                time_of_birth: "",
                birth_place: "",
                gender: "male",
                relation: "self",
                marital_status: "single",
                gotra: "",
                rashi: "",
                occupation: "",
                website_hp: "",
              });
            }}
            className="px-6 py-3 bg-brand-gold hover:bg-brand-gold-hover text-brand-charcoal text-xs uppercase tracking-widest font-semibold rounded-sm transition-all duration-300 shadow-md cursor-pointer"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-charcoal text-brand-ivory border border-brand-gold/30 rounded-sm p-6 sm:p-10 shadow-2xl relative overflow-hidden max-w-3xl mx-auto">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center space-y-3 mb-8 relative z-10">
        <span className="text-xs uppercase tracking-[0.3em] text-brand-gold font-medium block">
          Private Vedic Guidance
        </span>
        <h3 className="font-serif text-2xl sm:text-4xl font-light text-brand-ivory tracking-wide">
          Schedule Private Consultation
        </h3>
        <div className="w-12 h-px bg-brand-gold/60 mx-auto" />
      </div>

      {/* Mode Tabs */}
      <div className="flex border-b border-brand-gold/20 mb-8 relative z-10 text-xs">
        <button
          type="button"
          onClick={() => setActiveTab("basic")}
          className={`flex-1 py-3 font-medium uppercase tracking-widest transition-all duration-300 text-center ${
            activeTab === "basic"
              ? "text-brand-gold border-b-2 border-brand-gold font-bold bg-brand-gold/5"
              : "text-brand-ivory/60 hover:text-brand-ivory"
          }`}
        >
          1. Contact & Session Details *
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("kundali")}
          className={`flex-1 py-3 font-medium uppercase tracking-widest transition-all duration-300 text-center ${
            activeTab === "kundali"
              ? "text-brand-gold border-b-2 border-brand-gold font-bold bg-brand-gold/5"
              : "text-brand-ivory/60 hover:text-brand-ivory"
          }`}
        >
          2. Vedic Kundali Profile (Optional)
        </button>
      </div>

      {/* General Error Alert */}
      {errors.form && (
        <div className="mb-6 p-4 bg-red-950/40 border border-red-500/40 text-red-200 text-xs rounded-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <p>{errors.form}</p>
        </div>
      )}

      {/* Honeypot Field */}
      <input
        type="text"
        name="website_hp"
        value={formData.website_hp}
        onChange={(e) => setFormData({ ...formData, website_hp: e.target.value })}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        {activeTab === "basic" ? (
          <div className="space-y-5 animate-fade-in">
            {/* Service Interest */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-brand-gold mb-2 font-medium">
                Select Consultation Service *
              </label>
              <select
                value={formData.service_interest}
                onChange={(e) => setFormData({ ...formData, service_interest: e.target.value })}
                className="w-full bg-brand-charcoal/90 border border-brand-gold/30 focus:border-brand-gold px-4 py-3 text-sm text-brand-ivory outline-none rounded-sm transition-all duration-300 font-light"
              >
                {SERVICE_OPTIONS.map((s) => (
                  <option key={s.key} value={s.key} className="bg-brand-charcoal text-brand-ivory">
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Consultation Mode */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-brand-gold mb-2 font-medium">
                Preferred Mode *
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label
                  className={`p-3.5 border rounded-sm flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 text-xs uppercase tracking-wider font-medium ${
                    formData.consultation_mode === "online"
                      ? "border-brand-gold bg-brand-gold/10 text-brand-gold"
                      : "border-brand-gold/20 text-brand-ivory/60 hover:border-brand-gold/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="consultation_mode"
                    value="online"
                    checked={formData.consultation_mode === "online"}
                    onChange={(e) => setFormData({ ...formData, consultation_mode: e.target.value })}
                    className="sr-only"
                  />
                  Online (Zoom / Meet)
                </label>

                <label
                  className={`p-3.5 border rounded-sm flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 text-xs uppercase tracking-wider font-medium ${
                    formData.consultation_mode === "offline"
                      ? "border-brand-gold bg-brand-gold/10 text-brand-gold"
                      : "border-brand-gold/20 text-brand-ivory/60 hover:border-brand-gold/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="consultation_mode"
                    value="offline"
                    checked={formData.consultation_mode === "offline"}
                    onChange={(e) => setFormData({ ...formData, consultation_mode: e.target.value })}
                    className="sr-only"
                  />
                  Offline (In-Person)
                </label>
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Full Name */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-brand-gold mb-2 font-medium">
                  Full Name *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Patel"
                    value={formData.full_name}
                    onChange={(e) => {
                      setFormData({ ...formData, full_name: e.target.value });
                      if (errors.full_name) setErrors({ ...errors, full_name: "" });
                    }}
                    className={`w-full bg-brand-charcoal/90 border px-4 py-3 pl-10 text-sm text-brand-ivory outline-none rounded-sm transition-all duration-300 font-light ${
                      errors.full_name ? "border-red-500" : "border-brand-gold/30 focus:border-brand-gold"
                    }`}
                  />
                  <User className="w-4 h-4 text-brand-gold/50 absolute left-3 top-3.5" />
                </div>
                {errors.full_name && <p className="text-[11px] text-red-400 mt-1">{errors.full_name}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-brand-gold mb-2 font-medium">
                  Phone / WhatsApp Number *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 98765 43210"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (errors.phone) setErrors({ ...errors, phone: "" });
                    }}
                    className={`w-full bg-brand-charcoal/90 border px-4 py-3 pl-10 text-sm text-brand-ivory outline-none rounded-sm transition-all duration-300 font-light ${
                      errors.phone ? "border-red-500" : "border-brand-gold/30 focus:border-brand-gold"
                    }`}
                  />
                  <Phone className="w-4 h-4 text-brand-gold/50 absolute left-3 top-3.5" />
                </div>
                {errors.phone && <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>}
              </div>

              {/* City */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-brand-gold mb-2 font-medium">
                  City / Location *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Surat, Gujarat"
                    value={formData.city}
                    onChange={(e) => {
                      setFormData({ ...formData, city: e.target.value });
                      if (errors.city) setErrors({ ...errors, city: "" });
                    }}
                    className={`w-full bg-brand-charcoal/90 border px-4 py-3 pl-10 text-sm text-brand-ivory outline-none rounded-sm transition-all duration-300 font-light ${
                      errors.city ? "border-red-500" : "border-brand-gold/30 focus:border-brand-gold"
                    }`}
                  />
                  <MapPin className="w-4 h-4 text-brand-gold/50 absolute left-3 top-3.5" />
                </div>
                {errors.city && <p className="text-[11px] text-red-400 mt-1">{errors.city}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-brand-gold mb-2 font-medium">
                  Email Address (Optional)
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="ramesh@example.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: "" });
                    }}
                    className={`w-full bg-brand-charcoal/90 border px-4 py-3 pl-10 text-sm text-brand-ivory outline-none rounded-sm transition-all duration-300 font-light ${
                      errors.email ? "border-red-500" : "border-brand-gold/30 focus:border-brand-gold"
                    }`}
                  />
                  <Mail className="w-4 h-4 text-brand-gold/50 absolute left-3 top-3.5" />
                </div>
                {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* Special Request */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-brand-gold mb-2 font-medium">
                Specific Issue / Questions (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Briefly describe your career, family, business, or health guidance request..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-brand-charcoal/90 border border-brand-gold/30 focus:border-brand-gold px-4 py-3 text-sm text-brand-ivory outline-none rounded-sm transition-all duration-300 font-light resize-none"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-5 animate-fade-in">
            <p className="text-xs text-brand-ivory/70 italic border-b border-brand-gold/10 pb-3">
              Providing birth details enables Acharya Dharmikshree to pre-calculate your Vimshottari Dasha & Lagna chart before your consultation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-brand-gold mb-2 font-medium">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={formData.date_of_birth}
                  onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                  className="w-full bg-brand-charcoal/90 border border-brand-gold/30 focus:border-brand-gold px-4 py-2.5 text-sm text-brand-ivory outline-none rounded-sm font-light"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-brand-gold mb-2 font-medium">
                  Time of Birth
                </label>
                <input
                  type="text"
                  placeholder="e.g. 08:30 AM"
                  value={formData.time_of_birth}
                  onChange={(e) => setFormData({ ...formData, time_of_birth: e.target.value })}
                  className="w-full bg-brand-charcoal/90 border border-brand-gold/30 focus:border-brand-gold px-4 py-2.5 text-sm text-brand-ivory outline-none rounded-sm font-light"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-brand-gold mb-2 font-medium">
                  Place of Birth
                </label>
                <input
                  type="text"
                  placeholder="e.g. Surat"
                  value={formData.birth_place}
                  onChange={(e) => setFormData({ ...formData, birth_place: e.target.value })}
                  className="w-full bg-brand-charcoal/90 border border-brand-gold/30 focus:border-brand-gold px-4 py-2.5 text-sm text-brand-ivory outline-none rounded-sm font-light"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-brand-gold mb-2 font-medium">
                  Gender
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full bg-brand-charcoal/90 border border-brand-gold/30 focus:border-brand-gold px-4 py-2.5 text-sm text-brand-ivory outline-none rounded-sm font-light"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-brand-gold mb-2 font-medium">
                  Moon Rashi (If Known)
                </label>
                <select
                  value={formData.rashi}
                  onChange={(e) => setFormData({ ...formData, rashi: e.target.value })}
                  className="w-full bg-brand-charcoal/90 border border-brand-gold/30 focus:border-brand-gold px-4 py-2.5 text-sm text-brand-ivory outline-none rounded-sm font-light"
                >
                  <option value="">Select Rashi</option>
                  {RASHI_OPTIONS.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-brand-gold mb-2 font-medium">
                  Gotra (If Known)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Kashyap"
                  value={formData.gotra}
                  onChange={(e) => setFormData({ ...formData, gotra: e.target.value })}
                  className="w-full bg-brand-charcoal/90 border border-brand-gold/30 focus:border-brand-gold px-4 py-2.5 text-sm text-brand-ivory outline-none rounded-sm font-light"
                />
              </div>
            </div>
          </div>
        )}

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-brand-gold/20">
          {activeTab === "basic" ? (
            <button
              type="button"
              onClick={() => setActiveTab("kundali")}
              className="text-xs uppercase tracking-widest text-brand-gold hover:text-brand-ivory transition-colors duration-300 font-medium flex items-center gap-1.5"
            >
              Add Kundali Details &rarr;
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setActiveTab("basic")}
              className="text-xs uppercase tracking-widest text-brand-gold hover:text-brand-ivory transition-colors duration-300 font-medium"
            >
              &larr; Back to Contact Info
            </button>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-8 py-4 bg-brand-gold hover:bg-brand-gold-hover text-brand-charcoal font-semibold text-xs uppercase tracking-[0.2em] rounded-sm transition-all duration-300 shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" /> Submitting Request...
              </>
            ) : (
              <>
                Confirm Consultation Request <ArrowRight size={14} />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
