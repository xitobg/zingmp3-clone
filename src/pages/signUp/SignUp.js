import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
const StyledSignUp = styled.div`
  background-image: ${(props) => props.theme.bgImage};
  & .sign-up-container {
    background-color: #fff;
    & .sign-up-title {
      color: ${(props) => props.theme.purplePrimary};
    }
  }
`;
const SignUp = () => {
  return (
    <StyledSignUp
      className="w-screen h-screen "
      style={{
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full">
        <div className="flex items-center justify-center w-full min-h-screen">
          <div className="px-10 gap-y-5 sign-up-container py-10  grid grid-cols-2 rounded-lg w-[70vw]  max-w-[900px]">
            <div className="flex flex-col sign-up">
              <h3 className="text-3xl font-medium sign-up-title">Đăng Kí</h3>
            </div>
            <div className="sign-up-social"></div>
          </div>
        </div>
      </div>
    </StyledSignUp>
  );
};

export default SignUp;
