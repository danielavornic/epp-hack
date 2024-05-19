import { Offer } from "@/types";
import { Button } from "@nextui-org/react";
import { Scale } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import queryString from "query-string";
import Highlighter from "react-highlight-words";

const FooterItem = ({ field, value }: { field: string; value: string }) => (
  <p className="text-body-md">
    {field}
    <span className="ml-2 font-medium text-primary-800">{value}</span>
  </p>
);

const formatDate = (date: string) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
};

export const OfferCard = ({ offer }: { offer: Offer }) => {
  const {
    id,
    offer_name: title,
    country_name: country,
    city_name: city,
    university_name: university,
    description,
    offer_end_date: endDate,
    offer_start_date: startDate,
    scholarship,
    language,
    program_start: programStart,
    program_end: programEnd,
    receiver_name: receiver
  } = offer;

  const { query, pathname, push } = useRouter();
  const searchTerm = query.searchTerm as string;

  return (
    <div className="border-stroke rounded-[10px] border bg-white shadow-sm">
      <div className="mx-card pt-card flex items-start justify-between pb-7">
        <div>
          <Highlighter
            searchWords={[searchTerm]}
            textToHighlight={title}
            highlightClassName="bg-white text-primary"
            className="text-body-md font-medium"
          />
          <p className="text text-sm">{university}</p>
          <p className="text text-sm">{`${city}, ${country}`}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Link href={`/opportunities/${id}`}>
            <Button color="primary">View more</Button>
          </Link>
          <Button isIconOnly title="Add to comparison" variant="flat">
            <Scale />
          </Button>
        </div>
      </div>

      <hr className="border-stroke mx-[15px] border" />

      <div className="px-card mb-6 mt-4 space-y-[5px]">
        <h4 className="text-body-md mb-[5px] font-medium text-primary-500">About offer</h4>
        <p className="text-body-sm line-clamp-4">{description}</p>
      </div>

      <div className="mr-card border-stroke pl-card flex space-x-[30px] border-t pb-[15px] pt-[13px]">
        <FooterItem field="Scolarship fee" value={`${scholarship} EUR`} />
        <FooterItem field="Application deadline" value={formatDate(endDate)} />
      </div>
    </div>
  );
};
