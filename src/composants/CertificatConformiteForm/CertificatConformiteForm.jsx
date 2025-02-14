import { Field, Formik, Form, ErrorMessage } from "formik";
import { useState } from "react";
import "./CertificatConformiteForm.css"; // Assurez-vous de créer ce fichier CSS pour le style
import cancel from "/image/cancel.svg"; // Assurez-vous d'avoir cette image dans votre dossier
import { ToastContainer, toast } from "react-toastify"; // Importation de la librairie de notification
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";

function CertificatConformiteForm({ handleClickBack }) {
  const url = "http://localhost:8080/api/declarations";


  const validationSchema = Yup.object({
    nomTechnicien: Yup.string()
      .min(3, "Le nom du technicien doit contenir au moins 3 caractères")
      .required("Le nom du technicien est obligatoire"),
    reference: Yup.string().required("La référence est obligatoire"),
    dateDeclaration: Yup.date().required(
      "La date de déclaration est obligatoire"
    ),
    identifiantDispositif: Yup.string().required(
      "L'identifiant du dispositif est obligatoire"
    ),
    descriptionDispositif: Yup.string()
      .min(
        10,
        "La description du dispositif doit contenir au moins 10 caractères"
      )
      .required("La description du dispositif est obligatoire"),
    refPatient: Yup.string().required(
      "La référence du patient est obligatoire"
    ),
  });

  async function sendData(data) {
    try {
      const response = await fetch(url, {
        method: "POST", // Type de la requête HTTP
        headers: {
          "Content-Type": "application/json", // On précise que l'on envoie des données JSON
        },
        body: JSON.stringify(data), // Convertir les données en JSON pour les envoyer
      });

      // Vérification de la réponse du serveur
      if (response.ok) {
        toast("Déclaration de conformité ajoutée avec succès !", {
          position: "bottom-right",
          autoClose: 5000, // Notification se ferme après 5 secondes
        });
      } else {
        toast(
          "Une erreur s'est produite lors de l'ajout, veuillez réessayer !",
          {
            position: "bottom-right",
            type: "error",
            autoClose: 5000, // Notification se ferme après 5 secondes
          }
        );
      }
    } catch (error) {
      console.error("Erreur réseau:", error);
    }
  }

  return (
    <>
      <div className="container-fluid CertificatConformiteForm">
       
        <Formik
          initialValues={{
            nomTechnicien: "",
            reference: "",
            dateDeclaration: "",
            identifiantDispositif: "",
            descriptionDispositif: "",
            refPatient: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            sendData(values);
            resetForm(); // Réinitialise le formulaire après la soumission
            
          }}
        >
          {({ errors, touched, isSubmitting, resetForm }) => (
            <Form >
              {/* Ajout de resetForm dans l'événement onClick de l'image */}
              <img
                src={cancel}
                alt="Annuler"
                width={30}
                height={30}
                className="icon-icon"
                onClick={() => {
                  resetForm(); // Réinitialiser le formulaire
                 
                }}
              />

              <div className="row">
                <div className="col-lg-6">
                  <Field
                    type="text"
                    name="nomTechnicien"
                    id="nomTechnicien"
                    placeholder="Nom du technicien"
                    className={`form-control my-2 ${
                      touched.nomTechnicien && errors.nomTechnicien
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="nomTechnicien"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="col-lg-6">
                  <Field
                    type="text"
                    name="reference"
                    placeholder="Référence"
                    className={`form-control my-2 ${
                      touched.reference && errors.reference ? "is-invalid" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="reference"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="col-lg-6">
                  <Field
                    type="date"
                    name="dateDeclaration"
                    placeholder="Date de déclaration"
                    className={`form-control my-2 ${
                      touched.dateDeclaration && errors.dateDeclaration
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="dateDeclaration"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="col-lg-6">
                  <Field
                    type="text"
                    name="identifiantDispositif"
                    placeholder="Identifiant du dispositif"
                    className={`form-control my-2 ${
                      touched.identifiantDispositif &&
                      errors.identifiantDispositif
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="identifiantDispositif"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="col-lg-6">
                  <Field
                    type="text"
                    name="descriptionDispositif"
                    placeholder="Description du dispositif"
                    className={`form-control my-2 ${
                      touched.descriptionDispositif &&
                      errors.descriptionDispositif
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="descriptionDispositif"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="col-lg-6">
                  <Field
                    type="text"
                    name="refPatient"
                    placeholder="Référence du patient"
                    className={`form-control my-2 ${
                      touched.refPatient && errors.refPatient
                        ? "is-invalid"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="refPatient"
                    component="div"
                    className="error"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  Ajouter
                </button>
                <a
                href="#"
                  onClick={handleClickBack}
                  className="btn btn-dark ml-2"
                >
                  Retour
                </a>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <ToastContainer />
    </>
  );
}

export default CertificatConformiteForm;
