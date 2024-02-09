// Importez les modules nécessaires de React et TypeScript
import  { useState , FC } from 'react';
import '../css/Header.css';
import { FiMenu } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
interface HeaderProps {
    title : string 
}

// Composant fonctionnel Button
const Header: FC<HeaderProps> = (props) => {
  // État local pour suivre l'état du clic
  const [menuClicked, setMenuClicked] = useState(false);

  // Fonction appelée lors du clic sur l'icône de menu
  const handleMenuClick = () => {
    // Inversez l'état du clic à chaque clic
    setMenuClicked(!menuClicked);
  };
  const headerClasses = `nav-links ${menuClicked ? 'menu-clicked' : ''}`;
  return (
    <>
        <nav className='navbar'>
          <h1>Logo</h1>
          <div className={headerClasses}>
              <ul>
                  <li>Accueil</li>
                  <li>Annonce</li>
                  <li>Contact</li>
                   <li> <NavLink to="/search">Recherche</NavLink></li>
                  <li> <NavLink to="/fav">Favoris</NavLink></li>
                  <li><NavLink className="nav-link" to="/messages">Messages</NavLink></li>
              </ul>
          </div>
          <div className='menu' onClick={handleMenuClick}>
            <FiMenu />
             </div>  
        </nav>
        <div className='header-title'>
              <p>{props.title}</p> 
        </div>
        <header className='header'>     
        </header>
        
     </> 
  );
};



export default Header;
 


