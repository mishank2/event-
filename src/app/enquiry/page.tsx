'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { enquiryFormSchema, EnquiryFormValues } from '@/lib/validations';
import { useToastStore } from '@/store/useToastStore';
import { AHMEDABAD_AREAS } from '@/data/categories';
import {
  CalendarCheck,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  MapPin,
  Clock,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';

export default function EnquiryPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [refId, setRefId] = useState('');
  const addToast = useToastStore((state) => state.addToast);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquiryFormSchema),
    defaultValues: {
      customerName: '',
      mobileNumber: '',
      email: '',
      eventType: 'Wedding',
      eventDate: '',
      eventLocation: 'Sindhu Bhavan Road (SBR)',
      numberOfGuests: 500,
      estimatedBudget: '₹10 Lakhs - ₹25 Lakhs',
      requirements: '',
      additionalNotes: '',
    },
  });

  const onSubmit = async (data: EnquiryFormValues) => {
    // Simulate submission to Gatherly Admin Desk
    await new Promise((resolve) => setTimeout(resolve, 800));
    const generatedRef = 'GTH-' + Math.floor(10000 + Math.random() * 90000);
    setRefId(generatedRef);
    setIsSubmitted(true);
    addToast({
      type: 'success',
      title: 'Enquiry Received',
      message: 'Gatherly Concierge has received your celebration details.',
    });
  };

  return (
    <div className="py-8 sm:py-16 bg-ivory min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-soft text-forest text-xs font-bold uppercase tracking-wider mb-2">
            <CalendarCheck className="w-3.5 h-3.5 text-gold-dark" />
            <span>Dedicated Concierge Desk</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-ink tracking-tight">
            Submit Event Enquiry
          </h1>
          <p className="text-xs sm:text-sm text-ink-secondary mt-2 font-normal leading-relaxed">
            All customer enquiries are routed exclusively to Gatherly’s internal team. We privately check venue availability and provide consolidated rates.
          </p>
        </div>

        {/* Confirmation Card if Submitted */}
        {isSubmitted ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-ivory-border shadow-soft animate-scale-in">
            <div className="w-16 h-16 rounded-full bg-emerald-soft text-forest flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="inline-block px-3 py-1 rounded-full bg-ivory text-xs font-semibold text-ink-muted mb-2">
              Reference: <strong className="text-forest">{refId}</strong>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink mb-3">
              Thank you for contacting Gatherly.
            </h2>
            <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed max-w-md mx-auto mb-8">
              Our team will check availability with the relevant venue administrations and contact you within 24 hours.
            </p>

            <div className="p-4 rounded-2xl bg-ivory border border-ivory-border max-w-md mx-auto text-left space-y-2 text-xs mb-8">
              <div className="flex items-center gap-2 font-bold text-forest">
                <ShieldCheck className="w-4 h-4 text-gold-dark" />
                <span>Intermediary Privacy Protection Active</span>
              </div>
              <p className="text-ink-secondary text-[11px] leading-relaxed">
                Your mobile number will never be sold or shared with multiple competing vendors. Gatherly remains your single point of contact.
              </p>
            </div>

            <button
              onClick={() => {
                reset();
                setIsSubmitted(false);
              }}
              className="px-6 py-3 rounded-xl bg-forest hover:bg-forest-light text-white font-bold text-xs shadow-xs transition-colors inline-flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4 text-gold" />
              <span>Submit Another Enquiry</span>
            </button>
          </div>
        ) : (
          /* Main Form Card */
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-ivory-border shadow-soft">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Event Type & Date Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted mb-1.5">
                    Event Type *
                  </label>
                  <select
                    {...register('eventType')}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-ivory-border bg-ivory text-ink focus:bg-white focus:border-forest transition-all"
                  >
                    <option value="Wedding">Grand Wedding</option>
                    <option value="Reception">Wedding Reception</option>
                    <option value="Sangeet">Sangeet Sandhya / Garba</option>
                    <option value="Ring Ceremony">Ring Ceremony / Engagement</option>
                    <option value="Birthday">Milestone Birthday Celebration</option>
                    <option value="Corporate">Corporate Summit / Gala</option>
                    <option value="Community">Community / Cultural Gathering</option>
                    <option value="Other">Other Celebration</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted mb-1.5">
                    Target Event Date *
                  </label>
                  <input
                    type="date"
                    {...register('eventDate')}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-ivory-border bg-ivory text-ink focus:bg-white focus:border-forest transition-all"
                  />
                  {errors.eventDate && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.eventDate.message}</p>
                  )}
                </div>
              </div>

              {/* Location & Guest Capacity Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted mb-1.5">
                    Preferred Corridor in Ahmedabad *
                  </label>
                  <select
                    {...register('eventLocation')}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-ivory-border bg-ivory text-ink focus:bg-white focus:border-forest transition-all"
                  >
                    {AHMEDABAD_AREAS.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted mb-1.5">
                    Expected Number of Guests *
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 850"
                    {...register('numberOfGuests', { valueAsNumber: true })}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-ivory-border bg-ivory text-ink focus:bg-white focus:border-forest transition-all"
                  />
                  {errors.numberOfGuests && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.numberOfGuests.message}</p>
                  )}
                </div>
              </div>

              {/* Budget & Preferred Business */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted mb-1.5">
                    Estimated Budget *
                  </label>
                  <select
                    {...register('estimatedBudget')}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-ivory-border bg-ivory text-ink focus:bg-white focus:border-forest transition-all"
                  >
                    <option value="Under ₹5 Lakhs">Under ₹5 Lakhs</option>
                    <option value="₹5 Lakhs - ₹10 Lakhs">₹5 Lakhs - ₹10 Lakhs</option>
                    <option value="₹10 Lakhs - ₹25 Lakhs">₹10 Lakhs - ₹25 Lakhs</option>
                    <option value="₹25 Lakhs - ₹50 Lakhs">₹25 Lakhs - ₹50 Lakhs</option>
                    <option value="Above ₹50 Lakhs">Above ₹50 Lakhs (Luxury Grand)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted mb-1.5">
                    Preferred Venue / Business (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Shantam Party Plot, SBR"
                    {...register('preferredBusiness')}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-ivory-border bg-ivory text-ink focus:bg-white focus:border-forest transition-all"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="pt-4 border-t border-ivory-border space-y-4">
                <h3 className="font-serif font-bold text-sm text-ink">
                  Contact Information (For Gatherly Admin Only)
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Priyanshu Patel"
                      {...register('customerName')}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-ivory-border bg-ivory text-ink focus:bg-white focus:border-forest transition-all"
                    />
                    {errors.customerName && (
                      <p className="text-[11px] text-rose-600 mt-1">{errors.customerName.message}</p>
                    )}
                  </div>

                  <div className="sm:col-span-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted mb-1.5">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 9876543210"
                      {...register('mobileNumber')}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-ivory-border bg-ivory text-ink focus:bg-white focus:border-forest transition-all"
                    />
                    {errors.mobileNumber && (
                      <p className="text-[11px] text-rose-600 mt-1">{errors.mobileNumber.message}</p>
                    )}
                  </div>

                  <div className="sm:col-span-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. priyanshu@example.com"
                      {...register('email')}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-ivory-border bg-ivory text-ink focus:bg-white focus:border-forest transition-all"
                    />
                    {errors.email && (
                      <p className="text-[11px] text-rose-600 mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Requirements & Notes */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted mb-1.5">
                  Event Requirements &amp; Special Setup Details *
                </label>
                <textarea
                  rows={3}
                  placeholder="Mention your requirements: AC green rooms, lawn setup, Gujarati Kathiyawadi buffet, stage lighting, mandap style..."
                  {...register('requirements')}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-ivory-border bg-ivory text-ink focus:bg-white focus:border-forest transition-all"
                />
                {errors.requirements && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.requirements.message}</p>
                )}
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-ivory-border flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-ink-muted">
                  <ShieldCheck className="w-4 h-4 text-forest shrink-0" />
                  <span>Enquiry is directed exclusively to Gatherly Admin</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-forest hover:bg-forest-light text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-60"
                >
                  <CalendarCheck className="w-4 h-4 text-gold" />
                  <span>{isSubmitting ? 'Submitting...' : 'Submit Enquiry'}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
