import { createSlice } from "@reduxjs/toolkit";
import logozingmp3 from "~/assets/image/logo.jpeg";
export const audioSlice = createSlice({
  name: "audio",
  initialState: {
    infoSongPlayer: JSON.parse(localStorage.getItem("infoSongPlayer")) || {
      title: "Tên bài hát",
      thumbnail: logozingmp3,
      artistsNames: "Tên ca sĩ",
      duration: 0,
    },
    isPlay: false,
    isRepeat: false,
    isRandom: false,
    isMute: false,
    currentSongId: JSON.parse(localStorage.getItem("songId")) || "",
    srcAudio: "",
    playlistId: JSON.parse(localStorage.getItem("PLAYLIST_ID")) || "",
    playlistSong: JSON.parse(localStorage.getItem("PLAYLIST_SONG")) || [],
    playlistRandom:
      JSON.parse(localStorage.getItem("PLAYLIST_SONG_RANDOM")) || [],
    currentIndexSong: JSON.parse(localStorage.getItem("CURRENT_INDEX")) || 0,
    currentIndexSongRandom:
      JSON.parse(localStorage.getItem("CURRENT_INDEX_RANDOM")) || 0,
    loadingPlay: false,
  },
  reducers: {
    changeIconPlaying: (state, action) => {
      state.isPlay = action.payload;
    },
    setRepeatSong: (state, action) => {
      state.isRepeat = action.payload;
    },
    setRandomSong: (state, action) => {
      state.isRandom = action.payload;
    },
    setCurrentIndexSongRandom: (state, action) => {
      state.currentIndexSongRandom = action.payload;
      localStorage.setItem(
        "CURRENT_INDEX_RANDOM",
        JSON.stringify(action.payload)
      );
    },
    setCurrentIndexSong: (state, action) => {
      state.currentIndexSong = action.payload;
      localStorage.setItem("CURRENT_INDEX", JSON.stringify(action.payload));
    },
    setMuteVolume: (state, action) => {
      state.isMute = action.payload;
    },
    setSongId: (state, action) => {
      state.currentSongId = action.payload;
      localStorage.setItem("songId", JSON.stringify(action.payload));
    },
    setInfoSongPlayer: (state, action) => {
      state.infoSongPlayer = { ...action.payload };
      localStorage.setItem(
        "infoSongPlayer",
        JSON.stringify({ ...action.payload })
      );
    },
    setAudioSrc: (state, action) => {
      state.srcAudio = action.payload;
    },

    setPlaylistId: (state, action) => {
      state.playlistId = action.payload;
      localStorage.setItem("PLAYLIST_ID", JSON.stringify(action.payload));
    },
    setPlaylistSong: (state, action) => {
      state.playlistSong = [...action.payload];
      localStorage.setItem(
        "PLAYLIST_SONG",
        JSON.stringify([...action.payload])
      );
    },
    setPlaylistRandom: (state, action) => {
      state.playlistRandom = [...action.payload];
      localStorage.setItem(
        "PLAYLIST_SONG_RANDOM",
        JSON.stringify([...action.payload])
      );
    },

    setLoadingPlay: (state, action) => {
      state.loadingPlay = action.payload;
    },
  },
});
export const {
  changeIconPlaying,
  setRepeatSong,
  setRandomSong,
  setMuteVolume,
  setSongId,
  setInfoSongPlayer,
  setAudioSrc,
  setCurrentTime,
  setPlaylistId,
  setPlaylistSong,
  setPlaylistRandom,
  setCurrentIndexSong,
  setCurrentIndexSongRandom,
  setLoadingPlay,
} = audioSlice.actions;
export default audioSlice.reducer;
