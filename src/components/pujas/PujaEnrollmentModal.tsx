"use client";

import React, { useState } from "react";
import { ArrowLeft, CheckCircle2, Phone, Mail, User, MapPin, Sparkles, MessageCircle, AlertCircle, Plus, Trash2, X } from "lucide-react";
import { Puja, PujaPackage, PujaEnrollmentPayload } from "@/types/puja";

interface PujaEnrollmentModalProps {
  puja: Puja;
  selectedPackage: PujaPackage;
  isOpen: boolean;
  onClose: () => void;
  onBackToPackages?: () => void;
}

export default function PujaEnrollmentModal({
  puja,
  selectedPackage,
  isOpen,
  onClose,
  onBackToPackages,
}: PujaEnrollmentModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingResult, setBookingResult] = useState<{
    bookingNumber: string;
    enrollmentId: string;
  } | null>(null);

  // Form Fields
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [gotra, setGotra] = useState("");
  const [unknownGotra, setUnknownGotra] = useState(false);
  const [sankalpWish, setSankalpWish] = useState("");
  const [familyMembers, setFamilyMembers] = useState<string[]>([]);
  const [newMemberName, setNewMemberName] = useState("");

  // Prasad Delivery Address
  const [wantPrasad, setWantPrasad] = useState(true);
  const [houseStreet, setHouseStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleNextFromStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const cleanPhone = phone.replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      setErrorMsg("Please enter a valid 10-digit WhatsApp mobile number");
      return;
    }

    if (!fullName.trim() || fullName.trim().length < 2) {
      setErrorMsg("Please enter your full name (at least 2 characters)");
      return;
    }

    setStep(2);
  };

  const handleAddFamilyMember = () => {
    if (newMemberName.trim()) {
      setFamilyMembers([...familyMembers, newMemberName.trim()]);
      setNewMemberName("");
    }
  };

  const handleRemoveMember = (idx: number) => {
    setFamilyMembers(familyMembers.filter((_, i) => i !== idx));
  };

  const handleSubmitEnrollment = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsSubmitting(true);

    try {
      const payload: PujaEnrollmentPayload = {
        puja_id: puja.id,
        package_id: selectedPackage.id,
        package_name: selectedPackage.name,
        package_type: selectedPackage.package_type,
        package_price: selectedPackage.price,
        devotee_name: fullName.trim(),
        phone: phone.trim(),
        whatsapp: phone.trim(),
        email: email.trim() || undefined,
        gotra: unknownGotra ? "Kashyap" : (gotra.trim() || "Kashyap"),
        family_members: familyMembers.map((name) => ({ name })),
        sankalp_wish: sankalpWish.trim() || undefined,
        prasad_address: wantPrasad
          ? {
              house_street: houseStreet.trim(),
              city: city.trim(),
              state: state.trim(),
              pincode: pincode.trim(),
            }
          : undefined,
      };

      const res = await fetch("/api/pujas/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to record puja enrollment");
      }

      setBookingResult({
        bookingNumber: data.booking_number,
        enrollmentId: data.enrollment_id,
      });
      setStep(3); // Success Screen
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to complete enrollment. Please try again or WhatsApp us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const cleanPhoneForWhatsApp = phone.replace(/\D/g, "");
  const supportWaUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
    `नमस्ते Dharmikshree 🙏 I have registered for '${puja.title}' (Booking: ${bookingResult?.bookingNumber || "New"}). Please confirm my payment and Sankalp details.`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      {/* Dark backdrop */}
      <div
        className="fixed inset-0 bg-brand-charcoal/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl bg-white rounded-xl shadow-2xl overflow-hidden border border-brand-gold/30 z-10 my-auto flex flex-col max-h-[92vh]">
        {/* Header (with back button as in Screenshot 2) */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-20">
          <div className="flex items-center gap-3">
            {step === 1 && onBackToPackages && (
              <button
                type="button"
                onClick={onBackToPackages}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-700 transition-colors"
                title="Back to Packages"
              >
                <ArrowLeft size={18} />
              </button>
            )}
            {step === 2 && (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-700 transition-colors"
                title="Back to Basic Details"
              >
                <ArrowLeft size={18} />
              </button>
            )}

            <div>
              <h3 className="font-serif text-lg sm:text-xl text-gray-900 font-semibold tracking-wide">
                {step === 3 ? "Sankalp Registered" : "Fill your details for Puja"}
              </h3>
              <p className="text-xs text-brand-gold font-medium">
                {selectedPackage.name} • ₹{selectedPackage.price}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto">
          {errorMsg && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* STEP 1: Phone & Basic Details (exact match to user Screenshot 2) */}
          {step === 1 && (
            <form onSubmit={handleNextFromStep1} className="space-y-5 text-left">
              {/* WhatsApp Mobile Number */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">
                  Enter Your Whatsapp Mobile Number
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  Your Puja booking updates like Puja Photos, Videos and other details will be sent on WhatsApp on below number.
                </p>
                <div className="relative flex rounded-lg border border-gray-300 focus-within:border-[#E56910] focus-within:ring-1 focus-within:ring-[#E56910] overflow-hidden">
                  <div className="flex items-center gap-1 bg-gray-50 px-3 py-3 border-r border-gray-300 text-sm font-medium text-gray-700">
                    <span className="text-emerald-600 font-bold">💬</span>
                    <span>+91</span>
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter 10-digit number"
                    maxLength={10}
                    required
                    className="w-full px-3.5 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Devotee Full Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">
                  Enter Your Name
                </label>
                <div className="rounded-lg border border-gray-300 focus-within:border-[#E56910] focus-within:ring-1 focus-within:ring-[#E56910] overflow-hidden">
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your full Name"
                    required
                    className="w-full px-3.5 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Email Address (Optional) */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">
                  Email Address <span className="text-xs font-normal text-gray-500">(Optional)</span>
                </label>
                <div className="rounded-lg border border-gray-300 focus-within:border-[#E56910] focus-within:ring-1 focus-within:ring-[#E56910] overflow-hidden">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com (For calendar & receipt)"
                    className="w-full px-3.5 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Next Step Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#E56910] hover:bg-[#c95b0d] text-white font-semibold text-sm rounded-lg transition-all shadow-md cursor-pointer"
                >
                  Next Step: Sankalp Details
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Gotra, Family Members & Prasad Address */}
          {step === 2 && (
            <form onSubmit={handleSubmitEnrollment} className="space-y-5 text-left">
              {/* Gotra Input */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-semibold text-gray-900">
                    Devotee Gotra (गोत्र)
                  </label>
                  <label className="flex items-center gap-1.5 text-xs text-gray-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={unknownGotra}
                      onChange={(e) => {
                        setUnknownGotra(e.target.checked);
                        if (e.target.checked) setGotra("Kashyap");
                      }}
                      className="rounded text-[#E56910] focus:ring-[#E56910]"
                    />
                    <span>Don&apos;t know Gotra</span>
                  </label>
                </div>
                <input
                  type="text"
                  value={unknownGotra ? "Kashyap (Universal Gotra)" : gotra}
                  onChange={(e) => setGotra(e.target.value)}
                  disabled={unknownGotra}
                  placeholder="e.g. Bharadwaj, Vashishtha, Kashyap"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#E56910] disabled:bg-gray-100"
                />
                {unknownGotra && (
                  <p className="text-[11px] text-amber-700 mt-1">
                    ✓ As per Shastras, Purohitji will chant universal Kashyap Gotra for your lineage.
                  </p>
                )}
              </div>

              {/* Multi-Person Family Member Names */}
              {selectedPackage.max_persons > 1 && (
                <div className="bg-orange-50/50 border border-orange-200/60 rounded-lg p-3.5 space-y-2">
                  <label className="block text-xs font-bold text-gray-900 uppercase tracking-wide">
                    Family Member Names for Sankalp ({familyMembers.length + 1} / {selectedPackage.max_persons} persons)
                  </label>
                  <p className="text-[11px] text-gray-600">
                    Panditji will chant each family member&apos;s name during Ahuti.
                  </p>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMemberName}
                      onChange={(e) => setNewMemberName(e.target.value)}
                      placeholder="Add member name (e.g. Spouse / Child)"
                      className="flex-1 px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#E56910]"
                    />
                    <button
                      type="button"
                      onClick={handleAddFamilyMember}
                      className="px-3 py-2 bg-gray-900 text-white rounded text-xs font-semibold hover:bg-gray-800 transition-colors flex items-center gap-1"
                    >
                      <Plus size={14} /> Add
                    </button>
                  </div>

                  {familyMembers.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {familyMembers.map((name, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-gray-200 text-xs rounded text-gray-800"
                        >
                          <span>{name}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveMember(idx)}
                            className="text-gray-400 hover:text-red-600"
                          >
                            <Trash2 size={12} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Special Sankalp Wish */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">
                  Special Prayer or Sankalp Wish <span className="text-xs font-normal text-gray-500">(Optional)</span>
                </label>
                <textarea
                  value={sankalpWish}
                  onChange={(e) => setSankalpWish(e.target.value)}
                  rows={2}
                  placeholder="e.g. Ancestral peace, family health, success in new business"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#E56910]"
                />
              </div>

              {/* Prasad Delivery Address (Optional Toggle) */}
              <div className="pt-2 border-t border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-gray-900 flex items-center gap-1.5">
                    <MapPin size={15} className="text-emerald-600" />
                    <span>Free Aashirwad Box Delivery Address</span>
                  </label>
                  <label className="flex items-center gap-1 text-xs text-gray-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={wantPrasad}
                      onChange={(e) => setWantPrasad(e.target.checked)}
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>Receive Prasad</span>
                  </label>
                </div>

                {wantPrasad && (
                  <div className="grid grid-cols-2 gap-2.5 text-xs">
                    <input
                      type="text"
                      value={houseStreet}
                      onChange={(e) => setHouseStreet(e.target.value)}
                      placeholder="House / Flat / Street address"
                      className="col-span-2 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#E56910]"
                    />
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="City"
                      className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#E56910]"
                    />
                    <input
                      type="text"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="PIN Code"
                      maxLength={6}
                      className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#E56910]"
                    />
                  </div>
                )}
              </div>

              {/* Pricing & Submit */}
              <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <span className="text-xs text-gray-500 uppercase tracking-wider block">Total Dakshina</span>
                  <span className="font-serif text-2xl font-bold text-[#E56910]">
                    ₹{selectedPackage.price}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm rounded-lg transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Registering Sankalp...</span>
                  ) : (
                    <span>Confirm Puja Registration</span>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: SUCCESS & CONFIRMATION SCREEN */}
          {step === 3 && bookingResult && (
            <div className="text-center space-y-5 py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 size={36} />
              </div>

              <div className="space-y-1">
                <span className="text-xs uppercase tracking-widest text-[#E56910] font-bold block">
                  Jay Shree Mahakal 🙏
                </span>
                <h4 className="font-serif text-2xl font-bold text-gray-900">
                  Puja Enrollment Registered!
                </h4>
                <p className="text-xs text-gray-600 max-w-sm mx-auto">
                  Your Sankalp for <strong>{puja.title}</strong> has been logged into our Vedic portal.
                </p>
              </div>

              {/* Reference Box */}
              <div className="bg-amber-50/70 border border-amber-200/80 rounded-lg p-4 max-w-md mx-auto text-left space-y-2 text-xs">
                <div className="flex justify-between border-b border-amber-200/60 pb-2">
                  <span className="text-gray-500">Booking Reference:</span>
                  <span className="font-mono font-bold text-gray-900">{bookingResult.bookingNumber}</span>
                </div>
                <div className="flex justify-between border-b border-amber-200/60 pb-2">
                  <span className="text-gray-500">Devotee Name:</span>
                  <span className="font-medium text-gray-800">{fullName}</span>
                </div>
                <div className="flex justify-between border-b border-amber-200/60 pb-2">
                  <span className="text-gray-500">Selected Package:</span>
                  <span className="font-medium text-gray-800">{selectedPackage.name}</span>
                </div>
                <div className="flex justify-between border-b border-amber-200/60 pb-2">
                  <span className="text-gray-500">Dakshina Amount:</span>
                  <span className="font-bold text-[#E56910]">₹{selectedPackage.price}</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-gray-500">Payment Status:</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">
                    Pending Verification
                  </span>
                </div>
              </div>

              {/* Note on manual payment */}
              <div className="bg-gray-50 border border-gray-200 p-3 rounded-lg text-xs text-gray-600 max-w-md mx-auto text-left space-y-1">
                <p className="font-semibold text-gray-800">What happens next?</p>
                <p>
                  1. Our Acharya team will reach out via WhatsApp at <strong>+91 {cleanPhoneForWhatsApp}</strong> to verify your Dakshina via UPI / Bank.
                </p>
                <p>
                  2. On the day of the Puja, the live stream joining link will be broadcast to your WhatsApp.
                </p>
              </div>

              {/* WhatsApp Action Button */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={supportWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs uppercase tracking-wider rounded-lg shadow transition-colors"
                >
                  <MessageCircle size={16} /> Chat on WhatsApp for Fast Verification
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium text-xs uppercase tracking-wider rounded-lg transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
