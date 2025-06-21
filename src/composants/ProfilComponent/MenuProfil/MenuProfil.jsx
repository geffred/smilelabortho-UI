
import user_icon from "/image/user-profil.svg"
import order from "/image/order-profil.svg";
import settings from "/image/settings.svg"
import "./menu_profil.css"
import message_icon from "/image/chat.svg";


function MenuProfil({active , handleClick}){

    const menu = [
      {
        id: 1,
        title: "Profil",
        icon: user_icon,
      },

      {
        id: 2,
        title: "Paramètres",
        icon: settings,
      },
      {
        id: 3,
        title: "Commandes",
        icon: order,
      },
      {
        id: 4,
        title: "Messages",
        icon: message_icon,
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
                        <img src={item.icon} alt={item.title} width={30} className="icon-icon" />
                        <span>{item.title}</span>
                    </a>
                ))
 
               }
        </aside>
    )
}

export default MenuProfil;