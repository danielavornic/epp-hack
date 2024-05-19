import React from 'react';
import { Controller } from 'react-hook-form';

const CustomSelect = ({ control, name, options, label, errors }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-bold text-gray-700">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <select {...field} className="w-full border border-gray-300 rounded p-2 mt-2">
            <option value="">Select {label}</option>
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      />
      {errors[name] && <span className="text-red-500 text-sm">{errors[name].message}</span>}
    </div>
  );
};

export default CustomSelect;
