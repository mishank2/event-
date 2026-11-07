'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useEnquiryStore } from '@/store/useEnquiryStore';
import {
  HelpCircle,
  ChevronDown,
  ShieldCheck,
  CalendarCheck,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

interface FAQCategory {
  title: string;
  items: { q: string; a: string }[];
}

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({ '0-0': true });
  const openEnquiryModal = useEnquiryStore((state) => state.openEnquiryModal);

  const categories: FAQCategory[] = [
    {
      title: 'About Gatherly & Business Model',
      items: [
        {
          q: 'What is Gatherly and how does it work?',
          a: 'Gatherly is an intermediary discovery and booking concierge for wedding venues and event professionals in Ahmedabad. We discover, audit, and showcase independent party plots, marriage halls, banquet spaces, caterers, decorators, and photographers. Rather than having customers contact multiple vendors directly, all enquiries flow through Gatherly, where our team privately checks real-time availability and presents verified options.',
        },
        {
          q: 'Does Gatherly own or operate any event venues?',
          a: 'No. All marriage halls, party plots, and catering providers operate independently. Gatherly does not own, lease, or manage any properties. We act exclusively as a neutral discovery concierge connecting customers with local businesses.',
        },
        {
          q: 'Why are vendor phone numbers and emails hidden on Gatherly?',
          a: 'Direct contact details are intentionally withheld to protect host privacy and prevent vendor spam. When you submit your requirements, Gatherly’s concierge team acts as your single point of contact, checking availability and rates without disclosing your personal number to third parties.',
        },
        {
          q: 'Is there any fee or charge to use Gatherly?',
          a: 'No. Exploring venues, building wishlists, and submitting booking enquiries through Gatherly is 100% free for customers. You pay only the negotiated venue rates directly upon final booking confirmation.',
        },
      ],
    },
    {
      title: 'Venues & Availability Checks',
      items: [
        {
          q: 'Which areas in Ahmedabad does Gatherly cover?',
          a: 'We cover all major event corridors including Sindhu Bhavan Road (SBR), SG Highway, Bodakdev, Prahlad Nagar, Satellite, Bopal, South Bopal, Thaltej, Science City Road, Ambli Road, and Gandhinagar highway plots.',
        },
        {
          q: 'How fast does the concierge team check date availability?',
          a: 'Our Ahmedabad operations desk contacts venue managers directly and consolidates availability reports within 24 hours of your enquiry submission.',
        },
        {
          q: 'Can I schedule an in-person walkthrough before booking?',
          a: 'Yes. Simply mention in your enquiry that you would like an accompanied site visit. Our concierge coordinates appointment slots with venue staff.',
        },
      ],
    },
    {
      title: 'Enquiries, Pricing & Packages',
      items: [
        {
          q: 'Are the starting prices displayed on listings final?',
          a: 'Starting rates reflect standard non-peak day charges or starting per-plate buffet rates. During auspicious peak wedding dates, our concierge team confirms exact seasonal quotes directly with venue management.',
        },
        {
          q: 'Can I submit one enquiry for multiple venues and caterers?',
          a: 'Yes! You can add multiple venues to your Wishlist and submit one single enquiry. Gatherly’s concierge team will evaluate all shortlisted options simultaneously.',
        },
        {
          q: 'What event types can be planned through Gatherly?',
          a: 'Grand weddings, sangeet sandhyas, ring ceremonies, milestone birthdays, corporate summits, cultural sammelans, and family anniversary feasts.',
        },
      ],
    },
  ];

  const toggleItem = (catIdx: number, itemIdx: number) => {
    const key = `${catIdx}-${itemIdx}`;
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="py-8 sm:py-16 bg-ivory min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-soft text-forest text-xs font-bold uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-gold-dark" />
            <span>Help Center &amp; FAQ</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-ink-secondary mt-2 leading-relaxed">
            Detailed answers regarding our intermediary concierge model, privacy protections, and date verification services in Ahmedabad.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat, idx) => (
            <button
              key={cat.title}
              onClick={() => setSelectedCategory(idx)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === idx
                  ? 'bg-forest text-white shadow-xs'
                  : 'bg-white text-ink-secondary hover:text-ink border border-ivory-border'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {categories[selectedCategory].items.map((item, itemIdx) => {
            const key = `${selectedCategory}-${itemIdx}`;
            const isOpen = !!openItems[key];
            return (
              <div
                key={item.q}
                className="bg-white rounded-2xl border border-ivory-border shadow-soft-sm overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(selectedCategory, itemIdx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-serif font-bold text-base sm:text-lg text-ink hover:text-forest transition-colors"
                  aria-expanded={isOpen}
                >
                  <span>{item.q}</span>
                  <div
                    className={`w-8 h-8 rounded-full bg-ivory flex items-center justify-center shrink-0 border border-ivory-border transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-emerald-soft text-forest' : 'text-ink-muted'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-ink-secondary leading-relaxed border-t border-ivory-border/60 animate-fade-in">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Concierge Callout */}
        <div className="mt-12 p-8 rounded-3xl bg-forest text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-serif text-xl font-bold">Have a question not listed here?</h3>
            <p className="text-xs text-white/80">Our Ahmedabad concierge team is available to assist you 7 days a week.</p>
          </div>
          <button
            onClick={() => openEnquiryModal()}
            className="px-6 py-3 rounded-xl bg-gold hover:bg-gold-dark text-forest-deep font-bold text-xs shadow-xs transition-colors shrink-0"
          >
            Ask Concierge Desk
          </button>
        </div>
      </div>
    </div>
  );
}
