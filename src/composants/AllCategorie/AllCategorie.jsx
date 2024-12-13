import "./AllCategorie.css";
import useSWR, { mutate } from "swr";
import Spinner from "../Spinner/Spinner";
import { useEffect } from "react";
import { useState } from "react";
import CategorieInput from "../CategorieInput/CategorieInput";
import Categorie from "../Categorie/Categorie";
import { ToastContainer, toast } from "react-toastify"; // Notifications toast
import "react-toastify/dist/ReactToastify.css"; // Style des notifications toast

// eslint-disable-next-line react/prop-types
function AllCategorie({ isDashboard = false, style }) {
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

  const url = `/api/categories/`;
  const { data, error, isLoading } = useSWR(url, fetcher);
  const [scrolling, setScrolling] = useState(false);
  const [display, setDisplay] = useState(false);
  const [editData, setEditData] = useState({ titre: "", thumbnail: "" });
  const [confirmDelete, setConfirmDelete] = useState(null); // Nouvelle variable pour gérer la confirmation de suppression

  const handleScroll = () => {
    setScrolling(window.scrollY > 1900);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
console.log(data)
  const handleDelete = async (id) => {
    // Trouver la catégorie correspondant à l'id
    const categorie = data.find((categorie) => categorie.id === id);

    // Vérifier si la catégorie contient des appareils
    if (
      categorie &&
      categorie.listAppareils &&
      categorie.listAppareils.length > 0
    ) {
      // Si la catégorie contient des appareils, empêcher la suppression
      toast.error(
        "Impossible de supprimer la catégorie : elle contient des appareils",
        {
          position: "bottom-right",
          autoClose: 5000, // Notification se ferme après 5 secondes
        }
      );
      return; // Sortir de la fonction sans effectuer la suppression
    }

    if (confirmDelete === id) {
      // Si un id est en attente de confirmation, procéder à la suppression
      try {
        const response = await fetch(`${url}delete/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          mutate(url);
          toast("Catégorie supprimée avec succès!", {
            position: "bottom-right",
            autoClose: 5000, // Notification se ferme après 5 secondes
          });
        } else {
          toast.error("Impossible de supprimer la catégorie !", {
            position: "bottom-right",
            autoClose: 5000, // Notification se ferme après 5 secondes
          });
        }
      } catch (error) {
        toast.error(
          "Une erreur s'est produite lors de la suppression de la catégorie",
          {
            position: "bottom-right",
            autoClose: 5000, // Notification se ferme après 5 secondes
          }
        );
      }
      setConfirmDelete(null); // Réinitialiser après la suppression
    } else {
      setConfirmDelete(id); // Si pas encore confirmé, afficher la demande de confirmation
    }
  };

  async function handleEdit(data) {
    setDisplay(true);
    setEditData(data);
  }

  if (error) return "Une erreur s'est produite.";
  if (isLoading) return <Spinner />;

  return (
    <>
      {/* Message de confirmation de suppression */}
      {confirmDelete !== null && (
        <div className="confirm-delete">
          <p>Êtes-vous sûr de vouloir supprimer cette catégorie ?</p>
          <button onClick={() => handleDelete(confirmDelete)}>Oui</button>
          <button className="annuler" onClick={() => setConfirmDelete(null)}>
            Annuler
          </button>
        </div>
      )}
      <ToastContainer /> {/* Affichage des notifications toast */}
      <div
        className={scrolling ? "AllCategorie categorie-show" : "AllCategorie"}
        style={style}
        id="top"
      >
        <CategorieInput
          onMutate={() => mutate(url)}
          isDashboard={isDashboard}
          display={display}
          setDisplay={() => {
            setDisplay(!display);
          }}
          editData={editData}
          reintialiser={() => setEditData({ titre: "", thumbnail: "" })}
        />

        <div className="container">
          {data.map((categorie) => (
            <Categorie
              key={categorie.id}
              data={categorie}
              dashboard={isDashboard && !confirmDelete}
              handleDelete={() => handleDelete(categorie.id)} // On passe l'ID de la catégorie à supprimer
              handleEdit={handleEdit}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default AllCategorie;
