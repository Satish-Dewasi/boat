import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filters",
  initialState: {
    priceRange: { min: 0, max: 10000 },
    rating: 0,
  },

  reducers: {
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    },
    setRating: (state, action) => {
      state.rating = action.payload;
    },

    resetFilters: (state) => {
      state.priceRange = { min: 0, max: 10000 };
      state.rating = 0;
    },
  },
});

export const { setPriceRange, setRating, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
