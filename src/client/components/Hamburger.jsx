import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Hamburger({ cookies, setToken }) {
  const [burgerClass, setBurgerClass] = useState('burger-bar unclicked');
  const [menuClass, setMenuClass] = useState('menu hidden');
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  let navigate = useNavigate();

  // ------ onClick navigate to login -----------
  const routeLogin = () => {
    navigate('/login');
  };

  // ------ onClick navigate to register -----------
  const routeRegister = () => {
    navigate('/register');
  };

  // ------ onClick navigate to account -----------
  const routeAccount = () => {
    navigate('/account');
  };

  // ------ onClick logout to account -----------
  const routeLogout = () => {
    cookies.remove('login_token', { path: '/' });
    setToken('');
    navigate('/');
  };

  // ------ Update menu visibility on burger menu click -----------
  const updateMenu = () => {
    setBurgerClass(
      isMenuClicked ? 'burger-bar unclicked' : 'burger-bar clicked'
    );
    setMenuClass(isMenuClicked ? 'menu hidden' : 'menu visible');
    setIsMenuClicked(!isMenuClicked);
  };

  return (
    <>
      <div className='burger-menu' onClick={updateMenu}>
        <div className={burgerClass}></div>
        <div className={burgerClass}></div>
        <div className={burgerClass}></div>
      </div>
      <div className={menuClass}>
        <button className='menu-button' onClick={routeLogin}>
          Login
        </button>
        <button className='menu-button' onClick={routeRegister}>
          Register
        </button>
        <button className='menu-button' onClick={routeAccount}>
          Account
        </button>
        {/* Add onClick handlers for other buttons as needed */}
        <button className='menu-button'>Calendar, Coming Soon!</button>
        <button className='menu-button' onClick={routeLogout}>
          Sign Out
        </button>
      </div>
    </>
  );
}
