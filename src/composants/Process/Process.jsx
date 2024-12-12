import "./Process.css"
import StepCard from "../StepCard/StepCard";
import account from "/image/account.svg"
import analyse from "/image/analyse.svg"
import interpretation from "/image/data-analysis.svg"
import loop from "/image/loop.svg"
import delivery from "/image/delivery.svg"
import build from "/image/build.svg"
import { useState } from "react";
import { useEffect } from "react";
import processImage from "../../assets/process.png"
/*import appareil from "../../assets/appareil.jpeg";
import disjonteur from "../../assets/disjoncteur.png";*/

function Process(){

    const steps = [
        {
            num: "1",
            img: account,
            titre: "Créer un compte",
            description: "Permet d'accéder au formulaire de commande."
        },
        {
            num: "2",
            img: analyse,
            titre: "Réception et analyse",
            description: "Nous analysons les empreintes du patient."
        },
        {
            num: "3",
            img: interpretation,
            titre: "Interprétation ",
            description: "Plan de conception basé sur la prescription."
        },
        {
            num: "4",
            img: build,
            titre: "Fabrication de l'appareil",
            description: "Fabrication avec technologie de pointe et matériaux de qualité."
        },
        {
            num: "5",
            img: loop,
            titre: "Contrôle qualité",
            description: "Chaque appareil est vérifié pour conformité et qualité."
        },
        {
            num: "6",
            img: delivery,
            titre: "Livraison et support",
            description: "Nous livrons l'appareil et répondons à vos questions."
        }
    ];

    const [scrolling, setScrolling] = useState(false);
    const [scroll, setScroll] = useState(false);
      
        const handleScroll = () => {
          setScrolling(window.scrollY > 450); 
        };

        const handleScrollResume = () => {
            setScroll(window.scrollY > 1100); 
          };
      
        useEffect(() => {
          window.addEventListener('scroll', handleScroll);
          return () => {
            window.removeEventListener('scroll', handleScroll);
          };
        }, []); 

        useEffect(() => {
            window.addEventListener('scroll', handleScrollResume);
            return () => {
              window.removeEventListener('scroll', handleScrollResume);
            };
          }, []);
    
    return(
       <div className="process-content">
       
        <div className="container">
                
            <div className={scrolling?"process-titre process-show":"process-titre process-hide"}>
                <h1> Notre process </h1>
                <p>
                 Notre workflow est conçu pour offrir un service de qualité et une expérience fluide
                aux orthodontistes à travers un flux de travail entièrement numérique.
                </p>
            </div>
            <div className={scrolling?"process process-show":"process-hide"}>
                     {
                             steps.map((step)=>(
                             <StepCard data={step} key={step.num}/>
                            ))
                        }
            </div>
            <div className={scroll?"process-resume process-show":"process-resume process-hide" }>
                    
                <div className="process-1">       
                 <p>
                     <span className="important">La création de votre compte</span> vous donne accès au <span className="important">formulaire de commande</span>, avec un accompagnement à chaque étape si nécessaire. Nous <span className="important">analysons les empreintes</span> pour comprendre la situation dentaire, interprétons la prescription et établissons un <span className="important">plan de conception</span> pour l’appareil. Nous utilisons des <span className="important">technologies de pointe</span> et des matériaux de qualité, avec un <span className="important">contrôle qualité rigoureux</span> pour garantir la conformité. Enfin, nous assurons la <span className="important">livraison</span> et restons disponibles pour toute question.
                </p>

                 </div>
                <div className="process-2">
                      <img src={processImage} alt="process_image" className="icon" />
                </div>
            </div>
            </div>
       </div>
    )
}

export default Process;