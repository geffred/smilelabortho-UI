import "./AllAppareil.css";
import useSWR, { mutate } from "swr";
import Spinner from "../Spinner/Spinner";
import Appareil from "../Appareil/Appareil";
import AppareilInput from "../AppareilInput/AppareilInput";
import AppareilImage from "../AppareilImage/AppareilImage";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify"; // Ajout de Toast pour les notifications
import "react-toastify/dist/ReactToastify.css"; // Style des notifications Toast

function AllAppareil({ isDashboard = true, url = `/api/appareils/` }) {
  const [id, setId] = useState(0);
  const [imageActive, setImageActive] = useState(false);
  const [display, setDisplay] = useState(false);
  const [editData, setEditData] = useState({
    nom: "",
    thumbnail: "",
    prixUnitaire: "",
    categorie: "",
    description: "",
  });
  const [confirmDelete, setConfirmDelete] = useState(null); // Nouvelle variable pour gérer la confirmation de suppression

  const fetcher = (url) =>
    fetch(url, {
      method: "GET",
      credentials: "include", // Inclure les cookies dans la requête
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des données");
      }
      return response.json();
    });

  const { data, error } = useSWR(url, fetcher);

  const handleClick = (id) => {
    setId(id);
    setImageActive(!imageActive);
  };

  const handleDelete = async (id) => {
    if (confirmDelete === id) {
      // Si l'id est confirmé, procéder à la suppression
      try {
        const response = await fetch(`/api/appareils/delete/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Inclut le cookie de session
        });

        if (response.ok) {
          mutate(url); // Rafraîchit les données après suppression
          toast("Appareil supprimé avec succès", {
            position: "bottom-right",
            autoClose: 5000,
          });
        } else {
          toast.error("Erreur lors de la suppression de l'appareil", {
            position: "bottom-right",
            autoClose: 5000,
          });
        }
      } catch (error) {
        toast.error("Erreur réseau", {
          position: "bottom-right",
          autoClose: 5000,
        });
      }
      setConfirmDelete(null); // Réinitialiser après la suppression
    } else {
      setConfirmDelete(id); // Si pas encore confirmé, afficher la demande de confirmation
    }
  };

  const handleEdit = (data) => {
    setDisplay(true);
    setEditData(data);
  };

  if (error) return <p>Une erreur s'est produite : {error.message}</p>;
  if (!data) return <Spinner />;

  return (
    <>
      <ToastContainer /> {/* Affichage des notifications Toast */}
      <div className="AllAppareil" id="top">
        <AppareilInput
          onMutate={() => mutate(url)}
          isDashboard={isDashboard}
          display={display}
          setDisplay={() => setDisplay((prev) => !prev)}
          editData={editData}
          reinitialiser={() =>
            setEditData({
              nom: "",
              thumbnail: "",
              prixUnitaire: "",
              categorie: "",
              description: "",
            })
          }
        />

        <AppareilImage id={id} isDashboard={isDashboard} />

        <div className="container">
          {data.map((appareil) => (
            <Appareil
              key={appareil.id}
              data={appareil}
              dashboard={isDashboard && !confirmDelete}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleClick={handleClick}
            />
          ))}
        </div>
      </div>
      {/* Message de confirmation de suppression */}
      {confirmDelete !== null && (
        <div className="confirm-delete">
          <p>Êtes-vous sûr de vouloir supprimer cet appareil ?</p>
          <button onClick={() => handleDelete(confirmDelete)}>Oui</button>
          <button className="annuler" onClick={() => setConfirmDelete(null)}>
            Annuler
          </button>
        </div>
      )}
    </>
  );
}

export default AllAppareil;
