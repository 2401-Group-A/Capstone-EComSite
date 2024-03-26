import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Hamburger = ({ cookies, setToken }) => {
  const [burgerClass, setBurgerClass] = useState('burger-bar unclicked');
  const [menuClass, setMenuClass] = useState('menu hidden');
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  let navigate = useNavigate();
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const closeMenu = () => {
    setBurgerClass('burger-bar unclicked');
    setMenuClass('menu hidden');
    setIsMenuClicked(false);
  };

  // Determine if the user is logged in based on having a login_token
  const isLoggedIn = cookies.get('login_token') !== undefined;

  // ------ onClick navigate to login -----------
  const routeLogin = () => {
    navigate('/login');
    closeMenu(); // Close the menu after navigation
  };

  // ------ onClick navigate to register -----------
  const routeRegister = () => {
    navigate('/register');
    closeMenu(); // Close the menu after navigation
  };

  // ------ onClick navigate to account -----------
  const routeAccount = () => {
    navigate('/account');
    closeMenu(); // Close the menu after navigation
  };

  // ------ onClick logout to account -----------
  const routeLogout = () => {
    cookies.remove('login_token', { path: '/' });
    setToken('');
    navigate('/');
    closeMenu(); // Close the menu after navigation
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
          <button className='menu-button'>Calendar, Coming Soon!</button>
        </>
      );
    }
  };

  // ------ Update menu visibility on burger menu click -----------
  const updateMenu = (event) => {
    event.stopPropagation(); // Prevent event from propagating to document
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
      <div ref={menuRef} className={menuClass}>
        {renderMenuOptions()}
      </div>
    </>
  );
};

export default Hamburger;
