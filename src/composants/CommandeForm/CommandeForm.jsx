import React, { useContext, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { loadStripe } from "@stripe/stripe-js";
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import emailjs from "emailjs-com";
import { UserContext } from "../UserContext";
import useSWR from "swr";
import { mutate } from "swr";
import buy from "/image/buy.svg";
import "./CommandeForm.css";
import { ToastContainer, toast } from "react-toastify"; // Notifications toast
import "react-toastify/dist/ReactToastify.css"; // Style des notifications toast



function CommandeForm({ prixTotal }) {
  const { user } = useContext(UserContext);
  const urlAdress = `/api/adresses/utilisateur/${user.id}`;
  const urlPanier = `/api/paniers/${user.id}`;
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data: adresses } = useSWR(urlAdress, fetcher);
  const { data: paniers } = useSWR(urlPanier, fetcher);
  const prixTotalPlusTVA = (prixTotal * 21) / 100 + prixTotal;
  const [payment , setPayment] = useState(true);

  const stripe = useStripe();
  const elements = useElements();
  const [paymentStatus, setPaymentStatus] = useState("");

  const validationSchema = Yup.object({
    adresseLivraisonId: Yup.string()
      .required("Veuillez sélectionner une adresse de livraison.")
      .notOneOf([""], "Veuillez sélectionner une adresse valide."),
    adresseFacturationId: Yup.string()
      .required("Veuillez sélectionner une adresse de facturation.")
      .notOneOf([""], "Veuillez sélectionner une adresse valide."),
    dateLivraisonSouhaitee: Yup.date()
      .required("Veuillez sélectionner une date de livraison.")
      .min(
        new Date(),
        "La date de livraison souhaitée ne peut pas être aujourd'hui ou dans le passé."
      ),
    commentaire: Yup.string().max(
      500,
      "Le commentaire ne doit pas dépasser 500 caractères."
    ),
  });

  console.log(payment)

    async function handleSubmit(values, { resetForm }) {
      // Vérifiez si le panier contient des articles
      if (
        !paniers ||
        paniers.filter((panier) => !panier.valider).length === 0
      ) {
        toast.error(
          "Votre panier est vide. Vous ne pouvez pas passer de commande.",
          {
            autoClose: 3000,
          }
        );
        return;
      }

      // Vérifiez si le paiement est obligatoire
      if (payment && !stripe) {
        toast.error(
          "Veuillez effectuer le paiement pour valider votre commande.",
          {
            autoClose: 3000,
          }
        );
        return;
      }

      const panierIds = paniers
        .filter((panier) => !panier.valider)
        .map((panier) => panier.id);
      const payload = {
        ...values,
        panierIds,
        utilisateurId: user.id,
        prixTotalPlusTVA,
        statut: "EN_ATTENTE",
        payer: payment,
      };

      try {
        if (payment) {
          const { clientSecret } = await fetch(
            "/api/payments/create-payment-intent",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ amount: prixTotalPlusTVA}), // Montant en cents
            }
          ).then((res) => res.json());

          const cardElement = elements.getElement(CardElement);
          const { paymentIntent, error } = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: cardElement,
              },
            }
          );

          console.log(clientSecret);

          if (error) {
            setPaymentStatus("Erreur de paiement : " + error.message);
            return;
          }

          setPaymentStatus("Paiement réussi !");
        }

        emailjs
          .send(
            "service_f2vyidp",
            "template_v5lnqrt",
            {
              user_email: user.email,
              prix_total: prixTotalPlusTVA,
              date_livraison: values.dateLivraisonSouhaitee,
              commentaire: values.commentaire,
              message:
                "Votre Commande a bien été prise en compte notre équipe se met au travail !",
            },
            "M-ibIQ1aTjGbVU4OK"
          )
          .then(
            () =>
              toast("Email de confirmation envoyé avec succès !", {
                autoClose: 3000,
              }),
            (error) =>
              toast.error("Erreur lors de l'envoi de l'email " + error, {
                autoClose: 3000,
              })
          );

        await fetch("/api/commandes/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        mutate(`/api/paniers/${user.id}`);
        resetForm();
        toast("Commande soumise avec succès !", { autoClose: 3000 });
      } catch (error) {
        console.error(
          "Erreur lors du traitement de la commande :",
          error.message
        );
        toast.error("Erreur lors du traitement de la commande.", {
          autoClose: 3000,
        });
      }
    }


  return (
    <div className="CommandeForm">
      <ToastContainer />
      <h2>Formulaire de Commande</h2>
      <Formik
        initialValues={{
          adresseLivraisonId: "",
          adresseFacturationId: "",
          dateLivraisonSouhaitee: "",
          commentaire: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid, resetForm }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="adresseLivraisonId">Adresse de Livraison</label>
              <Field
                as="select"
                name="adresseLivraisonId"
                id="adresseLivraisonId"
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

            <div className="form-group">
              <label htmlFor="adresseFacturationId">
                Adresse de Facturation
              </label>
              <Field
                as="select"
                name="adresseFacturationId"
                id="adresseFacturationId"
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
                name="adresseFacturationId"
                component="div"
                className="error"
              />
            </div>

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

            <div className="d-flex justify-content-between p-2">
              <span>Prix Total </span>
              <span> {prixTotal} €</span>
            </div>
            <div className="d-flex justify-content-between p-2">
              <span>Prix Total plus TVA (21%) </span>
              <span> {prixTotalPlusTVA} €</span>
            </div>

            {payment && (
              <div className="form-group">
                <label>Paiement</label>
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                      },
                    },
                    hidePostalCode: true,
                  }}
                />
              </div>
            )}

            <div className="form-group payer-group">
              <input
                type="checkbox"
                className="check"
                id="payer"
                value={false}
                onChange={(e) => setPayment(!e.target.checked)}
              />
              <label htmlFor="payer"> Payer plus tard ?</label>
            </div>

            <div className="boutton">
              <button
                type="submit"
                disabled={isSubmitting || !isValid || !stripe}
                className="btn-commande"
              >
                <img src={buy} alt="commander_icon" width={30} />
                {isSubmitting ? "Envoi en cours..." : "Commander"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="btn-commande"
              >
                Réinitialiser
              </button>
            </div>

            {paymentStatus && <p>{paymentStatus}</p>}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CommandeForm;
