import React, { useState, useEffect } from "react";
import { H2, H2Subtitle, H3 } from "../../components/Headings/Headings";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";
import "./PackagesPage.css";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { getAxios } from "../../api";

const PackagesPage = ({ UserStore }) => {
  const params = new URLSearchParams(window.location.search);

  const [defaultPackages, setDefaultPackage] = useState([]);

  useEffect(() => {
    if (UserStore.user) {
      getAxios({
        url: "/packages/me",
      }).then((res) => {
        setDefaultPackage(res.packages);
      });
    }
  }, []);

  const NpmPkgs = () => (
    <section className="mt-10">
      <H3>Saved NPM Defaults</H3>

      <div className="flex mt-4">
        {defaultPackages.length > 0 &&
          defaultPackages
            .filter((x) => x.bundler === "npm")
            .map((pkg, id) => (
              <Link
                key={id}
                className="flex items-center mr-2 p-2 bg-gray-800 rounded-sm"
                to={`/package/${pkg.uuid}`}
              >
                <i className="fab fa-node-js text-green-500 mr-2"></i>
                <p className="text-gray-300">{pkg.folderName}</p>
              </Link>
            ))}
      </div>
    </section>
  );

  const YarnPkgs = () => (
    <section className="mt-10">
      <H3>Saved Yarn Defaults</H3>

      <div className="flex mt-4">
        {defaultPackages.length > 0 &&
          defaultPackages
            .filter((x) => x.bundler === "yarn")
            .map((pkg, id) => (
              <Link
                key={id}
                className="flex items-center mr-2 p-2 bg-gray-800 rounded-sm"
                to={`/package/${pkg.uuid}`}
              >
                <i className="fab fa-yarn  text-green-500 mr-2"></i>
                <p className="text-gray-300">{pkg.folderName}</p>
              </Link>
            ))}
      </div>
    </section>
  );
  return (
    <DisplayWrapper>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <H2>Defaults</H2>
          <H2Subtitle>
            Create default package.json files that you can import into other
            projects to make setup a breeze.
          </H2Subtitle>
        </div>

        <div className="flex">
          <Link className=" btn primary bg-pink-500" to="/packages/new">
            New Package.json
          </Link>
        </div>
      </div>

      {params.get("f") === "npm" && <NpmPkgs />}

      {params.get("f") === "yarn" && <YarnPkgs />}
    </DisplayWrapper>
  );
};

export default inject("UserStore")(observer(PackagesPage));
