// Deterministic Calculation Cache Manager

import crypto from "crypto";
import { BirthDetails, CanonicalKundali } from "./types";

const memoryCache = new Map<string, { data: CanonicalKundali; timestamp: number }>();

export function generateCalculationHash(birth: BirthDetails, providerVersion: string = "prokerala-v2"): string {
  const rawString = `${birth.dateOfBirth}_${birth.timeOfBirth}_${birth.latitude.toFixed(4)}_${birth.longitude.toFixed(4)}_${birth.timezone}_${providerVersion}`;
  return crypto.createHash("sha256").update(rawString).digest("hex");
}

export function getCachedKundali(hash: string): CanonicalKundali | null {
  const item = memoryCache.get(hash);
  if (item && Date.now() - item.timestamp < 30 * 24 * 3600 * 1000) {
    // 30 days cache validity
    return item.data;
  }
  return null;
}

export function setCachedKundali(hash: string, data: CanonicalKundali): void {
  memoryCache.set(hash, { data, timestamp: Date.now() });
}
