import useSWR from "swr";
import "./Analytics.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

// Enregistrer les composants nécessaires de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function Analytics() {
  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data: utilisateurs } = useSWR("/api/auth/utilisateurs/", fetcher);
  const { data: categories } = useSWR("/api/categories/", fetcher);
  const { data: appareils } = useSWR("/api/appareils/", fetcher);
  const { data: models } = useSWR("/api/models/", fetcher);
  const { data: commandes } = useSWR("/api/commandes/", fetcher);
  const { data: paniers } = useSWR("/api/paniers/", fetcher);

  if (
    !utilisateurs ||
    !categories ||
    !appareils ||
    !models ||
    !commandes ||
    !paniers
  ) {
    return <div>Loading...</div>;
  }

  // Calculs des analytics
  const totalUtilisateurs = utilisateurs.length;
  const totalCategories = categories.length;
  const totalAppareils = appareils.length;
  const totalModels = models.length;

  // Évolution des utilisateurs par mois (exemple)
  const utilisateursParMois = utilisateurs.reduce((acc, utilisateur) => {
    const mois = new Date(utilisateur.dateInscription).toLocaleString(
      "default",
      {
        month: "long",
        year: "numeric",
      }
    );
    acc[mois] = (acc[mois] || 0) + 1;
    return acc;
  }, {});

  // Montant total des commandes classé par mois
  const commandesParMois = commandes.reduce((acc, commande) => {
    const mois = new Date(commande.dateCommande).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    acc[mois] = acc[mois] || { count: 0, total: 0 };
    acc[mois].count++;
    acc[mois].total += commande.prixTotalPlusTVA;
    return acc;
  }, {});

  // Appareils les plus ajoutés au panier
  const appareilsPopularity = paniers.reduce((acc, panier) => {
    acc[panier.nomAppareil] = (acc[panier.nomAppareil] || 0) + panier.quantite;
    return acc;
  }, {});
  const appareilsLesPlusAjoutes = Object.entries(appareilsPopularity)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Les 5 meilleurs utilisateurs
  const utilisateursCommandeCount = commandes.reduce((acc, commande) => {
    acc[commande.utilisateurId] = (acc[commande.utilisateurId] || 0) + 1;
    return acc;
  }, {});
  const meilleursUtilisateurs = Object.entries(utilisateursCommandeCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([id, count]) => {
      const utilisateur = utilisateurs.find((u) => u.id === parseInt(id));
      return {
        nom: `${utilisateur.nom} ${utilisateur.prenom}`,
        commandes: count,
      };
    });

  // Préparation des données pour les graphiques
  const moisUtilisateurs = Object.keys(utilisateursParMois);
  const dataUtilisateurs = Object.values(utilisateursParMois);

  const moisCommandes = Object.keys(commandesParMois);
  const dataMontantCommandes = moisCommandes.map(
    (mois) => commandesParMois[mois].total
  );
  const dataNombreCommandes = moisCommandes.map(
    (mois) => commandesParMois[mois].count
  );

  const topUtilisateursLabels = meilleursUtilisateurs.map((u) => u.nom);
  const topUtilisateursData = meilleursUtilisateurs.map((u) => u.commandes);

  return (
    <div className="analytics-container">
      <div className="analytics-cards">
        <div className="card">
          <img
            src="/public/image/user-profil.svg"
            alt="user"
            className="icon-icon"
          />
          <span>{totalUtilisateurs}</span>
        </div>
        <div className="card">
          <img src="/image/teeth.svg" alt="user" className="icon-icon" />
          <span>{totalCategories}</span>
        </div>
        <div className="card">
          <img src="/image/device.svg" alt="user" className="icon-icon" />
          <span> {totalAppareils}</span>
        </div>
        <div className="card">
          <img src="/image/circle.svg" alt="user" className="icon-icon" />
          <span>{totalModels}</span>
        </div>
      </div>

      <div className="chart-container">
        <h2>Évolution du nombre d'utilisateurs</h2>
        <Line
          data={{
            labels: moisUtilisateurs,
            datasets: [
              {
                label: "Nombre d'utilisateurs",
                data: dataUtilisateurs,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
                fill: true,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
            },
          }}
        />
      </div>

      <div className="chart-container">
        <h2>Montant des Commandes par Mois</h2>
        <Bar
          data={{
            labels: moisCommandes,
            datasets: [
              {
                label: "Montant total (€)",
                data: dataMontantCommandes,
                backgroundColor: "rgba(54, 162, 235, 0.5)",
              },
              {
                label: "Nombre de commandes",
                data: dataNombreCommandes,
                backgroundColor: "rgba(255, 99, 132, 0.5)",
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
            },
          }}
        />
      </div>

      <div className="chart-container">
        <h2>Top 5 Utilisateurs</h2>
        <Bar
          data={{
            labels: topUtilisateursLabels,
            datasets: [
              {
                label: "Nombre de commandes",
                data: topUtilisateursData,
                backgroundColor: "rgba(153, 102, 255, 0.5)",
              },
            ],
          }}
          options={{
            indexAxis: "y",
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
            },
          }}
        />
      </div>

      <div className="analytics-section">
        <h2>Appareils les Plus Ajoutés au Panier</h2>
        <ul>
          {appareilsLesPlusAjoutes.map(([nom, quantite]) => (
            <li key={nom}>
              {nom}: {quantite} fois
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Analytics;
