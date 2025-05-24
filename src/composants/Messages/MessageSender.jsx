import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import "./messageSender.css";

const MessageSender = ({ currentUser, destinataireId, onMessageSent }) => {
  const [files, setFiles] = useState([]);

  const validationSchema = Yup.object({
    messageText: Yup.string().required("Message requis"),
  });

  const formik = useFormik({
    initialValues: { messageText: "" },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        // Étape 1 : Envoi du message (sans fichier)
        const messageResponse = await fetch("/api/messages/envoyer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            expediteur: { id: currentUser.id },
            destinataireId: destinataireId,
            messageText: values.messageText,
          }),
        });

        if (!messageResponse.ok) throw new Error("Échec de l'envoi du message");

        const messageData = await messageResponse.json();

        // Étape 2 : Upload des fichiers (s'il y en a)
        if (files.length > 0) {
          const formData = new FormData();
          files.forEach((file) => formData.append("files", file));

          const uploadResponse = await fetch(
            `/api/files/upload/${messageData.id}`, // <-- Mise à jour ici
            {
              method: "POST",
              body: formData,
            }
          );

          if (!uploadResponse.ok)
            throw new Error("Échec de l'envoi des fichiers");
        }

        // Reset form et fichiers
        resetForm();
        setFiles([]);
        onMessageSent?.();
      } catch (error) {
        console.error("Erreur:", error);
        alert(error.message);
      }
    },
  });

  const handleFileChange = (e) => {
    setFiles((prev) => [...prev, ...Array.from(e.target.files)]);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  if (!destinataireId) return null;

  return (
    <div className="message-sender-bar">
      <form onSubmit={formik.handleSubmit} className="message-form">
        <label className="file-icon">
          <img
            src="https://www.svgrepo.com/show/283318/attached-attach.svg"
            alt=""
            width={20}
            height={20}
            className="trombone"
          />
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            accept=".jpg,.jpeg,.png,.gif,.stl,.zip"
            hidden
          />
        </label>

        <textarea
          name="messageText"
          className="message-input"
          placeholder="Écrire un message..."
          rows={1}
          {...formik.getFieldProps("messageText")}
        />

        <button
          type="submit"
          disabled={formik.isSubmitting || !formik.dirty}
          className="send-button"
        >
          ➤
        </button>
      </form>

      {files.length > 0 && (
        <div className="file-preview-bar">
          {files.map((file, index) => (
            <div key={file.name + index} className="file-preview-item">
              <span className="file-name">{file.name}</span>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="delete-file"
              >
                <img
                  src="https://www.svgrepo.com/show/410349/cancel.svg"
                  alt="cancel"
                  width={15}
                  height={15}
                />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessageSender;
