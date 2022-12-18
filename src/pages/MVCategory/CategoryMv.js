import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import WrapperLayout from "~/components/wrapperLayout";
import MvArtist from "~/components/mv";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "~/redux-toolkit/global/globalSlice";
import Loading from "~/components/loading/Loading";
const CategoryMv = () => {
  const dispatch = useDispatch();
  const [dataListMV, setDataListMV] = useState([]);
  const { loading } = useSelector((state) => state.global);
  useEffect(() => {
    async function fetch() {
      try {
        dispatch(setLoading(true));
        const response = await axios.get(
          `https://api-zingmp3-alpha.vercel.app/api/listmv?id="IWZ9Z08I"&page=1&count=48`
        );
        console.log("data listMV:", response.data.data);
        if (response.data && response.data.data) {
          setDataListMV(response.data.data);
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
  return (
    <WrapperLayout>
      {loading && <Loading />}
      {!loading && (
        <StyledListMv className="caterogymv-container">
          <div className="flex items-center list-title-mv gap-x-4">
            <div className="text-2xl font-medium title ">MV</div>
            <div className="line w-[1px] h-6 mx-3"></div>
            <div className="flex items-center gap-x-10">
              <div className="py-4 text-sm uppercase cursor-pointer active tabmv-link">
                VIỆT NAM
              </div>
              <div className="py-4 text-sm uppercase cursor-pointer tabmv-link">
                US-UK
              </div>
              <div className="py-4 text-sm uppercase cursor-pointer tabmv-link">
                KPOP
              </div>
            </div>
          </div>
          <MvArtist data={dataListMV} />
        </StyledListMv>
      )}
    </WrapperLayout>
  );
};

export default CategoryMv;
const StyledListMv = styled.div`
  .title,
  .tabmv-link {
    color: ${(props) => props.theme.textPrimary};
    font-weight: 500;
    &.active {
      border-bottom: 2px solid ${(props) => props.theme.purplePrimary};
    }
  }
  .list-title-mv {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  .line {
    background-color: ${(props) => props.theme.textPrimary};
    opacity: 0.6;
  }
`;
