export type BrandCategory = "streetwear" | "fastfashion" | "luxury" | "sports";
export type DropStatus = "predicted" | "confirmed" | "live" | "ended" | "watching";
export type FilterOption = "all" | BrandCategory | "imminent";
export type DropType = "anniversary" | "summer" | "flash" | "collab" | "clearance";
export type CountryCode = "PT" | "ES" | "UK" | "US" | "SE" | "FR" | "DE";

export interface Brand {
  id: string;
  slug: string;
  name: string;
  country: CountryCode;
  category: BrandCategory;
  logo_emoji: string;
  description: string;
  founded_year: number;
  instagram_handle: string;
  website_url: string;
  created_at: string;
  current_drop?: Drop | null;
}

export interface Drop {
  id: string;
  brand_id: string;
  title: string;
  status: DropStatus;
  alert_level: number;
  predicted_date: string | null;
  confirmed_date: string | null;
  discount_range: string | null;
  drop_type: DropType | null;
  evidence: string[];
  notes: string | null;
  created_at: string;
}

export interface DropHistory {
  id: string;
  brand_id: string;
  happened_at: string;
  discount_peak: number;
  duration_hours: number;
  had_password: boolean;
  sold_out_minutes: number | null;
  source_url: string | null;
  notes: string | null;
}

export interface Subscriber {
  id: string;
  email: string;
  brands: string[];
  confirmed: boolean;
  confirmation_token: string | null;
  created_at: string;
}

export interface BrandStaticData {
  slug: string;
  name: string;
  country: CountryCode;
  category: BrandCategory;
  logo_emoji: string;
  description: string;
  instagram_handle: string;
  website_url: string;
  founded_year: number;
}

export interface RadarDataPoint {
  axis: string;
  value: number;
}
