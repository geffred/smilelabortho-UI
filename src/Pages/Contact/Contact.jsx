import ContactForm from "../../composants/ContactForm/ContactForm";
import NavBar from "../../composants/NavBar/NavBar";
import Footer from "../../composants/Footer/Footer";
import Map from "../../composants/Map/Map";
import PanierBtn from "../../composants/PanierBtn/PanierBtn";

function Contact(){
    return (
      <div className="contact">
        <PanierBtn />
        <NavBar />
        <ContactForm />
        <Map />
        <Footer />
      </div>
    );
}

export default Contact;