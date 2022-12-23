import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import WrapperLayout from "~/components/wrapperLayout";
import { setLoading } from "~/redux-toolkit/global/globalSlice";
import request from "~/services/request";
import styled from "styled-components";
import { useState } from "react";
import SongItem from "~/components/songItem";
import Loading from "~/components/loading/Loading";
import handlePlaySong from "~/functions/HandlePlay";
const NewMusic = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.global);
  const { isRandom, playlistId } = useSelector((state) => state.audio);
  const [dataNewRelease, setDataNewRelease] = useState([]);
  useEffect(() => {
    dispatch(setLoading(true));
    request
      .get(`/chart/new-release`)
      .then((res) => {
        if (res.data && res.data.data) {
          const { data } = res.data;
          setDataNewRelease(data);
          document.title = `#zingchart tuần, #zingchart Zing - Bài Hát`;
          dispatch(setLoading(false));
        }
      })
      .catch((err) => {
        dispatch(setLoading(false));
        console.log(err);
      });
  }, []);
  const { items } = dataNewRelease;
  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <WrapperLayout>
          <StyledNewRelease className="pt-5 mt-10">
            <div className="flex items-center mb-10 chart-title gap-x-3">
              <h3 className="mb-0 title ">Nhạc Mới</h3>
              {playlistId !== dataNewRelease?.sectionId ? (
                <button
                  onClick={() =>
                    handlePlaySong(
                      items[0],
                      items,
                      dataNewRelease?.sectionId,
                      isRandom,
                      dispatch
                    )
                  }
                  className="flex items-center justify-center w-10 h-10 rounded-full new-release-btn"
                >
                  <i className="text-xl text-white bi bi-play-fill"></i>
                </button>
              ) : (
                <button className="flex items-center justify-center w-10 h-10 rounded-full new-release-btn">
                  <i className="text-xl text-white bi bi-play-fill"></i>
                </button>
              )}
            </div>
            <div className="chart-song-item">
              {items?.length > 0 &&
                items.map((item, index) => {
                  return (
                    <SongItem
                      key={item.encodeId}
                      index={index}
                      item={item}
                      section="new-release"
                      onClick={() =>
                        handlePlaySong(
                          item,
                          items,
                          dataNewRelease?.sectionId,
                          isRandom,
                          dispatch
                        )
                      }
                    />
                  );
                })}
            </div>
          </StyledNewRelease>
        </WrapperLayout>
      )}
    </Fragment>
  );
};

export default NewMusic;
const StyledNewRelease = styled.div`
  & .new-release-btn {
    background-color: ${(props) => props.theme.purplePrimary};
  }
  & .title {
    font-size: 40px;
    font-weight: 800;
  }
`;
