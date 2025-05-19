import NavBar from "../../composants/NavBar/NavBar";
import DashBoardMenu from "../../composants/DashBoardMenu/DashBoardMenu";
import "./Dashboard.css"
import { useState } from "react";
import Display from "../../composants/Display/Display";
import AllCategorie from "../../composants/AllCategorie/AllCategorie";
import AllAppareil from "../../composants/AllAppareil/AllAppareil";
import AllModelAppaeil from "../../composants/AllModelAppaeil/AllModelAppaeil";
import Utilisateurs from "../../composants/Utilisateurs/Utilisateurs";
import AllCommande from "../../composants/AllCommande/AllCommande";
import Analytics from "../Analytics/Analytics";
import Messages from "../../composants/Messages/Messages";

function Dashboard(){
    const [active , setActive] = useState("Utilisateurs")
    const handleClick = (select)=>{
        setActive(select)
        console.log(select)
    }

    const [data,setData] = useState(null)

    return (
      <div>
        <NavBar bgColor="#262626" />
        <div className="Dashboard container-fluid">
          <div className="row">
            <div className="col-lg-3 col-12 px-1 " id="menu">
              <DashBoardMenu isActive={active} handleClick={handleClick} />
            </div>
            <div className="col-lg-9 px-1 content-data">
              <Display active={active} label={"Categories"}>
                <AllCategorie
                  isDashboard={true}
                  style={{
                    transform: "translateY(0px)",
                    border: "none",
                    paddingTop: "15px",
                  }}
                />
              </Display>

              <Display active={active} label={"Appareils"}>
                <AllAppareil
                  isDashboard={true}
                  style={{
                    transform: "translateY(0px)",
                    border: "none",
                    paddingTop: "15px",
                  }}
                />
              </Display>

              <Display active={active} label={"Model Appaeil"}>
                <AllModelAppaeil />
              </Display>

              <Display active={active} label={"Utilisateurs"}>
                <Utilisateurs />
              </Display>

              <Display active={active} label={"Commandes"}>
                <AllCommande />
              </Display>

              <Display active={active} label={"Analytics"}>
                <Analytics />
              </Display>

              <Display active={active} label={"Messages"}>
                <Messages />
              </Display>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Dashboard;