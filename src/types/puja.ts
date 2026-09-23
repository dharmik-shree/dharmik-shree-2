export type PujaStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
export type PackageType = 'single' | 'couple' | 'family' | 'group';
export type PaymentStatus = 'pending' | 'paid' | 'verified' | 'cancelled';

export interface PujaBenefit {
  title: string;
  description: string;
  icon?: string;
}

export interface PujaProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface PujaFAQ {
  question: string;
  answer: string;
}

export interface PujaPackage {
  id: string;
  puja_id: string;
  name: string;
  package_type: PackageType;
  max_persons: number;
  price: number;
  original_price?: number;
  badge_text?: string;
  description?: string;
  inclusions: string[];
  display_order: number;
  is_active: boolean;
}

export interface Puja {
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
  short_description?: string;
  description?: string;
  banner_image_url: string;
  gallery_images: string[];
  event_date: string;
  enrollment_end_date: string;
  location_name: string;
  tithi_details?: string;
  starting_price: number;
  puja_status: PujaStatus;
  is_featured: boolean;
  is_active: boolean;
  meeting_link?: string;
  benefits?: PujaBenefit[];
  process_steps?: PujaProcessStep[];
  faqs?: PujaFAQ[];
  display_order: number;
  created_at?: string;
  packages?: PujaPackage[];
}

export interface FamilyMemberInput {
  name: string;
  relation?: string;
}

export interface PujaEnrollmentPayload {
  puja_id: string;
  package_id?: string;
  package_name: string;
  package_type: PackageType;
  package_price: number;
  devotee_name: string;
  phone: string;
  whatsapp: string;
  email?: string;
  gotra: string;
  family_members?: FamilyMemberInput[];
  sankalp_wish?: string;
  prasad_address?: {
    house_street?: string;
    city?: string;
    state?: string;
    pincode?: string;
  };
}

export interface PujaEnrollmentResponse {
  success: boolean;
  booking_number: string;
  enrollment_id: string;
  message?: string;
}
