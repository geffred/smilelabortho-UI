import { mutate } from "swr";
import "./AllCommande.css";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import emailjs from "emailjs-com";

const Commande = ({ data, handleClick, isDashboard }) => {
  const [display, setDisplay] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [statutToUpdate, setStatutToUpdate] = useState(null);

  const updateStatut = async (nouveauStatut) => {
    if (!nouveauStatut || !data?.id) {
      console.error("Statut ou ID de commande manquant.");
      return;
    }

    const dataUpdate = { ...data, statut: nouveauStatut };

    // Mise à jour optimiste
    mutate(
      "/api/commandes/",
      (commandes) =>
        commandes.map((commande) =>
          commande.id === data.id
            ? { ...commande, statut: nouveauStatut }
            : commande
        ),
      false
    );

    try {
      const response = await fetch(`/api/commandes/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataUpdate),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      // Revalidation des données
      mutate("/api/commandes/");
      toast(
        `Statut de la commande #${data.id} mis à jour : ${nouveauStatut}`,
        { position: "bottom-right", autoClose: 5000 }
      );

      // Envoi d'un email si le statut devient "EXPÉDIÉE"
      /*if (nouveauStatut === "EXPEDIEE" && data.utilisateur?.email) {
        await sendEmailNotification(data.utilisateur.email);
      }*/
    } catch (err) {
      console.error("Erreur lors de la mise à jour :", err);
      toast.error(
        "Impossible de mettre à jour le statut. Veuillez réessayer.",
        { position: "bottom-right", autoClose: 5000 }
      );
    }
  };

  const sendEmailNotification = async (email) => {
    if (!email) {
      console.error("Email utilisateur non défini.");
      return;
    }

    try {
      await emailjs.send(
        "service_f2vyidp",
        "template_v5lnqrt",
        {
          message: `Hello, ${
            data.utilisateur?.prenom || "Client"
          }! Votre commande vient d'être expédiée.`,
        },
        "M-ibIQ1aTjGbVU4OK"
      );
      toast("Email envoyé au client pour l'expédition.", {
        position: "bottom-right",
        autoClose: 5000,
      });
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email :", error);
      toast.error("Erreur lors de l'envoi de l'email.", {
        position: "bottom-right",
        autoClose: 5000,
      });
    }
  };

  const handleConfirmation = (statut) => {
    setStatutToUpdate(statut);
    setConfirmationVisible(true);
  };

  const confirmUpdate = () => {
    if (statutToUpdate) {
      updateStatut(statutToUpdate);
      setConfirmationVisible(false);
      setStatutToUpdate(null);
    }
  };

  const cancelUpdate = () => {
    setConfirmationVisible(false);
    setStatutToUpdate(null);
  };

  return (
    <>
      <ToastContainer/>
      {confirmationVisible && (
        <div className="confirm-delete">
          <p>
            Voulez-vous vraiment changer le statut de la commande #{data.id} en
            "
            {statutToUpdate
              ?.split("_")
              .map(
                (word) =>
                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
              )
              .join(" ")}
            " ?
          </p>
          <button onClick={confirmUpdate}>Confirmer</button>
          <button onClick={cancelUpdate} className="annuler">
            Annuler
          </button>
        </div>
      )}
      <section
        className={`row commande ${
          data.statut === "ANNULEE"
            ? "commandeBorderError"
            : data.statut === "TERMINEE"
            ? "commandeBorderOk"
            : ""
        }`}
      >
        <div className="col-lg-1 col-12" onClick={handleClick}>
          <img
            src="/image/order.svg"
            alt="Commande"
            width={45}
            className="thumbnail"
          />
        </div>
        <div className="col-lg-1 col-12">#{data.id}</div>
        <div className="col-lg-2 col-12">{data.identifiantDispositif}</div>
        <div className="col-lg-1 col-12">
          {data.utilisateur?.nom || "Inconnu"}
        </div>
        <div className="col-lg-1 col-12">
          {data.utilisateur?.prenom || "Inconnu"}
        </div>
        <div className="col-lg-2 col-12">{data.refPatient}</div>
        <div className="col-lg-1 col-12">{data.payer ? "Oui" : "non"}</div>
        <div className="col-lg-1 col-12">{data.dateLivraisonSouhaitee}</div>
        <div className="col-lg-1 col-12 d-flex justify-content-center">
          <span
            className={`statut ${
              data.statut === "ANNULEE"
                ? "bg-danger"
                : data.statut === "TERMINEE"
                ? "bg-success"
                : ""
            }`}
          >
            {data.statut
              .split("_")
              .map(
                (word) =>
                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
              )
              .join(" ")}
          </span>
        </div>
        <div className="col-lg-1 col-12 d-flex justify-content-end menu">
          {isDashboard && (
            <img
              src="/image/menu-dots.svg"
              alt="Menu"
              width={20}
              onClick={() => setDisplay(!display)}
            />
          )}
          {display && (
            <ul className="all-statut" onMouseLeave={() => setDisplay(false)}>
              {[
                "EN_ATTENTE",
                "EN_COURS",
                "TERMINEE",
                "EXPEDIEE",
                "ANNULEE",
              ].map((statut) => (
                <li
                  key={statut}
                  onClick={() => {
                    handleConfirmation(statut);
                    setDisplay(false);
                  }}
                >
                  {statut
                    .split("_")
                    .map(
                      (word) =>
                        word.charAt(0).toUpperCase() +
                        word.slice(1).toLowerCase()
                    )
                    .join(" ")}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
};

export default Commande;
