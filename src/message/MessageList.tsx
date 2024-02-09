import React from 'react';

interface Message {
  senderId: string;
  content: string;
  heure_envoi: string | null;
}

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const idUser= "1";
  return (
    <div className="message-list">
      {messages.map(message => (
        <div  className={`message ${message.senderId === idUser ? 'sent' : 'received'}`}>
          <div className="message-content">{message.content}</div>
          <div className="message-timestamp">{message.heure_envoi}</div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;

