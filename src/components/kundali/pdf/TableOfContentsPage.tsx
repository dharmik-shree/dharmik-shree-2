import React from "react";
import { KUNDALI_REPORT_MANIFEST } from "@/lib/kundali/renderer/manifest";

export default function TableOfContentsPage() {
  return (
    <div className="w-[794px] h-[1123px] p-10 bg-white text-gray-900 flex flex-col justify-between border-4 border-[#8B1E0F] relative box-border font-sans">
      {/* Header */}
      <div className="flex justify-between items-center border-b-2 border-[#D4AF37] pb-3 mb-6">
        <div>
          <h2 className="text-xl font-serif font-bold text-[#8B1E0F] uppercase">विषय सूची (Table of Contents)</h2>
          <p className="text-xs text-gray-500 font-medium">Index of 200+ Page Complete Vedic Horoscope</p>
        </div>
        <span className="text-xs font-bold text-[#8B1E0F] bg-[#FFFDF6] px-3 py-1 border border-[#D4AF37] rounded">
          धार्मिकश्री
        </span>
      </div>

      {/* TOC Grid */}
      <div className="my-auto space-y-3">
        <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-xs">
          {KUNDALI_REPORT_MANIFEST.map((sec, idx) => (
            <div key={sec.id} className="flex justify-between items-center border-b border-[#E5D5B5] pb-1.5">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#8B1E0F] w-6">{idx + 1}.</span>
                <span className="font-semibold text-gray-800">{sec.titleHi}</span>
              </div>
              <span className="font-mono text-gray-500 font-bold">P.{idx * 5 + 5}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-[#E5D5B5] pt-2 text-xs text-gray-500 flex justify-between">
        <span>धार्मिकश्री - 100% प्रामाणिक ग्रंथ आधारित फलादेश</span>
        <span>पृष्ठ 2-4</span>
      </div>
    </div>
  );
}
