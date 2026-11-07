'use client';

import React from 'react';
import { Star, Quote, Sparkles, MapPin } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      id: 't-1',
      name: 'Riya & Viraj Shah',
      event: 'Grand Wedding & Sangeet',
      venue: 'Shantam Party Plot, Sindhu Bhavan Road',
      date: 'December 2025',
      stars: 5,
      quote:
        'Gatherly saved us dozens of venue visits. Their team verified availability on three auspicious dates across SBR and secured Shantam within two days. Not a single unsolicited vendor call!',
    },
    {
      id: 't-2',
      name: 'Pooja & Harshil Desai',
      event: 'Ring Ceremony & Cocktail Gala',
      venue: 'The Grand Bhagwati Royale, SG Highway',
      date: 'November 2025',
      stars: 5,
      quote:
        'The ability to explore verified video walkthroughs of the banquet halls and suites from home made shortlisting effortless for my parents. The concierge team handled all coordination smoothly.',
    },
    {
      id: 't-3',
      name: 'Bhavesh & Nidhi Patel',
      event: 'Silver Jubilee & Family Feast',
      venue: 'Keshav Party Plot, Bopal',
      date: 'January 2026',
      stars: 5,
      quote:
        'The pricing and guest capacity figures on Gatherly were completely transparent. When we submitted our enquiry, Gatherly promptly checked lawn slot availability and helped us lock in our weekend date.',
    },
    {
      id: 't-4',
      name: 'Mital & Krunal Mehta',
      event: 'Destination Style Lawn Wedding',
      venue: 'Green Pearl Botanical Gardens, Thaltej',
      date: 'February 2026',
      stars: 5,
      quote:
        'Finding an eco-luxury garden venue with 1,500 guest capacity in western Ahmedabad felt impossible until we browsed Gatherly. The concierge assistance was warm, professional, and discreet.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-ivory-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-soft text-forest text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
            <span>Celebration Stories</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink tracking-tight">
            What Our Hosts Say
          </h2>
          <p className="text-sm sm:text-base text-ink-secondary mt-3 font-normal leading-relaxed">
            Real families and couples who planned their milestone events with Gatherly&apos;s concierge guidance.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="p-7 sm:p-8 rounded-3xl bg-ivory border border-ivory-border shadow-soft-sm flex flex-col justify-between relative hover:shadow-soft transition-all duration-300"
            >
              <div>
                {/* Rating & Quote Icon */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-1 text-gold">
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-gold/30" />
                </div>

                <p className="font-serif italic text-base sm:text-lg text-ink leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Host Info */}
              <div className="mt-6 pt-5 border-t border-ivory-border flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-ink">{t.name}</h4>
                  <p className="text-xs text-forest font-medium mt-0.5">{t.event}</p>
                </div>
                <div className="text-right text-[11px] text-ink-muted">
                  <div className="flex items-center gap-1 justify-end">
                    <MapPin className="w-3 h-3 text-gold-dark" />
                    <span>{t.venue.split(',')[0]}</span>
                  </div>
                  <span>{t.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Demo Disclaimer */}
        <p className="text-center text-xs text-ink-muted mt-10">
          * Representative customer experiences from Ahmedabad event hosts. Genuine verified reviews appear on individual venue profiles.
        </p>
      </div>
    </section>
  );
};
