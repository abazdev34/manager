import { Link } from 'react-router-dom';
import './header.scss';

import { GiChickenOven,  } from "react-icons/gi";
import { useEffect, useState } from 'react';

const Header = () => {
  const [isLaptop, setIsLaptop] = useState(window.innerWidth >= 324); // Ноутбук өлшемі
  const [password, setPassword] = useState('');
  const [showProduct, setShowProduct] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLaptop(window.innerWidth >= 324);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === '4545') { // Мұнда 'yourPassword' дегенді өз пароліңізбен ауыстырыңыз
      setShowProduct(true);
    } else {
      alert('Неправильный пароль');
    }
  };

  return (
    <div className="header">
      
	
     
      {(isLaptop || showProduct) && (
        <>
          <form onSubmit={handlePasswordSubmit}>
            <input 
              type="password" 
              value={password} 
              onChange={handlePasswordChange} 
              placeholder="доступ только с пароля " 
            />
            <button type="submit">Техкарта</button>
          </form>
          {showProduct && (
          <Link to="/TechCard"> калкулятор</Link>
          )}
        </>
      )}
    </div>
  );
};

export default Header;