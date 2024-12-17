import AppareilPanier from "../../composants/AppareilPanier/AppareilPanier";
import Footer from "../../composants/Footer/Footer";
import NavBar from "../../composants/NavBar/NavBar";
import PanierBtn from "../../composants/PanierBtn/PanierBtn";
import SectionBanner from "../../composants/SectionBanner/SectionBanner";
import buy from "/image/buy.svg";
import arrow from "/image/arrow-prev-white.svg";
import "./panier.css";
import { NavLink } from "react-router-dom";
import useSWR from "swr";
import Spinner from "../../composants/Spinner/Spinner";
import { mutate } from "swr";
import { useContext } from "react";
import { UserContext } from "../../composants/UserContext";
import CommandeForm from "../../composants/CommandeForm/CommandeForm";

function Panier() {
  const { user } = useContext(UserContext); // Récupère l'utilisateur depuis le contexte

  // URL pour récupérer les paniers de l'utilisateur
  const url = "/api/paniers/" + user.id;

  // Fetcher pour récupérer les données des paniers
  const fetcher = (url) =>
    fetch(url, {
      method: "GET",
      credentials: "include", // Inclut les cookies comme JSESSIONID
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des données");
      }
      return response.json();
    });

  // Utilisation de useSWR pour récupérer les données des paniers
  const { data, error, isLoading } = useSWR(url, fetcher);

  // Fonction pour supprimer un panier
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/paniers/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Inclut le cookie de session
      });

      if (response.ok) {
        mutate(url); // Rafraîchit les données après suppression
        console.log("Item supprimé avec succès");
      } else {
        console.error("Erreur lors de la suppression de l'item");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  };

  // Vérifie les erreurs et le chargement
  if (isLoading) return <Spinner />;
  if (error) return <div>Une erreur s'est produite.</div>;

  // Calcul du prix total des paniers non validés
  const totalPrix = data
    .filter((panier) => panier.valider === false) // Filtrage des paniers non validés
    .reduce((acc, panier) => acc + (panier.prixTotal || 0), 0); // Additionne les prixTotal des paniers
  
    const panierContent = data
    .filter((panier) => panier.valider === false) // Filtrage des paniers non validés
    

  return (
    <div className="panier">
      <PanierBtn />
      <NavBar />
      <SectionBanner style={{ height: "150px" }} />
      <div className="content container-fluid">
        <div className="row">
          <div className="col-lg-7">
            {panierContent.length === 0 ? (
              <div className="card panier-vide">Panier vide</div>
            ) : (
              data
                .filter((panier) => panier.valider === false) // Filtrage des paniers non validés
                .map((panier) => (
                  <div key={panier.id}>
                    <AppareilPanier
                      data={panier}
                      handleDelete={handleDelete}
                      link={`http://localhost:8080/api/files/download/${panier.scan3d}`} // Correction potentielle du lien
                    />
                  </div>
                ))
            )}
          </div>
          <div className="col-lg-5 commandes">
            <CommandeForm prixTotal={totalPrix} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Panier;
