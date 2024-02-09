
import React from 'react';
import Header from '../components/Header';
import CarList from '../components/CarList';

const Favoris: React.FC = () => {
  return (
    <div>   
       <Header title="Favoris"></Header>
      <CarList />
    </div>
  );
};

export default Favoris;