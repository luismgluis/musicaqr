import data from "../../../data/data";
import SongNav from "../../ui/NavBar/SongNav";

import SongCard from "../../ui/SongCard/SongCard";
type LoginProps = {
  enableCreate?: boolean;
  msj?: string;
};
const Login: React.FC<LoginProps> = (props) => {
  const { enableCreate = "false", msj = 65656 } = props;
  const cardItem = data.map((item) => {
    return <SongCard {...item} />;
  });

  return (
    <>
      <section>
        <SongNav />
      </section>
      <section>{cardItem}</section>
    </>
  );
};
export default Login;
