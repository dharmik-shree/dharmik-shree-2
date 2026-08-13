"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import KundaliForm from "@/components/kundali/KundaliForm";

export default function KundaliGeneratorPage() {
  return (
    <div className="min-h-screen bg-stone-950 text-amber-50 flex flex-col justify-between">
      <Header />

      <main className="pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto w-full flex-grow">
        <KundaliForm />
      </main>

      <Footer />
    </div>
  );
}
