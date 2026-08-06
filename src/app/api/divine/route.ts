import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      fullName,
      day,
      month,
      year,
      hour,
      minute,
      amPm,
      gender,
      birthPlace,
      latitude,
      longitude,
      lan = "hi" // Default Hindi for Kundali
    } = body;

    const apiKey = process.env.DIVINE_API_KEY;
    const authToken = process.env.DIVINE_AUTH_TOKEN || process.env.DIVINE_BEARER_TOKEN;

    if (!apiKey || !authToken) {
      return NextResponse.json(
        {
          error: "Divine API credentials missing",
          message: "Please add DIVINE_API_KEY and DIVINE_AUTH_TOKEN to .env.local"
        },
        { status: 400 }
      );
    }

    let hr = parseInt(hour || "12");
    if (amPm === "PM" && hr < 12) hr += 12;
    if (amPm === "AM" && hr === 12) hr = 0;

    const cleanToken = authToken.replace(/^Bearer\s+/i, "").trim();

    const formData = new FormData();
    formData.append("api_key", apiKey.trim());
    formData.append("full_name", fullName || "जातक");
    formData.append("day", String(day).padStart(2, "0"));
    formData.append("month", String(month).padStart(2, "0"));
    formData.append("year", String(year));
    formData.append("hour", String(hr).padStart(2, "0"));
    formData.append("min", String(minute || "0").padStart(2, "0"));
    formData.append("sec", "00");
    formData.append("gender", gender || "male");
    formData.append("place", birthPlace || "Mumbai, India");
    formData.append("lat", String(latitude || "19.0760"));
    formData.append("lon", String(longitude || "72.8777"));
    formData.append("tzone", "5.5");
    formData.append("lan", lan);
    
    // Dharmik Shree Custom Branding
    formData.append("company_name", "Dharmik Shree");
    formData.append("company_url", "https://www.dharmikshree.com/");
    formData.append("company_email", "support@dharmikshree.com");
    formData.append("company_mobile", "+91 99999 99999");
    formData.append("company_bio", "13th Generation Astrologer & Vastu Consultant | Surat, Gujarat. High-Precision Vedic Kundali, Prashna & Spiritual Life Guidance.");
    formData.append("logo_url", "https://www.dharmikshree.com/logo.png");
    formData.append("footer_text", "Dharmik Shree | www.dharmikshree.com");

    const response = await fetch("https://pdf.divineapi.com/indian-api/v2/kundali-sampoorna", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cleanToken}`,
      },
      body: formData,
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Divine API Route Error:", error);
    return NextResponse.json(
      { error: "API execution failed", message: error.message || "Unknown error" },
      { status: 500 }
    );
  }
}
