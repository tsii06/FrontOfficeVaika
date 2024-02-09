// CarListPage.tsx

import React from 'react';

import CarList from './CarList';
import Header from './Header';

const CarListPage: React.FC = () => {
  return (
    <div>   
      <Header title="Acheter des voitures d'occasions"></Header>
      <CarList />
    </div>
  );
};

export default CarListPage;
