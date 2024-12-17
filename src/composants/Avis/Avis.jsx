import "./Avis.css";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const Temoignages = () => {
  const data = [
    {
      id: 1,
      nom: "Morgel Svetlana",
      description:
        "DSO, CEO Smiley's Orthodontics, Coordinatrice des post-gradués en orthodontie ULB Erasme",
      content1:
        "Excellent labo ! Très satisfaite de leur travail. Personnellement, je suis fan de leurs disjoncteurs frittés.",
      content2:
        "Équipe professionnelle, efficace et respectant nos prescriptions. Ils sont disponibles pour répondre aux questions. Livraison en temps et en heure.",
    },
    {
      id: 2,
      nom: "Anne Flore Latournerie",
      description: "DSO",
      content1:
        "Cela fait 6 mois que je travaille avec Smile Lab et j'en suis très contente. Les appareils demandés sont de très bonne qualité et l'équipe est très réactive.",
      content2: "",
    },
    {
      id: 3,
      nom: "Bouzelmat Safia",
      description: "DSO, Lys Dental",
      content1:
        "Très bon laboratoire d'orthodontie. Il est possible de réaliser tout type d'appareil de façon très personnalisée. La communication est privilégiée, ce qui facilite grandement les échanges avec le labo.",
      content2: "Je recommande !",
    },
    {
      id: 4,
      nom: "Prof Dr Maria Orellana",
      description:
        "Professor and Clinic Director of the Orthodontic Program at the Université Libre de Bruxelles (ULB) at the Erasme Hospital",
      content1:
        "Appareils de qualité, service impeccable, et le plus important : un processus entièrement digital qui nous permet de gagner du temps au fauteuil et d’augmenter drastiquement la qualité de l'expérience patient.",
      content2: "Je recommande !",
    },
    {
      id: 5,
      nom: "El Hajjaji Mohssin",
      description:
        "DSO, CEO Orthosmile, président BUOS (Belgian Union of Orthodontist Specialists), speaker",
      content1:
        "Laboratoire d'orthodontie à l'écoute des clients. Communication digitale et réponse rapide. Livraison des travaux à temps.",
      content2: "Je recommande !",
    },
    {
      id: 6,
      nom: "Delfour Victoire",
      description: "DSO",
      content1:
        "Super laboratoire où un travail de qualité et de précision est réalisé. En plus de ça, l'équipe est vraiment sympathique.",
      content2: "Je suis pleinement satisfaite et je recommande Smile Lab.",
    },
    {
      id: 7,
      nom: "Varsik Hakopian",
      description: "iDent Clinic",
      content1:
        "Merci à l'équipe Smile Lab ! Un travail professionnel avec des appareils orthodontiques de qualité.",
      content2: "C'est mon laboratoire d'orthodontie de référence.",
    },
  ];

  const responsiveSettings = [
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ];

  return (
    <Slide >
      {data.map((item) => {
        return (
          <div key={item.id} className="each-slide-effect card">
            <h2>{item.nom}</h2>
            <p>{item.description}</p>
            <div className="stars">
              {[0, 1, 2, 3, 4].map((i) => (
                <img
                  key={i}
                  src="https://www.svgrepo.com/show/526298/star-circle.svg"
                  alt="star"
                  width={30}
                  className="icon-icon"
                  
                />
              ))}
            </div>
            <p>{item.content1}</p>
            <p>{item.content2}</p>
          </div>
        );
      })}
    </Slide>
  );
};

function Avis() {
  return (
    <div className="Avis">
      {false && <h1>Témoignages</h1>}
      <img src="/public/image/avis.jpg" alt="avis" className="img-avis" />
      <Temoignages />
    </div>
  );
}

export default Avis;
