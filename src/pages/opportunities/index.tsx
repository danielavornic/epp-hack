import { Layout, OfferCard, StudentModal } from "@/components/uni";
import { useRouter } from "next/router";
import debounce from "lodash.debounce";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Checkbox, Input, Select, SelectItem, useDisclosure } from "@nextui-org/react";
import { Search } from "lucide-react";
import { Offer } from "@/types";

interface FilterOption {
  label: string;
  value: string;
  defaultValue?: string;
}

type FormData = {
  searchTerm: string;
  [key: string]: FilterOption | string;
};

const categoryOptions = [
  {
    value: "all",
    label: "All Categories"
  },
  {
    value: 1,
    label: "Science and Technology"
  },
  {
    value: 2,
    label: "Business and Management"
  },
  {
    value: 3,
    label: "Health and Medicine"
  },
  {
    value: 4,
    label: "Environmental Studies"
  },
  {
    value: 5,
    label: "Arts and Design"
  }
];

const durationOptions = [
  { value: 1, label: "3 months" },
  { value: 2, label: "6 months" },
  { value: 3, label: "9 months" },
  { value: 4, label: "12 months" }
];

const languageOptions = [
  { value: "all", label: "All Languages" },
  { value: "en", label: "English" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "it", label: "Italian" },
  { value: "Spanish", label: "Spanish" }
];

const scholarshipOptions = [
  { value: "all", label: "All Scholarships" },
  { value: "1000", label: "€1000 per month" },
  { value: "1100", label: "€1100 per month" },
  { value: "1200", label: "€1200 per month" },
  { value: "900", label: "€900 per month" },
  { value: "950", label: "€950 per month" }
];

const countryOptions = [
  { value: "all", label: "All Countries" },
  { value: "Germany", label: "Germany" },
  { value: "France", label: "France" },
  { value: "Sweden", label: "Sweden" },
  { value: "Netherlands", label: "Netherlands" },
  { value: "Italy", label: "Italy" }
];

const cityOptions = [
  { value: "all", label: "All Cities" },
  { value: "Munich", label: "Munich" },
  { value: "Paris", label: "Paris" },
  { value: "Stockholm", label: "Stockholm" },
  { value: "Amsterdam", label: "Amsterdam" },
  { value: "Milan", label: "Milan" }
];

const filters = [
  { name: "category", options: categoryOptions },
  { name: "duration", options: durationOptions },
  { name: "language", options: languageOptions },
  { name: "country", options: countryOptions },
  { name: "city", options: cityOptions },
  { name: "scholarship fee", options: scholarshipOptions }
];

const data: Offer[] = [
  {
    id: "1",
    offer_name: "Computer Science Exchange Program",
    country_name: "Germany",
    university_name: "Technical University of Munich",
    description:
      "A comprehensive exchange program focusing on cutting-edge research and innovation in computer science.",
    offer_end_date: "2025-06-30",
    offer_start_date: "2024-09-01",
    scholarship: 1000,
    language: "English",
    receiver_name: "John Doe",
    specializations: [
      {
        specialization_name: "Artificial Intelligence",
        speicialization_id: "AI101"
      },
      {
        specialization_name: "Data Science",
        speicialization_id: "DS102"
      }
    ]
  },
  {
    id: "2",
    offer_name: "Business Management Exchange Program",
    country_name: "France",
    university_name: "HEC Paris",
    description:
      "An intensive program aimed at developing leadership and management skills in a global business environment.",
    offer_end_date: "2025-07-31",
    offer_start_date: "2024-10-01",
    scholarship: 1200,
    language: "English",
    receiver_name: "Jane Smith",
    specializations: [
      {
        specialization_name: "Financial Accounting",
        speicialization_id: "FA201"
      },
      {
        specialization_name: "Marketing Management",
        speicialization_id: "MM202"
      }
    ]
  },
  {
    id: "3",
    offer_name: "Biomedical Engineering Exchange Program",
    country_name: "Sweden",
    university_name: "Karolinska Institute",
    description:
      "A unique opportunity to engage in cutting-edge biomedical research and innovation.",
    offer_end_date: "2025-05-15",
    offer_start_date: "2024-08-15",
    scholarship: 1100,
    language: "English",
    receiver_name: "Emily Johnson",
    specializations: [
      {
        specialization_name: "Medical Imaging",
        speicialization_id: "MI301"
      },
      {
        specialization_name: "Biomaterials",
        speicialization_id: "BM302"
      }
    ]
  },
  {
    id: "4",
    offer_name: "Environmental Science Exchange Program",
    country_name: "Netherlands",
    university_name: "Wageningen University & Research",
    description:
      "Explore advanced topics in environmental science and sustainability at one of the leading institutions.",
    offer_end_date: "2025-08-31",
    offer_start_date: "2024-11-01",
    scholarship: 900,
    language: "English",
    receiver_name: "Michael Brown",
    specializations: [
      {
        specialization_name: "Climate Change",
        speicialization_id: "CC401"
      },
      {
        specialization_name: "Sustainable Agriculture",
        speicialization_id: "SA402"
      }
    ]
  },
  {
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
  }
];

const Opportunities = () => {
  const router = useRouter();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [userDetails, setUserDetails] = useState({
    university: {
      name: "",
      id: ""
    },
    specialization: {
      id: "",
      name: ""
    },
    semester: 0
  });
  const [includeStudentDetailsForm, setIncludeStudentDetailsForm] = useState(true);

  useEffect(() => {
    const userDetails = localStorage.getItem("student");
    if (userDetails) {
      setUserDetails(JSON.parse(userDetails));
      setIncludeStudentDetailsForm(true);
    } else {
      onOpen();
    }
  }, []);

  const { register, control, watch, reset, getValues } = useForm<FormData>({
    defaultValues: {
      searchTerm: "",
      ...filters.reduce((acc, { name }) => ({ ...acc, [name]: "" }), {})
    }
  });

  useEffect(() => {
    const queryParams = router.query;
    const formValues: { [key: string]: FilterOption | string } = {
      searchTerm: queryParams.searchTerm?.toString() || ""
    };

    filters.forEach(() => {
      const { name, options, defaultValue } = filters as any;
      const queryValue = queryParams[name]?.toString() || defaultValue || "all";
      if (queryValue) {
        const option = options?.find((o: any) => o.value === queryValue);
        formValues[name] = option || { value: queryValue, label: queryValue };
      }
    });

    reset(formValues);
  }, [router.query, filters, reset]);

  // Update URL on form change
  const debouncedUpdateUrl = debounce(() => {
    const formFields = getValues();
    const newQuery: { [key: string]: string } = {};
    Object.keys(formFields).forEach((key) => {
      const formField = formFields[key];
      newQuery[key] =
        typeof formField === "object" && formField !== null ? formField.value : formField;
    });

    Object.keys(newQuery).forEach((key) => {
      if (newQuery[key] === "") {
        delete newQuery[key];
      }
    });

    delete newQuery.undefined;
    const search = queryString.stringify(newQuery);
    if (window.location.search !== `?${search}`) {
      router.replace({ pathname: router.pathname, search }, undefined, { shallow: true });
    }
  }, 500);

  useEffect(() => {
    const subscription = watch(() => debouncedUpdateUrl());
    return () => subscription.unsubscribe();
  }, [watch, debouncedUpdateUrl]);

  return (
    <Layout title="Opportunities">
      <div className="min-h-screen bg-slate-50">
        <div className="container">
          <h1 className="pt-12 text-4xl font-semibold">Erasmus+ Opportunities</h1>
          <p className="mb-10 pt-4">
            Expore, filter and compare the Erasmus+ opportunities available for you.
          </p>

          <div className="border-stroke rounded-[7px] border bg-white p-6">
            <form className="border-stroke space-y-4 border-b pb-[18px]">
              <Input
                placeholder="Search for opportunities"
                startContent={<Search className="text-text-secondary w-5" />}
                {...register("searchTerm")}
                size="lg"
              />
              <div className="grid grid-cols-6 gap-4">
                {filters.map((filter, index) => (
                  <Controller
                    key={index}
                    control={control}
                    render={({ field }) => (
                      <Select
                        size="sm"
                        label={`Select ${filter.name}`}
                        className="w-full"
                        onChange={(value) => field.onChange(value)}
                        value={field.value as string}
                      >
                        {filter.options.map((option, index) => (
                          <SelectItem key={index} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </Select>
                    )}
                    {...{
                      ...register(filter.name),
                      ref: null
                    }}
                  />
                ))}
              </div>
              <div>
                <Checkbox
                  checked={includeStudentDetailsForm}
                  onChange={() => setIncludeStudentDetailsForm(!includeStudentDetailsForm)}
                >
                  Include student details ({userDetails.university.name} -{" "}
                  {userDetails.specialization.name})
                </Checkbox>
              </div>
            </form>
            <div className="mt-[26px] space-y-1">
              <h2 className="text-lg font-semibold text-primary-800">Recent searches</h2>
              <p className="text-sm font-medium">Total number of results found: 4</p>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-6 pl-10 pr-[56px]">
              {data?.map((item: any, index: number) => <OfferCard offer={item} key={index} />)}
            </div>
          </div>
        </div>
      </div>
      <StudentModal open={isOpen} onClose={onOpenChange} onOpenChange={onOpenChange} />
    </Layout>
  );
};

export default Opportunities;
