import data from "../../../data/data";
import BusinessCard from "../../ui/BusinessCard/BusinessCard";

import SongCard from "../../ui/SongCard/SongCard";
import SongNav from "../../ui/SongNav/SongNav";
type LoginProps = {
	enableCreate?: boolean;
	msj?: string;
};
const Login: React.FC<LoginProps> = (props) => {
	const cardItem = data.map((item) => {
		return <SongCard {...item} />;
	});

	return (
		<>
			<SongNav />
			<section>
				<BusinessCard />
			</section>
			<section>{cardItem}</section>
		</>
	);
};
export default Login;
