import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "~/components/loading/Loading";
import Playlist from "~/components/playlist/Playlist";
import WrapperLayout from "~/components/wrapperLayout";
import { setLoading } from "~/redux-toolkit/global/globalSlice";

const HubPage = () => {
  const [dataHubHome, setDataHubHome] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.global);
  useEffect(() => {
    async function fetchHubHome() {
      try {
        dispatch(setLoading(true));
        const res = await axios.get(
          `https://api-zingmp3next.vercel.app/api/hubhome`
        );
        if (res.data && res.data.data) {
          setDataHubHome(res.data.data);
          dispatch(setLoading(false));
        }
      } catch (error) {
        console.log(error);
        dispatch(setLoading(false));
      }
    }
    fetchHubHome();
  }, []);
  return (
    <WrapperLayout>
      {loading && <Loading />}
      {!loading && (
        <div className="hub-container">
          {dataHubHome?.banners &&
            dataHubHome?.banners.map((banner, index) => {
              let encodeId = banner?.link?.slice(-13, -5);
              return (
                <Link
                  to={banner?.link}
                  state={{ hubId: encodeId }}
                  key={index}
                  className="rounded-md hub-banner"
                >
                  <img
                    className="rounded-md"
                    src={banner.cover ? banner.cover : ""}
                    alt=""
                  />
                </Link>
              );
            })}
          <div className="mt-10">
            <h3 className="title">Tâm Trạng Và Hoạt Động</h3>
            <div className="grid grid-cols-4 hub-home-grid gap-x-7 gap-y-4">
              {dataHubHome?.topTopic &&
                dataHubHome?.topTopic?.length > 0 &&
                dataHubHome?.topTopic.map((topic, index) => {
                  return (
                    <Link
                      to={topic?.link}
                      state={{ hubId: topic?.encodeId }}
                      key={topic?.link}
                      className="relative overflow-hidden rounded-md toptopic-item"
                    >
                      <img
                        className="transition-all duration-500 rounded-md cursor-pointer hover:scale-110"
                        src={topic.thumbnailHasText || topic.thumbnail}
                        alt=""
                      />
                    </Link>
                  );
                })}
            </div>
          </div>
          <div className="grid grid-cols-4 mt-10 hub-home-grid gap-y-4 hub-nation-list gap-x-7">
            {dataHubHome?.nations &&
              dataHubHome?.nations?.length > 0 &&
              dataHubHome?.nations.map((nation, index) => {
                return (
                  <Link
                    to={nation?.link}
                    state={{ hubId: nation?.encodeId }}
                    key={nation.encodeId}
                    className="overflow-hidden rounded-md hub-nation-item"
                  >
                    <img
                      className="transition-all duration-500 rounded-md cursor-pointer hover:scale-110"
                      src={
                        nation.thumbnailHasText
                          ? nation.thumbnailHasText
                          : nation.thumbnail
                      }
                      alt=""
                    />
                  </Link>
                );
              })}
          </div>
          {dataHubHome?.genre &&
            dataHubHome?.genre?.length > 0 &&
            dataHubHome?.genre.map((playlist, index) => {
              return (
                <Playlist page="hub" key={playlist.encodeId} data={playlist} />
              );
            })}
        </div>
      )}
    </WrapperLayout>
  );
};

export default HubPage;
