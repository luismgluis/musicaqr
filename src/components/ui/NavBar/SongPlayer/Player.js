import { PlayArrow, SkipNext, SkipPrevious } from "@mui/icons-material";
import Box from "@mui/material/Box";
import ButtonIconV2 from "../../../icons/ButtonIconV2";
import ButtonIconV3 from "../../../icons/ButtonIconV3";
import "./SongPlayer.css";
export default function Player() {
  return (
    <Box component={"div"} className="player">
      <ButtonIconV2 icon={<SkipPrevious className="player--SkipPrevious" />} />
      <ButtonIconV3 icon={<PlayArrow className="player--PlayArrow" />} />
      <ButtonIconV2 icon={<SkipNext className="player--SkipNext" />} />
    </Box>
  );
}
