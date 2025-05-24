import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import "../ProfilComponent/ProfilInfo/ProfilInfo.css";
import useSWR from "swr";
import userIcon from "/image/user-circle-1.svg";
import ListAdresses from "../ProfilComponent/ListAdresses/ListAdresses";
import Spinner from "../../composants/Spinner/Spinner";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import "./UtilisateurDetails.css"
import { UserContext } from "../UserContext";

function UtilisateurDetails() {
  const { id } = useParams(); // Récupérer l'ID de l'utilisateur depuis l'URL
  const navigate = useNavigate(); // Pour retourner à la liste
  const {user} = useContext(UserContext)
  const URL = "/api/auth/utilisateurs/" + id;
    const fetcher = async (url) => {
      const res = await fetch(url, {
        method: "GET",
        credentials: "include", // Inclure les cookies dans la requête si nécessaire
      });

      // Vérifier si la réponse est correcte (code HTTP 2xx)
      if (!res.ok) {
        throw new Error(`Erreur: ${res.statusText}`);
      }

      // Tenter de lire la réponse en JSON
      const contentType = res.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        return res.json();
      } else {
        // Si ce n'est pas du JSON, essayer de retourner le texte de la réponse pour aider au débogage
        const text = await res.text();
        throw new Error(`La réponse n'est pas du JSON. Contenu reçu : ${text}`);
      }
    };
    const { data, error, isLoading } = useSWR(URL, fetcher);

  if (isLoading) return <Spinner />;
  if (error)
    return <div className="error-message">Erreur: {error.message}</div>; // Affichage de l'erreur à l'utilisateur
  return (
    <div className="UtilisateurDetails">
      <NavBar bgColor="rgba(0, 0, 0,0.8)" />
      <main className="container">
        <section className="profilIinfo">
          <div className="header">
            <h1>
              Bienvenu chez <em>Smile lab</em>
            </h1>
            <p>
              le laboratoire d’orthodontie où l’artisanat rencontre
              l’innovation.
            </p>
          </div>
          <img
            src="https://rolanddg-ae.com/wp-content/uploads/2019/07/bannerapplicationsmobile2.jpg"
            alt="profil_banner"
          />

          <div className="profil-thumbnail">
            <img src={(data && data.thumbnail) || userIcon} alt={"user_icon"} />
          </div>
        </section>

        {data && (
          <aside className="infoBox">
            <div className="profil-btn">
              <button className="btn btn-primary " onClick={() => navigate(-1)}>
                <img
                  src="/public/image/arrow-prev-white.svg"
                  alt=""
                  width={20}
                />
                Retour
              </button>

              
            </div>
            <h1>Données personnelles</h1>
            <ul className="row">
              <li className="col-lg-12">
                <span> Nom</span> <br />
                <span>{data.nom}</span>
              </li>
              <li className="col-lg-12">
                <span> Prenom </span> <br />
                <span>{data.prenom}</span>
              </li>
              <li className="col-lg-12">
                <span> Email </span> <br />
                <span>{data.email}</span>
              </li>
              <li className="col-lg-12">
                <span> Telephone </span> <br />
                <span>{data.tel}</span>
              </li>
            </ul>
          </aside>
        )}
        <div>
          <ListAdresses id={id} cancel={parseInt(id) === parseInt(user.id)} />
        </div>
      </main>
      <Footer />
    </div>
  );
}


export default UtilisateurDetails;
