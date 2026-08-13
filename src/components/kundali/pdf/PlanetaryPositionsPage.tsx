import React from "react";
import { CanonicalKundali } from "@/lib/kundali/types";
import KundaliChartSvg from "../KundaliChartSvg";

export default function PlanetaryPositionsPage({ data }: { data: CanonicalKundali }) {
  return (
    <div className="w-[794px] h-[1123px] p-10 bg-white text-gray-900 flex flex-col justify-between border-4 border-[#8B1E0F] relative box-border font-sans">
      {/* Header */}
      <div className="flex justify-between items-center border-b-2 border-[#D4AF37] pb-3 mb-4">
        <div>
          <h2 className="text-xl font-serif font-bold text-[#8B1E0F] uppercase">ग्रह स्थिति एवं लग्न/नवमांश कुण्डली</h2>
          <p className="text-xs text-gray-500 font-medium">Planetary Positions Table, Lagna (D1) & Navamsha (D9) Charts</p>
        </div>
        <span className="text-xs font-bold text-[#8B1E0F] bg-[#FFFDF6] px-3 py-1 border border-[#D4AF37] rounded">
          धार्मिकश्री
        </span>
      </div>

      {/* Side by Side Charts */}
      <div className="grid grid-cols-2 gap-6 my-2">
        <div className="text-center border border-[#E5D5B5] p-3 rounded bg-[#FFFDF6]">
          <h3 className="font-serif font-bold text-sm text-[#8B1E0F] mb-2 uppercase">लग्न कुण्डली (Lagna Chart - D1)</h3>
          <KundaliChartSvg data={data.charts.D1} width={320} height={320} theme="light" />
        </div>
        <div className="text-center border border-[#E5D5B5] p-3 rounded bg-[#FFFDF6]">
          <h3 className="font-serif font-bold text-sm text-[#8B1E0F] mb-2 uppercase">नवमांश कुण्डली (Navamsha Chart - D9)</h3>
          <KundaliChartSvg data={data.charts.D9} width={320} height={320} theme="light" />
        </div>
      </div>

      {/* Planetary Positions Table */}
      <div className="border border-[#E5D5B5] rounded overflow-hidden my-2">
        <div className="bg-[#8B1E0F] text-white px-4 py-2 font-serif font-bold text-xs flex justify-between">
          <span>ग्रह स्पष्ट तालिका (Planetary Longitude & Dignity Table)</span>
          <span>लहरी अयनांश: 23°78'</span>
        </div>
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="bg-[#FFFDF6] border-b border-[#E5D5B5] text-gray-600 font-semibold text-[11px]">
              <th className="p-2">ग्रह (Planet)</th>
              <th className="p-2">राशि (Sign)</th>
              <th className="p-2">अंश (Degree)</th>
              <th className="p-2">नक्षत्र (Nakshatra)</th>
              <th className="p-2">पद (Pada)</th>
              <th className="p-2">भाव (House)</th>
              <th className="p-2">अवस्था / संबंध (Status)</th>
            </tr>
          </thead>
          <tbody>
            {data.planets.map((p, idx) => (
              <tr key={p.id} className={`border-b border-[#E5D5B5] ${idx % 2 === 0 ? "bg-white" : "bg-[#FFFDF6]"}`}>
                <td className="p-2 font-bold text-[#8B1E0F]">
                  {p.nameHi} ({p.name})
                  {p.isRetrograde && <span className="text-red-600 font-bold ml-1">(व)</span>}
                  {p.isCombust && <span className="text-amber-600 font-bold ml-1">(अ)</span>}
                </td>
                <td className="p-2 font-semibold text-gray-800">{p.signNameHi}</td>
                <td className="p-2 font-mono">{p.degree.toFixed(2)}°</td>
                <td className="p-2 font-medium">{p.nakshatraName}</td>
                <td className="p-2 font-mono font-bold text-[#8B1E0F]">{p.nakshatraPada}</td>
                <td className="p-2 font-bold">{p.house}</td>
                <td className="p-2 font-medium text-gray-700">{p.relationship} ({p.dignity})</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="border-t border-[#E5D5B5] pt-2 text-xs text-gray-500 flex justify-between">
        <span>नोट: (व) = वक्री (Retrograde), (अ) = अस्त (Combust)</span>
        <span>पृष्ठ 8</span>
      </div>
    </div>
  );
}
