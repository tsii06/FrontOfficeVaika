// AppRouter.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';






import CarListPage from './components/CarListPage';
import Conversations from './message/Conversations';
import Conversation from './message/Conversation';
import DetailPage from './components/DetailPage';
import Login from './login/Login';
import Favoris from './favoris/Favoris';
import Modal from './modal/Modal';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element = {<Login/>}/>
         <Route path="/annonces" element={<CarListPage/>} />
         <Route path="/detail/:idAnnonce" element={<DetailPage/>} />
         <Route path="/messages" element={<Conversations/>} />
         <Route path="/message/:idConversation" element={<Conversation/>} />
        {/* bisa */}
        <Route path="/search" element={<Modal/>} /> 
         <Route path="/fav" element={<Favoris/>} /> 
      </Routes>
    </Router>
  );
};

export default AppRouter;
