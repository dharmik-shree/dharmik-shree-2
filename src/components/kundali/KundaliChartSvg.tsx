"use client";

import React from "react";
import { DivisionalChartData } from "@/lib/kundali/types";

interface KundaliChartSvgProps {
  data: DivisionalChartData;
  style?: "north-indian" | "south-indian";
  width?: number;
  height?: number;
  className?: string;
  theme?: "dark" | "light" | "gold";
}

const ZODIAC_HI_SHORT = [
  "", "मेष", "वृषभ", "मिथुन", "कर्क", "सिंह", "कन्या", "तुला", "वृश्चिक", "धनु", "मकर", "कुंभ", "मीन"
];

export default function KundaliChartSvg({
  data,
  style = "north-indian",
  width = 400,
  height = 400,
  className = "",
  theme = "gold",
}: KundaliChartSvgProps) {
  const isLight = theme === "light";
  const strokeColor = isLight ? "#8B1E0F" : "#D4AF37"; // Brand Crimson or Brand Gold
  const fillBg = isLight ? "#FFFDF5" : "#1A0B09"; // Warm Ivory or Deep Velvet Black
  const houseNumColor = isLight ? "#9A2A18" : "#E5C158";
  const planetColor = isLight ? "#111827" : "#F3F4F6";
  const ascColor = "#DC2626"; // Vibrant Red for Lagna

  // Map 12 house center coordinates for North Indian Diamond Chart
  const northHouseCoords = [
    { numX: 200, numY: 155, textX: 200, textY: 110 }, // House 1 (Top Center Diamond)
    { numX: 115, numY: 75, textX: 90, textY: 45 },    // House 2 (Top Left Triangle)
    { numX: 75, numY: 115, textX: 45, textY: 90 },    // House 3 (Left Top Triangle)
    { numX: 155, numY: 200, textX: 110, textY: 200 }, // House 4 (Left Diamond)
    { numX: 75, numY: 285, textX: 45, textY: 310 },   // House 5 (Left Bottom Triangle)
    { numX: 115, numY: 325, textX: 90, textY: 355 },  // House 6 (Bottom Left Triangle)
    { numX: 200, numY: 245, textX: 200, textY: 290 }, // House 7 (Bottom Diamond)
    { numX: 285, numY: 325, textX: 310, textY: 355 }, // House 8 (Bottom Right Triangle)
    { numX: 325, numY: 285, textX: 355, textY: 310 }, // House 9 (Right Bottom Triangle)
    { numX: 245, numY: 200, textX: 290, textY: 200 }, // House 10 (Right Diamond)
    { numX: 325, numY: 115, textX: 355, textY: 90 },  // House 11 (Right Top Triangle)
    { numX: 285, numY: 75, textX: 310, textY: 45 },   // House 12 (Top Right Triangle)
  ];

  return (
    <div className={`inline-block ${className}`}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 400 400"
        className="w-full h-auto max-w-full font-sans select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="400" height="400" fill={fillBg} stroke={strokeColor} strokeWidth="4" rx="4" />

        {style === "north-indian" ? (
          <g>
            {/* North Indian Diamond Lines */}
            <line x1="0" y1="0" x2="400" y2="400" stroke={strokeColor} strokeWidth="2" />
            <line x1="400" y1="0" x2="0" y2="400" stroke={strokeColor} strokeWidth="2" />
            <polygon points="200,0 0,200 200,400 400,200" fill="none" stroke={strokeColor} strokeWidth="2" />
            <line x1="0" y1="0" x2="400" y2="0" stroke={strokeColor} strokeWidth="4" />
            <line x1="0" y1="400" x2="400" y2="400" stroke={strokeColor} strokeWidth="4" />
            <line x1="0" y1="0" x2="0" y2="400" stroke={strokeColor} strokeWidth="4" />
            <line x1="400" y1="0" x2="400" y2="400" stroke={strokeColor} strokeWidth="4" />

            {/* Title Badge in Center */}
            <text x="200" y="195" textAnchor="middle" fill={strokeColor} fontSize="11" fontWeight="bold" opacity="0.65">
              {data.title || data.chartType}
            </text>

            {/* Render 12 Houses */}
            {data.houses.map((h, i) => {
              const coords = northHouseCoords[i];
              if (!coords) return null;

              const isAsc = h.house === 1;

              return (
                <g key={h.house}>
                  {/* Sign Number */}
                  <text
                    x={coords.numX}
                    y={coords.numY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={isAsc ? ascColor : houseNumColor}
                    fontSize="13"
                    fontWeight="bold"
                  >
                    {h.signId}
                  </text>

                  {/* Planets List in House */}
                  {h.planets && h.planets.length > 0 && (
                    <text
                      x={coords.textX}
                      y={coords.textY}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={planetColor}
                      fontSize="11"
                      fontWeight="600"
                    >
                      {h.planets.map((p, idx) => (
                        <tspan key={idx} x={coords.textX} dy={idx === 0 ? 0 : 13}>
                          {p}
                        </tspan>
                      ))}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        ) : (
          /* South Indian Grid Style */
          <g>
            <line x1="100" y1="0" x2="100" y2="400" stroke={strokeColor} strokeWidth="2" />
            <line x1="200" y1="0" x2="200" y2="400" stroke={strokeColor} strokeWidth="2" />
            <line x1="300" y1="0" x2="300" y2="400" stroke={strokeColor} strokeWidth="2" />
            <line x1="0" y1="100" x2="400" y2="100" stroke={strokeColor} strokeWidth="2" />
            <line x1="0" y1="200" x2="400" y2="200" stroke={strokeColor} strokeWidth="2" />
            <line x1="0" y1="300" x2="400" y2="300" stroke={strokeColor} strokeWidth="2" />
            <rect x="100" y="100" width="200" height="200" fill={fillBg} stroke={strokeColor} strokeWidth="2" />
            <text x="200" y="205" textAnchor="middle" fill={strokeColor} fontSize="14" fontWeight="bold">
              {data.title || data.chartType}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}
