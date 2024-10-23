import smile from "/image/smile.jpg"
import iTero from "../../assets/iTero.png"
import shape from "../../assets/3shape.png"
import dexis from "../../assets/dexis.png"
import medit from "../../assets/medit.png"
import './Connect.css';

function Carrousel({ images }) {

    return (
    <div className="Connect">
        <div className="connect-1">
            {
                images.map((image, index) => (
                    <img  key={index} className="image-fluid" src={image} alt={"connect"} />
                ))
            }
        </div>

        <div className="connect-1">
            {
                images.map((image, index) => (
                    <img  key={index} className="image-container" src={image} alt={"connect"} />
                ))
            }
        </div>
    </div>
  );
}


function Connect() {

    const slides = [
        shape ,iTero,dexis,medit,shape,iTero
    ]
      
    return(
        <div className="partenaire">
            <div>
                <h1>Nos partenaires</h1>
                <p>Nous collaborons avec des entreprises de confiance pour offrir des produits et services de qualité. Ensemble, nous innovons et créons des solutions uniques pour nos clients, en alliant expertise et créativité.</p>
            </div>
            <Carrousel images={slides} />
        </div>
    )
}

export default Connect;
