export interface Offer {
  id: string;
  offer_name: string;
  city_name?: string;
  country_name: string;
  university_name: string;
  description: string;
  offer_end_date: string;
  offer_start_date: string;
  program_start?: string;
  program_end?: string;
  scholarship: number;
  // category: string;
  language: string;
  receiver_name: string;
  specializations: {
    specialization_name: string;
    speicialization_id: string;
  }[];
}
