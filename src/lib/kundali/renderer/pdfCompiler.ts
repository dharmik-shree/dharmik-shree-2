// HTML & Puppeteer PDF Renderer Engine
// Uses pure string template generators to ensure 100% Vercel & Turbopack build compatibility.

import { CanonicalKundali } from "../types";
import {
  renderCoverPageHtml,
  renderTableOfContentsHtml,
  renderBasicDetailsHtml,
  renderPlanetaryPositionsHtml,
} from "./htmlTemplates";

export function compileReportHtml(data: CanonicalKundali): string {
  const pages = [
    renderCoverPageHtml(data),
    renderTableOfContentsHtml(),
    renderBasicDetailsHtml(data),
    renderPlanetaryPositionsHtml(data),
  ];

  return `
    <!DOCTYPE html>
    <html lang="hi">
    <head>
      <meta charset="UTF-8">
      <title>Dharmik Shree Premium Kundali Report</title>
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
