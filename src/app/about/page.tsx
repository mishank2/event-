import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  HeartHandshake,
  MapPin,
  Sparkles,
  Users,
  Building2,
  CalendarCheck,
  CheckCircle2,
  PhoneOff,
  ChevronRight
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-[#FBF9F5] min-h-screen py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-sand text-coral border border-sand-border">
            <Sparkles className="w-3.5 h-3.5 text-coral" />
            <span>The Gatherly Vision</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal tracking-tight">
            Ahmedabad’s Premier Event Discovery Concierge
          </h1>
          <p className="text-charcoal-muted text-xs sm:text-sm leading-relaxed">
            Gatherly is an intermediary marketplace created to bring dignity, transparency, and calm to celebration planning across Gujarat.
          </p>
        </div>

        {/* Core Intermediary Business Model Explained */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-sand-border shadow-soft-sm space-y-6">
          <div className="flex items-center gap-3.5 pb-5 border-b border-sand-border">
            <div className="w-12 h-12 rounded-2xl bg-sand flex items-center justify-center text-coral shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-charcoal">
                Our Intermediary Business Model
              </h2>
              <p className="text-xs text-ochre font-semibold">
                How Gatherly Connects Customers & Independent Businesses
              </p>
            </div>
          </div>

          <div className="text-xs sm:text-sm text-charcoal/85 space-y-4 leading-relaxed">
            <p>
              Gatherly is an intermediary discovery and booking platform connecting customers with vetted local event venues and service providers in Ahmedabad.
            </p>
            <p>
              Top celebration businesses across Gujarat—including marriage halls, party plots, luxury banquet halls, wedding gardens, gourmet catering firms, decorators, and candid photographers—operate independently. <strong className="text-charcoal">Gatherly does not own or operate these businesses.</strong>
            </p>
            <p>
              Instead, Gatherly serves as your trusted, dedicated celebration representative. Customers browse curated business portfolios, review facilities and guest capacities, and submit booking enquiries through our unified portal.
            </p>
            <div className="p-5 rounded-3xl bg-sand border border-sand-border text-charcoal space-y-2">
              <div className="flex items-center gap-2 font-bold text-coral text-sm">
                <HeartHandshake className="w-5 h-5 text-coral" />
                <span>The Gatherly Concierge Promise</span>
              </div>
              <p className="text-xs text-charcoal/85 leading-relaxed">
                All customer enquiries are handled directly by Gatherly’s internal concierge team. Customers do not contact vendors directly through this platform. Gatherly Admin privately contacts the relevant venue management, checks calendar availability, negotiates official quotes, and presents you with consolidated options.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Value */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-6 rounded-3xl bg-white border border-sand-border shadow-soft-xs space-y-2.5">
            <div className="w-10 h-10 rounded-2xl bg-coral-soft text-coral flex items-center justify-center font-bold text-sm">
              01
            </div>
            <h3 className="font-serif text-lg font-bold text-charcoal">
              Zero Direct Vendor Harassment
            </h3>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              Traditional directories broadcast your personal phone number to hundreds of vendors, resulting in endless cold calls. On Gatherly, your identity is private. You talk only to our dedicated concierge.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-sand-border shadow-soft-xs space-y-2.5">
            <div className="w-10 h-10 rounded-2xl bg-ochre-soft text-ochre flex items-center justify-center font-bold text-sm">
              02
            </div>
            <h3 className="font-serif text-lg font-bold text-charcoal">
              Real Date Availability Pre-Checks
            </h3>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              In Ahmedabad, auspicious wedding dates (Muhurat dates) book out 6 to 12 months in advance. Our desk maintains active communication with party plot managers to verify true slot status before you waste time on site visits.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-sand-border shadow-soft-xs space-y-2.5">
            <div className="w-10 h-10 rounded-2xl bg-sand text-charcoal flex items-center justify-center font-bold text-sm">
              03
            </div>
            <h3 className="font-serif text-lg font-bold text-charcoal">
              Hyper-Local Ahmedabad Expertise
            </h3>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              We specialize specifically in the Ahmedabad and Gandhinagar belt—understanding the exact parking dynamics of Sindhu Bhavan Road, sound permissions on SG Highway, and Kathiyawadi vs. Swaminarayan catering kitchens.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-sand-border shadow-soft-xs space-y-2.5">
            <div className="w-10 h-10 rounded-2xl bg-sand text-charcoal flex items-center justify-center font-bold text-sm">
              04
            </div>
            <h3 className="font-serif text-lg font-bold text-charcoal">
              Transparent, Clean Communication
            </h3>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              We deliver accurate ballpark pricing, clear inclusion checklists, and transparent contract notes so families can make informed decisions together with joy and clarity.
            </p>
          </div>
        </div>

        {/* CTA Strip */}
        <div className="text-center p-8 sm:p-10 rounded-3xl bg-sand border border-sand-border text-charcoal space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold">
            Begin Your Celebration Journey Today
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-muted max-w-xl mx-auto">
            Explore Ahmedabad’s most distinguished party plots, banquets, and service partners, or speak to our concierge desk directly.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link
              href="/businesses"
              className="px-6 py-3 rounded-2xl bg-coral hover:bg-coral-hover text-white font-bold text-xs shadow-xs transition-colors"
            >
              Explore Businesses
            </Link>
            <Link
              href="/enquiry"
              className="px-6 py-3 rounded-2xl bg-white hover:bg-sand-dark text-charcoal font-semibold text-xs border border-sand-border transition-colors"
            >
              Submit Event Enquiry
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
