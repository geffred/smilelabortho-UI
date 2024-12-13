import { Field, Formik, Form, ErrorMessage } from "formik";
import "./CategorieInput.css";
import cancel from "/image/cancel.svg";
import { ToastContainer, toast } from "react-toastify"; // Importation de la librairie de notification
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";


function CategorieInput({onMutate,isDashboard =false , display, setDisplay , editData , reintialiser }) {

  const url ='/api/categories/save'
  const validationSchema = Yup.object({
    titre: Yup.string()
      .min(3, "Le nom de la catégorie doit contenir au moins 3 caractères")
      .required("Le nom de la catégorie est obligatoire"),
    thumbnail: Yup.string()
      .url("L'URL de l'image est invalide")
      .required("L'image de la catégorie est obligatoire"),
  });

  async function sendData(data) {
    try {
      const response = await fetch(url, {
        method: 'POST', // Type de la requête HTTP
        headers: {
          'Content-Type': 'application/json', // On précise que l'on envoie des données JSON
        },
        body: JSON.stringify(data), // Convertir les données en JSON pour les envoyer
      });
  
      // Vérification de la réponse du serveur
      if (response.ok) {
        const responseData = await response.json(); // Extraire la réponse JSON du serveur
        onMutate()
        toast("Catégorie ajoutée avec succès !", {
          position: "bottom-right",
          /*type: "success",*/
          autoClose: 5000, // Notification se ferme après 5 secondes
        });
        /*console.log('Données envoyées avec succès:', responseData);*/
      } else {
         toast("Une erreur c'est produite lors de l'ajout veillez réessayer !", {
           position: "bottom-right",
           type: "error",
           autoClose: 5000, // Notification se ferme après 5 secondes
         });
        /*console.error('Erreur lors de l\'envoi des données:', response.statusText);*/
      }
    } catch (error) {
      console.error('Erreur réseau:', error);
    }
  }


  if (!isDashboard) return null
  return (
    <>
      {" "}
    
      <div className="container-fluid CategorieInput">
        <button
          onClick={() => {
            setDisplay();
            reintialiser();
          }}
          className={display ? "categorie-disable" : null}
        >
          Ajouter Une Categorie
        </button>
        <Formik
          initialValues={editData}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            sendData(values);
            reintialiser();
            resetForm(); // Réinitialise le formulaire après la soumission
          }}
          enableReinitialize={true}
        >
          {({ errors, touched, isSubmitting, resetForm }) => (
            <Form className={display ? "form-show" : "form-hide"}>
              {/* Ajout de resetForm dans l'événement onClick de l'image */}
              <img
                src={cancel}
                alt="Annuler"
                width={30}
                height={30}
                className="icon-icon"
                onClick={() => {
                  resetForm(); // Réinitialiser le formulaire
                  setDisplay(); // Fermer le formulaire
                  reintialiser(); // Réinitialiser les données de la catégorie éditée
                }}
              />

              <div className="row">
                <div className="col-lg-6">
                  <Field
                    type="text"
                    name="titre"
                    id="categorie"
                    placeholder="Nom de la catégorie"
                    className={`form-control my-2 ${
                      touched.titre && errors.titre ? "is-invalid" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="titre"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="col-lg-6">
                  <Field
                    type="text"
                    name="thumbnail"
                    placeholder="http://www.urlthumbnail.com"
                    className={`form-control my-2 ${
                      touched.thumbnail && errors.thumbnail ? "is-invalid" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="thumbnail"
                    component="div"
                    className="error"
                  />
                </div>
              </div>

              <button type="submit" disabled={isSubmitting}>
                Ajouter
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default CategorieInput;
