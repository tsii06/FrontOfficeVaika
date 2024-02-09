import Header from '../components/Header';
import ConversationList from './ConversationList';
import './conversation.css';
const Conversations: React.FC = () => {
     [
        {
          id: 1,
          name: 'Ami 1',
          lastMessage: 'Salut, ça va ?',
          unreadCount: 2,
        },
        {
          id: 2,
          name: 'Ami 2',
          lastMessage: 'Coucou !',
          unreadCount: 0,
        },
        // Ajoutez d'autres conversations ici
      ];
  
    return (
        <div>
            <Header title ="message"></Header>
            <div className='list-conversation-div'>
                <h1>Mes messages</h1>
                <ConversationList />
            </div>
        </div>
    );
  };
  
  export default Conversations;