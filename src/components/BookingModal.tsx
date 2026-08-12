"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import BookingForm from "./BookingForm";

export interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export default function BookingModal({ isOpen, onClose, defaultService }: BookingModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-brand-charcoal/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-3xl my-8">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 text-brand-ivory/60 hover:text-brand-gold p-2 transition-colors duration-300 cursor-pointer"
          aria-label="Close modal"
        >
          <X size={22} />
        </button>

        <BookingForm onSuccess={() => {}} defaultService={defaultService} />
      </div>
    </div>
  );
}
