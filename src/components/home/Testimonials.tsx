import React from 'react';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  location: string;
  venueBooked: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Planning our daughter’s wedding from the UK seemed daunting until we found Gatherly. Their Ahmedabad concierge checked 4 party plots on Sindhu Bhavan Road and locked down Shantam Party Plot without a single headache.',
    author: 'Pravinbhai & Meenaben Shah',
    role: 'Parents of the Bride',
    location: 'Bodakdev, Ahmedabad',
    venueBooked: 'Shantam Party Plot & Grand Lawns',
    rating: 5,
  },
  {
    quote:
      'What I loved most was zero vendor spam. I didn’t get 50 random calls from photographers or decorators. Gatherly presented curated options, negotiated package pricing, and everything ran like clockwork.',
    author: 'Jahnvi Choksi',
    role: 'Bride (Dec 2026 Wedding)',
    location: 'Satellite, Ahmedabad',
    venueBooked: 'The Grand Bhagwati Banquets',
    rating: 5,
  },
  {
    quote:
      'We hosted our 800-person Western India Tech Conclave at Renaissance Solarium. Gatherly verified AV configurations, stage setups, and five-star vegetarian catering effortlessly. Excellent corporate service.',
    author: 'Samir Joshi',
    role: 'Director of Human Capital, TechSol Gujarat',
    location: 'SG Highway, Ahmedabad',
    venueBooked: 'Renaissance Solarium Ballroom',
    rating: 5,
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-sand border-b border-sand-border text-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.2em] uppercase text-coral mb-2">
            <span>Verified Customer Stories</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal tracking-tight">
            Celebrations Made Effortless
          </h2>
          <p className="text-charcoal-muted text-xs sm:text-sm mt-2">
            Hear how Ahmedabad families and planners found their ideal venues through Gatherly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-sand-border shadow-soft-xs hover:shadow-soft transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Rating & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-ochre text-ochre" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-sand-border" />
                </div>

                <p className="text-xs sm:text-sm text-charcoal/85 leading-relaxed italic mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-sand-border">
                <h4 className="font-serif font-bold text-charcoal text-sm">{t.author}</h4>
                <p className="text-[11px] text-charcoal-muted">{t.role} • {t.location}</p>
                <div className="mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-sand text-charcoal border border-sand-border">
                  <span>Enquired: {t.venueBooked}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
