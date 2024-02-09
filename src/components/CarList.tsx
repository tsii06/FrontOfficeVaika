// CarList.tsx

import React, {useState,useEffect} from 'react';
import CarItem from './CarItem'; // Créez ce composant si nécessaire
import '../css/CarList.css';
import axios from 'axios';

const CarList: React.FC = () => {
  // const idUser = "1";
  const [annonce, setAnnonces] = useState([]);
  const token = localStorage.getItem('jwtToken');

  useEffect(() => {
      loadEquipes();
  }, []);

  const loadEquipes = async () => {
      try {
          setTimeout(async () => {
              const result = await axios.get("https://vaika-production.up.railway.app/annonces", {
              headers: {
                  'Authorization': `Bearer ${token}` // Ajouter le token à l'en-tête Authorization
              }
          });
              setAnnonces(result.data);
              console.log(result.data)
            
          }, 1000); 
      } catch (error) {
          console.error("Error fetching equipes:", error);
       
      }
  };

  return (
    <div className='carItems'>
      {annonce.map((car,index) => (
        <CarItem  annonce={car} index={index}  />
      ))}
    </div>
  );
};

export default CarList;
