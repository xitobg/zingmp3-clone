import { configureStore, combineReducers } from "@reduxjs/toolkit";
import audioSlice from "./audio/audioSlice";
import globalSlice from "./global/globalSlice";
const reducer = combineReducers({
  global: globalSlice,
  audio: audioSlice,
});
const store = configureStore({
  reducer: reducer,
});
export default store;
