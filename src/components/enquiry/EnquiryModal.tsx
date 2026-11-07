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
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto backdrop-blur-md bg-black/60 animate-fade-in"
    >
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-ivory-border overflow-hidden my-8 animate-scale-in">
        {/* Header matching luxury palette */}
        <div className="bg-forest px-6 sm:px-8 py-5 text-white flex items-center justify-between border-b border-forest-deep">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 text-gold flex items-center justify-center shadow-xs border border-white/15">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 id="modal-headline" className="font-serif text-xl font-bold tracking-tight text-white">
                Send Enquiry to Gatherly
              </h2>
              <p className="text-xs text-white/70">
                Ahmedabad Concierge Desk • Direct Date Availability Check
              </p>
            </div>
          </div>
          <button
            onClick={closeEnquiryModal}
            className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
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
