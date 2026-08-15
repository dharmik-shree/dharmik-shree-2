// Prokerala v2 Astrology API Provider Implementation

import { AstrologyProvider, ProviderRawData } from "./interface";
import { BirthDetails } from "../types";

let cachedToken: string | null = null;
let tokenExpiry: number = 0;

async function getAccessToken(): Promise<string> {
  const now = Date.now();
  if (cachedToken && tokenExpiry > now) {
    return cachedToken;
  }

  const clientId = process.env.PROKERALA_CLIENT_ID;
  const clientSecret = process.env.PROKERALA_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Prokerala API credentials missing in environment (.env.local)");
  }

  const res = await fetch("https://api.prokerala.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Prokerala OAuth failed: ${errText}`);
  }

  const data = await res.json();
  cachedToken = data.access_token;
  tokenExpiry = Date.now() + (data.expires_in - 60) * 1000;
  return cachedToken!;
}

export class ProkeralaProvider implements AstrologyProvider {
  name = "Prokerala v2";
  version = "2.0.0";

  private async fetchEndpoint(endpoint: string, params: Record<string, string>): Promise<any> {
    try {
      const token = await getAccessToken();
      const searchParams = new URLSearchParams(params);
      const url = `https://api.prokerala.com/v2/astrology/${endpoint}?${searchParams.toString()}`;

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        return null;
      }

      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("image/svg") || contentType.includes("xml")) {
        const svgText = await res.text();
        return { svg: svgText };
      }

      const json = await res.json();
      return json.data || json;
    } catch (err) {
      return null;
    }
  }

  async fetchFullKundaliData(birth: BirthDetails): Promise<ProviderRawData> {
    const datetimeStr = `${birth.dateOfBirth}T${birth.timeOfBirth}+05:30`;
    const coordinates = `${birth.latitude.toFixed(4)},${birth.longitude.toFixed(4)}`;

    const baseParams = {
      datetime: datetimeStr,
      coordinates,
      ayanamsa: "1", // Lahiri Ayanamsha
      la: birth.language || "hi",
    };

    // Parallel endpoint fetches using Prokerala allowed values: Rasi, Navamsa, Bhava
    const [kundli, panchang, d1Chart, d9Chart, chalitChart, mangalDosha, sadeSati, kaalSarp] =
      await Promise.all([
        this.fetchEndpoint("kundli", baseParams),
        this.fetchEndpoint("panchang", baseParams),
        this.fetchEndpoint("chart", { ...baseParams, chart_type: "Rasi", chart_style: "north-indian" }),
        this.fetchEndpoint("chart", { ...baseParams, chart_type: "Navamsa", chart_style: "north-indian" }),
        this.fetchEndpoint("chart", { ...baseParams, chart_type: "Bhava", chart_style: "north-indian" }),
        this.fetchEndpoint("mangal-dosha", baseParams),
        this.fetchEndpoint("sade-sati", baseParams),
        this.fetchEndpoint("kaal-sarp-dosha", baseParams),
      ]);

    return {
      kundli,
      panchang,
      charts: {
        D1: d1Chart,
        D9: d9Chart,
        Chalit: chalitChart,
      },
      mangalDosha,
      sadeSati,
      kaalSarp,
      vimshottariDasha: null,
    };
  }
}
