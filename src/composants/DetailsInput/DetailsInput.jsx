import { Field, Formik, Form, ErrorMessage } from "formik";
import buy from '/image/buy.svg';
import "./DetailsInput.css";
import useSWR from 'swr';
import * as Yup from "yup";
import { useEffect, useState } from "react";
import PanierBtn from "../PanierBtn/PanierBtn";

function DetailsInput({ data }) {
  const url = '/api/models/';
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data: models, error, isLoading } = useSWR(url, fetcher);
  const [modelId, setModelId] = useState(0);
  const [prixTotal , setPrixTotal] = useState(data.prixUnitaire);
  const [quantite,setQuantite] = useState(1);
  const [categorie,setCategorie] = useState("");
  const [prixModel,setPrixModel] = useState(0);
  const [update, setUpdate] = useState(false);

  const validationSchema = Yup.object({
    model: Yup.string()
      .required('Le model est obligatoire')
      .notOneOf([""], "Veuillez sélectionner un modèle valide."),
    refPatient: Yup.string().required("La référence du patient est obligatoire"),
    scan3d: Yup.string()
      .required("Le scan 3D est obligatoire")
      .url("L'URL doit être valide."),
    quantite: Yup.number()
      .required("La quantité est obligatoire")
      .integer("La quantité doit être un nombre entier.")
      .positive("La quantité doit être positive.")
      .min(1, "La quantité minimale est 1."),
      
  });

  async function sendData(data) {
    try {
      const response = await fetch('/api/paniers/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Erreur lors de l'envoi : ${response.statusText}`);
      }

      const responseData = await response.json();
      console.log('Données envoyées avec succès:', responseData);
    } catch (error) {
      console.error('Erreur réseau ou serveur:', error.message);
      alert("Une erreur s'est produite lors de l'envoi des données.");
    }
  }

  
  useEffect(()=>{
    if(quantite <= 0 ) setQuantite(1)
    models && models.forEach(model =>{
        if(model.id == modelId){
            setCategorie(model.nom)
            setPrixModel(model.coutSupplementaire) //
          setPrixTotal( ( parseInt(data.prixUnitaire,10) + parseInt(model.coutSupplementaire,10) ) * quantite)
        }
    })
  },[modelId,quantite])

  if (isLoading) return <p>Chargement des modèles...</p>;
  if (error) return <p>Erreur lors du chargement des modèles.</p>;

  return (
    <div>
      <PanierBtn dependencies={update} />
      <div className="row">
        <div className="col-lg-12 details">
          <h1>{data.nom}</h1>
          <p>{prixTotal} €</p>
        </div>
      </div>
      <hr />
      <div className="row">
        <Formik
          initialValues={{ model: "", refPatient: "", scan3d: "", quantite: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            sendData({ ...values , prixTotal: prixTotal ,nomAppreil: data.nom , description: data.description , prixUnitaire: data.prixUnitaire,thumbnail: data.thumbnail,categorie:categorie,prixModel:prixModel});
            resetForm();
            setUpdate(!update)
          }}
          enableReinitialize
        >
          {({ setFieldValue, errors, touched, isSubmitting }) => (
            <Form className="col-lg-12">
              <Field
                as="select"
                name="model"
                id="model"
                onChange={(e) => {
                  setModelId(e.target.value);
                  setFieldValue('model', e.target.value);
                }}
              >
                <option value="" disabled >Sélectionnez un modèle</option>
                {models &&
                  models.map((model) => (
                    <option key={model.id} value={model.id}>
                      {model.nom}
                    </option>
                  ))}
              </Field>
              <ErrorMessage name="model" component="div" className="error" />

              <Field
                type="text"
                name="refPatient"
                id="refPatient"
                placeholder="Référence patient"
                className={`form-control my-2 ${touched.refPatient && errors.refPatient ? 'is-invalid' : ''}`}
              />
              <ErrorMessage name="refPatient" component="div" className="error" />

              <Field
                type="text"
                name="scan3d"
                id="scan3d"
                placeholder="Lien drive du scan du patient"
                className={`form-control my-2 ${touched.scan3d && errors.scan3d ? 'is-invalid' : ''}`}
              />
              <ErrorMessage name="scan3d" component="div" className="error" />

              <div className="detailsFooter">
                <label htmlFor="quantite">Quantité</label>
                <Field
                  type="number"
                  name="quantite"
                  id="quantite"
                  onChange={(e) =>{
                    setQuantite(e.target.value) 
                    setFieldValue('quantite', e.target.value);
                  }}
                  placeholder="1"
                  className={`form-control ${touched.quantite && errors.quantite ? 'is-invalid' : ''}`}
                />
                <ErrorMessage name="quantite" component="div" className="error" />

                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                  <span>Ajouter au Panier</span>
                  <img src={buy} alt="buy_icon" width={25} />
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default DetailsInput;
