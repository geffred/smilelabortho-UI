
import Spinner from "../../Spinner/Spinner";
import "./ProfilInfo.css"
import { useAuth0 } from "@auth0/auth0-react";

function ProfilInfo(){

    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) return <Spinner/>;
    console.log(user)

    
    return (
      <div>
        <section className="profilIinfo">
          <div className="header">
            <h1>
              Bienvenu chez <em>Smile lab</em>
            </h1>
            <p>
              le laboratoire d’orthodontie où l’artisanat rencontre
              l’innovation.
            </p>
          </div>
          <img
            src="https://rolanddg-ae.com/wp-content/uploads/2019/07/bannerapplicationsmobile2.jpg"
            alt="profil_banner"
          />
          {isAuthenticated && (
            <div className="profil-thumbnail">
              <img src={user.picture} alt={user.name} />
            </div>
          )}
        </section>

        {isAuthenticated && (
          <aside className="infoBox">
            <h1>Données personnelles</h1>
            <ul className="row">
              <li className="col-lg-12">
                <span> Nom</span> <br />
                <span>{user.nickname}</span>
              </li>
              <li className="col-lg-12">
                <span> Prenom </span> <br />
                <span>{user.name}</span>
              </li>
              <li className="col-lg-12">
                <span> Email </span> <br />
                <span>{user.email}</span>
              </li>
              <li className="col-lg-12">
                <span> Telephone </span> <br />
                <span>{user.tel}</span>
              </li>
            </ul>
          </aside>
        )}
      </div>
    );
   
}

export default ProfilInfo;
