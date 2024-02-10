// CarList.tsx

import React, {useState,useEffect} from 'react';
import CarItem from '../components/CarItem'; // Créez ce composant si nécessaire
import '../css/CarList.css';
import axios from 'axios';
import Header from '../components/Header';
interface Favoris{
  id : number,
  utilisateur: {
    idUtilisateur: number,
    nom: string,
    adresse: string,
    email: string,
    contact: string,
    mdp: string,
    cin: string
},
annonce: {
  idAnnonce: number,
  dateAnnonce: string,
  utilisateur: {
      idUtilisateur: number,
      nom: string,
      adresse: string,
      email: string,
      contact: string,
      mdp: string,
      cin: string
  },
  voiture: {
      idVoiture: number,
      marque: {
          idMarque: number,
          nom: string
      },
      categorie: {
          idCategorie: number,
          nom: string
      },
      modele: {
          idModele: number,
          nom: string
      },
      carburant: {
          idCarburant: number,
          nom: string
      },
      annee: number,
      kilometrage: number,
      nombrePlace: number,
      prix: number
  },
  statut: number,
  description: string
}
}


const Favoris: React.FC = () => {
 const idUser = localStorage.getItem('user');
  const [favoris, setFav] = useState<Favoris[]>([]);
  const token = localStorage.getItem('jwtToken');

  useEffect(() => {
      loadEquipes();
  });

  const loadEquipes = async () => {
      try {
          setTimeout(async () => {
              const result = await axios.get("https://vaika-production.up.railway.app/favoris/"+idUser, {
              headers: {
                  'Authorization': `Bearer ${token}` // Ajouter le token à l'en-tête Authorization
              }
          });
              setFav(result.data);
              console.log(result.data)
            
          }, 1000); 
      } catch (error) {
          console.error("Error fetching equipes:", error);
       
      }
  };

  return (
    <>
    <Header title="mes favoris" ></Header>
     <div className='carItems'>
      {favoris.map((car,index) => (
        <CarItem  annonce={car.annonce} index={index}  />
      ))}
    </div>
    </>
   
  );
};

export default Favoris;
