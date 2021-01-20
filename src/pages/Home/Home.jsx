import React from "react";
import NewFeedPost from "../../components/NewFeedPost/NewFeedPost";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";
import Feed from "../../layouts/Feed/Feed";

const Home = () => {
  return (
    <DisplayWrapper>
      <NewFeedPost />
      <Feed />
    </DisplayWrapper>
  );
};

export default Home;
