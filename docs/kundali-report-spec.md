# Kundali Report Technical Specification & Information Architecture

## Overview
This document serves as the complete functional and technical specification for the **Full Kundali Generator Module** in `dharmik20`. The system produces a branded, production-ready 150–200+ page Vedic Astrology PDF report with complete data parity against the reference specification (`Binju_kundli.pdf`).

---

## 1. Specification Matrix (207-Page Structure)

| Page Range | Section Title | Required Inputs | Required Calculations / Derived Data | API / Local Source | PDF Component | Status |
|---|---|---|---|---|---|---|
| **P001** | Branded Cover Page | Name, Gender, DOB, Time, Place | Branded Title, Report Type, Generation Timestamp | Local Theme | `ReportCover` | Planned |
| **P002-P004** | Table of Contents | Report Manifest | Page numbers, Section headers, Page count | Local Manifest | `TableOfContents` | Planned |
| **P005** | Birth Details & Avakhada | DOB, Time, Lat, Lng, TZ | Avakhada Chakra (Varna, Vashya, Yoni, Gana, Nadi), Sunrise/Sunset | Prokerala API + Local Math | `BasicDetailsPage` | Planned |
| **P006-P007** | Ghat & Favourable Points | Moon Sign, Nakshatra | Ghatak Moon, Day, Tithi, Nakshatra, Auspicious Days/Colors/Numbers/Gems | Local Rule Engine | `GhatAndFavourablePage` | Planned |
| **P008** | Planetary Positions & Charts | DOB, Time, Lat, Lng | Longitudes, Rashi, Nakshatra, Pada, Dignity, Retrograde, Combust, D1 & D9 Charts | Prokerala API + SVG Renderer | `PlanetaryPositionsPage` | Planned |
| **P009** | Bhava Chalit Table & Chart | DOB, Time, Lat, Lng | House Cusps, House Midpoints (Bhava Madhya), Chalit Chart | Prokerala API + SVG Renderer | `BhavaChalitPage` | Planned |
| **P010** | Key Kundali Points | Lagna, Moon Sign | Core Life Purpose, Strengths, Weaknesses, Life Ambition | Local Interpretation | `KeyPointsPage` | Planned |
| **P011-P012** | Lagna Report | Ascendant Sign | Health, Personality, Temperament, Career, Physical Traits | Local Interpretation | `LagnaReportPage` | Planned |
| **P013-P014** | Moon Sign Report | Moon Sign | Mental Nature, Emotional Traits, Health, Relations | Local Interpretation | `MoonSignReportPage` | Planned |
| **P015-P016** | Nakshatra Report | Nakshatra, Pada | Nakshatra Lord, Symbol, Deva, Personality, Quarter Traits | Local Interpretation | `NakshatraReportPage` | Planned |
| **P017-P018** | Panchang Phala | Sunrise, Tithi, Yoga, Karana | Interpretations for Tithi, Vara, Nakshatra, Yoga, Karana | Local Interpretation | `PanchangReportPage` | Planned |
| **P019-P021** | Detailed General Predictions | Lagna, Planets, Houses | General Life Predictions (Personality, Wealth, Health, Family, Profession) | Local Interpretation | `GeneralPredictionsPage` | Planned |
| **P022-P023** | Grah Vichar | 9 Planets' Positions | General Nature & Influence of Sun through Ketu | Local Interpretation | `GrahVicharPage` | Planned |
| **P024-P034** | House Analysis (1-12) | Houses 1–12, Occupants | Detailed Predictions per House (Lord, Occupants, Aspects, Strengths) | Local Engine + Interpretation | `HouseAnalysisPage` | Planned |
| **P035-P036** | Special Yogas & Raj Yogas | Planet & House Combinations | Detection of Raj Yogas, Dhana Yogas, Gajakesari, Budhaditya, etc. | Local Rule Engine | `SpecialYogasPage` | Planned |
| **P037-P040** | Numerology Report | Name, DOB | Mulank (Radix), Bhagyank (Destiny), Namank (Name), Lucky Factors, 10-Yr Forecast | Local Math Engine | `NumerologyReportPage` | Planned |
| **P041-P043** | Manglik Dosha Analysis | Mars House in D1/D9/Moon | Mars Placement, Cancellation Factors, Severity, Customized Remedies | Local Rule Engine | `ManglikDoshaPage` | Planned |
| **P044-P046** | Saturn Sade Sati | Moon Sign, Saturn Transits | Current Sade Sati Phase, Cycle Dates, Forecast, Remedies | Prokerala API + Local Math | `SadeSatiPage` | Planned |
| **P047** | Kaal Sarp Dosha | Rahu-Ketu Axis | Kaal Sarp Presence, Type (Anant to Sheshnag), Remedies | Local Rule Engine | `KaalSarpPage` | Planned |
| **P048-P050** | Vimshottari Mahadasha | Dasha Timeline | Mahadasha Interpretations (Sun to Ketu) | Local Interpretation | `MahadashaPhalPage` | Planned |
| **P051-P068** | Vimshottari Antardasha | Dasha Timeline | Antardasha Period Forecasts for all active combinations | Local Interpretation | `AntardashaPhalPage` | Planned |
| **P069-P071** | Current Transit (Gochar) | Current Date, Planet Positions | Planetary Transits from Moon Sign & Predictions | Prokerala API + Local Engine | `TransitReportPage` | Planned |
| **P072-P087** | Lal Kitab Section | Planets, Houses | Lal Kitab D1, Sleeping Planets, Teva Type, Ancestral Debts (Rin) & Remedies | Local Calculation + Content | `LalKitabPage` | Planned |
| **P088-P090** | Lal Kitab Varshphal | Annual Date | Annual Lal Kitab Chart, Varshphal Planets, Remedies | Local Calculation + Content | `LalKitabVarshphalPage` | Planned |
| **P091-P104** | Remedies & Recommendations | Chart Strengths, 12th Lord | Gemstone (Life/Lucky/Fortune), Ishta Devata, Rudraksha, Yantras, Herbs | Local Rule Engine | `RemediesReportPage` | Planned |
| **P105-P111** | Shubh Ghadi & Timings | Sunrise, Date | Choghadiya, Hora, Auspicious Windows | Local Math Engine | `ShubhGhadiPage` | Planned |
| **P112-P113** | Maitri Chakra | Planet Signs | Naisargika, Tatkalika, Dwadashadha Planetary Relationships | Local Math Engine | `MaitriChakraPage` | Planned |
| **P114-P119** | Shodashvarga Tables & Charts | Longitudes | 16 Divisional Charts (D1, D2, D3, D4, D7, D9, D10, D12, D16, D20, D24, D27, D30, D40, D45, D60) | Prokerala API + SVG Renderer | `ShodashvargaPage` | Planned |
| **P120-P121** | Shadbala & Bhavabala | Positions & Aspects | Sthanabala, Digbala, Kaalabala, Cheshtabala, Shati Pindas, House Strengths | Prokerala API + Local Math | `ShadbalaBhavabalaPage` | Planned |
| **P122-P129** | Ashtakavarga Tables & Charts | Planet Longitudes | Sarvashtakavarga Chart & Table, Prastara Ashtakavarga for 7 Planets | Prokerala API + Local Math | `AshtakavargaPage` | Planned |
| **P130-P137** | KP Astrology System | House Cusps, Sub-Lords | KP 4-Step Planet Indications, Cusp Sub-Lords, Nakshatra Nadi | Prokerala API + Local Math | `KpAstrologyPage` | Planned |
| **P138-P142** | Western Aspects System | Planetary Positions | Western Planet Positions, Planetary Aspects with Orbs, Aspects on Cusps | Local Aspect Calculator | `WesternAspectsPage` | Planned |
| **P143-P159** | Extended Vimshottari Dasha | Moon Longitude | 120-Year Tree of Mahadashas, Antardashas, and Pratyantardashas | Local Dasha Engine | `VimshottariTreePage` | Planned |
| **P160-P163** | Yogini Dasha System | Moon Nakshatra | Yogini Dasha Timeline (8 Yoginis) & Period Forecasts | Local Dasha Engine | `YoginiDashaPage` | Planned |
| **P164-P170** | Jaimini Astrology System | Planet Longitudes | 7/8 Chara Karakas, Karakamsha, Arudha Kundali, Chara Dasha & Predictions | Local Jaimini Engine | `JaiminiAstrologyPage` | Planned |
| **P171-P207** | Varshphal (6 Annual Reports) | Birth Data + Target Years | Solar Return Charts (2025-2030), Muntha, Varsheshwar, Mudda Dasha, Monthly Forecasts | Prokerala API + Local Engine | `VarshphalReportPage` | Planned |

---

## 2. Technical Architecture & Data Pipeline
```
[User Input Form]
       ↓
[Geocoding Resolver (Lat/Lng/TZ)]
       ↓
[SHA-256 Calculation Hash Lookup] → (If cached, return canonical JSON)
       ↓
[Astrology API Provider (Prokerala)]
       ↓
[Data Normalizer] → Canonical Kundali JSON
       ↓
[Local Calculation & Rule Engine] (Numerology, Ashtakavarga, Jaimini, Lal Kitab, Remedies)
       ↓
[Interpretation Engine] (Hindi & English Content Lookup)
       ↓
[Report Manifest Generator]
       ↓
[HTML + SVG Template Compiler]
       ↓
[Puppeteer Headless Chromium] → PDF Stream / File Storage
       ↓
[React Viewer & Downloader]
```

---

## 3. Calculation Accuracy & Golden Master Test
The test suite in `src/tests/kundali/goldenMaster.test.ts` validates the engine against the reference test fixture:
- **Birth Details**: 11-09-1994, 18:05:00, Mehsana, Gujarat (Lat: 23°35' N, Lng: 72°22' E, TZ: +5.5)
- **Expected Astronomical Constants**:
  - Ascendant / Lagna: Aquarius (Kumbha)
  - Moon Sign / Rashi: Scorpio (Vrishchik)
  - Nakshatra: Anuradha (Pada 3)
  - Sun Sign: Leo (Simha)
  - Lahiri Ayanamsha tolerance: ± 0.05 degrees
