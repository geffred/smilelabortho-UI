import "./Thumbnail.css";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import upload from "/image/upload.svg";
import trash from "/image/trash.svg";
import camera from "/image/photo-camera.svg";
import { useState } from "react";

const Thumbnail = () => {
  const validationSchema = Yup.object({
    thumbnail: Yup.string().url("L'URL de l'image est invalide"),
  });

  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="thumbnailInfo">
      <div className="row">
        <div className="col-lg-3 thumbnail-section ">
          <div className="thumbnail">
            <div className="camera" onClick={() => setIsEdit(!isEdit)}>
              <img src={camera} alt="camera_icon" width={22} />
            </div>
            <img
              src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
              alt="thumbnail"
              className="cover"
            />
          </div>
        </div>

        <div className="col-lg-8 thumbnail-section">
          <Formik
            initialValues={{ thumbnail: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              console.log(values);
              resetForm(); // Réinitialise le formulaire après la soumission
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
                      />
                      <ErrorMessage
                        name="thumbnail"
                        component="div"
                        className="error"
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting}
                    >
                      <img src={upload} alt="upload_icon" width={30} />
                    </button>
                    <button type="button" className="btn btn-primary">
                      <img src={trash} alt="trash_icon" width={25} />
                    </button>
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