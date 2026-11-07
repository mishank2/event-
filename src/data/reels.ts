export type ReelCategory =
  | 'Wedding Inspiration'
  | 'Wedding Decor'
  | 'Bridal Looks'
  | 'Groom Entry'
  | 'Couple Entry'
  | 'Wedding Photography'
  | 'Mehendi'
  | 'Haldi'
  | 'Reception'
  | 'Luxury Venues'
  | 'Destination Weddings'
  | 'Trending Moments';

export interface WeddingReel {
  id: string;
  title: string;
  caption: string;
  category: ReelCategory;
  creatorName: string;
  creatorRole: string;
  businessSlug?: string;
  venueName?: string;
  thumbnail: string;
  videoUrl?: string;
  duration: string;
  isDemo: true;
  tags: string[];
  likes: number;
}

export const REEL_CATEGORIES: ReelCategory[] = [
  'Wedding Inspiration',
  'Wedding Decor',
  'Bridal Looks',
  'Groom Entry',
  'Couple Entry',
  'Wedding Photography',
  'Mehendi',
  'Haldi',
  'Reception',
  'Luxury Venues',
  'Destination Weddings',
  'Trending Moments',
];

export const WEDDING_REELS: WeddingReel[] = [
  {
    id: 'reel-1',
    title: 'Grand Lawns Mandap Reveal',
    caption: '70,000 sq.ft lawn transformed with 10,000 royal roses and ambient golden chandeliers.',
    category: 'Wedding Decor',
    creatorName: 'Shantam Party Plot & Grand Lawns',
    creatorRole: 'Premier Venue Partner',
    businessSlug: 'shantam-party-plot-sbr',
    venueName: 'Shantam Party Plot, SBR',
    thumbnail: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=720&q=80',
    duration: '0:45',
    isDemo: true,
    tags: ['#ahmedabadweddings', '#mandapdecor', '#sbrvenues'],
    likes: 1240,
  },
  {
    id: 'reel-2',
    title: 'The Royal Gujarati Bride Entry',
    caption: 'Heritage crimson silk gharchola with bespoke hand-carved polki jewelry moments before pheras.',
    category: 'Bridal Looks',
    creatorName: 'Ami Patel Bridal Studio',
    creatorRole: 'Celebrity Makeup & Styling',
    businessSlug: 'shantam-party-plot-sbr',
    venueName: 'Sindhu Bhavan Road',
    thumbnail: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=720&q=80',
    duration: '0:32',
    isDemo: true,
    tags: ['#gujaratibride', '#bridalentry', '#royalwedding'],
    likes: 2180,
  },
  {
    id: 'reel-3',
    title: 'Fairytale Floral Chandelier & Glass Aisle',
    caption: 'Glass walking ramp built over reflecting lotus pool under a canopy of 5,000 fairy lights.',
    category: 'Wedding Decor',
    creatorName: 'The Grand Bhagwati Royale',
    creatorRole: 'Five-Star Luxury Banquet',
    businessSlug: 'the-grand-bhagwati-sg-highway',
    venueName: 'TGB Palace, SG Highway',
    thumbnail: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=720&q=80',
    duration: '0:50',
    isDemo: true,
    tags: ['#luxurybanquet', '#floralaisle', '#sghighway'],
    likes: 1890,
  },
  {
    id: 'reel-4',
    title: 'Sunset Haldi Extravaganza',
    caption: 'Marigold cascades, smoke bombs, and dhol beats for a vibrant family poolside ceremony.',
    category: 'Haldi',
    creatorName: 'Keshav Party Plot',
    creatorRole: 'Celebration Lawns',
    businessSlug: 'keshav-party-plot-bopal',
    venueName: 'Keshav Lawns, Bopal',
    thumbnail: 'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=720&q=80',
    duration: '0:38',
    isDemo: true,
    tags: ['#haldicelebration', '#marigold', '#bopalvenues'],
    likes: 954,
  },
  {
    id: 'reel-5',
    title: 'Vintage Mercedes Baraat Entry',
    caption: 'Traditional sahasra dhol procession and vintage car arrival along the grand avenue.',
    category: 'Groom Entry',
    creatorName: 'Vintage Car & Safa Services',
    creatorRole: 'Wedding Logistics Specialist',
    businessSlug: 'shantam-party-plot-sbr',
    venueName: 'Bodakdev Extension',
    thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=720&q=80',
    duration: '0:42',
    isDemo: true,
    tags: ['#groomentry', '#vintagebaraat', '#ahmedabadwedding'],
    likes: 1420,
  },
  {
    id: 'reel-6',
    title: 'Candid Sangeet Sandhya Beats',
    caption: 'When 800 guests join the garba circle under the open Ahmedabad starlit sky.',
    category: 'Trending Moments',
    creatorName: 'DJ Harsh & Live Acoustics',
    creatorRole: 'Sound & Production',
    businessSlug: 'shantam-party-plot-sbr',
    venueName: 'Sindhu Bhavan Road',
    thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=720&q=80',
    duration: '0:58',
    isDemo: true,
    tags: ['#sangeetnight', '#garbadance', '#soundproduction'],
    likes: 3100,
  },
  {
    id: 'reel-7',
    title: 'Botanical Garden Pheras Canopy',
    caption: 'Eco-luxury mandap setup surrounded by natural palm groves and flickering brass diyas.',
    category: 'Wedding Inspiration',
    creatorName: 'Green Pearl Botanical Gardens',
    creatorRole: 'Lush Garden Destination',
    businessSlug: 'green-pearl-gardens-thaltej',
    venueName: 'Green Pearl, Thaltej',
    thumbnail: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=720&q=80',
    duration: '0:46',
    isDemo: true,
    tags: ['#gardenwedding', '#naturaldecor', '#thaltejvenues'],
    likes: 1670,
  },
  {
    id: 'reel-8',
    title: 'Fine Dining Kathiyawadi & Continental Feast',
    caption: 'Live jalebi-fafda counters alongside wood-fired pizza ovens and royal copper thals.',
    category: 'Reception',
    creatorName: 'Gordhan Thal Royale Catering',
    creatorRole: 'Heritage Catering Master',
    businessSlug: 'the-grand-bhagwati-sg-highway',
    venueName: 'SG Highway',
    thumbnail: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=720&q=80',
    duration: '0:35',
    isDemo: true,
    tags: ['#weddingcatering', '#gujaratithal', '#finedining'],
    likes: 2430,
  },
];
