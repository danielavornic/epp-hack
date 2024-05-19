import React from "react";

interface PageNameProps {
  pageName: string;
}

const PageName: React.FC<PageNameProps> = ({ pageName }) => {
  return (
    <div className="w-full">
      <h3 className="py-4 text-2xl font-bold">{pageName}</h3>
    </div>
  );
};

export default PageName;
