
import React , {useState,useEffect} from 'react';
import './conversation.css';
import { Link } from 'react-router-dom';
import axios from 'axios';



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



const ConversationList:  React.FC = () =>  {
  const idUser ="1" ; 
  const [conversations, setConversations] = useState<Conversation[]>([]);
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.get('https://vaika-production.up.railway.app/api/message/conversations/'+idUser, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setConversations(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des conversations:', error);
      }
    };
    
    fetchConversations();
  }, []);

  return (
    <div className="conversation-list">
      {conversations.map(conversation => (
        <Link to={`/message/${conversation.id}`}>
        <div key={conversation.id} className="conversation-item">
          <div className="conversation-avatar">
            {/* Avatar de l'utilisateur */}
          </div>
          <div className="conversation-info">
            {conversation.participants.filter(id => id !==idUser).map((participant, index) => (
                <div key={index} className="conversation-name">
                  {participant}
                </div>
              ))}
            {conversation.messages.length > 0 && (
              <div className="conversation-last-message">
               {conversation.messages[conversation.messages.length - 1].content}
              </div>
            )}
          </div>
        

        </div>
        </Link>
      ))}
    </div>
  );
};

export default ConversationList;
