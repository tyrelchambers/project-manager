import { inject, observer } from "mobx-react";
import React from "react";
import { H1, H2 } from "../../components/Headings/Headings";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";
import Github from "./Github/Github";

const Integrations = ({ UserStore }) => {
  return (
    <DisplayWrapper>
      <H1>Integrations</H1>

      <div className="w-1/3 mt-10">
        <Github user={UserStore.user} />
      </div>
    </DisplayWrapper>
  );
};

export default inject("UserStore")(observer(Integrations));
