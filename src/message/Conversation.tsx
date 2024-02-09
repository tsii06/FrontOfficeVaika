import React from 'react';
import ConversationView from './ConversationView'; // Assurez-vous d'importer correctement le chemin du composant ConversationView
import Header from '../components/Header';
import './conversation.css';
import { useParams } from 'react-router-dom';
import { useState ,useEffect} from 'react';
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

const Conversation: React.FC = () => {
  const idUser = "1";
  const { idConversation } = useParams();
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messageContent, setMessageContent] = useState('');

 
    const fetchConversation = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.get(`https://vaika-production.up.railway.app/api/message/conversation/${idConversation}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setConversation(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des conversations:', error);
      }
    };

    fetchConversation();
  
    useEffect(() => {
      fetchConversation();
    });

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault(); // Empêcher le comportement par défaut du formulaire

    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.post(`https://vaika-production.up.railway.app/api/message/${idConversation}/messages`, {
        senderId: idUser, // Remplacez par l'ID de l'utilisateur actuel
        content: messageContent
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Mettre à jour la conversation avec le nouveau message
      await fetchConversation();

      // Effacer le contenu du champ de saisie après l'envoi du message
      setMessageContent('');
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
    }
  };

  return (
    <div className="main-page">
      <Header title='Messages' />
      <div className='message-div'>
        {conversation && <ConversationView conversation={conversation} />}
        <form onSubmit={sendMessage}>
          <input
            type="text"
            placeholder="Envoyer un message..."
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
          />
          <button type="submit">Envoyer</button>
        </form>
      </div>
    </div>
  );
};


export default Conversation;
