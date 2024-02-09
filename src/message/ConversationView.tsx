import React from 'react';
import MessageList from './MessageList'; // Assurez-vous d'importer correctement le chemin du composant MessageList


interface Message {
  senderId: string;
  content: string;
  heure_envoi: string | null;
}

interface Conversation {
  id: string;
  participants: string[];
  messages: Message[];
}

interface ConversationViewProps {
  conversation: Conversation;
}

const ConversationView: React.FC<ConversationViewProps> = ({ conversation }) => {
  const idUser="1";
  return (
    <div className="conversation-view">
       {conversation.participants.filter(id => id !==idUser).map((participant, index) => (
                  <h2>Conversation avec {participant}</h2>
      ))}
    
      {/* Utilisation du composant MessageList avec les messages fournis */}
      <MessageList messages={conversation.messages} />
    </div>
  );
};

export default ConversationView;
