'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { enquiryFormSchema, EnquiryFormValues } from '@/lib/validations';
import { Business } from '@/types';
import { AHMEDABAD_AREAS } from '@/data/categories';
import { useToastStore } from '@/store/useToastStore';
import {
  Calendar,
  Users,
  MapPin,
  Mail,
  Phone,
  User,
  Sparkles,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Send,
  RotateCcw,
} from 'lucide-react';

interface EnquiryFormProps {
  preselectedBusiness?: Business | null;
  onSuccess?: () => void;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({
  preselectedBusiness,
  onSuccess,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<EnquiryFormValues | null>(null);
  const addToast = useToastStore((state) => state.addToast);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquiryFormSchema),
    defaultValues: {
      customerName: '',
      mobileNumber: '',
      email: '',
      eventType: 'Wedding & Grand Reception',
      eventDate: '',
      eventLocation: preselectedBusiness ? preselectedBusiness.area : 'Sindhu Bhavan Road (SBR)',
      numberOfGuests: '' as any,
      preferredBusiness: preselectedBusiness ? preselectedBusiness.name : '',
      preferredBusinessId: preselectedBusiness ? preselectedBusiness.id : '',
      estimatedBudget: '₹10,00,000 - ₹25,00,000',
      requirements: preselectedBusiness
        ? `I am interested in checking date availability and official package rates for ${preselectedBusiness.name}.`
        : '',
      additionalNotes: '',
    },
  });

  const selectedGuests = watch('numberOfGuests');

  const onSubmit = async (data: EnquiryFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSubmittedData(data);
    setSubmitted(true);
    addToast({
      type: 'success',
      title: 'Enquiry Received by Gatherly',
      message: 'Our Ahmedabad concierge team is verifying date availability.',
    });
    if (onSuccess) {
      onSuccess();
    }
  };

  const guestQuickOptions = [150, 350, 750, 1500, 2500];

  if (submitted && submittedData) {
    return (
      <div className="p-8 sm:p-10 text-center bg-white rounded-3xl border border-ivory-border shadow-soft-sm animate-scale-in">
        <div className="w-16 h-16 mx-auto mb-4 rounded-3xl bg-emerald-soft flex items-center justify-center text-forest shadow-xs">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-ivory text-ink border border-ivory-border mb-3">
          Concierge Token: #GTH-{Math.floor(100000 + Math.random() * 900000)}
        </span>

        <h3 className="font-serif text-3xl font-bold text-ink mb-2">
          Thank you for contacting Gatherly!
        </h3>
        <p className="text-sm font-medium text-ink-muted mb-6 max-w-md mx-auto leading-relaxed">
          Our team will check availability with the relevant business and contact you shortly.
        </p>

        <div className="bg-ivory rounded-2xl p-5 text-left text-xs space-y-2.5 border border-ivory-border max-w-md mx-auto mb-6">
          <div className="flex justify-between">
            <span className="text-ink-muted">Event:</span>
            <span className="font-bold text-ink">{submittedData.eventType}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-ink-muted">Date:</span>
            <span className="font-bold text-ink">{submittedData.eventDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-ink-muted">Expected Guests:</span>
            <span className="font-bold text-ink">{submittedData.numberOfGuests} Guests</span>
          </div>
          {submittedData.preferredBusiness && (
            <div className="flex justify-between">
              <span className="text-ink-muted">Preferred Business:</span>
              <span className="font-bold text-forest">{submittedData.preferredBusiness}</span>
            </div>
          )}
          <div className="pt-2 border-t border-ivory-border flex items-center gap-2 text-forest font-semibold">
            <ShieldCheck className="w-4 h-4 shrink-0 text-gold-dark" />
            <span>Assigned to Gatherly Ahmedabad Concierge Desk</span>
          </div>
        </div>

        <button
          onClick={() => {
            reset();
            setSubmitted(false);
          }}
          className="px-6 py-2.5 rounded-xl border border-ivory-border hover:bg-ivory text-xs font-bold text-ink transition-colors inline-flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4 text-forest" />
          <span>Submit Another Enquiry</span>
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Target Business Banner if preselected */}
      {preselectedBusiness && (
        <div className="p-3.5 rounded-2xl bg-emerald-soft border border-emerald-primary/20 flex items-center justify-between text-xs">
          <div>
            <span className="text-[10px] text-forest font-bold uppercase tracking-wider block">
              Enquiring for:
            </span>
            <span className="font-serif font-bold text-sm text-ink">
              {preselectedBusiness.name}
            </span>
          </div>
          <span className="text-[11px] font-semibold text-gold-dark bg-white px-2.5 py-1 rounded-lg border border-ivory-border">
            {preselectedBusiness.area}
          </span>
        </div>
      )}

      {/* Row 1: Name & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-ink-muted mb-1">
            Customer Name *
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-ink-muted absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              placeholder="e.g. Priyanshu Patel"
              {...register('customerName')}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-ivory-border bg-ivory focus:bg-white focus:border-forest text-ink transition-all"
            />
          </div>
          {errors.customerName && (
            <p className="text-[11px] text-rose-500 mt-1">{errors.customerName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-ink-muted mb-1">
            Mobile Number *
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-ink-muted absolute left-3 top-3 pointer-events-none" />
            <input
              type="tel"
              placeholder="e.g. 9876543210"
              {...register('mobileNumber')}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-ivory-border bg-ivory focus:bg-white focus:border-forest text-ink transition-all"
            />
          </div>
          {errors.mobileNumber && (
            <p className="text-[11px] text-rose-500 mt-1">{errors.mobileNumber.message}</p>
          )}
        </div>
      </div>

      {/* Row 2: Email & Event Type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-ink-muted mb-1">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-ink-muted absolute left-3 top-3 pointer-events-none" />
            <input
              type="email"
              placeholder="e.g. priyanshu@example.com"
              {...register('email')}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-ivory-border bg-ivory focus:bg-white focus:border-forest text-ink transition-all"
            />
          </div>
          {errors.email && (
            <p className="text-[11px] text-rose-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-ink-muted mb-1">
            Event Type *
          </label>
          <select
            {...register('eventType')}
            className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-ivory-border bg-ivory focus:bg-white focus:border-forest text-ink transition-all"
          >
            <option value="Wedding & Grand Reception">Wedding &amp; Grand Reception</option>
            <option value="Sangeet & Garba Night">Sangeet &amp; Garba Night</option>
            <option value="Ring Ceremony / Sagai">Ring Ceremony / Sagai</option>
            <option value="Milestone Birthday">Milestone Birthday</option>
            <option value="Corporate Gala / Summit">Corporate Gala / Summit</option>
            <option value="Community Gathering">Community Gathering</option>
            <option value="Other Celebration">Other Celebration</option>
          </select>
        </div>
      </div>

      {/* Row 3: Event Date & Location */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-ink-muted mb-1">
            Event Date *
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 text-ink-muted absolute left-3 top-3 pointer-events-none" />
            <input
              type="date"
              {...register('eventDate')}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-ivory-border bg-ivory focus:bg-white focus:border-forest text-ink transition-all"
            />
          </div>
          {errors.eventDate && (
            <p className="text-[11px] text-rose-500 mt-1">{errors.eventDate.message}</p>
          )}
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-ink-muted mb-1">
            Event Location Corridor *
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-gold-dark absolute left-3 top-3 pointer-events-none" />
            <select
              {...register('eventLocation')}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-ivory-border bg-ivory focus:bg-white focus:border-forest text-ink transition-all"
            >
              {AHMEDABAD_AREAS.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Guest Count & Quick Picks */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="text-[11px] font-bold uppercase tracking-wider text-ink-muted">
            Number of Guests *
          </label>
          <div className="flex items-center gap-1">
            {guestQuickOptions.map((opt) => (
              <button
                type="button"
                key={opt}
                onClick={() => setValue('numberOfGuests', opt as any)}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors ${
                  selectedGuests === opt
                    ? 'bg-forest text-white'
                    : 'bg-ivory text-ink-muted hover:text-ink'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
        <div className="relative">
          <Users className="w-4 h-4 text-ink-muted absolute left-3 top-3 pointer-events-none" />
          <input
            type="number"
            placeholder="e.g. 850"
            {...register('numberOfGuests', { valueAsNumber: true })}
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-ivory-border bg-ivory focus:bg-white focus:border-forest text-ink transition-all"
          />
        </div>
        {errors.numberOfGuests && (
          <p className="text-[11px] text-rose-500 mt-1">{errors.numberOfGuests.message}</p>
        )}
      </div>

      {/* Requirements */}
      <div>
        <label className="block text-[11px] font-bold uppercase tracking-wider text-ink-muted mb-1">
          Requirements &amp; Setup Notes *
        </label>
        <textarea
          rows={3}
          placeholder="e.g. Need AC green rooms, lawn setup, catering counters for Gujarati thal, mandap decoration..."
          {...register('requirements')}
          className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-ivory-border bg-ivory focus:bg-white focus:border-forest text-ink transition-all"
        />
        {errors.requirements && (
          <p className="text-[11px] text-rose-500 mt-1">{errors.requirements.message}</p>
        )}
      </div>

      {/* Submit CTA */}
      <div className="pt-2 border-t border-ivory-border flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 text-[11px] text-ink-muted">
          <ShieldCheck className="w-4 h-4 text-forest shrink-0" />
          <span>Concierge Intermediary Guarantee Active</span>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-7 py-3 rounded-xl bg-forest hover:bg-forest-light text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-60"
        >
          <Send className="w-4 h-4 text-gold" />
          <span>{isSubmitting ? 'Checking Availability...' : 'Submit Enquiry'}</span>
        </button>
      </div>
    </form>
  );
};
