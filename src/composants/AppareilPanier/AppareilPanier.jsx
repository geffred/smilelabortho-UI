import "./AppareilPanier.css"
import cancelPanier from "/image/cancel.svg"

function AppareilPanier({data , handleDelete , cancel = true}){
    return (
      <div className="AppareilPanier">
        <div className="cover">
          <img src={data.thumbnail} alt="appareil_icon" />
        </div>
        <div className="data-appareil">
          <h1>
            <em>{data.nomAppareil} </em>{" "}
          </h1>
          <h2>
            <em>{data.categorie} </em>
          </h2>
          <p> {data.description} </p>
          <hr />
          <div>
            <span>Quantité </span>
            <span> {data.quantite} </span>
          </div>
          <div>
            <span>Prix Unitaire </span>
            <span>{data.prixUnitaire}€</span>
          </div>
          <div>
            <span>Prix du model </span>
            <span> {data.prixModel} € </span>
          </div>
          <div>
            <span>Total </span>
            <span>
              {`( ${data.prixUnitaire}€ + ${data.prixModel}€) x ${data.quantite} = ${data.prixTotal}€`}{" "}
            </span>
          </div>
        </div>
        {cancel && (
          <img
            src={cancelPanier}
            className="cancel"
            alt="cancel_icon"
            onClick={() => handleDelete(data.id)}
            width={35}
            height={35}
          />
        )}
      </div>
    );
}

export default AppareilPanier;