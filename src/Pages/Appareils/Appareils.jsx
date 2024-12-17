import NavBar from "../../composants/NavBar/NavBar"
import SectionBanner from "../../composants/SectionBanner/SectionBanner";
import bg from "../../assets/process.png";
import Footer from "../../composants/Footer/Footer";
import AllCategorie from "../../composants/AllCategorie/AllCategorie";

function Appareils(){
    return (
      <div>
        <NavBar />
        <SectionBanner
          image={bg}
          title={"Appareils"}
          style={{ height: "300px" }}
        />
        <AllCategorie style={{transform:"translateY(0px)"}} />
        <Footer />
      </div>
    );
}

export default Appareils;