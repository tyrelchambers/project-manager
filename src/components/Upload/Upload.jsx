import React from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";

import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import useStorage from "../../hooks/useStorage";
import { config } from "../../config/config";
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginImageCrop,
  FilePondPluginFileValidateSize
);

const Upload = React.forwardRef((props, ref) => {
  const [token, _] = useStorage("token");
  return (
    <FilePond
      ref={ref}
      allowMultiple={false}
      maxFiles={1}
      server={{
        url: `${config[process.env.NODE_ENV].backend}/api/v1/upload/save`,
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
      maxFileSize="3MB"
    />
  );
});

export default Upload;
