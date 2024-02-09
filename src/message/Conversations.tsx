import Header from '../components/Header';
import ConversationList from './ConversationList';
import './conversation.css';
const Conversations: React.FC = () => {

  
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