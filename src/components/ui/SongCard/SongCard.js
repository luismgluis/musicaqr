import { SettingsInputComponentOutlined } from "@mui/icons-material";
import Box from "@mui/material/Box";
import { useMemo } from "react";

export default function SongCard(props) {
  const songLengthText = useMemo(() => {
    const seconds = props.songLength;
    const minutes = Math.floor(seconds / 60);
    let extraSec = seconds % 60;
    if (extraSec < 10) {
      extraSec = "0" + extraSec;
    }
    const fullTime = minutes + ":" + extraSec;
    return fullTime;
  }, [props.songLength]);

  return (
    <>
      <Box component={"div"} className="songContainer">
        <Box
          component={"img"}
          src={props.albumCover}
          alt=""
          className="songContainer--albumCover"
        ></Box>

        <Box component={"div"} className="songContainer--artistInfo">
          <Box component={"div"} className="songContainer--artistTop">
            <Box component={"div"} className="songContainer--artistInfoMain">
              <Box component={"span"} className="songContainer--song">
                {props.song}
              </Box>
            </Box>
            <Box component={"span"} className="songContainer--artist">
              {props.artist}
            </Box>
            •
            <Box component={"span"} className="songContainer--album">
              {props.album}
            </Box>
          </Box>
        </Box>
        <Box component={"span"} className="songContainer--time">
          {songLengthText}
        </Box>
      </Box>
    </>
  );
}
