import React, { useEffect } from "react";
import ArtistBanner from "~/components/artistBanner";
import Banner from "~/components/banner";
import Event from "~/components/chart/Chart2";
import NewRelease from "~/components/newRelease";
import Playlist from "~/components/playlist/Playlist";
import RadioList from "~/components/radio/RadioList";
import Partner from "~/components/partner";
import WrapperLayout from "~/components/wrapperLayout";
import request from "~/services/request";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "~/redux-toolkit/global/globalSlice";
import Loading from "~/components/loading/Loading";
import { useReducer } from "react";
import NavbarMobile from "~/components/NavbarMobile/NavbarMobile";
import RTChartHome from "~/components/RTChart/RTChartHome";
const initialState = {
  banner: {},
  playList: [],
  liveStream: {},
  newRelease: {},
  artistSpotlight: {},
  event: {},
  RTChart: {},
};
const GET_HOME = "GET_HOME";
const reducer = (state, action) => {
  switch (action.type) {
    case GET_HOME:
      return {
        ...state,
        banner:
          action.homeData?.find((item) => item.sectionType == "banner")
            ?.items || {},
        playList:
          action.homeData?.filter((item) => item.sectionType == "playlist") ||
          [],
        liveStream:
          action.homeData?.find((item) => item.sectionType == "livestream") ||
          {},
        newRelease:
          action.homeData?.find(
            (item) => item.sectionType == "newReleaseChart"
          ) || {},
        artistSpotlight:
          action.homeData?.find(
            (item) => item.sectionType == "artistSpotlight"
          ) || {},
        event:
          action.homeData?.find((item) => item.sectionType == "event") || {},
        RTChart:
          action.homeData?.find((item) => item.sectionType == "RTChart") || {},
      };
    default:
      return state;
  }
};
const setHomeData = (homeData) => {
  return {
    type: GET_HOME,
    homeData,
  };
};
const Home = () => {
  const [state, dispatchAction] = useReducer(reducer, initialState);
  const { loading } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoading(true));
    request
      .get(`/home`)
      .then((res) => {
        if (res.data && res.data.data) {
          const { items } = res.data.data;
          // console.log(items);
          dispatchAction(setHomeData(items));
          dispatch(setLoading(false));
        }
      })
      .catch((err) => {
        dispatch(setLoading(false));
        console.log(err);
      });
    document.title =
      "VP Mp3 | Nghe tải nhạc chất lượng cao trên desktop, mobile";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const {
    banner,
    playList,
    newRelease,
    artistSpotlight,
    liveStream,
    event,
    RTChart,
  } = state;

  return (
    <WrapperLayout>
      {loading && <Loading />}
      {!loading && (
        <div className="home-layout">
          <Banner data={banner} />
          <NavbarMobile />
          {playList &&
            playList.length > 0 &&
            playList.map((item, index) => (
              <Playlist
                page="home"
                data={item}
                key={`${index}${item.sectionId}`}
              />
            ))}
          <RadioList data={liveStream} />
          <ArtistBanner data={artistSpotlight} />
          {/* <RTChartHome data={RTChart} /> */}
          <NewRelease data={newRelease} />
          <Event data={event} />
          <Partner />
        </div>
      )}
    </WrapperLayout>
  );
};

export default Home;
