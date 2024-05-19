import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/router";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import SideBar from "@/widgets/SideBar";

interface FormData {
  offer_name: string;
  description: string;
  program_start: string;
  program_end: string;
  offer_end_date: string;
  scholarship: number;
  language: string;
  receiver_id: number;
  specializations: { value: number; label: string }[];
}

const AddOfferPage: React.FC = () => {
  const animatedComponents = makeAnimated();
  const { control, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const [specializations, setSpecializations] = useState([]);
  const [universities, setUniversities] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        const response = await axios.get("http://192.168.43.106:8080/api/specializations/u/15");
        const formattedSpecializations = response.data.map((spec: any) => ({
          value: spec.specialization_id,
          label: spec.specialization_name.trim(),
        }));
        setSpecializations(formattedSpecializations);
      } catch (error) {
        console.error("Error fetching specializations:", error);
      }
    };

    const fetchUniversities = async () => {
      try {
        const response = await axios.get("http://192.168.43.106:8080/api/universities");
        const formattedUniversities = response.data.map((uni: any) => ({
          value: uni.university_id,
          label: uni.university_name,
        }));
        setUniversities(formattedUniversities);
      } catch (error) {
        console.error("Error fetching universities:", error);
      }
    };

    fetchSpecializations();
    fetchUniversities();
  }, []);

  const onSubmit = async (formData: FormData) => {
    const dataToSend = {
      sender_id: 15,
      receiver_id: formData.receiver_id.value,
      offer_name: formData.offer_name,
      description: formData.description,
      offer_start_date: new Date(),
      offer_end_date: new Date(formData.offer_end_date),
      program_start: new Date(formData.program_start),
      program_end: new Date(formData.program_end),
      scholarship: formData.scholarship,
      language: formData.language,
      specializations: formData.specializations.map(spec => ({
        specialization_id: spec.value,
        specialization_name: spec.label,
      })),
    };

    try {
      await axios.post("http://192.168.43.106:8080/api/offers", dataToSend);
      reset();
      router.push("/uni/opportunities");
    } catch (error) {
      console.error("Error saving offer:", error);
    }
  };

  return (
    <SideBar>
      <div className="min-h-screen flex items-center justify-center bg-[#FFF]">
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-xl p-6">
          <h3 className="text-2xl font-bold text-center mb-4">Add a New Offer</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700">Offer Name</label>
              <Controller
                name="offer_name"
                control={control}
                rules={{ required: "Offer Name is required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="w-full border border-gray-300 rounded p-2 mt-2"
                    placeholder="Offer Name"
                  />
                )}
              />
              {errors.offer_name && <span className="text-red-500 text-sm">{errors.offer_name.message}</span>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700">Description</label>
              <Controller
                name="description"
                control={control}
                rules={{ required: "Description is required" }}
                render={({ field }) => (
                  <textarea
                    {...field}
                    className="w-full border border-gray-300 rounded p-2 mt-2"
                    placeholder="Description"
                  ></textarea>
                )}
              />
              {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700">Program Start Date</label>
              <Controller
                name="program_start"
                control={control}
                rules={{ required: "Program Start Date is required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="date"
                    className="w-full border border-gray-300 rounded p-2 mt-2"
                  />
                )}
              />
              {errors.program_start && <span className="text-red-500 text-sm">{errors.program_start.message}</span>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700">Program End Date</label>
              <Controller
                name="program_end"
                control={control}
                rules={{ required: "Program End Date is required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="date"
                    className="w-full border border-gray-300 rounded p-2 mt-2"
                  />
                )}
              />
              {errors.program_end && <span className="text-red-500 text-sm">{errors.program_end.message}</span>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700">Offer End Date</label>
              <Controller
                name="offer_end_date"
                control={control}
                rules={{ required: "Offer End Date is required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="date"
                    className="w-full border border-gray-300 rounded p-2 mt-2"
                  />
                )}
              />
              {errors.offer_end_date && <span className="text-red-500 text-sm">{errors.offer_end_date.message}</span>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700">Scholarship Amount</label>
              <Controller
                name="scholarship"
                control={control}
                rules={{ required: "Scholarship Amount is required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    className="w-full border border-gray-300 rounded p-2 mt-2"
                    placeholder="Scholarship Amount"
                  />
                )}
              />
              {errors.scholarship && <span className="text-red-500 text-sm">{errors.scholarship.message}</span>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700">Language</label>
              <Controller
                name="language"
                control={control}
                rules={{ required: "Language is required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="w-full border border-gray-300 rounded p-2 mt-2"
                    placeholder="Language"
                  />
                )}
              />
              {errors.language && <span className="text-red-500 text-sm">{errors.language.message}</span>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700">Receiver University</label>
              <Controller
                name="receiver_id"
                control={control}
                rules={{ required: "Receiver University is required" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    closeMenuOnSelect={true}
                    components={animatedComponents}
                    options={universities}
                    getOptionValue={(option) => String(option.value)}
                  />
                )}
              />
              {errors.receiver_id && <span className="text-red-500 text-sm">{errors.receiver_id.message}</span>}
            </div>

            <label className="block text-sm font-bold text-gray-700 pb-2">Specializations</label>
            <Controller
              name="specializations"
              control={control}
              rules={{ required: "At least one specialization is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  options={specializations}
                />
              )}
            />
            {errors.specializations && <span className="text-red-500 text-sm">{errors.specializations.message}</span>}

            <div className="flex justify-end gap-4 mt-4">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
                onClick={() => router.push("/uni/opportunities")}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </SideBar>
  );
};

export default AddOfferPage;
