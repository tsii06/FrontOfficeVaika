import React, { useState, useEffect } from 'react';
import '../css/CarList.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

interface CarItemProps {
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

    index: number;
}

interface Photo {
    idAnnonce: string;
    path: string;
}

const CarItem: React.FC<CarItemProps> = ({ annonce, index }) => {
    const idUser = localStorage.getItem('user');
    const [photos, setPhotos] = useState<Photo[]>([]);
    const token = localStorage.getItem('jwtToken');

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await axios.get(`https://vaikaback-production.up.railway.app/photos/${annonce.idAnnonce}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setPhotos(response.data);
            } catch (error) {
                console.error('Error fetching photos:', error);
            }
        };
        fetchPhotos();
    });
    const headers = {
        'Authorization': `Bearer ${token}`, // Remplacez VOTRE_TOKEN par votre jeton d'authentification
        'Content-Type': 'application/json'
      };
      
      // URL de l'API
      const url = 'https://vaikaback-production.up.railway.app/favoris';
      
      const handleFavoriteClick = async () => {
        const data = {
          utilisateur: {
            idUtilisateur: idUser
          },
          annonce: {
            idAnnonce: annonce.idAnnonce
          }
        };
      
        try {
          const response = await axios.post(url, data, { headers });
          console.log('Réponse de la requête:', response.data);
        } catch (error) {
          console.error('Erreur lors de la requête POST:', error);
        }
      };
      

    return (
        <div className={`carItem ${index % 2 === 0 ? 'even' : 'odd'}`}>
            <div className='carItem-div'>
                <FontAwesomeIcon icon={faHeart} className="favorite-icon" onClick={handleFavoriteClick} />
                {photos.length > 0 && (
                    <img src={`data:image/jpeg;base64,${photos[0].path}`} className="card-img-top" alt="Annonce Preview" />
                )}
            </div>
            <div className='carItem-div'>
                {annonce && (
                <h1>{annonce.voiture.marque.nom} {annonce.voiture.modele.nom} </h1>
                )}
                <div className='car-cararcteristique'>

                    <div className='caract-element'> 
                        <div>Categorie</div>
                        <div>{annonce.voiture.categorie.nom}</div>
                    </div>
                    <div className='caract-element'>
                        <div>Model</div>
                        <div>{annonce.voiture.modele.nom}</div>
                    </div>
                    <div className='caract-element'>
                        <div>Annee</div>
                        <div>{annonce.voiture.annee}</div>
                    </div>
                    <div className='caract-element'>
                        <div>Prix</div>
                        <div>{annonce.voiture.prix}</div>
                    </div>
                </div>
                <div className='btn'>
                    <button><Link className="detail-link" to={`/detail/${annonce.idAnnonce}`}>Details</Link></button>
                </div>
                
            </div>
        </div>
    );
};

export default CarItem;
