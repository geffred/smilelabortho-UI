import "./ModelAppareilInput.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import cancel from "/image/cancel.svg";
import { toast } from "react-toastify"; // Toastify pour les notifications

function ModelAppareilInput({onMutate,isDashboard =false , display, setDisplay , editData , reinitialiser }) {
    
      const url ='/api/models/'
    
    const validationSchema = Yup.object({
        nom: Yup.string()
           .required("Nom du modèle est obligatoire")
           .min(3, "Le nom du modèle doit faire au minimum 3 caractères"),
        coutSupplementaire: Yup.number()
           .required("Coût supplémentaire est obligatoire"),
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
            console.log('Données envoyées avec succès:', responseData);
            toast('Modèle Appareil ajouté avec succès', {
              position: "bottom-right",
              autoClose: 5000, // Notification se ferme après 5 secondes
            });
          } else {
            console.error('Erreur lors de l\'envoi des données:', response.statusText);
          }
        } catch (error) {
          console.error('Erreur réseau:', error);
        }
      }
    
    return (
        <div className="container-fluid ModelAppareilInput">
            <button
            onClick={() => {setDisplay()} }
            className={display ? "modelAppareil-disable" : ""}
            >
                Ajouter un nouveau modèle
            </button>
            <Formik
                validationSchema={validationSchema}
                initialValues={editData}
                onSubmit={(values, { resetForm }) => {
                    sendData(values)
                    resetForm(); 
                    reinitialiser();
                }}
                enableReinitialize={true}
            >
                {({ errors, touched, isSubmitting , resetForm }) => (
                    <Form className={display ? "row form-show" : "row form-hide"}>
                        <img
                            src={cancel}
                            alt="Annuler"
                            width={30}
                            height={30}
                            className="icon-icon"
                            onClick={() => {
                                resetForm(); // Réinitialiser le formulaire
                                reinitialiser()
                                setDisplay(); // Fermer le formulaire
                            }}
                        />
                        <div className="col-lg-12 col-12 form-group">
                            {/*<label htmlFor="nom">Nom du modèle</label> */}
                            <Field
                                type="text"
                                name="nom"
                                className={`form-control ${touched.nom && errors.nom ? 'is-invalid' : ''}`}
                                id="nom"
                                placeholder="Nom du modèle"
                            />
                            <ErrorMessage name="nom" component="div" className="error" />
                        </div>

                        <div className="col-lg-12 col-12 form-group">
                            {/*<label htmlFor="coutSupplementaire">Coût Supplémentaire</label> */}
                            <Field
                                type="number"
                                name="coutSupplementaire"
                                className={`form-control ${touched.coutSupplementaire && errors.coutSupplementaire ? 'is-invalid' : ''}`}
                                id="coutSupplementaire"
                                placeholder="Coût Supplémentaire"
                            />
                            <ErrorMessage name="coutSupplementaire" component="div" className="error" />
                        </div>

                        <div className="col-lg-12">
                            <button type="submit"disabled={isSubmitting}>
                                Ajouter
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default ModelAppareilInput;
