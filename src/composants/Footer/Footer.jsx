/* eslint-disable react/prop-types */
import './footer.css'
import logo_smilelab from '/image/logo_smilelab.svg';
import ig from '/image/insta-white.svg';
import fb from '/image/facebook-white.svg';
import lkin from '/image/linkedin.svg';



const date = new Date();

const sections = [
    {
        id: 0,
        title:"Appareils",
        content:["Appareils Frittés","Appareils imprimés","Appareils hybrides benefit","Appareils Amovibles","Contentions Othodontiques"]
    },
    {
        id:1,
        title:"Services",
        content:["Fritage Laser","Service Digital","Blanchiment Dentaire"]
    },
    {
        id:2,
        title:"Contact",
        content:["contact@smilelabortho.be","+32(0) 493 35 73 28","Boulevard Roosevelt 23 7060 Soignies","TVA: BE0794998835"]
    }
]

function FooterComponentSection({item}){

   
    return (
        <div className='sectionList col-lg-2 col-6'>
            <div >
                <h1> {item.title} </h1>
                <div>
                    {
                        item.content.map((item,index)=> <a href="#" key={index}> {item} </a> )
                    }
                </div> 
            </div>
        </div>
    )
}

function Footer(){

    return (
      <div className="footer">
        <footer className="container">
          <div className="row">
            <div className="col-lg-1 col-12"></div>

            <div className="sectionList  social col-lg-3 col-12">
              <div className="logo">
                <div className="left-section">
                  {false && (
                    <div className="logo-container">
                      <img src={logo_smilelab} alt="logo_smilelab" />
                    </div>
                  )}
                  <span>
                    Smile <span className="lab">lab</span>{" "}
                  </span>
                </div>
                <div className="socialNetwork">
                  <a href="#">
                    <img src={ig} alt="Instagram" width={24} />
                  </a>
                  <a href="#">
                    <img src={fb} alt="facebook" width={29} />
                  </a>
                  <a href="#">
                    <img src={lkin} alt="linkedin" width={29} />
                  </a>
                </div>
              </div>
            </div>

            {sections.map((section) => (
              <FooterComponentSection key={section.id} item={section} />
            ))}

            <div className="col-lg-1 col-12"></div>
          </div>

          <div className="copyright">
            <span>
              {" "}
              © {date.getFullYear()} Smile lab. Tous droits réservés.{" "}
            </span>
            <div className="condition">
              {" "}
              <a href="#">Conditions générales </a>{" "}
            </div>
          </div>
        </footer>
      </div>
    );
}

export default Footer;