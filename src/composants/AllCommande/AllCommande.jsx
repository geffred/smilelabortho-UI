import "./AllCommande.css";
import Spinner from "../Spinner/Spinner";
import useSWR from "swr";
import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import Commande from "./Commande";
import CommandeDetails from "./CommandeDetails";


const Display = ({ children, active }) => {
  return active ? children : null;
};


function AllCommande({url = "/api/commandes/", isDashboard = true }) {
  const [active, setActive] = useState(false);
  const [id, setId] = useState(null);
  const { user } = useContext(UserContext);

  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data: commandes, error, isLoading } = useSWR(url, fetcher);
  const { data: utilisateurs } = useSWR("/api/auth/utilisateurs/", fetcher);
  const { data: paniers } = useSWR(`/api/paniers/`, fetcher);
  const { data: adresses } = useSWR(
    `/api/adresses/`,
    fetcher
  );
  console.log(adresses)

  const nouvellesCommandes =
    commandes &&
    utilisateurs &&
    commandes.map((commande) => {
      // Vérification des données avant de les utiliser
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

      return {
        ...commande,
        utilisateur: utilisateur || null,
        paniers: paniersAssocies || [],
        adresse: adresseAssocies || null,
      };
    });


  console.log(nouvellesCommandes);

  if (isLoading) return <Spinner />;
  if (error)
    return <div className="error-message">Erreur: {error.message}</div>;

  return (
    <div>
      <Display active={!active}>
        <div className="commandes container-fluid">
          {nouvellesCommandes?.map((commande) => (
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
