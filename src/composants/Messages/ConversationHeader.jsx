// ConversationHeader.jsx
function ConversationHeader  ({
  admins,
  showAdminsList,
  toggleAdminList,
  startNewConversation,
}) {
  return( 
<div className="new-conversation-btn-container">
    <button
      className="btn btn-primary new-conversation-btn"
      onClick={toggleAdminList}
    >
      Démarrer une discussion
    </button>

    {showAdminsList && (
      <div className="admins-list">
        <h4>Sélectionnez un administrateur</h4>
        <div className="admin-items">
          {admins.map((admin) => (
            <div
              key={admin.id}
              className="admin-item"
              onClick={() => startNewConversation(admin)}
            >
              <img
                src={admin.thumbnail || "/public/image/user-profil.svg"}
                alt="Admin"
                className="admin-avatar"
              />
              <span>
                {admin.prenom} {admin.nom}
              </span>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
)}

export default ConversationHeader;