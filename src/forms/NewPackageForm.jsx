import Axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { MainButton } from "../components/Buttons/Buttons";
import FormLabel from "../components/FormLabel/FormLabel";
import SelectField from "../components/SelectField/SelectField";
import Spinner from "../components/Spinner/Spinner";
import { inject, observer } from "mobx-react";
import { getAxios } from "../api";
import List from "../components/List/List";
import useStorage from "../hooks/useStorage";
import { packagePrefs } from "../constants/frameworks";
import { useForm } from "react-hook-form";
import FormErrors from "../components/FormErrors/FormErrors";
import { useHistory } from "react-router-dom";

const NewPackageForm = ({ ModalStore, UserStore }) => {
  const [state, setState] = useState({
    packagesToInstall: [],
    defaultName: "",
    packageName: "",
    framework: {},
  });

  const [downloading, setDownloading] = useState(false);
  const [query, setQuery] = useState("");
  const [queryResults, setQueryResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [token, _] = useStorage("token");
  const { errors, register, handleSubmit } = useForm({
    reValidateMode: "onSubmit",
  });
  const history = useHistory();

  const searchNpm = async (q) => {
    return await Axios.get(
      `${process.env.REACT_APP_BACKEND}/api/v1/packages/search/npm`,
      {
        params: {
          q,
        },
      }
    ).then((res) => res.data);
  };

  useEffect(() => {
    if (query.length === 0) {
      setQueryResults([]);
    }

    if (query.length > 1) {
      setSearching(true);
      const fn = async () => {
        const results = await searchNpm(query);
        setQueryResults(results);
        setSearching(false);
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

  const inputHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const packageTemp = `
{
  "name": "${state.packageName}",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    ${state.packagesToInstall
      .map((pkg, id) => {
        return `"${pkg.name}": "^${pkg.version}"`;
      })
      .join(`,\n    `)}
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "now-build": "react-scripts build"
  },
  "eslintConfig": {
    "extends": "react-app"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
}
`;

  const openModal = () => {
    ModalStore.setRender(<PackageWindow />);
    ModalStore.setIsOpen(true);
  };

  const submitHandler = async (e) => {
    let linkToPackage;

    await getAxios({
      method: "post",
      url: "/packages/upload",
      data: {
        packageJson: JSON.stringify(packageTemp),
        folderName: state.defaultName,
      },
    }).then((res) => {
      linkToPackage = res.endpoint;
    });

    await getAxios({
      method: "post",
      url: "/packages/save",
      data: {
        url: linkToPackage,
        userId: UserStore.user.uuid,
        packageName: state.packageName,
        folderName: state.defaultName,
        bundler: state.framework.framework,
      },
    });
    const downloadWindow = window.open(``, "_blank");
    downloadWindow.window.location = `${process.env.REACT_APP_BACKEND}/api/v1/packages/download?defaultName=${state.defaultName}&token=${token}`;
    setTimeout(() => {
      downloadWindow.close();
    }, 1500);
    history.push("/");
  };

  const PackageWindow = () => (
    <div className="flex flex-col">
      <div className="flex flex-col items-center p-4 pt-8 pb-8">
        <p className="font-bold text-lg mb-4 text-gray-800">
          Download your package.json
        </p>

        {downloading && (
          <div className="flex items-center mt-4">
            <Spinner />
            <p className="text-pink-500 font-bold ml-4">Preparing files...</p>
          </div>
        )}

        {!downloading && (
          <MainButton default onClick={submitHandler}>
            <i className="fas fa-cloud-download-alt mr-4 "></i>Create and
            download
          </MainButton>
        )}
      </div>
      <div className="flex flex-col items-center p-4 pt-8 pb-8 bg-gray-900 ">
        <p className="font-bold text-white text-lg mb-4 ">
          Copy to your own package.json
        </p>

        <div className="p-4 bg-gray-800 w-full rounded-lg flex mb-4">
          <pre>
            <code className="text-gray-300">{packageTemp}</code>
          </pre>
        </div>
        <MainButton default>Copy to Clipboard</MainButton>
      </div>
    </div>
  );

  return (
    <form
      className="container max-w-screen-md"
      onSubmit={handleSubmit(openModal)}
    >
      <div className="field-group">
        <FormLabel name="defaultName" text="Name to Save as" />
        <input
          type="text"
          className="form-input"
          name="defaultName"
          placeholder="my-new-package"
          value={state.defaultName}
          onChange={(v) => inputHandler(v)}
          ref={register({
            required: {
              value: true,
              message: "Need a name to save as",
            },
          })}
        />
        <FormErrors error={errors.defaultName} />
      </div>

      <div className="field-group">
        <FormLabel name="packageName" text="Name of Package.json" />
        <input
          type="text"
          className="form-input"
          name="packageName"
          placeholder="The name of the package.json: {name: 'my-app'}"
          value={state.packageName}
          onChange={(v) => inputHandler(v)}
          ref={register({
            required: {
              value: true,
              message: "Please give your package a name",
            },
          })}
        />
        <FormErrors error={errors.packageName} />
      </div>

      <div className="field-group">
        <FormLabel name="manager" text="NPM or Yarn?" />
        <SelectField
          data={packagePrefs}
          state={state}
          stateHandler={setState}
          stateKey="framework"
          label="Choose a bundler"
          ref={register({
            required: {
              value: true,
              message: "Please choose a bundler",
            },
          })}
        />
        <FormErrors error={errors.framework} />
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
          {searching && (
            <div className="mt-4 mb-4">
              <Spinner />
            </div>
          )}
          {!searching &&
            queryResults.map((q, id) => (
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
            <List key={id} data={q} onClick={removePackageHandler} />
          ))}
        </div>
      </div>

      <MainButton default type="submit">
        Create
      </MainButton>
    </form>
  );
};

export default inject("ModalStore", "UserStore")(observer(NewPackageForm));
