import React from "react";
import { H2 } from "../../components/Headings/Headings";
import NewPackageForm from "../../forms/NewPackageForm";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";
const NewPackage = () => {
  return (
    <DisplayWrapper>
      <H2>New Package</H2>

      <div className="mt-10">
        <NewPackageForm />
      </div>
    </DisplayWrapper>
  );
};

export default NewPackage;
