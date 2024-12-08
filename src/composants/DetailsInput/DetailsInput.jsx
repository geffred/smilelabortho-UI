import { Field, Formik, Form, ErrorMessage } from "formik";
import buy from "/image/buy.svg";
import "./DetailsInput.css";
import useSWR, { mutate } from "swr";
import * as Yup from "yup";
import { useState, useContext, useEffect } from "react";
import PanierBtn from "../PanierBtn/PanierBtn";
import { UserContext } from "../UserContext";

function DetailsInput({ data }) {
  const { user } = useContext(UserContext);

  // Chargement des modèles via SWR
  const url = "/api/models/";
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data: models, error, isLoading } = useSWR(url, fetcher);

  // États locaux
  const [modelId, setModelId] = useState(null);
  const [prixTotal, setPrixTotal] = useState(data.prixUnitaire);

  // Calcul du prix total en fonction du modèle sélectionné et de la quantité
  useEffect(() => {
    if (models && modelId) {
      const selectedModel = models.find(
        (model) => model.id === parseInt(modelId)
      );
      if (selectedModel) {
        const coutSupplementaire =
          parseInt(selectedModel.coutSupplementaire, 10) || 0;
        setPrixTotal(parseInt(data.prixUnitaire, 10) + coutSupplementaire);
      }
    }
  }, [modelId, data.prixUnitaire, models]);

  // Fonction pour envoyer les données au backend
  async function sendData(payload) {
    try {
      const response = await fetch("/api/paniers/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Erreur lors de l'envoi : ${response.statusText}`);
      }

      const responseData = await response.json();
      console.log("Données envoyées avec succès :", responseData);

      // Actualise les données du panier après l'ajout
      mutate(`/api/paniers/${user?.id}`);
    } catch (error) {
      console.error("Erreur réseau ou serveur :", error.message);
    }
  }

  // Validation des champs avec Yup
  const validationSchema = Yup.object({
    model: Yup.string()
      .required("Le modèle est obligatoire")
      .notOneOf([""], "Veuillez sélectionner un modèle valide."),
    refPatient: Yup.string().required(
      "La référence du patient est obligatoire"
    ),
    scan3d: Yup.string()
      .required("Le scan 3D est obligatoire")
      .url("L'URL doit être valide."),
    quantite: Yup.number()
      .required("La quantité est obligatoire")
      .integer("La quantité doit être un nombre entier.")
      .positive("La quantité doit être positive.")
      .min(1, "La quantité minimale est 1."),
  });

  if (isLoading) return <p>Chargement des modèles...</p>;
  if (error) return <p>Erreur lors du chargement des modèles.</p>;

  return (
    <div>
      <PanierBtn />
      <div className="row">
        <div className="col-lg-12 details">
          <h1>{data.nom}</h1>
          <p>{prixTotal} €</p>
        </div>
      </div>
      <hr />
      <div className="row">
        <Formik
          initialValues={{
            model: "",
            refPatient: "",
            scan3d: "",
            quantite: 1,
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            const payload = {
              ...values,
              prixTotal,
              nomAppareil: data.nom,
              description: data.description,
              prixUnitaire: data.prixUnitaire,
              thumbnail: data.thumbnail,
              utilisateurId: user?.id,
            };
            sendData(payload);
            resetForm();
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
                  setFieldValue("model", e.target.value);
                }}
              >
                <option value="" disabled>
                  Sélectionnez un modèle
                </option>
                {models?.map((model) => (
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
                className={`form-control my-2 ${
                  touched.refPatient && errors.refPatient ? "is-invalid" : ""
                }`}
              />
              <ErrorMessage
                name="refPatient"
                component="div"
                className="error"
              />

              <Field
                type="text"
                name="scan3d"
                id="scan3d"
                placeholder="Lien drive du scan du patient"
                className={`form-control my-2 ${
                  touched.scan3d && errors.scan3d ? "is-invalid" : ""
                }`}
              />
              <ErrorMessage name="scan3d" component="div" className="error" />

              <div className="detailsFooter">
                <label htmlFor="quantite">Quantité</label>
                <Field
                  type="number"
                  name="quantite"
                  id="quantite"
                  placeholder="1"
                  className={`form-control ${
                    touched.quantite && errors.quantite ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setFieldValue("quantite", e.target.value)}
                />
                <ErrorMessage
                  name="quantite"
                  component="div"
                  className="error"
                />

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
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
