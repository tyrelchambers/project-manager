import React, { useEffect, useState } from "react";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";
import { H1 } from "../../components/Headings/Headings";
import { Link } from "react-router-dom";
import { getAxios } from "../../api/index";
import "./EnvVars.css";
import { MainButton } from "../../components/Buttons/Buttons";
import { inject, observer } from "mobx-react";

const EnvVars = ({ UserStore }) => {
  const [vars, setVars] = useState([]);
  const [locked, setLocked] = useState(true);
  const [password, setPassword] = useState("");
  const [unlocking, setUnlocking] = useState(false);
  useEffect(() => {
    const isLocked = window.sessionStorage.getItem("env_var_unlocked");
    if (!isLocked) {
      setLocked(true);
    } else {
      setLocked(false);
    }
    const fn = async () => {
      if (!locked) {
        await getAxios({
          url: "/env/me",
        }).then((res) => {
          setVars([...res.variables]);
        });
      }
    };

    fn();
  }, [locked]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setUnlocking(true);
    await getAxios({
      url: "/account/envvar",
      params: {
        password,
      },
    }).then((res) => {
      if (res.variables) {
        window.sessionStorage.setItem("env_var_unlocked", true);
        setVars([res]);

        setLocked(false);
      }
      setUnlocking(false);
    });
  };

  const button = password ? (
    <MainButton default classes="mt-4" onClick={(e) => submitHandler(e)}>
      Unlock
    </MainButton>
  ) : (
    <MainButton muted classes="mt-4">
      Unlock
    </MainButton>
  );

  return (
    <DisplayWrapper>
      <div className="flex justify-between envvar-header">
        <div className="flex-1">
          <H1>Environment Variables</H1>
          <div className="flex bg-green-500 items-center rounded-sm w-fit pl-2 pr-2 pt-1 pb-1">
            <i className="fas fa-lock text-white text-sm mr-2"></i>
            <p className="font-bold">Encrypted</p>
          </div>
          <div className="w-fit mt-4">
            <Link className="text-yellow-500 underline font-bold" to="/env/new">
              <i className="fas fa-pencil-alt mr-2"></i>
              Create Environment Variable
            </Link>
          </div>
        </div>
      </div>

      {!UserStore.user.envVariablePassword && (
        <div className=" mt-10">
          <p className="text-xl">
            No password set.{" "}
            <Link className="link" to="/settings/account">
              Please set one
            </Link>{" "}
            so we can show you your variables
          </p>
        </div>
      )}

      {locked && UserStore.user.envVariablePassword && (
        <div className="flex justify-center w-full mt-20">
          <div className="max-w-xl flex flex-col items-center bg-gray-900 p-10 rounded-lg">
            <i className="fas fa-lock text-6xl mb-10 text-yellow-500"></i>
            <p className="text-2xl text-center mb-8">
              Environment variables locked. Enter password to unlock.
            </p>
            <input
              type="password"
              className="form-input"
              name="password"
              placeholder="Environment password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {!unlocking ? (
              button
            ) : (
              <MainButton pending>Unlocking...</MainButton>
            )}
            <Link className="mt-4 text-yellow-500 underline">
              Change password
            </Link>
          </div>
        </div>
      )}

      {!locked && (
        <div className="envvar-list grid grid-cols-5 mt-5 gap-4">
          {vars.length > 0 &&
            vars.map((variable, id) => (
              <Link
                className="flex items-center bg-gray-900 p-4 rounded-md "
                key={id}
                to={`/envs/${variable.uuid}`}
              >
                <i className="fas fa-code mr-4 text-pink-500"></i>
                <p>{variable.name}</p>
              </Link>
            ))}
        </div>
      )}
    </DisplayWrapper>
  );
};

export default inject("UserStore")(observer(EnvVars));
