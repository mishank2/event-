import React from 'react';
import Link from 'next/link';
import { Search, Send, ShieldCheck, CheckCircle2, ArrowRight, Sparkles, ChevronRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Discover & Compare',
      description:
        'Browse vetted Ahmedabad party plots, banquet halls, caterers, and decorators. Filter by capacity, budget, and locality with full transparency.',
      icon: <Search className="w-5 h-5 text-coral" />,
    },
    {
      step: '02',
      title: 'Send Enquiry to Gatherly',
      description:
        'Submit your event date, estimated guests, and preferred venues through our unified enquiry portal. You never have to chase multiple businesses.',
      icon: <Send className="w-5 h-5 text-coral" />,
    },
    {
      step: '03',
      title: 'Admin Checks Availability',
      description:
        'Our internal Ahmedabad concierge team privately contacts the relevant venue management to check calendar slots and negotiate preferred quotes.',
      icon: <ShieldCheck className="w-5 h-5 text-coral" />,
    },
    {
      step: '04',
      title: 'Stress-Free Booking',
      description:
        'Gatherly communicates verified rates and availability back to you. Review your options and confirm your dream celebration with peace of mind.',
      icon: <CheckCircle2 className="w-5 h-5 text-coral" />,
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-sand border-b border-sand-border text-charcoal relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.2em] uppercase text-coral mb-2">
            <Sparkles className="w-3.5 h-3.5 text-coral" />
            <span>Our Intermediary Service Model</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-charcoal">
            How Gatherly Works
          </h2>
          <p className="text-charcoal-muted text-xs sm:text-sm mt-2.5 leading-relaxed">
            We operate as your private celebration representative. Customers discover independent businesses on Gatherly, and our internal team handles all availability checks and vendor coordination.
          </p>
        </div>

        {/* 4 Steps Grid matching dashboard styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((item, index) => (
            <div
              key={item.step}
              className="relative p-6 rounded-3xl bg-white border border-sand-border shadow-soft-xs hover:shadow-soft transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-2xl bg-coral-soft flex items-center justify-center shadow-xs">
                    {item.icon}
                  </div>
                  <span className="font-serif text-3xl font-bold text-ochre">
                    {item.step}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-charcoal mb-2 group-hover:text-coral transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-charcoal-muted leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-3.5 border-t border-sand-border flex items-center justify-between text-[11px] text-coral font-bold">
                <span>Phase {index + 1}</span>
                <span className="text-charcoal-muted font-medium">Ahmedabad Concierge</span>
              </div>
            </div>
          ))}
        </div>

        {/* Callout Banner matching dashboard */}
        <div className="mt-12 p-7 sm:p-8 rounded-3xl bg-white border border-sand-border flex flex-col sm:flex-row items-center justify-between gap-6 shadow-soft-sm">
          <div className="text-left space-y-1">
            <h4 className="font-serif text-xl font-bold text-charcoal">
              Ready to plan your Ahmedabad celebration?
            </h4>
            <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed max-w-xl">
              Tell our concierge desk your requirements, and we will check verified availability across top party plots and banquets today.
            </p>
          </div>
          <Link
            href="/enquiry"
            className="px-7 py-3 rounded-2xl bg-coral hover:bg-coral-hover text-white font-bold text-xs sm:text-sm shrink-0 shadow-xs transition-all flex items-center gap-1.5"
          >
            <span>Submit Event Enquiry</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
