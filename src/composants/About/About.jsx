import './About.css'
import image from "../../assets/process.png"
import { useEffect, useState } from "react";

function About(){

    const [scrolling, setScrolling] = useState(false);
      
        const handleScroll = () => {
          setScrolling(window.scrollY > 2200); 
        };
      
        useEffect(() => {
          window.addEventListener('scroll', handleScroll);
      
         
          return () => {
            window.removeEventListener('scroll', handleScroll);
          };
        }, []); 

    return (
        <div className={scrolling?"About about-show":"About about-hide"}>

            <img src={image} alt="articleImage" />

            <h1>
                À Propos - Smile Lab
            </h1>

            <p>
                Chez Smile Lab, nous travaillons avec passion en utilisant aussi
                bien des procédés innovants, de haute technologie que des appareils
                plus conventionnels. En tant qu’entreprise familiale, nous nous 
                efforçons d’établir des relations de confiance afin que les orthodontistes
                puissent créer le meilleur sourire possible à leurs patients.
                Smile Lab propose une gamme complète de services, comprenant des appareils
                numériques imprimés en métal ou en résine, des gouttières d’alignement, des
                dispositifs orthopédiques et des appareils de stabilisation. 
            </p>

            <p>
                Notre processus numérique permet d’optimiser l’efficacité et la précision, 
                tout en garantissant des appareils orthodontiques de haute qualité pour vos
                patients. Nous sommes engagés à vous fournir un service personnalisé et à être
                disponibles pour répondre à tous vos besoins.
                Nous sommes en mesure de recevoir des numérisations provenant de toute la Belgique
                et nous garantissons une livraison rapide.
            </p>
            
        </div>
    )
}

export default About;