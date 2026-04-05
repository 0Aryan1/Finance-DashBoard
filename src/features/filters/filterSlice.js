import { createSlice } from "@reduxjs/toolkit";
import { filters as initialFilters } from "@/features/transactions/mockData";

const initialState = initialFilters;

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    resetFilters: () => initialState
  }
});

export const { setSearch, setCategory, setType, setSortBy, setSortOrder, resetFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
