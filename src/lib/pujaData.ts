import { Puja, PujaPackage, PujaEnrollmentPayload } from '@/types/puja';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://neytabykygedayelyhvi.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabaseClient = supabaseKey
  ? createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } })
  : null;

// Fallback seed pujas with dynamic future dates
export const FALLBACK_PUJAS: Puja[] = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    title: 'Sarva Pitru Shanti Mahapuja at Gaya Ji',
    slug: 'sarva-pitru-shanti-puja-gaya',
    subtitle: 'Ancestral peace, Pitru Dosh Nivaran and divine blessings across seven generations',
    short_description: 'Perform sacred Pitru Tarpana & Pind Daan at the holy Vishnu Pad in Gaya. Free your lineage from ancestral afflictions and invite generational peace, health & prosperity.',
    description: 'According to traditional Sanatan beliefs, Gaya is the ultimate sacred shrine for Pitru Mukti. Performing this Mahapuja with your Gotra and family names recited by Vedic Pandits brings complete Shanti to departed ancestors. Devotees will receive live streaming access, an uncut video recording of the ritual, and consecrated Tirth Prasad delivered directly to their doorstep.',
    banner_image_url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=1200&q=80',
    gallery_images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80',
      'https://images.unsplash.com/photo-1609342122563-a43ac8917a3a?w=800&q=80',
      'https://images.unsplash.com/photo-1519817650390-64a93db51149?w=800&q=80',
    ],
    event_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    enrollment_end_date: new Date(Date.now() + (2 * 24 + 18) * 60 * 60 * 1000).toISOString(),
    location_name: 'Vishnu Pad Mandir, Gaya Ji, Bihar',
    tithi_details: 'Bhadrapada Shukla Purnima (Pitru Paksha Aarambh)',
    starting_price: 851,
    puja_status: 'upcoming',
    is_featured: true,
    is_active: true,
    meeting_link: 'https://meet.google.com/dharmik-gaya-puja',
    benefits: [
      {
        title: 'Pitru Dosh Nivaran',
        description: 'Dissolves karmic blocks hindering financial growth, marriage prospects, and mental peace.',
      },
      {
        title: 'Blessings for 7 Generations',
        description: 'Pacifies ancestral souls so they bestow perpetual protection, health, and progeny harmony.',
      },
      {
        title: 'Doorstep Tirth Prasad Delivery',
        description: 'Receive an authentic Aashirwad Box with sacred Falgu-Ganga Jal, Til, and Temple Prasad.',
      },
      {
        title: 'Personalized Vedic Sankalp',
        description: 'Qualified Teerth Purohits chant your Gotra, Nakshatra, and Family names during Ahuti.',
      },
    ],
    process_steps: [
      {
        step: 1,
        title: 'Devotee Sankalp',
        description: 'Purohit recites your Name, Gotra, and wish before the sacred Falgu river altar.',
      },
      {
        step: 2,
        title: 'Pind Daan & Til Tarpana',
        description: 'Authentic Vedic offerings of Barley, Til, Honey, and Milk honoring your lineage.',
      },
      {
        step: 3,
        title: 'Maha Havan & Pitru Gayatri',
        description: 'Purifying sacred fire ceremony reciting 1008 Pitru Gayatri Mantras.',
      },
      {
        step: 4,
        title: 'WhatsApp Video & Prasad Dispatch',
        description: 'Full HD video recording shared on your WhatsApp and consecrated Prasad dispatched.',
      },
    ],
    faqs: [
      {
        question: 'Do I need to be physically present at Gaya?',
        answer: 'No. The Puja is performed on your behalf by authenticated Purohits using your Gotra and Name. You can watch live or view the complete uncut video recording sent to your WhatsApp.',
      },
      {
        question: 'What if I do not know my Gotra?',
        answer: 'In Sanatan Dharma traditions, if you do not know your Gotra, Panditji will take the universal Kashyap Gotra Sankalp on your behalf, which is fully valid and auspicious.',
      },
      {
        question: 'When and how will I receive the meeting link?',
        answer: 'On the morning of the Puja day, our team will send the personalized joining link to your registered WhatsApp number and Email.',
      },
    ],
    display_order: 1,
    packages: [
      {
        id: '22222222-1111-1111-1111-111111111111',
        puja_id: '11111111-1111-1111-1111-111111111111',
        name: 'Individual Puja',
        package_type: 'single',
        max_persons: 1,
        price: 851,
        original_price: 1250,
        badge_text: undefined,
        description: 'Sankalp for 1 person with Gotra recitation, Til Tarpana, and video updates on WhatsApp.',
        inclusions: [
          '1 Person Name & Gotra recited',
          'Pitru Tarpana & Pind Daan ritual',
          'Complete HD video shared on WhatsApp',
          'Live broadcast access link',
        ],
        display_order: 1,
        is_active: true,
      },
      {
        id: '22222222-2222-2222-2222-222222222222',
        puja_id: '11111111-1111-1111-1111-111111111111',
        name: 'Individual Puja + Remedy Consultation',
        package_type: 'single',
        max_persons: 1,
        price: 951,
        original_price: 1500,
        badge_text: 'Recommended',
        description: 'Complete Pitru Puja with personal astrological remedy voice note from Acharya Dharmikshree.',
        inclusions: [
          '1 Person Name & Gotra recited',
          'Pitru Shanti Tarpana & Havan',
          '1-on-1 Astrological Remedy Voice Note',
          'Free Aashirwad Box with Prasad',
          'Full WhatsApp video recording',
        ],
        display_order: 2,
        is_active: true,
      },
      {
        id: '22222222-3333-3333-3333-333333333333',
        puja_id: '11111111-1111-1111-1111-111111111111',
        name: 'Partner / Couple Puja',
        package_type: 'couple',
        max_persons: 2,
        price: 1251,
        original_price: 1850,
        badge_text: 'Popular',
        description: 'Joint Sankalp for Husband & Wife to bring mutual prosperity, peace of mind, and family harmony.',
        inclusions: [
          '2 Persons Names & Gotra recited',
          'Combined Dampati Sankalp',
          'Special Deep Daan in couple name',
          'Free Aashirwad Box delivered to home',
          'Live stream link & uncut video',
        ],
        display_order: 3,
        is_active: true,
      },
      {
        id: '22222222-4444-4444-4444-444444444444',
        puja_id: '11111111-1111-1111-1111-111111111111',
        name: 'Family Puja + Gau Seva',
        package_type: 'group',
        max_persons: 6,
        price: 2001,
        original_price: 2900,
        badge_text: 'Best Value',
        description: 'Complete Family Sankalp for up to 6 members with Gau Seva, Anna Daan, and consecrated Prasad.',
        inclusions: [
          'Up to 6 Family Members recited',
          'Pitru Tarpan & Sampoorna Havan',
          'Special Gau Grass & Anna Daan seva',
          'Premium Aashirwad Box with Falgu Jal',
          'Full WhatsApp video & photos proof',
        ],
        display_order: 4,
        is_active: true,
      },
    ],
  },
  {
    id: '11111111-2222-2222-2222-222222222222',
    title: 'Maha Mrityunjaya & Rudrabhishek at Trimbakeshwar',
    slug: 'maha-mrityunjaya-rudrabhishek-trimbakeshwar',
    subtitle: 'Ayushya Vardhan, Health Protection & Relief from Graha Doshas at the Jyotirlinga',
    short_description: 'Experience the divine power of sacred Rudrabhishek chanted with 11 Vedic Pandits at Trimbakeshwar Jyotirlinga. Ward off untimely hurdles, illnesses, and negative energies.',
    description: 'Trimbakeshwar is the revered origin of Godavari and home to the three-faced Jyotirlinga representing Brahma, Vishnu, and Mahesh. The Maha Mrityunjaya Rudrabhishek recitation bestows divine longevity, mental serenity, and protection against malefic planetary impacts.',
    banner_image_url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&q=80',
    gallery_images: [
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
    ],
    event_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    enrollment_end_date: new Date(Date.now() + (6 * 24 + 12) * 60 * 60 * 1000).toISOString(),
    location_name: 'Trimbakeshwar Jyotirlinga, Nashik, Maharashtra',
    tithi_details: 'Shukla Trayodashi (Som Pradosh Vrat)',
    starting_price: 1100,
    puja_status: 'upcoming',
    is_featured: true,
    is_active: true,
    meeting_link: 'https://meet.google.com/dharmik-trimbak-puja',
    benefits: [
      {
        title: 'Arogya & Longevity',
        description: 'Invokes Lord Shiva for immunity, recovery from chronic ailments, and spiritual vitality.',
      },
      {
        title: 'Protection from Balarishta & Rahu',
        description: 'Subdues sharp planetary doshas like Kaal Sarp and Rahu-Ketu transit afflictions.',
      },
      {
        title: 'Panchamrit Abhishek',
        description: 'Ritual bath with Milk, Curd, Ghee, Honey, and Gangajal while chanting Sri Rudram.',
      },
    ],
    process_steps: [
      {
        step: 1,
        title: 'Sankalp & Ganapati Puja',
        description: 'Opening blessings for removal of all obstacles.',
      },
      {
        step: 2,
        title: 'Laghu Rudra & Namakam',
        description: '11 Brahmins chant the supreme Vedic hymns on the Jyotirlinga.',
      },
      {
        step: 3,
        title: 'Maha Mrityunjaya Havan',
        description: '1008 oblations with Bilva leaves and holy herbs.',
      },
      {
        step: 4,
        title: 'Bhasma Prasad Dispatch',
        description: 'Holy Bhasma and consecrated Rudraksha sent to your address.',
      },
    ],
    faqs: [
      {
        question: 'Can I enroll for my elderly parents?',
        answer: 'Yes, you can register in the name of parents or family members. Simply specify their names and relation in the enrollment form.',
      },
    ],
    display_order: 2,
    packages: [
      {
        id: '22222222-5555-5555-5555-555555555555',
        puja_id: '11111111-2222-2222-2222-222222222222',
        name: 'Single Devotee Rudrabhishek',
        package_type: 'single',
        max_persons: 1,
        price: 1100,
        original_price: 1600,
        badge_text: undefined,
        description: 'Personalized Rudrabhishek with your Name and Gotra.',
        inclusions: [
          '1 Person Sankalp',
          'Panchamrit Abhishek',
          'WhatsApp Video Highlights',
          'Live stream link',
        ],
        display_order: 1,
        is_active: true,
      },
      {
        id: '22222222-6666-6666-6666-666666666666',
        puja_id: '11111111-2222-2222-2222-222222222222',
        name: 'Family Sampoorna Mahapuja + Rudraksha',
        package_type: 'group',
        max_persons: 5,
        price: 2500,
        original_price: 3500,
        badge_text: 'Recommended',
        description: 'Family protection ritual with consecrated 5-Mukhi Rudraksha and Bhasma prasad.',
        inclusions: [
          'Up to 5 Family Members',
          'Full Maha Mrityunjaya Havan',
          'Consecrated 5-Mukhi Rudraksha sent by courier',
          'Full video proof & WhatsApp updates',
        ],
        display_order: 2,
        is_active: true,
      },
    ],
  },
];

export async function getAllPujas(): Promise<Puja[]> {
  if (!supabaseClient) {
    return FALLBACK_PUJAS;
  }

  try {
    const { data: pujasData, error } = await supabaseClient
      .from('pujas')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error || !pujasData || pujasData.length === 0) {
      return FALLBACK_PUJAS;
    }

    // Fetch packages for these pujas
    const pujaIds = pujasData.map((p) => p.id);
    const { data: packagesData } = await supabaseClient
      .from('puja_packages')
      .select('*')
      .in('puja_id', pujaIds)
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    return pujasData.map((puja) => ({
      ...puja,
      packages: (packagesData || []).filter((pkg) => pkg.puja_id === puja.id),
    }));
  } catch (err) {
    console.warn('Error fetching pujas from Supabase, using fallback:', err);
    return FALLBACK_PUJAS;
  }
}

export async function getPujaBySlug(slug: string): Promise<Puja | null> {
  if (!supabaseClient) {
    return FALLBACK_PUJAS.find((p) => p.slug === slug) || null;
  }

  try {
    const { data: puja, error } = await supabaseClient
      .from('pujas')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .maybeSingle();

    if (error || !puja) {
      return FALLBACK_PUJAS.find((p) => p.slug === slug) || null;
    }

    const { data: packages } = await supabaseClient
      .from('puja_packages')
      .select('*')
      .eq('puja_id', puja.id)
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    return {
      ...puja,
      packages: packages || [],
    };
  } catch (err) {
    console.warn('Error fetching puja by slug, using fallback:', err);
    return FALLBACK_PUJAS.find((p) => p.slug === slug) || null;
  }
}

export function generateBookingNumber(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `PUJA-${year}-${random}`;
}
