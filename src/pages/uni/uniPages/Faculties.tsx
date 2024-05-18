import PageName from "@/widgets/PageName";
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const Faculties = () => {
  const [file, setFile] = useState(null);
  const fileTypes = ["XLS", "XLSX", "CSV"];
  const handleChange = (file: any) => {
    setFile(file);
  };
  return (
    <div className="w-full">
      <PageName pageName="Faculties" />
      <div className="flex h-screen w-full items-center justify-center">
        <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
      </div>
    </div>
  );
};

export default Faculties;
