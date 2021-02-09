import React from "react";
import { H1 } from "../../components/Headings/Headings";
import NewFeedPost from "../../components/NewFeedPost/NewFeedPost";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";
import Feed from "../../layouts/Feed/Feed";
import UserSearch from "../../components/UserSearch/UserSearch";
import Callout from "../../callouts/Callout";
const Home = () => {
  return (
    <DisplayWrapper>
      <div className="flex">
        <div className="flex flex-col flex-1">
          <H1 className="mb-8">Feed</H1>
          <NewFeedPost />
          <Feed />
        </div>
        <div
          className="w-2/6 h-full pl-4 "
          style={{ position: "sticky", top: "1em" }}
        >
          <UserSearch />
        </div>
      </div>
    </DisplayWrapper>
  );
};

export default Home;
