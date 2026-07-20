import { NextResponse } from "next/server";

let cachedToken: string | null = null;
let tokenExpiry: number = 0;

async function getAccessToken() {
  const now = Date.now();
  if (cachedToken && tokenExpiry > now) {
    return cachedToken;
  }

  const clientId = process.env.PROKERALA_CLIENT_ID;
  const clientSecret = process.env.PROKERALA_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Credentials missing");
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
    throw new Error(`Authentication failed: ${errText}`);
  }

  const data = await res.json();
  cachedToken = data.access_token;
  tokenExpiry = Date.now() + (data.expires_in - 60) * 1000;
  return cachedToken;
}

export async function GET(request: Request) {
  const clientId = process.env.PROKERALA_CLIENT_ID;
  const clientSecret = process.env.PROKERALA_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      { error: "Credentials missing", fallback: true },
      { status: 200 }
    );
  }

  const { searchParams } = new URL(request.url);
  const tool = searchParams.get("tool");
  const lat = searchParams.get("latitude") || "19.0760"; // Default Mumbai
  const lng = searchParams.get("longitude") || "72.8777";
  const datetime = searchParams.get("datetime") || new Date().toISOString();
  const zodiac = searchParams.get("zodiac")?.toLowerCase() || "aries";

  const location = `${lat},${lng}`;

  try {
    const token = await getAccessToken();

    let endpoint = "";
    const params = new URLSearchParams();

    if (tool === "panchang") {
      endpoint = "https://api.prokerala.com/v2/astrology/panchang";
      params.append("ayanamsa", "1");
      params.append("datetime", datetime);
      params.append("coordinates", location);
    } else if (tool === "horoscope") {
      endpoint = "https://api.prokerala.com/v2/horoscope/daily";
      params.append("datetime", datetime);
      params.append("sign", zodiac);
    } else {
      return NextResponse.json({ error: "Unsupported tool type" }, { status: 400 });
    }

    const apiUrl = `${endpoint}?${params.toString()}`;
    const apiRes = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!apiRes.ok) {
      const errDetails = await apiRes.text();
      
      // Auto-detect sandbox restriction and fallback to Jan 1st of the current year
      if (errDetails.includes("sandbox") || errDetails.includes("January 1st")) {
        const originalDate = new Date(datetime);
        // Set date to January 1st
        const sandboxDateStr = `${originalDate.getFullYear()}-01-01T12:00:00Z`;
        params.set("datetime", sandboxDateStr);

        const retryUrl = `${endpoint}?${params.toString()}`;
        const retryRes = await fetch(retryUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (retryRes.ok) {
          const retryData = await retryRes.json();
          if (retryData.data) {
            retryData.sandbox = true;
          }
          return NextResponse.json(retryData);
        }
      }

      return NextResponse.json(
        { error: "Prokerala API responded with error", details: errDetails },
        { status: apiRes.status }
      );
    }

    const data = await apiRes.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Prokerala API Route error:", error);
    return NextResponse.json(
      { error: "API execution failed", message: error.message || "Unknown error" },
      { status: 500 }
    );
  }
}
