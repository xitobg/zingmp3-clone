import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import WrapperLayout from "~/components/wrapperLayout";
import MvArtist from "~/components/mv/ListMv";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "~/redux-toolkit/global/globalSlice";
import Loading from "~/components/loading/Loading";
const CategoryMv = () => {
  const dispatch = useDispatch();
  const [dataListMV, setDataListMV] = useState([]);
  const [categoryMvId, setCaterogyMvId] = useState("IWZ9Z08I");
  const [activeId, setActiveId] = useState(0);
  const { loading } = useSelector((state) => state.global);
  useEffect(() => {
    async function fetch() {
      try {
        dispatch(setLoading(true));
        const response = await axios.get(
          `https://api-zingmp3-alpha.vercel.app/api/listmv?id=${categoryMvId}&page=1&count=48`
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
  }, [categoryMvId]);
  const handleChangeTabListMv = (index) => {
    setActiveId(index);
    if (index == 0) {
      setCaterogyMvId("IWZ9Z08I");
    } else if (index == 1) {
      setCaterogyMvId("IWZ9Z08O");
    } else if (index == 2) {
      setCaterogyMvId("IWZ9Z08W");
    }
  };
  return (
    <WrapperLayout>
      <StyledListMv className="caterogymv-container">
        <div className="flex items-center list-title-mv gap-x-4">
          <div className="text-2xl font-medium title ">MV</div>
          <div className="line w-[1px] h-6 mx-3"></div>
          <div className="flex items-center tab-mv-link gap-x-10">
            <div
              onClick={() => handleChangeTabListMv(0)}
              className={`py-4 text-sm uppercase cursor-pointer  tabmv-link ${
                activeId == 0 ? "active" : ""
              }`}
            >
              VIỆT NAM
            </div>
            <div
              onClick={() => handleChangeTabListMv(1)}
              className={`py-4 text-sm uppercase cursor-pointer  tabmv-link ${
                activeId == 1 ? "active" : ""
              }`}
            >
              US-UK
            </div>
            <div
              onClick={() => handleChangeTabListMv(2)}
              className={`py-4 text-sm uppercase cursor-pointer  tabmv-link ${
                activeId == 2 ? "active" : ""
              }`}
            >
              KPOP
            </div>
          </div>
        </div>

        {loading ? (
          <div className="mt-10">
            <Loading />
          </div>
        ) : (
          <MvArtist data={dataListMV} />
        )}
      </StyledListMv>
    </WrapperLayout>
  );
};

export default CategoryMv;
const StyledListMv = styled.div`
  .title,
  .tabmv-link {
    color: ${(props) => props.theme.textPrimary};
    font-weight: 500;
    opacity: 0.7;
    border-bottom: 2px solid transparent;

    &.active {
      border-bottom: 2px solid ${(props) => props.theme.purplePrimary};
      opacity: 1;
    }
  }
  .list-title-mv {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  .line {
    background-color: ${(props) => props.theme.textPrimary};
    opacity: 0.6;
  }
  @media screen and (max-width: 586px) {
    .tab-mv-link {
      width: 100%;
      justify-content: center;
    }
    .line,
    .title {
      display: none;
    }
  }
`;
