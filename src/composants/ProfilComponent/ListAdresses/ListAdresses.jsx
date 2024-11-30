import useSWR from "swr";
import "./ListAdresses.css";
import home from "/image/home.svg";
import { useContext } from "react";
import { UserContext } from "../../UserContext";
import Spinner from "../../Spinner/Spinner";
import { useState } from "react";
import { mutate } from "swr";


const AdressCard = ({ adresse , handleDelete }) => {

   
  return (
    <div className="adressCard">
      <img src="/image/cancel.svg" alt="cancel" width={25} className="cancel-adress" onClick={()=>handleDelete(adresse.id)} />
      <div className="icon">
        <img src={home} alt="home_icon" width={80} />
      </div>

      <div className="content">
        <ul>
          <li> {adresse.entreprise || "Entreprise"} </li>
          <li className="items">
            <span> {adresse.rue || "Rue"} </span>
            <span> {adresse.numeroRue || "Numéro Rue"} </span>
          </li>
          <li className="items">
            <span> {adresse.codePostal || "Code Postal"} </span>
            <span> {adresse.ville || "Ville"} </span>
          </li>
          <li> {adresse.pays || "Pays"} </li>
        </ul>
      </div>
    </div>
  );
};

function ListAdresses() {
  const { user } = useContext(UserContext);
  const url = "/api/adresses/utilisateur/3";
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(url, fetcher);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/adresses/delete/${id}`, {
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


  // Vérifiez si l'email de l'utilisateur est disponible avant de faire la requête
  if (!user || !user.email) {
    return <div>Utilisateur non connecté ou email manquant.</div>;
  }

  if (isLoading) return <Spinner />;
  if (error) return <div>Une erreur s'est produite: {error.message}</div>;

  if (Array.isArray(data)) {
    return (
      <div className="listAdresses">
        {data.map((adresse) => (
          <div key={adresse.id}>
            <AdressCard adresse={adresse} handleDelete={handleDelete} />
          </div>
        ))}
      </div>
    );
  } else {
    return <div>Aucune adresse disponible.</div>;
  }
}

export default ListAdresses;
