import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import buy from "/image/buy.svg";
import "./CommandeForm.css"
import { useContext } from "react";
import { UserContext } from "../UserContext";
import useSWR from "swr";
import { mutate } from "swr";



function CommandeForm({}) {

    const { user } = useContext(UserContext);
    const urlAdress = `/api/adresses/utilisateur/${user.id}`;
    const urlPanier = `/api/paniers/${user.id}`;
    const fetcher = (url) => fetch(url).then((res) => res.json());
    const { data: adresses } = useSWR(urlAdress, fetcher);
    const { data: paniers } = useSWR(urlPanier, fetcher);

  // Validation des champs avec Yup
  const validationSchema = Yup.object({
    adresseLivraisonId: Yup.string()
      .required("Veuillez sélectionner une adresse de livraison.")
      .notOneOf([""], "Veuillez sélectionner une adresse valide."),
    dateLivraisonSouhaitee: Yup.date()
      .required("Veuillez sélectionner une date de livraison.")
      .min(
        new Date(),
        "La date de livraison souhaitée ne peut pas être dans le passé."
      ),
    commentaire: Yup.string().max(
      500,
      "Le commentaire ne doit pas dépasser 500 caractères."
    ),
  });

  const sendData = async (data) => {
    try {
      const response = await fetch("/api/commandes/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData);
      }

      const responseData = await response.json();
      return responseData;
    } catch (err) {
        console.log(err.message);
    }
  };

  // Fonction simulée pour envoyer les données
  async function handleSubmit(values, { resetForm }) {
    if (!paniers) {
      alert("Erreur : Aucun panier trouvé.");
      return;
    }

    const panierIds = paniers
      .filter((panier) => panier.valider === false)
      .map((panier) => panier.id);
     // Convertit le tableau des paniers en un tableau plat des IDs

    const payload = {
      ...values,
      panierIds, // Tableau plat directement utilisé ici
      utilisateurId: user.id, // Ajout de l'utilisateur
      prixTotalPlusTVA: 0,
      statut: "EN_ATTENTE",
      refPatient: "PAT12345",
    };

    try {
      console.log("Données envoyées :", payload);
      await sendData(payload);
      mutate(`/api/paniers/${user.id}`);
      resetForm();
      alert("Formulaire soumis avec succès !");
    } catch (error) {
      console.error("Erreur lors de la soumission :", error.message);
    }
  }

  return (
    <div className="CommandeForm">
      <h2>Formulaire de Commande</h2>
      <Formik
        initialValues={{
          adresseLivraisonId: "",
          dateLivraisonSouhaitee: "",
          commentaire: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid, resetForm }) => (
          <Form>
            {/* Adresse de Livraison */}
            <div className="form-group">
              <label htmlFor="adresseLivraisonId">Adresse de Livraison</label>
              <Field
                as="select"
                name="adresseLivraisonId"
                id="adresseLivraisonId"
                className=""
              >
                <option value="">Sélectionnez une adresse</option>

                {adresses &&
                  adresses.map((adress) => (
                    <option key={adress.id} value={adress.id}>
                      {adress.entreprise} {adress.rue} {adress.numeroRue}{" "}
                      {adress.ville} {adress.pays}
                    </option>
                  ))}
              </Field>
              <ErrorMessage
                name="adresseLivraisonId"
                component="div"
                className="error"
              />
            </div>

            {/* Date de Livraison Souhaitée */}
            <div className="form-group">
              <label htmlFor="dateLivraisonSouhaitee">
                Date de Livraison Souhaitée
              </label>
              <Field
                type="date"
                name="dateLivraisonSouhaitee"
                id="dateLivraisonSouhaitee"
                className="form-control"
              />
              <ErrorMessage
                name="dateLivraisonSouhaitee"
                component="div"
                className="error"
              />
            </div>

            {/* Commentaire */}
            <div className="form-group">
              <label htmlFor="commentaire">Commentaire</label>
              <Field
                as="textarea"
                name="commentaire"
                id="commentaire"
                rows="4"
                placeholder="Ajoutez un commentaire (facultatif)"
                className="form-control"
              />
              <ErrorMessage
                name="commentaire"
                component="div"
                className="error"
              />
            </div>

            {/* Boutons de soumission et de réinitialisation */}

            <div className="boutton">
              <button
                type="submit"
                disabled={isSubmitting || !isValid}
                className="btn btn-primary"
              >
                <img src={buy} alt="commander_icon" width={30} />

                {isSubmitting ? (
                  <span>Envoi en cours...</span>
                ) : (
                  <span>Commander</span>
                )}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="btn btn-secondary"
              >
                Réinitialiser
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CommandeForm;
