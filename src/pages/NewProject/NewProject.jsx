import React from "react";
import { H2 } from "../../components/Headings/Headings";
import ProjectForm from "../../forms/ProjectForm";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";

const NewProject = () => {
  return (
    <DisplayWrapper>
      <H2>New Project</H2>
      <ProjectForm />
    </DisplayWrapper>
  );
};

export default NewProject;
