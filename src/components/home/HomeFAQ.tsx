'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useEnquiryStore } from '@/store/useEnquiryStore';
import { ChevronDown, HelpCircle, CalendarCheck, Sparkles, ShieldCheck } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export const HomeFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const openEnquiryModal = useEnquiryStore((state) => state.openEnquiryModal);

  const faqs: FAQItem[] = [
    {
      question: 'What is Gatherly and how does it help event hosts?',
      answer:
        'Gatherly is an intermediary celebration concierge and discovery marketplace in Ahmedabad. We connect brides, grooms, families, and corporate planners with vetted party plots, marriage halls, banquet spaces, caterers, and photographers. Instead of calling dozens of vendors individually, you explore curated options on Gatherly and submit your requirements to our concierge team, who handles date checking and pricing for you.',
    },
    {
      question: 'Does Gatherly own or operate any of the listed venues?',
      answer:
        'No. Gatherly does not own, lease, or manage any marriage halls, party plots, or service providers. All businesses operate independently. Gatherly serves strictly as an intermediary discovery platform and coordination concierge to streamline venue discovery and availability verification.',
    },
    {
      question: 'Why are direct vendor phone numbers and WhatsApp links not displayed?',
      answer:
        'To protect your privacy and ensure transparent service, Gatherly manages all enquiries through our dedicated internal desk. By routing enquiries through Gatherly, you avoid unsolicited vendor sales calls, spam follow-ups, and inflated last-minute rates. Our team coordinates directly with the authorized administrative managers of each venue.',
    },
    {
      question: 'Is there any fee or charge for customers to use Gatherly?',
      answer:
        'Browsing, shortlisting venues, and submitting enquiries through Gatherly is completely free for customers. You pay only the agreed venue or vendor package directly upon confirmation.',
    },
    {
      question: 'How quickly does the Gatherly Concierge team check availability?',
      answer:
        'Once you submit an event enquiry with your preferred dates, guest count, and locality preferences, our Ahmedabad operations desk reaches out to the relevant venues and provides you with a consolidated availability report within 24 hours.',
    },
    {
      question: 'Are the guest capacities and starting prices on Gatherly accurate?',
      answer:
        'Our figures are based on comprehensive audits of each venue’s physical square footage, catering lawn layout, and standard rate cards across Ahmedabad corridors like Sindhu Bhavan Road, SG Highway, and Bodakdev. During auspicious high-demand dates, our concierge confirms final custom quotes directly with management.',
    },
    {
      question: 'Can I request in-person site visits for shortlisted party plots?',
      answer:
        'Yes! When you submit an enquiry, you can indicate that you would like an accompanied site walkthrough. Our team coordinates convenient appointment slots with venue caretaking staff.',
    },
    {
      question: 'What types of celebrations can I plan through Gatherly?',
      answer:
        'Gatherly supports grand multi-day Gujarati weddings, sangeet sandhyas, ring ceremonies, reception dinners, milestone birthdays, corporate summits, cultural sammelans, and baby showers across all Ahmedabad corridors.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-soft text-forest text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-gold-dark" />
            <span>Common Questions</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-ink-secondary mt-3 font-normal leading-relaxed">
            Everything you need to know about discovering and securing venues through Gatherly&apos;s concierge desk.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-ivory-border bg-ivory overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-serif font-bold text-base sm:text-lg text-ink hover:text-forest transition-colors"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <div
                    className={`w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 border border-ivory-border transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-emerald-soft text-forest' : 'text-ink-muted'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-ink-secondary leading-relaxed border-t border-ivory-border/60 animate-fade-in">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-12 p-6 rounded-3xl bg-ivory border border-gold-border flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-forest text-gold flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-ink">Have specific date or capacity questions?</h4>
              <p className="text-xs text-ink-secondary">Our Ahmedabad concierge desk is available 7 days a week.</p>
            </div>
          </div>
          <button
            onClick={() => openEnquiryModal()}
            className="px-5 py-2.5 rounded-xl bg-forest hover:bg-forest-light text-white text-xs font-bold shadow-xs transition-colors shrink-0"
          >
            Ask Gatherly Concierge
          </button>
        </div>
      </div>
    </section>
  );
};
