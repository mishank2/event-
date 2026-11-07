'use client';

import React from 'react';
import { Tilt3DCard } from '@/components/ui/Tilt3DCard';
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

        {/* 3 Privacy & Convenience Guarantees in 3D */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto text-left">
          <Tilt3DCard
            maxTilt={8}
            perspective={800}
            glareColor="rgba(197, 164, 109, 0.25)"
            className="rounded-2xl shadow-3d-floating"
          >
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md h-full flex flex-col justify-between">
              <div>
                <Lock className="w-5 h-5 text-gold mb-2.5 translate-z-20" />
                <h4 className="font-semibold text-white text-sm translate-z-10">Zero Spam Guarantee</h4>
                <p className="text-white/70 text-xs mt-1.5 leading-relaxed">
                  Your contact details stay private. No unsolicited calls from third-party vendors.
                </p>
              </div>
            </div>
          </Tilt3DCard>

          <Tilt3DCard
            maxTilt={8}
            perspective={800}
            glareColor="rgba(197, 164, 109, 0.25)"
            className="rounded-2xl shadow-3d-floating"
          >
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md h-full flex flex-col justify-between">
              <div>
                <Clock className="w-5 h-5 text-gold mb-2.5 translate-z-20" />
                <h4 className="font-semibold text-white text-sm translate-z-10">24-Hour Availability Turns</h4>
                <p className="text-white/70 text-xs mt-1.5 leading-relaxed">
                  Consolidated date checks across all shortlisted party plots and banquet halls.
                </p>
              </div>
            </div>
          </Tilt3DCard>

          <Tilt3DCard
            maxTilt={8}
            perspective={800}
            glareColor="rgba(197, 164, 109, 0.25)"
            className="rounded-2xl shadow-3d-floating"
          >
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md h-full flex flex-col justify-between">
              <div>
                <ShieldCheck className="w-5 h-5 text-gold mb-2.5 translate-z-20" />
                <h4 className="font-semibold text-white text-sm translate-z-10">Transparent Pricing</h4>
                <p className="text-white/70 text-xs mt-1.5 leading-relaxed">
                  Direct administrative rates with zero booking surcharges for event hosts.
                </p>
              </div>
            </div>
          </Tilt3DCard>
        </div>

        {/* Requested CTA with 3D elevation */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Tilt3DCard maxTilt={5} perspective={600} glareColor="rgba(255, 255, 255, 0.4)" className="rounded-xl inline-block">
            <button
              onClick={() => openEnquiryModal()}
              className="w-full sm:w-auto px-9 py-4 rounded-xl bg-gold hover:bg-gold-dark text-forest-deep font-bold text-sm shadow-3d-gold hover:shadow-gold transition-all flex items-center justify-center gap-2 active:scale-95 translate-z-20"
            >
              <span>Plan Your Event</span>
              <ArrowRight className="w-4 h-4 text-forest-deep" />
            </button>
          </Tilt3DCard>
        </div>
      </div>
    </section>
  );
};
