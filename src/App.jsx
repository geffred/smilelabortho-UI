import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Acceuil from "./Pages/Acceuil/Acceuil";
import Services from "./Pages/Services/Services";
import Appareils from "./Pages/Appareils/Appareils";
import Contact from "./Pages/Contact/Contact";
import Shop from "./Pages/Shop/Shop";
import Dashboard from "./Pages/Dashboard/Dashboard";
import AppareilDetails from "./Pages/AppareilDetails/AppareilDetails";
import Inscription from "./Pages/Inscription/Inscription";
import ServicePage from "./Pages/ServicePage/ServicePage";
import Panier from "./Pages/Panier/panier";
import CompteUtilisateur from "./Pages/Profil/Profil";
import Connexion from "./Pages/Connexion/Connexion";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CertificatConformiteDocument from "./Pages/CertificatConformiteDocument/CertificatConformiteDocument";
import { useContext } from "react";
import { UserContext } from "./composants/UserContext";
import UtilisateurDetails from "./composants/Utilisateurs/UtilisateurDetails";
import Analytics from "./Pages/Analytics/Analytics";

// Composant pour les routes privées
// Composant pour les routes privées
const PrivateRoutes = ({ children, user, requiredRoles }) => {
  if (!user || !user.roles.some((role) => requiredRoles.includes(role))) {
    return <Navigate to="/" replace />;
  }
  return children;
};



function App() {
  const { user } = useContext(UserContext);

  const stripePromise = loadStripe(
    "pk_test_51Q2e0vHhNojQmyZVZ3xB8g12WtbFUxgcxqL7arHDyOF79GNQ4Oo5Y903CzWsE8syae7XXf6gj476REmJCUfEQeit00KIxpUICR"
  ); 

  return (
    <>
      <Routes>
        {/* Routes publiques */}
        <Route index path="/" element={<Acceuil />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<ServicePage />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Appareils" element={<Appareils />} />
        <Route path="/Shop" element={<Shop />} />
        <Route path="/Appareils/:id" element={<AppareilDetails />} />
        <Route path="/shop/:id" element={<Shop />} />
        <Route
          path="/panier"
          element={
            <PrivateRoutes user={user} requiredRoles={["ROLE_USER"]}>
              <Elements stripe={stripePromise}>
                <Panier />
              </Elements>
            </PrivateRoutes>
          }
        />
        <Route path="/inscription" element={<Inscription />} />
        {/* Routes privées */}
        <Route
          path="/profil/"
          element={
            <PrivateRoutes user={user} requiredRoles={["ROLE_USER"]}>
              <CompteUtilisateur />
            </PrivateRoutes>
          }
        />
        <Route path="/connexion" element={<Connexion />} />

        {/* Routes privées */}
        <Route
          path="/Dashboard"
          element={
            <PrivateRoutes
              user={user}
              requiredRoles={["ROLE_SUPER_ADMIN", "ROLE_ADMIN"]}
            >
              <Dashboard />
            </PrivateRoutes>
          }
        />

        <Route
          path="/declarations/:id"
          element={
            <PrivateRoutes
              user={user}
              requiredRoles={["ROLE_SUPER_ADMIN", "ROLE_ADMIN"]}
            >
              <CertificatConformiteDocument />
            </PrivateRoutes>
          }
        />

        <Route
          path="/utilisateurs/:id"
          element={
            <PrivateRoutes
              user={user}
              requiredRoles={["ROLE_SUPER_ADMIN", "ROLE_ADMIN"]}
            >
              <UtilisateurDetails />
            </PrivateRoutes>
          }
        />

        <Route
          path="/utilisateurs/:id"
          element={
            <PrivateRoutes
              user={user}
              requiredRoles={["ROLE_SUPER_ADMIN", "ROLE_ADMIN"]}
            >
              <Analytics />
            </PrivateRoutes>
          }
        />
      </Routes>
    </>
  );
}

export default App;

