import React from "react";
import styled from "styled-components";
import RadioItem from "./RadioItem";
const StyledRadio = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
`;
const RadioList = ({ data = {} }) => {
  const { items, title } = data;

  return (
    <StyledRadio>
      <h3>{title || ""}</h3>
      <div className="grid grid-cols-7 radio-container gap-x-7">
        {items?.slice(0, 7).map((item) => (
          <RadioItem key={item.id} item={item} />
        ))}
      </div>
    </StyledRadio>
  );
};

export default RadioList;
