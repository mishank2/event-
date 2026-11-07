'use client';

import React from 'react';
import { useEnquiryStore } from '@/store/useEnquiryStore';
import {
  Search,
  Heart,
  CalendarCheck,
  Headphones,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const openEnquiryModal = useEnquiryStore((state) => state.openEnquiryModal);

  const steps = [
    {
      number: '01',
      title: 'Discover & Compare',
      subtitle: 'Browse 150+ Verified Venues',
      description:
        'Explore party plots along Sindhu Bhavan Road, royal banquets on SG Highway, caterers and decorators with photos, pricing, and guest capacity.',
      icon: <Search className="w-5 h-5 text-gold-light" />,
    },
    {
      number: '02',
      title: 'Shortlist to Wishlist',
      subtitle: 'Save Your Top Choices',
      description:
        'Save matching venues, caterers, and decorators to your personal wishlist to compare amenities, packages, and location advantages.',
      icon: <Heart className="w-5 h-5 text-gold-light" />,
    },
    {
      number: '03',
      title: 'Submit Single Enquiry',
      subtitle: 'One Form for Your Whole Event',
      description:
        'Send your event dates, guest count, and requirements directly to Gatherly’s dedicated concierge desk. No vendor forms to fill repeatedly.',
      icon: <CalendarCheck className="w-5 h-5 text-gold-light" />,
    },
    {
      number: '04',
      title: 'Concierge Verification',
      subtitle: 'We Coordinate Everything',
      description:
        'Gatherly privately contacts venue management, verifies actual date availability, negotiates best quotes, and presents transparent options to you.',
      icon: <Headphones className="w-5 h-5 text-gold-light" />,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-forest-dark text-white relative overflow-hidden">
      {/* Ambient background blur */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-gold/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-gold-light border border-gold/30 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>The Gatherly Model</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            How Gatherly Works
          </h2>
          <p className="text-sm sm:text-base text-white/80 mt-3 font-normal leading-relaxed">
            We act as your private celebration concierge. You discover and choose; we handle date verification, vendor checks, and pricing coordination.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative p-6 sm:p-7 rounded-3xl bg-white/5 border border-white/10 hover:border-gold/50 backdrop-blur-md transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                {/* Step Number & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-serif text-3xl font-bold text-gold/80 group-hover:text-gold transition-colors">
                    {step.number}
                  </span>
                  <div className="w-11 h-11 rounded-2xl bg-forest-light/60 border border-gold/30 flex items-center justify-center">
                    {step.icon}
                  </div>
                </div>

                <h3 className="font-serif text-xl font-bold text-white mb-1">
                  {step.title}
                </h3>
                <p className="text-xs font-semibold text-gold-light mb-3">
                  {step.subtitle}
                </p>
                <p className="text-xs text-white/70 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-1.5 text-[11px] text-white/50 group-hover:text-gold-light transition-colors">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold" />
                <span>Zero vendor phone spam</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Card */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-white/10 border border-gold/40 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-serif text-xl font-bold text-white">
              Ready to verify date availability for your event?
            </h4>
            <p className="text-xs text-white/80">
              Submit an enquiry to Gatherly. Our concierge desk responds within 24 hours.
            </p>
          </div>

          <button
            onClick={() => openEnquiryModal()}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gold hover:bg-gold-dark text-forest-deep font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 shrink-0 active:scale-95"
          >
            <CalendarCheck className="w-4 h-4 text-forest-deep" />
            <span>Submit Event Enquiry</span>
          </button>
        </div>
      </div>
    </section>
  );
};
