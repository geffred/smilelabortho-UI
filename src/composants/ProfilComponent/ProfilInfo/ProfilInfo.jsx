import Spinner from "../../Spinner/Spinner";

import "./ProfilInfo.css";
import useSWR from "swr";
import userIcon from "/image/user.png"
import { UserContext } from "../../UserContext";
import { useContext } from "react";
import ListAdresses from "../ListAdresses/ListAdresses";

function ProfilInfo() {

  const { user } = useContext(UserContext); // Utiliser le contexte
    const URL = "/api/auth/utilisateurs/" + user.email;
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
    <div>
      <section className="profilIinfo">
        <div className="header">
          <h1>
            Bienvenu chez <em>Smile lab</em>
          </h1>
          <p>
            le laboratoire d’orthodontie où l’artisanat rencontre l’innovation.
          </p>
        </div>
        <img
          src="https://rolanddg-ae.com/wp-content/uploads/2019/07/bannerapplicationsmobile2.jpg"
          alt="profil_banner"
        />

        <div className="profil-thumbnail">
          <img src={data && data.thumbnail || userIcon} alt={"user_icon"} />
        </div>
      </section>

      {data && (
        <aside className="infoBox">
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
        <ListAdresses />
      </div>
    </div>
  );
}

export default ProfilInfo;
