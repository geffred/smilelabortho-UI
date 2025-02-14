import React from "react";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
//import "./CertificatConformiteDocument.css"; // Pour les styles supplémentaires si nécessaire

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
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  value: {
    fontSize: 12,
    marginBottom: 10,
  },
});

// Composant PDF
const CertificatPDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Certificat de Conformité</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Nom du Technicien:</Text>
        <Text style={styles.value}>{data.nomTechnicien}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Référence:</Text>
        <Text style={styles.value}>{data.reference}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Date de Déclaration:</Text>
        <Text style={styles.value}>{data.dateDeclaration}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Identifiant du Dispositif:</Text>
        <Text style={styles.value}>{data.identifiantDispositif}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Description du Dispositif:</Text>
        <Text style={styles.value}>{data.descriptionDispositif}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Référence du Patient:</Text>
        <Text style={styles.value}>{data.refPatient}</Text>
      </View>
    </Page>
  </Document>
);

// Composant principal
function CertificatConformiteDocument() {
  const {id} = useParams();
  const { data, error } = useSWR(
    "http://localhost:8080/api/declarations/"+10,
    (url) => fetch(url).then((res) => res.json())
  );

  if (error) return <div>Erreur lors du chargement des données.</div>;
  if (!data) return <div>Chargement en cours...</div>;

  return (
    <div className="certificat-document-container">
      <h1>Certificat de Conformité</h1>

      {/* Afficher les données */}
      <div className="certificat-info">
        <p>
          <strong>Nom du Technicien:</strong> {data.nomTechnicien}
        </p>
        <p>
          <strong>Référence:</strong> {data.reference}
        </p>
        <p>
          <strong>Date de Déclaration:</strong> {data.dateDeclaration}
        </p>
        <p>
          <strong>Identifiant du Dispositif:</strong>{" "}
          {data.identifiantDispositif}
        </p>
        <p>
          <strong>Description du Dispositif:</strong>{" "}
          {data.descriptionDispositif}
        </p>
        <p>
          <strong>Référence du Patient:</strong> {data.refPatient}
        </p>
      </div>

      {/* Bouton pour télécharger le PDF */}
      <PDFDownloadLink
        document={<CertificatPDF data={data} />}
        fileName="certificat_conformite.pdf"
      >
        {({ loading }) =>
          loading ? "Génération du PDF..." : "Télécharger le Certificat (PDF)"
        }
      </PDFDownloadLink>
    </div>
  );
}

export default CertificatConformiteDocument;
