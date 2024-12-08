import "./AllCommande.css";
import AppareilPanier from "../AppareilPanier/AppareilPanier";
import AdressCard from "../ProfilComponent/ListAdresses/AdressCard";



const CommandeDetails = ({ data, id, handleClick }) => {
  const commande = data?.find((cmd) => cmd.id === id);
  console.log(commande.adresse);

  if (!commande) {
    return (
      <div className="commandeDetails container py-5">
        <p>Commande introuvable</p>
        <button onClick={handleClick}>Retour</button>
      </div>
    );
  }

  return (
    <div className="commandeDetails container py-5">
      <div className="row commande-head">
        <div className="col-lg-6 ">Commande #{commande.id}</div>
        <div className="col-lg-6 d-flex justify-content-end">
          <small>
            {commande.dateCommande} | {commande.heureCommande} 
          </small>
        </div>
      </div>
      <hr />
      <div className="row d-flex align-items-center">
        <div className="col-lg-12">
          <em>Informations du clients</em>
        </div>
        <div className="col-lg-6 info-perso">
          <div>
            {commande.utilisateur?.nom || "Inconnu"}{" "}
            {commande.utilisateur?.prenom || "Inconnu"} <br />
            {commande.utilisateur.email || "Inconnu"} <br />
            {commande.utilisateur.tel || "Inconnu"} <br />
          </div>
        </div>
        <div className="col-lg-6 d-flex justify-content-end">
          <AdressCard adresse={commande.adresse} cancel={false} />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          {commande.paniers.map((panier) => (
            <div key={panier.id}>
              <AppareilPanier data={panier} cancel={false} />
            </div>
          ))}
        </div>
      </div>
      <button onClick={handleClick}>Retour</button>
    </div>
  );
};


export default CommandeDetails;