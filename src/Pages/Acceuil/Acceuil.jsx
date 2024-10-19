import Banner from "../../composants/Banner/Banner"
import Footer from "../../composants/Footer/Footer"
import NavBar from "../../composants/NavBar/NavBar"
import Apropos from "../../composants/Apropos/Apropos"

function Acceuil(){
    return(
        <div className="app">
        <NavBar/>
        <Banner/>
        <Apropos/> 
        <Footer/> 
     </div>
    )
}

export default Acceuil;