import { Layout } from "@/components/uni";
import { useAppDispatch, useComparison } from "@/lib/hooks";
import { removeOffer } from "@/lib/slices/comparisonSlice";
import { Button, Card, CardBody, CardHeader, Divider, Select, SelectItem } from "@nextui-org/react";
import { Filter, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

enum FilterKeys1 {
  City = "city_name",
  Country = "country_name",
  University = "university_name",
  Scholarship = "scholarship",
  Specializations = "specializations",
  ProgramStart = "program_start",
  ProgramEnd = "program_end",
  ApplicationStart = "offer_start_date",
  ApplicationEnd = "offer_end_date",
  Language = "language"
}

enum FilterKeys {
  city_name = "City",
  country_name = "Country",
  university_name = "University",
  scholarship = "Scholarship",
  specializations = "Specializations",
  program_start = "Program start",
  program_end = "Program end",
  offer_start_date = "Application start",
  offer_end_date = "Application end",
  language = "Language",
  receiver_name = "University Receiver"
}

const formatDate = (date: string) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
};

const CriteriaCard = ({ filters }: { filters: any }) => {
  return (
    <Card shadow="sm">
      <CardHeader>
        <h4 className="text-lg font-semibold">Criteria</h4>
      </CardHeader>
      <Divider />
      <CardBody>
        <ul className="space-y-2">
          {filters.map((filter: any) => (
            <li key={filter} className="border-b border-gray-200 pb-2 last:border-none">
              {FilterKeys[filter as keyof typeof FilterKeys]}
            </li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
};

const CriteriaCardOffer = ({ filters, offer }: { filters: any; offer: any }) => {
  return (
    <Card shadow="sm">
      <CardHeader>
        <h4 className="text-lg font-semibold">Criteria</h4>
      </CardHeader>
      <Divider />
      <CardBody>
        <ul className="space-y-2">
          {filters.map((filter: any) => (
            <li key={filter} className="border-b border-gray-200 pb-2 last:border-none">
              {filter === "specializations"
                ? offer.specializations.map((s: any) => s.specialization_name).join(", ")
                : filter.includes("start") || filter.includes("end") || filter.includes("dealine")
                  ? formatDate(offer[filter])
                  : offer[filter]}
            </li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
};

const comparison = () => {
  const { offers } = useComparison();
  const dispatch = useAppDispatch();

  const [filterType, setFilterType] = useState("all");
  const [filterKeys, setFilterKeys] = useState<FilterKeys1[]>([]);

  console.log(offers);

  useEffect(() => {
    if (offers.length < 2) return;

    if (filterType === "all") {
      setFilterKeys(Object.values(FilterKeys1));
    }

    // remove id, description, from offer
    const cleanOffers = offers.map((offer) => {
      const { id, description, offer_name, ...rest } = offer;
      return rest;
    });

    const o1 = cleanOffers[0] as any;
    const o2 = cleanOffers[1] as any;

    const keys = Object.keys(o1).filter((key: any) => {
      if (filterType === "diff") {
        return o1[key] !== o2[key];
      }

      if (filterType === "same") {
        return o1[key] === o2[key];
      }

      return true;
    });

    setFilterKeys(keys as FilterKeys1[]);
    console.log(keys);
  }, [filterType, offers]);

  const OfferOverviewCard = ({ offer }: { offer: any }) => {
    return (
      <Card shadow="sm" className="min-h-[128px]">
        <CardHeader>
          <h4 className="text-lg font-semibold">{offer.offer_name}</h4>
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-row items-end justify-end space-x-3">
          <div>
            <Button onClick={() => dispatch(removeOffer(offer.id))} color="danger" variant="flat">
              Remove offer
            </Button>
          </div>
          <Link href={`/opportunities/${offer.id}`}>
            <Button color="primary" className="w-full">
              View more
            </Button>
          </Link>
        </CardBody>
      </Card>
    );
  };

  return (
    <Layout title="Comparison">
      <div className="min-h-screen bg-slate-50 pb-10">
        <div className="container">
          <h1 className="pt-12 text-4xl font-semibold">Erasmus+ Offers Comparison</h1>
          <p className="mb-10 pt-4">Compare offers to find the best one for you.</p>
        </div>

        {offers.length === 0 ? (
          <div className="container">
            <p className="text-center text-lg">
              No offers added to comparison.{" "}
              <Link href="/opportunities" className="text-primary-500 hover:underline">
                Go to main page to add offers.
              </Link>
            </p>
          </div>
        ) : (
          <div className="container">
            <div className="grid grid-cols-4 gap-4">
              <div className="space-y-4">
                <Card shadow="sm">
                  <CardBody>
                    <Select
                      label="Filter by"
                      size="sm"
                      defaultSelectedKeys={["all"]}
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                    >
                      <SelectItem key="all" value="all">
                        All
                      </SelectItem>
                      <SelectItem key="diff" value="diff">
                        Different
                      </SelectItem>
                      <SelectItem key="same" value="same">
                        Same
                      </SelectItem>
                    </Select>
                    <Button endContent={<Plus />} isDisabled className="mt-4">
                      Add course
                    </Button>
                  </CardBody>
                </Card>

                <CriteriaCard filters={filterKeys} />
              </div>

              {offers?.[0] && (
                <div className="space-y-4">
                  <OfferOverviewCard offer={offers[0]} />
                  <CriteriaCardOffer filters={filterKeys} offer={offers[0]} />
                </div>
              )}
              {offers?.[1] && (
                <div className="space-y-4">
                  <OfferOverviewCard offer={offers[1]} />
                  <CriteriaCardOffer filters={filterKeys} offer={offers[1]} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default comparison;
