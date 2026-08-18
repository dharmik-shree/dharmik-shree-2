"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import KundaliForm from "@/components/kundali/KundaliForm";
import { Download, ArrowLeft, RefreshCw, FileText, CheckCircle2, ExternalLink } from "lucide-react";

export default function KundaliReportPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  
  const reportId = params?.id as string;
  const directPdfUrl = searchParams.get("pdfUrl");

  const [pdfUrl, setPdfUrl] = useState<string | null>(directPdfUrl);
  const [isLoading, setIsLoading] = useState<boolean>(!directPdfUrl && !!reportId);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (directPdfUrl) {
      setPdfUrl(directPdfUrl);
      setIsLoading(false);
      return;
    }

    if (!reportId) {
      setIsLoading(false);
      return;
    }

    // Attempt to fetch report details from Supabase via API
    (async () => {
      try {
        const res = await fetch(`/api/kundali/reports/${reportId}/status`);
        const json = await res.json();
        if (json.pdfDataUrl || json.pdfUrl) {
          setPdfUrl(json.pdfDataUrl || json.pdfUrl);
        } else if (json.error) {
          setErrorMsg(json.error);
        }
      } catch (err: any) {
        console.error("Report lookup error:", err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [reportId, directPdfUrl]);

  return (
    <div className="min-h-screen bg-stone-950 text-amber-50 flex flex-col justify-between">
      <Header />

      <main className="pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto w-full flex-grow space-y-8">
        {/* Navigation Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-500/20 pb-4">
          <button
            onClick={() => router.push("/tools/kundali")}
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 hover:text-amber-200 transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} /> नई कुण्डली तैयार करें (New Kundali)
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="bg-stone-900/80 border border-amber-500/30 rounded-lg p-12 text-center space-y-6 max-w-2xl mx-auto shadow-2xl">
            <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <h2 className="font-serif text-2xl font-light text-amber-100 animate-pulse">
              धार्मिकश्री कुण्डली लोडिंग...
            </h2>
          </div>
        )}

        {/* PDF Viewer State */}
        {!isLoading && pdfUrl && (
          <div className="space-y-6">
            <div className="bg-stone-900/90 border border-amber-500/40 p-6 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-500/20 text-emerald-400 p-2.5 rounded-full border border-emerald-500/40 shrink-0">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-amber-100 flex items-center gap-2">
                    <FileText size={18} className="text-amber-400" /> वैदिक कुण्डली रिपोर्ट (Basic Horoscope PDF)
                  </h3>
                  <p className="text-xs text-amber-100/60 mt-0.5">
                    Astrology API Powered Kundali PDF Report
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-stone-800 hover:bg-stone-700 text-amber-200 border border-amber-500/30 text-xs font-bold uppercase tracking-widest py-3 px-4 rounded flex items-center justify-center gap-2 transition-all"
                >
                  <ExternalLink size={14} /> नई टैब में खोलें
                </a>

                <a
                  href={pdfUrl}
                  download="Dharmik_Shree_Kundali_Report.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-widest py-3 px-6 rounded flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <Download size={16} /> डाउनलोड पीडीऍफ़ (Download PDF)
                </a>
              </div>
            </div>

            <div className="border border-amber-500/30 rounded-lg overflow-hidden h-[850px] shadow-2xl bg-white">
              <iframe src={pdfUrl} className="w-full h-full border-none" title="Dharmik Shree Kundali PDF" />
            </div>
          </div>
        )}

        {/* Fallback to KundaliForm if no reportId / pdfUrl or loading finished without pdfUrl */}
        {!isLoading && !pdfUrl && (
          <div className="space-y-6">
            {errorMsg && (
              <div className="bg-red-950/40 border border-red-500/50 p-6 rounded-lg text-center space-y-3">
                <p className="text-sm text-red-200">{errorMsg}</p>
                <button
                  onClick={() => router.push("/tools/kundali")}
                  className="bg-amber-500 text-stone-950 px-5 py-2 rounded text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2"
                >
                  <RefreshCw size={14} /> नई कुण्डली तैयार करें
                </button>
              </div>
            )}
            <KundaliForm />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
