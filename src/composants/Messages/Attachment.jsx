import "./attachment.css" 

const BACKEND_URL = "http://localhost:8080"; // ou ton URL backend réelle

const Attachment = ({ attachment }) => {
  const fileName = attachment.path.split("/").pop();
  const fileUrl = `${BACKEND_URL}/api/files/download/${fileName}`;
  const fileExtension = fileName.split(".").pop().toLowerCase();
  const isImage = ["jpg", "jpeg", "png", "gif"].includes(fileExtension);
  const isZip = fileExtension === "zip";
  const isStl = fileExtension === "stl";

  const handleDownload = (e) => {
    e.preventDefault();
    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isImage) {
    return (
      <div className="attachment-container image-container">
        1111111111111111111
        <img
          src={fileUrl}
          alt="Pièce jointe"
          className="message-attachment image"
        />
        <div className="download-overlay">
          <button
            onClick={handleDownload}
            className="download-button"
            title="Télécharger l'image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </button>
        </div>
      </div>
    );
  }

  if (isZip || isStl) {
    return (
      <div className="attachment-container file">
        <a href={fileUrl} download className="file-download">
          <div className="file-icon">{isZip ? "📦" : "🖨️"}</div>
          <div className="file-info">
            <span className="file-name">{fileName}</span>
            <span className="file-type">
              {isZip ? "Fichier ZIP" : "Fichier STL"}
            </span>
          </div>
        </a>
      </div>
    );
  }

  return null;
};

export default Attachment;