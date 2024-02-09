import React, { ChangeEvent, useEffect, useState } from 'react';
import './modal.css';

const Settings: React.FC= () => {
  const token = localStorage.getItem('jwtToken');
  const [detailsVoiture, setDetailsVoiture] = useState({
    categorie: '',
    marque: '',
    modele: '',
    carburant: '',
    prixmin: '',
    prixmax: '',
    kilometrage: '',
    nombrePlaces: '',
    annee: ''
  });
  const [categoriesVoiture, setCategoriesVoiture] = useState<any[]>([]);
  const [categorieSelectionnee, setCategorieSelectionnee] = useState('');
  const [marquesVoiture, setMarquesVoiture] = useState<any[]>([]);
  const [marqueSelectionnee, setMarqueSelectionnee] = useState('');
  const [modelesVoiture, setModelesVoiture] = useState<any[]>([]);
  const [modeleSelectionne, setModeleSelectionne] = useState('');
  const [carburantsVoiture, setCarburantsVoiture] = useState<any[]>([]);
  const [carburantSelectionne, setCarburantSelectionne] = useState('');
  // Exception 
  const [error, setError] = useState<string>('');

  const [searchResults, setSearchResults] = useState<any[]>([]); // État pour stocker les résultats de la recherche

  useEffect(() => {
    const fetchData = async (url: string, setter: Function) => {
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`, // Ajouter le token à l'en-tête Authorization
          },
        });
        if (response.ok) {
          const data = await response.json();
          setter(data);
        } else {
          console.error(`Échec de la récupération des données depuis ${url}`);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };

    fetchData('https://vaika-production.up.railway.app/modeles', setModelesVoiture);
    fetchData('https://vaika-production.up.railway.app/categories', setCategoriesVoiture);
    fetchData('https://vaika-production.up.railway.app/marques', setMarquesVoiture);
    fetchData('https://vaika-production.up.railway.app/carburants', setCarburantsVoiture);
  }, [token]);

  const handleCategorieChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCategorieSelectionnee(event.target.value);
    setDetailsVoiture({ ...detailsVoiture, categorie: event.target.value });
  };

  const handleMarqueChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setMarqueSelectionnee(event.target.value);
    setDetailsVoiture({ ...detailsVoiture, marque: event.target.value });
  };

  const handleModeleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setModeleSelectionne(event.target.value);
    setDetailsVoiture({ ...detailsVoiture, modele: event.target.value });
  };

  const handleCarburantChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCarburantSelectionne(event.target.value);
    setDetailsVoiture({ ...detailsVoiture, carburant: event.target.value });
  };

  const handlePrixminChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDetailsVoiture({ ...detailsVoiture, prixmin: event.target.value });
  };

  const handlePrixmaxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDetailsVoiture({ ...detailsVoiture, prixmax: event.target.value });
  };

  const handleKilometrageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDetailsVoiture({ ...detailsVoiture, kilometrage: event.target.value });
  };

  const handleNombrePlacesChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDetailsVoiture({ ...detailsVoiture, nombrePlaces: event.target.value });
  };

  const handleAnneeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDetailsVoiture({ ...detailsVoiture, annee: event.target.value });
  };

  const handleSubmit = () => {
    const corpsRequete: any = {};
    Object.keys(detailsVoiture).forEach(key => {
      if (detailsVoiture[key as keyof typeof detailsVoiture] !== '') {
        corpsRequete[key] = detailsVoiture[key as keyof typeof detailsVoiture];
      }
    });
    console.log("Données du formulaire avant la soumission :", detailsVoiture);
    fetch('https://vaika-production.up.railway.app/recherche', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(corpsRequete),
    })
      .then(response => {
        if (!response.ok) {
          setError('Aucun résultat trouvé.');
        }
        return response.json();
      })
      .then(data => {
        console.log("data------->",data);
        setSearchResults(data); // Stockez les données des résultats dans l'état searchResults
      })
      .catch(error => {
        console.error(' eo @ catch:', error);
      });
      
  };

  return (
<div className="recherche">
<div className='car-publication-form'>
  {error && <div className="error">{error}</div>}
  <h1>Recherche de Voiture</h1>
  <div className='form-group'>
    <label htmlFor="categorie">Catégorie de Voiture</label>
    <select id="categorie" value={categorieSelectionnee} onChange={handleCategorieChange}>
    <option value="">Sélectionnez une catégorie</option>
      {categoriesVoiture.map((categorie: any) => (
        <option key={categorie.idCategorie} value={categorie.idCategorie}>{categorie.nom}</option>
      ))}
    </select>
  </div>
  <div className='form-group'>
    <label htmlFor="marque">Marque de Voiture</label>
    <select id="marque" value={marqueSelectionnee} onChange={handleMarqueChange}>
    <option value="">Sélectionnez une marque</option>
      {marquesVoiture.map((marque: any) => (
        <option key={marque.idMarque} value={marque.idMarque}>{marque.nom}</option>
      ))}
    </select>
  </div>
  <div className='form-group'>
    <label htmlFor="modele">Modèle de Voiture</label>
    <select id="modele" value={modeleSelectionne} onChange={handleModeleChange}>
    <option value="">Sélectionnez une modele</option>
      {modelesVoiture.map((modele: any) => (
        <option key={modele.idModele} value={modele.idModele}>{modele.nom}</option>
      ))}
    </select>
  </div>
  <div className='form-group'>
    <label htmlFor="carburant">Carburant</label>
    <select id="carburant" value={carburantSelectionne} onChange={handleCarburantChange}>
    <option value="">Sélectionnez une carburant</option>
      {carburantsVoiture.map((carburant: any) => (
        <option key={carburant.idCarburant} value={carburant.idCarburant}>{carburant.nom}</option>
      ))}
    </select>
  </div>
 <div className='flex'>
 <div className='form-group'>
    <label htmlFor="prix-min">Prix Min</label>
    <input id="prix-min" type="number" value={detailsVoiture.prixmin} onChange={handlePrixminChange} />
  </div>
  <div className='form-group'>
    <label htmlFor="prix-max">Prix Max</label>
    <input id="prix-max" type="number" value={detailsVoiture.prixmax} onChange={handlePrixmaxChange} />
  </div>
 </div>
  <div className='form-group'>
    <label htmlFor="kilometrage">Kilométrage</label>
    <input id="kilometrage" type="number" value={detailsVoiture.kilometrage} onChange={handleKilometrageChange} />
  </div>
  <div className='form-group'>
    <label htmlFor="nombre-places">Nombre de Places</label>
    <input id="nombre-places" type="number" value={detailsVoiture.nombrePlaces} onChange={handleNombrePlacesChange} />
  </div>
  <div className='form-group'>
    <label htmlFor="annee">Année de Fabrication</label>
    <input id="annee" type="number" value={detailsVoiture.annee} onChange={handleAnneeChange} />
  </div>
  <button onClick={handleSubmit}>Soumettre</button>
</div>
<div>
{searchResults && (
  <div className='result'>
    <h1 className='res'>Résultats de la recherche :</h1>
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Année de la voiture</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Description</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Catégorie</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Kilométrage</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Marque de la voiture</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Modèle de la voiture</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Prix de la voiture</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Nombre de places</th>
        </tr>
      </thead>
      <tbody>
        {searchResults.map((result, index) => (
          <tr key={index}>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{result.voiture.annee}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{result.description}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{result.voiture.categorie.nom}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{result.voiture.kilometrage}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{result.voiture.marque.nom}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{result.voiture.modele.nom}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{result.voiture.prix}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{result.voiture.nombrePlace}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}


</div>

</div>
  );
};

export default Settings;
