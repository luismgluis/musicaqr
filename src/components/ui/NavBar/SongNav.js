import YouTube from "@mui/icons-material/YouTube";
import Search from "@mui/icons-material/Search";
import Profile from "@mui/icons-material/Person";
import ButtonIcon from "../../icons/ButtonIcon";
export default function songNav() {
  return (
    <>
      <div className="songNav">
        <ButtonIcon icon={<YouTube className="logoYoutube" />} />
        <ButtonIcon icon={<Search className="logoSearch" />} />
        <ButtonIcon icon={<Profile className="logoProfile" />} />
      </div>
    </>
  );
}
