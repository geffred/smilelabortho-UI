import { Form , Field, Formik ,ErrorMessage} from 'formik';
import buy from '/image/buy.svg'
import "./DetailsInput.css"


// eslint-disable-next-line react/prop-types
function DetailsInput({data}) {
    return (
        <div>
            <div className="row">
                <div className="col-lg-12 details">
                    <h1>{data.nom}</h1>
                    <p>{data.prixUnitaire} €</p>
                </div>
            </div>
            <hr />
            <div className="row">
                <Formik>
                    {() => (
                        <Form className="col-lg-12">
                            <Field as="select" name="option" id="option">
                                <option value="" disabled>
                                    Sélectionnez une option
                                </option>
                                <option value="">Option 1</option>
                            </Field>

                            <Field
                                type="text"
                                name="refPatient"
                                id="refPatient"
                                placeholder="Référence patient"
                                className="form-control my-2"
                            />

                            <Field
                                type="text"
                                name="refPatient"
                                id="refPatient"
                                placeholder="Référence patient"
                                className="form-control my-2"
                            />

                            <div className="detailsFooter">
                                <label htmlFor="quantiteDansPanier">Quantité</label>
                                <Field
                                    type="number"
                                    name="quantiteDansPanier"
                                    id="quantiteDansPanier"
                                    placeholder="1"
                                    className="form-control"
                                />

                                <button type="submit" className="btn btn-primary">
                                    <span>Ajouter au Panier</span>
                                    <img src={buy} alt="buy_icon" width={25} />
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}


export default DetailsInput;