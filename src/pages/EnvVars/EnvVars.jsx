import React, { useEffect, useState } from "react";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";
import { H2 } from "../../components/Headings/Headings";
import { Link } from "react-router-dom";
import { getAxios } from "../../api/index";
import { formatUrl } from "../../helpers/formatUrl";

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
      <div className="flex justify-between items-center">
        <H2>Environment Variables</H2>
        <div className="w-fit">
          <Link className="btn primary  bg-pink-500" to="/env/new">
            New Environment Variable
          </Link>
        </div>
      </div>

      <div className="snippet-list grid grid-cols-5 mt-5 gap-4">
        {vars.length > 0 &&
          vars.map((variable, id) => (
            <Link
              className="flex items-center bg-gray-900 p-4 rounded-md snippet-item"
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
