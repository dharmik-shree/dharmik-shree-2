import React from "react";
import { CanonicalKundali } from "@/lib/kundali/types";
import { kundaliTheme } from "@/lib/kundali/renderer/kundaliTheme";

export default function ReportCover({ data }: { data: CanonicalKundali }) {
  return (
    <div className="w-[794px] h-[1123px] p-12 bg-white text-gray-900 flex flex-col justify-between border-[12px] border-[#8B1E0F] relative overflow-hidden box-border font-sans">
      {/* Inner Decorative Border */}
      <div className="absolute inset-3 border-2 border-[#D4AF37] pointer-events-none" />

      {/* Top Branding */}
      <div className="text-center pt-8 space-y-2 z-10">
        <div className="inline-block border-b-2 border-[#D4AF37] pb-2">
          <h1 className="text-4xl font-serif font-bold text-[#8B1E0F] tracking-widest uppercase">
            {kundaliTheme.brandName}
          </h1>
        </div>
        <p className="text-xs tracking-widest uppercase text-[#D4AF37] font-semibold">
          {kundaliTheme.brandTagline}
        </p>
      </div>

      {/* Hero Mandala & Center Title */}
      <div className="my-auto text-center space-y-6 z-10">
        <div className="w-48 h-48 mx-auto rounded-full border-4 border-[#D4AF37] bg-[#FFFDF6] flex items-center justify-center shadow-xl">
          <svg viewBox="0 0 100 100" className="w-36 h-36 text-[#8B1E0F] fill-current">
            <polygon points="50,10 90,90 10,90" fill="none" stroke="#8B1E0F" strokeWidth="3" />
            <polygon points="50,90 90,10 10,10" fill="none" stroke="#D4AF37" strokeWidth="3" />
            <circle cx="50" cy="50" r="12" fill="#8B1E0F" />
          </svg>
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl font-serif font-bold text-[#8B1E0F] uppercase tracking-wide">
            संपूर्ण धार्मिकश्री प्रीमियम कुण्डली
          </h2>
          <p className="text-sm text-gray-600 font-medium">
            (Complete 200+ Page Vedic Astrology & Horoscope Report)
          </p>
        </div>

        {/* User Details Card */}
        <div className="max-w-md mx-auto bg-[#FFFDF6] border-2 border-[#E5D5B5] p-6 rounded-md shadow-md text-left space-y-3 font-sans text-sm">
          <div className="flex justify-between border-b border-[#E5D5B5] pb-2">
            <span className="text-gray-500 font-semibold uppercase text-xs">नाम (Full Name)</span>
            <span className="font-bold text-[#8B1E0F] text-base">{data.person.fullName}</span>
          </div>
          <div className="flex justify-between border-b border-[#E5D5B5] pb-2">
            <span className="text-gray-500 font-semibold uppercase text-xs">जन्म तिथि (Date of Birth)</span>
            <span className="font-semibold text-gray-800">{data.birth.dateOfBirth}</span>
          </div>
          <div className="flex justify-between border-b border-[#E5D5B5] pb-2">
            <span className="text-gray-500 font-semibold uppercase text-xs">जन्म समय (Time of Birth)</span>
            <span className="font-semibold text-gray-800">{data.birth.timeOfBirth}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-semibold uppercase text-xs">जन्म स्थान (Place of Birth)</span>
            <span className="font-semibold text-gray-800">{data.location.name}</span>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="text-center pb-4 text-xs text-gray-600 border-t border-[#E5D5B5] pt-4 z-10 flex justify-between items-center">
        <span>वेबसाइट: www.dharmikshree.com</span>
        <span className="font-semibold text-[#8B1E0F]">सर्वाधिकार सुरक्षित © धार्मिकश्री</span>
        <span>संपर्क: +91 99999 99999</span>
      </div>
    </div>
  );
}
