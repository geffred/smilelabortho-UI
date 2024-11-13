import Navbar from "../../composants/NavBar/NavBar"
import SectionBanner from "../../composants/SectionBanner/SectionBanner"
import SectionCard from "../../composants/SectionCard/SectionCard";
import bg from '../../assets/process.png'
import './Services.css'
import Footer from "../../composants/Footer/Footer"
import { NavLink } from "react-router-dom";
import logo_smilelab from "/image/logo_smilelab.svg"


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
              style={{height:"300px"}}
        />
             
             <div className="service-wrap">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-5 col-12">
                            <NavLink to={"/services/fritage-laser"}>
                                <SectionCard
                                title={services[0].title}
                                description={services[0].description}
                                />
                            </NavLink>
                            
                            <NavLink to={"/services/service-digital"}>
                                <SectionCard
                                title={services[2].title}
                                description={services[2].description}
                                />
                            </NavLink>

                            <NavLink to={"/services/"+2}>
                                <SectionCard
                                title={services[1].title}
                                description={services[1].description}
                                />
                            </NavLink>
                           
                        </div>
                        <div className="col-lg-7 col-12">
                            <div className="logo">
                                <img src={logo_smilelab} alt="logo_icon" />
                                <span>Smile <span className="lab">lab</span></span>
                            </div>
                            <img src={"https://cdn.prod.website-files.com/650d7a01e78ac2553e602055/650edb3ead757160aa91eaf3_3d-printing.jpeg"} alt="banner" className="section-banner" />
                        </div>
                    </div>
                    
                </div>
             </div>

             <Footer/>

        </div>
    )
}

export default Services;