import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Offer } from "@/types";
import { set } from "react-hook-form";

interface ComparisonState {
  offers: Offer[];
}

const initialState: ComparisonState = {
  offers: []
};

const comparisonSlice = createSlice({
  name: "comparison",
  initialState,
  reducers: {
    addOffer(state, action: PayloadAction<Offer>) {
      if (state.offers.length < 2) {
        state.offers.push(action.payload);

        localStorage.setItem("offers", JSON.stringify(state.offers));
      }
    },
    removeOffer(state, action: PayloadAction<string>) {
      state.offers = state.offers.filter((offer) => offer.id !== action.payload);

      localStorage.setItem("offers", JSON.stringify(state.offers));
    },
    toggleOffer(state, action: PayloadAction<Offer>) {
      // check if it is already in the comparison
      const index = state.offers.findIndex((offer) => offer.id === action.payload.id);

      if (index !== -1) {
        state.offers = state.offers.filter((offer) => offer.id !== action.payload.id);

        localStorage.setItem("offers", JSON.stringify(state.offers));
      }

      if (state.offers.length < 2) {
        state.offers.push(action.payload);

        localStorage.setItem("offers", JSON.stringify(state.offers));
      }
    },
    setComparison(state, action: PayloadAction<Offer[]>) {
      state.offers = action.payload;
    }
  }
});

export const { addOffer, removeOffer, toggleOffer, setComparison } = comparisonSlice.actions;

export default comparisonSlice.reducer;
