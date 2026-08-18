import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseKundali";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  if (!id) {
    return NextResponse.json({ error: "Missing report ID" }, { status: 400 });
  }

  if (supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from("kundali_reports")
        .select("id, status, pdf_url, error_message, name, created_at")
        .eq("id", id)
        .single();

      if (!error && data) {
        return NextResponse.json({
          reportId: data.id,
          status: data.status,
          pdfUrl: data.pdf_url,
          pdfDataUrl: data.pdf_url,
          error: data.error_message,
          name: data.name,
        });
      }
    } catch (err) {
      console.error("Supabase status lookup error:", err);
    }
  }

  return NextResponse.json({ error: "Report not found" }, { status: 404 });
}
