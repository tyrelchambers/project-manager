import React from "react";
import { H1 } from "../../components/Headings/Headings";
import NewFeedPost from "../../components/NewFeedPost/NewFeedPost";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";
import Feed from "../../layouts/Feed/Feed";

const Home = () => {
  return (
    <DisplayWrapper>
      <H1 className="mb-8">Feed</H1>
      <NewFeedPost />
      <Feed />
    </DisplayWrapper>
  );
};

export default Home;
