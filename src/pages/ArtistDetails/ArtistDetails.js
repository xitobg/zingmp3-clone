import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import ArtistBanner from "~/components/artistBanner";
import ArtistBiography from "~/components/artistBiography";
import Loading from "~/components/loading/Loading";
import MvArtist from "~/components/mv/ListMv";
import Playlist from "~/components/playlist/Playlist";
import WrapperLayout from "~/components/wrapperLayout";
import handlePlaySongPlaylist from "~/functions/HandlePlaySongPlaylist";
import { setLoading } from "~/redux-toolkit/global/globalSlice";
import request from "~/services/request";
import SongSection from "./song";
const ArtistDetails = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { loading } = useSelector((state) => state.global);
  const { isRandom } = useSelector((state) => state.audio);
  const [singerData, setSingerData] = useState([]);
  const { artistName } = location.state;

  useEffect(() => {
    dispatch(setLoading(true));
    request
      .get(`/artist/${artistName}`)
      .then((res) => {
        if (res.data && res.data.data) {
          setSingerData(res.data.data);
          const { sections } = res.data.data;
          handlePlaySongPlaylist(
            sections[0]?.items[0],
            sections[0]?.items,
            res.data.data.playlistId,
            isRandom,
            dispatch
          );
          document.title = `${res.data.data.name} - VP MP3 Official Account`;
          dispatch(setLoading(false));
        }
      })
      .catch((err) => {
        dispatch(setLoading(false));
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [artistName]);
  const { sections } = singerData;

  return (
    <Fragment>
      <WrapperLayout>
        {loading && <Loading />}
        {!loading && (
          <StyledArtistDetails className="artist-detail-layout">
            <ArtistBiography
              onClick={handlePlaySongPlaylist}
              data={{ ...singerData }}
            />
            {sections?.map((item, index) => {
              const { sectionType, title } = item;
              if (sectionType === "song") {
                return (
                  <SongSection
                    onClick={handlePlaySongPlaylist}
                    id={singerData.playlistId}
                    key={`${title}${index}`}
                    data={{ ...item }}
                  />
                );
              } else if (sectionType === "playlist") {
                return (
                  <Playlist
                    page="home"
                    key={`${title}${index}`}
                    data={{ ...item }}
                  />
                );
              } else if (sectionType === "artist") {
                return (
                  <ArtistBanner key={`${title}${index}`} data={{ ...item }} />
                );
              } else if (sectionType === "video") {
                return <MvArtist key={`${title}${index}`} data={{ ...item }} />;
              }
            })}
          </StyledArtistDetails>
        )}
      </WrapperLayout>
    </Fragment>
  );
};

export default ArtistDetails;
const StyledArtistDetails = styled.div`
  padding-top: 110px;
  .artist__container-info {
    display: grid;
    grid-template-columns: 2fr 1fr;
    padding-left: 14px;
    padding-right: 14px;
    column-gap: 28px;
  }
  .title {
    color: ${(props) => props.theme.textPrimary};
  }
  .biography {
    color: ${(props) => props.theme.textPrimary};
  }
  .play-btn {
    font-size: 14px;
    padding: 9px 24px;
    &:hover {
      filter: brightness(0.9);
    }
  }
`;
