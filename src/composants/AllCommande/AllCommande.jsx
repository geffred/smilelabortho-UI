import "./AllCommande.css";
import Spinner from "../Spinner/Spinner";
import useSWR from "swr";
import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import Commande from "./Commande";
import CommandeDetails from "./CommandeDetails";
import {ToastContainer } from "react-toastify";

const Display = ({ children, active }) => {
  return active ? children : null;
};

function AllCommande({
  url = "/api/commandes/",
  isDashboard = true,
 
}) {
  const [active, setActive] = useState(false);
  const [id, setId] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // État pour la barre de recherche
  const [filterDate, setFilterDate] = useState(""); // État pour le filtre de date
  const [filterRefPatient, setFilterRefPatient] = useState(""); // État pour le filtre par refPatient
  const { user } = useContext(UserContext);

  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data: commandes, error, isLoading } = useSWR(url, fetcher);
  const { data: utilisateurs } = useSWR("/api/auth/utilisateurs/", fetcher);
  const { data: paniers } = useSWR(`/api/paniers/`, fetcher);
  const { data: adresses } = useSWR(`/api/adresses/`, fetcher);

  const nouvellesCommandes =
    commandes &&
    utilisateurs &&
    commandes.map((commande) => {
      const utilisateur = utilisateurs?.find(
        (u) => u.id === commande.utilisateurId
      );
      const paniersAssocies =
        commande.panierIds?.map((panierId) =>
          paniers?.find((p) => p.id === panierId)
        ) || [];
      const adresseAssocies = adresses?.find(
        (a) => a.id === commande.adresseLivraisonId
      );

      const adresseFacturationAssocies = adresses?.find(
        (a) => a.id === commande.adresseFacturationId
      );

      return {
        ...commande,
        utilisateur: utilisateur || null,
        paniers: paniersAssocies || [],
        adresse: adresseAssocies || null,
        adresseFacturation: adresseFacturationAssocies,
      };
    });

  // Tri et filtrage des commandes
  const filteredCommandes = nouvellesCommandes?.filter((commande) => {
    const utilisateur = commande.utilisateur || {};
    const fullName = `${utilisateur.nom || ""} ${
      utilisateur.prenom || ""
    }`.toLowerCase();
    const matchesSearch =
      fullName.includes(searchTerm.toLowerCase()) ||
      (commande.dateLivraisonSouhaitee || "").includes(searchTerm);
    const matchesDate =
      !filterDate || commande.dateLivraisonSouhaitee === filterDate;
    const matchesRefPatient =
      !filterRefPatient ||
      (commande.refPatient || "")
        .toLowerCase()
        .includes(filterRefPatient.toLowerCase());

    return matchesSearch && matchesDate && matchesRefPatient;
  });

  if (isLoading) return <Spinner />;
  if (error)
    return <div className="error-message">Erreur: {error.message}</div>;

  return (
    <div>
      <ToastContainer />
      <Display active={!active}>
        <div className="commandes container-fluid">
          {/* Barre de recherche et filtres */}
          <form className="row">
            {isDashboard && (
              <div className="form-group col-lg-4">
                <input
                  type="text"
                  className="form-control py-2 search"
                  placeholder="Recherche par nom, prénom ou date..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            )}
            <div className="form-group col-lg-4">
              <select
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
              >
                <option value="">Toutes les dates</option>
                {Array.from(
                  new Set(
                    nouvellesCommandes?.map((c) => c.dateLivraisonSouhaitee)
                  )
                )
                  .slice(0, 30)
                  .map((date) => (
                    <option key={date} value={date}>
                      {date}
                    </option>
                  ))}
              </select>
            </div>
            <div className="form-group col-lg-4">
              <input
                type="text"
                className="form-control py-2 search"
                placeholder="Filtrer par Ref Patient..."
                value={filterRefPatient}
                onChange={(e) => setFilterRefPatient(e.target.value)}
              />
            </div>
          </form>
          <section className="row commande" id="head-commande">
            <div className="col-lg-1 col-1">
              <img
                src="/image/order.svg"
                alt="Commande"
                width={45}
                className="thumbnail"
              />
            </div>
            <div className="col-lg-1 col-1">#</div>
            <div className="col-lg-1 col-2">Nom</div>
            <div className="col-lg-1 col-2">Prenom</div>
            <div className="col-lg-3 col-2">Refs Patients</div>
            <div className="col-lg-1 col-2">Dateline</div>
            <div className="col-lg-1 col-2 d-flex justify-content-center">
              Statut
            </div>
          </section>
          {/* Liste des commandes filtrées */}
          {filteredCommandes &&
            filteredCommandes.reverse().map((commande) => (
              <Commande
                isDashboard={isDashboard}
                data={commande}
                key={commande.id}
                handleClick={() => {
                  setActive(true);
                  setId(commande.id);
                }}
              />
            ))}
        </div>
      </Display>
      <Display active={active}>
        <CommandeDetails
          data={nouvellesCommandes}
          id={id}
          handleClick={() => setActive(false)}
        />
      </Display>
    </div>
  );
}

export default AllCommande;
