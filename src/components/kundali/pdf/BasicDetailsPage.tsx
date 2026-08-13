import React from "react";
import { CanonicalKundali } from "@/lib/kundali/types";

export default function BasicDetailsPage({ data }: { data: CanonicalKundali }) {
  return (
    <div className="w-[794px] h-[1123px] p-10 bg-white text-gray-900 flex flex-col justify-between border-4 border-[#8B1E0F] relative box-border font-sans">
      {/* Header */}
      <div className="flex justify-between items-center border-b-2 border-[#D4AF37] pb-3 mb-6">
        <div>
          <h2 className="text-xl font-serif font-bold text-[#8B1E0F] uppercase">मुख्य विवरण एवं अवकहड़ा चक्र</h2>
          <p className="text-xs text-gray-500 font-medium">Basic Birth Details, Avakhada & Panchang</p>
        </div>
        <span className="text-xs font-bold text-[#8B1E0F] bg-[#FFFDF6] px-3 py-1 border border-[#D4AF37] rounded">
          धार्मिकश्री
        </span>
      </div>

      {/* Main Content Grid */}
      <div className="space-y-6 my-auto">
        {/* Section 1: Personal Birth Details */}
        <div className="border border-[#E5D5B5] rounded overflow-hidden">
          <div className="bg-[#8B1E0F] text-white px-4 py-2 font-serif font-bold text-sm">
            जन्म विवरण (Personal Birth Particulars)
          </div>
          <table className="w-full text-xs text-left border-collapse">
            <tbody>
              <tr className="border-b border-[#E5D5B5] bg-[#FFFDF6]">
                <td className="p-2.5 font-semibold text-gray-600 w-1/4">जातक का नाम:</td>
                <td className="p-2.5 font-bold text-[#8B1E0F] w-1/4">{data.person.fullName}</td>
                <td className="p-2.5 font-semibold text-gray-600 w-1/4">लिंग:</td>
                <td className="p-2.5 font-semibold text-gray-800 w-1/4">{data.person.gender === "male" ? "पुरुष (Male)" : "स्त्री (Female)"}</td>
              </tr>
              <tr className="border-b border-[#E5D5B5]">
                <td className="p-2.5 font-semibold text-gray-600">जन्म तिथि:</td>
                <td className="p-2.5 font-bold text-gray-800">{data.birth.dateOfBirth}</td>
                <td className="p-2.5 font-semibold text-gray-600">जन्म समय:</td>
                <td className="p-2.5 font-bold text-gray-800">{data.birth.timeOfBirth}</td>
              </tr>
              <tr className="border-b border-[#E5D5B5] bg-[#FFFDF6]">
                <td className="p-2.5 font-semibold text-gray-600">जन्म स्थान:</td>
                <td className="p-2.5 font-semibold text-gray-800">{data.location.name}</td>
                <td className="p-2.5 font-semibold text-gray-600">समय क्षेत्र (Timezone):</td>
                <td className="p-2.5 font-semibold text-gray-800">+{data.location.timezone} GMT</td>
              </tr>
              <tr>
                <td className="p-2.5 font-semibold text-gray-600">अक्षांश (Latitude):</td>
                <td className="p-2.5 font-semibold text-gray-800">{data.location.latitude}° N</td>
                <td className="p-2.5 font-semibold text-gray-600">रेखांश (Longitude):</td>
                <td className="p-2.5 font-semibold text-gray-800">{data.location.longitude}° E</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Section 2: Avakhada Chakra Table */}
        <div className="border border-[#E5D5B5] rounded overflow-hidden">
          <div className="bg-[#8B1E0F] text-white px-4 py-2 font-serif font-bold text-sm">
            अवग्रह / अवकहड़ा चक्र (Avakhada Chakra)
          </div>
          <table className="w-full text-xs text-left border-collapse">
            <tbody>
              <tr className="border-b border-[#E5D5B5] bg-[#FFFDF6]">
                <td className="p-2.5 font-semibold text-gray-600 w-1/4">वर्ण (Varna):</td>
                <td className="p-2.5 font-bold text-[#8B1E0F] w-1/4">{data.avakhada.varna}</td>
                <td className="p-2.5 font-semibold text-gray-600 w-1/4">वश्य (Vashya):</td>
                <td className="p-2.5 font-bold text-[#8B1E0F] w-1/4">{data.avakhada.vashya}</td>
              </tr>
              <tr className="border-b border-[#E5D5B5]">
                <td className="p-2.5 font-semibold text-gray-600">योनि (Yoni):</td>
                <td className="p-2.5 font-semibold text-gray-800">{data.avakhada.yoni}</td>
                <td className="p-2.5 font-semibold text-gray-600">गण (Gana):</td>
                <td className="p-2.5 font-semibold text-gray-800">{data.avakhada.gana}</td>
              </tr>
              <tr className="border-b border-[#E5D5B5] bg-[#FFFDF6]">
                <td className="p-2.5 font-semibold text-gray-600">नाड़ी (Nadi):</td>
                <td className="p-2.5 font-semibold text-gray-800">{data.avakhada.nadi}</td>
                <td className="p-2.5 font-semibold text-gray-600">राशि स्वामी:</td>
                <td className="p-2.5 font-semibold text-gray-800">{data.avakhada.signLord}</td>
              </tr>
              <tr>
                <td className="p-2.5 font-semibold text-gray-600">पाया (Paya):</td>
                <td className="p-2.5 font-bold text-gray-800">{data.avakhada.paya}</td>
                <td className="p-2.5 font-semibold text-gray-600">तत्व (Tatva):</td>
                <td className="p-2.5 font-bold text-gray-800">{data.avakhada.tatva}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Section 3: Panchang Particulars */}
        <div className="border border-[#E5D5B5] rounded overflow-hidden">
          <div className="bg-[#8B1E0F] text-white px-4 py-2 font-serif font-bold text-sm">
            जन्मकालीन पंचांग विवरण (Panchang Details)
          </div>
          <table className="w-full text-xs text-left border-collapse">
            <tbody>
              <tr className="border-b border-[#E5D5B5] bg-[#FFFDF6]">
                <td className="p-2.5 font-semibold text-gray-600 w-1/4">तिथि (Tithi):</td>
                <td className="p-2.5 font-bold text-gray-800 w-1/4">{data.panchang.tithi.name}</td>
                <td className="p-2.5 font-semibold text-gray-600 w-1/4">वार (Day):</td>
                <td className="p-2.5 font-bold text-gray-800 w-1/4">{data.panchang.vara.name}</td>
              </tr>
              <tr className="border-b border-[#E5D5B5]">
                <td className="p-2.5 font-semibold text-gray-600">नक्षत्र (Nakshatra):</td>
                <td className="p-2.5 font-bold text-[#8B1E0F]">{data.panchang.nakshatra.name} (चरण {data.panchang.nakshatra.pada})</td>
                <td className="p-2.5 font-semibold text-gray-600">योग (Yoga):</td>
                <td className="p-2.5 font-semibold text-gray-800">{data.panchang.yoga.name}</td>
              </tr>
              <tr>
                <td className="p-2.5 font-semibold text-gray-600">करण (Karana):</td>
                <td className="p-2.5 font-semibold text-gray-800">{data.panchang.karana.name}</td>
                <td className="p-2.5 font-semibold text-gray-600">अयनांश (Ayanamsha):</td>
                <td className="p-2.5 font-semibold text-gray-800">{data.panchang.ayanamshaName} ({data.panchang.ayanamshaValue}°)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-[#E5D5B5] pt-2 text-xs text-gray-500 flex justify-between">
        <span>धार्मिकश्री - 100% सटीक वैदिक गणनाएँ</span>
        <span>पृष्ठ 5</span>
      </div>
    </div>
  );
}
