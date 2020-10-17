import React from "react";
import FormLabel from "../components/FormLabel/FormLabel";
import SelectField from "../components/SelectField/SelectField";

const ProjectForm = () => {
  return (
    <form className="form mt-8">
      <div className="field-group">
        <FormLabel name="projectTitle" text="Project Title" />
        <input
          type="text"
          className="form-input"
          name="projectTitle"
          placeholder="An Awesome Project"
        />
      </div>

      <div className="field-group">
        <FormLabel name="folderName" text="Folder Name" />
        <input
          type="text"
          className="form-input"
          name="folderName"
          placeholder="an-awesome-project"
        />
      </div>

      <div className="mt-8">
        <SelectField />
      </div>
    </form>
  );
};

export default ProjectForm;
