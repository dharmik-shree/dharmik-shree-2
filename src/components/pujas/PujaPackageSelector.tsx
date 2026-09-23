"use client";

import React, { useState } from "react";
import { Check, CheckCircle2, User, Users, Sparkles, ArrowRight, ShieldCheck, HeartHandshake, X } from "lucide-react";
import { PujaPackage } from "@/types/puja";

interface PujaPackageSelectorProps {
  packages: PujaPackage[];
  isOpen: boolean;
  onClose: () => void;
  onSelectPackage: (pkg: PujaPackage) => void;
  initialSelectedPackageId?: string;
}

export default function PujaPackageSelector({
  packages,
  isOpen,
  onClose,
  onSelectPackage,
  initialSelectedPackageId,
}: PujaPackageSelectorProps) {
  const [selectedId, setSelectedId] = useState<string>(
    initialSelectedPackageId || packages[0]?.id || ""
  );

  if (!isOpen) return null;

  const selectedPkg = packages.find((p) => p.id === selectedId) || packages[0];

  const handleProceed = () => {
    if (selectedPkg) {
      onSelectPackage(selectedPkg);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      {/* Dark backdrop */}
      <div
        className="fixed inset-0 bg-brand-charcoal/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-white rounded-xl shadow-2xl overflow-hidden border border-brand-gold/30 z-10 my-auto flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-20">
          <div>
            <h3 className="font-serif text-xl sm:text-2xl text-brand-charcoal font-semibold tracking-wide">
              All Puja Packages includes
            </h3>
            <p className="text-xs text-brand-charcoal/60 mt-0.5">
              Select the package suited for you and your family
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {/* Universal Features list (from Screenshot 1) */}
          <div className="bg-amber-50/60 border border-amber-200/60 rounded-lg p-4 space-y-2.5 text-xs sm:text-sm text-gray-700">
            <div className="flex items-start gap-2.5">
              <Check size={18} className="text-emerald-600 shrink-0 mt-0.5" />
              <span>The participant&apos;s name and gotra will be recited by an experienced Panditji during the puja.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <Check size={18} className="text-emerald-600 shrink-0 mt-0.5" />
              <span>Participants will receive guided mantras and step-by-step instructions to join the puja from home.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <Check size={18} className="text-emerald-600 shrink-0 mt-0.5" />
              <span>A complete uncut video recording and photos of the puja will be shared on your WhatsApp.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <Check size={18} className="text-emerald-600 shrink-0 mt-0.5" />
              <span>A free Aashirwad Box with consecrated Tirth Prasad will be delivered to your home address.</span>
            </div>
          </div>

          {/* Daan Seva callout */}
          <div className="bg-emerald-50/80 border border-emerald-200 rounded-lg p-3 text-xs text-emerald-800 flex items-center gap-2.5">
            <HeartHandshake size={20} className="text-emerald-700 shrink-0" />
            <span>
              <strong>Seva Contribution:</strong> Opt for additional sacred offerings like Vastra Daan, Anna Daan, Deep Daan, or Gau Seva in your lineage name.
            </span>
          </div>

          {/* Select your puja package Section */}
          <div>
            <h4 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
              Select your puja package
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {packages.map((pkg) => {
                const isSelected = selectedId === pkg.id;

                return (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedId(pkg.id)}
                    className={`relative rounded-lg p-4 cursor-pointer transition-all border-2 text-left flex flex-col justify-between ${
                      isSelected
                        ? "border-[#E56910] bg-orange-50/40 shadow-md ring-1 ring-[#E56910]"
                        : "border-gray-200 hover:border-orange-300 bg-white"
                    }`}
                  >
                    {/* Badge & Person count */}
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-orange-100 text-orange-800">
                        {pkg.max_persons === 1 ? (
                          <>
                            <User size={12} /> 1 Person
                          </>
                        ) : pkg.max_persons === 2 ? (
                          <>
                            <Users size={12} /> 2 Person (Couple)
                          </>
                        ) : (
                          <>
                            <Users size={12} /> {pkg.max_persons}+ Persons (Family)
                          </>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5">
                        {pkg.badge_text && (
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-600 text-white">
                            {pkg.badge_text}
                          </span>
                        )}
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                            isSelected
                              ? "bg-[#E56910] border-[#E56910] text-white"
                              : "border-gray-300"
                          }`}
                        >
                          {isSelected && <Check size={12} strokeWidth={3} />}
                        </div>
                      </div>
                    </div>

                    {/* Title */}
                    <h5 className="font-serif text-lg font-bold text-gray-900 mb-1 leading-snug">
                      {pkg.name}
                    </h5>

                    {/* Description */}
                    {pkg.description && (
                      <p className="text-xs text-gray-600 line-clamp-2 mb-3 font-light">
                        {pkg.description}
                      </p>
                    )}

                    {/* Inclusions bullets */}
                    {pkg.inclusions && pkg.inclusions.length > 0 && (
                      <ul className="text-[11px] text-gray-600 space-y-1 mb-3 pt-2 border-t border-gray-100">
                        {pkg.inclusions.slice(0, 3).map((item, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Pricing */}
                    <div className="flex items-baseline gap-2 pt-2 border-t border-gray-100">
                      <span className="font-serif text-2xl font-bold text-[#E56910]">
                        ₹{pkg.price}
                      </span>
                      {pkg.original_price && (
                        <span className="text-xs text-gray-400 line-through">
                          ₹{pkg.original_price}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Bottom Action Bar (matching green/gold proceed CTA in Screenshot 1) */}
        <div className="p-4 sm:p-5 border-t border-gray-200 bg-white sticky bottom-0 z-20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="w-full sm:w-auto text-left">
              <span className="text-xs text-gray-500 uppercase tracking-wider block">Selected Package</span>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-2xl font-bold text-emerald-800">
                  ₹{selectedPkg?.price}
                </span>
                <span className="text-xs font-medium text-gray-700 truncate max-w-[240px]">
                  {selectedPkg?.name}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleProceed}
              className="w-full sm:w-auto px-8 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm rounded-lg transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
