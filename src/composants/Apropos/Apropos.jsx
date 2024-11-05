import apropos_image from "../../assets/apropos_image.jpeg"
import "./apropos.css"

function Apropos(){


    return (
        <div className= {"apropos container-fluid"}  >
            <div className="row">
                <div className="col-lg-6 col-12 b-1">
                    <img src={apropos_image} alt="smile"/>
                </div>
                <div className="col-lg-6 col-12 b-2">
                    <p>
                        <span className="important">Smile Lab</span> est un 
                        <span className="important"> laboratoire spécialisé </span> dans la
                        <span className="important"> conception d'appareils 
                        dentaires</span> de haute qualité. Nous proposons une gamme complète de services,
                        incluant des <span className="important">appareils frittés, imprimés, hybrides, amovibles, </span> ainsi que
                        des contentions orthodontiques au fritage laser, un service digital et du
                        blanchiment dentaire. Notre <span className="important">équipe professionnelle</span> 
                        est toujours disponible pour répondre à vos besoins et vous accompagner dans la 
                        création de <span className="important">sourires éclatants</span> !
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Apropos;