import logo from "/image/apropos.png"
import { useState } from "react";
import { useEffect } from "react";
import "./apropos.css"

function Apropos(){

    const [scrolling, setScrolling] = useState(false);
      
        const handleScroll = () => {
          setScrolling(window.scrollY > 50); 
        };
      
        useEffect(() => {
          window.addEventListener('scroll', handleScroll);
      
         
          return () => {
            window.removeEventListener('scroll', handleScroll);
          };
        }, []); 

    return (
        <div className= {scrolling?"apropos show ":"apropos hide"}  >
            <div className="b-1">
                <img src={logo} alt="smile"/>
            </div>
            <div className="b-2">
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
    )
}

export default Apropos;