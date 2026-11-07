'use client';

import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Lock,
  Sparkles,
  HeartHandshake,
  Clock,
  Layers,
} from 'lucide-react';

export const WhyChooseGatherly: React.FC = () => {
  const reasons = [
    {
      icon: <Lock className="w-5 h-5 text-forest" />,
      title: 'Privacy-First Concierge',
      description:
        'Your mobile number and email are never shared with venues or vendors. All availability checks and price negotiations are conducted privately by Gatherly.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-forest" />,
      title: 'Hand-Curated Listings',
      description:
        'We physically visit and audit party plots, lawn turf quality, acoustic permits, bridal suites, and kitchen infrastructure before listing on Gatherly.',
    },
    {
      icon: <MapPin className="w-5 h-5 text-forest" />,
      title: 'Deep Ahmedabad Expertise',
      description:
        'From high-demand Sindhu Bhavan Road corridors to serene Gandhinagar highways, our local team knows auspicious wedding dates, corporate calendar peaks, and zoning rules.',
    },
    {
      icon: <Layers className="w-5 h-5 text-forest" />,
      title: 'Complete Vendor Ecosystem',
      description:
        'Coordinate venues, authentic caterers, photographers, corporate AV setups, and thematic decorators through a single dashboard.',
    },
    {
      icon: <Clock className="w-5 h-5 text-forest" />,
      title: 'Fast Availability Turns',
      description:
        'Instead of calling 15 venues yourself, submit one enquiry and receive consolidated date availability and pricing within 24 to 48 hours.',
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-forest" />,
      title: 'Zero Hidden Booking Markups',
      description:
        'Gatherly is completely free for event hosts to browse and enquire. We work directly with venue administrations to secure transparent rates.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-soft text-forest text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
            <span>The Gatherly Difference</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink tracking-tight">
            Why Ahmedabad Chooses Gatherly
          </h2>
          <p className="text-sm sm:text-base text-ink-secondary mt-3 font-normal leading-relaxed">
            A celebration marketplace built on privacy, transparent discovery, and dedicated local coordination.
          </p>
        </div>

        {/* 6 Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, idx) => (
            <div
              key={idx}
              className="p-7 rounded-3xl bg-white border border-ivory-border shadow-soft-sm hover:shadow-soft hover:border-gold-border transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-soft flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  {reason.icon}
                </div>
                <h3 className="font-serif text-xl font-bold text-ink mb-2">
                  {reason.title}
                </h3>
                <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                  {reason.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-ivory-border flex items-center gap-1.5 text-xs font-semibold text-forest">
                <CheckCircle2 className="w-4 h-4 text-gold-dark" />
                <span>Gatherly Standard Guarantee</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
