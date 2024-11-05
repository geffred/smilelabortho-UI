import NavBar from "../../composants/NavBar/NavBar";
import "./Inscription.css";
import fb from "/image/facebook-white.svg";
import google from "/image/google.svg";
import linkedin from "/image/linkedin.svg";
import { Formik , Form , Field , ErrorMessage } from "formik";
import Footer from "../../composants/Footer/Footer";
import * as Yup from "yup";

function Inscription(){
    const validationSchema = Yup.object(
        {
            email: Yup.string()
               .email("Veuillez saisir une adresse email valide")
               .required("L'email est obligatoire"),
            password: Yup.string()
               .min(8, "Le mot de passe doit contenir au moins 8 caractères")
               .required("Le mot de passe est obligatoire")
        }
    )
    return(
        <div className="inscription-container">
            <NavBar 
                bgColor="black"
             />
            <div className="inscription col-lg-fluid">
                <div className="row">
                    <div className="col-lg-6 content-1 col-12">
                        <div>
                            <h1>Créer un compte</h1>
                            <div className="social-login">
                                <a href="">
                                    <img src={google} alt="" width={25} />
                                </a>
                                <a href="">
                                    <img src={linkedin} alt="" width={30} />
                                </a>
                                <a href="">
                                    <img src={fb} alt="" width={30} />
                                </a>
                            </div>
                            <p>
                                ou en utilisant votre adresse email
                            </p>
                            <Formik
                                initialValues={{email: "" , password: "" }}
                                validationSchema={validationSchema}
                                onSubmit={(values, { resetForm }) => {
                                    console.log(values)
                                    resetForm(); // Réinitialise le formulaire après la soumission
                                }}
                                enableReinitialize={true}
                            >
                                {({errors, touched, isSubmitting})=>(
                                    <Form>
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <Field
                                             type="email"
                                             name="email"
                                             className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                                             id="email"
                                             placeholder="Email"
                                             
                                             />
                                            <ErrorMessage name="email" component="div" className="error" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Mot de passe</label>
                                            <Field
                                             type="password"
                                             className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
                                             id="password"
                                             name="password"
                                             placeholder="Mot de passe"/>
                                            <ErrorMessage name="password" component="div" className="error" />
                                        </div>
                                        <button
                                         type="submit"
                                         className="btn btn-primary"
                                         disabled={isSubmitting}
                                         >Créer un compte</button>
                                    </Form>
                                )}
                            </Formik>
                            <p>
                                Vous avez déjà un compte? <a href="">Connectez-vous</a>
                            </p>
                            <small>
                                En créant un compte, vous acceptez les conditions d'utilisation et les conditions de service du site. Nous ne partagerons pas votre adresse email avec des tiers.
                                <a href="">Politique de confidentialité . Conditions générales</a>
                            </small>
                        </div>
                    </div>
                    <div className="col-lg-6 content-2 col-12">
                            <div className="content">
                                <h1>Hello, Friend!</h1>
                                <p>Remplissez vos informations personnelles et commencez votre voyage avec nous.</p>
                                <a href="">Connexion</a>
                            </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Inscription;