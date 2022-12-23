import { createSlice } from "@reduxjs/toolkit";
export const videoMvSlice = createSlice({
  name: "videoMv",
  initialState: {
    showVideoMV: false,
    idMv: JSON.parse(localStorage.getItem("ID_VIDEO_MV")) || "ZWACDBZ6",
  },
  reducers: {
    setShowVideoMV: (state, action) => {
      state.showVideoMV = action.payload;
    },
    setIdMv: (state, action) => {
      state.idMv = action.payload;
      localStorage.setItem("ID_VIDEO_MV", JSON.stringify(action.payload));
    },
  },
});
export const { setShowVideoMV, setIdMv } = videoMvSlice.actions;
export default videoMvSlice.reducer;
