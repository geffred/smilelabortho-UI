import Banner from "../../composants/Banner/Banner"
import Footer from "../../composants/Footer/Footer"
import NavBar from "../../composants/NavBar/NavBar"
import Apropos from "../../composants/Apropos/Apropos"
import Process from "../../composants/Process/Process"
import Map from "../../composants/Map/Map"

function Acceuil(){
    return(
        <div className="app">
        <NavBar/>
        <Banner/>
        <Apropos/> 
        <Process/>
        <Map/> 
        <Footer/> 
     </div>
    )
}

export default Acceuil;