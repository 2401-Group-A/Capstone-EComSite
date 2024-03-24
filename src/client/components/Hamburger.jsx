import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Hamburger = ({ cookies, setToken }) => {
  const [burgerClass, setBurgerClass] = useState('burger-bar unclicked');
  const [menuClass, setMenuClass] = useState('menu hidden');
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  let navigate = useNavigate();

  // Determine if the user is logged in based on having a login_token
  const isLoggedIn = cookies.get('login_token') !== undefined;

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

  // Shows drop down options based on login status
  const renderMenuOptions = () => {
    if (isLoggedIn) {
      return (
        <>
          <button className='menu-button' onClick={routeAccount}>
            Account
          </button>
          <button className='menu-button' onClick={routeLogout}>
            Sign Out
          </button>
          <button className='menu-button'>Calendar, Coming Soon!</button>
        </>
      );
    } else {
      return (
        <>
          <button className='menu-button' onClick={routeLogin}>
            Login
          </button>
          <button className='menu-button' onClick={routeRegister}>
            Register
          </button>
        </>
      );
    }
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
        {renderMenuOptions()}
      </div>
    </>
  );
};

export default Hamburger;
