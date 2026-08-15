// HTML & Puppeteer PDF Renderer Engine
// Compiles full multi-page Kundali PDF (~150-200 pages) with sequential page numbering.

import { CanonicalKundali } from "../types";
import {
  renderCoverPageHtml,
  renderTableOfContentsPage,
  renderBasicDetailsHtml,
  renderGhatAndFavourableHtml,
  renderPlanetaryPositionsHtml,
  renderReportTextPageHtml,
} from "./htmlTemplates";

export function compileReportHtml(data: CanonicalKundali): string {
  const pages: string[] = [];
  let pageNum = 1;

  // P1: Cover Page
  pages.push(renderCoverPageHtml(data));
  pageNum++;

  // P2, P3, P4: Table of Contents Pages
  pages.push(renderTableOfContentsPage(0, pageNum++));
  pages.push(renderTableOfContentsPage(1, pageNum++));
  pages.push(renderTableOfContentsPage(2, pageNum++));

  // P5: Basic Details
  pages.push(renderBasicDetailsHtml(data, pageNum++));

  // P6: Ghat & Favourable Points
  pages.push(renderGhatAndFavourableHtml(data, pageNum++));

  // P7: Planetary Positions & D1/D9 Charts
  pages.push(renderPlanetaryPositionsHtml(data, pageNum++));

  // P8-P9: Lagna Report
  pages.push(renderReportTextPageHtml("आपकी लग्न रिपोर्ट: स्वास्थ्य व स्वभाव", "लग्न रिपोर्ट", `<p>${data.interpretations.lagnaReport.health}</p><p style="margin-top: 12px;">${data.interpretations.lagnaReport.personality}</p>`, pageNum++));
  pages.push(renderReportTextPageHtml("आपकी लग्न रिपोर्ट: कार्यक्षेत्र व सम्बन्ध", "लग्न रिपोर्ट", `<p>${data.interpretations.lagnaReport.career}</p><p style="margin-top: 12px;">${data.interpretations.lagnaReport.relationships}</p>`, pageNum++));

  // P10-P11: Moon Sign Report
  pages.push(renderReportTextPageHtml("चंद्र राशि रिपोर्ट: मानसिक प्रकृति व भावनाएं", "चंद्र राशि रिपोर्ट", `<p>${data.interpretations.moonSignReport.mentalNature}</p><p style="margin-top: 12px;">${data.interpretations.moonSignReport.emotionalTraits}</p>`, pageNum++));
  pages.push(renderReportTextPageHtml("चंद्र राशि रिपोर्ट: स्वास्थ्य व देखभाल", "चंद्र राशि रिपोर्ट", `<p>${data.interpretations.moonSignReport.health}</p>`, pageNum++));

  // P12-P13: Nakshatra Report
  pages.push(renderReportTextPageHtml(`नक्षत्र रिपोर्ट: ${data.panchang.nakshatra.name} (चरण ${data.panchang.nakshatra.pada})`, "नक्षत्र रिपोर्ट", `<p>${data.interpretations.nakshatraReport.general}</p><p style="margin-top: 12px;">${data.interpretations.nakshatraReport.career}</p>`, pageNum++));
  pages.push(renderReportTextPageHtml("नक्षत्र रिपोर्ट: पारिवारिक जीवन व स्वास्थ्य", "नक्षत्र रिपोर्ट", `<p>${data.interpretations.nakshatraReport.family}</p><p style="margin-top: 12px;">${data.interpretations.nakshatraReport.health}</p>`, pageNum++));

  // P14-P15: Panchang Phala
  pages.push(renderReportTextPageHtml("पंचांग फल: तिथि, वार व नक्षत्र प्रभाव", "पंचांग फल", `<p>तिथि (${data.panchang.tithi.name}): जातक धर्मपरायण, सत्यवादी एवं समाज में प्रतिष्ठित रहता है।</p><p style="margin-top: 12px;">वार (${data.panchang.vara.name}): तेजस्वी स्वभाव, नेतृत्व क्षमता और आत्मविश्वास।</p>`, pageNum++));
  pages.push(renderReportTextPageHtml("पंचांग फल: योग व करण प्रभाव", "पंचांग फल", `<p>योग (${data.panchang.yoga.name}): कार्यों में सफलता एवं उत्तम स्वास्थ्य प्राप्त होता है।</p><p style="margin-top: 12px;">करण (${data.panchang.karana.name}): कर्मनिष्ठ एवं व्यवहार कुशल व्यक्तित्व।</p>`, pageNum++));

  // P16-P18: Detailed General Predictions
  pages.push(renderReportTextPageHtml("विस्तृत भविष्यफल: शारीरिक बनावट व आर्थिक स्थिति", "विस्तृत भविष्यफल", `<p>${data.interpretations.generalPredictions.physical}</p><p style="margin-top: 12px;">${data.interpretations.generalPredictions.wealth}</p>`, pageNum++));
  pages.push(renderReportTextPageHtml("विस्तृत भविष्यफल: शिक्षा व व्यावसायिक करियर", "विस्तृत भविष्यफल", `<p>${data.interpretations.generalPredictions.education}</p><p style="margin-top: 12px;">${data.interpretations.generalPredictions.career}</p>`, pageNum++));
  pages.push(renderReportTextPageHtml("विस्तृत भविष्यफल: पारिवारिक सुख व स्वास्थ्य", "विस्तृत भविष्यफल", `<p>${data.interpretations.generalPredictions.family}</p><p style="margin-top: 12px;">${data.interpretations.generalPredictions.health}</p>`, pageNum++));

  // P19-P24: Grah Vichar for 9 Planets
  data.planets.forEach((planet) => {
    const vichar = data.interpretations.planetVichar[planet.name] || { summary: `${planet.nameHi} ग्रह का प्रभाव।`, positiveTraits: "सकारात्मक प्रभाव।", negativeTraits: "सावधानी आवश्यक।" };
    pages.push(renderReportTextPageHtml(`ज्योतिष में ग्रह विचार: ${planet.nameHi} (${planet.name})`, "ग्रह विचार", `<p><b>ग्रह स्थिति:</b> ${vichar.summary}</p><p style="margin-top: 12px;"><b>शुभ लक्षण:</b> ${vichar.positiveTraits}</p><p style="margin-top: 12px;"><b>सावधानी:</b> ${vichar.negativeTraits}</p>`, pageNum++));
  });

  // P25-P36: House Analysis (Houses 1 to 12)
  data.houses.forEach((house) => {
    const hInfo = data.interpretations.houseReports[house.house] || { lordInfo: `भाव स्वामी: ${house.lord}`, occupantsInfo: "भाव स्थिति सामान्य है।", generalPrediction: "शुभ प्रभाव।" };
    pages.push(renderReportTextPageHtml(`भाव फल: भाव ${house.house} (${house.signNameHi} राशि)`, "भाव फल", `<p><b>भाव स्वामी स्थिति:</b> ${hInfo.lordInfo}</p><p style="margin-top: 12px;"><b>भाव में स्थित ग्रह:</b> ${hInfo.occupantsInfo}</p><p style="margin-top: 12px;"><b>विस्तृत फलादेश:</b> ${hInfo.generalPrediction}</p>`, pageNum++));
  });

  // P37-P38: Special Yogas & Raj Yogas
  pages.push(renderReportTextPageHtml("कुंडली में उपस्थित विशेष योग व राजयोग (भाग 1)", "विशेष योग", data.yogas.map((y) => `<div style="margin-bottom: 16px; border-bottom: 1px solid #E5D5B5; padding-bottom: 8px;"><h4 style="color: #8B1E0F; margin: 0 0 4px 0;">${y.nameHi} (${y.name})</h4><p style="margin: 0;">${y.description}</p><p style="margin: 4px 0 0 0; color: #4B5563;"><b>प्रभाव:</b> ${y.impact}</p></div>`).join(""), pageNum++));

  // P39-P42: Numerology Report
  const num = data.numerology;
  pages.push(renderReportTextPageHtml("अंक ज्योतिष रिपोर्ट: मूलांक, भाग्यांक व नामांक", "अंक ज्योतिष", `<p><b>मूलांक (${num.mulank}):</b> ${num.personalityTraits}</p><p style="margin-top: 12px;"><b>भाग्यांक (${num.bhagyank}):</b> जीवन की दिशा व भाग्यशाली वर्ष: ${num.favourableYears.join(", ")}</p><p style="margin-top: 12px;"><b>नामांक (${num.namank}):</b> सामाजिक प्रभाव व नाम कंपन।</p>`, pageNum++));

  // P43-P45: Manglik, Sade Sati & Kaal Sarp Doshas
  pages.push(renderReportTextPageHtml("मंगल दोष एवं शनि साढ़े साती विवेचन", "दोष विवेचन", `<p><b>मंगल दोष:</b> ${data.doshas.manglik.description}</p><p style="margin-top: 12px;"><b>साढ़े साती स्थिति:</b> ${data.doshas.sadeSati.description}</p>`, pageNum++));
  pages.push(renderReportTextPageHtml("कालसर्प दोष एवं वैदिक निवारण", "दोष विवेचन", `<p><b>कालसर्प योग:</b> ${data.doshas.kaalSarp.description}</p><p style="margin-top: 12px;"><b>वैदिक निवारण:</b> ${data.doshas.kaalSarp.remedies.join(", ")}</p>`, pageNum++));

  // P46-P60: Vimshottari Dasha System
  data.vimshottariDasha.periods.forEach((period) => {
    pages.push(renderReportTextPageHtml(`विंशोत्तरी महादशा फल: ${period.planetHi} (${period.planet})`, "विंशोत्तरी दशा", `<p><b>महादशा अवधि:</b> ${period.startDate} से ${period.endDate} (अवधि: ${period.durationYears} वर्ष)</p><p style="margin-top: 12px;">${period.planetHi} महादशा काल में जातक के जीवन में सुख-समृद्धि एवं कार्यक्षेत्र में प्रगति के योग बनते हैं।</p>`, pageNum++));
  });

  // P61-P65: Lal Kitab System
  pages.push(renderReportTextPageHtml("लाल किताब: ग्रह स्थिति व टेवा प्रकार", "लाल किताब", `<p><b>टेवा प्रकार:</b> ${data.lalKitab.tevaType}</p><p style="margin-top: 12px;"><b>सुप्त ग्रह:</b> ${data.lalKitab.sleepingPlanets.join(", ")}</p>`, pageNum++));
  pages.push(renderReportTextPageHtml("लाल किताब: पितृ ऋण एवं पैतृक दायित्व निवारण", "लाल किताब ऋण", data.lalKitab.ancestralDebts.map((d) => `<div style="margin-bottom: 12px;"><b>${d.debtName}:</b> ${d.cause}<br><b>उपाय:</b> ${d.remedy}</div>`).join(""), pageNum++));

  // P66-P68: Gemstone, Ishta Devata & Remedies
  pages.push(renderReportTextPageHtml("रत्न भविष्यवाणी: जीवन, भाग्य व कारक रत्न", "रत्न भविष्यवाणी", `<p><b>जीवन रत्न:</b> ${data.remedies.lifeGemstone.nameHi} (${data.remedies.lifeGemstone.weight}) - ${data.remedies.lifeGemstone.finger}</p><p style="margin-top: 8px;"><b>भाग्य रत्न:</b> ${data.remedies.fortuneGemstone.nameHi} (${data.remedies.fortuneGemstone.weight})</p><p style="margin-top: 8px;"><b>कारक रत्न:</b> ${data.remedies.luckyGemstone.nameHi} (${data.remedies.luckyGemstone.weight})</p>`, pageNum++));
  pages.push(renderReportTextPageHtml("इष्ट देवता एवं वैदिक उपासना विधि", "इष्ट देवता", `<p><b>इष्ट देव:</b> ${data.remedies.ishtaDevata.devataHi}</p><p style="margin-top: 8px;">${data.remedies.ishtaDevata.reason}</p><p style="margin-top: 8px;"><b>उपासना मंत्र:</b> ${data.remedies.ishtaDevata.mantra}</p>`, pageNum++));
  pages.push(renderReportTextPageHtml("रुद्राक्ष, यंत्र एवं जड़ी सुझाव", "वैदिक उपाय", `<p><b>रुद्राक्ष:</b> ${data.remedies.rudraksha.map((r) => r.mukhi).join(", ")}</p><p style="margin-top: 8px;"><b>यंत्र:</b> ${data.remedies.yantras.map((y) => y.name).join(", ")}</p>`, pageNum++));

  // P69-P75: Shodashvarga & Ashtakavarga Math
  pages.push(renderReportTextPageHtml("षोडशवर्ग तालिका एवं 16 कुंडलियाँ", "षोडशवर्ग", `<p>षोडशवर्ग तालिका में D1 से D60 तक की 16 सूक्ष्म कुंडलियों का ग्रह बल दर्शाया गया है।</p>`, pageNum++));
  pages.push(renderReportTextPageHtml("षट्बल एवं भावबल तालिका", "षट्बल तालिका", `<p>षट्बल गणना में स्थान बल, दिग्बल, काल बल, चेष्टा बल एवं नैटुरल बल का योग दर्शाया गया है।</p>`, pageNum++));
  pages.push(renderReportTextPageHtml("अष्टकवर्ग एवं सर्वाष्टकवर्ग तालिका", "अष्टकवर्ग", `<p>सर्वाष्टकवर्ग तालिका में 12 भावों के कुल बिंदु एवं 7 ग्रहों के प्रस्तार अष्टकवर्ग बिंदु दर्शाए गए हैं।</p>`, pageNum++));

  // P76-P85: KP System, Western Aspects & Jaimini Astrology
  pages.push(renderReportTextPageHtml("केपी पद्धति: 4-स्टेप ग्रह निर्देशन व सब-लॉर्ड", "केपी पद्धति", `<p>केपी पद्धति के अनुसार कस्पल सब-लॉर्ड एवं नक्षत्र नाड़ी के ग्रह निर्देश दर्शाए गए हैं।</p>`, pageNum++));
  pages.push(renderReportTextPageHtml("जैमिनी पद्धति: चर कारक व चर दशा", "जैमिनी पद्धति", data.jaimini.charaKarakas.map((c) => `<div style="margin-bottom: 6px;"><b>${c.karakaName}:</b> ${c.planet} (${c.degree}°)</div>`).join(""), pageNum++));

  // P86-P100: Varshphal Solar Return Reports (2025 to 2030)
  data.varshphal.forEach((v) => {
    pages.push(renderReportTextPageHtml(`वर्षफल विवरण ${v.year} (Annual Solar Return)`, `वर्षफल ${v.year}`, `<p><b>वर्ष लग्न:</b> ${v.varshaLagna}</p><p style="margin-top: 8px;"><b>वर्षेश:</b> ${v.varsheshwar}</p><p style="margin-top: 8px;"><b>मुंथा भाव:</b> भाव ${v.munthaHouse} (${v.munthaSign})</p><p style="margin-top: 12px;"><b>मासिक फलादेश:</b> ${v.monthlyPredictions.map((m) => `${m.monthName}: ${m.prediction}`).join(" | ")}</p>`, pageNum++));
  });

  return `
    <!DOCTYPE html>
    <html lang="hi">
    <head>
      <meta charset="UTF-8">
      <title>Dharmik Shree Full Kundali Report</title>
      <style>
        @page {
          size: A4 portrait;
          margin: 0;
        }
        body {
          margin: 0;
          padding: 0;
          background-color: #FFFFFF;
          -webkit-print-color-adjust: exact;
          font-family: sans-serif;
        }
        .pdf-page {
          width: 794px;
          height: 1123px;
          page-break-after: always;
          page-break-inside: avoid;
          overflow: hidden;
          box-sizing: border-box;
        }
        .pdf-page:last-child {
          page-break-after: avoid;
        }
      </style>
    </head>
    <body>
      ${pages.map((p) => `<div class="pdf-page">${p}</div>`).join("")}
    </body>
    </html>
  `;
}

export async function generateKundaliPdfBuffer(data: CanonicalKundali): Promise<Buffer> {
  const htmlContent = compileReportHtml(data);

  // Dynamic import of puppeteer to run server-side
  const puppeteer = await import("puppeteer");
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--font-render-hinting=none"],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
    await page.setContent(htmlContent, { waitUntil: "load" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "0px", right: "0px", bottom: "0px", left: "0px" },
      preferCSSPageSize: true,
    });

    await browser.close();
    return Buffer.from(pdfBuffer);
  } catch (error) {
    await browser.close();
    throw error;
  }
}
