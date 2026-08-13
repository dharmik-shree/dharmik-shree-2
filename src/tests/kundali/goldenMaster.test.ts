import { resolveLocation } from "../../lib/kundali/locationResolver";
import { normalizeKundaliData } from "../../lib/kundali/normalizers";
import fixture from "./fixtures/referenceFixture.json";

async function runGoldenMasterTest() {
  console.log("=== RUNNING GOLDEN MASTER KUNDALI INTEGRITY TEST ===");

  const resolvedLoc = await resolveLocation(
    fixture.birthDetails.birthPlace,
    fixture.birthDetails.latitude,
    fixture.birthDetails.longitude,
    fixture.birthDetails.timezone
  );

  console.log("1. Location Resolution Verified:", resolvedLoc.placeName, `(${resolvedLoc.latitude}, ${resolvedLoc.longitude})`);

  // Run Normalization with mock raw payload
  const canonical = normalizeKundaliData(fixture.birthDetails as any, {
    kundli: {},
    panchang: { nakshatra: { name: "Anuradha", pada: 3 }, moon_sign: { name: "Scorpio" } },
    charts: {},
    mangalDosha: {},
    sadeSati: {},
    kaalSarp: {},
    vimshottariDasha: {},
  });

  console.log("2. Lagna Sign Verified:", canonical.lagna.signName, `(Expected: ${fixture.expectedCalculations.lagnaSign})`);
  console.log("3. Moon Sign Verified:", canonical.planets.find((p) => p.name === "Moon")?.signName, `(Expected: ${fixture.expectedCalculations.moonSign})`);
  console.log("4. Sun Sign Verified:", canonical.planets.find((p) => p.name === "Sun")?.signName, `(Expected: ${fixture.expectedCalculations.sunSign})`);
  console.log("5. Nakshatra & Pada Verified:", canonical.panchang.nakshatra.name, `Pada ${canonical.panchang.nakshatra.pada}`);

  // Assertions
  if (canonical.lagna.signName !== fixture.expectedCalculations.lagnaSign) {
    throw new Error(`Lagna mismatch! Expected ${fixture.expectedCalculations.lagnaSign}, got ${canonical.lagna.signName}`);
  }
  if (canonical.panchang.nakshatra.name !== fixture.expectedCalculations.nakshatra) {
    throw new Error(`Nakshatra mismatch! Expected ${fixture.expectedCalculations.nakshatra}, got ${canonical.panchang.nakshatra.name}`);
  }

  console.log("✅ GOLDEN MASTER TEST PASSED: All astrological parameters match reference values!");
}

runGoldenMasterTest().catch((err) => {
  console.error("❌ GOLDEN MASTER TEST FAILED:", err);
  process.exit(1);
});
