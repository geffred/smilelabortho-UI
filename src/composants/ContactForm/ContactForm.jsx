import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./ContactForm.css"; // Import des styles CSS
import location from "/image/location.svg"; // Icone pour l'adresse
import phone from "/image/phone.svg"; // Icone pour le téléphone
import email from "/image/emai.svg"; // Icone pour l'email
import send from "/image/send.svg"; // Icone pour envoyer
import emailjs from "emailjs-com"; // Librairie pour envoyer des emails
import { useRef, useState } from "react"; // Utilisation de useRef et useState
import process from "../../assets/process.png"; // Image de bannière
import { ToastContainer, toast } from "react-toastify"; // Notifications toast
import "react-toastify/dist/ReactToastify.css"; // Style des notifications toast

function ContactForm() {
  const form = useRef(); // Référence au formulaire pour envoyer les données avec emailjs

  // Schéma de validation avec Yup pour valider les champs du formulaire
  const validationSchema = Yup.object({
    nom: Yup.string().required("Nom est requis"),
    prenom: Yup.string().required("Prénom est requis"),
    telephone: Yup.string()
      .matches(/^\+?[0-9]{10,15}$/, "Numéro de téléphone invalide")
      .required("Le numéro de téléphone est requis"),
    email: Yup.string().email("Email invalide").required("Email est requis"),
    message: Yup.string().required("Message est requis"),
  });

  // Fonction pour envoyer l'email avec emailjs
  const sendEmail = () => {
    emailjs
      .sendForm(
        "service_f2vyidp", // Service ID
        "template_blinghi", // Template ID
        form.current, // Référence du formulaire
        "M-ibIQ1aTjGbVU4OK" // User ID
      )
      .then(() => {
        // Message de succès
        toast("Votre message a été envoyé avec succès !", {
          position: "bottom-right",
          autoClose: 5000, // Notification se ferme après 5 secondes
        });
      })
      .catch((error) => {
        // Message d'erreur en cas de problème d'envoi
        toast.error(
          "Une erreur s'est produite lors de l'envoi du message. Veuillez réessayer.",
          {
            position: "bottom-right",
            autoClose: 5000, // Notification se ferme après 5 secondes
          }
        );
      });
  };

  return (
    <>
      <div className="contactForm">
        <ToastContainer /> {/* Affichage des notifications toast */}
        <div>
          {/* Partie gauche avec informations de contact */}
          <div className="left-contact">
            <img src={process} alt="contact_banner" className="cover" />
            <div className="adresse">
              <img src={location} alt="adresse_icon" width={20} />
              <div>
                <h3>Adresse</h3>
                <p>Boulevard Roosevelt 23 7060 Soignies</p>
              </div>
            </div>
            <div className="tel">
              <img src={phone} alt="tel" width={20} />
              <div>
                <h3>Téléphone</h3>
                <p className="important">+32(0) 493 35 73 28</p>
              </div>
            </div>
            <div className="email">
              <img src={email} alt="email" width={20} />
              <div>
                <h3>E-mail</h3>
                <p className="important">contact@smilelabortho.be</p>
              </div>
            </div>
          </div>

          {/* Partie droite avec le formulaire de contact */}
          <div className="container right-contact">
            <Formik
              initialValues={{
                nom: "",
                prenom: "",
                telephone: "",
                email: "",
                message: "",
              }}
              validationSchema={validationSchema} // Applique la validation définie plus haut
              onSubmit={(values, { resetForm }) => {
                sendEmail(); // Appel de la fonction pour envoyer l'email
                resetForm(); // Réinitialise le formulaire après soumission
              }}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form ref={form}>
                  <div className="row">
                    <div className="contact-form">
                      <h1>Formulaire de contact</h1>
                      <p>
                        Laissez-nous un message et nous vous répondrons dans les
                        plus brefs délais
                      </p>
                    </div>

                    {/* Nom et Prénom */}
                    <div className="col-lg-6 col-12">
                      <Field
                        type="text"
                        name="nom"
                        id="nom"
                        className={`form-control ${
                          touched.nom && errors.nom ? "is-invalid" : ""
                        }`}
                        placeholder="Nom"
                      />
                      <ErrorMessage
                        name="nom"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div className="col-lg-6 col-12">
                      <Field
                        type="text"
                        id="prenom"
                        name="prenom"
                        className={`form-control ${
                          touched.prenom && errors.prenom ? "is-invalid" : ""
                        }`}
                        placeholder="Prénom"
                      />
                      <ErrorMessage
                        name="prenom"
                        component="div"
                        className="error"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="row">
                    <div className="col-lg-12 col-12">
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        className={`form-control ${
                          touched.email && errors.email ? "is-invalid" : ""
                        }`}
                        placeholder="Email"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="error"
                      />
                    </div>
                  </div>

                  {/* Téléphone */}
                  <div className="row">
                    <div className="col-lg-12 col-12">
                      <Field
                        type="tel"
                        id="telephone"
                        name="telephone"
                        className={`form-control ${
                          touched.telephone && errors.telephone
                            ? "is-invalid"
                            : ""
                        }`}
                        placeholder="Numéro de téléphone"
                      />
                      <ErrorMessage
                        name="telephone"
                        component="div"
                        className="error"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="row">
                    <div className="col-lg-12 col-12">
                      <Field
                        as="textarea"
                        id="message"
                        name="message"
                        className={`form-control ${
                          touched.message && errors.message ? "is-invalid" : ""
                        }`}
                        placeholder="Écrire un message"
                      />
                      <ErrorMessage
                        name="message"
                        component="div"
                        className="error"
                      />
                    </div>
                  </div>

                  {/* Bouton de soumission */}
                  <button type="submit" disabled={isSubmitting}>
                    <span>Envoyer</span>
                    <img src={send} alt="send_icon" width={20} />
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactForm;
