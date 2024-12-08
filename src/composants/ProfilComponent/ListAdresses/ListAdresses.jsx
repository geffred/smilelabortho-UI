import useSWR from "swr";
import "./ListAdresses.css";
import { useContext } from "react";
import { UserContext } from "../../UserContext";
import Spinner from "../../Spinner/Spinner";
import AdressCard from "./AdressCard";
import { mutate } from "swr";



function ListAdresses() {
  const { user } = useContext(UserContext);
  const url = `/api/adresses/utilisateur/${user.id}`;
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
      <div className="adresses">
        <h2 className="mx-3">Vos adresses</h2>
        <div className="listAdresses">
          {data.map((adresse) => (
            <div key={adresse.id}>
              <AdressCard adresse={adresse} handleDelete={handleDelete} />
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return <div>Aucune adresse disponible.</div>;
  }
}

export default ListAdresses;
