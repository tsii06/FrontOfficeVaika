// CarList.tsx

import React , {useState,useEffect} from 'react';
import '../css/CarList.css';
import DetailCar from './DetailCar';
import Header from './Header';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DetailPage: React.FC = () => {
  // Simulez des données d'annonces de voitures (remplacez cela par une requête à un serveur)
  const { idAnnonce } = useParams();
  const [annonce, setAnnonce] = useState();
  const token = localStorage.getItem('jwtToken');

  useEffect(() => {
      loadEquipes();
  }, []);

  const loadEquipes = async () => {
      try {
          setTimeout(async () => {
              const result = await axios.get("https://vaika-production.up.railway.app/annonce/"+idAnnonce, {
              headers: {
                  'Authorization': `Bearer ${token}` // Ajouter le token à l'en-tête Authorization
              }
          });
              setAnnonce(result.data);
              console.log(result.data)
            
          }, 1000); 
      } catch (error) {
          console.error("Error fetching equipes:", error);
       
      }
  };

  return (
    <>
    <Header title ={'Detail / '}></Header>
    <div className='carItems'>
        {annonce &&<DetailCar annonce={annonce} />}
    </div>
    </>
  );
};

export default DetailPage;