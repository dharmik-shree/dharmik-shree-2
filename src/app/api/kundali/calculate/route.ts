import { NextResponse } from "next/server";
import { BirthDetails } from "@/lib/kundali/types";
import { resolveLocation } from "@/lib/kundali/locationResolver";
import { ProkeralaProvider } from "@/lib/kundali/providers/prokerala";
import { normalizeKundaliData } from "@/lib/kundali/normalizers";
import { generateCalculationHash, getCachedKundali, setCachedKundali } from "@/lib/kundali/cache";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      fullName = "जातक",
      gender = "male",
      dateOfBirth = "1994-09-11",
      timeOfBirth = "18:05:00",
      birthPlace = "Mehsana, Gujarat, India",
      latitude,
      longitude,
      timezone,
      language = "hi",
    } = body;

    // 1. Resolve Location & Timezone
    const loc = await resolveLocation(
      birthPlace,
      latitude ? parseFloat(latitude) : undefined,
      longitude ? parseFloat(longitude) : undefined,
      timezone ? parseFloat(timezone) : undefined
    );

    const birthDetails: BirthDetails = {
      fullName,
      gender,
      dateOfBirth,
      timeOfBirth,
      birthPlace: loc.placeName,
      latitude: loc.latitude,
      longitude: loc.longitude,
      timezone: loc.timezone,
      timezoneName: loc.timezoneName,
      language,
    };

    // 2. Check SHA-256 Cache
    const calcHash = generateCalculationHash(birthDetails);
    const cached = getCachedKundali(calcHash);
    if (cached) {
      return NextResponse.json({
        status: "success",
        cached: true,
        hash: calcHash,
        data: cached,
      });
    }

    // 3. Provider Fetch & Normalization
    const provider = new ProkeralaProvider();
    let rawData;
    try {
      rawData = await provider.fetchFullKundaliData(birthDetails);
    } catch (apiErr: any) {
      console.warn("Provider fetch notice:", apiErr.message);
      rawData = { kundli: {}, panchang: {}, charts: {}, mangalDosha: {}, sadeSati: {}, kaalSarp: {}, vimshottariDasha: {} };
    }

    // 4. Normalize Data into Canonical Schema
    const canonical = normalizeKundaliData(birthDetails, rawData);
    setCachedKundali(calcHash, canonical);

    return NextResponse.json({
      status: "success",
      cached: false,
      hash: calcHash,
      data: canonical,
    });
  } catch (error: any) {
    console.error("Kundali Calculation API Error:", error);
    return NextResponse.json(
      { status: "error", error: error.message || "Failed to calculate Kundali" },
      { status: 500 }
    );
  }
}
