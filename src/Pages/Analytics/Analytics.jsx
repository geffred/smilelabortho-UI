import useSWR from "swr";
import "./Analytics.css";

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
      <div className="analytics-section">
        <h2>Montant des Commandes par Mois</h2>
        <ul>
          {Object.entries(commandesParMois).map(([mois, { count, total }]) => (
            <li key={mois}>
              {mois}: {count} commandes, {total.toFixed(2)} €
            </li>
          ))}
        </ul>
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
      <div className="analytics-section">
        <h2>Top 5 Utilisateurs</h2>
        <ul>
          {meilleursUtilisateurs.map((utilisateur, index) => (
            <li key={index}>
              {utilisateur.nom}: {utilisateur.commandes} commandes
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Analytics;
