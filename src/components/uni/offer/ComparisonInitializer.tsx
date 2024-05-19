import { useAppDispatch } from "@/lib/hooks";
import { setComparison } from "@/lib/slices/comparisonSlice";
import React, { ReactNode, useEffect } from "react";

interface ComparisonInitializerProps {
  children: ReactNode;
}

const ComparisonInitializer: React.FC<ComparisonInitializerProps> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const offersFromLocalStorage = localStorage.getItem("offers");

      if (offersFromLocalStorage) {
        const storedOffers = JSON.parse(offersFromLocalStorage);
        dispatch(setComparison(storedOffers));
      }
    }
  }, [dispatch]);

  return children;
};

export default ComparisonInitializer;
