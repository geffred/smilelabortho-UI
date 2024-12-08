import { useContext } from "react";
import "./PanierBtn.css";
import panier from "/image/panier.svg";
import { NavLink } from "react-router-dom";
import useSWR from "swr";
import { UserContext } from "../UserContext";

function PanierBtn() {
  const { user } = useContext(UserContext);

  // Générer l'URL uniquement si l'utilisateur est défini
  const url = user ? `/api/paniers/${user.id}` : null;

  // Fonction pour récupérer les données
  const fetcher = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Erreur de récupération des paniers : ${response.statusText}`
      );
    }
    return response.json();
  };

  // Utilisation de SWR pour récupérer les données
  const { data, error } = useSWR(url, fetcher);

  // Calcul du nombre d'éléments dans le panier non validés
  const panierCount =
    user && data ? data.filter((panier) => !panier.valider).length : 0;

  // Gestion des états (affichage d'un message ou d'une alternative si nécessaire)
  if (!user) {
    return (
      <NavLink to="/panier" className="PanierBtn">
        <img src={panier} alt="panier_icon" width={25} />
        <span>0</span>
      </NavLink>
    );
  }

  return (
    <NavLink to="/panier" className="PanierBtn">
      <img src={panier} alt="panier_icon" width={25} />
      {error ? (
        // Affichage en cas d'erreur
        <span className="error">!</span>
      ) : (
        // Affichage du nombre d'articles (ou chargement par défaut)
        <span>{data ? panierCount : "..."}</span>
      )}
    </NavLink>
  );
}

export default PanierBtn;
