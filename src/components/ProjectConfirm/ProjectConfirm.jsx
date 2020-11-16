import React, { useEffect, useState } from "react";
import { MainButton } from "../Buttons/Buttons";
import Spinner from "../Spinner/Spinner";
import socketIOClient from "socket.io-client";
import { getAxios } from "../../api";
import useStorage from "../../hooks/useStorage";
const ProjectConfirm = ({ state }) => {
  const socket = socketIOClient(process.env.REACT_APP_BACKEND);
  const [downloading, setDownloading] = useState(false);
  const [generated, setGenerate] = useState(false);

  const [response, setResponse] = useState("");
  const [token, setToken] = useStorage("token");

  useEffect(() => {
    socket.on("project message", (data) => {
      setResponse(data);
    });
  }, []);

  const submitHandler = async () => {
    setDownloading(true);
    await getAxios({
      url: "/projects/create",
      method: "post",
      data: {
        ...state,
      },
    });
    setDownloading(false);
    setGenerate(true);
    const downloadWindow = window.open(``, "_blank");
    downloadWindow.window.location = `http://localhost:4000/api/v1/projects/download?appName=${state.appName}&token=${token}`;
    setTimeout(() => {
      downloadWindow.close();
    }, 500);
  };

  return (
    <div className="flex flex-col overflow-hidden">
      <div className="flex flex-col items-center p-4 pt-8 pb-8">
        <p className="font-bold text-lg mb-4">Download your project files</p>
        {downloading && (
          <div className="flex items-center mt-4">
            <Spinner />
            <p className="text-pink-500 font-bold ml-8">{response}</p>
          </div>
        )}

        {!downloading && !generated && (
          <MainButton onClick={submitHandler}>
            <i className="fas fa-cloud-download-alt mr-4 "></i>Generate files
          </MainButton>
        )}

        {generated && (
          <MainButton disabled>
            <i className="fas fa-check mr-4"></i>Complete
          </MainButton>
        )}
      </div>
      <div className="flex flex-col items-center p-4 pt-8 pb-8 bg-gray-900 ">
        <p className="font-bold text-white text-lg mb-4">
          Use the command terminal
        </p>

        <div className="p-4 bg-gray-800 w-full rounded-lg flex justify-center">
          <p className="text-white flex items-center">
            <span
              className="text-sm text-pink-500 mr-2"
              style={{ userSelect: "none" }}
            >
              ${" "}
            </span>
            {state.framework.command({ appName: state.appName })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectConfirm;
