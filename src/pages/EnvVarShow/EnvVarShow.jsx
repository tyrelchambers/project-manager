import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getAxios } from "../../api";
import { MainButton } from "../../components/Buttons/Buttons";
import { H1 } from "../../components/Headings/Headings";
import { copyToClipboard } from "../../helpers/copyToClipboard";
import { formatUrl } from "../../helpers/formatUrl";
import isEmpty from "../../helpers/isEmpty";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";

const EnvVarShow = () => {
  const [envVar, setEnvVar] = useState({});
  const { env_uuid } = useParams();
  const history = useHistory();
  useEffect(() => {
    const fn = async () => {
      await getAxios({
        url: `/env/${env_uuid}`,
      }).then((res) => {
        setEnvVar(res);
      });
    };

    fn();
  }, [env_uuid]);

  if (isEmpty(envVar)) return null;

  const deleteEnv = async () => {
    await getAxios({
      url: `/env/${env_uuid}`,
      method: "delete",
    });

    history.push("/env");
  };

  return (
    <DisplayWrapper>
      <div className="flex items-center">
        <H1 className="mr-8">{envVar.name}</H1>

        <i className="fas fa-trash text-red-500" onClick={deleteEnv}></i>
      </div>
      <div className="w-2/5">
        <pre className="mt-6 p-4 rounded-md bg-gray-800 text-gray-200 whitespace-pre-wrap">
          <code>{envVar.variables}</code>
        </pre>
        <div className="flex mt-6">
          <MainButton default onClick={() => copyToClipboard(envVar.variables)}>
            Copy to clipboard
          </MainButton>
        </div>
      </div>
    </DisplayWrapper>
  );
};

export default EnvVarShow;
