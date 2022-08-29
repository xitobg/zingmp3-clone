import React from "react";
import styled from "styled-components";
const StyledLoadingSearch = styled.div``;
const LoadingSearch = () => {
  return (
    <StyledLoadingSearch className="flex rounded-md justify-center select-none p-[10px] items-center">
      <div className="w-8 h-8 border-4 border-r-4 border-white rounded-full border-r-transparent animate-spin"></div>
    </StyledLoadingSearch>
  );
};

export default LoadingSearch;
