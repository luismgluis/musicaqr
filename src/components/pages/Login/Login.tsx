import data from "../../../data/data";
import BusinessCard from "../../ui/BusinessCard/BusinessCard";
import SongPlayer from "../../ui/NavBar/SongPlayer/SongPlayer";

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
      <section>
        <SongNav />
      </section>
      <section>{/* <BusinessCard /> */}</section>
      <section>{cardItem}</section>
      <SongPlayer />
    </>
  );
};
export default Login;
