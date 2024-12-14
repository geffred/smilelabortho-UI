import { useState } from "react";
import "./AdressesForm.css"
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import locationProfil from "/image/location-profil.svg"
import { useContext} from "react";
import { UserContext } from "../../UserContext";
import {  toast } from "react-toastify"; // Notifications toast
import "react-toastify/dist/ReactToastify.css"; // Style des notifications toast
import { mutate } from "swr";


function AdressesForm({ editValue = null, ajouterBtn = true , display = false}) {
  const { user } = useContext(UserContext); // Utiliser le contexte
  const url = `/api/adresses/utilisateur/${user.id}`;
  console.log(user);
  const [adress, setAdress] = useState(display);
  const initialValues = {
    entreprise: "",
    rue: "",
    ville: "",
    pays: "",
    codePostal: "",
    numeroRue: "",
  };
  const validationSchema = Yup.object({
    entreprise: Yup.string().required("Le nom de l'entreprise est obligatoire"),
    numeroRue: Yup.number()
      .positive("le numéro de la rue est un nombre positif")
      .required("le numéro de la rue est obligatoire"),
    rue: Yup.string().required("Le nom de la rue est obligatoire"),
    codePostal: Yup.string()
      .matches(/^\d{4}$/, "Le code postal doit contenir exactement 4 chiffres")
      .required("Le code postal est obligatoire"),
    ville: Yup.string().required("La ville est obligatoire"),
    pays: Yup.string()
      .trim("Le pays ne peut pas contenir uniquement des espaces")
      .required("Le pays est obligatoire"),
  });

  const sendData = async (dataUpdate) => {
    try {
      const response = await fetch("/api/adresses/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataUpdate),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData);
      }

      const responseData = await response.json();
      toast("Ajout réussie !", {
        position: "bottom-right",
        autoClose: 5000, // Notification se ferme après 5 secondes
      });
      mutate(url);
      return responseData;
    } catch (err) {
      toast.error("Erreur lors l'ajout de l'adresse", {
        position: "bottom-right",
        autoClose: 5000, // Notification se ferme après 5 secondes
      });
      throw err;
    }
  };

  return (
    <div className="AdressesForm">
      {ajouterBtn && (
        <button className="adress-btn" onClick={() => setAdress(!adress)}>
          <img src={locationProfil} alt="" width={30} className="icon-icon" />
          <span>Ajouter Une Adresse</span>
        </button>
      )}
      {adress && (
        <div className="d-flex justify-content-end">
          <img
            src="/public/image/cancel.svg"
            alt="cancel"
            width={30}
            className="icon-icon"
            onClick={() => setAdress(false)}
          />
        </div>
      )}
      <Formik
        initialValues={editValue || initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          sendData({ ...values, utilisateurId: user.id });
          resetForm(); // Réinitialise le formulaire après la soumission
        }}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form>
            {adress && (
              <section className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <label htmlFor="entreprise">Nom de l'entreprise</label>
                    <Field
                      type="text"
                      name="entreprise"
                      className={`form-control ${
                        touched.entreprise && errors.entreprise
                          ? "is-invalid"
                          : ""
                      }`}
                      id="entreprise"
                      placeholder="Nom de l'entreprise"
                    />
                    <ErrorMessage
                      name="entreprise"
                      component="div"
                      className="error"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label htmlFor="entreprise">Nom de rue</label>
                    <Field
                      type="text"
                      name="rue"
                      className={`form-control ${
                        touched.rue && errors.rue ? "is-invalid" : ""
                      }`}
                      id="rue"
                      placeholder="Nom de la rue"
                    />
                    <ErrorMessage
                      name="rue"
                      component="div"
                      className="error"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label htmlFor="entreprise">Numéro de la rue</label>
                    <Field
                      type="number"
                      name="numeroRue"
                      className={`form-control ${
                        touched.numeroRue && errors.numeroRue
                          ? "is-invalid"
                          : ""
                      }`}
                      id="numeroRue"
                      placeholder="Numéro de la rue"
                    />

                    <ErrorMessage
                      name="numeroRue"
                      component="div"
                      className="error"
                    />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form-group">
                    <label htmlFor="entreprise">Code Postal</label>
                    <Field
                      type="text"
                      name="codePostal"
                      className={`form-control ${
                        touched.codePostal && errors.codePostal
                          ? "is-invalid"
                          : ""
                      }`}
                      id="codePostal"
                      placeholder="Code postal"
                    />

                    <ErrorMessage
                      name="codePostal"
                      component="div"
                      className="error"
                    />
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="form-group">
                    <label htmlFor="entreprise">Ville</label>
                    <Field
                      type="text"
                      name="ville"
                      className={`form-control ${
                        touched.ville && errors.ville ? "is-invalid" : ""
                      }`}
                      id="ville"
                      placeholder="Ville"
                    />
                    <ErrorMessage
                      name="ville"
                      component="div"
                      className="error"
                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-group">
                    <label htmlFor="entreprise">Pays</label>
                    <Field
                      type="text"
                      name="pays"
                      className={`form-control ${
                        touched.pays && errors.pays ? "is-invalid" : ""
                      }`}
                      id="pays"
                      placeholder="pays"
                    />
                    <ErrorMessage
                      name="pays"
                      component="div"
                      className="error"
                    />
                  </div>
                </div>

                <div className="col-12 d-flex justify-content-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    Ajouter
                  </button>
                </div>
              </section>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}


export default AdressesForm;