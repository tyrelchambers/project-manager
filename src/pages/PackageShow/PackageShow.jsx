import React, { useEffect, useState } from "react";
import { getAxios } from "../../api";
import { MainButton } from "../../components/Buttons/Buttons";
import { H1, H2, H3 } from "../../components/Headings/Headings";
import isEmpty from "../../helpers/isEmpty";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";

const PackageShow = ({ match }) => {
  const [pkg, setPkg] = useState({});
  const { package_id } = match.params;

  useEffect(() => {
    const fn = async () => {
      await getAxios({
        url: `/packages/${package_id}`,
      }).then((res) => {
        setPkg({
          package: res.package,
          body: res.body,
        });
      });
    };

    fn();
  }, [package_id]);

  return (
    <DisplayWrapper>
      {!isEmpty(pkg) && (
        <>
          <H1>{pkg.package.folderName}</H1>
          <H3>{pkg.package.name}</H3>
          <div className="p-4 bg-gray-800 w-3/5 rounded-lg flex flex-col mb-4 mt-4">
            <pre>
              <code className="text-gray-300">{JSON.parse(pkg.body)}</code>
            </pre>
            <MainButton className="mt-4">Copy to Clipboard</MainButton>
          </div>
        </>
      )}
    </DisplayWrapper>
  );
};

export default PackageShow;
