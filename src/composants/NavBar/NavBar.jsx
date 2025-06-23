import shop from "/image/shop.svg";
import arrow from "/image/arrow.svg";
import "./NavBar.css";
import smilelab from "/public/image/smilelab_white.svg";
import usernav from "/image/user.svg";
import menu from "/image/menu.svg";
import close from "/image/close.svg";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logoutUser } = useContext(UserContext);

  const handleScroll = () => {
    setScrolling(window.scrollY > 100);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        className="navBar"
        style={
          scrolling ? { background: bgColorScroll } : { background: bgColor }
        }
        id="form"
      >
        <div className="mobile-header">
          <button className="menu-toggle" onClick={toggleMobileMenu}>
            <img src={mobileMenuOpen ? close : menu} alt="menu" width={25} />
          </button>

          <NavLink to={"/"} className="left-section">
            <img src={smilelab} alt="smilelab_white" width={250} />
          </NavLink>
        </div>

        <div className={`center-section ${mobileMenuOpen ? "open" : ""}`}>
          <ul>
            <li>
              <NavLink to="/" onClick={() => setMobileMenuOpen(false)}>
                Accueil
              </NavLink>
            </li>
            <li>
              <NavLink to="/services" onClick={() => setMobileMenuOpen(false)}>
                <span>Services</span>
                {/*<img src={arrow} alt="arrow" width={15} />*/}
              </NavLink>
            </li>
            <li>
              <NavLink to="/appareils" onClick={() => setMobileMenuOpen(false)}>
                <span>Appareils</span>
                {/*<img src={arrow} alt="arrow" width={15} />*/}
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/shop"
                className="shop"
                onClick={() => setMobileMenuOpen(false)}
              >
                <img src={shop} alt="shop" />
                <span>Shop</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/contact" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </NavLink>
            </li>

            {/* Liens d'authentification uniquement visibles en mobile */}
            <div className="mobile-auth-links">
              {!user ? (
                <>
                  <li className="mobile-only">
                    <NavLink
                      to="/inscription"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Inscription
                    </NavLink>
                  </li>
                  <li className="mobile-only">
                    <NavLink
                      to="/connexion"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Connexion
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  {user.roles.some((role) =>
                    ["ROLE_ADMIN", "ROLE_SUPER_ADMIN"].includes(role)
                  ) && (
                    <li className="mobile-only">
                      <NavLink
                        to="/dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Dashboard
                      </NavLink>
                    </li>
                  )}
                  <li className="mobile-only">
                    <NavLink
                      to="/profil"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Compte
                    </NavLink>
                  </li>
                  <li className="mobile-only">
                    <NavLink
                      to="/"
                      onClick={() => {
                        logoutUser();
                        setMobileMenuOpen(false);
                      }}
                    >
                      Déconnexion
                    </NavLink>
                  </li>
                </>
              )}
            </div>
          </ul>
        </div>

        {/* Menu utilisateur pour la version desktop (toujours caché en mobile) */}
        <div
          className={`right-section desktop-only ${userMenuOpen ? "open" : ""}`}
        >
          <div onClick={toggleUserMenu}>
            <img src={usernav} alt="user" width={25} className="user" />
            <ul>
              {user &&
                user.roles.some((role) =>
                  ["ROLE_ADMIN", "ROLE_SUPER_ADMIN"].includes(role)
                ) && (
                  <li>
                    <NavLink
                      to={"/dashboard"}
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Dashboard
                    </NavLink>
                  </li>
                )}

              {!user ? (
                <>
                  <li>
                    <NavLink
                      to="/inscription"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Inscription
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/connexion"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Connexion
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink
                      to="/profil"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Compte
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/"
                      onClick={() => {
                        logoutUser();
                        setUserMenuOpen(false);
                      }}
                    >
                      Déconnexion
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
