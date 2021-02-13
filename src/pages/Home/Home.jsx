import React from "react";
import { H1 } from "../../components/Headings/Headings";
import NewFeedPost from "../../components/NewFeedPost/NewFeedPost";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";
import Feed from "../../layouts/Feed/Feed";
import UserSearch from "../../components/UserSearch/UserSearch";
import Callout from "../../callouts/Callout";
import "./Home.css";
import MobileSearch from "../../components/MobileSearch/MobileSearch";
import { docWidth } from "../../constants/constants";

const Home = () => {
  return (
    <DisplayWrapper>
      <div className="flex">
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between mb-8">
            <H1>Feed</H1>

            {docWidth && <MobileSearch />}
          </div>
          <NewFeedPost />
          <Feed />
        </div>
        {!docWidth && (
          <div
            className="w-3/6 h-full pl-4 offset-column"
            style={{ position: "sticky", top: "1em" }}
          >
            <UserSearch />
          </div>
        )}
      </div>
    </DisplayWrapper>
  );
};

export default Home;
