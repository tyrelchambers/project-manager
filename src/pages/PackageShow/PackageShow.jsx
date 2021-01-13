import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAxios } from "../../api";
import { MainButton } from "../../components/Buttons/Buttons";
import { H1 } from "../../components/Headings/Headings";
import { copyToClipboard } from "../../helpers/copyToClipboard";
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

  const deleteHandler = () => {
    getAxios({
      url: `/packages/${package_id}/delete`,
      method: "delete",
      data: {
        package_id,
        keyName: pkg.package.folderName,
      },
    }).then((res) => {
      window.history.back();
      toast.success(res.message);
    });
  };
  return (
    <DisplayWrapper>
      {!isEmpty(pkg.package) && (
        <>
          <div className="flex items-center w-fit">
            <H1 className="mr-4 whitespace-no-wrap">{pkg.package.name}</H1>
            <MainButton delete onClick={deleteHandler}>
              Delete
            </MainButton>
          </div>
          <div className="p-4 bg-gray-800 w-3/5 rounded-lg flex flex-col mb-4 mt-4">
            <pre>
              <code className="text-gray-300" id="package">
                {JSON.parse(pkg.body)}
              </code>
            </pre>
            <MainButton
              default
              classes="mt-8"
              onClick={() =>
                copyToClipboard(document.querySelector("#package").innerHTML)
              }
            >
              Copy to Clipboard
            </MainButton>
          </div>
        </>
      )}
    </DisplayWrapper>
  );
};

export default PackageShow;
