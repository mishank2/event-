'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useEnquiryStore } from '@/store/useEnquiryStore';
import {
  Calendar,
  CreditCard,
  MessageSquare,
  Users,
  Bell,
  ArrowRight,
  Sparkles,
  HeartHandshake
} from 'lucide-react';

export const DashboardHeroRow: React.FC = () => {
  const openEnquiryModal = useEnquiryStore((state) => state.openEnquiryModal);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 mb-8">
      {/* 1. Welcome Profile Banner Card (matches Card 1 in screenshot) */}
      <div className="lg:col-span-5 relative bg-[#F7EFE2] rounded-3xl p-6 sm:p-7 overflow-hidden border border-[#E9DEC9] shadow-soft-sm flex items-center justify-between min-h-[170px]">
        <div className="z-10 max-w-[62%]">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal tracking-tight">
            Hello Priyanshu!
          </h2>
          <p className="text-xs text-charcoal-light mt-1.5 leading-relaxed">
            Planning your grand celebration in Ahmedabad? Let Gatherly check availability for you.
          </p>
          <button
            onClick={() => openEnquiryModal()}
            className="mt-4 px-4.5 py-2.5 rounded-xl bg-[#E84E59] hover:bg-[#D43D48] text-white text-xs font-bold shadow-sm transition-transform active:scale-95 inline-flex items-center gap-1.5"
          >
            <span>Submit Enquiry</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right Bride / Celebratory Image */}
        <div className="absolute right-0 bottom-0 top-0 w-36 sm:w-44 overflow-hidden pointer-events-none flex items-end justify-center">
          <Image
            src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80"
            alt="Bride in bridal lehenga"
            width={220}
            height={260}
            className="object-cover object-top h-full w-full rounded-r-3xl"
          />
        </div>
      </div>

      {/* 2. Upcoming Countdown Card (matches Card 2 in screenshot) */}
      <div className="lg:col-span-2 bg-[#F9F5EE] rounded-3xl p-5 border border-[#E9DEC9] shadow-soft-sm flex flex-col justify-between">
        <div>
          <span className="text-[11px] text-charcoal-muted uppercase tracking-wider font-semibold block">
            Upcoming
          </span>
          <h3 className="font-serif text-sm font-bold text-charcoal -mt-0.5">
            Wedding
          </h3>
          <div className="mt-3">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#C89B3C]">
              150
            </span>
            <span className="text-xs text-charcoal-muted font-medium ml-1">Days</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-[#E8DEC9] flex items-center justify-between text-xs text-charcoal-light">
          <span className="font-semibold text-[11px]">12/12/2026</span>
          <Calendar className="w-4 h-4 text-charcoal-muted" />
        </div>
      </div>

      {/* 3. Budget Card (matches Card 3 in screenshot) */}
      <div className="lg:col-span-2 bg-[#F9F5EE] rounded-3xl p-5 border border-[#E9DEC9] shadow-soft-sm flex flex-col justify-between">
        <div>
          <span className="text-[11px] text-charcoal-muted uppercase tracking-wider font-semibold block">
            Budget
          </span>
          <div className="mt-2.5">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#C89B3C]">
              40<span className="text-xl">%</span>
            </span>
            <span className="text-xs text-charcoal-muted font-medium ml-1">Spent</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-[#E8DEC9] flex items-center justify-between text-xs text-charcoal-light">
          <span className="font-semibold text-[11px]">₹18 Lakhs Target</span>
          <CreditCard className="w-4 h-4 text-charcoal-muted" />
        </div>
      </div>

      {/* 4. Upcoming Guest List Card (matches Card 4 in screenshot) */}
      <div className="lg:col-span-3 bg-[#F9F5EE] rounded-3xl p-5 border border-[#E9DEC9] shadow-soft-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] text-charcoal-muted uppercase tracking-wider font-semibold">
              Upcoming
            </span>
            <Link
              href="/enquiry"
              className="text-[11px] text-red-500 hover:underline font-semibold"
            >
              View All Tasks
            </Link>
          </div>

          <h3 className="font-serif text-2xl font-bold text-charcoal mt-1">
            Guest List
          </h3>
          <p className="text-[11px] text-charcoal-muted mt-0.5">
            VVIP, VIP Guest
          </p>
          <p className="text-[11px] text-charcoal-muted">
            Family & Friends (~850 Pax)
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-[#E8DEC9] flex items-center justify-end">
          <div className="px-3 py-1.5 rounded-full bg-[#E84E59] text-white flex items-center gap-1.5 text-xs font-bold shadow-xs">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>8</span>
            <Bell className="w-3 h-3 ml-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
};
