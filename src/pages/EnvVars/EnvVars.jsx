import React, { useEffect, useState } from "react";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";
import { H1, H2Subtitle } from "../../components/Headings/Headings";
import { Link } from "react-router-dom";
import { getAxios } from "../../api/index";
import { formatUrl } from "../../helpers/formatUrl";
import "./EnvVars.css";

const EnvVars = () => {
  const [vars, setVars] = useState([]);

  useEffect(() => {
    const fn = async () => {
      await getAxios({
        url: "/env/me",
      }).then((res) => {
        setVars([...res.variables]);
      });
    };

    fn();
  }, []);

  return (
    <DisplayWrapper>
      <div className="flex justify-between envvar-header">
        <div className="flex-1">
          <H1>Environment Variables</H1>
          <H2Subtitle>
            Environment variables are not encrypted. Don't add any sensitive
            information.
          </H2Subtitle>
        </div>
        <div className="w-fit">
          <Link className="text-yellow-500 underline" to="/env/new">
            <i class="fas fa-pencil-alt mr-2"></i>
            Create Environment Variable
          </Link>
        </div>
      </div>

      <div className="envvar-list grid grid-cols-5 mt-5 gap-4">
        {vars.length > 0 &&
          vars.map((variable, id) => (
            <Link
              className="flex items-center bg-gray-900 p-4 rounded-md "
              key={id}
              to={`/env/${formatUrl(variable.name)}`}
            >
              <i className="fas fa-code mr-4 text-pink-500"></i>
              <p>{variable.name}</p>
            </Link>
          ))}
      </div>
    </DisplayWrapper>
  );
};

export default EnvVars;
