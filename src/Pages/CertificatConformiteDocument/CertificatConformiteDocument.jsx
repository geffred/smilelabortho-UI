import React, { useState, useContext } from "react";
import useSWR, { mutate } from "swr";
import "./CertificatConformiteDocument.css";
import NavBar from "../../composants/NavBar/NavBar";
import { ToastContainer, toast } from "react-toastify";
import { UserContext } from "../../composants/UserContext";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

// Styles pour le document PDF
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  section: {
    marginBottom: 10,
  },
  sectionEnd: {
    marginBottom: 10,
    textAlign: "right",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  value: {
    fontSize: 12,
    marginBottom: 2,
  },
});

// Composant PDF
const CertificatPDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Certificat de Conformité</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Fabricant</Text>
        <Text style={styles.value}>LABORATOIRE D’ORTHODONTIE Smile lab</Text>
        <Text style={styles.value}>Boulevard Roosevelt 23</Text>
        <Text style={styles.value}>7060 Soignies</Text>
        <Text style={styles.value}>+32(0) 493 35 73 28</Text>
        <Text style={styles.value}>contact@smilelabortho.be</Text>
        <Text style={styles.value}>TVA : BE0794998835</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Technicien responsable</Text>
        <Text style={styles.value}>{data.nomTechnicien}</Text>
      </View>

      <View style={styles.sectionEnd}>
        <Text style={styles.label}>Identifiant du Dispositif</Text>
        <Text style={styles.value}>{data.identifiantDispositif}</Text>
        {/* <Text style={styles.label}>Date de Livraison</Text>
        <Text style={styles.value}>{data.dateDeclaration}</Text> */}
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>
          Ce dispositif est conforme aux exigences essentielles énoncées à
          l'annexe I de l'A.R. du 18/03/1999 relatif aux dispositifs médicaux.
          Les produits utilisés répondent aux obligations et le dispositif a été
          conçu de manière à ne présenter aucun danger pour le patient lorsqu'il
          est utilisé selon les prescriptions du praticien de l'art dentaire.
          Attention: Il peut exister une incompatibilité possible avec des
          métaux ou alliages déja présents en bouche.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Référence du Patient</Text>
        <Text style={styles.value}>{data.refPatient}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Description du Dispositif:</Text>
        <Text style={styles.value}>{data.descriptionDispositif}</Text>
      </View>

      <View style={styles.sectionEnd}>
        <Text style={styles.label}>Date de Déclaration</Text>
        <Text style={styles.value}>{data.dateDeclaration}</Text>
      </View>
    </Page>
  </Document>
);

// Composant principal
function CertificatConformiteDocument({ id, handleClickForm, handleEditForm }) {
  const { user } = useContext(UserContext);

  const { data, error } = useSWR(
    `http://localhost:8080/api/declarations/${id}`,
    (url) => fetch(url).then((res) => res.json())
  );

  const [confirmDelete, setConfirmDelete] = useState(null);

  const handleDelete = async (deleteId) => {
    if (confirmDelete === deleteId) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/declarations/${deleteId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (response.ok) {
          mutate(`http://localhost:8080/api/declarations/${id}`);
          toast("Déclaration supprimée avec succès", {
            position: "bottom-right",
            autoClose: 5000,
          });
        } else {
          toast.error("Erreur lors de la suppression de la déclaration", {
            position: "bottom-right",
            autoClose: 5000,
          });
        }
      } catch (error) {
        toast.error("Erreur réseau", {
          position: "bottom-right",
          autoClose: 5000,
        });
      }
      setConfirmDelete(null);
    } else {
      setConfirmDelete(deleteId);
    }
  };

  if (error) {
    return (
      <div className="bg-light p-3 my-3" style={{ borderRadius: "5px" }}>
        <div className="aucunCertificat">Aucun Certificat</div>
        {user?.roles?.some((role) =>
          ["ROLE_ADMIN", "ROLE_SUPER_ADMIN"].includes(role)
        ) && (
          <button onClick={handleClickForm} className="btn btn-primary ml-3">
            Créer un certificat de Conformité
          </button>
        )}
      </div>
    );
  }

  if (!data) return <div>Chargement en cours...</div>;

  return (
    <div className="certificat-document-container">
      <h1>Certificat de Conformité</h1>

      <section className="certificat-header-start">
        <p>
          <em>Fabricant</em>
          <h2>LABORATOIRE D’ORTHODONTIE Smile lab</h2>
        </p>
        <p>
          <em>Boulevard Roosevelt 23</em>
        </p>
        <p>
          <em>7060 Soignies</em>
        </p>
        <p>
          <em>+32(0) 493 35 73 28</em>
        </p>
        <p>
          <em>contact@smilelabortho.be</em>
        </p>
        <p>
          <em>TVA : BE0794998835</em>
        </p>
        <p className="my-3">
          <em>Technicien responsable</em> <br />
          <span>{data.nomTechnicien}</span>
        </p>
      </section>

      <section className="certificat-header-end">
        <p>
          <em>Identifiant du Dispositif</em> <br />
          <span>{data.identifiantDispositif}</span>
        </p>
        {/*<p>
          <em>Date de Livraison</em> <br />
          <span>{data.dateDeclaration}</span>
        </p> */}
      </section>

      <section className="certificat-body my-5">
        <p>
          <span>
            Ce dispositif est conforme aux exigences essentielles énoncées à
            l'annexe I de l'A.R. du 18/03/1999 relatif aux dispositifs médicaux.
            Les produits utilisés répondent aux obligations et le dispositif a
            été conçu de manière à ne présenter aucun danger pour le patient
            lorsqu'il est utilisé selon les prescriptions du praticien de l'art
            dentaire. Attention: Il peut exister une incompatibilité possible
            avec des métaux ou alliages déja présents en bouche.
          </span>
        </p>
      </section>

      <section className="certificat-header-start my-3">
        <p>
          <em>Référence du Patient </em> <br />
          <span>{data.refPatient}</span>
        </p>
        <em>Description du Dispositif</em> <br />
        <span>{data.descriptionDispositif}</span>
      </section>

      <section className="certificat-header-end">
        <p>
          <em>Date de Déclaration</em> <br />
          <span>{data.dateDeclaration}</span>
        </p>
      </section>

      {user?.roles?.some((role) =>
        ["ROLE_ADMIN", "ROLE_SUPER_ADMIN"].includes(role)
      ) && (
        <div className="edit d-flex justify-start">
          <button className="btn btn-primary mr-2" onClick={handleEditForm}>
            Modifier
          </button>
          <button
            className="btn btn-primary"
            onClick={() => handleDelete(data.id)}
          >
            Supprimer les données dynamiques
          </button>
        </div>
      )}

      <PDFDownloadLink
        document={<CertificatPDF data={data} />}
        fileName="certificat_conformite.pdf"
      >
        {({ loading }) =>
          loading ? "Génération du PDF..." : "Télécharger le Certificat (PDF)"
        }
      </PDFDownloadLink>

      {confirmDelete !== null && (
        <div className="confirm-delete">
          <p>Êtes-vous sûr de vouloir supprimer cette déclaration ?</p>
          <button onClick={() => handleDelete(confirmDelete)}>Oui</button>
          <button className="annuler" onClick={() => setConfirmDelete(null)}>
            Annuler
          </button>
        </div>
      )}
    </div>
  );
}

export default CertificatConformiteDocument;
