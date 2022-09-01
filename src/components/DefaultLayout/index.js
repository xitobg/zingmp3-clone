import { Fragment } from "react";
import styled from "styled-components";
import Header from "./Header";
import PlayerControl from "./PlayerControl";
import PlayingBar from "./rightSidebar";
import Sidebar from "./Sidebar";

const StyledWrapper = styled.div`
  background-image: url(${(props) => props.theme.bgImage});
  background-color: ${(props) => props.theme.layoutBg};
  height: calc(100vh - 90px);
  background-repeat: no-repeat;
  background-size: 1920px auto;
  width: 100%;
  display: flex;
`;
const DefaultLayout = ({ children }) => {
  return (
    <>
      <StyledWrapper>
        <Header></Header>
        <Sidebar></Sidebar>
        <>{children}</>
      </StyledWrapper>
      <PlayingBar />
      <PlayerControl />
    </>
  );
};
export default DefaultLayout;
