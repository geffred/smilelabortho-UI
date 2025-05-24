// MessageGroup.jsx
const MessageGroup = ({
  senderId,
  msgs,
  latestMsg,
  unread,
  isSelected,
  thumbnail,
  onSelect,
  onDelete,
}) => (
  <div
    className={`message-group ${unread ? "unread" : ""} ${
      isSelected ? "active" : ""
    }`}
    onClick={(e) => {
      e.stopPropagation();
      onSelect(senderId, msgs);
    }}
  >
    <div className="message-header">
      <img
        src={thumbnail || "/public/image/user-profil.svg"}
        alt="Avatar"
        className="message-avatar"
      />
      <div>
        <strong>
          {latestMsg.expediteur?.prenom} {latestMsg.expediteur?.nom}
        </strong>
        <span className="message-date">
          {new Date(latestMsg.date).toLocaleDateString()}
        </span>
      </div>
    </div>
    <p className="message-content">
      {latestMsg.messageText === "//" ? "" : latestMsg.messageText}
      {latestMsg.images?.length > 0 && (
        <img
          src="https://www.svgrepo.com/show/283318/attached-attach.svg"
          alt=""
          width={15}
          height={15}
          className="trombone mx-1"
        />
      )}
    </p>
    <button
      className="message-delete-btn"
      onClick={(e) => {
        e.stopPropagation();
        onDelete(msgs);
      }}
    >
      Supprimer
    </button>
  </div>
);

export default MessageGroup;