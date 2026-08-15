// Complete HTML & SVG Template Generator for Full Branded Kundali Report
// Generates ALL 150+ pages matching the reference PDF structure with sequential page numbering.

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

  const housesHtml = (data.houses || []).map((h, i) => {
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

export function renderPageHeader(title: string, subtitle: string): string {
  return `
    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #D4AF37; padding-bottom: 10px; margin-bottom: 18px;">
      <div>
        <h2 style="font-size: 18px; font-family: serif; font-weight: bold; color: #8B1E0F; text-transform: uppercase; margin: 0;">${title}</h2>
        <p style="font-size: 11px; color: #6B7280; margin: 2px 0 0 0;">${subtitle}</p>
      </div>
      <span style="font-size: 11px; font-weight: bold; color: #8B1E0F; background-color: #FFFDF6; padding: 4px 10px; border: 1px solid #D4AF37; border-radius: 4px;">
        ${kundaliTheme.brandName}
      </span>
    </div>
  `;
}

export function renderPageFooter(pageLabel: string, pageNum: number): string {
  return `
    <div style="border-top: 1px solid #E5D5B5; padding-top: 8px; font-size: 11px; color: #6B7280; display: flex; justify-content: space-between;">
      <span>धार्मिकश्री - ${pageLabel}</span>
      <span>पृष्ठ ${pageNum}</span>
    </div>
  `;
}

export function wrapInPageContainer(contentHtml: string, pageLabel: string, pageNum: number, headerTitle: string, headerSubtitle: string): string {
  return `
    <div style="width: 794px; height: 1123px; padding: 40px; background-color: #ffffff; color: #111827; display: flex; flex-direction: column; justify-content: space-between; border: 4px solid #8B1E0F; box-sizing: border-box; font-family: sans-serif;">
      ${renderPageHeader(headerTitle, headerSubtitle)}
      <div style="margin-top: auto; margin-bottom: auto;">
        ${contentHtml}
      </div>
      ${renderPageFooter(pageLabel, pageNum)}
    </div>
  `;
}

// 1. Cover Page (P1)
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

// 2. Table of Contents Pages (P2 to P4)
export function renderTableOfContentsPage(pageIndex: number, pageNum: number): string {
  const pageSize = 13;
  const startIdx = pageIndex * pageSize;
  const pageItems = KUNDALI_REPORT_MANIFEST.slice(startIdx, startIdx + pageSize);

  const itemsHtml = pageItems.map((sec, idx) => `
    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #E5D5B5; padding-bottom: 6px; margin-bottom: 6px;">
      <div>
        <span style="font-weight: bold; color: #8B1E0F; width: 30px; display: inline-block;">${startIdx + idx + 1}.</span>
        <span style="font-weight: 600; color: #1F2937;">${sec.titleHi} (${sec.title})</span>
      </div>
      <span style="font-family: monospace; color: #8B1E0F; font-weight: bold;">P.${(startIdx + idx) * 4 + 5}</span>
    </div>
  `).join("");

  const content = `
    <div style="display: flex; flex-direction: column; gap: 8px;">
      ${itemsHtml}
    </div>
  `;

  return wrapInPageContainer(content, `विषय सूची (${pageIndex + 1})`, pageNum, "विषय सूची (Table of Contents)", `Page ${pageNum} - Index of Full Report`);
}

// 3. Basic Details Page (P5)
export function renderBasicDetailsHtml(data: CanonicalKundali, pageNum: number): string {
  const content = `
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <div style="border: 1px solid #E5D5B5; border-radius: 4px; overflow: hidden;">
        <div style="background-color: #8B1E0F; color: #ffffff; padding: 8px 16px; font-family: serif; font-weight: bold; font-size: 13px;">
          जन्म विवरण (Personal Birth Particulars)
        </div>
        <table style="width: 100%; font-size: 12px; text-align: left; border-collapse: collapse;">
          <tbody>
            <tr style="border-bottom: 1px solid #E5D5B5; background-color: #FFFDF6;">
              <td style="padding: 8px; font-weight: 600; color: #4B5563; width: 25%;">जातक का नाम:</td>
              <td style="padding: 8px; font-weight: bold; color: #8B1E0F; width: 25%;">${data.person.fullName}</td>
              <td style="padding: 8px; font-weight: 600; color: #4B5563; width: 25%;">लिंग:</td>
              <td style="padding: 8px; font-weight: 600; color: #1F2937; width: 25%;">${data.person.gender === "male" ? "पुरुष (Male)" : "स्त्री (Female)"}</td>
            </tr>
            <tr style="border-bottom: 1px solid #E5D5B5;">
              <td style="padding: 8px; font-weight: 600; color: #4B5563;">जन्म तिथि:</td>
              <td style="padding: 8px; font-weight: bold; color: #1F2937;">${data.birth.dateOfBirth}</td>
              <td style="padding: 8px; font-weight: 600; color: #4B5563;">जन्म समय:</td>
              <td style="padding: 8px; font-weight: bold; color: #1F2937;">${data.birth.timeOfBirth}</td>
            </tr>
            <tr style="border-bottom: 1px solid #E5D5B5; background-color: #FFFDF6;">
              <td style="padding: 8px; font-weight: 600; color: #4B5563;">जन्म स्थान:</td>
              <td style="padding: 8px; font-weight: 600; color: #1F2937;">${data.location.name}</td>
              <td style="padding: 8px; font-weight: 600; color: #4B5563;">समय क्षेत्र:</td>
              <td style="padding: 8px; font-weight: 600; color: #1F2937;">+${data.location.timezone} GMT</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style="border: 1px solid #E5D5B5; border-radius: 4px; overflow: hidden;">
        <div style="background-color: #8B1E0F; color: #ffffff; padding: 8px 16px; font-family: serif; font-weight: bold; font-size: 13px;">
          अवग्रह / अवकहड़ा चक्र (Avakhada Chakra)
        </div>
        <table style="width: 100%; font-size: 12px; text-align: left; border-collapse: collapse;">
          <tbody>
            <tr style="border-bottom: 1px solid #E5D5B5; background-color: #FFFDF6;">
              <td style="padding: 8px; font-weight: 600; color: #4B5563; width: 25%;">वर्ण (Varna):</td>
              <td style="padding: 8px; font-weight: bold; color: #8B1E0F; width: 25%;">${data.avakhada.varna}</td>
              <td style="padding: 8px; font-weight: 600; color: #4B5563; width: 25%;">वश्य (Vashya):</td>
              <td style="padding: 8px; font-weight: bold; color: #8B1E0F; width: 25%;">${data.avakhada.vashya}</td>
            </tr>
            <tr style="border-bottom: 1px solid #E5D5B5;">
              <td style="padding: 8px; font-weight: 600; color: #4B5563;">योनि (Yoni):</td>
              <td style="padding: 8px; font-weight: 600; color: #1F2937;">${data.avakhada.yoni}</td>
              <td style="padding: 8px; font-weight: 600; color: #4B5563;">गण (Gana):</td>
              <td style="padding: 8px; font-weight: 600; color: #1F2937;">${data.avakhada.gana}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: 600; color: #4B5563;">नाड़ी (Nadi):</td>
              <td style="padding: 8px; font-weight: 600; color: #1F2937;">${data.avakhada.nadi}</td>
              <td style="padding: 8px; font-weight: 600; color: #4B5563;">पाया (Paya):</td>
              <td style="padding: 8px; font-weight: bold; color: #1F2937;">${data.avakhada.paya}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;

  return wrapInPageContainer(content, "मुख्य विवरण", pageNum, "मुख्य विवरण एवं अवकहड़ा चक्र", "Basic Birth Details, Avakhada & Panchang");
}

// 4. Ghat & Favourable Points (P6)
export function renderGhatAndFavourableHtml(data: CanonicalKundali, pageNum: number): string {
  const f = data.ghatChakra.favourablePoints;
  const content = `
    <div style="display: flex; flex-direction: flex-col; gap: 20px;">
      <div style="border: 1px solid #E5D5B5; border-radius: 4px; overflow: hidden;">
        <div style="background-color: #8B1E0F; color: #ffffff; padding: 8px 16px; font-family: serif; font-weight: bold; font-size: 13px;">
          घात (अशुभ तत्व - Inauspicious Elements)
        </div>
        <table style="width: 100%; font-size: 12px; text-align: left; border-collapse: collapse;">
          <tbody>
            <tr style="border-bottom: 1px solid #E5D5B5; background-color: #FFFDF6;">
              <td style="padding: 8px; font-weight: 600; color: #4B5563; width: 25%;">घात मास (Month):</td>
              <td style="padding: 8px; font-weight: bold; color: #8B1E0F; width: 25%;">${data.ghatChakra.ghatMonth}</td>
              <td style="padding: 8px; font-weight: 600; color: #4B5563; width: 25%;">घात तिथि (Tithi):</td>
              <td style="padding: 8px; font-weight: bold; color: #8B1E0F; width: 25%;">${data.ghatChakra.ghatTithi}</td>
            </tr>
            <tr style="border-bottom: 1px solid #E5D5B5;">
              <td style="padding: 8px; font-weight: 600; color: #4B5563;">घात वार (Day):</td>
              <td style="padding: 8px; font-weight: 600; color: #1F2937;">${data.ghatChakra.ghatDay}</td>
              <td style="padding: 8px; font-weight: 600; color: #4B5563;">घात नक्षत्र:</td>
              <td style="padding: 8px; font-weight: 600; color: #1F2937;">${data.ghatChakra.ghatNakshatra}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style="border: 1px solid #E5D5B5; border-radius: 4px; overflow: hidden;">
        <div style="background-color: #8B1E0F; color: #ffffff; padding: 8px 16px; font-family: serif; font-weight: bold; font-size: 13px;">
          अनुकूल बिंदु (Favourable & Lucky Points)
        </div>
        <table style="width: 100%; font-size: 12px; text-align: left; border-collapse: collapse;">
          <tbody>
            <tr style="border-bottom: 1px solid #E5D5B5; background-color: #FFFDF6;">
              <td style="padding: 8px; font-weight: 600; color: #4B5563; width: 25%;">शुभ अंक (Lucky Numbers):</td>
              <td style="padding: 8px; font-weight: bold; color: #8B1E0F; width: 25%;">${f.luckyNumbers.join(", ")}</td>
              <td style="padding: 8px; font-weight: 600; color: #4B5563; width: 25%;">शुभ रंग (Lucky Colors):</td>
              <td style="padding: 8px; font-weight: bold; color: #8B1E0F; width: 25%;">${f.luckyColors.join(", ")}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: 600; color: #4B5563;">शुभ दिन (Lucky Days):</td>
              <td style="padding: 8px; font-weight: 600; color: #1F2937;">${f.luckyDays.join(", ")}</td>
              <td style="padding: 8px; font-weight: 600; color: #4B5563;">शुभ रत्न (Lucky Gems):</td>
              <td style="padding: 8px; font-weight: 600; color: #1F2937;">${f.luckyGems.join(", ")}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;

  return wrapInPageContainer(content, "घात व अनुकूल बिंदु", pageNum, "घात चक्र एवं अनुकूल बिंदु", "Ghat Elements & Lucky Astrological Points");
}

// 5. Planetary Positions & D1/D9 Charts (P8)
export function renderPlanetaryPositionsHtml(data: CanonicalKundali, pageNum: number): string {
  const d1ChartSvg = renderChartSvgHtml(data.charts.D1, 300, 300);
  const d9ChartSvg = renderChartSvgHtml(data.charts.D9, 300, 300);

  const rowsHtml = data.planets.map((p, idx) => `
    <tr style="border-bottom: 1px solid #E5D5B5; background-color: ${idx % 2 === 0 ? '#ffffff' : '#FFFDF6'};">
      <td style="padding: 6px 8px; font-weight: bold; color: #8B1E0F;">${p.nameHi} (${p.name})</td>
      <td style="padding: 6px 8px; font-weight: 600;">${p.signNameHi}</td>
      <td style="padding: 6px 8px; font-family: monospace;">${p.degree.toFixed(2)}°</td>
      <td style="padding: 6px 8px;">${p.nakshatraName}</td>
      <td style="padding: 6px 8px; font-family: monospace; font-weight: bold; color: #8B1E0F;">${p.nakshatraPada}</td>
      <td style="padding: 6px 8px; font-weight: bold;">${p.house}</td>
      <td style="padding: 6px 8px; color: #374151;">${p.relationship} (${p.dignity})</td>
    </tr>
  `).join("");

  const content = `
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
        <div style="text-align: center; border: 1px solid #E5D5B5; padding: 10px; border-radius: 4px; background-color: #FFFDF6;">
          <h3 style="font-family: serif; font-weight: bold; font-size: 13px; color: #8B1E0F; margin: 0 0 6px 0;">लग्न कुण्डली (Lagna Chart - D1)</h3>
          ${d1ChartSvg}
        </div>
        <div style="text-align: center; border: 1px solid #E5D5B5; padding: 10px; border-radius: 4px; background-color: #FFFDF6;">
          <h3 style="font-family: serif; font-weight: bold; font-size: 13px; color: #8B1E0F; margin: 0 0 6px 0;">नवमांश कुण्डली (Navamsha Chart - D9)</h3>
          ${d9ChartSvg}
        </div>
      </div>

      <div style="border: 1px solid #E5D5B5; border-radius: 4px; overflow: hidden;">
        <div style="background-color: #8B1E0F; color: #ffffff; padding: 6px 12px; font-family: serif; font-weight: bold; font-size: 11px;">
          ग्रह स्पष्ट तालिका (Planetary Longitude Table)
        </div>
        <table style="width: 100%; font-size: 11px; text-align: left; border-collapse: collapse;">
          <thead>
            <tr style="background-color: #FFFDF6; border-bottom: 1px solid #E5D5B5; color: #4B5563;">
              <th style="padding: 6px 8px;">ग्रह</th>
              <th style="padding: 6px 8px;">राशि</th>
              <th style="padding: 6px 8px;">अंश</th>
              <th style="padding: 6px 8px;">नक्षत्र</th>
              <th style="padding: 6px 8px;">पद</th>
              <th style="padding: 6px 8px;">भाव</th>
              <th style="padding: 6px 8px;">अवस्था</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </div>
    </div>
  `;

  return wrapInPageContainer(content, "ग्रह स्थिति व कुण्डली", pageNum, "ग्रह स्थिति एवं लग्न/नवमांश कुण्डली", "Planetary Positions Table, Lagna (D1) & Navamsha (D9) Charts");
}

// Helper to generate generic text report page
export function renderReportTextPageHtml(title: string, category: string, bodyTextHtml: string, pageNum: number): string {
  const content = `
    <div style="display: flex; flex-direction: column; gap: 16px; font-size: 12px; leading-height: 1.6;">
      <div style="background-color: #FFFDF6; border-left: 4px solid #8B1E0F; padding: 16px; border-radius: 4px;">
        <h3 style="font-family: serif; font-weight: bold; font-size: 15px; color: #8B1E0F; margin: 0 0 6px 0;">${title}</h3>
        <p style="color: #4B5563; margin: 0;">वैदिक ग्रंथ एवं ज्योतिषीय सिद्धांतों पर आधारित फलादेश विश्लेषण।</p>
      </div>
      <div style="border: 1px solid #E5D5B5; padding: 20px; border-radius: 4px; background-color: #ffffff; color: #1F2937;">
        ${bodyTextHtml}
      </div>
    </div>
  `;

  return wrapInPageContainer(content, category, pageNum, title, `${category} Analysis & Predictions`);
}
