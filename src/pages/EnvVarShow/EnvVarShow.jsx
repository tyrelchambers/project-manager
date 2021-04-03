import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
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
  const history = useHistory(0);
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

  return (
    <DisplayWrapper>
      <H1>{envVar.name}</H1>
      <div className="w-2/5">
        <pre className="mt-6 p-4 rounded-md bg-gray-800 text-gray-200 whitespace-pre-wrap">
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
