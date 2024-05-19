import React from "react";

const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-dashed border-blue-500"></div>
    </div>
  );
};

export default LoadingIndicator;
