import Swal from "sweetalert2";
import {
  changeIconPlaying,
  setCurrentIndexSong,
  setCurrentIndexSongRandom,
  setCurrentTime,
  setInfoSongPlayer,
  setPlaylistId,
  setPlaylistRandom,
  setPlaylistSong,
  setSongId,
} from "~/redux-toolkit/audio/audioSlice";
import { shuffle } from "./ShuffleArr";
function handlePlaySongPlaylist(
  song = {},
  playlist = [],
  idPlaylist = "",
  isRandom,
  dispatch
) {
  let playlistCanPlay = [];
  if (song.streamingStatus === 1) {
    dispatch(setPlaylistId(idPlaylist));
    for (let songItem of playlist) {
      if (songItem.streamingStatus === 1) {
        playlistCanPlay.push(songItem);
      }
    }
    dispatch(setPlaylistRandom(shuffle([...playlistCanPlay])));
    dispatch(setPlaylistSong(playlistCanPlay));
    if (!isRandom) {
      dispatch(setInfoSongPlayer(song));
      dispatch(setSongId(song.encodeId));
      dispatch(
        setCurrentIndexSong(
          playlistCanPlay.findIndex((item) => item.encodeId === song.encodeId)
        )
      );
      dispatch(changeIconPlaying(true));
    } else if (isRandom) {
      dispatch(setInfoSongPlayer(song));
      dispatch(setSongId(song.encodeId));
      dispatch(
        setCurrentIndexSongRandom(
          playlistCanPlay.findIndex((item) => item.encodeId === song.encodeId)
        )
      );
      dispatch(
        setCurrentIndexSong(
          shuffle(
            [...playlistCanPlay].findIndex(
              (item) => item.encodeId === song.encodeId
            )
          )
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
export default handlePlaySongPlaylist;
