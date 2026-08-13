import React from "react";
import { CanonicalKundali } from "@/lib/kundali/types";

export default function RemediesPage({ data }: { data: CanonicalKundali }) {
  const { lifeGemstone, luckyGemstone, fortuneGemstone, ishtaDevata, rudraksha, yantras, herbs } = data.remedies;

  return (
    <div className="w-[794px] h-[1123px] p-10 bg-white text-gray-900 flex flex-col justify-between border-4 border-[#8B1E0F] relative box-border font-sans">
      {/* Header */}
      <div className="flex justify-between items-center border-b-2 border-[#D4AF37] pb-3 mb-6">
        <div>
          <h2 className="text-xl font-serif font-bold text-[#8B1E0F] uppercase">रत्न, इष्ट देव एवं वैदिक समाधान</h2>
          <p className="text-xs text-gray-500 font-medium">Gemstone, Ishta Devata, Rudraksha & Sacred Remedies</p>
        </div>
        <span className="text-xs font-bold text-[#8B1E0F] bg-[#FFFDF6] px-3 py-1 border border-[#D4AF37] rounded">
          धार्मिकश्री
        </span>
      </div>

      {/* Main Content */}
      <div className="space-y-6 my-auto text-xs">
        {/* Gemstones Section */}
        <div className="border border-[#E5D5B5] rounded overflow-hidden">
          <div className="bg-[#8B1E0F] text-white px-4 py-2 font-serif font-bold text-xs">
            1. रत्न सुझाव (Gemstone Recommendations)
          </div>
          <div className="grid grid-cols-3 gap-4 p-4 bg-[#FFFDF6]">
            <div className="border border-[#E5D5B5] p-3 rounded bg-white space-y-1">
              <span className="text-[10px] uppercase font-bold text-[#8B1E0F]">जीवन रत्न (Lagna Gem)</span>
              <p className="font-bold text-sm text-gray-800">{lifeGemstone.nameHi}</p>
              <p className="text-gray-600 font-mono">वजन: {lifeGemstone.weight}</p>
              <p className="text-gray-600">धातु: {lifeGemstone.metal}</p>
              <p className="text-gray-600">उंगली: {lifeGemstone.finger}</p>
            </div>
            <div className="border border-[#E5D5B5] p-3 rounded bg-white space-y-1">
              <span className="text-[10px] uppercase font-bold text-[#8B1E0F]">भाग्य रत्न (Fortune Gem)</span>
              <p className="font-bold text-sm text-gray-800">{fortuneGemstone.nameHi}</p>
              <p className="text-gray-600 font-mono">वजन: {fortuneGemstone.weight}</p>
              <p className="text-gray-600">धातु: {fortuneGemstone.metal}</p>
              <p className="text-gray-600">उंगली: {fortuneGemstone.finger}</p>
            </div>
            <div className="border border-[#E5D5B5] p-3 rounded bg-white space-y-1">
              <span className="text-[10px] uppercase font-bold text-[#8B1E0F]">कारक रत्न (Lucky Gem)</span>
              <p className="font-bold text-sm text-gray-800">{luckyGemstone.nameHi}</p>
              <p className="text-gray-600 font-mono">वजन: {luckyGemstone.weight}</p>
              <p className="text-gray-600">धातु: {luckyGemstone.metal}</p>
              <p className="text-gray-600">उंगली: {luckyGemstone.finger}</p>
            </div>
          </div>
        </div>

        {/* Ishta Devata */}
        <div className="border border-[#E5D5B5] rounded p-4 space-y-2 bg-[#FFFDF6]">
          <h3 className="font-serif font-bold text-sm text-[#8B1E0F] border-b border-[#E5D5B5] pb-1">
            2. इष्ट देवता एवं उपासना (Ishta Devata & Worship)
          </h3>
          <p className="font-bold text-base text-[#8B1E0F]">{ishtaDevata.devataHi}</p>
          <p className="text-gray-700">{ishtaDevata.reason}</p>
          <p className="text-gray-800 font-medium">{ishtaDevata.worshipRules}</p>
          <p className="font-bold text-[#8B1E0F] pt-1">मंत्र: {ishtaDevata.mantra}</p>
        </div>

        {/* Rudraksha & Yantras */}
        <div className="grid grid-cols-2 gap-4">
          <div className="border border-[#E5D5B5] rounded p-4 space-y-2">
            <h4 className="font-serif font-bold text-xs text-[#8B1E0F] uppercase">रुद्राक्ष सुझाव</h4>
            {rudraksha.map((r, i) => (
              <div key={i} className="space-y-0.5">
                <p className="font-bold text-gray-800">{r.mukhi}</p>
                <p className="text-gray-600">{r.benefits}</p>
              </div>
            ))}
          </div>
          <div className="border border-[#E5D5B5] rounded p-4 space-y-2">
            <h4 className="font-serif font-bold text-xs text-[#8B1E0F] uppercase">यंत्र सुझाव</h4>
            {yantras.map((y, i) => (
              <div key={i} className="space-y-0.5">
                <p className="font-bold text-gray-800">{y.name}</p>
                <p className="text-gray-600">{y.worshipMethod}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-[#E5D5B5] pt-2 text-xs text-gray-500 flex justify-between">
        <span>धार्मिकश्री - रत्न एवं उपाय सुझाव</span>
        <span>पृष्ठ 91</span>
      </div>
    </div>
  );
}
