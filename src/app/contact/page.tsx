'use client';

import React from 'react';
import Link from 'next/link';
import { EnquiryForm } from '@/components/enquiry/EnquiryForm';
import {
  MapPin,
  Mail,
  Clock,
  ShieldCheck,
  Headphones,
  PhoneOff,
  ChevronRight
} from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="bg-[#FBF9F5] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-coral mb-2">
            <Headphones className="w-3.5 h-3.5 text-coral" />
            <span>Gatherly Operations Desk</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal tracking-tight">
            Connect with Gatherly Concierge
          </h1>
          <p className="text-charcoal-muted text-xs sm:text-sm mt-2.5 leading-relaxed">
            Have questions about venue availability, pricing negotiations, or scheduling site visits in Ahmedabad? Reach out directly to Gatherly’s central team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Office info & Intermediary Model Notice */}
          <div className="lg:col-span-5 space-y-5">
            {/* Intermediary Reminder */}
            <div className="p-6 rounded-3xl bg-sand border border-sand-border shadow-soft-xs space-y-3">
              <div className="flex items-center gap-2 font-bold text-charcoal text-base">
                <ShieldCheck className="w-5 h-5 text-ochre" />
                <span>Centralized Concierge Support</span>
              </div>
              <p className="text-xs text-charcoal/85 leading-relaxed">
                All communications on Gatherly are handled by our dedicated event operations team in Ahmedabad.
              </p>
              <div className="p-3 bg-white rounded-2xl text-[11px] text-charcoal-muted flex items-start gap-2 border border-sand-border">
                <PhoneOff className="w-4 h-4 text-coral shrink-0 mt-0.5" />
                <span>
                  Vendors do not receive your personal phone number. Our team acts as your private advocate and negotiator.
                </span>
              </div>
            </div>

            {/* Concierge Desk Details */}
            <div className="p-6 rounded-3xl bg-white border border-sand-border shadow-soft-sm space-y-5 text-xs text-charcoal">
              <h3 className="font-serif text-lg font-bold text-charcoal">
                Ahmedabad Operations Desk
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-sand-light border border-sand-border flex items-center justify-center text-coral shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-charcoal block">Concierge Office</span>
                    <p className="text-charcoal-muted mt-0.5 leading-relaxed">
                      Level 6, Titanium Heights, Sindhu Bhavan Road, Bodakdev, Ahmedabad, Gujarat 380054
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-sand-light border border-sand-border flex items-center justify-center text-ochre shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-charcoal block">Admin & Concierge Email</span>
                    <p className="text-charcoal-muted mt-0.5">
                      concierge@gatherly.in (Internal Admin Only)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-sand-light border border-sand-border flex items-center justify-center text-coral shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-charcoal block">Concierge Desk Timings</span>
                    <p className="text-charcoal-muted mt-0.5">
                      Monday to Saturday: 9:30 AM – 7:30 PM IST
                    </p>
                    <p className="text-[11px] text-coral font-semibold mt-0.5">
                      Urgent wedding date queries handled on priority.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick links */}
            <div className="p-5 rounded-3xl bg-sand-light border border-sand-border text-xs">
              <span className="font-bold text-charcoal block mb-1">Looking for a specific venue?</span>
              <p className="text-charcoal-muted mb-3">
                Browse our curated listings to find your match, then send an enquiry with one tap.
              </p>
              <Link
                href="/businesses"
                className="text-coral font-bold hover:underline inline-flex items-center gap-1"
              >
                <span>Browse Ahmedabad Businesses</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Contact & Enquiry Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-sand-border shadow-soft-sm">
            <div className="mb-6">
              <h2 className="font-serif text-2xl font-bold text-charcoal">
                Send an Enquiry to Gatherly Admin
              </h2>
              <p className="text-xs text-charcoal-muted mt-1">
                Fill in your details below and our team will get back to you with confirmed availability.
              </p>
            </div>
            <EnquiryForm />
          </div>
        </div>
      </div>
    </div>
  );
}
