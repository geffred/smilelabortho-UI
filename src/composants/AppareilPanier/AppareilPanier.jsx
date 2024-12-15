import useSWR from "swr";
import "./AppareilPanier.css"
import cancelPanier from "/image/cancel.svg"

function AppareilPanier({ data, handleDelete, cancel = true, link=null }) {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data: models, error, isLoading } = useSWR("/api/models/", fetcher);
  const model = models?.find((m) => data.model == m.id);

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
          <span> {model && model.coutSupplementaire} € </span>
        </div>
        <div>
          <span>Total </span>
          <span>
            {`( ${data.prixUnitaire}€ + ${
              model && model.coutSupplementaire
            }€) x ${data.quantite} = ${data.prixTotal}€`}{" "}
          </span>
        </div>
      </div>
      {cancel && (
        <img
          src={cancelPanier}
          className="cancel icon-icon"
          alt="cancel_icon"
          onClick={() => handleDelete(data.id)}
          width={35}
          height={35}
        />
      )}
      {link && (
        <a href={link}>
          <img
            src="https://www.svgrepo.com/show/506465/download.svg"
            alt=""
            width={20}
            className="icon-icon"
          />
        </a>
      )}
    </div>
  );
}

export default AppareilPanier;