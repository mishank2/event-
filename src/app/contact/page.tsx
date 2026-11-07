'use client';

import React, { useState } from 'react';
import { useToastStore } from '@/store/useToastStore';
import {
  MapPin,
  Mail,
  Clock,
  ShieldCheck,
  Send,
  Sparkles,
  Headphones,
  CheckCircle2,
} from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Date Availability Enquiry');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const addToast = useToastStore((state) => state.addToast);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    addToast({
      type: 'success',
      title: 'Message Sent',
      message: 'Gatherly Concierge Desk will review your note and respond shortly.',
    });
  };

  return (
    <div className="py-8 sm:py-16 bg-ivory min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-soft text-forest text-xs font-bold uppercase tracking-wider mb-2">
            <Headphones className="w-3.5 h-3.5 text-gold-dark" />
            <span>Ahmedabad Concierge Desk</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink tracking-tight">
            Contact Gatherly Team
          </h1>
          <p className="text-xs sm:text-sm text-ink-secondary mt-2 leading-relaxed">
            Need guidance choosing a wedding venue corridor or checking dates across multiple party plots? Our local concierge team is ready to assist.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Office & Concierge Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-ivory-border shadow-soft-sm space-y-6">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink">
                Concierge Operations
              </h2>
              <p className="text-xs text-ink-secondary leading-relaxed">
                Gatherly coordinates directly with marriage halls, party plots, and event specialists throughout western and northern Ahmedabad.
              </p>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-ivory">
                  <MapPin className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-ink">Regional Coordination Desk</h4>
                    <p className="text-ink-secondary text-[11px] mt-0.5">
                      Sindhu Bhavan Road (SBR) &amp; Bodakdev Corridor, Ahmedabad, Gujarat 380054
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-ivory">
                  <Mail className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-ink">Admin Email</h4>
                    <p className="text-ink-secondary text-[11px] mt-0.5">
                      concierge@gatherly.in (Internal Desk Only)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-ivory">
                  <Clock className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-ink">Operating Desk Hours</h4>
                    <p className="text-ink-secondary text-[11px] mt-0.5">
                      Monday to Sunday: 9:00 AM – 8:00 PM IST
                    </p>
                  </div>
                </div>
              </div>

              {/* Intermediary Note */}
              <div className="p-4 rounded-2xl bg-emerald-soft border border-emerald-primary/15 text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-forest">
                  <ShieldCheck className="w-4 h-4 text-gold-dark" />
                  <span>Customer Privacy Guarantee</span>
                </div>
                <p className="text-[11px] text-ink-secondary leading-relaxed">
                  We never distribute host contact info to third parties. All inquiries are evaluated and handled exclusively by our internal team.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Message Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-ivory-border shadow-soft-sm">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-ink mb-2">
                Send a Message to Concierge
              </h2>
              <p className="text-xs text-ink-muted mb-6">
                Fill out the details below and a concierge specialist will follow up with you.
              </p>

              {isSubmitted ? (
                <div className="p-8 text-center bg-ivory rounded-2xl border border-ivory-border animate-fade-in">
                  <CheckCircle2 className="w-12 h-12 text-forest mx-auto mb-3" />
                  <h3 className="font-serif text-xl font-bold text-ink mb-1">
                    Thank you for reaching out!
                  </h3>
                  <p className="text-xs text-ink-secondary max-w-sm mx-auto mb-6">
                    Our Ahmedabad operations desk has received your note. We will review it and reply within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setName('');
                      setEmail('');
                      setPhone('');
                      setMessage('');
                      setIsSubmitted(false);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-forest text-white text-xs font-bold"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Priyanshu Patel"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-ivory-border bg-ivory text-ink focus:bg-white focus:border-forest transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted mb-1.5">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 9876543210"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-ivory-border bg-ivory text-ink focus:bg-white focus:border-forest transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. priyanshu@example.com"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-ivory-border bg-ivory text-ink focus:bg-white focus:border-forest transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted mb-1.5">
                        Subject *
                      </label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-ivory-border bg-ivory text-ink focus:bg-white focus:border-forest transition-all"
                      >
                        <option value="Date Availability Enquiry">Date Availability Check</option>
                        <option value="Party Plot Recommendation">Party Plot Recommendation</option>
                        <option value="Catering & Decoration Consultation">Catering &amp; Decor Consultation</option>
                        <option value="Other Assistance">Other General Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted mb-1.5">
                      Your Message or Requirements *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share your wedding date preferences, estimated guest count, or any specific Ahmedabad venues you would like us to check..."
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-ivory-border bg-ivory text-ink focus:bg-white focus:border-forest transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-forest hover:bg-forest-light text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
                  >
                    <Send className="w-4 h-4 text-gold" />
                    <span>Send Message to Concierge</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
