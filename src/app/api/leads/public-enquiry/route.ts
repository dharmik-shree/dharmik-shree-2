import { NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new NextResponse("OK", { headers: corsHeaders });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { full_name, phone, city } = body;

    if (!full_name || !phone || !city) {
      return NextResponse.json(
        { error: "Missing required fields: full_name, phone, city" },
        { status: 400, headers: corsHeaders }
      );
    }

    // List of candidate CRM backend ports/urls to attempt
    const candidateUrls = [
      process.env.NEXT_PUBLIC_CRM_API_URL,
      "http://localhost:3000/api/leads/public-enquiry",
      "http://localhost:3001/api/leads/public-enquiry",
      "http://127.0.0.1:3000/api/leads/public-enquiry",
      "http://127.0.0.1:3001/api/leads/public-enquiry",
    ].filter(Boolean) as string[];

    // Attempt forwarding to active CRM server
    for (const targetUrl of candidateUrls) {
      try {
        const crmRes = await fetch(targetUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          signal: AbortSignal.timeout(3000), // 3-second timeout per candidate
        });

        if (crmRes.ok) {
          const data = await crmRes.json();
          return NextResponse.json(data, { headers: corsHeaders });
        }
      } catch {
        // Continue to next candidate or fallback
      }
    }

    // Direct Supabase REST API Fallback if CRM dev server is offline/unreachable
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://neytabykygedayelyhvi.supabase.co";
    const supabaseServiceKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5leXRhYnlreWdlZGF5ZWx5aHZpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjQxOTg3OSwiZXhwIjoyMTAxOTk1ODc5fQ.igCM1BKA-aSD_2vU0hf5dxMMevuywQ7zibGvqY34wJU";

    // Core lead fields guaranteed to exist in base schema
    const coreLeadRecord: Record<string, any> = {
      full_name: body.full_name,
      phone: body.phone,
      whatsapp: body.phone,
      city: body.city,
      country: "India",
      lead_source: body.lead_source || "website",
      lead_temperature: "warm",
      service_interest: body.service_interest || "divine_consultation",
      consultation_mode: body.consultation_mode || "online",
      stage: "new_lead",
      payment_status: "unpaid",
      token_amount: 0,
      full_amount: 9900,
      amount_paid: 0,
      rescheduled: false,
      reschedule_count: 0,
      tags: ["Website Lead"],
      is_converted: false,
      updated_at: new Date().toISOString(),
    };

    if (body.email) coreLeadRecord.email = body.email;
    if (body.message) coreLeadRecord.internal_notes = `Website Note: ${body.message}`;

    // Extended Kundali profiling fields (included only if truthy)
    const extendedRecord = { ...coreLeadRecord };
    if (body.date_of_birth) extendedRecord.date_of_birth = body.date_of_birth;
    if (body.time_of_birth) extendedRecord.time_of_birth = body.time_of_birth;
    if (body.birth_place) extendedRecord.birth_place = body.birth_place;
    if (body.gender) extendedRecord.gender = body.gender;
    if (body.relation) extendedRecord.relation = body.relation;
    if (body.address) extendedRecord.address = body.address;
    if (body.pincode) extendedRecord.pincode = body.pincode;
    if (body.marital_status) extendedRecord.marital_status = body.marital_status;
    if (body.gotra) extendedRecord.gotra = body.gotra;
    if (body.rashi) extendedRecord.rashi = body.rashi;
    if (body.occupation) extendedRecord.occupation = body.occupation;
    if (body.kundali_notes) extendedRecord.kundali_notes = body.kundali_notes;

    let dbRes = await fetch(`${supabaseUrl}/rest/v1/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseServiceKey,
        Authorization: `Bearer ${supabaseServiceKey}`,
        Prefer: "return=representation",
      },
      body: JSON.stringify([extendedRecord]),
    });

    // If extended columns cause schema cache error (e.g. PGRST204), fallback to core fields
    if (!dbRes.ok) {
      dbRes = await fetch(`${supabaseUrl}/rest/v1/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseServiceKey,
          Authorization: `Bearer ${supabaseServiceKey}`,
          Prefer: "return=representation",
        },
        body: JSON.stringify([coreLeadRecord]),
      });
    }

    if (!dbRes.ok) {
      const errText = await dbRes.text();
      throw new Error(`Database error: ${errText}`);
    }

    const insertedRows = await dbRes.json();
    const leadId = insertedRows?.[0]?.id || "LEAD-SAVED";

    return NextResponse.json(
      {
        success: true,
        leadId,
        message: "Enquiry received and saved to CRM database",
      },
      { headers: corsHeaders }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to process enquiry" },
      { status: 500, headers: corsHeaders }
    );
  }
}
