'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useEnquiryStore } from '@/store/useEnquiryStore';
import {
  ShieldCheck,
  HeartHandshake,
  Sparkles,
  MapPin,
  Building2,
  CheckCircle2,
  Users,
  Lock,
  ArrowRight,
} from 'lucide-react';

export default function AboutPage() {
  const openEnquiryModal = useEnquiryStore((state) => state.openEnquiryModal);

  return (
    <div className="py-12 sm:py-20 bg-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-soft text-forest text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
            <span>Our Intermediary Mission</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-6xl font-bold text-ink tracking-tight">
            Every Celebration, <br />
            <span className="italic font-normal text-forest">Beautifully Connected.</span>
          </h1>
          <p className="text-sm sm:text-base text-ink-secondary mt-4 leading-relaxed font-normal">
            Gatherly is an intermediary event venue and service discovery marketplace created specifically for Ahmedabad, Gujarat. We bridge the gap between families planning landmark celebrations and vetted local venue operators.
          </p>
        </div>

        {/* The Business Model & Role (Critical) */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-ivory-border shadow-soft-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold text-gold-dark uppercase tracking-wider block">
                How Gatherly Operates
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink">
                An Independent Bridge for Ahmedabad Events
              </h2>
              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                Existing businesses in Ahmedabad—including marriage halls, party plots, catering kitchens, decorators, and photographers—already operate independently.
              </p>
              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed font-semibold text-forest">
                Gatherly does NOT own these businesses.
              </p>
              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                Customers visit Gatherly to discover vetted businesses, explore virtual walkthroughs, compare pricing packages, and send centralized booking enquiries. All enquiries are directed exclusively to Gatherly’s internal concierge team, who privately checks availability with venue administrators and negotiates optimal terms.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <span className="px-3 py-1 rounded-full bg-emerald-soft text-forest text-xs font-semibold">
                  Zero Vendor Phone Spam
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-soft text-forest text-xs font-semibold">
                  100% Free for Hosts
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-soft text-forest text-xs font-semibold">
                  Direct Date Checks
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden bg-ivory-dark shadow-md">
              <Image
                src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=80"
                alt="Ahmedabad Wedding Celebration"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink">
              Our Core Principles
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted mt-2">
              How we protect hosts and ensure high standards across every corridor.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-ivory-border shadow-soft-sm">
              <div className="w-10 h-10 rounded-2xl bg-emerald-soft flex items-center justify-center text-forest mb-4">
                <Lock className="w-5 h-5 text-gold-dark" />
              </div>
              <h3 className="font-serif font-bold text-base text-ink mb-1">Privacy Protection</h3>
              <p className="text-xs text-ink-secondary leading-relaxed">
                We never distribute your mobile number or email to multiple vendors. Gatherly acts as your single discreet liaison.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-ivory-border shadow-soft-sm">
              <div className="w-10 h-10 rounded-2xl bg-emerald-soft flex items-center justify-center text-forest mb-4">
                <ShieldCheck className="w-5 h-5 text-gold-dark" />
              </div>
              <h3 className="font-serif font-bold text-base text-ink mb-1">In-Person Audits</h3>
              <p className="text-xs text-ink-secondary leading-relaxed">
                Our Ahmedabad operations team audits lawn square footage, green room amenities, and sound permits before publishing listings.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-ivory-border shadow-soft-sm">
              <div className="w-10 h-10 rounded-2xl bg-emerald-soft flex items-center justify-center text-forest mb-4">
                <MapPin className="w-5 h-5 text-gold-dark" />
              </div>
              <h3 className="font-serif font-bold text-base text-ink mb-1">Local Knowledge</h3>
              <p className="text-xs text-ink-secondary leading-relaxed">
                From SBR to Bopal, we know auspicious date calendars, parking logistics, and seasonal Gujarat weather patterns.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-ivory-border shadow-soft-sm">
              <div className="w-10 h-10 rounded-2xl bg-emerald-soft flex items-center justify-center text-forest mb-4">
                <HeartHandshake className="w-5 h-5 text-gold-dark" />
              </div>
              <h3 className="font-serif font-bold text-base text-ink mb-1">Transparent Pricing</h3>
              <p className="text-xs text-ink-secondary leading-relaxed">
                Clear pricing units, package inclusions, and verified guest capacity ratings—with no surprise surcharges.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-forest text-white text-center max-w-4xl mx-auto shadow-lg space-y-4">
          <h2 className="font-serif text-2xl sm:text-4xl font-bold">
            Plan your Ahmedabad celebration with confidence.
          </h2>
          <p className="text-xs sm:text-sm text-white/80 max-w-xl mx-auto">
            Discover verified party plots, banquet halls, and wedding decorators with dedicated concierge assistance.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/businesses"
              className="px-6 py-3 rounded-xl bg-gold hover:bg-gold-dark text-forest-deep font-bold text-xs shadow-xs transition-colors"
            >
              Explore Venues &amp; Vendors
            </Link>
            <button
              onClick={() => openEnquiryModal()}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs transition-colors"
            >
              Submit Event Enquiry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
