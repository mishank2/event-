'use client';

import React from 'react';
import Link from 'next/link';
import { DashboardHeroRow } from '@/components/dashboard/DashboardHeroRow';
import { VendorCategoriesRow } from '@/components/dashboard/VendorCategoriesRow';
import { VenuesAndTrendingRow } from '@/components/dashboard/VenuesAndTrendingRow';
import { useEnquiryStore } from '@/store/useEnquiryStore';
import {
  CalendarCheck,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  LayoutDashboard,
  Heart,
  HelpCircle,
} from 'lucide-react';

export default function DashboardPage() {
  const openEnquiryModal = useEnquiryStore((state) => state.openEnquiryModal);

  return (
    <div className="py-8 sm:py-12 bg-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Workspace Top Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-ivory-border shadow-soft-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-soft text-forest text-xs font-bold uppercase tracking-wider mb-2">
              <LayoutDashboard className="w-3.5 h-3.5 text-gold" />
              <span>Private Host Workspace</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-ink tracking-tight">
              Event Planning Workspace
            </h1>
            <p className="text-sm text-ink-secondary mt-1 max-w-xl font-normal leading-relaxed">
              Track dates, manage budget allocations, coordinate guest lists, and review vendor milestones across Ahmedabad.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/wishlist"
              className="px-4 py-2.5 rounded-xl border border-ivory-border hover:bg-ivory text-ink text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              <span>Saved Shortlist</span>
            </Link>

            <button
              onClick={() => openEnquiryModal()}
              className="px-5 py-2.5 rounded-xl bg-forest hover:bg-forest-dark text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-colors active:scale-95"
            >
              <CalendarCheck className="w-4 h-4 text-gold" />
              <span>Submit Date Enquiry</span>
            </button>
          </div>
        </div>

        {/* Dynamic Multi-Event Planning Dashboard */}
        <DashboardHeroRow />

        {/* Category Shortcuts */}
        <div className="pt-2">
          <VendorCategoriesRow />
        </div>

        {/* Venues & Inspiration */}
        <div className="pt-2">
          <VenuesAndTrendingRow />
        </div>

        {/* Host Concierge Support Banner */}
        <div className="bg-forest-dark text-white rounded-3xl p-7 sm:p-9 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-gold-light text-xs font-bold uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1.5">
              <ShieldCheck className="w-4 h-4 text-gold" />
              <span>Dedicated Concierge Manager</span>
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
              Need assistance negotiating venue slots or custom catering?
            </h3>
            <p className="text-white/80 text-xs sm:text-sm max-w-xl font-normal">
              Our Ahmedabad event operations desk is on standby to check live lawn availability and secure custom host packages.
            </p>
          </div>

          <button
            onClick={() => openEnquiryModal()}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gold hover:bg-gold-dark text-forest-deep text-xs sm:text-sm font-bold shrink-0 transition-colors shadow-xs"
          >
            Speak with Concierge
          </button>
        </div>
      </div>
    </div>
  );
}
