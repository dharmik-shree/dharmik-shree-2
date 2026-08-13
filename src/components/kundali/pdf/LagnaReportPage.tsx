import React from "react";
import { CanonicalKundali } from "@/lib/kundali/types";

export default function LagnaReportPage({ data }: { data: CanonicalKundali }) {
  const lagnaInfo = data.interpretations.lagnaReport;

  return (
    <div className="w-[794px] h-[1123px] p-10 bg-white text-gray-900 flex flex-col justify-between border-4 border-[#8B1E0F] relative box-border font-sans">
      {/* Header */}
      <div className="flex justify-between items-center border-b-2 border-[#D4AF37] pb-3 mb-6">
        <div>
          <h2 className="text-xl font-serif font-bold text-[#8B1E0F] uppercase">
            आपकी लग्न रिपोर्ट: {data.lagna.signNameHi} ({data.lagna.signName})
          </h2>
          <p className="text-xs text-gray-500 font-medium">Ascendant Sign Analysis & Personality Report</p>
        </div>
        <span className="text-xs font-bold text-[#8B1E0F] bg-[#FFFDF6] px-3 py-1 border border-[#D4AF37] rounded">
          धार्मिकश्री
        </span>
      </div>

      {/* Main Content */}
      <div className="space-y-6 my-auto text-xs leading-relaxed">
        <div className="bg-[#FFFDF6] border-l-4 border-[#8B1E0F] p-4 rounded shadow-sm space-y-1">
          <h3 className="font-serif font-bold text-sm text-[#8B1E0F]">लग्न स्वामी: {data.lagna.lord}</h3>
          <p className="text-gray-700">
            वैदिक ज्योतिष में लग्न का स्थान सर्वोपरि है। यह आपके शारीरिक गठन, स्वभाव, विचारशैली एवं जीवन की दिशा का निर्धारण करता है।
          </p>
        </div>

        <div className="border border-[#E5D5B5] rounded p-4 space-y-2">
          <h4 className="font-serif font-bold text-sm text-[#8B1E0F] border-b border-[#E5D5B5] pb-1">1. स्वास्थ्य एवं शारीरिक संरचना</h4>
          <p className="text-gray-800">{lagnaInfo.health}</p>
        </div>

        <div className="border border-[#E5D5B5] rounded p-4 space-y-2">
          <h4 className="font-serif font-bold text-sm text-[#8B1E0F] border-b border-[#E5D5B5] pb-1">2. व्यक्तित्व एवं स्वभाव</h4>
          <p className="text-gray-800">{lagnaInfo.personality}</p>
        </div>

        <div className="border border-[#E5D5B5] rounded p-4 space-y-2">
          <h4 className="font-serif font-bold text-sm text-[#8B1E0F] border-b border-[#E5D5B5] pb-1">3. जीविका एवं कार्यक्षेत्र</h4>
          <p className="text-gray-800">{lagnaInfo.career}</p>
        </div>

        <div className="border border-[#E5D5B5] rounded p-4 space-y-2">
          <h4 className="font-serif font-bold text-sm text-[#8B1E0F] border-b border-[#E5D5B5] pb-1">4. सम्बन्ध एवं सामाजिक छवि</h4>
          <p className="text-gray-800">{lagnaInfo.relationships}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-[#E5D5B5] pt-2 text-xs text-gray-500 flex justify-between">
        <span>धार्मिकश्री - लग्न रिपोर्ट</span>
        <span>पृष्ठ 11</span>
      </div>
    </div>
  );
}
