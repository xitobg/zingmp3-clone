import { createSlice } from "@reduxjs/toolkit";
import { themes } from "~/themes/ThemeData";
const { roseTheme } = themes;
export const globalSlice = createSlice({
  name: "global",
  initialState: {
    isSticky: false,
    theme: JSON.parse(localStorage.getItem("THEME_BG")) || roseTheme,
    showModalTheme: false,
    loading: false,
    showPlayingbar: false,
    showNowPlaying: false,
  },
  reducers: {
    setBgHeader: (state, action) => {
      state.isSticky = action.payload;
    },
    setThemeBg: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem("THEME_BG", JSON.stringify(action.payload));
    },
    setShowModalTheme: (state, action) => {
      state.showModalTheme = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setShowPlayingbar: (state, action) => {
      state.showPlayingbar = action.payload;
    },

    setShowNowPlaying: (state, action) => {
      state.showNowPlaying = action.payload;
    },
  },
});
export const {
  setBgHeader,
  setThemeBg,
  setShowModalTheme,
  setLoading,
  setShowPlayingbar,
  setShowNowPlaying,
} = globalSlice.actions;
export default globalSlice.reducer;
