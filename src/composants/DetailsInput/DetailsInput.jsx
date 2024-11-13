import { Field, Formik, Form, ErrorMessage } from "formik";
import buy from '/image/buy.svg'
import "./DetailsInput.css"
import useSWR from 'swr';
import * as Yup from "yup";
import { useEffect, useState } from "react";



// eslint-disable-next-line react/prop-types
function DetailsInput({data}) {

    const url = '/api/models/'
    const fetcher = (url) => fetch(url).then((res) => res.json());
    const { data:models, error, isLoading } = useSWR(url, fetcher)
    const [prix , setPrix] = useState(data.prixUnitaire)
    const [modelId , setModelId] = useState(null)

    const validationSchema = Yup.object({
        model:Yup.string()
        .required('Le model est obligatoire'),
        refPatient:Yup.string()
        .required("la reférence du patien est obligatoire"),
        scan3d:Yup.string()
        .required("Le scan 3D est obligatoire")
        .url("L'URL doit être valide."),
        quantiteDansPanier:Yup.number()
        .required("La quantité est obligatoire")
        .integer("La quantité doit être un nombre entier.")
        .positive("La quantité doit être positive.")
        .min(1, "La quantité minimale est 1."),

    })

    return (
        <div>
            <div className="row">
                <div className="col-lg-12 details">
                    <h1>{data.nom}</h1>
                    <p>{prix} €</p>
                </div>
            </div>
            <hr />
            <div className="row">
                <Formik
                    initialValues={{model:"",refPatient:"", scan3d:"",quantiteDansPanier:""}}
                    validationSchema={validationSchema}
                    onSubmit={(values, { resetForm }) => {
                        console.log(values)
                        resetForm(); 
                     }}
                     enableReinitialize={true}
                >
                    {({ errors, touched, isSubmitting}) => (
                        <Form className="col-lg-12">
                            <Field
                             as="select"
                             name="model"
                             id="option"
                                >
                                <option value="">
                                    Sélectionnez un model 
                                </option>
                                {
                                     models && models.map((model) => (
                                        <option
                                         key={model.id}
                                         value={model.id}
                                         >
                                            {model.nom}
                                        </option>
                                    ))
                                    
                                }
                            </Field>
                            <ErrorMessage name="model" component="div" className="error" />

                            <Field
                                type="text"
                                name="refPatient"
                                id="refPatient"
                                placeholder="Référence patient"
                                className={`form-control my-2 ${touched.refPatient && errors.refPatient ? 'is-invalid' : ''}`}
                            />
                            <ErrorMessage name="refPatient" component="div" className="error" />

                            <Field
                                type="text"
                                name="scan3d"
                                id="scan3d"
                                placeholder="Lien drive du scan du patient"
                                className={`form-control my-2 ${touched.scan3d && errors.scan3d ? 'is-invalid' : ''}`}
                            />
                             <ErrorMessage name="scan3d" component="div" className="error" />

                            <div className="detailsFooter">
                                <label htmlFor="quantiteDansPanier">Quantité</label>
                                <Field
                                    type="number"
                                    name="quantiteDansPanier"
                                    id="quantiteDansPanier"
                                    placeholder="1"
                                    className={`form-control ${touched.quantiteDansPanier && errors.quantiteDansPanier ? 'is-invalid' : ''}`}
                                />
                                <ErrorMessage name="quantiteDansPanier" component="div" className="error" />

                                <button type="submit" className="btn btn-primary"  disabled={isSubmitting} >
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