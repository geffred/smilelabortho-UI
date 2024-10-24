import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import './ContactForm.css';
import location from "/image/location.svg";
import phone from "/image/phone.svg";
import email from "/image/emai.svg";
import send from "/image/send.svg";
import emailjs from 'emailjs-com';
import { useRef } from 'react';
import { useState } from 'react';
import process from '../../assets/process.png'

function ContactForm() {

    const form = useRef();
    const [message,setMessage] = useState(null)

    const validationSchema = Yup.object({
        nom: Yup.string().required('Nom est requis'),
        prenom: Yup.string().required('Prenom est requis'),
        telephone: Yup.string()
            .min(8, 'Le numéro de téléphone doit avoir au moins 8 chiffres')
            .required('Le numéro de téléphone est requis'),
        email: Yup.string()
            .email('Email invalide')
            .required('Email est requis'),
        message: Yup.string().required('Message est requis'),
    });

    const sendEmail = () => {
      
        emailjs.sendForm('service_f2vyidp', 'template_v5lnqrt', form.current, 'M-ibIQ1aTjGbVU4OK')
          .then(() => {
             setMessage('Message envoyé avec succès !');
          }, () => {
              setMessage('Erreur lors de l\'envoi du message. Veuillez réessayer.');
          });
          setTimeout(() => {
            setMessage(null); // Réinitialise le message après 5 secondes
          },7000)
      };

    return (
        <div className="contactForm container">

            <div>
                <div className='left-contact'>
                    <img src={process} alt="contact_banner" className='cover' />
                    <div className='adresse'>
                        <img src={location} alt="adresse_icon" width={20} />
                        <div>
                            <h3>Adresse</h3>
                            <p>Boulevard Roosevelt 23 7060 Soignies</p>
                        </div>
                    </div>
                    <div className='tel'>
                        <img src={phone} alt="tel" width={20} />
                        <div>
                            <h3>Téléphone</h3>
                            <p className='important'>+32(0) 493 35 73 28</p>
                        </div>
                    </div>
                    <div className='email'>
                        <img src={email} alt="email" width={20} />
                        <div>
                            <h3>E-mail</h3>
                            <p className='important'>contact@smilelabortho.be</p>
                        </div>
                    </div>
                </div>

                <div className='container right-contact'>

                    <Formik
                        initialValues={{ nom: "", prenom: "", telephone: "", email: "", message: "" }}
                        validationSchema={validationSchema}
                        onSubmit={(values, { resetForm }) => {
                            console.log("Form data:", values);
                            sendEmail(); // Appel de la fonction pour envoyer l'email
                            resetForm(); // Réinitialise le formulaire après la soumission
                        }}
                        enableReinitialize={true}
                    >
                        {({ errors, touched, isSubmitting }) => (
                            <Form ref={form}>
                                <div className='row'>
                                    <div className='col-lg-6 col-12'>
                                        <Field
                                            type="text"
                                            name="nom"
                                            id="nom"
                                            className={`form-control ${touched.nom && errors.nom ? 'is-invalid' : ''}`}
                                            placeholder="Nom"
                                        />
                                        <ErrorMessage name="nom" component="div" className="error" />
                                    </div>
                                    <div className='col-lg-6 col-12'>
                                        <Field
                                            type="text"
                                            id="prenom"
                                            name="prenom"
                                            className={`form-control ${touched.prenom && errors.prenom ? 'is-invalid' : ''}`}
                                            placeholder="Prénom"
                                        />
                                        <ErrorMessage name="prenom" component="div" className="error" />
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-lg-12 col-12'>
                                        <Field
                                            type="email"
                                            id="email"
                                            name="email"
                                            className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                                            placeholder="Email"
                                        />
                                        <ErrorMessage name="email" component="div" className="error" />
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-lg-12 col-12'>
                                        <Field
                                            type="tel"
                                            id="telephone"
                                            name="telephone"
                                            className={`form-control ${touched.telephone && errors.telephone ? 'is-invalid' : ''}`}
                                            placeholder="Numéro de téléphone"
                                        />
                                        <ErrorMessage name="telephone" component="div" className="error" />
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-lg-12 col-12'>
                                        <Field
                                            as="textarea"
                                            id="message"
                                            name="message"
                                            className={`form-control ${touched.message && errors.message ? 'is-invalid' : ''}`}
                                            placeholder="Écrire un message"
                                        />
                                        <ErrorMessage name="message" component="div" className="error" />
                                    </div>
                                </div>

                                <button type="submit" disabled={isSubmitting}>
                                    <span>Envoyer</span>
                                    <img src={send} alt="send_icon" width={20} />
                                </button>

                                {message!=null?<div className='message'>{message} </div>:null} 
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}

export default ContactForm;
