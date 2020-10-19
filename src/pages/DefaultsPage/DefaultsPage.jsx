import React, { useState } from "react";
import { H2, H2Subtitle, H3 } from "../../components/Headings/Headings";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";
import "./DefaultsPage.css";
const DefaultsPage = () => {
  const params = new URLSearchParams(window.location.search);

  const [defaultPackages, setDefaultPackage] = useState([
    {
      name: "Package 1",
      bundler: "npm",
    },
    {
      name: "Package 2",
      bundler: "npm",
    },
    {
      name: "Package 3",
      bundler: "yarn",
    },
  ]);

  const NpmPkgs = () => (
    <section className="mt-10">
      <H3>Saved NPM Defaults</H3>

      <div className="flex mt-4">
        {defaultPackages
          .filter((x) => x.bundler === "npm")
          .map((pkg, id) => (
            <div
              key={id}
              className="flex items-center mr-2 p-2 bg-gray-800 rounded-sm"
            >
              <i className="fab fa-node-js text-green-500 mr-2"></i>
              <p className="text-gray-300">{pkg.name}</p>
            </div>
          ))}
      </div>
    </section>
  );

  const YarnPkgs = () => (
    <section className="mt-10">
      <H3>Saved Yarn Defaults</H3>

      <div className="flex mt-4">
        {defaultPackages
          .filter((x) => x.bundler === "yarn")
          .map((pkg, id) => (
            <div
              key={id}
              className="flex items-center mr-2 p-2 bg-gray-800 rounded-sm"
            >
              <i className="fab fa-node-js text-green-500 mr-2"></i>
              <p className="text-gray-300">{pkg.name}</p>
            </div>
          ))}
      </div>
    </section>
  );
  return (
    <DisplayWrapper>
      <H2>Defaults</H2>
      <H2Subtitle>
        Create default package.json files that you can import into other
        projects to make setup a breeze.
      </H2Subtitle>

      {!params.get("f") && (
        <>
          <NpmPkgs />
          <YarnPkgs />
        </>
      )}

      {params.get("f") === "npm" && <NpmPkgs />}

      {params.get("f") === "yarn" && <YarnPkgs />}
    </DisplayWrapper>
  );
};

export default DefaultsPage;
