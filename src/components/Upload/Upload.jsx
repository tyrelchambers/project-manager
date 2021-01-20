import React from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";

import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import useStorage from "../../hooks/useStorage";
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginImageCrop
);

const Upload = React.forwardRef((props, ref) => {
  const [token, _] = useStorage("token");
  return (
    <FilePond
      ref={ref}
      allowMultiple={false}
      maxFiles={1}
      server={{
        url: `${process.env.REACT_APP_BACKEND}/api/v1/upload/save`,
        headers: {
          token,
        },
        load: null,
        fetch: null,
        revert: null,
        restore: null,
      }}
      files={props.files}
      onupdatefiles={(fileItems) => {
        props.setFiles([...fileItems.map((fileItem) => fileItem.file)]);
      }}
      instantUpload={false}
      allowImageCrop={true}
      imageCropAspectRatio="1:1"
      imageResizeMode="cover"
      allowImageResize={true}
      imageResizeTargetWidth="400"
      imageResizeTargetHeight="400"
    />
  );
});

export default Upload;
