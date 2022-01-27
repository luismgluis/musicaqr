import {
  LinearProgress,
  LinearProgressProps,
  Typography,
  Box,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Button,
} from "@mui/material";

import React, { ChangeEvent, useCallback, useRef, useState } from "react";
import Api from "../../../api/Api";
import { FileInfo } from "../../../classes/FileInfo";
import utils from "../../../libs/utils/utils";
const TAG = "UploadFileInput";
function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

type UploadFileInputProps = {
  basePath: string;
  onCreate?: (res: FileInfo) => void;
  textButton?: string;
};
const UploadFileInput: React.FC<UploadFileInputProps> = ({
  onCreate,
  basePath,
  textButton = "Subir Imagen",
}) => {
  console.log(TAG, "render");
  const [progress, setProgress] = React.useState(0);

  const lastFileUpload = useRef<null | FileInfo>(null);

  const save = useCallback(
    (file: File) => {
      if (file === null) {
        return;
      }
      if (lastFileUpload.current) {
        lastFileUpload?.current?.remove();
      }
      const key = utils.generateKey("image");
      Api.storage.uploadFile(
        `${basePath}/${key}`,
        file,
        (percentage) => {
          console.log(percentage);
          setProgress(percentage);
        },
        (data) => {
          setProgress(100);
          lastFileUpload.current = data;
          if (onCreate) onCreate(data);
        },
        (err) => {
          console.log(err);
          setProgress(0);
        }
      );
    },
    [basePath, onCreate]
  );

  const handleSelectFile = React.useCallback(
    (e: ChangeEvent<HTMLInputElement> | null) => {
      if (e?.target.files) {
        const item = e?.target.files[0];
        save(item);
      }
    },
    [save]
  );
  return (
    <div className="UploadFileInput">
      <Box sx={{ width: "100%" }}>
        <Button variant="contained" component="label">
          {textButton}
          <input
            id="uploadFile"
            type="file"
            hidden
            accept="image/*"
            onChange={(event) => {
              handleSelectFile(event);
            }}
            onClick={(event: any) => {
              event.target.value = null;
            }}
          />
        </Button>
        {progress > 0 && <LinearProgressWithLabel value={progress} />}
      </Box>
    </div>
  );
};
export default UploadFileInput;
