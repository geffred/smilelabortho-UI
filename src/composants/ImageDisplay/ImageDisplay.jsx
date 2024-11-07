import "./ImageDisplay.css"
import banner from "../../assets/process.png"
import { useState } from "react";
import useSWR from "swr";
import { mutate } from "swr";
import { Formik , Form , Field,ErrorMessage } from "formik";
import * as Yup from "yup";

function ImageDisplay({dataImage}){

    const [image , setImage] = useState(dataImage.thumbnail)
    const [active , setActive] = useState(null)
    const fetcher = (url) => fetch(url).then((res) => res.json())
    const url = `/api/image/appareils/${dataImage.id}`;
    const { data, error, isLoading } = useSWR(url,fetcher);
    const validationSchema = Yup.object({
        url: Yup.string()
        .url("L'URL de l'image est invalide"),

    })

    async function sendData(data) {
        try {
          const response = await fetch("/api/image/appareils/save", {
            method: 'POST', // Type de la requête HTTP
            headers: {
              'Content-Type': 'application/json', // On précise que l'on envoie des données JSON
            },
            body: JSON.stringify(data), // Convertir les données en JSON pour les envoyer
          });
      
          // Vérification de la réponse du serveur
          if (response.ok) {
            const responseData = await response.json(); // Extraire la réponse JSON du serveur
            console.log('Données envoyées avec succès:', responseData);
            mutate(url)
          } else {
            console.error('Erreur lors de l\'envoi des données:', response.statusText);
          }
        } catch (error) {
          console.error('Erreur réseau:', error);
        }
      }
    

    const handleClick = (image,id) =>{
        setImage(image)
        setActive(id)
    }

    if(isLoading) return <p>Loading...</p>;
    if(error) return <p>Erreur lors de la récupération des images</p>;

    return(
            <div className='ImageDisplay'>
                  <div className="third">
                    <Formik
                     initialValues={{ appareil:dataImage.id ,url: ""}}
                     validationSchema={validationSchema}
                     onSubmit={(values, { resetForm }) => {
                        console.log(values)
                        sendData(values)
                        resetForm(); // Réinitialise le formulaire après la soumission
                     }}
                     enableReinitialize={true}
                    >
                        {({  errors, touched, isSubmitting })=>( 
                            <Form className=' container form'>
                                <div className="row align-items-center mx-0">
                                    <div className="col-lg-9 col-12 px-0">
                                        <Field
                                        type="text"
                                        name="url"
                                        placeholder="http://url"
                                        className={`form-control ${touched.url && errors.url ? 'is-invalid' : ''}`}
                                        />
                                        <ErrorMessage name="nom" component="div" className="error" />
                                    </div>
                                    <div className="col-lg-3 col-12 px-2" >
                                        <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        >Ajouter</button>
                                    </div>
                                </div>
                            </Form>
                            ) }
                    </Formik>
                </div>
                
                <div className='first'>
                    <img src={image} alt="appareil_image" />
                </div>
                
                <div className='second container'>

                            <div
                                className={active === 0 ? 'box active' : 'box'}
                                key={crypto.randomUUID()}
                                >
                                    <div className={active === 0 ? 'bg_hover' : null}></div>
                                    <img 
                                    src={dataImage.thumbnail}
                                    alt="appareil_image"
                                    onClick={()=>handleClick(dataImage.thumbnail,0)}
                                />
                            </div>
                        
                    {
                        data && data.map((data) => (
                            <div
                             className={active === data.id ? 'box active' : 'box'}
                             key={data.id}
                             >
                                <div className={active === data.id ? 'bg_hover' : null}></div>
                                <img 
                                src={data.url}
                                alt="appareil_image"
                                onClick={()=>handleClick(data.url,data.id)}
                                />
                            </div>
                        ))
                    }
                </div>
              
            </div>                 
    )
}

export default ImageDisplay;