import React, { useEffect } from "react";
import { getAxios } from "../../api";
import { H1 } from "../../components/Headings/Headings";

const DownloadFile = (props) => {
  const url = `/projects/download?appName=${props.location.state.appName}&token=${props.location.state.token}`;

  useEffect(() => {
    const fn = async () => {
      await getAxios({
        url,
      });
    };

    fn();
  }, [props.location.state]);

  return (
    <div>
      <H1>Downloading ...</H1>
    </div>
  );
};

export default DownloadFile;
