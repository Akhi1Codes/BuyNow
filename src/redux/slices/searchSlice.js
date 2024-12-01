import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searched: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearched: (state, action) => {
      state.searched = action.payload;
    },
    clearSearched: (state) => {
      state.searched = "";
    },
  },
});
export const { setSearched, clearSearched } = searchSlice.actions;
export default searchSlice.reducer;
