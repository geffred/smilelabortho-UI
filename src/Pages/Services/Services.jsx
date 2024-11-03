import Navbar from "../../composants/NavBar/NavBar"
import SectionBanner from "../../composants/SectionBanner/SectionBanner"
import SectionCard from "../../composants/SectionCard/SectionCard";
import bg from '../../assets/process.png'
import './Sercices.css'
import Footer from "../../composants/Footer/Footer"
import Notification from "../../composants/Notification/Notification";


function Services(){
    const services = [
        {
            id:0,
            title:"Frittage laser",
            description:"Le frittage laser est un procédé de fabrication additive innovant et relativement récent qui permet de créer des objets solides en utilisant un laser pour fondre et fusionner des matériaux en poudre."
        },
        {
            id:1,
            title:"impression metal",
            description:"Le frittage laser est un procédé de fabrication additive innovant et relativement récent qui permet de créer des objets solides en utilisant un laser pour fondre et fusionner des matériaux en poudre."
        },
        {
            id:2,
            title:"Servide digital",
            description:"Chez Smile Lab, nous sommes fiers de notre équipe d’experts en prothèses dentaires spécialisés en conception assistée par ordinateur (CAO). Notre département d’impression 3D/CAO utilise exclusivement les dernières technologies de l’industrie, ce qui nous permet de vous fournir des produits de haute qualité avec des délais d’exécution plus courts."
        }
    ]
    return (
        <div className="services">
             <Navbar/>
             <SectionBanner
              image={bg}
              title={"Servives"}
              description={"Le frittage laser est un procédé de fabrication additive innovant et relativement récent qui permet de créer des objets solides en utilisant un laser pour fondre et fusionner des matériaux en poudre."}/>
             
             <div className="service-wrap">
                <Notification/>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <SectionCard
                            title={services[0].title}
                            description={services[0].description}
                            />
                        </div>
                        <div className="col-lg-6">
                            <SectionCard
                            title={services[1].title}
                            description={services[1].description}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <dir className="col-lg-12">
                            <SectionCard
                            title={services[2].title}
                            description={services[2].description}
                            />
                        </dir>
                    </div>
                </div>
             </div>

             <Footer/>

        </div>
    )
}

export default Services;