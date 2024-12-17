import ModelAppareilInput from "../ModelAppareilInput/ModelAppareilInput";
import "./AllModelAppaeil.css";
import Spinner from "../Spinner/Spinner";
import useSWR, { mutate } from "swr";
import { useState } from "react";
import edit from "/image/edit.svg";
import trash from "/image/trash.svg";
import { ToastContainer, toast } from "react-toastify"; // Toastify pour les notifications
import "react-toastify/dist/ReactToastify.css";

function AllModelAppaeil() {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const url = `/api/models/`;
  const { data, error, isLoading } = useSWR(url, fetcher);
  const [display, setDisplay] = useState(false);
  const [editData, setEditData] = useState({ nom: "", coutSupplementaire: "" });
  const [confirmDelete, setConfirmDelete] = useState(null); // Gestion de la confirmation de suppression

  const handleDelete = async (id) => {
    if (confirmDelete === id) {
      // Si la suppression est confirmée, on supprime l'élément
      try {
        const response = await fetch(`${url}delete/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          mutate(url);
          toast("Model Appareil supprimé avec succès", {
            position: "bottom-right",
            autoClose: 5000,
          });
        } else {
          toast.error("Erreur lors de la suppression du modèle d'appareil", {
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
      setConfirmDelete(null); // Réinitialiser la confirmation
    } else {
      setConfirmDelete(id); // Demander la confirmation
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
      <ToastContainer /> {/* Container pour les notifications Toast */}
      <div className="container-fluid AllOptions">
        <ModelAppareilInput
          display={display}
          setDisplay={() => {
            setDisplay(!display);
          }}
          editData={editData}
          reinitialiser={() => setEditData({ nom: "", coutSupplementaire: "" })}
          onMutate={() => mutate(url)}
        />

        <table className="table table-bordered listModelAppareil">
          <thead>
            <tr>
              <th scope="col">
                N<sup>o</sup>
              </th>
              <th scope="col">Model Appareil</th>
              <th scope="col">Coût</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((modelAppareil) => (
              <tr key={modelAppareil.id} className="modelAppareil">
                <td>{modelAppareil.id}</td>
                <td>{modelAppareil.nom}</td>
                <td>{modelAppareil.coutSupplementaire} €</td>
                <td>
                  <div className="actions">
                    <a href="#top">
                      <img
                        src={edit}
                        alt="edit"
                        width={20}
                        onClick={() => handleEdit(modelAppareil)}
                      />
                    </a>

                    {!confirmDelete && (
                      <a
                        className="delete"
                        onClick={() => handleDelete(modelAppareil.id)}
                      >
                        <img src={trash} alt="trash" width={20} />
                      </a>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Boîte de confirmation */}
      {confirmDelete !== null && (
        <div className="confirm-delete">
          <p>Êtes-vous sûr de vouloir supprimer ce modèle d'appareil ?</p>
          <button onClick={() => handleDelete(confirmDelete)}>Oui</button>
          <button className="annuler" onClick={() => setConfirmDelete(null)}>
            Annuler
          </button>
        </div>
      )}
    </>
  );
}

export default AllModelAppaeil;
