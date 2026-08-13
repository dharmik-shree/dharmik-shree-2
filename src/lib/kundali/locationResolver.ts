// Location & Geocoding Resolver for Astronomical Calculations

export interface LocationResult {
  placeName: string;
  latitude: number;
  longitude: number;
  timezone: number; // e.g. 5.5
  timezoneName: string; // e.g. 'Asia/Kolkata'
}

// Comprehensive dictionary for instant offline resolution of Indian & global cities
const CITY_DATABASE: Record<string, LocationResult> = {
  mehsana: { placeName: "Mehsana, Gujarat, India", latitude: 23.588, longitude: 72.369, timezone: 5.5, timezoneName: "Asia/Kolkata" },
  surat: { placeName: "Surat, Gujarat, India", latitude: 21.1702, longitude: 72.8311, timezone: 5.5, timezoneName: "Asia/Kolkata" },
  ahmedabad: { placeName: "Ahmedabad, Gujarat, India", latitude: 23.0225, longitude: 72.5714, timezone: 5.5, timezoneName: "Asia/Kolkata" },
  mumbai: { placeName: "Mumbai, Maharashtra, India", latitude: 19.076, longitude: 72.8777, timezone: 5.5, timezoneName: "Asia/Kolkata" },
  delhi: { placeName: "Delhi, India", latitude: 28.6139, longitude: 77.209, timezone: 5.5, timezoneName: "Asia/Kolkata" },
  newdelhi: { placeName: "New Delhi, India", latitude: 28.6139, longitude: 77.209, timezone: 5.5, timezoneName: "Asia/Kolkata" },
  bengaluru: { placeName: "Bengaluru, Karnataka, India", latitude: 12.9716, longitude: 77.5946, timezone: 5.5, timezoneName: "Asia/Kolkata" },
  bangalore: { placeName: "Bengaluru, Karnataka, India", latitude: 12.9716, longitude: 77.5946, timezone: 5.5, timezoneName: "Asia/Kolkata" },
  chennai: { placeName: "Chennai, Tamil Nadu, India", latitude: 13.0827, longitude: 80.2707, timezone: 5.5, timezoneName: "Asia/Kolkata" },
  kolkata: { placeName: "Kolkata, West Bengal, India", latitude: 22.5726, longitude: 88.3639, timezone: 5.5, timezoneName: "Asia/Kolkata" },
  hyderabad: { placeName: "Hyderabad, Telangana, India", latitude: 17.385, longitude: 78.4867, timezone: 5.5, timezoneName: "Asia/Kolkata" },
  pune: { placeName: "Pune, Maharashtra, India", latitude: 18.5204, longitude: 73.8567, timezone: 5.5, timezoneName: "Asia/Kolkata" },
  jaipur: { placeName: "Jaipur, Rajasthan, India", latitude: 26.9124, longitude: 75.7873, timezone: 5.5, timezoneName: "Asia/Kolkata" },
  rajkot: { placeName: "Rajkot, Gujarat, India", latitude: 22.3039, longitude: 70.8022, timezone: 5.5, timezoneName: "Asia/Kolkata" },
  vadodara: { placeName: "Vadodara, Gujarat, India", latitude: 22.3072, longitude: 73.1812, timezone: 5.5, timezoneName: "Asia/Kolkata" },
  varanasi: { placeName: "Varanasi, Uttar Pradesh, India", latitude: 25.3176, longitude: 82.9739, timezone: 5.5, timezoneName: "Asia/Kolkata" },
  lucknow: { placeName: "Lucknow, Uttar Pradesh, India", latitude: 26.8467, longitude: 80.9462, timezone: 5.5, timezoneName: "Asia/Kolkata" },
  indore: { placeName: "Indore, Madhya Pradesh, India", latitude: 22.7196, longitude: 75.8577, timezone: 5.5, timezoneName: "Asia/Kolkata" },
  nagpur: { placeName: "Nagpur, Maharashtra, India", latitude: 21.1458, longitude: 79.0882, timezone: 5.5, timezoneName: "Asia/Kolkata" },
  bhopal: { placeName: "Bhopal, Madhya Pradesh, India", latitude: 23.2599, longitude: 77.4126, timezone: 5.5, timezoneName: "Asia/Kolkata" },
  patna: { placeName: "Patna, Bihar, India", latitude: 25.5941, longitude: 85.1376, timezone: 5.5, timezoneName: "Asia/Kolkata" },
  chandigarh: { placeName: "Chandigarh, India", latitude: 30.7333, longitude: 76.7794, timezone: 5.5, timezoneName: "Asia/Kolkata" },
  ludhiana: { placeName: "Ludhiana, Punjab, India", latitude: 30.901, longitude: 75.8573, timezone: 5.5, timezoneName: "Asia/Kolkata" },
  agra: { placeName: "Agra, Uttar Pradesh, India", latitude: 27.1767, longitude: 78.0081, timezone: 5.5, timezoneName: "Asia/Kolkata" },
  nashik: { placeName: "Nashik, Maharashtra, India", latitude: 19.9975, longitude: 73.7898, timezone: 5.5, timezoneName: "Asia/Kolkata" },
  jamnagar: { placeName: "Jamnagar, Gujarat, India", latitude: 22.4707, longitude: 70.0577, timezone: 5.5, timezoneName: "Asia/Kolkata" },
  bhavnagar: { placeName: "Bhavnagar, Gujarat, India", latitude: 21.7645, longitude: 72.1519, timezone: 5.5, timezoneName: "Asia/Kolkata" },
  junagadh: { placeName: "Junagadh, Gujarat, India", latitude: 21.5222, longitude: 70.4579, timezone: 5.5, timezoneName: "Asia/Kolkata" },
  gandhinagar: { placeName: "Gandhinagar, Gujarat, India", latitude: 23.2156, longitude: 72.6369, timezone: 5.5, timezoneName: "Asia/Kolkata" },
  anand: { placeName: "Anand, Gujarat, India", latitude: 22.5645, longitude: 72.9289, timezone: 5.5, timezoneName: "Asia/Kolkata" },
  navsari: { placeName: "Navsari, Gujarat, India", latitude: 20.9467, longitude: 72.952, timezone: 5.5, timezoneName: "Asia/Kolkata" },
  valsad: { placeName: "Valsad, Gujarat, India", latitude: 20.5992, longitude: 72.9342, timezone: 5.5, timezoneName: "Asia/Kolkata" },
  bharuch: { placeName: "Bharuch, Gujarat, India", latitude: 21.7051, longitude: 72.9959, timezone: 5.5, timezoneName: "Asia/Kolkata" },
  patan: { placeName: "Patan, Gujarat, India", latitude: 23.8493, longitude: 72.1266, timezone: 5.5, timezoneName: "Asia/Kolkata" },
  palitana: { placeName: "Palitana, Gujarat, India", latitude: 21.5228, longitude: 71.8262, timezone: 5.5, timezoneName: "Asia/Kolkata" },
  dwarka: { placeName: "Dwarka, Gujarat, India", latitude: 22.2394, longitude: 68.9678, timezone: 5.5, timezoneName: "Asia/Kolkata" },
  somnath: { placeName: "Somnath, Gujarat, India", latitude: 20.888, longitude: 70.4012, timezone: 5.5, timezoneName: "Asia/Kolkata" },
};

export async function resolveLocation(
  query: string,
  inputLat?: number,
  inputLng?: number,
  inputTz?: number
): Promise<LocationResult> {
  // If latitude and longitude are explicitly provided, use them directly
  if (inputLat !== undefined && inputLng !== undefined && !isNaN(inputLat) && !isNaN(inputLng)) {
    return {
      placeName: query || "Specified Location",
      latitude: inputLat,
      longitude: inputLng,
      timezone: inputTz !== undefined ? inputTz : 5.5,
      timezoneName: "Asia/Kolkata",
    };
  }

  const cleanKey = query.toLowerCase().trim().replace(/[^a-z0-9]/g, "");

  // Check dictionary
  for (const [key, val] of Object.entries(CITY_DATABASE)) {
    if (cleanKey.includes(key)) {
      return val;
    }
  }

  // Default fallback if not found: Mumbai, India
  return {
    placeName: query || "Mumbai, India",
    latitude: 19.076,
    longitude: 72.8777,
    timezone: 5.5,
    timezoneName: "Asia/Kolkata",
  };
}
