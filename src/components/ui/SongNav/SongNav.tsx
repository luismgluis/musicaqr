import { YouTube, Search, Person } from "@mui/icons-material";
import ButtonIcon from "../../icons/ButtonIcon";

type SongNavProps = {};
const SongNav: React.FC<SongNavProps> = ({}) => {
	return (
		<section>
			<div className="songNav">
				<ButtonIcon icon={<YouTube className="logoYoutube" />} />
				<ButtonIcon icon={<Search className="logoSearch" />} />
				<ButtonIcon icon={<Person className="logoProfile" />} />
			</div>
		</section>
	);
};
export default SongNav;
