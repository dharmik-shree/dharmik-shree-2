// AstrologyAPI Kundali PDF Compiler
// Note: PDF reports are generated via Astrology API (basic_horoscope_pdf) and stored in Supabase.

import { CanonicalKundali } from "../types";

export function compileReportHtml(data: CanonicalKundali): string {
  return `<!DOCTYPE html><html><body><h1>Kundali Report - ${data.person?.fullName || "User"}</h1></body></html>`;
}

export async function generateKundaliPdfBuffer(data: CanonicalKundali): Promise<Buffer> {
  console.warn("Legacy Puppeteer PDF generation is deprecated. Using Astrology API instead.");
  return Buffer.from("Astrology API PDF Generation active");
}
