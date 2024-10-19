import logo_smilelab from "/image/logo_smilelab_bg.svg"
import shop from "/image/shop.svg"
import arrow from "/image/arrow.svg"
import "./NavBar.css"
import user from "/image/user.svg"
import menu from "/image/menu.svg"
import { useState } from "react"

function NavBar(){

    

    return (
        <nav className="navBar">
            <div className="left-section">
                <img src={logo_smilelab} alt="logo_smilelab"/>
                <span>Smile <span className="lab">lab</span> </span>
            </div>

            <div className="center-section">
                <ul>
                    <li><a href="#">Acceuil</a></li>
                    <li>
                         <a href="#service">
                            <span>Services</span>
                            <img src={arrow} alt="arrow" width={15} />
                        </a>
                         
                    </li>
                    <li>
                         <a href="#service">
                            <span>Appareils</span>
                            <img src={arrow} alt="arrow" width={15} />
                        </a>
                         
                    </li>
                    <li><a href="#">Contact</a></li>
                    <li>
                       <a href="#" className="shop">
                            <img src={shop} alt="Boutique" />
                            <span>Shop</span>
                        </a>
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