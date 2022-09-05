import axios from "axios";
import React, { useEffect, useState } from "react";

const VideoMV = () => {
  const [dataMv, setDataMv] = useState([]);
  async function fetch() {
    try {
      const response = await axios.get(
        "https://apizingmp3.herokuapp.com/api/video?id=Z60WDA9D"
      );
      console.log("data mv:", response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetch();
  }, []);
  return <div>1255</div>;
};

export default VideoMV;
