import React, { useState } from "react";
import NavBar from "../../composants/NavBar/NavBar";
import Footer from "../../composants/Footer/Footer";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import "./Inscription.css";

function Inscription() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const url = "/api/auth/register";

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Veuillez saisir une adresse email valide")
      .required("L'email est obligatoire"),
    password: Yup.string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .required("Le mot de passe est obligatoire"),
      nom: Yup.string()
      .required("Le nom est obligatoire"),
      prenom: Yup.string()
      .required("Le prenom est obligatoire"),
  });

  async function sendData(data) {
    setIsLoading(true); // Indiquer que la requête est en cours
    try {
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSuccessMessage(
          "Compte créé avec succès ! Vous pouvez vous connecter."
        );
        setTimeout(() => {
          navigate("/connexion"); // Rediriger après succès
        }, 2000); // Redirection après 2 secondes
      } else {
        const errorData = await response.text();
        setErrorMessage(errorData || "Erreur lors de l'inscription");
      }
    } catch (error) {
      setErrorMessage("Erreur réseau. Veuillez réessayer.");
    } finally {
      setIsLoading(false); // Réinitialiser l'état de chargement
    }
  }

  return (
    <div className="inscription-container">
      <NavBar bgColor="black" />
      <div className="inscription col-lg-fluid">
        <div className="row">
          <div className="col-lg-6 content-1 col-12">
            <div>
              <h1>Créer un compte</h1>
              <p>ou en utilisant votre adresse email</p>

              {errorMessage && (
                <div className="error-message">{errorMessage}</div>
              )}
              {successMessage && (
                <div className="success-message">{successMessage}</div>
              )}

              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                  sendData({
                    nom: values.nom,
                    prenom: values.prenom,
                    telephone: "", // Ajouter une validation pour le numéro de téléphone
                    email: values.email,
                    password: values.password,
                    roles: ["USER"],
                  });
                  resetForm(); // Réinitialise le formulaire après la soumission
                }}
                enableReinitialize={true}
              >
                {({ errors, touched, isSubmitting }) => (
                  <Form>
                    <div className="form-group">
                      <label htmlFor="email">Nom</label>
                      <Field
                        type="text"
                        name="nom"
                        className={`form-control ${
                          touched.nom && errors.nom ? "is-invalid" : ""
                        } ${touched.nom && !errors.nom ? "is-valid" : ""}`}
                        id="nom"
                        placeholder="Nom"
                      />
                      <ErrorMessage
                        name="nom"
                        component="div"
                        className="error"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="prenom">Prenom</label>
                      <Field
                        type="text"
                        name="prenom"
                        className={`form-control ${
                          touched.prenom && errors.prenom ? "is-invalid" : ""
                        } ${touched.prenom && !errors.prenom ? "is-valid" : ""}`}
                        id="prenom"
                        placeholder="Prenom"
                      />
                      <ErrorMessage
                        name="prenom"
                        component="div"
                        className="error"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <Field
                        type="email"
                        name="email"
                        className={`form-control ${
                          touched.email && errors.email ? "is-invalid" : ""
                        } ${touched.email && !errors.email ? "is-valid" : ""}`}
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
                        } ${
                          touched.password && !errors.password ? "is-valid" : ""
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
                      {isLoading ? "Chargement..." : "Créer un compte"}
                    </button>
                  </Form>
                )}
              </Formik>

              <p>
                Vous avez déjà un compte ?{" "}
                <NavLink to="/connexion">Connectez-vous</NavLink>
              </p>

              <small>
                En créant un compte, vous acceptez les conditions d'utilisation
                et la politique de confidentialité du site.
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

export default Inscription;
