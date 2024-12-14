import useSWR, { mutate } from "swr";
import "./ListAdresses.css";
import { useContext, useState } from "react";
import { UserContext } from "../../UserContext";
import Spinner from "../../Spinner/Spinner";
import AdressCard from "./AdressCard";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdressesForm from "../Adresses/AdressesForm";


function ListAdresses({ id, cancel }) {
  const { user } = useContext(UserContext);
  const url = `/api/adresses/utilisateur/${id}`;
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error, isLoading } = useSWR(url, fetcher);
  const [adressFormDisplay , setAdressFormDisplay] = useState(false);
  const [editValue, setEditValue] = useState(null);
  

  // État pour gérer l'adresse en cours de suppression
  const [adresseToDelete, setAdresseToDelete] = useState(null);

  const confirmDelete = async () => {
    if (!adresseToDelete) return;
    console.log(adresseToDelete.id);
    try {
      const response = await fetch(
        `/api/adresses/delete/${adresseToDelete.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          //credentials: "include", // Inclut le cookie de session
        }
      );

      if (response.ok) {
        mutate(url); // Rafraîchit les données après suppression
        toast(`Adresse supprimée avec succès`, {
          position: "bottom-right",
          autoClose: 2000,
        });
      } else {
        toast.error("Erreur lors de la suppression de l'adresse , elle est déjà associée à une commande", {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      toast.error("Erreur réseau lors de la suppression", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } finally {
      setAdresseToDelete(null); // Réinitialise l'adresse en cours de suppression
    }
  };

  const handleEdit = (adresse) => {
   setAdressFormDisplay(!adressFormDisplay)
   setEditValue(adresse)
  
  };

  const cancelDelete = () => {
    setAdresseToDelete(null);
  };

  const requestDelete = (adresse) => {
    setAdresseToDelete(adresse);
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
        <ToastContainer />
        <h2 className="mx-3">Vos adresses</h2>
        <div className="listAdresses">
          {data.map((adresse) => (
            <div key={adresse.id}>
              <AdressCard
                adresse={adresse}
                handleDelete={() => requestDelete(adresse)}
                handleEdit={handleEdit}
                cancel={cancel && !adresseToDelete}
              />
            </div>
          ))}
        </div>

        {/* Modal de confirmation */}
        {adresseToDelete && (
          <div className="confirm-delete ">
            <p>
              Êtes-vous sûr de vouloir supprimer l'adresse{" "}
              <strong>{adresseToDelete.nom}</strong> ?
            </p>
            <div>
              <button onClick={confirmDelete}>Confirmer</button>
              <button className=" annuler" onClick={cancelDelete}>
                Annuler
              </button>
            </div>
          </div>
        )}
        {adressFormDisplay && (
          <AdressesForm
            ajouterBtn={false}
            display={true}
            editValue={editValue}
          />
        )}
      </div>
    );
  } else {
    return <div>Aucune adresse disponible.</div>;
  }
}

export default ListAdresses;
