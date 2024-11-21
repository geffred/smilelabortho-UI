import NavBar from "../../composants/NavBar/NavBar";
import "./ServicePage.css"
import bg from '../../assets/process.png'
import SectionBanner from "../../composants/SectionBanner/SectionBanner";
import { useParams } from "react-router-dom";
import Footer from "../../composants/Footer/Footer"
import ServiceDigital from "../../composants/ServiceDigital/ServiceDigital";
import archive from "/image/archive.svg"
import scan from "../../assets/scan.jpg"
import ib from "../../assets/Indirect-bonding.jpeg"
import bonding from "../../assets/bonding-tray.jpg"
import digital from "../../assets/archive.jpg"
import scandental from "../../assets/scan-dental.jpg"

function ServicePage(){
    const {id} = useParams()
    console.log("l'id vaut ",id)
    return(
        <div className="ServicePage">
            <NavBar/>
            <SectionBanner
              image={bg}
              title={id}
              />

             {id==="fritage-laser" && <div className="service-1">
                   <div className="container block-1">
                    <div className="row">
                            <div className="col-lg-12">
                                <h1>Le frittage laser</h1>
                                <p>Le frittage laser est un procédé de fabrication additive innovant et relativement récent qui permet de créer des objets solides en utilisant un laser pour fondre et fusionner des matériaux en poudre.</p>
                            </div>
                            <div className="col-lg-6 col-12">
                                <h1>Le procédé</h1>
                                <p>Le procédé consiste à répandre une fine couche de poudre de matériau sur une 
                                    plate-forme, puis à utiliser un faisceau laser de haute énergie pour chauffer
                                    sélectivement les zones de la poudre qui doivent être fusionnées. Lorsque la 
                                    poudre fond, les particules se lient pour former une couche solide.
                                    Le processus est répété couche par couche jusqu’à ce que l’objet final soit 
                                    créé. Le frittage laser est souvent utilisé dans des industries telles que 
                                    ’aérospatiale, l’automobile et la médecine.</p>
                            </div>
                            <div className="col-lg-6 col-12">
                                <h1>Dentisterie</h1>
                                <p>En dentisterie, le frittage laser est utilisé pour la fabrication de prothèses
                                    dentaires en céramique ou en métal. Dans le cas d’une poudre en métal, cette
                                    technique est appelée le frittage sélectif par laser (FSL) de poudres 
                                    métalliques et elle est utilisée pour la fabrication de restaurations dentaires
                                    telles que les couronnes, les stellites et les appareils orthodontiques en métal.
                                </p>
                            </div>
                            <div className="col-lg-12 cover">
                                <img src={"https://www.dentalemergence.com/public/img/big/P10203981600x1200JPG_5dab700173ae2.JPG"} alt="fritage_laser" className="img-fluid" />
                            </div>
                    </div>
                   </div>

                   <div className="block-2">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 ">
                                    <div className="im1"><img src={"https://smilelabortho.be/wp-content/uploads/elementor/thumbs/service-impression-metal-q7oa8qfnowi1lo7d4n1fc4e1c170eht1pckubdpa00.jpg"} alt="" /></div>
                                    <div className="im2"><img src={"https://img.facfox.com/imgs/2022/02/a057fe2f7ffcbf78.png"} alt="" /></div>
                                </div>
                                <div className="col-lg-6">
                                    <div>
                                        <h1>Processus</h1>
                                        <p>Le processus commence par la numérisation 3D de
                                            l’arcade ou de l’empreinte dentaire du patient,
                                            qui est ensuite envoyée à un logiciel de conception 
                                            assistée par ordinateur (CAO). Le dentiste, l’orthodontiste
                                            ou le prothésiste utilise le CAO pour concevoir le dispositif 
                                            dentaire sur ordinateur, en prenant en compte la forme, la 
                                            taille des dents ou de l’arcade complète du patient.
                                        </p>
                                    </div>

                                    <div>
                                        <h1>L’impression</h1>
                                        <p>Ensuite, la conception est envoyée à une machine qui réalise l’impression.
                                            un ou plusieurs faisceaux laser sont utilisés pour chauffer la poudre
                                            métallique à une température élevée, provoquant la fusion des particules
                                            métalliques ensemble pour former la pièce solide. Ce processus est répété
                                            couche par couche jusqu’à ce que la prothèse soit complètement formée.
                                            La pièce imprimée est placée dans une chambre de frittage, où un laser est
                                            utilisé pour chauffer la céramique à une température élevée. Le faisceau 
                                            laser cible la surface de la pièce formée, chauffant et fusionnant les 
                                            particules de métal ensemble pour former une pièce solide.
                                        </p>
                                        <p>
                                            Le processus de frittage laser est de plus en plus utilisé en dentisterie en
                                            raison de sa précision et de sa capacité à produire des pièces complexes en 
                                            métal avec des propriétés mécaniques élevées. De plus, il permet de réaliser 
                                            des pièces de plus grande taille tout en conservant une grande précision.
                                        </p>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                   </div>
            
              </div> 
             }

             {
                id =="service-digital" && <div className="service-2">
                    <div className="container py-4">
                        <div className="row">
                            <div className="col-12">
                                <h1>Service Digital</h1>
                                <p>
                                    Chez Smile Lab, nous sommes fiers de notre équipe d’experts
                                    en prothèses dentaires spécialisés en conception assistée par
                                    ordinateur (CAO). Notre département d’impression 3D/CAO utilise
                                    exclusivement les dernières technologies de l’industrie, ce qui
                                    nous permet de vous fournir des produits de haute qualité avec
                                    des délais d’exécution plus courts. Voici certains des services
                                    que nous proposons :
                                </p>
                            </div>
                        </div>
                    </div>
                    <ServiceDigital/>
                    <div className="container">
                        <div className="row">
                            <p className="invitation">
                                <img src={"https://everysmile.co.za/wp-content/uploads/2024/06/Revolutionizing-Dentistry_-How-3D-Printing-is-Transforming-Dental-Care.webp"} alt="labo_icon" />
                                 Nous vous invitons chaleureusement à visiter notre laboratoire dentaire
                                 numérique pour découvrir ces technologies de pointe en action.
                                  De plus, nous proposons la livraison de nos produits en Belgique et 
                                  dans toute l’Europe de l’Ouest.N’hésitez pas à nous contacter pour de
                                  plus amples informations ou pour passer commande. Nous sommes impatients
                                  de pouvoir vous offrir nos services de qualité et de vous accompagner dans
                                  vos besoins dentaires.
                            </p>
                        </div>
                    </div>
                    <div className="container rubrique">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="im1"><img src={bonding} alt="labo_icon"  className="img-fluid" /></div>
                                <div className="im1"><img src={ib} alt="labo_icon"  className="img-fluid" /></div>
                            </div>
                            <div className="col-lg-6">
                                <h1>Indirect Bonding</h1>
                                <p>
                                    Le collage indirect est une technique qui améliore considérablement
                                    la précision du placement des brackets grâce à l’utilisation de la
                                    technologie numérique et d’un transfert de brackets.
                                </p>
                                <p>
                                    Comme de nombreux orthodontistes en sont conscients, le temps passé 
                                    avec chaque patient est précieux. En adoptant un flux de travail 
                                    numérique et en utilisant le bracketing indirect, vous pourrez voir 
                                    davantage de patients tout au long de la journée, car l’application 
                                    des brackets se fait deux fois plus rapidement qu’avec une méthode 
                                    traditionnelle. Notre logiciel est intégré à plus de 550 bibliothèques
                                    de brackets et de formes d’arc provenant de plus de 25 fournisseurs
                                    différents. Cette méthode est sans aucun doute la plus confortable pour
                                    tous les patients.
                                </p>
                                <p>
                                    Le collage indirect offre une précision accrue grâce à la planification
                                    numérique du positionnement des brackets, ce qui permet d’obtenir des
                                    résultats plus fiables et plus efficaces. De plus, en utilisant un transfert 
                                    de brackets, la pose des brackets devient plus simple et plus fluide, réduisant
                                    ainsi le temps passé au fauteuil pour le patient.
                                </p>
                                <p>
                                    Nous sommes convaincus que le passage au collage indirect vous permettra d’améliorer
                                    votre pratique et de mieux répondre aux besoins de vos patients. N’hésitez pas à nous
                                    contacter pour en savoir plus sur cette technique révolutionnaire et découvrir comment
                                    elle peut bénéficier à votre cabinet dentaire ou orthodontique.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="container rubrique py-5">
                        <div className="row">
                            <div className="col-lg-6">
                                <h1>3D Printing and Scanning</h1>
                                <p>
                                    Chez Smile Lab, nous sommes enthousiastes à l’idée d’inaugurer une
                                    nouvelle ère de dentisterie en offrant des solutions dentaires 
                                    numériques de pointe, notamment l’impression et la numérisation 3D.
                                    Grâce à la technologie de notre laboratoire, nous sommes en mesure 
                                    de convertir tout scan ou empreinte physique en un modèle imprimé en 3D.
                                </p>
                                <p>
                                    Il vous suffit de nous envoyer un scan, ce qui est aussi simple que 
                                    d’envoyer un e-mail ou votre empreinte physique. Dès réception de votre
                                    empeinte, nous le scannons  et l’intégrons à votre système. Notre technologie
                                    est capable de produire des modèles en résine de haute qualité pour répondre
                                    à toutes les applications. Cela fait partie intégrante de notre gamme complète de services de dentisterie numérique visant à fournir à nos clients les meilleurs appareils orthodontiques fixes et amovibles.
                                </p>
                            </div>
                            <div className="col-lg-6">
                                <div className="im3"><img src={scan} alt="labo_icon"  className="img-fluid" /></div>
                            </div>
                        </div>
                    </div>
                    <div className="container rubrique">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="im1"><img src={digital} alt="labo_icon"  className="img-fluid" /></div>
                                <div className="im1"><img src={scandental} alt="labo_icon"  className="img-fluid" /></div>
                            </div>
                            <div className="col-lg-6">
                                <h1>Digital Archiving</h1>
                                <p>
                                     Découvrez une nouvelle manière de gérer vos modèles d’étude et libérez de 
                                     l’espace précieux dans votre clinique. En optant pour la numérisation et 
                                     l’archivage numérique de vos anciens modèles d’étude en plâtre, vous aurez
                                     un accès instantané à tous les dossiers de vos patients en les intégrant à
                                     votre logiciel de gestion des patients. Si nécessaire, nous sommes également
                                     en mesure d’imprimer des modèles physiques à partir des données numériques.
                                     Tout cela se fait en trois étapes simples :
                                </p>
                                <p className=" archive px-4">
                                    <ul>
                                        <li className="py-1">
                                            <img src={archive} alt="archive" width={40}/>
                                            <span>Nous récupérons gratuitement tous vos modèles.</span>
                                        </li>
                                        <li className="py-1">
                                            <img src={archive} alt="archive" width={40}/>
                                            <span>Chaque ensemble de modèles est numérisé à l’aide de notre logiciel, créant ainsi une représentation 3D précise du modèle d’origine.</span>
                                        </li>
                                        <li className="py-1">
                                            <img src={archive} alt="archive" width={40}/>
                                            <span>Les fichiers numériques sont ensuite envoyés via un lien sécurisé ou une clé USB, vous permettant d’y accéder et de les visualiser avec <em><b>orthoviewer</b></em> </span>
                                        </li>
                                    </ul>
                                </p>
                                <p>
                                    Profitez de cette opportunité pour simplifier la gestion de vos modèles d’étude
                                    tout en optimisant votre espace de travail. N’hésitez pas à nous contacter pour
                                    obtenir plus d’informations ou pour planifier la numérisation de vos modèles.
                                    Nous serions ravis de vous accompagner dans cette transition numérique.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
             }
              <Footer/>
        </div>
    )
}

export default ServicePage;