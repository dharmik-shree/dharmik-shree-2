import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getPujaBySlug, getAllPujas } from "@/lib/pujaData";
import PujaDetailClient from "./PujaDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const pujas = await getAllPujas();
  return pujas.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const puja = await getPujaBySlug(slug);

  if (!puja) {
    return {
      title: "Puja Not Found | Dharmik Shree",
    };
  }

  return {
    title: `${puja.title} | Dharmik Shree`,
    description: puja.short_description || puja.subtitle || puja.description,
  };
}

export default async function PujaDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const puja = await getPujaBySlug(slug);

  if (!puja) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-brand-ivory text-brand-charcoal">
      <Header />
      <main className="flex-grow pt-24 md:pt-32 pb-24">
        <PujaDetailClient puja={puja} />
      </main>
      <Footer />
    </div>
  );
}
