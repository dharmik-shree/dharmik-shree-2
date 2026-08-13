import React from "react";
import { CanonicalKundali } from "@/lib/kundali/types";

export default function DoshasPage({ data }: { data: CanonicalKundali }) {
  const { manglik, sadeSati, kaalSarp } = data.doshas;

  return (
    <div className="w-[794px] h-[1123px] p-10 bg-white text-gray-900 flex flex-col justify-between border-4 border-[#8B1E0F] relative box-border font-sans">
      {/* Header */}
      <div className="flex justify-between items-center border-b-2 border-[#D4AF37] pb-3 mb-6">
        <div>
          <h2 className="text-xl font-serif font-bold text-[#8B1E0F] uppercase">दोष विवेचन एवं वैदिक उपाय</h2>
          <p className="text-xs text-gray-500 font-medium">Manglik, Sade Sati & Kaal Sarp Detailed Analysis</p>
        </div>
        <span className="text-xs font-bold text-[#8B1E0F] bg-[#FFFDF6] px-3 py-1 border border-[#D4AF37] rounded">
          धार्मिकश्री
        </span>
      </div>

      {/* Main Content */}
      <div className="space-y-6 my-auto text-xs">
        {/* Manglik Analysis */}
        <div className="border border-[#E5D5B5] rounded overflow-hidden">
          <div className="bg-[#8B1E0F] text-white px-4 py-2 font-serif font-bold text-xs flex justify-between">
            <span>1. मंगल दोष विश्लेषण (Manglik Dosha Report)</span>
            <span className="bg-white/20 px-2 py-0.5 rounded text-[10px]">{manglik.isManglik ? "मंगल दोष उपस्थित" : "मंगल दोष रहित"}</span>
          </div>
          <div className="p-4 space-y-2 bg-[#FFFDF6]">
            <p className="font-semibold text-gray-800">{manglik.description}</p>
            {manglik.remedies && manglik.remedies.length > 0 && (
              <div className="pt-2 border-t border-[#E5D5B5]">
                <span className="font-bold text-[#8B1E0F] block mb-1">विशेष उपाय (Remedies):</span>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  {manglik.remedies.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Sade Sati Report */}
        <div className="border border-[#E5D5B5] rounded overflow-hidden">
          <div className="bg-[#8B1E0F] text-white px-4 py-2 font-serif font-bold text-xs flex justify-between">
            <span>2. शनि साढ़े साती विवरण (Saturn Sade Sati Analysis)</span>
            <span className="bg-white/20 px-2 py-0.5 rounded text-[10px]">{sadeSati.phaseName}</span>
          </div>
          <div className="p-4 space-y-3">
            <p className="font-semibold text-gray-800">{sadeSati.description}</p>
            <table className="w-full text-xs text-left border-collapse border border-[#E5D5B5]">
              <thead>
                <tr className="bg-[#FFFDF6] border-b border-[#E5D5B5] font-semibold">
                  <th className="p-2">साढ़े साती चरण</th>
                  <th className="p-2">आरंभ तिथि</th>
                  <th className="p-2">समाप्ति तिथि</th>
                  <th className="p-2">शनि की राशि</th>
                </tr>
              </thead>
              <tbody>
                {sadeSati.timeline.map((item, idx) => (
                  <tr key={idx} className="border-b border-[#E5D5B5]">
                    <td className="p-2 font-bold text-[#8B1E0F]">{item.cycle}</td>
                    <td className="p-2">{item.startDate}</td>
                    <td className="p-2">{item.endDate}</td>
                    <td className="p-2 font-semibold">{item.saturnSign}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Kaal Sarp Report */}
        <div className="border border-[#E5D5B5] rounded overflow-hidden">
          <div className="bg-[#8B1E0F] text-white px-4 py-2 font-serif font-bold text-xs flex justify-between">
            <span>3. कालसर्प दोष / योग विश्लेषण</span>
            <span className="bg-white/20 px-2 py-0.5 rounded text-[10px]">{kaalSarp.isKaalSarp ? kaalSarp.typeHi : "कालसर्प दोष नहीं"}</span>
          </div>
          <div className="p-4 bg-[#FFFDF6]">
            <p className="font-semibold text-gray-800">{kaalSarp.description}</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-[#E5D5B5] pt-2 text-xs text-gray-500 flex justify-between">
        <span>धार्मिकश्री - दोष एवं उपाय रिपोर्ट</span>
        <span>पृष्ठ 41</span>
      </div>
    </div>
  );
}
