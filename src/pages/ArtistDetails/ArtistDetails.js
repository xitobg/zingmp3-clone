import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import ArtistBanner from "~/components/artistBanner";
import ArtistBiography from "~/components/artistBiography";
import Loading from "~/components/loading/Loading";
import MvArtist from "~/components/mv";
import Playlist from "~/components/playlist/Playlist";
import SongItem from "~/components/songItem";
import WrapperLayout from "~/components/wrapperLayout";
import { setLoading } from "~/redux-toolkit/global/globalSlice";
import request from "~/services/request";
import SongSection from "./song";

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
const ArtistDetails = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { loading } = useSelector((state) => state.global);
  const [singerData, setSingerData] = useState([]);
  const { artistName } = location.state;
  useEffect(() => {
    dispatch(setLoading(true));
    request
      .get(`/artist/${artistName}`)
      .then((res) => {
        console.log("ca si:", res.data.data);
        if (res.data && res.data.data) {
          setSingerData(res.data.data);
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
          <StyledArtistDetails>
            <ArtistBiography data={{ ...singerData }}></ArtistBiography>
            {sections?.map((item, index) => {
              const { sectionType, title } = item;
              if (sectionType === "song") {
                return (
                  <SongSection
                    key={`${title}${index}`}
                    data={{ ...item }}
                  ></SongSection>
                );
              } else if (sectionType === "playlist") {
                return <Playlist key={`${title}${index}`} data={{ ...item }} />;
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
