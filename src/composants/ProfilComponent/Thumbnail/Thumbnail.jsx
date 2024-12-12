import "./Thumbnail.css";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import upload from "/image/upload.svg";
import trash from "/image/trash.svg";
import camera from "/image/photo-camera.svg";
import userIconSetting from "/image/user-circle-1.svg";
import { useState } from "react";
import { mutate } from "swr";
import { useNavigate } from "react-router-dom";

const Thumbnail = ({ user, onMutate }) => {
  // État local pour gérer l'URL de l'image de profil
  const [profileImage, setProfileImage] = useState(
    user.thumbnail || userIconSetting
  );
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false); // Contrôle du mode édition

  // Validation pour le champ URL
  const validationSchema = Yup.object({
    thumbnail: Yup.string()
      .url("L'URL de l'image est invalide")
      .required("L'URL est obligatoire"),
  });

  // Fonction pour mettre à jour les données utilisateur
  const sendData = async (dataUpdate) => {
    try {
      const response = await fetch("/api/auth/update/image", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataUpdate),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Erreur lors de la mise à jour :", errorData);
        throw new Error(errorData);
      }

      const updatedUser = await response.json();
      onMutate(); // Appel de la fonction de mise à jour du composant parent
      navigate("/profil")
      setProfileImage(updatedUser.thumbnail || profileImage); // Mise à jour locale
    
    } catch (err) {
      console.error("Échec de la mise à jour de l'image :", err);
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  // Fonction pour supprimer l'image de profil
  const handleDeleteThumbnail = async () => {
    if (window.confirm("Voulez-vous vraiment supprimer l'image ?")) {
      try {
        await sendData({
          ...user,
          thumbnail: null, // Réinitialisation de l'image
        });
        setProfileImage(userIconSetting);
        setIsEdit(false);
      } catch (err) {
        console.error("Erreur lors de la suppression de l'image :", err);
      }
    }
  };

  return (
    <div className="thumbnailInfo">
      <div className="row">
        <div className="col-lg-2 thumbnail-section d-flex justify-content-end">
          <div className="thumbnail">
            <div
              className="camera"
              onClick={() => setIsEdit((prevEdit) => !prevEdit)} // Toggle du mode édition
            >
              <img src={camera} alt="Modifier l'image" width={22} />
            </div>
            <img src={profileImage} alt="thumbnail" className="cover" />
          </div>
        </div>

        <div className="col-lg-8 thumbnail-section">
          <Formik
            initialValues={{ thumbnail: "" }}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) => {
              await sendData({ ...user, thumbnail: values.thumbnail }); // Mise à jour
              resetForm(); // Réinitialiser le champ après soumission
              setIsEdit(false); // Quitter le mode édition
            }}
          >
            {({ touched, errors, isSubmitting }) => (
              <Form>
                {isEdit && (
                  <section>
                    <div>
                      <Field
                        type="text"
                        name="thumbnail"
                        className={`form-control ${
                          touched.thumbnail && errors.thumbnail
                            ? "is-invalid"
                            : ""
                        }`}
                        id="thumbnail"
                        placeholder="http://"
                        aria-label="URL de l'image"
                      />
                      <ErrorMessage
                        name="thumbnail"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div className="button-group">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmitting}
                      >
                        <img src={upload} alt="Mettre à jour" width={30} />
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={handleDeleteThumbnail}
                      >
                        <img src={trash} alt="Supprimer" width={25} />
                      </button>
                    </div>
                  </section>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Thumbnail;
