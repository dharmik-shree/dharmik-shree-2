// HTML & Puppeteer PDF Renderer Engine

import React from "react";
import ReactDOMServer from "react-dom/server";
import { CanonicalKundali } from "../types";
import ReportCover from "@/components/kundali/pdf/ReportCover";
import TableOfContentsPage from "@/components/kundali/pdf/TableOfContentsPage";
import BasicDetailsPage from "@/components/kundali/pdf/BasicDetailsPage";
import PlanetaryPositionsPage from "@/components/kundali/pdf/PlanetaryPositionsPage";
import LagnaReportPage from "@/components/kundali/pdf/LagnaReportPage";
import DoshasPage from "@/components/kundali/pdf/DoshasPage";
import RemediesPage from "@/components/kundali/pdf/RemediesPage";

export function compileReportHtml(data: CanonicalKundali): string {
  // Render pages to HTML strings
  const pages = [
    ReactDOMServer.renderToStaticMarkup(React.createElement(ReportCover, { data })),
    ReactDOMServer.renderToStaticMarkup(React.createElement(TableOfContentsPage)),
    ReactDOMServer.renderToStaticMarkup(React.createElement(BasicDetailsPage, { data })),
    ReactDOMServer.renderToStaticMarkup(React.createElement(PlanetaryPositionsPage, { data })),
    ReactDOMServer.renderToStaticMarkup(React.createElement(LagnaReportPage, { data })),
    ReactDOMServer.renderToStaticMarkup(React.createElement(DoshasPage, { data })),
    ReactDOMServer.renderToStaticMarkup(React.createElement(RemediesPage, { data })),
  ];

  return `
    <!DOCTYPE html>
    <html lang="hi">
    <head>
      <meta charset="UTF-8">
      <title>Dharmik Shree Premium Kundali Report</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&family=Hind:wght@400;600;700&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
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
          font-family: 'Hind', 'Inter', sans-serif;
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
