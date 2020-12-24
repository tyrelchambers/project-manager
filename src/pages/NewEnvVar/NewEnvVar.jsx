import React from "react";
import { H2 } from "../../components/Headings/Headings";
import EnvVarForm from "../../forms/EnvVarForm";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";

const NewEnvVar = () => {
  return (
    <DisplayWrapper>
      <H2>New Environment Variable</H2>
      <EnvVarForm />
    </DisplayWrapper>
  );
};

export default NewEnvVar;
