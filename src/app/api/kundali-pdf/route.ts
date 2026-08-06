import { NextResponse } from "next/server";

let cachedProkeralaToken: string | null = null;
let prokeralaTokenExpiry: number = 0;

async function getProkeralaToken() {
  const now = Date.now();
  if (cachedProkeralaToken && prokeralaTokenExpiry > now) {
    return cachedProkeralaToken;
  }

  const clientId = process.env.PROKERALA_CLIENT_ID;
  const clientSecret = process.env.PROKERALA_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Prokerala credentials missing in environment");
  }

  const res = await fetch("https://api.prokerala.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Prokerala auth failed: ${errText}`);
  }

  const data = await res.json();
  cachedProkeralaToken = data.access_token;
  prokeralaTokenExpiry = Date.now() + (data.expires_in - 60) * 1000;
  return cachedProkeralaToken;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      fullName = "जातक",
      gender = "male",
      day = "11",
      month = "09",
      year = "1994",
      hour = "06",
      minute = "05",
      amPm = "PM",
      birthPlace = "Mumbai, India",
      latitude = "19.0760",
      longitude = "72.8777",
      lan = "hi"
    } = body;

    // Check environment variable toggle: if DIVINE=on or PDF_PROVIDER=divine, use Divine API
    const isDivineOn =
      process.env.DIVINE?.toLowerCase() === "on" ||
      process.env.PDF_PROVIDER?.toLowerCase() === "divine";

    // ----------------------------------------------------
    // MODE 1: DIVINE API (Backup Provider when DIVINE=on)
    // ----------------------------------------------------
    if (isDivineOn) {
      const apiKey = process.env.DIVINE_API_KEY;
      const authToken = process.env.DIVINE_AUTH_TOKEN || process.env.DIVINE_BEARER_TOKEN;

      if (!apiKey || !authToken) {
        return NextResponse.json(
          {
            provider: "divine",
            status: "error",
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
      formData.append("full_name", fullName);
      formData.append("day", String(day).padStart(2, "0"));
      formData.append("month", String(month).padStart(2, "0"));
      formData.append("year", String(year));
      formData.append("hour", String(hr).padStart(2, "0"));
      formData.append("min", String(minute || "0").padStart(2, "0"));
      formData.append("sec", "00");
      formData.append("gender", gender);
      formData.append("place", birthPlace);
      formData.append("lat", String(latitude));
      formData.append("lon", String(longitude));
      formData.append("tzone", "5.5");
      formData.append("lan", lan);
      
      // White-Label Branding
      formData.append("company_name", "Dharmik Shree");
      formData.append("company_url", "https://www.dharmikshree.com/");
      formData.append("company_email", "support@dharmikshree.com");
      formData.append("company_mobile", "+91 99999 99999");
      formData.append("company_bio", "13th Generation Astrologer & Vastu Consultant | Surat, Gujarat.");
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
      return NextResponse.json({ provider: "divine", ...data });
    }

    // ----------------------------------------------------
    // MODE 2: PROKERALA PDF REPORT API (Primary Provider)
    // ----------------------------------------------------
    const token = await getProkeralaToken();

    let hr = parseInt(hour || "12");
    if (amPm === "PM" && hr < 12) hr += 12;
    if (amPm === "AM" && hr === 12) hr = 0;

    const formattedHour = hr.toString().padStart(2, "0");
    const formattedMinute = (minute || "0").padStart(2, "0");
    const datetimeIsoStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}T${formattedHour}:${formattedMinute}:00+05:30`;

    const prokeralaPayload = {
      report_name: "Dharmik Shree Premium Kundali",
      input: {
        datetime: datetimeIsoStr,
        coordinates: `${latitude},${longitude}`,
        ayanamsa: 1
      },
      options: {
        modules: [
          "birth-details",
          "panchang-details",
          "kundli-chart",
          "planet-position",
          "mangal-dosha",
          "sade-sati",
          "vimshottari-dasha"
        ],
        chart_style: "north-indian",
        la: lan || "hi"
      }
    };

    let res = await fetch("https://api.prokerala.com/v2/report/personal-reading/instant", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(prokeralaPayload)
    });

    // Auto-detect sandbox restriction and retry with Jan 1st if required by sandbox mode
    if (!res.ok) {
      const errText = await res.text();
      if (errText.includes("sandbox") || errText.includes("January 1st")) {
        prokeralaPayload.input.datetime = `${year}-01-01T12:00:00+05:30`;
        res = await fetch("https://api.prokerala.com/v2/report/personal-reading/instant", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(prokeralaPayload)
        });
      } else {
        // Parse error text if not sandbox
        let errJson: any = null;
        try {
          errJson = JSON.parse(errText);
        } catch (e) {}

        const detailMsg =
          errJson?.errors?.[0]?.detail ||
          errText ||
          "Prokerala PDF generation failed";

        return NextResponse.json(
          {
            provider: "prokerala",
            status: "error",
            error: detailMsg,
            details: errJson || errText
          },
          { status: res.status }
        );
      }
    }

    const contentType = res.headers.get("content-type") || "";

    if (res.ok && (contentType.includes("application/pdf") || contentType.includes("octet-stream"))) {
      const buffer = await res.arrayBuffer();
      const base64Pdf = Buffer.from(buffer).toString("base64");
      const pdfDataUrl = `data:application/pdf;base64,${base64Pdf}`;

      return NextResponse.json({
        provider: "prokerala",
        status: "success",
        data: {
          name: fullName,
          pdf_data_url: pdfDataUrl,
          report_url: pdfDataUrl
        }
      });
    } else {
      const errText = await res.text();
      let errJson: any = null;
      try {
        errJson = JSON.parse(errText);
      } catch (e) {}

      const detailMsg = errJson?.errors?.[0]?.detail || errText || "Prokerala PDF generation failed";

      return NextResponse.json(
        {
          provider: "prokerala",
          status: "error",
          error: detailMsg,
          details: errJson || errText
        },
        { status: res.status }
      );
    }

  } catch (error: any) {
    console.error("Kundali PDF Route Error:", error);
    return NextResponse.json(
      { error: "Kundali PDF execution failed", message: error.message || "Unknown error" },
      { status: 500 }
    );
  }
}
