import logo_smilelab from "/image/logo_smilelab_bg.svg"
import shop from "/image/shop.svg"
import arrow from "/image/arrow.svg"
import "./NavBar.css"
import user from "/image/user.svg"
import menu from "/image/menu.svg"
import { useState } from "react"
import { useEffect } from "react"
import { NavLink } from "react-router-dom"

function NavBar(){

        const [scrolling, setScrolling] = useState(false);
      
        const handleScroll = () => {
          setScrolling(window.scrollY > 100); 
        };
      
        useEffect(() => {
          window.addEventListener('scroll', handleScroll);
      
         
          return () => {
            window.removeEventListener('scroll', handleScroll);
          };
        }, []);  

    return (
        <nav className="navBar" style={scrolling?{background:"rgba(0, 0, 0, 0.8)"}:null}>
            <div className="left-section">
                <img src={logo_smilelab} alt="logo_smilelab"/>
                <span>Smile <span className="lab">lab</span> </span>
            </div>

            <div className="center-section">
                <ul>
                    <li><NavLink to="/">Acceuil</NavLink></li>
                    <li>
                         <NavLink to="/services">
                            <span>Services</span>
                            <img src={arrow} alt="arrow" width={15} />
                        </NavLink>
                         
                    </li>
                    <li>
                         <NavLink to="/appareils">
                            <span>Appareils</span>
                            <img src={arrow} alt="arrow" width={15} />
                        </NavLink>
                         
                    </li>
                    <li><NavLink to="/contact">Contact</NavLink></li>
                    <li>
                       <NavLink to="/shop" className="shop">
                            <img src={shop} alt="shop" />
                            <span>Shop</span>
                        </NavLink>
                    </li>
                </ul>
            </div>

            <div className={"right-section"}>
                <div>
                    <img src={user} alt="user" width={25} />
                    <ul>
                        <li><a href="#">Inscription</a></li>
                        <li><a href="#">Connexion</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;