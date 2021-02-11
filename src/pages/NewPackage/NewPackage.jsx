import React from "react";
import { H1 } from "../../components/Headings/Headings";
import NewPackageForm from "../../forms/NewPackageForm";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";
const NewPackage = () => {
  return (
    <DisplayWrapper>
      <H1>New Package</H1>

      <div className="mt-10">
        <NewPackageForm />
      </div>
    </DisplayWrapper>
  );
};

export default NewPackage;
