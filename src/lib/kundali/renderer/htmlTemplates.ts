// Pure HTML/SVG Template Generator for Puppeteer PDF Engine
// Eliminates react-dom/server dependency to ensure 100% Vercel / Next.js 16 Turbopack build compatibility.

import { CanonicalKundali, DivisionalChartData } from "../types";
import { kundaliTheme } from "./kundaliTheme";
import { KUNDALI_REPORT_MANIFEST } from "./manifest";

export function renderChartSvgHtml(data: DivisionalChartData, width: number = 320, height: number = 320): string {
  const strokeColor = "#8B1E0F";
  const fillBg = "#FFFDF5";
  const houseNumColor = "#9A2A18";
  const planetColor = "#111827";
  const ascColor = "#DC2626";

  const northHouseCoords = [
    { numX: 200, numY: 155, textX: 200, textY: 110 },
    { numX: 115, numY: 75, textX: 90, textY: 45 },
    { numX: 75, numY: 115, textX: 45, textY: 90 },
    { numX: 155, numY: 200, textX: 110, textY: 200 },
    { numX: 75, numY: 285, textX: 45, textY: 310 },
    { numX: 115, numY: 325, textX: 90, textY: 355 },
    { numX: 200, numY: 245, textX: 200, textY: 290 },
    { numX: 285, numY: 325, textX: 310, textY: 355 },
    { numX: 325, numY: 285, textX: 355, textY: 310 },
    { numX: 245, numY: 200, textX: 290, textY: 200 },
    { numX: 325, numY: 115, textX: 355, textY: 90 },
    { numX: 285, numY: 75, textX: 310, textY: 45 },
  ];

  const housesHtml = data.houses.map((h, i) => {
    const coords = northHouseCoords[i];
    if (!coords) return "";
    const isAsc = h.house === 1;

    const planetsTspans = (h.planets || [])
      .map((p, idx) => `<tspan x="${coords.textX}" dy="${idx === 0 ? 0 : 13}">${p}</tspan>`)
      .join("");

    return `
      <text x="${coords.numX}" y="${coords.numY}" text-anchor="middle" dominant-baseline="middle" fill="${isAsc ? ascColor : houseNumColor}" font-size="13" font-weight="bold">
        ${h.signId}
      </text>
      ${h.planets && h.planets.length > 0 ? `
        <text x="${coords.textX}" y="${coords.textY}" text-anchor="middle" dominant-baseline="middle" fill="${planetColor}" font-size="11" font-weight="600">
          ${planetsTspans}
        </text>
      ` : ""}
    `;
  }).join("");

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 400 400" style="width: 100%; height: auto; max-width: 100%; font-family: sans-serif; user-select: none;" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="400" fill="${fillBg}" stroke="${strokeColor}" stroke-width="4" rx="4" />
      <line x1="0" y1="0" x2="400" y2="400" stroke="${strokeColor}" stroke-width="2" />
      <line x1="400" y1="0" x2="0" y2="400" stroke="${strokeColor}" stroke-width="2" />
      <polygon points="200,0 0,200 200,400 400,200" fill="none" stroke="${strokeColor}" stroke-width="2" />
      <line x1="0" y1="0" x2="400" y2="0" stroke="${strokeColor}" stroke-width="4" />
      <line x1="0" y1="400" x2="400" y2="400" stroke="${strokeColor}" stroke-width="4" />
      <line x1="0" y1="0" x2="0" y2="400" stroke="${strokeColor}" stroke-width="4" />
      <line x1="400" y1="0" x2="400" y2="400" stroke="${strokeColor}" stroke-width="4" />
      <text x="200" y="195" text-anchor="middle" fill="${strokeColor}" font-size="11" font-weight="bold" opacity="0.65">
        ${data.title || data.chartType}
      </text>
      ${housesHtml}
    </svg>
  `;
}

export function renderCoverPageHtml(data: CanonicalKundali): string {
  return `
    <div style="width: 794px; height: 1123px; padding: 48px; background-color: #ffffff; color: #111827; display: flex; flex-direction: column; justify-content: space-between; border: 12px solid #8B1E0F; position: relative; box-sizing: border-box; font-family: sans-serif;">
      <div style="position: absolute; inset: 12px; border: 2px solid #D4AF37; pointer-events: none;"></div>

      <div style="text-align: center; padding-top: 32px; z-index: 10;">
        <div style="display: inline-block; border-bottom: 2px solid #D4AF37; padding-bottom: 8px;">
          <h1 style="font-size: 36px; font-family: serif; font-weight: bold; color: #8B1E0F; letter-spacing: 0.1em; text-transform: uppercase; margin: 0;">
            ${kundaliTheme.brandName}
          </h1>
        </div>
        <p style="font-size: 12px; letter-spacing: 0.15em; text-transform: uppercase; color: #D4AF37; font-weight: 600; margin-top: 8px;">
          ${kundaliTheme.brandTagline}
        </p>
      </div>

      <div style="margin-top: auto; margin-bottom: auto; text-align: center; z-index: 10;">
        <div style="width: 180px; height: 180px; margin: 0 auto 24px auto; border-radius: 50%; border: 4px solid #D4AF37; background-color: #FFFDF6; display: flex; align-items: center; justify-content: center;">
          <svg viewBox="0 0 100 100" style="width: 140px; height: 140px; fill: #8B1E0F;">
            <polygon points="50,10 90,90 10,90" fill="none" stroke="#8B1E0F" stroke-width="3" />
            <polygon points="50,90 90,10 10,10" fill="none" stroke="#D4AF37" stroke-width="3" />
            <circle cx="50" cy="50" r="12" fill="#8B1E0F" />
          </svg>
        </div>

        <h2 style="font-size: 28px; font-family: serif; font-weight: bold; color: #8B1E0F; text-transform: uppercase; margin: 0 0 8px 0;">
          संपूर्ण धार्मिकश्री प्रीमियम कुण्डली
        </h2>
        <p style="font-size: 14px; color: #4B5563; font-weight: 500; margin-bottom: 32px;">
          (Complete 200+ Page Vedic Astrology & Horoscope Report)
        </p>

        <div style="max-width: 440px; margin: 0 auto; background-color: #FFFDF6; border: 2px solid #E5D5B5; padding: 24px; border-radius: 6px; text-align: left; font-size: 14px;">
          <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #E5D5B5; padding-bottom: 8px; margin-bottom: 8px;">
            <span style="color: #6B7280; font-weight: 600; font-size: 12px; text-transform: uppercase;">नाम (Full Name)</span>
            <span style="font-weight: bold; color: #8B1E0F; font-size: 16px;">${data.person.fullName}</span>
          </div>
          <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #E5D5B5; padding-bottom: 8px; margin-bottom: 8px;">
            <span style="color: #6B7280; font-weight: 600; font-size: 12px; text-transform: uppercase;">जन्म तिथि (Date of Birth)</span>
            <span style="font-weight: 600; color: #1F2937;">${data.birth.dateOfBirth}</span>
          </div>
          <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #E5D5B5; padding-bottom: 8px; margin-bottom: 8px;">
            <span style="color: #6B7280; font-weight: 600; font-size: 12px; text-transform: uppercase;">जन्म समय (Time of Birth)</span>
            <span style="font-weight: 600; color: #1F2937;">${data.birth.timeOfBirth}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: #6B7280; font-weight: 600; font-size: 12px; text-transform: uppercase;">जन्म स्थान (Place of Birth)</span>
            <span style="font-weight: 600; color: #1F2937;">${data.location.name}</span>
          </div>
        </div>
      </div>

      <div style="text-align: center; padding-bottom: 16px; font-size: 12px; color: #4B5563; border-top: 1px solid #E5D5B5; padding-top: 16px; display: flex; justify-content: space-between; z-index: 10;">
        <span>वेबसाइट: www.dharmikshree.com</span>
        <span style="font-weight: 600; color: #8B1E0F;">सर्वाधिकार सुरक्षित © धार्मिकश्री</span>
        <span>संपर्क: +91 99999 99999</span>
      </div>
    </div>
  `;
}

export function renderTableOfContentsHtml(): string {
  const itemsHtml = KUNDALI_REPORT_MANIFEST.map((sec, idx) => `
    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #E5D5B5; padding-bottom: 6px; margin-bottom: 6px;">
      <div>
        <span style="font-weight: bold; color: #8B1E0F; width: 24px; display: inline-block;">${idx + 1}.</span>
        <span style="font-weight: 600; color: #1F2937;">${sec.titleHi}</span>
      </div>
      <span style="font-family: monospace; color: #6B7280; font-weight: bold;">P.${idx * 5 + 5}</span>
    </div>
  `).join("");

  return `
    <div style="width: 794px; height: 1123px; padding: 40px; background-color: #ffffff; color: #111827; display: flex; flex-direction: column; justify-content: space-between; border: 4px solid #8B1E0F; box-sizing: border-box; font-family: sans-serif;">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #D4AF37; padding-bottom: 12px; margin-bottom: 24px;">
        <div>
          <h2 style="font-size: 20px; font-family: serif; font-weight: bold; color: #8B1E0F; text-transform: uppercase; margin: 0;">विषय सूची (Table of Contents)</h2>
          <p style="font-size: 12px; color: #6B7280; margin: 4px 0 0 0;">Index of 200+ Page Complete Vedic Horoscope</p>
        </div>
        <span style="font-size: 12px; font-weight: bold; color: #8B1E0F; background-color: #FFFDF6; padding: 4px 12px; border: 1px solid #D4AF37; border-radius: 4px;">
          धार्मिकश्री
        </span>
      </div>

      <div style="margin-top: auto; margin-bottom: auto;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px 32px; font-size: 12px;">
          ${itemsHtml}
        </div>
      </div>

      <div style="border-top: 1px solid #E5D5B5; padding-top: 8px; font-size: 12px; color: #6B7280; display: flex; justify-content: space-between;">
        <span>धार्मिकश्री - 100% प्रामाणिक ग्रंथ आधारित फलादेश</span>
        <span>पृष्ठ 2-4</span>
      </div>
    </div>
  `;
}

export function renderBasicDetailsHtml(data: CanonicalKundali): string {
  return `
    <div style="width: 794px; height: 1123px; padding: 40px; background-color: #ffffff; color: #111827; display: flex; flex-direction: column; justify-content: space-between; border: 4px solid #8B1E0F; box-sizing: border-box; font-family: sans-serif;">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #D4AF37; padding-bottom: 12px; margin-bottom: 24px;">
        <div>
          <h2 style="font-size: 20px; font-family: serif; font-weight: bold; color: #8B1E0F; text-transform: uppercase; margin: 0;">मुख्य विवरण एवं अवकहड़ा चक्र</h2>
          <p style="font-size: 12px; color: #6B7280; margin: 4px 0 0 0;">Basic Birth Details, Avakhada & Panchang</p>
        </div>
        <span style="font-size: 12px; font-weight: bold; color: #8B1E0F; background-color: #FFFDF6; padding: 4px 12px; border: 1px solid #D4AF37; border-radius: 4px;">
          धार्मिकश्री
        </span>
      </div>

      <div style="display: flex; flex-direction: column; gap: 24px; margin-top: auto; margin-bottom: auto;">
        <!-- Birth Details -->
        <div style="border: 1px solid #E5D5B5; border-radius: 4px; overflow: hidden;">
          <div style="background-color: #8B1E0F; color: #ffffff; padding: 8px 16px; font-family: serif; font-weight: bold; font-size: 14px;">
            जन्म विवरण (Personal Birth Particulars)
          </div>
          <table style="width: 100%; font-size: 12px; text-align: left; border-collapse: collapse;">
            <tbody>
              <tr style="border-bottom: 1px solid #E5D5B5; background-color: #FFFDF6;">
                <td style="padding: 10px; font-weight: 600; color: #4B5563; width: 25%;">जातक का नाम:</td>
                <td style="padding: 10px; font-weight: bold; color: #8B1E0F; width: 25%;">${data.person.fullName}</td>
                <td style="padding: 10px; font-weight: 600; color: #4B5563; width: 25%;">लिंग:</td>
                <td style="padding: 10px; font-weight: 600; color: #1F2937; width: 25%;">${data.person.gender === "male" ? "पुरुष (Male)" : "स्त्री (Female)"}</td>
              </tr>
              <tr style="border-bottom: 1px solid #E5D5B5;">
                <td style="padding: 10px; font-weight: 600; color: #4B5563;">जन्म तिथि:</td>
                <td style="padding: 10px; font-weight: bold; color: #1F2937;">${data.birth.dateOfBirth}</td>
                <td style="padding: 10px; font-weight: 600; color: #4B5563;">जन्म समय:</td>
                <td style="padding: 10px; font-weight: bold; color: #1F2937;">${data.birth.timeOfBirth}</td>
              </tr>
              <tr style="border-bottom: 1px solid #E5D5B5; background-color: #FFFDF6;">
                <td style="padding: 10px; font-weight: 600; color: #4B5563;">जन्म स्थान:</td>
                <td style="padding: 10px; font-weight: 600; color: #1F2937;">${data.location.name}</td>
                <td style="padding: 10px; font-weight: 600; color: #4B5563;">समय क्षेत्र:</td>
                <td style="padding: 10px; font-weight: 600; color: #1F2937;">+${data.location.timezone} GMT</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Avakhada Chakra -->
        <div style="border: 1px solid #E5D5B5; border-radius: 4px; overflow: hidden;">
          <div style="background-color: #8B1E0F; color: #ffffff; padding: 8px 16px; font-family: serif; font-weight: bold; font-size: 14px;">
            अवग्रह / अवकहड़ा चक्र (Avakhada Chakra)
          </div>
          <table style="width: 100%; font-size: 12px; text-align: left; border-collapse: collapse;">
            <tbody>
              <tr style="border-bottom: 1px solid #E5D5B5; background-color: #FFFDF6;">
                <td style="padding: 10px; font-weight: 600; color: #4B5563; width: 25%;">वर्ण (Varna):</td>
                <td style="padding: 10px; font-weight: bold; color: #8B1E0F; width: 25%;">${data.avakhada.varna}</td>
                <td style="padding: 10px; font-weight: 600; color: #4B5563; width: 25%;">वश्य (Vashya):</td>
                <td style="padding: 10px; font-weight: bold; color: #8B1E0F; width: 25%;">${data.avakhada.vashya}</td>
              </tr>
              <tr style="border-bottom: 1px solid #E5D5B5;">
                <td style="padding: 10px; font-weight: 600; color: #4B5563;">योनि (Yoni):</td>
                <td style="padding: 10px; font-weight: 600; color: #1F2937;">${data.avakhada.yoni}</td>
                <td style="padding: 10px; font-weight: 600; color: #4B5563;">गण (Gana):</td>
                <td style="padding: 10px; font-weight: 600; color: #1F2937;">${data.avakhada.gana}</td>
              </tr>
              <tr style="border-bottom: 1px solid #E5D5B5; background-color: #FFFDF6;">
                <td style="padding: 10px; font-weight: 600; color: #4B5563;">नाड़ी (Nadi):</td>
                <td style="padding: 10px; font-weight: 600; color: #1F2937;">${data.avakhada.nadi}</td>
                <td style="padding: 10px; font-weight: 600; color: #4B5563;">पाया (Paya):</td>
                <td style="padding: 10px; font-weight: bold; color: #1F2937;">${data.avakhada.paya}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div style="border-top: 1px solid #E5D5B5; padding-top: 8px; font-size: 12px; color: #6B7280; display: flex; justify-content: space-between;">
        <span>धार्मिकश्री - 100% सटीक वैदिक गणनाएँ</span>
        <span>पृष्ठ 5</span>
      </div>
    </div>
  `;
}

export function renderPlanetaryPositionsHtml(data: CanonicalKundali): string {
  const d1ChartSvg = renderChartSvgHtml(data.charts.D1, 320, 320);
  const d9ChartSvg = renderChartSvgHtml(data.charts.D9, 320, 320);

  const rowsHtml = data.planets.map((p, idx) => `
    <tr style="border-bottom: 1px solid #E5D5B5; background-color: ${idx % 2 === 0 ? '#ffffff' : '#FFFDF6'};">
      <td style="padding: 8px; font-weight: bold; color: #8B1E0F;">
        ${p.nameHi} (${p.name})
      </td>
      <td style="padding: 8px; font-weight: 600; color: #1F2937;">${p.signNameHi}</td>
      <td style="padding: 8px; font-family: monospace;">${p.degree.toFixed(2)}°</td>
      <td style="padding: 8px; font-weight: 500;">${p.nakshatraName}</td>
      <td style="padding: 8px; font-family: monospace; font-weight: bold; color: #8B1E0F;">${p.nakshatraPada}</td>
      <td style="padding: 8px; font-weight: bold;">${p.house}</td>
      <td style="padding: 8px; font-weight: 500; color: #374151;">${p.relationship} (${p.dignity})</td>
    </tr>
  `).join("");

  return `
    <div style="width: 794px; height: 1123px; padding: 40px; background-color: #ffffff; color: #111827; display: flex; flex-direction: column; justify-content: space-between; border: 4px solid #8B1E0F; box-sizing: border-box; font-family: sans-serif;">
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #D4AF37; padding-bottom: 12px; margin-bottom: 16px;">
        <div>
          <h2 style="font-size: 20px; font-family: serif; font-weight: bold; color: #8B1E0F; text-transform: uppercase; margin: 0;">ग्रह स्थिति एवं लग्न/नवमांश कुण्डली</h2>
          <p style="font-size: 12px; color: #6B7280; margin: 4px 0 0 0;">Planetary Positions Table, Lagna (D1) & Navamsha (D9) Charts</p>
        </div>
        <span style="font-size: 12px; font-weight: bold; color: #8B1E0F; background-color: #FFFDF6; padding: 4px 12px; border: 1px solid #D4AF37; border-radius: 4px;">
          धार्मिकश्री
        </span>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin: 8px 0;">
        <div style="text-align: center; border: 1px solid #E5D5B5; padding: 12px; border-radius: 4px; background-color: #FFFDF6;">
          <h3 style="font-family: serif; font-weight: bold; font-size: 14px; color: #8B1E0F; margin: 0 0 8px 0; text-transform: uppercase;">लग्न कुण्डली (Lagna Chart - D1)</h3>
          ${d1ChartSvg}
        </div>
        <div style="text-align: center; border: 1px solid #E5D5B5; padding: 12px; border-radius: 4px; background-color: #FFFDF6;">
          <h3 style="font-family: serif; font-weight: bold; font-size: 14px; color: #8B1E0F; margin: 0 0 8px 0; text-transform: uppercase;">नवमांश कुण्डली (Navamsha Chart - D9)</h3>
          ${d9ChartSvg}
        </div>
      </div>

      <div style="border: 1px solid #E5D5B5; border-radius: 4px; overflow: hidden; margin: 8px 0;">
        <div style="background-color: #8B1E0F; color: #ffffff; padding: 8px 16px; font-family: serif; font-weight: bold; font-size: 12px; display: flex; justify-content: space-between;">
          <span>ग्रह स्पष्ट तालिका (Planetary Longitude & Dignity Table)</span>
          <span>लहरी अयनांश: 23°78'</span>
        </div>
        <table style="width: 100%; font-size: 12px; text-align: left; border-collapse: collapse;">
          <thead>
            <tr style="background-color: #FFFDF6; border-bottom: 1px solid #E5D5B5; color: #4B5563; font-weight: 600;">
              <th style="padding: 8px;">ग्रह</th>
              <th style="padding: 8px;">राशि</th>
              <th style="padding: 8px;">अंश</th>
              <th style="padding: 8px;">नक्षत्र</th>
              <th style="padding: 8px;">पद</th>
              <th style="padding: 8px;">भाव</th>
              <th style="padding: 8px;">अवस्था / संबंध</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </div>

      <div style="border-top: 1px solid #E5D5B5; padding-top: 8px; font-size: 12px; color: #6B7280; display: flex; justify-content: space-between;">
        <span>नोट: (व) = वक्री (Retrograde), (अ) = अस्त (Combust)</span>
        <span>पृष्ठ 8</span>
      </div>
    </div>
  `;
}
