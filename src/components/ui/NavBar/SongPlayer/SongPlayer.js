import Box from "@mui/material/Box";
import Player from "./Player";
import "./SongPlayer.css";
import data from "../../../../data/data";
const playArrow = document.getElementsByClassName("player--PlayArrow");

export default function SongPlayer() {
  const playAudio = () => {
    const audioEl = document.getElementsByClassName("audio-element")[0];
    audioEl.play();
  };

  // playArrow.addEventListener("click", () => alert("Hi user!"));
  return (
    <>
      <Box component={"section"} className="playerContainer">
        <Player />
        <Box component={"div"} className="playerSong">
          <span className="playerSong--song">Rock With You</span>
          <span className="playerSong--artist">Michael Jackson</span>
        </Box>
      </Box>
      <audio className="audio-element">
        <source src={data[0].audioSrc}></source>
      </audio>
    </>
  );
}
