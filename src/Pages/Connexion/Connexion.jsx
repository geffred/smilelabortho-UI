import { useState, useContext } from "react";
import { UserContext } from "../../composants/UserContext";
import NavBar from "../../composants/NavBar/NavBar";
import Footer from "../../composants/Footer/Footer";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Connexion.css";

function Connexion() {
  const { loginUser } = useContext(UserContext); // Utiliser le contexte pour l'authentification
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(null); // Pour afficher les erreurs
  const [isLoading, setIsLoading] = useState(false); // Pour gérer l'état de chargement

  const url = "/api/auth/login"; // L'URL de l'API pour la connexion

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Veuillez saisir une adresse email valide")
      .required("L'email est obligatoire"),
    password: Yup.string().required("Le mot de passe est obligatoire"),
  });

  async function sendData(data) {
    setIsLoading(true); // Début du chargement
    try {
      const response = await fetch(url, {
        method: "POST", // Type de la requête HTTP
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Convertir les données en JSON pour les envoyer
      });

      if (response.ok) {
        const responseData = await response.json(); // Extraire la réponse JSON du serveur
        loginUser(responseData); // Mettez à jour le contexte avec l'utilisateur connecté
        console.log("Données envoyées avec succès:", responseData);
        navigate("/profil"); // Rediriger vers la page profil après connexion
      } else {
        const errorData = await response.text();
        setErrorMessage(errorData || "Erreur lors de la connexion"); // Gérer les erreurs côté serveur
      }
    } catch (error) {
      setErrorMessage("Erreur réseau. Veuillez réessayer."); // Gérer les erreurs réseau
    } finally {
      setIsLoading(false); // Fin du chargement
    }
  }

  return (
    <div className="Connexion-container">
      <NavBar bgColor="black" />
      <div className="Connexion col-lg-fluid">
        <div className="row">
          <div className="col-lg-6 content-1 col-12">
            <div>
              <h1>Connectez-vous</h1>
              <p>ou en utilisant votre adresse email</p>
              {errorMessage && (
                <div className="error-message">{errorMessage}</div>
              )}{" "}
              {/* Afficher le message d'erreur */}
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                  sendData(values); // Envoyer les données
                  resetForm(); // Réinitialiser le formulaire après la soumission
                }}
                enableReinitialize={true}
              >
                {({ errors, touched, isSubmitting }) => (
                  <Form>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <Field
                        type="email"
                        name="email"
                        className={`form-control ${
                          touched.email && errors.email ? "is-invalid" : ""
                        }`}
                        id="email"
                        placeholder="Email"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="error"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="password">Mot de passe</label>
                      <Field
                        type="password"
                        className={`form-control ${
                          touched.password && errors.password
                            ? "is-invalid"
                            : ""
                        }`}
                        id="password"
                        name="password"
                        placeholder="Mot de passe"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="error"
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting || isLoading}
                    >
                      {isLoading ? "Chargement..." : "Se connecter"}{" "}
                      {/* Affichage de l'état de chargement */}
                    </button>
                  </Form>
                )}
              </Formik>
              <p>
                {"   Vous n'avez pas de compte?"}
                <NavLink to="/inscription">Créer un compte</NavLink>
              </p>
              <small>
                En vous connectant, vous acceptez les conditions d'utilisation
                et la politique de confidentialité du site.
                <a href="#">
                  Politique de confidentialité . Conditions générales
                </a>
              </small>
            </div>
          </div>

          <div className="col-lg-6 content-2 col-12">
            <div className="content">
              <h1>Hello, Friend!</h1>
              <p>
                Remplissez vos informations personnelles et commencez votre
                voyage avec nous.
              </p>
              <NavLink to="/connexion">Connexion</NavLink>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Connexion;
