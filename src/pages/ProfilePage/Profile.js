/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect } from "react";
import Top from "~/components/ListTop100";
import WrapperLayout from "~/components/wrapperLayout";

const Profile = () => {
  const handleFetchDataProfile = async () => {
    const response = await axios.get(``);
    if (!response) return null;
  };
  useEffect(() => {
    handleFetchDataProfile();
  });
  return (
    <WrapperLayout>
      <Top></Top>
    </WrapperLayout>
  );
};

export default Profile;
