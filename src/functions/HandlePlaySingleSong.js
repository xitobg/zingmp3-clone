import Swal from "sweetalert2";
import {
  changeIconPlaying,
  setInfoSongPlayer,
  setPlaylistId,
  setPlaylistRandom,
  setPlaylistSong,
  setRepeatSong,
  setSongId,
} from "~/redux-toolkit/audio/audioSlice";

function handlePlaySingleSong(song, dispatch) {
  if (song?.streamingStatus == 1) {
    dispatch(setRepeatSong(true));
    dispatch(setPlaylistId(""));
    dispatch(setPlaylistSong([song]));
    dispatch(setPlaylistRandom([song]));
    dispatch(setSongId(song.encodeId));
    dispatch(setInfoSongPlayer(song));
    dispatch(changeIconPlaying(true));
  } else {
    Swal.fire({
      icon: "error",
      text: "Bài hát dành cho tài khoản Vip!",
    });
  }
}
export default handlePlaySingleSong;
