import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Loading from "~/components/loading/Loading";
import Playlist from "~/components/playlist/Playlist";
import PlaylistItem from "~/components/playlist/PlaylistItem";
import WrapperLayout from "~/components/wrapperLayout";
import { setLoading } from "~/redux-toolkit/global/globalSlice";

const HubDetail = () => {
  const dispatch = useDispatch();
  const [hubDetailData, setHubDetailData] = useState([]);
  const { loading } = useSelector((state) => state.global);
  const location = useLocation();
  const { hubId } = location.state;
  console.log(hubId);
  useEffect(() => {
    async function fetchHubHome() {
      try {
        dispatch(setLoading(true));
        const res = await axios.get(
          `https://api-zingmp3next.vercel.app/api/hubdetails/${hubId}`
        );
        if (res.data && res.data.data) {
          setHubDetailData(res.data.data);
          console.log("hub detaildata:", res.data.data);
          dispatch(setLoading(false));
        }
      } catch (error) {
        console.log(error);
        dispatch(setLoading(false));
      }
    }
    fetchHubHome();
  }, [hubId]);
  return (
    <WrapperLayout>
      {loading && <Loading />}
      {!loading && (
        <div className="hub-detail-container">
          {hubDetailData?.cover && (
            <div className="rounded-md hub-banner">
              <img className="rounded-md" src={hubDetailData?.cover} alt="" />
            </div>
          )}
          <div className="grid grid-cols-5 mt-10 wrapper-playlist gap-x-7">
            {hubDetailData?.sections &&
              hubDetailData?.sections[0]?.items?.map((playlistItem, index) => {
                return (
                  <PlaylistItem
                    key={playlistItem.encodeId}
                    item={playlistItem}
                  />
                );
              })}
          </div>
        </div>
      )}
    </WrapperLayout>
  );
};

export default HubDetail;
