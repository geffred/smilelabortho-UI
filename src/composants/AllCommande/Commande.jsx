import { mutate } from "swr";
import "./AllCommande.css";
import { useState } from "react";

const Commande = ({ data, handleClick , isDashboard  }) => {
  const [display, setDisplay] = useState(false);

  const updateStatut = async (nouveauStatut) => {
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
        const errorData = await response.text();
        throw new Error(errorData);
      }

      // Revalidation des données
      mutate("/api/commandes/");
    } catch (err) {
      console.error("Erreur lors de la mise à jour :", err);
      alert("Impossible de mettre à jour le statut. Veuillez réessayer.");
    }
  };

  return (
    <section className="row commande">
      <div className="col-lg-1 col-12" onClick={handleClick}>
        <img
          src="/image/order.svg"
          alt="Commande"
          width={45}
          className="thumbnail"
        />
      </div>
      <div className="col-lg-1 col-12">#{data.id}</div>
      <div className="col-lg-1 col-12">
        {data.utilisateur?.nom || "Inconnu"}
      </div>
      <div className="col-lg-1 col-12">
        {data.utilisateur?.prenom || "Inconnu"}
      </div>
      <div className="col-lg-1 col-12">{data.dateCommande}</div>
      <div className="col-lg-1 col-12">{data.heureCommande}</div>
      <div className="col-lg-1 col-12 email">{data.email}</div>
      <div className="col-lg-1 col-12 statut">
        {data.statut
          .split("_")
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(" ")}
      </div>
      <div className="col-lg-4 col-12 d-flex justify-content-end menu">
        {isDashboard && (
          <img
            src="/image/menu-dots.svg"
            alt="Menu"
            width={20}
            onClick={() => setDisplay(!display)}
          />
        )}
        {display &&(
            <ul className="all-statut" onMouseLeave={() => setDisplay(false)}>
              {["EN_COURS", "TERMINEE", "EXPEDIEE"].map((statut) => (
                <li
                  key={statut}
                  onClick={() => {
                    updateStatut(statut);
                    setDisplay(false); // Fermer le menu après la mise à jour
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
  );
};

export default Commande;
