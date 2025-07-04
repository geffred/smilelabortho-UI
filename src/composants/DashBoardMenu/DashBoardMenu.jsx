import logo from "/image/logo_smilelab_bg.svg"
import "./DashBoardMenu.css"
import right from "/image/arrow-next.svg"
import user from "/image/user-circle.svg"
import teeth from "/image/teeth.svg"
import device from "/image/device.svg"
import order from "/image/order.svg"
import analytics from "/image/analytics.svg"
import circle from "/image/circle.svg"
import chat from "/image/chat.svg";

import { useEffect, useState } from "react";

const data = [
  {
    id: crypto.randomUUID(),
    title: "Messages",
    icon: chat,
  },

  {
    id: crypto.randomUUID(),
    title: "Utilisateurs",
    icon: user,
  },
  {
    id: crypto.randomUUID(),
    title: "Catégories",
    icon: teeth,
  },
  {
    id: crypto.randomUUID(),
    title: "Appareils",
    icon: device,
  },
  {
    id: crypto.randomUUID(),
    title: "Modèles d'appareils",
    icon: circle,
  },
  {
    id: crypto.randomUUID(),
    title: "Commandes",
    icon: order,
  },
  {
    id: crypto.randomUUID(),
    title: "Analytics",
    icon: analytics,
  },
];


function DashBoardMenu({handleClick , isActive}) {

    return (
        <div>
            <nav className="DashBoardMenu">

                {
                    data.map((info)=>{
                        return <a href="#" key={info.id} onClick={()=>handleClick(info.title)}  className={isActive==info.title ? "line active":"line"}>
                        <div className="icon">
                            <img src={info.icon} alt="Services" width={40} height={40} />
                        </div>
                        <span>{info.title} </span>
                        <img src={right} alt="arrow-right" width={20} className="arrow icon-icon"/>
                    </a>
                    })
                }

            </nav>
        </div>
    );
}

export default DashBoardMenu;
