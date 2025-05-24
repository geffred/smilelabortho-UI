import "./Thumbnail.css";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import upload from "/image/upload.svg";
import trash from "/image/trash.svg";
import camera from "/image/photo-camera.svg";
import userIconSetting from "/image/user-circle-1.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PROFILE_IMAGES = [
  "https://img.freepik.com/premium-vector/cute-hamster-cartoon-vector-icon-illustration-flat-isolated-animal-nature-icon_634423-1714.jpg?semt=ais_hybrid&w=740",
  "https://static.vecteezy.com/system/resources/previews/008/974/656/non_2x/cute-kid-girl-holding-bubble-milk-tea-hand-drawn-cartoon-character-illustration-vector.jpg",
  "https://i.pinimg.com/564x/75/f1/35/75f1353ff86ab5c393735ac3a217bae9.jpg",
  "https://i.pinimg.com/736x/1c/5a/17/1c5a179cf8ad42c6d0eba9598ea7fc8b.jpg",
  "https://static.vecteezy.com/system/resources/thumbnails/025/221/361/small_2x/cartoon-cat-cute-ai-generate-png.png",
  "https://static.vecteezy.com/system/resources/previews/023/506/852/non_2x/cute-kawaii-mushroom-chibi-mascot-cartoon-style-vector.jpg",
  "https://i.pinimg.com/736x/51/8a/55/518a55b319a37f9cdc090a73aabb3873.jpg",
  "https://i.pinimg.com/originals/4f/56/c9/4f56c9d0fd5a803a1995ee7229008d8a.jpg",
  "https://image.spreadshirtmedia.com/image-server/v1/products/T1459A839PA3861PT28D1042364712W8268H10000/views/1,width=550,height=550,appearanceId=839,backgroundColor=F2F2F2/cute-cartoon-cat-in-the-pumpkin-sticker.jpg",
  "https://i.pinimg.com/564x/f3/6e/9f/f36e9fb5299fac4010d4842210729e3d.jpg",
];

const Thumbnail = ({ user, onMutate }) => {
  const [profileImage, setProfileImage] = useState(
    user.thumbnail || userIconSetting
  );
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [showProfileImages, setShowProfileImages] = useState(false);

  const validationSchema = Yup.object({
    thumbnail: Yup.string()
      .url("L'URL de l'image est invalide")
      .required("L'URL est obligatoire"),
  });

  const sendData = async (dataUpdate) => {
    try {
      const response = await fetch("/api/auth/update/image", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          thumbnail: dataUpdate.thumbnail,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Échec de la mise à jour");
      }

      const result = await response.json();
      onMutate();
      navigate("/profil");
      setProfileImage(result.thumbnail || profileImage);
      setShowProfileImages(false);
    } catch (err) {
      console.error("Échec de la mise à jour de l'image :", err);
      alert(err.message || "Une erreur est survenue. Veuillez réessayer.");
    }
  };

  const handleDeleteThumbnail = async () => {
    if (window.confirm("Voulez-vous vraiment supprimer l'image ?")) {
      try {
        await sendData({
          email: user.email,
          thumbnail: "",
        });
        setProfileImage(userIconSetting);
        setIsEdit(false);
        setShowProfileImages(false);
      } catch (err) {
        console.error("Erreur lors de la suppression de l'image :", err);
      }
    }
  };

  const handleProfileImageClick = (imageUrl) => {
    setProfileImage(imageUrl);
    sendData({ ...user, thumbnail: imageUrl });
  };

  return (
    <div className="thumbnail-container">
      <div className="thumbnail-wrapper">
        <div className="thumbnail-avatar-section">
          <div className="thumbnail-avatar">
            <img src={profileImage} alt="Profil" className="thumbnail-image" />
            <button
              className="thumbnail-edit-button"
              onClick={() => {
                setIsEdit((prev) => !prev);
                setShowProfileImages(!showProfileImages);
              }}
              aria-label="Modifier l'image de profil"
            >
              <img src={camera} alt="Modifier" width={22} />
            </button>
          </div>
        </div>

        <div className="thumbnail-form-section">
          <Formik
            initialValues={{ thumbnail: "" }}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) => {
              await sendData({ ...user, thumbnail: values.thumbnail });
              resetForm();
              setIsEdit(false);
            }}
          >
            {({ touched, errors, isSubmitting }) => (
              <Form className="thumbnail-form">
                {isEdit && (
                  <div className="thumbnail-form-content">
                    <div className="thumbnail-input-group">
                      <Field
                        type="text"
                        name="thumbnail"
                        className={`thumbnail-input ${
                          touched.thumbnail && errors.thumbnail
                            ? "is-invalid"
                            : ""
                        }`}
                        id="thumbnail"
                        placeholder="https://example.com/image.jpg"
                        aria-label="URL de l'image de profil"
                      />
                      <ErrorMessage
                        name="thumbnail"
                        component="div"
                        className="thumbnail-error"
                      />
                    </div>
                    <div className="thumbnail-button-group">
                      <button
                        type="submit"
                        className="thumbnail-button thumbnail-button--primary"
                        disabled={isSubmitting}
                      >
                        <img src={upload} alt="Mettre à jour" width={20} />
                        <span>Mettre à jour</span>
                      </button>
                      <button
                        type="button"
                        className="thumbnail-button thumbnail-button--danger"
                        onClick={handleDeleteThumbnail}
                      >
                        <img src={trash} alt="Supprimer" width={18} />
                        <span>Supprimer</span>
                      </button>
                    </div>
                  </div>
                )}
              </Form>
            )}
          </Formik>

          {showProfileImages && (
            <div className="thumbnail-gallery">
              <h3 className="thumbnail-gallery-title">
                Choisissez une image de profil
              </h3>
              <div className="thumbnail-gallery-grid">
                {PROFILE_IMAGES.map((imageUrl, index) => (
                  <button
                    key={index}
                    className={`thumbnail-gallery-item ${
                      profileImage === imageUrl ? "is-selected" : ""
                    }`}
                    onClick={() => handleProfileImageClick(imageUrl)}
                    aria-label={`Sélectionner l'image de profil ${index + 1}`}
                  >
                    <img
                      src={imageUrl}
                      alt=""
                      className="thumbnail-gallery-image"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Thumbnail;
