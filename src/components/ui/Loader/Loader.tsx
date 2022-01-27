import "./Loader.scss";
import React from "react";
import { useTheme } from "@mui/material";

const TAG = "LOADER";
type LoaderProps = {
  bgColor?: string;
  color?: string;
  p?: string;
  zoom?: number;
};
const Loader: React.FC<LoaderProps> = ({
  bgColor = null,
  color = null,
  p,
  zoom,
}) => {
  console.log(TAG, "render");
  const theme = useTheme();
  console.log(theme.palette.primary.main);
  return (
    <div className="Loader" style={{ padding: p }}>
      <div
        className="loaderIcon"
        style={{
          borderColor: bgColor || theme.palette.primary.light || undefined,
          borderTopColor: color || theme.palette.primary.main || undefined,
          zoom: zoom || undefined,
          // width: width || undefined,
          // height: width || undefined,
        }}
      ></div>
    </div>
  );
};
export default Loader;
