import LoadingIndicator from "@/widgets/LoadingIndicator";
import PageName from "@/widgets/PageName";
import SideBar from "@/widgets/SideBar";
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import SampleTable from "./SampleTable";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  getKeyValue
} from "@nextui-org/react";
const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning"
};

const index = () => {
  const [file, setFile] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const fileTypes = ["XLS", "XLSX", "CSV"];
  const [loading, setIsLoading] = useState(false);
  const handleChange = (file: any) => {
    const fileType = file.name.split(".").pop()?.toUpperCase();
    if (fileTypes.includes(fileType)) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setShowTable(true);
      }, 4000);
    }
    setFile(file);
  };
  return (
    <SideBar>
      <PageName pageName="Faculties" />
      {!showTable ? (
        <div className="relative top-[-55px] flex h-full w-full items-center justify-center">
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-dashed border-blue-500"></div>
            </div>
          ) : (
            <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
          )}
        </div>
      ) : (
        <div className="h-full w-full">
          <SampleTable />
        </div>
      )}
    </SideBar>
  );
};

export default index;
