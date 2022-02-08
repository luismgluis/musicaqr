import Box from "@mui/material/Box";

export default function SongCard(props) {
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
          <Box component={"div"} className="songContainer--artistInfoMain">
            <Box component={"span"} className="songContainer--album">
              {props.song}
            </Box>
            <Box component={"span"} className="songContainer--artist">
              {props.artist}
            </Box>
            <Box component={"span"} className="songContainer--song">
              {props.album}
            </Box>
          </Box>
          <Box component={"span"} className="songContainer--time">
            {props.songLength}
          </Box>
        </Box>
      </Box>
    </>
  );
}
