import { inject, observer } from "mobx-react";
import React from "react";
import Search from "../Search/Search";

const UserSearch = ({ SearchStore }) => {
  return <Search />;
};

export default inject("SearchStore")(observer(UserSearch));
