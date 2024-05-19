import clsx from "clsx";
import { useRouter } from "next/router";
import queryString from "query-string";
import { useEffect, useState } from "react";

import { Button } from "@nextui-org/react";
import { SpecializationCourses } from "@/types";

interface DetailPanelProps {
  data: SpecializationCourses;
  name: string;
  university: string;
  onClose: () => void;
}

const emptyData = {
  name: "",
  code: "",
  description: "",
  video: "",
  brand: "",
  type: "",
  year: 0
};

export const CoursesPanel = ({ data, name, university, onClose }: DetailPanelProps) => {
  const { available_courses, covered_courses, not_covered_courses } = data || emptyData;

  const router = useRouter();

  const [studentData, setStudentData] = useState({
    university: {
      id: "",
      name: ""
    },
    specialization: {
      id: "",
      name: ""
    },
    semester: 0
  });

  useEffect(() => {
    const studentData = localStorage.getItem("student");
    if (studentData) {
      setStudentData(JSON.parse(studentData));
    }
  }, []);

  return (
    <div className="fixed right-0 top-0 z-20 flex h-screen w-full justify-between">
      <div
        className="inset-0 h-screen w-full bg-modal-overlay backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="detail-panel-scrollbar border-stroke h-full max-h-screen min-w-[560px] max-w-[560px] overflow-y-auto border bg-gray-50">
        <div className="border-stroke border-b bg-white px-5 pb-6 pt-8">
          <div className="flex justify-between">
            <div className="text-h5">
              <h1 className="text-2xl font-semibold">"{name}" Courses</h1>
            </div>
          </div>
          <p className="pt-2 text-base">
            University
            <span className="ml-2 font-medium text-primary-800">{university}</span>
          </p>

          {/* mention that this is according to your current studies */}
          {studentData && (
            <p className="pt-4 text-sm text-gray-700">
              According to your current studies <br />
              (University:{" "}
              <span className="font-medium text-primary-800">{studentData.university.name}</span>,
              Specialization:{" "}
              <span className="font-medium text-primary-800">
                {studentData.specialization.name}
              </span>
              , Semester:{" "}
              <span className="font-medium text-primary-800">{studentData.semester}</span>)
            </p>
          )}
        </div>

        <div className="px-5 pb-6 pt-4">
          <div>
            <h2 className="mb-1 text-xl font-semibold text-primary-800">All Available Courses</h2>
            <p className="mb-4 text-xs text-gray-800">
              All the courses the selected specialization offers and are available for you to
              choose.
            </p>
            <ul className="list-decimal pl-6">
              {available_courses?.map((course) => (
                <li key={course.course_name}>
                  {course.course_name} ({course.credits} credits)
                </li>
              ))}
            </ul>

            <a href="#" className="mt-2 block text-primary-700 underline">
              View more details
            </a>
          </div>

          <div className="mt-6">
            <h2 className="mb-1 text-xl font-semibold text-green-700">Covered Courses</h2>
            <p className="mb-4 text-xs text-gray-800">
              Courses you have to take during the period of the selected exchange program that would
              match the credits of the chosen specialization.
            </p>
            <ul className="list-decimal pl-6">
              {covered_courses?.map((course) => (
                <li key={course.course_name}>
                  {course.course_name} ({course.credits} credits)
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <h2 className="mb-1 text-xl font-semibold text-red-700">Not Covered Courses</h2>
            <p className="mb-4 text-xs text-gray-800">
              Courses you have to take during the period of the selected exchange program that would
              NOT match the credits of the chosen specialization.
            </p>
            <ul className="list-decimal pl-6">
              {not_covered_courses?.map((course) => (
                <li key={course.course_name}>
                  {course.course_name} ({course.credits} credits)
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
