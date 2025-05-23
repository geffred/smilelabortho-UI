// MessageList.jsx
import { useState, useEffect, useRef, useContext } from "react";
import useSWR from "swr";
import "./listMessage.css";
import imageMessageBg from "/image/messages_light_colour_background.webp";
import MessageSender from "./MessageSender";
import { UserContext } from "../../composants/UserContext";
import Attachment from "./Attachment";

const fetcher = (url) => fetch(url).then((res) => res.json());

// Composant pour afficher les pièces jointes


const MessageList = ({ currentUser }) => {
  const { loginUser } = useContext(UserContext);
  const [selectedSenderId, setSelectedSenderId] = useState(null);
  const [messageTexts, setMessageTexts] = useState({});
  const [conversationMessages, setConversationMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const url = `/api/messages/recus/${currentUser.id}`;
  const { data: receivedMessages = [], mutate } = useSWR(url, fetcher);

  const messageEndRef = useRef(null);
  const conversationRef = useRef(null);

  // Charger la conversation complète quand un expéditeur est sélectionné
  useEffect(() => {
    if (selectedSenderId) {
      fetch(`/api/messages/conversation/${currentUser.id}/${selectedSenderId}`)
        .then((res) => res.json())
        .then((messages) => {
          setConversationMessages(messages);
          const sender = receivedMessages.find(
            (m) => m.expediteur.id === selectedSenderId
          )?.expediteur;
          setSelectedUser(sender);
        });
    }
  }, [selectedSenderId, receivedMessages]);

  // Scroll vers le bas quand les messages changent
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, [conversationMessages]);

  const handleMarkAsRead = async (id) => {
    await fetch(`/api/messages/${id}/vu`, { method: "PUT" });
    mutate();
  };

  const handleDelete = async (id) => {
    await fetch(`/api/messages/${id}`, { method: "DELETE" });
    mutate();
  };

  const groupedMessages = receivedMessages.reduce((acc, msg) => {
    const senderId = msg.expediteur?.id;
    if (!acc[senderId]) acc[senderId] = [];
    acc[senderId].push(msg);
    return acc;
  }, {});

  return (
    <div
      className="message-container"
      onClick={() => setSelectedSenderId(null)}
    >
      <div className="message-list">
        {Object.entries(groupedMessages).map(([senderId, msgs]) => {
          const latestMsg = msgs[msgs.length - 1];
          const unread = msgs.some((m) => !m.vu);

          if (latestMsg.expediteur?.id === loginUser.id) {
            return null;
          }

          return (
            <div
              key={senderId}
              className={`message-group ${unread ? "unread" : ""} ${
                selectedSenderId === Number(senderId) ? "active" : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedSenderId(Number(senderId));
                msgs.forEach((m) => !m.vu && handleMarkAsRead(m.id));
              }}
            >
              <div className="message-header">
                <img
                  src={
                    latestMsg.expediteur?.thumbnail ||
                    "/public/image/user-profil.svg"
                  }
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
                {latestMsg.messageText}
                {latestMsg.images?.length > 0 && " 📎"}
              </p>
              <button
                className="message-delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  msgs.forEach((m) => handleDelete(m.id));
                }}
              >
                Supprimer
              </button>
            </div>
          );
        })}
      </div>

      <div className="message-detail" onClick={(e) => e.stopPropagation()}>
        {selectedSenderId ? (
          <>
            

            <div className="message-conversation" ref={conversationRef}>
              {conversationMessages.map((msg) => {
                const isCurrentUser = msg.expediteur.id === currentUser.id;
                return (
                  <div
                    key={msg.id}
                    className={`message-bubble-container ${
                      isCurrentUser ? "sent" : "received"
                    }`}
                  >
                    {!isCurrentUser && (
                      <img
                        src={
                          msg.expediteur.thumbnail ||
                          "/public/image/user-profil.svg"
                        }
                        alt="Avatar"
                        className="message-avatar-small"
                      />
                    )}
                    <div className="message-bubble">
                      {msg.messageText && (
                        <p className="message-text">{msg.messageText}</p>
                      )}
                      {msg.images?.length > 0 && (
                        <div className="message-attachments">
                          {msg.images.map((image) => (
                            <Attachment key={image.id} attachment={image} />
                          ))}
                        </div>
                      )}
                      <span className="message-time">
                        {msg.heure}
                      </span>
                    </div>
                  </div>
                );
              })}
              <div ref={messageEndRef} />
            </div>

            <MessageSender
              currentUser={currentUser}
              destinataireId={selectedSenderId}
              onMessageSent={() => {
                mutate();
                fetch(
                  `/api/messages/conversation/${currentUser.id}/${selectedSenderId}`
                )
                  .then((res) => res.json())
                  .then((messages) => {
                    setConversationMessages(messages);
                  });
              }}
              messageText={messageTexts[selectedSenderId] || ""}
              setMessageText={(text) =>
                setMessageTexts((prev) => ({
                  ...prev,
                  [selectedSenderId]: text,
                }))
              }
            />
          </>
        ) : (
          <div className="no-conversation-selected">
            <img src={imageMessageBg} alt="bg" className="message-bg" />
            <p>Sélectionnez une conversation pour commencer à discuter</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageList;
