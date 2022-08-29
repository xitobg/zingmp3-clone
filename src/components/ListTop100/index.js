import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import Playlist from "../playlist/Playlist";

const Top = () => {
  const [dataRes, setDataRes] = useState([]);
  const handleGetData = async () => {
    const response = await axios.get(`http://localhost:3000/api/top100`);
    if (!response.data.data) return null;
    const results = response.data.data[0].items;
    setDataRes(results);
  };
  useEffect(() => {
    handleGetData();
  }, []);
  return (
    <Fragment>
      <Playlist data={dataRes}></Playlist>
    </Fragment>
  );
};

export default Top;
