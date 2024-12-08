import Spinner from "../Spinner/Spinner";
import useSWR, { mutate } from "swr";
import { useContext, useState } from "react";
import "./utilisateurs.css";
import { UserContext } from "../../composants/UserContext";

const Utilisateur = ({ data }) => {
  const [display, setDisplay] = useState(false);
  const { user } = useContext(UserContext);
  const updateUser = async (role) => {
    // Création d'une nouvelle liste de rôles sans muter les données existantes
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

      // Revalidation des données après mise à jour
      mutate("/api/auth/utilisateurs/");
      console.log(response.text());
    } catch (err) {
      console.error("Erreur lors de la mise à jour :", err);
      alert("Impossible de mettre à jour le rôle. Veuillez réessayer.");
    }
  };

  return (
    <section className="row utilisateur">
      <div className="col-lg-1 col-12">
        <img
          src="/image/user.png"
          alt="user"
          width={45}
          className="thumbnail"
        />
      </div>
      <div className="col-lg-1 col-12">{data.nom}</div>
      <div className="col-lg-1 col-12">{data.prenom}</div>
      <div className="col-lg-2 col-12 email">{data.email}</div>
      <div className="col-lg-1 col-12">{data.dateInscription}</div>
      <div className="col-lg-3 col-12 role">{data.roles.join(", ")}</div>
      <div className="col-lg-3 col-12 d-flex justify-content-end">
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
            {["ADMIN", "SUPER_ADMIN"].map((role) => (
              <li
                key={role}
                onClick={() => {
                  updateUser(role);
                  setDisplay(false); // Fermer le menu après la mise à jour
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
      credentials: "include", // Inclure les cookies dans la requête si nécessaire
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

  if (isLoading) return <Spinner />;
  if (error)
    return <div className="error-message">Erreur: {error.message}</div>;

  return (
    <div className="utilisateurs container-fluid">
      {data &&
        data.map((utilisateur) => (
          <Utilisateur data={utilisateur} key={utilisateur.id} />
        ))}
    </div>
  );
}

export default Utilisateurs;
