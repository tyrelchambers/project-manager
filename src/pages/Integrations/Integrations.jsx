import React from "react";
import { H1 } from "../../components/Headings/Headings";
import { useUser } from "../../hooks/useUser";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";
import Github from "./Github/Github";

const Integrations = () => {
  const userQuery = useUser();

  if (!userQuery.data) return null;
  return (
    <DisplayWrapper>
      <H1>Integrations</H1>

      <div className="w-1/3 mt-10">
        <Github user={userQuery.data.user} />
      </div>
    </DisplayWrapper>
  );
};

export default Integrations;
