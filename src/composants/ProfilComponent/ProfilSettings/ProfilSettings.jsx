import "./ProfilSettings.css";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import Thumbnail from "../Thumbnail/Thumbnail";
import AdressesForm from "../Adresses/AdressesForm";
import Spinner from "../../Spinner/Spinner";
import { useContext, useState } from "react";
import { UserContext } from "../../UserContext";
import useSWR, { mutate } from "swr";
import { useNavigate } from "react-router-dom";

function ProfilSettings() {
  const { user } = useContext(UserContext); // Utiliser le contexte
  const [updateError, setUpdateError] = useState(null); // État pour les erreurs de mise à jour
  const URL = `/api/auth/utilisateurs/${user.email}`;


  // Fetcher pour récupérer les données utilisateur
  const fetcher = async (url) => {
    const res = await fetch(url, {
      method: "GET",
      credentials: "include", // Inclure les cookies si nécessaire
    });

    if (!res.ok) {
      throw new Error(`Erreur: ${res.statusText}`);
    }

    const contentType = res.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json")) {
      return res.json();
    } else {
      const text = await res.text();
      throw new Error(`Réponse inattendue : ${text}`);
    }
  };

  const { data, error, isLoading } = useSWR(URL, fetcher);

  if (isLoading) return <Spinner />;
  if (error)
    return <div className="error-message">Erreur: {error.message}</div>;

  // Schéma de validation
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Veuillez saisir une adresse email valide")
      .required("L'email est obligatoire"),
    nom: Yup.string()
      .min(3, "Le nom doit contenir au moins 3 caractères")
      .required("Le nom est obligatoire"),
    prenom: Yup.string()
      .min(3, "Le prénom doit contenir au moins 3 caractères")
      .required("Le prénom est obligatoire"),
    tel: Yup.string()
      .matches(/^\+?[0-9]{10,15}$/, "Numéro de téléphone invalide")
  });

  // Fonction pour envoyer les données mises à jour
  const sendData = async (dataUpdate) => {
    try {
      const response = await fetch("/api/auth/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataUpdate),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.log(response.text());
        throw new Error(errorData);
      }

      const responseData = await response.json();
      setUpdateError("Mise à jour réussie !");
      return responseData;
    } catch (err) {
      setUpdateError("Erreur lors de la mise à jour");
      throw err;
    }
  };

  return (
    <div className="profilSettings">
      <Thumbnail
        user={data}
        onMutate={() => mutate(`/api/auth/utilisateurs/${user.email}`)}
      />

      {updateError && <div className="error-message">{updateError}</div>}

      <Formik
        initialValues={{
          email: data?.email || "",
          nom: data?.nom || "",
          prenom: data?.prenom || "",
          tel: data?.tel || "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          sendData({ ...values }); // Envoi des données
          mutate();
          setSubmitting(false); // Arrête le spinner de soumission
        }}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form className="information">
            <div className="row">
              <div className="form-group col-lg-6 col-12">
                <label htmlFor="nom">Nom</label>
                <Field
                  type="text"
                  name="nom"
                  className={`form-control ${
                    touched.nom && errors.nom ? "is-invalid" : ""
                  }`}
                  id="nom"
                  placeholder="Nom"
                />
                <ErrorMessage name="nom" component="div" className="error" />
              </div>

              <div className="form-group col-lg-6 col-12">
                <label htmlFor="prenom">Prénom</label>
                <Field
                  type="text"
                  name="prenom"
                  className={`form-control ${
                    touched.prenom && errors.prenom ? "is-invalid" : ""
                  }`}
                  id="prenom"
                  placeholder="Prénom"
                />
                <ErrorMessage name="prenom" component="div" className="error" />
              </div>
            </div>

            <div className="row">
              <div className="form-group col-lg-6 col-12">
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
                <ErrorMessage name="email" component="div" className="error" />
              </div>

              <div className="form-group col-lg-6 col-12">
                <label htmlFor="tel">Téléphone</label>
                <Field
                  type="text"
                  name="tel"
                  className={`form-control ${
                    touched.tel && errors.tel ? "is-invalid" : ""
                  }`}
                  id="tel"
                  placeholder="+32 2 374 XX XX"
                />
                <ErrorMessage name="tel" component="div" className="error" />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Mise à jour..."
                : "Mettre à jour mes informations"}
            </button>
          </Form>
        )}
      </Formik>

      <AdressesForm />
    </div>
  );
}

export default ProfilSettings;
