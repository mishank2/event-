'use client';

import React from 'react';
import { useEnquiryStore } from '@/store/useEnquiryStore';
import { EnquiryForm } from './EnquiryForm';
import { X, CalendarCheck, ShieldCheck } from 'lucide-react';

export const EnquiryModal: React.FC = () => {
  const { isOpen, selectedBusiness, closeEnquiryModal } = useEnquiryStore();

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto backdrop-blur-md bg-black/60 animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-sand-border overflow-hidden my-8 animate-in zoom-in-95 duration-200">
        {/* Header matching dashboard */}
        <div className="bg-sand px-6 sm:px-8 py-5 text-charcoal flex items-center justify-between border-b border-sand-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-coral text-white flex items-center justify-center shadow-xs">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 id="modal-headline" className="font-serif text-xl font-bold tracking-tight text-charcoal">
                Send Enquiry to Gatherly
              </h2>
              <p className="text-xs text-charcoal-muted">
                Ahmedabad Concierge Desk • Direct Date Availability Check
              </p>
            </div>
          </div>
          <button
            onClick={closeEnquiryModal}
            className="p-2 rounded-full hover:bg-sand-dark text-charcoal-muted hover:text-charcoal transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Body */}
        <div className="p-6 sm:p-8 max-h-[82vh] overflow-y-auto">
          <EnquiryForm preselectedBusiness={selectedBusiness} />
        </div>
      </div>
    </div>
  );
};
