import { NextResponse } from "next/server";
import { reportJobs } from "@/app/api/kundali/generate-report/route";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const job = reportJobs.get(id);

  if (!job) {
    return NextResponse.json({ error: "Report job not found" }, { status: 404 });
  }

  return NextResponse.json({
    reportId: id,
    status: job.status,
    progress: job.progress,
    pdfDataUrl: job.pdfBase64,
    error: job.error,
  });
}
