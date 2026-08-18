import { NextResponse } from "next/server";
import { POST as generatePdfPOST } from "@/app/api/kundali/generate-pdf/route";

export async function POST(request: Request) {
  return generatePdfPOST(request);
}
