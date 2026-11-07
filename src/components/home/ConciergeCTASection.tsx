'use client';

import React from 'react';
import { useEnquiryStore } from '@/store/useEnquiryStore';
import {
  CalendarCheck,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Clock,
  Lock,
} from 'lucide-react';

export const ConciergeCTASection: React.FC = () => {
  const openEnquiryModal = useEnquiryStore((state) => state.openEnquiryModal);

  return (
    <section className="py-20 sm:py-28 bg-forest-dark text-white relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-br from-forest-deep via-forest-dark to-forest-deep" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gold/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-gold/40 text-xs font-semibold text-gold-light mb-6 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span>Bespoke Concierge Service</span>
        </div>

        {/* Requested Headline */}
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white max-w-2xl mx-auto leading-tight">
          Planning something special?
        </h2>

        {/* Requested Description */}
        <p className="text-base sm:text-lg text-white/85 font-sans leading-relaxed max-w-xl mx-auto mt-4 font-normal">
          Tell us about your event. Gatherly will help you discover suitable venues and professionals.
        </p>

        {/* 3 Privacy & Convenience Guarantees */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto text-left">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
            <Lock className="w-4 h-4 text-gold mb-2" />
            <h4 className="font-semibold text-white text-xs">Zero Spam Guarantee</h4>
            <p className="text-white/70 text-[11px] mt-1 leading-relaxed">
              Your contact details stay private. No unsolicited calls from third-party vendors.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
            <Clock className="w-4 h-4 text-gold mb-2" />
            <h4 className="font-semibold text-white text-xs">24-Hour Availability Turns</h4>
            <p className="text-white/70 text-[11px] mt-1 leading-relaxed">
              Consolidated date checks across all shortlisted party plots and banquet halls.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
            <ShieldCheck className="w-4 h-4 text-gold mb-2" />
            <h4 className="font-semibold text-white text-xs">Transparent Pricing</h4>
            <p className="text-white/70 text-[11px] mt-1 leading-relaxed">
              Direct administrative rates with zero booking surcharges for event hosts.
            </p>
          </div>
        </div>

        {/* Requested CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => openEnquiryModal()}
            className="w-full sm:w-auto px-9 py-4 rounded-xl bg-gold hover:bg-gold-dark text-forest-deep font-bold text-sm shadow-md hover:shadow-gold transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <span>Plan Your Event</span>
            <ArrowRight className="w-4 h-4 text-forest-deep" />
          </button>
        </div>
      </div>
    </section>
  );
};
