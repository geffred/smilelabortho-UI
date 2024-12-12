import { useNavigate } from "react-router-dom";
import "./Categorie.css";
import edit from "/image/edit.svg";
import trash from "/image/trash.svg";

function Categorie({ data, dashboard = false, handleDelete, handleEdit }) {
  const navigate = useNavigate(); // Correction ici

  return (
    <div className="categorie-wrapper">
      <div className="Categorie" id={data.id}>
        <div className={dashboard ? "dashboard" : "dashboard hide"}>
          <button>
            <img
              src={edit}
              alt="edit"
              width={20}
              onClick={() => handleEdit(data)}
            />
          </button>
          <button className="delete" onClick={() => handleDelete(data.id)}>
            <img src={trash} alt="trash" width={20} />
          </button>
        </div>

        <div className="thumb" onClick={() => navigate("/shop/" + data.id)}>
          <img src={data.thumbnail} alt="thumbnail" className="thumbnail" />
        </div>
      </div>
      <div className="footerContainer">
        <h1> {data.titre} </h1>
      </div>
    </div>
  );
}

export default Categorie;
