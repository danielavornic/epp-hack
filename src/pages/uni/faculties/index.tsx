import PageName from "@/widgets/PageName";
import SideBar from "@/widgets/SideBar";
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const index = () => {
  const [file, setFile] = useState(null);
  const fileTypes = ["XLS", "XLSX", "CSV"];
  const handleChange = (file: any) => {
    setFile(file);
  };
  return (
    <SideBar>
      <PageName pageName="Faculties" />
      <div className="flex h-screen w-full items-center justify-center">
        <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
      </div>
    </SideBar>
  );
};

export default index;
