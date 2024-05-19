import { Layout } from "@/components/uni";
import { Offer } from "@/types";

const data: Offer = {
  id: "5",
  offer_name: "Architecture Exchange Program",
  country_name: "Italy",
  university_name: "Politecnico di Milano",
  description:
    "An immersive program in architectural design and urban planning at a prestigious Italian university.",
  offer_end_date: "2025-06-15",
  offer_start_date: "2024-09-15",
  scholarship: 950,
  language: "English",
  receiver_name: "Sophia Williams",
  specializations: [
    {
      specialization_name: "Urban Planning",
      speicialization_id: "UP501"
    },
    {
      specialization_name: "Sustainable Architecture",
      speicialization_id: "SA502"
    }
  ]
};

const OfferPage = () => {
  return <Layout title={data.offer_name}>OfferPage</Layout>;
};

export default OfferPage;
