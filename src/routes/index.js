import { lazy } from "react";
import VideoMV from "~/pages/mvPage/VideoMV";
import NewMusic from "~/pages/newRelease/NewMusic";
import Top100 from "~/pages/Top100/Top100";
//Page
const Profile = lazy(() => import("~/pages/ProfilePage/Profile"));
const Radio = lazy(() => import("~/pages/RadioPage/Radio"));
const Home = lazy(() => import("~/pages/Home/Home"));
const ArtistDetails = lazy(() => import("~/pages/ArtistDetails/ArtistDetails"));
const ZingChart = lazy(() => import("~/pages/ZingChart/ZingChart"));
const Follow = lazy(() => import("~/pages/Follow/Follow"));
const SongDetail = lazy(() => import("~/pages/songDetail/SongDetail"));
const PlaylistDetail = lazy(() =>
  import("~/pages/playlistDetail/PlaylistDetail")
);
//  public Router
export const publicRoutes = [
  {
    path: "/profile",
    component: Profile,
  },
  {
    path: "/",
    component: Home,
  },
  {
    path: "/zingchart",
    component: ZingChart,
  },
  {
    path: "/radio",
    component: Radio,
  },
  {
    path: "/follow",
    component: Follow,
  },
  {
    path: "/new-music",
    component: NewMusic,
  },
  {
    path: "/top-100",
    component: Top100,
  },
  {
    path: "/nghe-si/:name",
    component: ArtistDetails,
  },
  {
    path: "/:name",
    component: ArtistDetails,
  },
  {
    path: "/bai-hat/:name/:id",
    component: SongDetail,
  },
  {
    path: "/album/:name/:id",
    component: PlaylistDetail,
  },
  {
    path: "/playlist/:name/:id",
    component: PlaylistDetail,
  },
  {
    path: "/video-clip/:name/:id",
    component: VideoMV,
    layout: null,
  },
];
// Private Router
export const privateRoutes = [];
