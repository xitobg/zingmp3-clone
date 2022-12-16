import { createSlice } from "@reduxjs/toolkit";
export const videoMvSlice = createSlice({
  name: "videoMv",
  initialState: {
    showVideoMV: false,
    idMv: "",
  },
  reducers: {
    setShowVideoMV: (state, action) => {
      state.showVideoMV = action.payload;
    },
    setIdMv: (state, action) => {
      state.idMv = action.payload;
    },
  },
});
export const { setShowVideoMV, setIdMv } = videoMvSlice.actions;
export default videoMvSlice.reducer;
