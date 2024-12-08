import "./ImageDisplay.css";
import banner from "../../assets/process.png";
import { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { mutate } from "swr";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { UserContext } from "../UserContext";

function ImageDisplay({ dataImage }) {
  const [image, setImage] = useState(dataImage.thumbnail);
  const [active, setActive] = useState(null);
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const url = `/api/image/appareils/${dataImage.id}`;
  const {user} = useContext(UserContext)

  useEffect(() => {
    if (dataImage && dataImage.thumbnail) {
      setImage(dataImage.thumbnail);
    }
  }, [dataImage]);

  const { data, error } = useSWR(url, fetcher);

  const validationSchema = Yup.object({
    url: Yup.string()
      .url("L'URL de l'image est invalide")
      .required("L'URL est obligatoire"),
  });

  async function sendData(data) {
    try {
      const response = await fetch("/api/image/appareils/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Données envoyées avec succès:", responseData);
        mutate(url);
      } else {
        console.error("Erreur lors de l'envoi des données:", response.statusText);
      }
    } catch (error) {
      console.error("Erreur réseau:", error);
    }
  }

  const handleClick = (image, id) => {
    setImage(image);
    setActive(id);
  };

  if (!data && !error) return <p>Loading...</p>;
  if (error) return <p>Erreur lors de la récupération des images</p>;

  return (
    <div className="ImageDisplay">
      <div className="third">
        {user &&
          user.roles.some((role) =>
            ["ROLE_ADMIN", "ROLE_SUPER_ADMIN"].includes(role)
          ) && (
            <Formik
              initialValues={{ appareil: dataImage.id, url: "" }}
              validationSchema={validationSchema}
              onSubmit={(values, { resetForm }) => {
                sendData(values);
                resetForm();
              }}
              enableReinitialize={true}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form className="container form">
                  <div className="row align-items-center mx-0">
                    <div className="col-lg-9 col-12 px-0">
                      <Field
                        type="text"
                        name="url"
                        placeholder="http://url"
                        className={`form-control ${
                          touched.url && errors.url ? "is-invalid" : ""
                        }`}
                      />
                      <ErrorMessage
                        name="url"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div className="col-lg-3 col-12 px-2">
                      <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "En cours..." : "Ajouter"}
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          )}
      </div>

      <div className="first">
        <img src={image} alt="appareil_image" />
      </div>

      <div className="second container">
        <div className={active === 0 ? "box active" : "box"} key="thumbnail">
          <div className={active === 0 ? "bg_hover" : null}></div>
          <img
            src={dataImage.thumbnail}
            alt="appareil_image"
            onClick={() => handleClick(dataImage.thumbnail, 0)}
          />
        </div>

        {data &&
          data.map((item) => (
            <div
              className={active === item.id ? "box active" : "box"}
              key={item.id}
            >
              <div className={active === item.id ? "bg_hover" : null}></div>
              <img
                src={item.url}
                alt="appareil_image"
                onClick={() => handleClick(item.url, item.id)}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default ImageDisplay;
