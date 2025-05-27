import { Link } from 'react-router-dom';
import './header.scss';
import { GiChickenOven } from "react-icons/gi";
import { useEffect, useState } from 'react';

const Header = () => {
  const [isLaptop, setIsLaptop] = useState(window.innerWidth >= 768); // Ноутбук өлчөмү
  const [password, setPassword] = useState('');
  const [showProduct, setShowProduct] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLaptop(window.innerWidth >= 768);
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
    if (password === '4545') { // Пароль текшерүү
      setShowProduct(true);
    } else {
      alert('Неправильный пароль');
    }
  };

  return (
    <div className="header">
      <h1><GiChickenOven /> Овощилер дүкөнү</h1>
      {(isLaptop || showProduct) && (
        <>
          <form onSubmit={handlePasswordSubmit}>
            <input 
              type="password" 
              value={password} 
              onChange={handlePasswordChange} 
              placeholder="доступ только с пароля" 
            />
            <button type="submit">Открыть</button>
          </form>
          {showProduct && (
            <Link to="/TechCard">Токторбаев Абаз</Link>
          )}
        </>
      )}
    </div>
  );
};

export default Header;