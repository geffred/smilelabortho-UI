import Banner from "../../composants/Banner/Banner"
import Footer from "../../composants/Footer/Footer"
import NavBar from "../../composants/NavBar/NavBar"
import Apropos from "../../composants/Apropos/Apropos"
import Process from "../../composants/Process/Process"
import Map from "../../composants/Map/Map"
import Connect from "../../composants/Connect/Connect"
import AllCategorie from "../../composants/AllCategorie/AllCategorie"


function Acceuil(){
    return(
        <div className="app">
        <NavBar dashboard={true} />
        <Banner/>
        <Apropos/> 
        <Process/>
        <Connect/>
        <AllCategorie />
        <Map/> 
        <Footer/> 
     </div>
    )
}

export default Acceuil;