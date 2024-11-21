
import user_icon from "/image/user-profil.svg"
import location_profil from "/image/location-profil.svg"
import order from "/image/order-profil.svg";
import settings from "/image/settings.svg"
import "./menu_profil.css"
import { useState } from "react"

function MenuProfil({active , handleClick}){

    const menu = [
      {
        id: 1,
        title: "profil",
        icon: user_icon,
      },

      {
        id: 3,
        title: "paramètres",
        icon: settings,
      },
      {
        id: 2,
        title: "Commandes",
        icon: order,
      },
    ];

    return(
        <aside className="menu_profil">
               {
                menu.map((item) => (
                    <a href="#"
                     key={item.id}
                     className={active === item.title? "line menu_profil-active":"line"}
                     onClick={() =>handleClick(item.title)}>
                        <img src={item.icon} alt={item.title} width={30} />
                        <span>{item.title}</span>
                    </a>
                ))
 
               }
        </aside>
    )
}

export default MenuProfil;