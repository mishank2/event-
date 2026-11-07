export type DiscoverEventCategory =
  | 'All'
  | 'Wedding'
  | 'Birthday'
  | 'Corporate'
  | 'Anniversary'
  | 'Private Party'
  | 'Festivals'
  | 'Concerts'
  | 'Baby Celebrations'
  | 'Education'
  | 'Community';

export interface DiscoverReel {
  id: string;
  title: string;
  caption: string;
  eventCategory: DiscoverEventCategory;
  categoryTag: string; // e.g., 'Mandap Decor', 'Conference AV', 'Theme Cake'
  creatorName: string;
  creatorRole: string;
  businessSlug?: string;
  venueName?: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
  isDemo: true;
  tags: string[];
  likes: number;
}

export const DISCOVER_EVENT_FILTERS: DiscoverEventCategory[] = [
  'All',
  'Wedding',
  'Birthday',
  'Corporate',
  'Anniversary',
  'Festivals',
  'Concerts',
  'Private Party',
  'Baby Celebrations',
  'Education',
  'Community',
];

export const DISCOVER_REELS: DiscoverReel[] = [
  {
    id: 'reel-1',
    title: 'Grand Lawns Mandap & Lotus Water Body',
    caption: '70,000 sq.ft lawn transformed with 10,000 royal roses and ambient golden chandeliers for a Gujarati wedding.',
    eventCategory: 'Wedding',
    categoryTag: 'Wedding Lawns',
    creatorName: 'Shantam Party Plot & Grand Lawns',
    creatorRole: 'Premier Venue Partner',
    businessSlug: 'shantam-party-plot-sbr',
    venueName: 'Shantam Party Plot, SBR',
    thumbnail: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=720&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    duration: '0:45',
    isDemo: true,
    tags: ['#ahmedabadweddings', '#mandapdecor', '#sbrvenues'],
    likes: 1420,
  },
  {
    id: 'reel-2',
    title: 'Executive Annual Summit & 4K LED Backdrop',
    caption: 'State-of-the-art auditorium seating with live telecast, cordless acoustic arrays, and breakout dining.',
    eventCategory: 'Corporate',
    categoryTag: 'Conference & Summit',
    creatorName: 'The Grand Bhagwati Royale',
    creatorRole: 'Five-Star Convention Center',
    businessSlug: 'the-grand-bhagwati-sg-highway',
    venueName: 'TGB Convention, SG Highway',
    thumbnail: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=720&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    duration: '0:35',
    isDemo: true,
    tags: ['#corporatesummit', '#sghighway', '#conventioncenter'],
    likes: 980,
  },
  {
    id: 'reel-3',
    title: 'Carnival Theme 1st Birthday Extravaganza',
    caption: 'Pastel balloon archways, live cotton candy carts, magician stage, and custom 3-tier birthday cake reveal.',
    eventCategory: 'Birthday',
    categoryTag: 'Kids Birthday Party',
    creatorName: 'Keshav Celebrations & Rooftop',
    creatorRole: 'Party Lounge Partner',
    businessSlug: 'keshav-party-plot-bopal',
    venueName: 'Keshav Party Plot, Bopal',
    thumbnail: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=720&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    duration: '0:30',
    isDemo: true,
    tags: ['#birthdaybash', '#themeparty', '#ahmedabadkids'],
    likes: 1650,
  },
  {
    id: 'reel-4',
    title: 'Silver Jubilee 25th Anniversary Dinner',
    caption: 'Intimate poolside celebration with fairy canopy, live acoustic violinist, and curated 5-course feast.',
    eventCategory: 'Anniversary',
    categoryTag: 'Anniversary Gala',
    creatorName: 'Green Pearl Botanical Gardens',
    creatorRole: 'Boutique Outdoor Lawn',
    businessSlug: 'green-pearl-gardens-thaltej',
    venueName: 'Green Pearl, Thaltej',
    thumbnail: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=720&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    duration: '0:40',
    isDemo: true,
    tags: ['#silverjubilee', '#anniversarydinner', '#thaltej'],
    likes: 1120,
  },
  {
    id: 'reel-5',
    title: 'Navratri Mega Garba Ground Acoustics',
    caption: 'Concert-grade sound stage and 5,000-dancer revolving circle with traditional dhol accompaniment.',
    eventCategory: 'Festivals',
    categoryTag: 'Festival & Garba Ground',
    creatorName: 'DJ Harsh & Live Acoustics',
    creatorRole: 'Concert Sound Production',
    businessSlug: 'shantam-party-plot-sbr',
    venueName: 'Sindhu Bhavan Road',
    thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=720&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    duration: '0:55',
    isDemo: true,
    tags: ['#navratrigarba', '#soundproduction', '#festivalground'],
    likes: 3410,
  },
  {
    id: 'reel-6',
    title: 'Traditional Srimant & Cradle Ceremony',
    caption: 'Yellow marigold traditional swings, copper thals, and comfortable seating for 200 blessing guests.',
    eventCategory: 'Baby Celebrations',
    categoryTag: 'Baby Shower & Srimant',
    creatorName: 'Shantam Party Plot & Grand Lawns',
    creatorRole: 'Heritage Banquet Host',
    businessSlug: 'shantam-party-plot-sbr',
    venueName: 'Bodakdev Extension',
    thumbnail: 'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=720&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    duration: '0:32',
    isDemo: true,
    tags: ['#srimant', '#godhbharai', '#babycelebration'],
    likes: 1280,
  },
  {
    id: 'reel-7',
    title: 'Private Farmhouse Sundowner & BBQ',
    caption: 'Gated estate with poolside barbecue stations, ambient lounge chillout music, and private lawns.',
    eventCategory: 'Private Party',
    categoryTag: 'Private Farmhouse',
    creatorName: 'Keshav Farmhouse & Lawns',
    creatorRole: 'Private Property Host',
    businessSlug: 'keshav-party-plot-bopal',
    venueName: 'South Bopal Green Belt',
    thumbnail: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=720&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    duration: '0:38',
    isDemo: true,
    tags: ['#privategathering', '#sundowner', '#farmhouseparty'],
    likes: 1740,
  },
  {
    id: 'reel-8',
    title: 'University Symposium & Keynote Presentation',
    caption: 'Tiered auditorium with dual projection screens, acoustic panelling, and 450-seat delegate capacity.',
    eventCategory: 'Education',
    categoryTag: 'Educational Auditorium',
    creatorName: 'The Grand Bhagwati Royale',
    creatorRole: 'Auditorium Facilities',
    businessSlug: 'the-grand-bhagwati-sg-highway',
    venueName: 'SG Highway Knowledge Hub',
    thumbnail: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=720&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    duration: '0:42',
    isDemo: true,
    tags: ['#educationalsymposium', '#seminarhall', '#keynotespeakers'],
    likes: 890,
  },
  {
    id: 'reel-9',
    title: 'Community Trust Sammelan & Sahbhoj Lunch',
    caption: 'Spacious dining layout hosting 1,200 community members with clean dining lines and traditional thals.',
    eventCategory: 'Community',
    categoryTag: 'Community Hall',
    creatorName: 'Keshav Party Plot',
    creatorRole: 'Community Venue Partner',
    businessSlug: 'keshav-party-plot-bopal',
    venueName: 'Bopal Central',
    thumbnail: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=720&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    duration: '0:46',
    isDemo: true,
    tags: ['#communitysammelan', '#sahbhoj', '#ahmedabadcommunity'],
    likes: 1410,
  },
  {
    id: 'reel-10',
    title: 'Live Bollywood Music Night & Stage Lighting',
    caption: 'Dynamic concert moving heads, line-array audio rig, and pyrotechnic cold fire stage for 3,000 attendees.',
    eventCategory: 'Concerts',
    categoryTag: 'Concert & Live Show',
    creatorName: 'Aura Sound & Stage Engineering',
    creatorRole: 'Concert Production Partner',
    businessSlug: 'shantam-party-plot-sbr',
    venueName: 'Sindhu Bhavan Lawns',
    thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=720&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    duration: '0:48',
    isDemo: true,
    tags: ['#liveconcert', '#stagesound', '#ahmedabadnights'],
    likes: 2890,
  },
  {
    id: 'reel-11',
    title: 'Sunset Ring Ceremony & Floral Tunnel',
    caption: 'Boutique garden lawn entrance adorned with 5,000 tuberoses and mirror aisle for evening ring exchange.',
    eventCategory: 'Anniversary',
    categoryTag: 'Engagement & Rings',
    creatorName: 'Green Pearl Botanical Gardens',
    creatorRole: 'Garden Venue Host',
    businessSlug: 'green-pearl-gardens-thaltej',
    venueName: 'Thaltej Botanical Greens',
    thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=720&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    duration: '0:36',
    isDemo: true,
    tags: ['#ringceremony', '#sunsetengagement', '#floraltunnel'],
    likes: 1950,
  },
];

// Backward compatibility alias
export const WEDDING_REELS = DISCOVER_REELS;
export const REEL_CATEGORIES = DISCOVER_EVENT_FILTERS;
export type WeddingReel = DiscoverReel;
export type ReelCategory = DiscoverEventCategory;
