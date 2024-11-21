import "./ProfilSettings.css";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import Thumbnail from "../Thumbnail/Thumbnail";
import AdressesForm from "../Adresses/AdressesForm";

function ProfilSettings() {
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Veuillez saisir une adresse email valide")
      .required("L'email est obligatoire"),
    nom: Yup.string()
      .min(3, "Le nom doit contenir au moins 3 caractères")
      .required("Le nom est obligatoire"),
    prenom: Yup.string()
      .min(3, "Le prenom doit contenir au moins 3 caractères")
      .required("Le prenom est obligatoire"),
    telephone: Yup.number()
      .min(10, "Le numero de telephone doit contenir au moins 10 caractères")
      .positive("La valeur doit être un nombre positif")
      .required("Ce champ est obligatoire"),
  });

  return (
    <div className="profilSettings">
      <Thumbnail />
      <Formik
        initialValues={{ email: "", nom: "", prenom: "", telephone :""}}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          resetForm(); // Réinitialise le formulaire après la soumission
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
                <label htmlFor="prenom">Prenom</label>
                <Field
                  type="text"
                  name="prenom"
                  className={`form-control ${
                    touched.prenom && errors.prenom ? "is-invalid" : ""
                  }`}
                  id="prenom"
                  placeholder="prenom"
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
                <label htmlFor="telephone">telephone</label>
                <Field
                  type="number"
                  name="telephone"
                  className={`form-control ${
                    touched.telephone && errors.telephone ? "is-invalid" : ""
                  }`}
                  id="telephone"
                  placeholder=" +32 2 374 XX XX"
                />
                <ErrorMessage
                  name="telephone"
                  component="div"
                  className="error"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              Mettre à jour mes informations
            </button>
          </Form>
        )}
      </Formik>
      <AdressesForm />
    </div>
  );
}

export default ProfilSettings;
