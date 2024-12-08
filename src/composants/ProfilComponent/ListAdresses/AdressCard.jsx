
import "./ListAdresses.css";
import home from "/image/home.svg";


const AdressCard = ({ adresse, handleDelete, cancel = true }) => {
  return (
    <div className="adressCard">
      { cancel &&
        <img
          src="/image/cancel.svg"
          alt="cancel"
          width={25}
          className="cancel-adress"
          onClick={() => handleDelete(adresse.id)}
        />
      }
      <div className="icon">
        <img src={home} alt="home_icon" width={70} />
      </div>

      <div className="content">
        <ul>
          <li> {adresse.entreprise || "Entreprise"} </li>
          <li className="items">
            <span> {adresse.rue || "Rue"} </span>
            <span> {adresse.numeroRue || "Numéro Rue"} </span>
          </li>
          <li className="items">
            <span> {adresse.codePostal || "Code Postal"} </span>
            <span> {adresse.ville || "Ville"} </span>
          </li>
          <li> {adresse.pays || "Pays"} </li>
        </ul>
      </div>
    </div>
  );
};

export default AdressCard;