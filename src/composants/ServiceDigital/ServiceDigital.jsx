import "./ServiceDigital.css"
import pc from "/image/pc.svg"
import archive from "/image/archive.svg"
import align from "/image/align.svg"
import paste from "/image/paste.svg"
import focus from "/image/focus.svg"
import help from "/image/help.svg"

const DigitalItem = ({icon , title , text})=>{
    return(
        <div className="digitalItem">
            <div>
                <img src={icon} alt="pc_icon" width={35} className="icon-icon" />
                <h1> {title} </h1>
            </div>
            <p>
                {text}
            </p>
        </div>
    )
}

const serviceDigitalList = [
    {
        icon: pc,
        title: "Impression numériques en 3D",
        text: "Nous utilisons des scanners de pointe pour capturer avec précision les modèles dentaires et réaliser des impressions numériques en 3D."
    },
    {
        icon: archive,
        title: "Modèles d’études numériques et archivage",
        text: "Nous créons des modèles numériques pour faciliter l’étude des cas et assurer un archivage pratique de vos dossiers dentaires."
    },
    {
        icon: align,
        title: "Aligneurs transparents",
        text: "Grâce à notre expertise en CAO, nous concevons et produisons des aligneurs transparents sur mesure pour un traitement orthodontique discret et efficace."
    },
    {
        icon: paste,
        title: "Collage indirect numérique",
        text: "Nous utilisons des techniques avancées de collage indirect numérique pour des restaurations dentaires de qualité supérieure."
    },
    {
        icon: focus,
        title: "Contentions nocturnes imprimées avec une grande précision",
        text: "Nos technologies d’impression 3D nous permettent de fabriquer des contentions nocturnes sur mesure avec une précision exceptionnelle."
    },
    {
        icon: help,
        title: "Guides chirurgicaux ",
        text: "Nous concevons et produisons des guides chirurgicaux personnalisés pour faciliter les procédures dentaires complexes."
    }
]

function ServiceDigital(){
    return(
        <div className="ServiceDigital">
            {
                serviceDigitalList.map((serviceDigital)=>{
                    return <div key={crypto.randomUUID()}><DigitalItem {...serviceDigital}/></div>
                })
            }
        </div>
    )
}

export default ServiceDigital;