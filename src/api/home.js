import axios from "axios";

const getHomePlayList = async () => {
  try {
    const data = await axios.get("/home");
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

export { getHomePlayList };
