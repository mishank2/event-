'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useEnquiryStore } from '@/store/useEnquiryStore';
import {
  Calendar,
  CreditCard,
  Users,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  PieChart,
  ListTodo,
  TrendingUp,
} from 'lucide-react';

export const DashboardHeroRow: React.FC = () => {
  const openEnquiryModal = useEnquiryStore((state) => state.openEnquiryModal);

  // Data-driven wedding planner state
  const totalBudget = 2500000; // ₹25,00,000
  const spentBudget = 1050000; // ₹10,50,000
  const remainingBudget = totalBudget - spentBudget;
  const budgetPercentage = Math.round((spentBudget / totalBudget) * 100);

  const totalInvitedGuests = 850;
  const confirmedGuests = 520;
  const pendingGuests = totalInvitedGuests - confirmedGuests;

  const totalTasks = 12;
  const completedTasks = 7;
  const planningProgress = Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 mb-8">
      {/* 1. Welcome & Planning Overview Card (5 cols) */}
      <div className="lg:col-span-5 relative bg-emerald-soft rounded-3xl p-6 sm:p-7 overflow-hidden border border-emerald-primary/15 shadow-soft-sm flex items-center justify-between min-h-[190px]">
        <div className="z-10 max-w-[64%]">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-forest text-white text-[10px] font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3 h-3 text-gold" />
            <span>Event Concierge Hub</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink tracking-tight">
            Your Wedding Planner
          </h2>
          <p className="text-xs text-ink-secondary mt-1.5 leading-relaxed">
            Ahmedabad celebration roadmap. {planningProgress}% tasks completed across venue booking, catering, and guest lists.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <button
              onClick={() => openEnquiryModal()}
              className="px-4 py-2 rounded-xl bg-forest hover:bg-forest-dark text-white text-xs font-bold shadow-xs transition-transform active:scale-95 inline-flex items-center gap-1.5"
            >
              <span>Submit Date Enquiry</span>
              <ArrowRight className="w-3.5 h-3.5 text-gold" />
            </button>
            <Link
              href="/businesses"
              className="px-3.5 py-2 rounded-xl border border-forest/20 hover:bg-white/60 text-forest text-xs font-semibold transition-colors"
            >
              Browse Venues
            </Link>
          </div>
        </div>

        {/* Right Bridal Celebration Graphic */}
        <div className="absolute right-0 bottom-0 top-0 w-36 sm:w-44 overflow-hidden pointer-events-none flex items-end justify-center">
          <Image
            src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80"
            alt="Bride in bridal lehenga"
            width={220}
            height={260}
            className="object-cover object-top h-full w-full rounded-r-3xl opacity-95"
          />
        </div>
      </div>

      {/* 2. Wedding Date Countdown Card (2 cols) */}
      <div className="lg:col-span-2 bg-white rounded-3xl p-5 border border-ivory-border shadow-soft-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-ink-muted uppercase tracking-wider font-semibold">
              Countdown
            </span>
            <Calendar className="w-4 h-4 text-gold-dark" />
          </div>
          <h3 className="font-serif text-sm font-bold text-ink mt-0.5">
            Wedding Day
          </h3>
          <div className="mt-3">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-gold-dark">
              150
            </span>
            <span className="text-xs text-ink-secondary font-medium ml-1">Days Left</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-ivory-border flex items-center justify-between text-xs text-ink-secondary">
          <span className="font-semibold text-[11px]">12 Dec 2026</span>
          <span className="text-[10px] text-forest font-bold px-1.5 py-0.5 rounded bg-emerald-soft">
            Winter Season
          </span>
        </div>
      </div>

      {/* 3. Budget & Expense Tracking Card (2 cols) */}
      <div className="lg:col-span-2 bg-white rounded-3xl p-5 border border-ivory-border shadow-soft-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-ink-muted uppercase tracking-wider font-semibold">
              Budget Used
            </span>
            <CreditCard className="w-4 h-4 text-forest" />
          </div>
          <div className="mt-2.5">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-forest">
              {budgetPercentage}<span className="text-xl">%</span>
            </span>
            <span className="text-xs text-ink-secondary font-medium ml-1">Allocated</span>
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-ivory-dark h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-forest h-full rounded-full transition-all duration-500"
              style={{ width: `${budgetPercentage}%` }}
            />
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-ivory-border flex items-center justify-between text-xs text-ink-secondary">
          <div>
            <span className="text-[10px] text-ink-muted block leading-none">Remaining</span>
            <span className="font-bold text-ink text-xs">₹14.5 Lakhs</span>
          </div>
          <span className="text-[10px] text-ink-muted font-medium">₹25L Cap</span>
        </div>
      </div>

      {/* 4. Guest & Task Progress Card (3 cols) */}
      <div className="lg:col-span-3 bg-white rounded-3xl p-5 border border-ivory-border shadow-soft-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] text-ink-muted uppercase tracking-wider font-semibold">
              Guest RSVP Summary
            </span>
            <Link
              href="/enquiry"
              className="text-[11px] text-forest hover:underline font-bold"
            >
              Update List
            </Link>
          </div>

          <div className="flex items-baseline gap-2 mt-1">
            <h3 className="font-serif text-2xl font-bold text-ink">
              {confirmedGuests}
            </h3>
            <span className="text-xs text-ink-secondary">of {totalInvitedGuests} Confirmed</span>
          </div>

          {/* Guest breakdown tags */}
          <div className="flex items-center gap-2 mt-2 text-[10px]">
            <span className="px-2 py-0.5 rounded-full bg-emerald-soft text-forest font-semibold">
              {confirmedGuests} Confirmed
            </span>
            <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-semibold">
              {pendingGuests} Pending
            </span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-ivory-border flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-ink-secondary">
            <CheckCircle2 className="w-3.5 h-3.5 text-forest" />
            <span className="text-[11px]">7 of 12 Tasks Done</span>
          </div>
          <button
            onClick={() => openEnquiryModal()}
            className="text-forest hover:text-forest-dark text-[11px] font-bold"
          >
            Check Availability &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
