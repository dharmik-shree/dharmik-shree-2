"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Download, ArrowLeft, ExternalLink, Sparkles, AlertCircle, FileText, RefreshCw, ShieldCheck } from "lucide-react";

function KundaliViewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Retrieve form parameters
  const fullName = searchParams.get("fullName") || "जातक";
  const gender = searchParams.get("gender") || "male";
  const day = searchParams.get("day") || "11";
  const month = searchParams.get("month") || "9";
  const year = searchParams.get("year") || "1994";
  const hour = searchParams.get("hour") || "06";
  const minute = searchParams.get("minute") || "05";
  const amPm = searchParams.get("amPm") || "PM";
  const birthPlace = searchParams.get("birthPlace") || "Mumbai, India";
  const latitude = searchParams.get("latitude") || "19.0760";
  const longitude = searchParams.get("longitude") || "72.8777";
  const lan = searchParams.get("lan") || "hi";

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [provider, setProvider] = useState<string>("prokerala");
  const [pdfData, setPdfData] = useState<{ report_url?: string; download_url?: string; pdf_data_url?: string; name?: string } | null>(null);

  const fetchPdfReport = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/kundali-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          gender,
          day,
          month,
          year,
          hour,
          minute,
          amPm,
          birthPlace,
          latitude,
          longitude,
          lan
        })
      });

      const json = await res.json();
      setProvider(json.provider || "prokerala");

      if (res.ok && json.status === "success" && json.data) {
        setPdfData(json.data);
      } else {
        const errMsg =
          typeof json.error === "string"
            ? json.error
            : json.error?.details || json.error?.message || json.message || "Failed to generate Kundali PDF report";
        setError(errMsg);
      }
    } catch (err: any) {
      console.error("Error generating Kundali PDF:", err);
      setError(err.message || "Network error while connecting to PDF generator service");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!fullName || !day || !month || !year) {
      router.push("/tools");
      return;
    }
    fetchPdfReport();
  }, [fullName, gender, day, month, year, hour, minute, amPm, birthPlace, latitude, longitude, lan, router]);

  const formattedDob = `${day}:${month}:${year}`;
  const formattedTime = `${hour}:${minute}:00 ${amPm}`;
  const formattedPlace = birthPlace || "Mumbai, India";

  const downloadUrl = pdfData?.download_url || pdfData?.pdf_data_url || pdfData?.report_url;
  const viewUrl = pdfData?.report_url || pdfData?.pdf_data_url;

  return (
    <main className="min-h-screen bg-brand-charcoal pt-28 pb-20 px-4 md:px-8 text-brand-ivory">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Navigation & Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-brand-gold/20 pb-6 no-print">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-brand-gold hover:text-brand-ivory transition-colors"
          >
            <ArrowLeft size={16} /> Edit Details
          </button>
          
          {downloadUrl && (
            <div className="flex flex-wrap items-center gap-3">
              {pdfData?.report_url && !pdfData.report_url.startsWith("data:") && (
                <a
                  href={pdfData.report_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-transparent border border-brand-gold text-brand-gold hover:bg-brand-gold/10 text-xs uppercase tracking-widest font-semibold py-3 px-5 rounded-sm flex items-center gap-2 transition-all"
                >
                  <ExternalLink size={15} /> View Web Report
                </a>
              )}
              <a
                href={downloadUrl}
                download={`${fullName.replace(/\s+/g, "_")}_Dharmik_Shree_Kundali.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-gold hover:bg-brand-gold-hover text-brand-charcoal text-xs uppercase tracking-widest font-semibold py-3 px-6 rounded-sm flex items-center gap-2 shadow-lg transition-all"
              >
                <Download size={16} /> Download Official Kundali PDF
              </a>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="min-h-[500px] bg-white/5 border border-brand-gold/20 rounded-sm p-12 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 border-4 border-brand-gold border-t-transparent rounded-full animate-spin" />
            <h2 className="font-serif text-2xl font-light text-brand-ivory tracking-wider animate-pulse">
              धार्मिकश्री कुण्डली तैयार हो रही है...
            </h2>
            <p className="text-xs text-brand-ivory/60 max-w-md">
              Generating your high-precision Kundali PDF via {provider === "divine" ? "Divine API" : "Prokerala PDF API"}.
            </p>
          </div>
        )}

        {/* Credentials / Error Notice */}
        {!loading && error && (
          <div className="bg-amber-950/40 border border-amber-500/50 p-8 rounded-sm text-brand-ivory space-y-6">
            <div className="flex items-start gap-4">
              <AlertCircle size={24} className="text-amber-400 flex-shrink-0 mt-1" />
              <div className="space-y-2">
                <h3 className="font-serif text-xl font-bold text-amber-200">
                  {provider === "divine" ? "Divine API" : "Prokerala API"} Notice
                </h3>
                <p className="text-xs text-amber-100/80 leading-relaxed max-w-2xl">
                  {error}
                </p>
              </div>
            </div>

            <div className="bg-brand-charcoal/80 p-5 border border-amber-500/20 rounded-sm space-y-3 font-mono text-xs text-amber-300/90">
              <p className="text-brand-ivory font-sans font-semibold text-xs">
                To switch providers, update your <code className="bg-amber-900/50 px-2 py-0.5 rounded text-amber-200">.env.local</code> configuration:
              </p>
              <div className="bg-black/50 p-3 rounded space-y-1">
                <div># Set DIVINE=on to enable Divine API backup provider</div>
                <div>DIVINE={provider === "divine" ? "on" : "off"}</div>
                <div>PDF_PROVIDER={provider}</div>
              </div>
            </div>

            <button
              onClick={fetchPdfReport}
              className="bg-brand-gold text-brand-charcoal text-xs uppercase tracking-widest font-bold py-2.5 px-6 rounded-sm flex items-center gap-2 hover:bg-brand-gold-hover transition-colors"
            >
              <RefreshCw size={14} /> Retry Generation
            </button>
          </div>
        )}

        {/* Generated PDF Display */}
        {!loading && pdfData && viewUrl && (
          <div className="space-y-6">
            <div className="bg-brand-charcoal/40 border border-brand-gold/30 p-4 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] uppercase tracking-widest text-brand-gold font-semibold">Report Generated For</span>
                  <span className="text-[9px] bg-brand-gold/20 text-brand-gold py-0.5 px-2 rounded-full font-mono uppercase">
                    Provider: {provider}
                  </span>
                </div>
                <h2 className="font-serif text-2xl font-bold text-brand-ivory">{fullName}</h2>
                <p className="text-xs text-brand-ivory/60 font-mono mt-0.5">
                  DOB: {formattedDob} | Time: {formattedTime} | Place: {formattedPlace}
                </p>
              </div>
              <a
                href={downloadUrl}
                download={`${fullName.replace(/\s+/g, "_")}_Dharmik_Shree_Kundali.pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-gold hover:bg-brand-gold-hover text-brand-charcoal text-xs uppercase tracking-widest font-semibold py-3 px-6 rounded-sm flex items-center justify-center gap-2 shadow-lg transition-all self-start sm:self-auto"
              >
                <Download size={16} /> Download Official PDF
              </a>
            </div>

            {/* Embedded PDF iframe viewer */}
            <div className="border border-brand-gold/30 rounded-sm bg-white overflow-hidden shadow-2xl h-[800px]">
              <iframe
                src={viewUrl}
                className="w-full h-full border-none"
                title="Dharmik Shree Official Kundali PDF"
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default function KundaliViewPage() {
  return (
    <>
      <div className="no-print"><Header /></div>
      <Suspense fallback={
        <div className="min-h-screen bg-brand-charcoal flex flex-col items-center justify-center text-brand-ivory px-6">
          <div className="w-16 h-16 border-4 border-brand-gold border-t-transparent rounded-full animate-spin mb-4" />
          <h2 className="font-serif text-2xl font-light tracking-wider animate-pulse">
            तैयारी की जा रही है...
          </h2>
        </div>
      }>
        <KundaliViewContent />
      </Suspense>
      <div className="no-print"><Footer /></div>
    </>
  );
}
