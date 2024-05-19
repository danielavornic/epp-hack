import { Layout } from "@/components/uni";
import { CoursesPanel } from "@/components/uni/offer/CoursesPanel";
import { Offer, SpecializationCourses } from "@/types";
import { Button, Card, CardBody, CardFooter, CardHeader, Image, Divider } from "@nextui-org/react";
import {
  ArrowLeft,
  BookA,
  CircleDollarSign,
  Link,
  MapPin,
  Scale,
  Timer,
  University
} from "lucide-react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const data: Offer = {
  id: "5",
  offer_name: "Architecture Exchange Program",
  city_name: "Milan",
  country_name: "Italy",
  university_name: "Politecnico di Milano",
  description:
    "An immersive program in architectural design and urban planning at a prestigious Italian university.",
  offer_end_date: "2025-06-15",
  offer_start_date: "2024-09-15",
  scholarship: 950,
  language: "English",
  receiver_name: "Sophia Williams",
  program_start: "2024-09-15",
  program_end: "2025-06-15",
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

const formatDate = (date?: string) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
};

const specializationCourses: SpecializationCourses = {
  available_courses: {
    courses: [
      {
        course_name: "Introduction to Programming",
        credits: 6
      },
      {
        course_name: "Data Structures and Algorithms",
        credits: 6
      },
      {
        course_name: "Operating Systems",
        credits: 6
      },
      {
        course_name: "Computer Networks",
        credits: 6
      }
    ]
  },
  covered_courses: {
    courses: [
      {
        course_name: "Introduction to Programming",
        credits: 6
      },
      {
        course_name: "Data Structures and Algorithms",
        credits: 6
      }
    ]
  },
  not_covered_courses: {
    courses: [
      {
        course_name: "Operating Systems",
        credits: 6
      },
      {
        course_name: "Computer Networks",
        credits: 6
      }
    ]
  }
};

const OfferPage = () => {
  const {
    offer_name,
    description,
    offer_end_date,
    offer_start_date,
    scholarship,
    language,
    receiver_name,
    specializations,
    city_name,
    country_name,
    program_end,
    program_start
  } = data;

  const router = useRouter();

  const { specialization } = router.query;

  const handleBack = () => {
    router.push("/opportunities");
  };

  const onClickSpecialization = (id: string) => {
    router.push(`/opportunities/${router.query.id}?specialization=${id}`);
  };

  useEffect(() => {
    if (specialization) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [specialization]);

  return (
    <Layout title={data.offer_name}>
      <div className="min-h-screen bg-slate-50 pb-10">
        <div className="container">
          <div className="mb-10 flex justify-between space-x-10 pt-12">
            <div>
              <div className="flex items-center space-x-4 ">
                <Button isIconOnly variant="light" onClick={handleBack}>
                  <ArrowLeft />
                </Button>
                <h1 className="text-4xl font-semibold">{offer_name}</h1>
              </div>
              <p className=" pt-4">{description}</p>
            </div>
            <div>
              <Button color="primary" endContent={<Scale />}>
                Add to comparison
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-5 space-x-10">
            <Card className="border px-2 py-1 !shadow-sm">
              <CardHeader className="flex gap-3">
                <Button isIconOnly className="h-12 w-12">
                  <University />
                </Button>
                <div className="flex flex-col">
                  <h2 className="text-xl font-semibold text-primary-800">University</h2>
                  <p>{data.university_name}</p>
                </div>
              </CardHeader>
            </Card>
            <Card className="border px-2 py-1 !shadow-sm">
              <CardHeader className="flex gap-3">
                <Button isIconOnly className="h-12 w-12">
                  <MapPin />
                </Button>
                <div className="flex flex-col">
                  <h2 className="text-xl font-semibold text-primary-800">Location</h2>
                  <p>
                    {city_name}, {country_name}
                  </p>
                </div>
              </CardHeader>
            </Card>
            <Card className="border px-2 py-1 !shadow-sm">
              <CardHeader className="flex gap-3">
                <Button isIconOnly className="h-12 w-12">
                  <BookA />
                </Button>
                <div className="flex flex-col">
                  <h2 className="text-xl font-semibold text-primary-800">Language</h2>
                  <p>{language}</p>
                </div>
              </CardHeader>
            </Card>
            <Card className="border px-2 py-1 !shadow-sm">
              <CardHeader className="flex gap-3">
                <Button isIconOnly className="h-12 w-12">
                  <CircleDollarSign />
                </Button>
                <div className="flex flex-col">
                  <h2 className="text-xl font-semibold text-primary-800">Scholarship Fee</h2>
                  <p>{scholarship} EUR</p>
                </div>
              </CardHeader>
            </Card>
            <Card className="border px-2 py-1 !shadow-sm">
              <CardHeader className="flex gap-3">
                <Button isIconOnly className="h-12 w-12">
                  <Timer />
                </Button>
                <div className="flex flex-col">
                  <h2 className="text-xl font-semibold text-red-500">Deadline</h2>
                  <p>{formatDate(offer_end_date)}</p>
                </div>
              </CardHeader>
            </Card>
          </div>

          <div className="mb-5 mt-6 space-y-1">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-semibold uppercase text-primary-800">
                Programme Timeframe
              </h2>
              <div className="w-full flex-1">
                <Divider />
              </div>
            </div>
            <p className="text-lg">
              From <span className="font-semibold">{formatDate(program_start)}</span> to{" "}
              <span className="font-semibold">{formatDate(program_end)}</span>
            </p>
          </div>

          <div className="mb-5 mt-6 space-y-1">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-semibold uppercase text-primary-800">
                Specialties programmes
              </h2>
              <div className="w-full flex-1">
                <Divider />
              </div>
            </div>
            <ul className="list-inside list-decimal text-lg">
              {specializations.map((specialization) => (
                <li
                  key={specialization.speicialization_id}
                  onClick={() => onClickSpecialization(specialization.speicialization_id)}
                  className="cursor-pointer text-primary-600 hover:text-primary-800"
                >
                  {specialization.specialization_name}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-5 mt-6 space-y-1">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-semibold uppercase text-primary-800">
                Recipent university
              </h2>
              <div className="w-full flex-1">
                <Divider />
              </div>
            </div>
            <p className="text-lg">{receiver_name}</p>
          </div>

          <div className="mb-5 mt-6 space-y-1">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-semibold uppercase text-primary-800">
                CRITERIA FOR SUBMITTING THE APPLICATION FILE
              </h2>
              <div className="w-full flex-1">
                <Divider />
              </div>
            </div>
            <ul className="list-inside list-decimal text-lg">
              <li>
                Eligibility criteria: – to be a student enrolled at the Technical University of
                Moldova.
              </li>
              <li>
                Selection criteria:
                <ul className="list-inside list-decimal pl-4 text-lg">
                  <li>to meet the eligibility requirements.</li>
                  <li>
                    to have good academic results in the academic year prior to mobility and in the
                    last exam.
                  </li>
                </ul>
              </li>
              <li>
                Specific criteria:
                <ul className="list-inside list-decimal pl-4 text-lg">
                  <li>to have all the exams passed;</li>
                  <li>to submit other documents requested by the selection board in addition;</li>
                  <li>
                    to be able to demonstrate specific skills and abilities in accordance with the
                    work to be carried out at the partner university
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="mb-5 mt-6 space-y-1">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-semibold uppercase text-primary-800">
                APPLICATION FILE SHOULD CONTAIN:
              </h2>
              <div className="w-full flex-1">
                <Divider />
              </div>
            </div>
            <ul className="list-inside list-decimal text-lg">
              <li>
                Application addressed to the Rector of TUM and approved by the Dean of the Faculty
                (it can be requested from the international relations officer of the faculty).
              </li>
              <li>
                Photocopy of passport. Passport should be valid for the whole period of mobility.
              </li>
              <li>
                Student certificate issued by the faculty secretariat, with the mention that during
                the mobility period the candidate will have the status of student.
              </li>
              <li>Transcript of records issued by the faculty secretariat.</li>
              <li>
                Letter of motivation addressed to the Selection Committee, stating the main reasons
                for the choice of mobility, the candidate’s study objectives for mobility, the
                expected results (1-2 pages).
              </li>
              <li>Curriculum vitae (Europass form + photo).</li>
              <li>
                English/ language certificate (minimum B1 according to CEFR Common European
                Framework of Reference for Languages).
              </li>
              <li>
                Learning Agreement (LA) for Studies. The LA should be signed and endorsed by the
                Head of the Study Program or the Dean of the Faculty.
              </li>
            </ul>
          </div>

          <div className="mb-5 mt-6 space-y-1">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-semibold uppercase text-primary-800">
                Application process timeline
              </h2>
              <div className="w-full flex-1">
                <Divider />
              </div>
            </div>
            <p className="text-lg">
              From <span className="font-semibold">{formatDate(offer_start_date)}</span> to{" "}
              <span className="font-semibold">{formatDate(offer_end_date)}</span>
            </p>
          </div>
        </div>
      </div>
      {specialization && (
        <CoursesPanel
          data={specializationCourses}
          name={
            specializations.find((s) => s.speicialization_id === specialization)
              ?.specialization_name || ""
          }
          university={data.university_name}
          onClose={() => router.push(`/opportunities/${router.query.id}`)}
        />
      )}
    </Layout>
  );
};

export default OfferPage;
