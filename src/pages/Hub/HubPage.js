import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
          console.log(res.data.data);
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
              return (
                <div key={index} className="rounded-md hub-banner">
                  <img
                    className="rounded-md"
                    src={banner.cover ? banner.cover : ""}
                    alt=""
                  />
                </div>
              );
            })}
          <div className="grid grid-cols-4 mt-10 hub-nation-list gap-x-7">
            {dataHubHome?.nations &&
              dataHubHome?.nations?.length > 0 &&
              dataHubHome?.nations.map((nation, index) => {
                return (
                  <div
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
                  </div>
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
