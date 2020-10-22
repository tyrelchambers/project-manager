import Axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { MainButton } from "../components/Buttons/Buttons";
import FormLabel from "../components/FormLabel/FormLabel";
import SelectField from "../components/SelectField/SelectField";
import { packageManagers } from "../constants/packageManagers";

const NewPackageForm = () => {
  const [state, setState] = useState({
    framework: {},
    packagesToInstall: [],
  });

  const [query, setQuery] = useState("");
  const [queryResults, setQueryResults] = useState([]);

  const searchNpm = async (q) => {
    return await Axios.get("http://localhost:4000/api/v1/npm", {
      params: {
        q,
      },
    }).then((res) => res.data);
  };

  useEffect(() => {
    if (query.length === 0) {
      setQueryResults([]);
    }

    if (query.length > 2) {
      const fn = async () => {
        const results = await searchNpm(query);
        setQueryResults(results);
      };

      fn();
    }
  }, [query]);

  const installHandler = (p) => {
    if (state.packagesToInstall.find((x) => x.name === p.name)) {
      return;
    }
    setState({ ...state, packagesToInstall: [...state.packagesToInstall, p] });
  };

  const removePackageHandler = (p) => {
    const clone = [...state.packagesToInstall];
    const toKeep = clone.filter((x) => x.name !== p.name);
    setState({ ...state, packagesToInstall: toKeep });
  };

  return (
    <form className="form">
      <div className="field-group">
        <FormLabel name="packageName" text="Name of Package" />
        <input type="text" className="form-input" />
      </div>

      <div className="field-group">
        <FormLabel name="manager" text="NPM or Yarn?" />
        <SelectField
          data={packageManagers}
          state={state}
          stateHandler={setState}
        />
      </div>

      <div className="field-group">
        <FormLabel name="npmPackages" text="Add packages" />
        <input
          type="search"
          className="form-input"
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="mt-6">
          {queryResults.map((q, id) => (
            <div
              className="flex justify-between items-center p-2 query-result rouned-md"
              key={id}
              onClick={() => installHandler(q)}
            >
              <p className="font-bold text-white">{q.name}</p>
              <p className="text-pink-500 italic">
                <i className="fas fa-at"></i> {q.version}
              </p>
            </div>
          ))}
        </div>

        <hr />

        <div className="mt-4">
          <p className="font-bold text-white text-xl mb-4">
            Packages to be installed
          </p>
          {state.packagesToInstall.map((q, id) => (
            <div
              className="flex justify-between items-center p-2"
              key={id}
              onClick={() => removePackageHandler(q)}
            >
              <p className="font-bold text-white">{q.name}</p>
              <p className="text-pink-500 italic">
                <i className="fas fa-at"></i> {q.version}
              </p>
            </div>
          ))}
        </div>
      </div>

      <MainButton>Save</MainButton>
    </form>
  );
};

export default NewPackageForm;
