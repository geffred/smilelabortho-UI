import NavBar from "../../composants/NavBar/NavBar";
import DashBoardMenu from "../../composants/DashBoardMenu/DashBoardMenu";
import "./Dashboard.css";
import { useState, useContext } from "react";
import Display from "../../composants/Display/Display";
import AllCategorie from "../../composants/AllCategorie/AllCategorie";
import AllAppareil from "../../composants/AllAppareil/AllAppareil";
import AllModelAppaeil from "../../composants/AllModelAppaeil/AllModelAppaeil";
import Utilisateurs from "../../composants/Utilisateurs/Utilisateurs";
import AllCommande from "../../composants/AllCommande/AllCommande";
import Analytics from "../Analytics/Analytics";
import Messages from "../../composants/Messages/Messages";
import { UserContext } from "../../composants/UserContext";
import PanierBtn from "../../composants/PanierBtn/PanierBtn";

function Dashboard() {
  const [active, setActive] = useState("Messages");
  const { user: currentUser } = useContext(UserContext);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleTabChange = (select) => {
    setActive(select);
  };

  const handleUserSelect = async (user) => {
    setSelectedUser(user);
  
    console.log(user)

    try {
      const response = await fetch("/api/messages/envoyer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          expediteur: { id: currentUser.id },
          destinataireId: user.id,
          messageText: `//`,
        }),
      });

      if (!response.ok) {
        throw new Error("Échec de l'envoi du message");
      }

      // Optionnel: Recharger les messages
      // mutate('/api/messages/recus');
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
      alert("Vous ne pouvez pas vous envoyer un message à vous-même.");
      return null;
    }

    try {
      const response = await fetch("/api/messages/envoyer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          expediteur: { id: user.id },
          destinataireId: currentUser.id,
          messageText: ``,
        }),
      });

      if (!response.ok) {
        throw new Error("Échec de l'envoi du message");
      }

      // Optionnel: Recharger les messages
      // mutate('/api/messages/recus');
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
      alert("Une erreur est survenue lors de l'envoi du message");
    }

    setActive("Messages");

  };

  return (
    <div>
      <NavBar bgColor="#262626" />
      <PanierBtn />
      <div className="Dashboard container-fluid">
        <div className="row">
          <div className="col-lg-3 col-12 px-1" id="menu">
            <DashBoardMenu isActive={active} handleClick={handleTabChange} />
          </div>
          <div className="col-lg-9 px-1 content-data">
            <Display active={active} label={"Catégories"}>
              <AllCategorie
                isDashboard={true}
                style={{
                  transform: "translateY(0px)",
                  border: "none",
                  paddingTop: "15px",
                }}
              />
            </Display>

            <Display active={active} label={"Appareils"}>
              <AllAppareil
                isDashboard={true}
                style={{
                  transform: "translateY(0px)",
                  border: "none",
                  paddingTop: "15px",
                }}
              />
            </Display>

            <Display active={active} label={"Modèles d'appareils"}>
              <AllModelAppaeil />
            </Display>

            <Display active={active} label={"Utilisateurs"}>
              <Utilisateurs handleClick={handleUserSelect} />
            </Display>

            <Display active={active} label={"Commandes"}>
              <AllCommande />
            </Display>

            <Display active={active} label={"Analytics"}>
              <Analytics />
            </Display>

            <Display active={active} label={"Messages"}>
              <Messages selectedUser={selectedUser} />
            </Display>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
