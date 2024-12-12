import "./AllCommande.css";
import AppareilPanier from "../AppareilPanier/AppareilPanier";
import AdressCard from "../ProfilComponent/ListAdresses/AdressCard";



const CommandeDetails = ({ data, id, handleClick }) => {
  const commande = data?.find((cmd) => cmd.id === id);
  console.log(commande);

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
        <div className="col-lg-4 info-perso">
          <em>Informations du clients</em>
          <div>
            Nom : {commande.utilisateur?.nom || "Inconnu"} <br />
            Prenom :{commande.utilisateur?.prenom || "Inconnu"} <br />
            Email : {commande.utilisateur.email || "Inconnu"} <br />
            Tel : {commande.utilisateur.tel || "Inconnu"} <br />
          </div>
        </div>
        <div className="col-lg-8 adresses">
          <div className="adress-info">
            <h5>Adress de facturation</h5>
            <AdressCard adresse={commande.adresseFacturation} cancel={false} />
          </div>
          <div className="adress-info">
            <h5>Adresse de Livraison</h5>
            <AdressCard adresse={commande.adresse} cancel={false} />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 commentaire"> {commande.commentaire} </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          {commande.paniers.map((panier) => (
            <div key={panier.id}>
              <AppareilPanier
                data={panier}
                cancel={false}
                link={panier.scan3d}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="row px-3 my-3">
        <div className="col-lg-12 d-flex justify-content-between">
          <span>Prix Total plus TVA :</span>
          <span> {commande.prixTotalPlusTVA} € </span>
        </div>
      </div>
      <button onClick={handleClick} className="btn btn-primary">
        <img src="/public/image/arrow-prev-white.svg " alt="" width={20} />
        Retour
      </button>
    </div>
  );
};


export default CommandeDetails;