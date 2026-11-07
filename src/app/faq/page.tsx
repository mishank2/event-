'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ChevronDown,
  HelpCircle,
  ShieldCheck,
  Search,
  Sparkles,
  CalendarCheck,
  PhoneOff,
  MapPin,
  ChevronRight
} from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const ALL_FAQS: FAQItem[] = [
  // 1. Business Model & Intermediary Role
  {
    category: 'Business Model',
    question: 'What is Gatherly and how does it work?',
    answer:
      'Gatherly is an intermediary marketplace connecting customers with premier event venues and service providers in Ahmedabad. Existing businesses (party plots, marriage halls, caterers, decorators, photographers, makeup artists) operate independently; Gatherly does not own these businesses. Gatherly acts as your central concierge—curating options, checking calendar availability, negotiating pricing, and managing all communications so you never experience vendor spam.',
  },
  {
    category: 'Business Model',
    question: 'Why don’t you show the vendor’s direct phone number or WhatsApp?',
    answer:
      'To provide customers with a stress-free planning experience. In traditional open directories, your phone number is often sold or broadcast, causing you to receive dozens of unprompted cold calls. With Gatherly, your personal contact information remains strictly confidential with our internal team. We coordinate with the venue management on your behalf.',
  },
  {
    category: 'Business Model',
    question: 'Is there a vendor registration or login portal on this website?',
    answer:
      'No. This website is entirely customer-facing. Vendor onboarding, internal verifications, and admin scheduling are handled through private internal backend systems.',
  },
  {
    category: 'Business Model',
    question: 'Does Gatherly charge customers any platform fees for discovering venues?',
    answer:
      'No! Browsing businesses, shortlisting favorites, and submitting enquiries through Gatherly is 100% free for customers. The quotes we present reflect official venue pricing.',
  },

  // 2. Booking & Enquiries
  {
    category: 'Booking & Enquiries',
    question: 'What happens after I click "Submit Enquiry"?',
    answer:
      'Your request is routed immediately to Gatherly’s Ahmedabad operations desk. An assigned event manager reviews your guest count, preferred dates, and specific requirements, then privately reaches out to the relevant venue or service manager to verify availability and secure formal pricing.',
  },
  {
    category: 'Booking & Enquiries',
    question: 'How quickly will Gatherly contact me?',
    answer:
      'Our team typically responds within 2 to 4 business hours during standard operational timings (Monday to Saturday, 9:30 AM to 7:30 PM IST). For auspicious wedding muhurat dates in peak season, requests are prioritized.',
  },
  {
    category: 'Booking & Enquiries',
    question: 'Can I enquire about multiple party plots or services at the same time?',
    answer:
      'Yes! You can add multiple venues to your Wishlist and submit a consolidated enquiry, or mention all preferred names in the enquiry notes. Gatherly will compare date availability across all of them in a single report.',
  },
  {
    category: 'Booking & Enquiries',
    question: 'Can Gatherly arrange physical site visits to party plots?',
    answer:
      'Absolutely. Once our team verifies date availability, we schedule and confirm an accompanied or priority site visit at your convenience with the property management.',
  },

  // 3. Ahmedabad Venues & Locations
  {
    category: 'Ahmedabad Venues',
    question: 'Which areas of Ahmedabad do you cover?',
    answer:
      'We cover all top event corridors across Ahmedabad and Gandhinagar, including Sindhu Bhavan Road (SBR), S.G. Highway, Bodakdev, Prahlad Nagar, Satellite, Science City Road, Thaltej, South Bopal, Ambli Road, Vaishnodevi Circle, and Gandhinagar - Koba Road.',
  },
  {
    category: 'Ahmedabad Venues',
    question: 'What is the average party plot lawn rental in Ahmedabad?',
    answer:
      'Party plot lawn rentals in western Ahmedabad generally range from ₹1,50,000 to ₹4,50,000+ per day depending on lawn size (30,000 to 80,000+ sq.ft), prime location (e.g. SBR vs. outskirts), day of the week, and whether it falls on a peak wedding muhurat date.',
  },
  {
    category: 'Ahmedabad Venues',
    question: 'Are sound permits and late-night DJ allowances managed by Gatherly?',
    answer:
      'In Ahmedabad, outdoor party plots must adhere to Ahmedabad Police & municipal sound guidelines (typically outdoor amplified sound is permitted until 10:00 PM). Our concierge team will inform you of the exact sound restrictions for each specific property.',
  },

  // 4. Catering, Decor & Services
  {
    category: 'Services',
    question: 'Do you offer pure vegetarian, Jain, and Swaminarayan catering options?',
    answer:
      'Yes! All premier caterers curated on Gatherly in Ahmedabad (such as Gordhan Thal and royal banquet teams) offer specialized pure vegetarian, strict Jain (no onion, garlic, or root vegetables), and Swaminarayan catering counters with dedicated preparation vessels.',
  },
  {
    category: 'Services',
    question: 'Can I bring my own decorator or caterer to a listed party plot?',
    answer:
      'Every party plot has its own vendor policy: some have empaneled decorators/caterers, while others offer open-vendor policies (subject to royalty fees). Gatherly’s team will clarify the exact empanelment rules for each venue beforehand.',
  },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categories = ['All', 'Business Model', 'Booking & Enquiries', 'Ahmedabad Venues', 'Services'];

  const filteredFaqs = ALL_FAQS.filter((faq) => {
    if (activeCategory !== 'All' && faq.category !== activeCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return faq.question.toLowerCase().includes(q) || faq.answer.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="bg-[#FBF9F5] min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-coral mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-coral" />
            <span>Knowledge Centre</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-charcoal-muted text-xs sm:text-sm mt-2.5 max-w-xl mx-auto leading-relaxed">
            Learn how Gatherly connects you with Ahmedabad’s finest celebration spaces through our dedicated intermediary concierge.
          </p>
        </div>

        {/* Search Bar matching dashboard */}
        <div className="relative mb-6">
          <Search className="w-4 h-4 text-charcoal-muted absolute left-4 top-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQs (e.g. party plot pricing, sound permit, concierge, Jain catering)..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-sand-border bg-white text-xs sm:text-sm shadow-soft-xs focus:outline-none focus:border-coral focus:ring-2 focus:ring-coral/10 text-charcoal"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-coral text-white shadow-xs'
                  : 'bg-white text-charcoal-muted border border-sand-border hover:border-coral/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-3xl border border-sand-border overflow-hidden transition-all bg-white shadow-soft-xs"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif text-base font-bold text-charcoal hover:text-coral transition-colors"
                  >
                    <span className="flex-1">{faq.question}</span>
                    <div
                      className={`w-7 h-7 rounded-xl bg-sand-light border border-sand-border flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 bg-coral text-white border-coral' : 'text-charcoal-muted'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-charcoal/80 leading-relaxed border-t border-sand-border bg-sand-light/40 animate-in fade-in duration-200">
                      <p>{faq.answer}</p>
                      <span className="inline-block mt-3 px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-sand text-charcoal border border-sand-border">
                        {faq.category}
                      </span>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-white rounded-3xl border border-sand-border">
              <p className="text-xs sm:text-sm text-charcoal-muted">
                No matching questions found for &ldquo;{searchQuery}&rdquo;.
              </p>
            </div>
          )}
        </div>

        {/* Still have questions banner */}
        <div className="mt-12 p-8 rounded-3xl bg-sand border border-sand-border text-center space-y-3">
          <h3 className="font-serif text-2xl font-bold text-charcoal">Still have questions?</h3>
          <p className="text-xs sm:text-sm text-charcoal-muted max-w-md mx-auto">
            Our Ahmedabad concierge desk is happy to answer any custom inquiries about venues, auspicious dates, or catering.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-coral hover:bg-coral-hover text-white font-bold text-xs shadow-xs transition-colors"
            >
              <span>Contact Concierge Desk</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
