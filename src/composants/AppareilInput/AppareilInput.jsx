
import './AppareilInput.css'
import { Field, Formik, Form, ErrorMessage } from "formik";
import cancel from "/image/cancel.svg";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import categorie from '../Categorie/Categorie';
import useSWR from "swr";
import { toast, ToastContainer } from 'react-toastify';

function AppareilInput({onMutate,isDashboard =false , display, setDisplay , editData , reinitialiser }){

  const fetcher = (url) => fetch(url).then((res) => res.json())
  const urlcategorie = `/api/categories/`;
  const url ='/api/appareils/save'
  const { data } = useSWR(urlcategorie,fetcher);

  const validationSchema = Yup.object({
    nom: Yup.string()
      .min(3, "Le nom de l' appareil doit contenir au moins 3 caractères")
      .required("Le nom de l' appareil est obligatoire"),
    thumbnail: Yup.string()
      .url("L'URL de l'image est invalide")
      .required("L'image de l' appareil est obligatoire"),
    prixUnitaire:Yup.string()
      .required("Le prix Unitaire est obligatoire"),
      categorie: Yup.string()
      .required("La categorie est obligatoire"),
    description: Yup.string()
    .min(20, "La description de l' appareil doit contenir au moins 20 caractères")
   
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
        toast("Données envoyées avec succès !");
        console.log('Données envoyées avec succès:', responseData);
      } else {
        console.error('Erreur lors de l\'envoi des données:', response.statusText);
        toast.error("Erreur lors de l'envoi des données !");
      }
    } catch (error) {
      console.error('Erreur réseau:', error);
      toast.error("Erreur réseau , veillez réessayer!");
    }
  }


  if (!isDashboard) return null
  return (
    <div className="container-fluid AppareilInput">
     
      <button
       onClick={() => {  
        setDisplay()
       
       } }
       className={display ? "appareil-disable" : null}
       >
        Ajouter Une appareil
      </button>

      <Formik
        initialValues={editData}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
            sendData(values);
            reinitialiser()
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
              className='icon-icon'
              onClick={() => {
                resetForm(); // Réinitialiser le formulaire
                reinitialiser()
                setDisplay(); // Fermer le formulaire
                
              }}
            />

            <div className="row">
              <div className="col-lg-6">
                <Field
                  type="text"
                  name="nom"
                  id="appareil"
                  placeholder="Nom de l'appareil"
                  className={`form-control my-2 ${touched.nom && errors.nom ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="nom" component="div" className="error" />
              </div>

              <div className="col-lg-6">
                <Field
                  type="text"
                  name="prixUnitaire"
                  id="appareil"
                  placeholder="Prix Unitaire"
                  className={`form-control my-2 ${touched.prixUnitaire && errors.prixUnitaire ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="prixUnitaire" component="div" className="error" />
              </div>
              
            </div>

            <div className='row'>

                <div className="col-lg-6">
                    <Field
                    type="text"
                    name="thumbnail"
                    placeholder="http://www.urlthumbnail.com"
                    className={`form-control my-2 ${touched.thumbnail && errors.thumbnail ? 'is-invalid' : ''}`}
                    />
                    <ErrorMessage name="thumbnail" component="div" className="error" />
                </div>

                <div className="col-lg-6">
                    <Field
                      as="select"
                      name="categorie"
                      className={` my-2 ${touched.categorie && errors.categorie ? 'is-invalid' : ''}`}
                    >
                    <option value="" disabled >Sélectionnez une catégorie</option>
                    {data && data.map((categorie) => (
                      <option key={categorie.id} value={categorie.id}>
                        {categorie.titre}
                      </option>
                    ))}
                    </Field>
                    <ErrorMessage name="categorie" component="div" className="error" />
                </div>

                <div className="col-lg-12">
                    <Field
                    as='textarea'
                    name="description"
                    id="description"
                    placeholder="Description de l'appareil"
                    className={`form-control my-2 ${touched.description && errors.description ? 'is-invalid' : ''}`}
                    />
                    <ErrorMessage name="description" component="div" className="error" />
                </div>

            </div>

            <button type="submit" disabled={isSubmitting}>
              Ajouter
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AppareilInput;