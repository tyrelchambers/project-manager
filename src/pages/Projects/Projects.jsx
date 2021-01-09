import React from "react";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";
import { H2 } from "../../components/Headings/Headings";
import "./Projects.css";
import ProjectForm from "../../forms/ProjectForm";

const Projects = () => {
  return (
    <DisplayWrapper>
      <H2>Project Command Line</H2>
      <ProjectForm />
    </DisplayWrapper>
  );
};

export default Projects;
