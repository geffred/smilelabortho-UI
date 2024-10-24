import ContactForm from "../../composants/ContactForm/ContactForm";
import NavBar from "../../composants/NavBar/NavBar";
import Footer from "../../composants/Footer/Footer";
import SectionBanner from "../../composants/SectionBanner/SectionBanner";
import banner from '../../assets/process.png'
import Map from "../../composants/Map/Map";

function Contact(){
    return (
        <div className="contact">
            <NavBar/>
            <SectionBanner
             image={banner}
             title={"Contact"}
             description={"Laissez-nous un message et nous vous répondrons dans les plus brefs délais. "}
             />
            <ContactForm/>
            <Map/>
            <Footer/>
        </div>
    )
}

export default Contact;