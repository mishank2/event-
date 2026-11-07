'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, HelpCircle, ChevronRight } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'What is Gatherly and what is your role in my event booking?',
    answer:
      'Gatherly is an intermediary discovery and booking concierge connecting customers with premier independent event venues and service providers in Ahmedabad. We do not own the businesses. We act as your private celebration representative, researching options, verifying real-time date availability, and coordinating quotes directly with venue management.',
  },
  {
    question: 'Why can’t I see vendor phone numbers or contact businesses directly?',
    answer:
      'To protect both customers and businesses. By channeling enquiries through Gatherly’s dedicated concierge desk, customers avoid relentless follow-up calls and spam from dozens of vendors. Furthermore, Gatherly leverages established relationships with Ahmedabad party plots and caterers to negotiate preferred rates and confirm genuine date availability.',
  },
  {
    question: 'How quickly will Gatherly contact me after I submit an enquiry?',
    answer:
      'Our Ahmedabad operations team typically reviews enquiries within 2 to 4 business hours. If your event date is urgent, our senior event manager will prioritize your request immediately to check calendar holds.',
  },
  {
    question: 'Does Gatherly charge customers an extra booking fee?',
    answer:
      'No. Customers enjoy complimentary access to our discovery portal and concierge assistance. The pricing quotes you receive through Gatherly reflect direct official venue rates without any customer-facing surcharges.',
  },
  {
    question: 'Can Gatherly arrange guided site visits across Ahmedabad party plots?',
    answer:
      'Yes! Once our team confirms that your preferred venue is available on your target date, we coordinate an accompanied or VIP-entry site inspection at the venue at a time convenient for your family.',
  },
  {
    question: 'Which areas of Ahmedabad do you cover?',
    answer:
      'We cover all prominent celebration corridors in Ahmedabad and Gandhinagar, including Sindhu Bhavan Road (SBR), S.G. Highway, Bodakdev, Prahlad Nagar, Satellite, Science City Road, Thaltej, South Bopal, Ambli, Vaishnodevi Circle, and Koba Road.',
  },
];

export const HomeFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 sm:py-20 bg-[#FBF9F5]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.2em] uppercase text-coral mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-coral" />
            <span>Got Questions?</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-charcoal-muted text-xs sm:text-sm mt-2">
            Everything you need to know about discovering and booking venues via Gatherly.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-3xl border border-sand-border overflow-hidden transition-all bg-white shadow-soft-xs"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif text-base font-bold text-charcoal hover:text-coral transition-colors"
                >
                  <span>{faq.question}</span>
                  <div
                    className={`w-7 h-7 rounded-xl bg-sand-light border border-sand-border flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-coral text-white border-coral' : 'text-charcoal-muted'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-charcoal/80 leading-relaxed border-t border-sand-border bg-sand-light/30 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/faq"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-coral hover:underline transition-colors"
          >
            <span>Have more questions? Read our full FAQ page</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
