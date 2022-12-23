import React, { memo, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Tippy from "@tippyjs/react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { setIdMv, setShowVideoMV } from "~/redux-toolkit/video/videoMvSlice";
import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";

const VideoMV = () => {
  const dispatch = useDispatch();
  const { showVideoMV, idMv } = useSelector((state) => state.videoMv);
  const [dataVideoMV, setDataVideoMV] = useState([]);
  const handleCloseVideo = () => {
    dispatch(setShowVideoMV(false));
  };
  useEffect(() => {
    async function fetch() {
      try {
        const response = await axios.get(
          `https://api-zingmp3-alpha.vercel.app/api/video?id=${idMv}`
        );
        // console.log("data mv:", response.data.data);
        if (response.data && response.data.data) {
          setDataVideoMV(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idMv]);
  const handleChooseVideo = (id, streamingStatus) => {
    if (streamingStatus == 1) {
      dispatch(setIdMv(id));
    } else {
      Swal.fire({
        icon: "error",
        text: "MV dành cho tài khoản Vip!",
      });
    }
  };
  const { streaming, recommends, artist, title } = dataVideoMV;
  return (
    <>
      <StyledVideo className={`${showVideoMV ? "show" : ""}`}>
        <div className="relative w-full h-full px-8 overflow-hidden video-mv-modal">
          <div className="min-h-screen video-container">
            <div className="flex justify-between p-4 video-header">
              <div className="flex items-center gap-x-3">
                <Link
                  onClick={handleCloseVideo}
                  to={artist?.link}
                  state={{ artistName: artist?.alias }}
                  className="w-10 h-10 rounded-full video-avatar"
                >
                  <img
                    className="rounded-full"
                    src={artist?.thumbnail}
                    alt=""
                  />
                </Link>
                <div className="flex flex-col justify-start whitespace-nowrap">
                  <h3 className="mb-0 text-lg font-semibold text-white">
                    {title}
                  </h3>
                  <Link
                    onClick={handleCloseVideo}
                    to={artist?.link}
                    state={{ artistName: artist?.alias }}
                    className="text-sm font-medium text-left artist-name"
                  >
                    {artist?.name}
                  </Link>
                </div>
              </div>
              <Tippy content="Đóng">
                <div
                  onClick={handleCloseVideo}
                  className="close-video cursor-pointer flex justify-center items-center  w-10 h-10 rounded-full bg-[hsla(0,0%,100%,.1)] shadow-[0_2px_4px_0_rgb(133 105 208 / 11%)]"
                >
                  <i className="text-lg leading-[0px]  text-white bi bi-x-lg"></i>
                </div>
              </Tippy>
            </div>
            <div className="relative flex px-3 scrollbar-video gap-x-7 video-body">
              <div className="w-[70%] video-mv-player relative">
                <div className="video-player rounded-md h-[500px] overflow-hidden w-full relative">
                  <ReactPlayer
                    width={"100%"}
                    height={"100%"}
                    loop={true}
                    controls={true}
                    url={
                      showVideoMV
                        ? streaming?.mp4["720p"] || streaming?.hls["720p"]
                        : ""
                    }
                  />
                </div>
              </div>
              <div className="w-[30%]  list-mv-player recommend-container rounded-md bg-[hsla(0,0%,100%,.10196078431372549)] flex  flex-col">
                <div className="flex items-center justify-between p-5 recommend-header">
                  <h3 className="title">Danh sách phát</h3>
                </div>
                <div className="flex flex-col h-[400px] recommend-list has-scroll-bar">
                  {recommends &&
                    recommends.map((item, index) => {
                      const {
                        encodeId,
                        thumbnail,
                        title,
                        link,
                        artistsNames,
                        streamingStatus,
                      } = item;
                      return (
                        <div
                          key={encodeId}
                          className="recommend-card relative gap-3 flex py-[6px] hover:bg-[hsla(0,0%,100%,.05)] px-5"
                        >
                          <div
                            onClick={() =>
                              handleChooseVideo(encodeId, streamingStatus)
                            }
                            className="z-50 card-mv-image relative cursor-pointer overflow-hidden w-[120px] h-[64px] rounded-md"
                          >
                            {streamingStatus != 1 && (
                              <span className="absolute font-semibold select-none cursor-pointer z-50 px-[8px] py-[8px] leading-[0px] text-xs text-[#463f3a] bg-yellow-500 rounded-md left-1 top-1">
                                Vip
                              </span>
                            )}
                            <div className="relative card-mv-img">
                              <img
                                className="w-full rounded-md"
                                src={thumbnail}
                                alt=""
                              />
                            </div>
                            <i className="absolute z-50 invisible text-3xl text-white card-mv-action bi top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 bi-play-fill"></i>
                            <div className="absolute invisible inset-0 w-full h-full rounded-md card-overlay bg-[rgba(0,0,0,0.5)]"></div>
                          </div>
                          <div className="flex flex-col justify-center flex-1 flex-grow select-none gap-y-1 ">
                            <span className="text-white card-title whitespace-nowrap">
                              {title}
                            </span>
                            <p className="text-xs font-normal cursor-pointer card-subtitle">
                              {artistsNames}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </StyledVideo>
    </>
  );
};

export default memo(VideoMV);
const StyledVideo = styled.div`
  position: fixed;
  top: 100%;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  transition: 0.6s all;
  &.show {
    top: 0;
  }
  background-color: #1e1e1e;
  & .artist-name {
    cursor: pointer;
    color: ${(props) => props.theme.textSecondary};
    &:hover {
      text-decoration: underline;
      ${(props) => props.theme.purplePrimary};
    }
  }
  & video {
    border-radius: 10px;
  }
  & .title {
    color: #fff;
    font-size: 18px;
    font-weight: 700;
  }
  & .card-title {
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    white-space: normal;
    line-height: 1.5;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    color: #fff;
    &:hover {
      color: ${(props) => props.theme.linkTextHover};
    }
  }
  & .card-mv-image {
    .card-mv-img img {
      transition: 0.7s all;
    }
    &:hover .card-mv-action {
      visibility: visible;
    }
    &:hover .card-mv-img img {
      transform: scale(1.1);
    }
    &:hover .card-overlay {
      visibility: visible;
    }
  }

  .card-subtitle {
    color: ${(props) => props.theme.textSecondary};
    &:hover {
      color: #ea7aa0;
      text-decoration: underline;
    }
  }
`;
