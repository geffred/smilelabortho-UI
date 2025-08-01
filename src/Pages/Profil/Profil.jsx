import "./profil.css"
import MenuProfil from "../../composants/ProfilComponent/MenuProfil/MenuProfil";
import ProfilInfo from "../../composants/ProfilComponent/ProfilInfo/ProfilInfo";
import NavBar from "../../composants/NavBar/NavBar";
import { useContext, useState } from "react";
import Display from "../../composants/Display/Display";
import ProfilSettings from "../../composants/ProfilComponent/ProfilSettings/ProfilSettings";
import AllCommande from "../../composants/AllCommande/AllCommande";
import { UserContext } from "../../composants/UserContext";
import Footer from "../../composants/Footer/Footer"
import Messages from "../../composants/Messages/Messages";
import PanierBtn from "../../composants/PanierBtn/PanierBtn";

function Profil(){
    const [active,setActive] = useState("Profil");
    const {user} = useContext(UserContext)
    const handleClick = (label) =>{
      setActive(label)
    }
    console.log(active)
    return (
      <main className="profil">
        <PanierBtn />
        <NavBar bgColor="rgba(0, 0, 0,0.8)" />
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3">
              <MenuProfil handleClick={handleClick} active={active} />
            </div>

            <div className="col-lg-9">
              <Display label={"Profil"} active={active}>
                <ProfilInfo />
              </Display>
              <Display label={"Paramètres"} active={active}>
                <ProfilSettings />
              </Display>
              <Display label={"Commandes"} active={active}>
                <AllCommande
                  url={
                    "http://localhost:8080/api/commandes/utilisateur/" + user.id
                  }
                  isDashboard={false}
                />
              </Display>
              <Display label={"Messages"} active={active}>
                <Messages />
              </Display>
            </div>
          </div>
        </div>
        {/*<Footer >*/}
      </main>
    );
}

export default Profil;

