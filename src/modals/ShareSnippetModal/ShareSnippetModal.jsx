import React from "react";
import { H2 } from "../../components/Headings/Headings";
import { copyToClipboard } from "../../helpers/copyToClipboard";
import { MainButton } from "../../components/Buttons/Buttons";
import Social from "../../components/Social/Social";
const ShareSnippetModal = ({ shareLink }) => {
  return (
    <div>
      <div className="p-4 flex flex-col items-center">
        <H2 className="text-gray-800">Share</H2>
        <Social />

        <div className="w-fit">
          <MainButton muted>Generate image</MainButton>
        </div>
      </div>

      <div className="p-4 flex flex-col items-center bg-gray-800">
        <H2>Public link</H2>
        <p
          className="pl-4 pr-4 pt-2 pb-2 rounded-md mt-4 bg-gray-700 text-pink-300 cursor-pointer"
          onClick={() => copyToClipboard(shareLink)}
        >
          <i className="fas fa-copy mr-4"></i>
          {shareLink}
        </p>
      </div>
    </div>
  );
};

export default ShareSnippetModal;
