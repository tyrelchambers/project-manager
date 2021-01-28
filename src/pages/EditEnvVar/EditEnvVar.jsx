import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getAxios } from "../../api";
import { MainButton } from "../../components/Buttons/Buttons";
import FormLabel from "../../components/FormLabel/FormLabel";
import { H2 } from "../../components/Headings/Headings";
import { formatUrl } from "../../helpers/formatUrl";
import isEmpty from "../../helpers/isEmpty";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";

const EditEnvVar = () => {
  const { env_name } = useParams();
  const [envVar, setEnvVar] = useState({});
  const [updated, setUpdated] = useState({});
  const history = useHistory();

  useEffect(() => {
    const fn = async () => {
      await getAxios({
        url: `/env/${env_name}`,
      }).then((res) => {
        setEnvVar(res);
        setUpdated(res);
      });
    };

    fn();
  }, [env_name]);

  const submitHandler = async (e) => {
    e.preventDefault();

    await getAxios({
      url: `/env/${envVar.name}/edit`,
      method: "patch",
      data: updated,
    });

    history.push(`/env/${formatUrl(updated.name)}`);
  };

  if (isEmpty(envVar)) return null;

  return (
    <DisplayWrapper>
      <H2>Editing {envVar.name}</H2>
      <form className="form mt-8 container max-w-screen-md">
        <div className="field-group">
          <FormLabel text="Name" name="envName" />
          <input
            type="text"
            className="form-input"
            placeholder="Variable name"
            value={updated.name}
            onChange={(e) => setUpdated({ ...updated, name: e.target.value })}
          />
        </div>

        <div className="field-group">
          <FormLabel text="Variables" name="envVariable" />

          <textarea
            name="envVariable"
            rows="10"
            className="form-input"
            placeholder="Copy variables here..."
            value={updated.variables}
            onChange={(e) =>
              setUpdated({ ...updated, variables: e.target.value })
            }
          />
        </div>

        <MainButton default onClick={(e) => submitHandler(e)}>
          Save
        </MainButton>
      </form>
    </DisplayWrapper>
  );
};

export default EditEnvVar;
