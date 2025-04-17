import Spinner from "../Spinner/Spinner";
import useSWR, { mutate } from "swr";
import { useContext, useState } from "react";
import "./utilisateurs.css";
import { UserContext } from "../../composants/UserContext";
import userIconDash from "/image/user-circle-1.svg";
import { useNavigate } from "react-router-dom";

const Utilisateur = ({ data }) => {
  const [display, setDisplay] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const updateUser = async (role) => {
    const dataUpdate = { ...data, roles: ["USER", role] };

    try {
      const response = await fetch(`/api/auth/update`, {
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

      mutate("/api/auth/utilisateurs/");
    } catch (err) {
      console.error("Erreur lors de la mise à jour :", err);
      alert("Impossible de mettre à jour le rôle. Veuillez réessayer.");
    }
  };

  return (
    <section className="row utilisateur">
      <div className="col-lg-1 col-12">
        <img
          src={data.thumbnail || userIconDash}
          alt="user"
          width={45}
          className="thumbnail"
          onClick={() => navigate(`/utilisateurs/${data.id}`)}
        />
      </div>
      <div className="col-lg-1 col-12">{data.nom}</div>
      <div className="col-lg-1 col-12">{data.prenom}</div>
      <div className="col-lg-2 col-12 email">{data.email}</div>
      <div className="col-lg-2 col-12">{data.dateInscription}</div>
      <div className="col-lg-3 col-12 role">{data.roles.join(", ")}</div>
      <div className="col-lg-2 col-12 d-flex justify-content-end">
        {user.roles.includes("ROLE_SUPER_ADMIN") &&
          data?.id &&
          user.id !== data.id && (
            <img
              src="image/menu-dots.svg"
              alt="menu"
              width={20}
              onClick={() => setDisplay(!display)}
            />
          )}

        {display && (
          <ul className="all-statut" onMouseLeave={() => setDisplay(false)}>
            {["ADMIN", "SUPER_ADMIN","USER"].map((role) => (
              <li
                key={role}
                onClick={() => {
                  updateUser(role);
                  setDisplay(false);
                }}
              >
                {role
                  .split("_")
                  .map(
                    (word) =>
                      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
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

function Utilisateurs() {
  const URL = "/api/auth/utilisateurs/";


  const fetcher = async (url) => {
    const res = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error(`Erreur: ${res.statusText}`);
    }

    const contentType = res.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json")) {
      return res.json();
    } else {
      const text = await res.text();
      throw new Error(`La réponse n'est pas du JSON. Contenu reçu : ${text}`);
    }
  };

  const { data, error, isLoading } = useSWR(URL, fetcher);

  // État pour le filtre
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrer les utilisateurs
const filteredData = data?.filter((utilisateur) => {
  const searchLower = searchTerm.toLowerCase();
  return (
    (utilisateur.nom && utilisateur.nom.toLowerCase().includes(searchLower)) ||
    (utilisateur.prenom &&
      utilisateur.prenom.toLowerCase().includes(searchLower)) ||
    (utilisateur.email &&
      utilisateur.email.toLowerCase().includes(searchLower)) ||
    (utilisateur.dateInscription &&
      utilisateur.dateInscription.toLowerCase().includes(searchLower))
  );
});

  if (isLoading) return <Spinner />;
  if (error)
    return <div className="error-message">Erreur: {error.message}</div>;

  return (
    <div className="utilisateurs container-fluid">
      {/* Champ de recherche */}
      <div className="search-bar">
        <input
          type="text"
          className="search"
          placeholder="Rechercher par Nom, Prénom , Email ou date..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <section className="row commande" id="head-user">
        <div className="col-lg-1 col-1">
          <img
            src="/image/user-circle.svg"
            alt="Commande"
            width={45}
            className="thumbnail"
           
          />
        </div>
        <div className="col-lg-1 col-12">Nom</div>
        <div className="col-lg-1 col-12">Prenom</div>
        <div className="col-lg-2 col-12">Email</div>
        <div className="col-lg-2 col-12">Date Inscription</div>
        <div className="col-lg-3 col-12">Role(s)</div>
      </section>
      {filteredData &&
        filteredData.map((utilisateur) => (
          <Utilisateur data={utilisateur} key={utilisateur.id} />
        ))}
    </div>
  );
}

export default Utilisateurs;
