// Importez les modules nécessaires de React et TypeScript
import  { useState , FC } from 'react';
import '../css/Header.css';
import { FiMenu } from 'react-icons/fi';
import { NavLink ,useNavigate} from 'react-router-dom';
interface HeaderProps {
    title : string 
}

// Composant fonctionnel Button
const Header: FC<HeaderProps> = (props) => {
  const navigate = useNavigate(); 
  // État local pour suivre l'état du clic
  const [menuClicked, setMenuClicked] = useState(false);

  // Fonction appelée lors du clic sur l'icône de menu
  const handleMenuClick = () => {
    // Inversez l'état du clic à chaque clic
    setMenuClicked(!menuClicked);
  };
  const handleLogout = async () => {
    try {
        
         await fetch('https://vaika-production.up.railway.app/login/logout');
          navigate('/');
          
        
      
      
    } catch (error) {
      console.error('Erreur réseau', error);
    }
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
                  <li><button  type='button'  style={{ fontFamily: 'Roboto' }} onClick={handleLogout}>Logout</button></li>

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
 


