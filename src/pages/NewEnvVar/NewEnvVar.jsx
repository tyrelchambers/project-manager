import React from "react";
import { H1 } from "../../components/Headings/Headings";
import EnvVarForm from "../../forms/EnvVarForm";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";

const NewEnvVar = () => {
  return (
    <DisplayWrapper>
      <H1>New Environment Variable</H1>
      <EnvVarForm />
    </DisplayWrapper>
  );
};

export default NewEnvVar;
