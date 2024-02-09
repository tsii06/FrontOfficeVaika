
import React from 'react';
import Header from '../components/Header';
import CarList from '../components/CarList';
// import Footer from '../footer/Footer';
// import 'bootstrap/dist/css/bootstrap.min.css';

const Favoris: React.FC = () => {
  return (
    <div>   
       <Header title="Favoris"></Header>
      <CarList />
      {/* <Footer/> */}
    </div>
  );
};

export default Favoris;