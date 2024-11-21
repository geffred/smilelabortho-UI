import "./profil.css"
import MenuProfil from "../../composants/ProfilComponent/MenuProfil/MenuProfil";
import ProfilInfo from "../../composants/ProfilComponent/ProfilInfo/ProfilInfo";
import NavBar from "../../composants/NavBar/NavBar";
import { useState } from "react";
import Display from "../../composants/Display/Display";
import ProfilSettings from "../../composants/ProfilComponent/ProfilSettings/ProfilSettings";

function Profil(){
    const [active,setActive] = useState("profil");
    const handleClick = (label) =>{
      setActive(label)
    }
    console.log(active)
    return (
      <main className="profil">
        <NavBar bgColor="rgba(0, 0, 0,0.8)" />
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <MenuProfil handleClick={handleClick} active={active} />
            </div>

            <div className="col-lg-9">
              <Display label={"profil"} active={active}>
                <ProfilInfo />
              </Display>
              <Display label={"paramètres"} active={active}>
                <ProfilSettings />
              </Display>
            </div>
          </div>
        </div>
      </main>
    );
}

export default Profil;

