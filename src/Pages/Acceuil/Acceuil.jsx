import Banner from "../../composants/Banner/Banner"
import Footer from "../../composants/Footer/Footer"
import NavBar from "../../composants/NavBar/NavBar"
import Apropos from "../../composants/Apropos/Apropos"
import Process from "../../composants/Process/Process"
import Map from "../../composants/Map/Map"
import Connect from "../../composants/Connect/Connect"
import AllCategorie from "../../composants/AllCategorie/AllCategorie"
import About from "../../composants/About/About"
import Appareil from "../../composants/Appareil/Appareil"
import AllAppareil from "../../composants/AllAppareil/AllAppareil"

const cards = [
    {
        "id":0,
        "date":"26 Mars 2024",
        "src":"../../src/assets/process.png",
        "name":"Son Goku",
        "legend":"Goku est le héros de Dragon Ball, un Saiyan passionné de combat,toujours en quête de devenir plus fort pour protéger la Terre."
    },
    {
        "id":1,
        "date": "15 Août 2023",
        "src": "/p../../src/assets/process.png",
        "name": "Vegeta",
        "legend": "Vegeta est un prince Saiyan rival de Goku, souvent arrogant mais incroyablement puissant. Son obsession est de surpasser Goku et de prouver sa propre valeur."
    },
    {
        "id":2,
        "date": "3 Mai 2025",
        "src": "/../../src/assets/process.png",
        "name": "Gohan",
        "legend": "Gohan est le fils de Goku et l'un des personnages principaux de Dragon Ball. Bien qu'il préfère la paix à la violence, il possède un immense potentiel de combat et a sauvé la Terre à plusieurs reprises."
    }
       
  ]

function Acceuil(){
    return(
        <div className="app">
        <NavBar dashboard={true} />
        <Banner/>
        <Apropos/> 
        <Process/>
        <Connect/>
        <AllCategorie />
        <About/>
        <Map/> 
        <Footer/> 
     </div>
    )
}

export default Acceuil;