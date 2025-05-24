import { useState, useEffect, useRef, useContext } from "react";
import useSWR from "swr";
import "./listMessage.css";
import imageMessageBg from "/image/messages_light_colour_background.webp";
import MessageSender from "./MessageSender";
import { UserContext } from "../../composants/UserContext";
import Attachment from "./Attachment";
import ConversationHeader from "./ConversationHeader";
import MessageGroup from "./MessageGroup";

const fetcher = (url) => fetch(url).then((res) => res.json());

const MessageList = ({ currentUser }) => {
  const { loginUser } = useContext(UserContext);
  const [selectedSenderId, setSelectedSenderId] = useState(null);
  const [messageTexts, setMessageTexts] = useState({});
  const [conversationMessages, setConversationMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [recipientThumbnails, setRecipientThumbnails] = useState({});
  const [admins, setAdmins] = useState([]);
  const [showAdminsList, setShowAdminsList] = useState(false);
  const url = `/api/messages/recus/${currentUser.id}`;
  const { data: receivedMessages = [], mutate } = useSWR(url, fetcher);
  const messageEndRef = useRef(null);
  const conversationRef = useRef(null);

  // Fonction pour récupérer le thumbnail d'un utilisateur
  const fetchUserThumbnail = async (userId) => {
    try {
      const response = await fetch(`/api/auth/utilisateurs/${userId}`);
      if (!response.ok) return null;

      const userData = await response.json();
      return userData.thumbnail || "/public/image/user-profil.svg";
    } catch (error) {
      console.error("Error fetching user thumbnail:", error);
      return "/public/image/user-profil.svg";
    }
  };

  // Charger la liste des administrateurs
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await fetch("/api/auth/utilisateurs/");
        if (response.ok) {
          const allUsers = await response.json();
          const adminsList = allUsers.filter(
            (user) =>
              user.roles.includes("ADMIN") || user.roles.includes("SUPER_ADMIN")
          );
          setAdmins(adminsList);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des admins:", error);
      }
    };

    fetchAdmins();
  }, []);

  // Précharger les thumbnails des destinataires
  useEffect(() => {
    const loadThumbnails = async () => {
      if (!receivedMessages.length) return;

      const thumbnails = {};
      const uniqueSenders = [
        ...new Set(receivedMessages.map((msg) => msg.expediteur?.id)),
      ];

      for (const senderId of uniqueSenders) {
        if (senderId && senderId !== loginUser.id) {
          thumbnails[senderId] = await fetchUserThumbnail(senderId);
        }
      }

      setRecipientThumbnails(thumbnails);
    };

    loadThumbnails();
  }, [receivedMessages, loginUser.id]);

  // Charger la conversation complète quand un expéditeur est sélectionné
  useEffect(() => {
    if (selectedSenderId) {
      fetch(`/api/messages/conversation/${currentUser.id}/${selectedSenderId}`)
        .then((res) => res.json())
        .then(async (messages) => {
          setConversationMessages(messages);

          // Récupérer les informations complètes de l'expéditeur
          const sender =
            receivedMessages.find((m) => m.expediteur.id === selectedSenderId)
              ?.expediteur || admins.find((a) => a.id === selectedSenderId);

          // Récupérer le thumbnail du destinataire
          const thumbnail = await fetchUserThumbnail(selectedSenderId);
          setSelectedUser({
            ...sender,
            thumbnail,
          });
        });
    }
  }, [selectedSenderId, receivedMessages, admins, currentUser.id]);

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
    setSelectedSenderId(null);
    mutate();
  };

  // Démarrer une nouvelle conversation avec un admin
  const startNewConversation = async (admin) => {
    try {
      const response = await fetch("/api/messages/envoyer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          expediteur: { id: currentUser.id },
          destinataireId: admin.id,
          messageText: "//",
        }),
      });

      if (!response.ok) {
        throw new Error("Échec de l'envoi du message");
      }

      setSelectedSenderId(admin.id);
      setSelectedUser(admin);
      setShowAdminsList(false);
      mutate();
    } catch (error) {
      console.error("Erreur lors de la création de la conversation:", error);
      alert("Vous ne pouvez pas vous envoyer un message à vous-même");
      return null;
    }

    try {
      const response = await fetch("/api/messages/envoyer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          expediteur: { id: admin.id },
          destinataireId: currentUser.id,
          messageText: "",
        }),
      });

      if (!response.ok) {
        throw new Error("Échec de l'envoi du message");
      }

      setSelectedSenderId(admin.id);
      setSelectedUser(admin);
      setShowAdminsList(false);
      mutate();
    } catch (error) {
      console.error("Erreur lors de la création de la conversation:", error);
      alert("Une erreur est survenue lors de la création de la conversation");
    }
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
        <ConversationHeader
          admins={admins}
          showAdminsList={showAdminsList}
          toggleAdminList={(e) => {
            e.stopPropagation();
            setShowAdminsList(!showAdminsList);
          }}
          startNewConversation={startNewConversation}
        />

        {Object.entries(groupedMessages).map(([senderId, msgs]) => {
          const latestMsg = msgs[msgs.length - 1];
          const unread = msgs.some((m) => !m.vu);

          if (latestMsg.expediteur?.id === loginUser.id) {
            return null;
          }

          return (
            <MessageGroup
              key={senderId}
              senderId={Number(senderId)}
              msgs={msgs}
              latestMsg={latestMsg}
              unread={msgs.some((m) => !m.vu)}
              isSelected={selectedSenderId === Number(senderId)}
              thumbnail={recipientThumbnails[senderId]}
              onSelect={(id, msgs) => {
                setSelectedSenderId(id);
                msgs.forEach((m) => !m.vu && handleMarkAsRead(m.id));
              }}
              onDelete={(msgs) => msgs.forEach((m) => handleDelete(m.id))}
            />
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
                  <>
                    {msg.messageText === "//" ? (
                      <div className="newMessage">
                        <span>
                          {new Date(msg.date).toLocaleDateString()} {msg.heure}
                        </span>
                      </div>
                    ) : (
                      msg.messageText && (
                        <div
                          key={msg.id}
                          className={`message-bubble-container ${
                            isCurrentUser ? "sent" : "received"
                          }`}
                        >
                          {!isCurrentUser && (
                            <img
                              src={
                                recipientThumbnails[msg.expediteur.id] ||
                                "/public/image/user-profil.svg"
                              }
                              alt="Avatar"
                              className="message-avatar-small"
                            />
                          )}

                          <div className="message-bubble">
                            <p className="message-text">{msg.messageText}</p>
                            {msg.images?.length > 0 && (
                              <div className="message-attachments">
                                {msg.images.map((image) => (
                                  <Attachment
                                    key={image.id}
                                    attachment={image}
                                  />
                                ))}
                              </div>
                            )}
                            <span className="message-time">{msg.heure}</span>
                          </div>
                        </div>
                      )
                    )}
                  </>
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
