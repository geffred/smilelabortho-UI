import NavBar from "../../composants/NavBar/NavBar";
import DashBoardMenu from "../../composants/DashBoardMenu/DashBoardMenu";
import "./Dashboard.css"
import { useState } from "react";
import Display from "../../composants/Display/Display";
import AllCategorie from "../../composants/AllCategorie/AllCategorie";
import CategorieInput from "../../composants/CategorieInput/CategorieInput";

function Dashboard(){
    const [active , setActive] = useState(0)
    const handleClick = (select)=>{
        setActive(select)
        console.log(select)
    }

    const [data,setData] = useState(null)

    return(
        <div>
            <NavBar bg="#262626" />
            <div className="Dashboard container-fluid">
                
                <div className="row">
                    <div className="col-lg-4 col-12 px-1">
                        <DashBoardMenu isActive={active} handleClick={handleClick} />
                    </div>
                    <div className="col-lg-8 px-1">
                        <Display active={active} label={"Categories"}>
                            <AllCategorie isDashboard={true} style={{transform:"translateY(0px)",border:"none",paddingTop:"15px"}}/>
                        </Display>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Dashboard;