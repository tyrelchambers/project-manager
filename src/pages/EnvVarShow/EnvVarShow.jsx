import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getAxios } from "../../api";
import { MainButton } from "../../components/Buttons/Buttons";
import { H2 } from "../../components/Headings/Headings";
import { copyToClipboard } from "../../helpers/copyToClipboard";
import { formatUrl } from "../../helpers/formatUrl";
import isEmpty from "../../helpers/isEmpty";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";

const EnvVarShow = () => {
  const [envVar, setEnvVar] = useState({});
  const { env_name } = useParams();
  const history = useHistory(0);
  useEffect(() => {
    const fn = async () => {
      await getAxios({
        url: `/env/${env_name}`,
      }).then((res) => {
        setEnvVar(res);
      });
    };

    fn();
  }, []);

  if (isEmpty(envVar)) return null;

  return (
    <DisplayWrapper>
      <H2>{envVar.name}</H2>
      <div className="w-2/5">
        <pre className="mt-6 p-4 rounded-md bg-gray-800 text-gray-200">
          <code>{envVar.variables}</code>
        </pre>
        <div className="flex mt-6">
          <MainButton
            classes="m-2"
            default
            onClick={() => copyToClipboard(envVar.variables)}
          >
            Copy to clipboard
          </MainButton>
          <MainButton
            classes="m-2"
            muted
            onClick={() => {
              history.push(`/env/${formatUrl(envVar.name)}/edit`);
            }}
          >
            Edit
          </MainButton>
        </div>
      </div>
    </DisplayWrapper>
  );
};

export default EnvVarShow;
