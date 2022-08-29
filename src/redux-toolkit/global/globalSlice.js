import { createSlice } from "@reduxjs/toolkit";
import { themes } from "~/themes/ThemeData";
const { roseTheme } = themes;
export const globalSlice = createSlice({
  name: "global",
  initialState: {
    isSticky: false,
    theme: roseTheme,
    showModalTheme: false,
    loading: false,
  },
  reducers: {
    setBgHeader: (state, action) => {
      state.isSticky = action.payload;
    },
    setThemeBg: (state, action) => {
      state.theme = action.payload;
    },
    setShowModalTheme: (state, action) => {
      state.showModalTheme = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});
export const { setBgHeader, setThemeBg, setShowModalTheme, setLoading } =
  globalSlice.actions;
export default globalSlice.reducer;
