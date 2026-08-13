"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Download, ArrowLeft, RefreshCw, FileText, CheckCircle2, ShieldCheck } from "lucide-react";

export default function ReportProgressPage() {
  const router = useRouter();
  const params = useParams();
  const reportId = params?.id as string;

  const [status, setStatus] = useState<"processing" | "completed" | "error">("processing");
  const [progress, setProgress] = useState(15);
  const [pdfDataUrl, setPdfDataUrl] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const pollStatus = async () => {
    try {
      const res = await fetch(`/api/kundali/reports/${reportId}/status`);
      const json = await res.json();

      if (json.status === "completed" && json.pdfDataUrl) {
        setStatus("completed");
        setProgress(100);
        setPdfDataUrl(json.pdfDataUrl);
      } else if (json.status === "error") {
        setStatus("error");
        setErrorMsg(json.error || "Generation engine failed");
      } else {
        setStatus("processing");
        setProgress(json.progress || 50);
      }
    } catch (err: any) {
      console.error("Polling error:", err);
    }
  };

  useEffect(() => {
    if (!reportId) return;

    pollStatus();
    const interval = setInterval(() => {
      if (status !== "completed" && status !== "error") {
        pollStatus();
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [reportId, status]);

  return (
    <div className="min-h-screen bg-stone-950 text-amber-50 flex flex-col justify-between">
      <Header />

      <main className="pt-28 pb-20 px-4 md:px-8 max-w-5xl mx-auto w-full flex-grow space-y-8">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between border-b border-amber-500/20 pb-4">
          <button
            onClick={() => router.push("/tools/kundali")}
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 hover:text-amber-200 transition-colors"
          >
            <ArrowLeft size={16} /> नई कुण्डली तैयार करें (New Kundali)
          </button>

          {status === "completed" && pdfDataUrl && (
            <a
              href={pdfDataUrl}
              download={`Dharmik_Shree_Kundali_Report.pdf`}
              className="bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold uppercase tracking-widest py-2.5 px-5 rounded flex items-center gap-2 shadow-lg transition-all"
            >
              <Download size={16} /> डाउनलोड पीडीऍफ़ (Download PDF)
            </a>
          )}
        </div>

        {/* Loading State */}
        {status === "processing" && (
          <div className="bg-stone-900/80 border border-amber-500/30 rounded-lg p-12 text-center space-y-6 max-w-2xl mx-auto shadow-2xl">
            <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <div className="space-y-2">
              <h2 className="font-serif text-2xl font-light text-amber-100 animate-pulse">
                धार्मिकश्री सम्पूर्ण कुण्डली तैयार हो रही है...
              </h2>
              <p className="text-xs text-amber-100/60">
                200+ पृष्ठों की विस्तृत वैदिक गणनाएं, षोडशवर्ग, विंशोत्तरी, लाल किताब एवं वर्षफल रिपोर्ट संकलित की जा रही है।
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-black/60 border border-amber-500/30 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-600 to-amber-400 h-full transition-all duration-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-xs font-mono text-amber-400 font-bold">{progress}% Complete</div>
          </div>
        )}

        {/* Error State */}
        {status === "error" && (
          <div className="bg-red-950/40 border border-red-500/50 p-8 rounded-lg text-center space-y-4">
            <h3 className="font-serif text-xl font-bold text-red-200">कुण्डली जनरेशन त्रुटि</h3>
            <p className="text-xs text-red-100/80 max-w-lg mx-auto">{errorMsg}</p>
            <button
              onClick={() => router.push("/tools/kundali")}
              className="bg-amber-500 text-stone-950 px-6 py-2.5 rounded text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2"
            >
              <RefreshCw size={14} /> पुनः प्रयास करें
            </button>
          </div>
        )}

        {/* Completed PDF Viewer */}
        {status === "completed" && pdfDataUrl && (
          <div className="space-y-6">
            <div className="bg-stone-900/60 border border-amber-500/30 p-4 rounded flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={24} className="text-emerald-400" />
                <div>
                  <h3 className="font-serif font-bold text-lg text-amber-100">आपकी सम्पूर्ण कुण्डली रिपोर्ट तैयार है!</h3>
                  <p className="text-xs text-amber-100/60">High-resolution 200+ Page Official Dharmik Shree PDF Report</p>
                </div>
              </div>
              <a
                href={pdfDataUrl}
                download="Dharmik_Shree_Kundali.pdf"
                className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-widest py-3 px-6 rounded flex items-center gap-2 shadow-lg"
              >
                <Download size={16} /> डाउनलोड आधिकारिक PDF
              </a>
            </div>

            {/* Embedded Iframe */}
            <div className="border border-amber-500/30 rounded-lg overflow-hidden h-[850px] shadow-2xl bg-white">
              <iframe src={pdfDataUrl} className="w-full h-full border-none" title="Dharmik Shree Kundali PDF" />
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
