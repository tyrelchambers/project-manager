import { inject, observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { getAxios } from "../api";
import { MainButton } from "../components/Buttons/Buttons";
import FormLabel from "../components/FormLabel/FormLabel";
import ProjectConfirm from "../components/ProjectConfirm/ProjectConfirm";
import SelectField from "../components/SelectField/SelectField";
import { frameworks } from "../constants/frameworks";
import isEmpty from "../helpers/isEmpty";

const ProjectForm = ({ ModalStore }) => {
  const [q, setQ] = useState("");
  const [qResults, setQResults] = useState([]);
  const [state, setState] = useState({
    appName: "",
    framework: {},
    package: {},
  });
  const inputHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (q.length > 0) {
      getAxios({
        url: `/packages/search?q=${q}`,
      }).then((res) => setQResults(res.packages));
    } else {
      setQResults([]);
    }
  }, [q]);

  const addPackageHandler = (pkg) => {
    setState({ ...state, package: pkg });
  };

  return (
    <form className="form mt-8">
      <div className="field-group">
        <FormLabel name="appName" text="App Name" />
        <input
          type="text"
          className="form-input"
          name="appName"
          placeholder="an-awesome-project"
          value={state.appName}
          onChange={(e) => inputHandler(e)}
        />
      </div>

      <div className="mt-8">
        <SelectField data={frameworks} stateHandler={setState} state={state} />
      </div>

      <div className="field-group">
        <FormLabel name="packageSearch" text="Import a Saved Package" />
        <input
          type="text"
          className="form-input"
          placeholder="begin typing..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      {qResults.length > 0 &&
        qResults.map((item, id) => (
          <div
            className="flex justify-between items-center p-2 query-result rouned-md"
            key={id}
            onClick={() => addPackageHandler(item)}
          >
            <p className="font-bold text-white">{item.name}</p>
            {item?.version && (
              <p className="text-pink-500 italic">
                <i className="fas fa-at"></i> {item.version}
              </p>
            )}
          </div>
        ))}

      <hr className="mt-4 mb-4" />

      {!isEmpty(state.package) && (
        <div className="flex items-center">
          <i
            className="fas fa-times mr-4 text-red-500"
            onClick={() => setState({ ...state, package: {} })}
          ></i>
          <p className="font-bold text-white">{state.package.name}</p>
        </div>
      )}

      <MainButton
        className="mt-8"
        default
        onClick={(e) => {
          e.preventDefault();
          ModalStore.setRender(<ProjectConfirm state={state} />);
          ModalStore.setIsOpen(true);
        }}
      >
        Prepare
      </MainButton>
    </form>
  );
};

export default inject("ModalStore")(observer(ProjectForm));
