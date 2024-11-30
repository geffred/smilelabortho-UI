import logo_smilelab from "/image/logo_smilelab.svg";
import shop from "/image/shop.svg";
import arrow from "/image/arrow.svg";
import "./NavBar.css";
import usernav from "/image/user.svg";
import menu from "/image/menu.svg";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../composants/UserContext";

function NavBar({
  dashboard = false,
  compte = false,
  bgColor = "rgba(0, 0, 0, 0.5)",
  bgColorScroll = "rgba(0, 0, 0, 0.8)",
  logoTextColor,
}) {
  const [scrolling, setScrolling] = useState(false);
  const { user, logoutUser } = useContext(UserContext); // Utiliser le contexte utilisateur


  const handleScroll = () => {
    setScrolling(window.scrollY > 100);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className="navBar"
      style={
        scrolling ? { background: bgColorScroll } : { background: bgColor }
      }
      id="form"
    >
      <NavLink to={"/"} className="left-section">
        <div className="logo-container">
          <img src={logo_smilelab} alt="logo_smilelab" />
        </div>
        <span>
          Smile <span className="lab">lab</span>
        </span>
      </NavLink>

      <div className="center-section">
        <ul>
          <li>
            <NavLink to="/">Acceuil</NavLink>
          </li>
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
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
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
          <img src={usernav} alt="user" width={25} className="user" />
          <ul>
            {/* Afficher le lien vers le Dashboard si l'utilisateur a le rôle ROLE_ADMIN */}
            {user && user.roles.includes("ROLE_ADMIN") && ( 
              <li>
                <NavLink to={"/dashboard"}>Dashbord</NavLink>
              </li>
            )}

            {/* Afficher les options de connexion/déconnexion en fonction de l'état de l'utilisateur */}
            {!user ? (
              <>
                <li>
                  <NavLink to="/inscription">Inscription</NavLink>
                </li>
                <li>
                  <NavLink to="/connexion">Connexion</NavLink>
                </li>
              </>
            ) : (
              <>
                {/* Afficher le lien vers le compte */}
                <li>
                  <NavLink to="/profil">Compte</NavLink>
                </li>
                {/* Afficher le lien de déconnexion */}
                <li>
                  <NavLink to="/" onClick={logoutUser}>
                    Déconnexion
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
