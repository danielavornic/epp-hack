import React from "react";
import { useForm, Controller } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import CustomSelect from "./CustomSelect";

const specializations = [
  { specialization_name: "Urban Planning", specialization_id: "UP501" },
  { specialization_name: "Sustainable Architecture", specialization_id: "SA502" }
];

const ModalComponent = ({ open, handleClose }) => {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (formData) => {
    console.log(formData);
    handleClose();
  };

  if (!open) {
    return null;
  }

  return (
    <>
      <div className={` absolute inset-0 z-40 ${open ? 'blur-background' : ''}`} />
      <div
        className=" overflow-y-auto h-full fixed z-50 inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 cursor-pointer"
        onClick={handleClose}
      >
        <div
          className=" relative w-full md:w-3/4 lg:w-1/2 bg-white rounded-lg shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={handleClose}
            className="absolute top-0 right-0 mt-4 mr-4 text-gray-600 hover:text-gray-900"
          >
            <IoClose size={24} />
          </button>
          <form onSubmit={handleSubmit(onSubmit)} className="p-6">
            <h3 className="text-2xl font-bold text-center mb-4">Add a New Offer</h3>

            <div className="mb-4 mt-[200px]">
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
              {errors.offer_name && <span className="text-[#e60000] text-sm">{errors.offer_name.message}</span>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700">Country Name</label>
              <Controller
                name="country_name"
                control={control}
                rules={{ required: "Country Name is required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="w-full border border-gray-300 rounded p-2 mt-2"
                    placeholder="Country Name"
                  />
                )}
              />
              {errors.country_name && <span className="text-red-500 text-sm">{errors.country_name.message}</span>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700">University Name</label>
              <Controller
                name="university_name"
                control={control}
                rules={{ required: "University Name is required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="w-full border border-gray-300 rounded p-2 mt-2"
                    placeholder="University Name"
                  />
                )}
              />
              {errors.university_name && <span className="text-red-500 text-sm">{errors.university_name.message}</span>}
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
              <label className="block text-sm font-bold text-gray-700">Offer Start Date</label>
              <Controller
                name="offer_start_date"
                control={control}
                rules={{ required: "Offer Start Date is required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="date"
                    className="w-full border border-gray-300 rounded p-2 mt-2"
                  />
                )}
              />
              {errors.offer_start_date && <span className="text-red-500 text-sm">{errors.offer_start_date.message}</span>}
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
              <label className="block text-sm font-bold text-gray-700">Receiver Name</label>
              <Controller
                name="receiver_name"
                control={control}
                rules={{ required: "Receiver Name is required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="w-full border border-gray-300 rounded p-2 mt-2"
                    placeholder="Receiver Name"
                  />
                )}
              />
              {errors.receiver_name && <span className="text-red-500 text-sm">{errors.receiver_name.message}</span>}
            </div>

            <CustomSelect
              control={control}
              name="specializations"
              options={specializations.map(s => ({ value: s.specialization_id, label: s.specialization_name }))}
              label="Specializations"
              errors={errors}
            />

            <div className="flex justify-end gap-4 mt-4">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
                onClick={handleClose}
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
    </>
  );
};

export default ModalComponent;
