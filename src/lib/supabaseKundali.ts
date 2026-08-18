import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://neytabykygedayelyhvi.supabase.co";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabaseAdmin = supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false },
    })
  : null;

export interface SaveReportParams {
  name: string;
  gender: string;
  day: number;
  month: number;
  year: number;
  hour: number;
  minute: number;
  place: string;
  lat: number;
  lon: number;
  tzone: number;
  language: string;
  ip_address?: string;
  user_agent?: string;
}

export async function saveKundaliReportPending(params: SaveReportParams): Promise<string | null> {
  if (!supabaseAdmin) {
    console.warn("Supabase admin client not configured (missing SUPABASE_SERVICE_ROLE_KEY)");
    return null;
  }

  try {
    const { data, error } = await supabaseAdmin
      .from("kundali_reports")
      .insert([
        {
          name: params.name,
          gender: params.gender,
          day: params.day,
          month: params.month,
          year: params.year,
          hour: params.hour,
          minute: params.minute,
          place: params.place,
          lat: params.lat,
          lon: params.lon,
          tzone: params.tzone,
          language: params.language,
          status: "pending",
          ip_address: params.ip_address || null,
          user_agent: params.user_agent || null,
        },
      ])
      .select("id")
      .single();

    if (error) {
      console.error("Supabase insert pending report error:", error);
      return null;
    }
    return data?.id || null;
  } catch (err) {
    console.error("Unexpected error saving pending report to Supabase:", err);
    return null;
  }
}

export async function updateKundaliReportStatus(
  reportId: string | null,
  status: "completed" | "failed",
  pdfUrl?: string,
  errorMessage?: string
) {
  if (!supabaseAdmin || !reportId) return;

  try {
    const updateData: Record<string, any> = { status };
    if (pdfUrl) updateData.pdf_url = pdfUrl;
    if (errorMessage) updateData.error_message = errorMessage;

    const { error } = await supabaseAdmin
      .from("kundali_reports")
      .update(updateData)
      .eq("id", reportId);

    if (error) {
      console.error("Supabase update report status error:", error);
    }
  } catch (err) {
    console.error("Unexpected error updating report status in Supabase:", err);
  }
}
