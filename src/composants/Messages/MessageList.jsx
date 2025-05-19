// MessageList.jsx
import { useState, useEffect, useRef } from "react";
import useSWR from "swr";
import "./listMessage.css";
import imageMessageBg from "/image/messages_light_colour_background.jpg";
import MessageSender from "./MessageSender";

const fetcher = (url) => fetch(url).then((res) => res.json());

const MessageList = ({ currentUser }) => {
  const [selectedSenderId, setSelectedSenderId] = useState(null);
  const [messageTexts, setMessageTexts] = useState({});

  const url = currentUser.roles.includes("ROLE_ADMIN")
    ? "/api/messages/"
    : `/api/messages/recus/${currentUser.id}`;

  const { data: messages = [], mutate } = useSWR(url, fetcher);

  const messageEndRef = useRef(null);

  // Scroll TOUJOURS vers le bas quand on sélectionne un groupe ou reçoit un message
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, [messages, selectedSenderId]);

  const handleMarkAsRead = async (id) => {
    await fetch(`/api/messages/${id}/vu`, { method: "PUT" });
    mutate();
  };

  const handleDelete = async (id) => {
    await fetch(`/api/messages/${id}`, { method: "DELETE" });
    mutate();
  };

  const groupedMessages = messages.reduce((acc, msg) => {
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
                  src={"/public/image/user-profil.svg"}
                  alt="Avatar"
                  className="message-avatar"
                />
                <div>
                  <strong>
                    {latestMsg.expediteur?.prenom} {latestMsg.expediteur?.nom}
                  </strong>
                  <span className="message-date">
                    {new Date(latestMsg.date).toLocaleString()}
                  </span>
                </div>
              </div>
              <p className="message-content">{latestMsg.messageText}</p>
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
        <img src={imageMessageBg} alt="bg" className="message-bg" />
        <div className="message-conversation">
          {selectedSenderId &&
            groupedMessages[selectedSenderId]
              ?.sort((a, b) => new Date(a.date) - new Date(b.date))
              .map((msg) => (
                <div key={msg.id} className="message-single-message">
                  <p className="message-meta">
                    <strong>{msg.expediteur?.prenom}</strong> -{" "}
                    {new Date(msg.date).toLocaleString()}
                  </p>
                  <p>{msg.messageText}</p>
                </div>
              ))}
          <div ref={messageEndRef} />
        </div>

        <MessageSender
          currentUser={currentUser}
          destinataireId={selectedSenderId}
          onMessageSent={() => mutate()}
          messageText={messageTexts[selectedSenderId] || ""}
          setMessageText={(text) =>
            setMessageTexts((prev) => ({
              ...prev,
              [selectedSenderId]: text,
            }))
          }
        />
      </div>
    </div>
  );
};

export default MessageList;
