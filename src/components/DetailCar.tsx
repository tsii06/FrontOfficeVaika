// CarItem.tsx

import React , {useState,useEffect} from 'react';
import '../css/CarList.css';
import axios from 'axios';


interface CarItemProps {
  annonce : {
      idAnnonce: number,
      dateAnnonce: string,
      utilisateur: {
          idUtilisateur: number,
          nom: string,
          adresse: string,
          email: string ,
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
              nom:string
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
interface Photo {
  idAnnonce: string;
  path: string;
}

const DetailCar: React.FC<CarItemProps> = ({annonce}) => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  const token = localStorage.getItem('jwtToken');
  useEffect(() => {
  const fetchPhotos = async () => {
      try {
          const response = await axios.get("https://vaikaback-production.up.railway.app/photos/"+annonce.idAnnonce, {
              headers: {
                  'Authorization': `Bearer ${token}` // Ajouter le token à l'en-tête Authorization
              }
          });
          setPhotos(response.data);
          console.log(response.data)
      } catch (error) {
          console.error('Error fetching photos:', error);
      }
  };
  fetchPhotos();

});
    const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

    const handlePhotoClick = (photoUrl: string) => {
        setSelectedPhoto(photoUrl);
    };
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible'); // Ajoute la classe 'visible' lorsque l'élément devient visible
          }
        });
      });
      
      document.querySelectorAll('.item').forEach(item => {
        observer.observe(item); // Observer chaque élément avec la classe '.item'
      });
      

  return (
    <>
    <div className="carItem even">
    <div className='carItem-div'>
                  {photos.length > 0 && (
                        <img src={`data:image/jpeg;base64,${photos[0].path}`} className="card-img-top" alt="Annonce Preview" />
                    )}
    </div>
    <div className='carItem-div item'>
        <h1>{annonce.voiture.marque.nom} {annonce.voiture.modele.nom}</h1>
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
    </div>
  
</div>
  <div className="car-gallery">
  {photos.map((photoUrl, index) => (
      <div key={index} className="car-photo" onClick={() => handlePhotoClick(photoUrl.path)}>
          <img src={`data:image/jpeg;base64,${photoUrl.path}`} className="card-img-top" alt="Annonce Preview" />
      </div>
  ))} 
   {selectedPhoto && (
      <div className="modal" onClick={() => setSelectedPhoto(null)}>
          <img src={`data:image/jpeg;base64,${selectedPhoto}`} alt="Selected Car" />
      </div>
  )}
</div>
</>
  );
};

export default DetailCar;
