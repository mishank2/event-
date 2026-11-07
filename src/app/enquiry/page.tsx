'use client';

import React from 'react';
import { EnquiryForm } from '@/components/enquiry/EnquiryForm';
import {
  CalendarCheck,
  ShieldCheck,
  Clock,
  Sparkles,
  HeartHandshake
} from 'lucide-react';

export default function EnquiryPage() {
  return (
    <div className="bg-[#FBF9F5] min-h-screen py-10 sm:py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-coral mb-2">
            <CalendarCheck className="w-3.5 h-3.5 text-coral" />
            <span>Direct Concierge Intake</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal tracking-tight">
            Submit Your Event Enquiry
          </h1>
          <p className="text-charcoal-muted text-xs sm:text-sm mt-2.5 leading-relaxed">
            Tell Gatherly’s internal team about your celebration. We will check venue availability, negotiate dates, and revert with verified options in Ahmedabad.
          </p>
        </div>

        {/* 3 Step Intermediary Promise matching dashboard cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-xs">
          <div className="p-5 rounded-3xl bg-white border border-sand-border flex items-start gap-3 shadow-soft-xs">
            <div className="w-9 h-9 rounded-2xl bg-coral-soft flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 text-coral" />
            </div>
            <div>
              <h4 className="font-bold text-charcoal">100% Private Concierge</h4>
              <p className="text-charcoal-muted text-[11px] mt-0.5 leading-relaxed">
                Your contact info is never shared with third-party vendors.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-sand-border flex items-start gap-3 shadow-soft-xs">
            <div className="w-9 h-9 rounded-2xl bg-ochre-soft flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 text-ochre" />
            </div>
            <div>
              <h4 className="font-bold text-charcoal">Rapid Turnaround</h4>
              <p className="text-charcoal-muted text-[11px] mt-0.5 leading-relaxed">
                Response within 2-4 business hours with availability updates.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-sand-border flex items-start gap-3 shadow-soft-xs">
            <div className="w-9 h-9 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0">
              <HeartHandshake className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <h4 className="font-bold text-charcoal">Best Rates Negotiated</h4>
              <p className="text-charcoal-muted text-[11px] mt-0.5 leading-relaxed">
                Gatherly coordinates optimal pricing directly with venues.
              </p>
            </div>
          </div>
        </div>

        {/* Main Form Box */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-sand-border shadow-soft-sm">
          <EnquiryForm />
        </div>
      </div>
    </div>
  );
}
