import AppareilPanier from "../../composants/AppareilPanier/AppareilPanier";
import Footer from "../../composants/Footer/Footer";
import NavBar from "../../composants/NavBar/NavBar";
import PanierBtn from "../../composants/PanierBtn/PanierBtn";
import SectionBanner from "../../composants/SectionBanner/SectionBanner";
import buy from "/image/buy.svg"
import arrow from "/image/arrow-prev-white.svg"
import "./panier.css"
import { NavLink } from "react-router-dom";
import useSWR from "swr";
import Spinner from "../../composants/Spinner/Spinner";
import { mutate } from "swr";

function Panier(){
    const url = "/api/paniers/"
    const fetcher = (url) =>
      fetch(url, {
        method: "GET",
        credentials: "include", // Inclut automatiquement les cookies comme JSESSIONID
      }).then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
        return response.json();
      });

    const {data , error , isLoading } = useSWR(url , fetcher);

    const handleDelete = async (id) => {
      try {
        const response = await fetch(`/api/paniers/delete/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Inclut le cookie de session
        });

        if (response.ok) {
          mutate(url); // Rafraîchit les données après suppression
          console.log("Item supprimé avec succès");
        } else {
          console.error("Erreur lors de la suppression de l'item");
        }
      } catch (error) {
        console.error("Erreur réseau :", error);
      }
    };



    if(isLoading) return <Spinner/>;
    if(error) return <div>Une erreur s'est produite.</div>;

    return(
        <div className="panier">
            <PanierBtn/> 
            <NavBar/>
            <SectionBanner
            style={{height:"150px"}}
            />
            <div className="content container">
                {
                    data.map((panier)=>(
                        <div key={panier.id}>
                            <AppareilPanier 
                                data={panier}
                                handleDelete={handleDelete}
                                />
                        </div>
                    ))
                }

                <div className="boutton">

                    <NavLink to={"/shop"}>
                        <button>
                            <img src={arrow} alt="commander_icon" width={30} />
                        </button>
                    </NavLink>

                    <button>
                        <img src={buy} alt="commander_icon" width={30} />
                        <span>Commander</span>
                    </button>

                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Panier;