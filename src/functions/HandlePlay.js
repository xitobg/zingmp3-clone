import Swal from "sweetalert2";
import {
  changeIconPlaying,
  setAudioSrc,
  setCurrentIndexSong,
  setCurrentTime,
  setInfoSongPlayer,
  setPlaylistId,
  setPlaylistRandom,
  setPlaylistSong,
  setSongId,
} from "~/redux-toolkit/audio/audioSlice";
import { shuffle } from "./ShuffleArr";
function handlePlaySong(song, playlist, idPlaylist, isRandom, dispatch) {
  console.log(song);
  let playlistCanPlay = [];
  if (song.streamingStatus === 1) {
    dispatch(setPlaylistId(idPlaylist));
    dispatch(setCurrentTime(0));
    dispatch(setAudioSrc(""));
    for (let songItem of playlist) {
      if (songItem.streamingStatus === 1) {
        playlistCanPlay.push(songItem);
      }
    }
    if (isRandom) {
      dispatch(setPlaylistRandom(shuffle([...playlistCanPlay])));
      dispatch(setSongId(song.encodeId));
      dispatch(setInfoSongPlayer(song));
      dispatch(setPlaylistSong(playlistCanPlay));
      dispatch(
        setCurrentIndexSong(
          playlistCanPlay.findIndex((item) => item.encodeId === song.encodeId)
        )
      );
      dispatch(changeIconPlaying(true));
    } else {
      dispatch(setInfoSongPlayer(song));
      dispatch(setSongId(song.encodeId));
      dispatch(setPlaylistSong(playlistCanPlay));
      dispatch(
        setCurrentIndexSong(
          playlistCanPlay.findIndex((item) => item.encodeId === song.encodeId)
        )
      );
      dispatch(changeIconPlaying(true));
    }
  } else {
    Swal.fire({
      icon: "error",
      text: "Bài hát dành cho tài khoản Vip!",
    });
  }
}
export default handlePlaySong;
