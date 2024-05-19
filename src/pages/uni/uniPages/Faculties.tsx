import PageName from "@/widgets/PageName";
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import LoadingIndicator from "@/widgets/LoadingIndicator";

const Faculties = () => {
  const [file, setFile] = useState(null);
  const fileTypes = ["XLS", "XLSX", "CSV"];
  const [loading, setIsLoading] = useState(false);
  const handleChange = (file: any) => {
    const fileType = file.name.split(".").pop()?.toUpperCase();
    if (fileTypes.includes(fileType)) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 4000);
    }
    setFile(file);
  };
  return (
    <div className="w-full">
      <PageName pageName="Faculties" />
      <div className="flex h-screen w-full items-center justify-center">
        {loading ? (
          <LoadingIndicator />
        ) : (
          <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
        )}
      </div>
    </div>
  );
};

export default Faculties;
