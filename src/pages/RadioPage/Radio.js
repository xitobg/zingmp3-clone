import React, { useEffect, useState } from "react";
import WrapperLayout from "~/components/wrapperLayout";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setLoading } from "~/redux-toolkit/global/globalSlice";
import axios from "axios";
import RadioItem from "../../components/radio/RadioItem";
import RadioList from "~/components/radio/RadioList";
const Radio = () => {
  const [dataRadio, setDataRadio] = useState([]);
  const [item, setItem] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetch() {
      try {
        dispatch(setLoading(true));
        const response = await axios.get(
          `https://api-zingmp3next.vercel.app/api/radio`
        );
        console.log("data radio:", response.data.data);
        if (response.data && response.data.data) {
          setDataRadio(response.data.data);
          dispatch(setLoading(false));
        }
      } catch (error) {
        console.error(error);
        dispatch(setLoading(false));
      }
    }
    fetch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { items } = dataRadio;
  const radioLiveStream = items?.filter(
    (item) => item.sectionType == "livestream"
  );
  console.log(radioLiveStream);
  return (
    <WrapperLayout>
      <StyledRadio className="radio-layout">
        <RadioList data={radioLiveStream && radioLiveStream[0]} />
      </StyledRadio>
    </WrapperLayout>
  );
};

export default Radio;
const StyledRadio = styled.div`
  color: ${(props) => props.theme.textPrimary};
  font-size: 24px;
`;
