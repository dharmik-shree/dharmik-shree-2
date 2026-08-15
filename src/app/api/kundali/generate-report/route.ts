import { NextResponse } from "next/server";
import { generateKundaliPdfBuffer } from "@/lib/kundali/renderer/pdfCompiler";
import { CanonicalKundali } from "@/lib/kundali/types";

declare global {
  var _reportJobsMap: Map<string, { status: "processing" | "completed" | "error"; progress: number; pdfBase64?: string; error?: string }> | undefined;
}

const reportJobs = globalThis._reportJobsMap || new Map();
globalThis._reportJobsMap = reportJobs;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { canonicalData } = body as { canonicalData: CanonicalKundali };

    if (!canonicalData || !canonicalData.person) {
      return NextResponse.json({ error: "Missing canonical Kundali data" }, { status: 400 });
    }

    const reportId = `rpt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    reportJobs.set(reportId, { status: "processing", progress: 15 });

    // Asynchronous PDF Generation Task
    (async () => {
      try {
        reportJobs.set(reportId, { status: "processing", progress: 40 });
        const pdfBuffer = await generateKundaliPdfBuffer(canonicalData);
        reportJobs.set(reportId, { status: "processing", progress: 85 });
        const base64Pdf = pdfBuffer.toString("base64");

        reportJobs.set(reportId, {
          status: "completed",
          progress: 100,
          pdfBase64: `data:application/pdf;base64,${base64Pdf}`,
        });
      } catch (err: any) {
        console.error(`Report generation failed for ${reportId}:`, err);
        reportJobs.set(reportId, {
          status: "error",
          progress: 0,
          error: err.message || "PDF generation engine failed",
        });
      }
    })();

    return NextResponse.json({
      reportId,
      status: "processing",
      progress: 15,
      statusUrl: `/api/kundali/reports/${reportId}/status`,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}

export function getReportJob(id: string) {
  return reportJobs.get(id);
}
