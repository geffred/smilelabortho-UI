
import "./ListAdresses.css";
import home from "/image/home.svg";


const AdressCard = ({ adresse, handleDelete, cancel = true, handleEdit }) => {
  return (
    <div className="adressCard">
      {cancel && (
        <div className="cancel-adress">
          <span onClick={() => handleEdit(adresse)}>
            <img
              src="/image/edit.svg"
              alt="cancel"
              width={20}
              className="mx-1 icon-icon"
            />
          </span>
          <span onClick={() => handleDelete(adresse.id)}>
            <img
              src="/image/cancel.svg"
              alt="cancel"
              width={20}
              className="icon-icon"
            />
          </span>
        </div>
      )}
      <div className="icon">
        <img src={home} alt="home_icon" width={70} className=" icon-icon" />
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