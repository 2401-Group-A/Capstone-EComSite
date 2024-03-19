import {useState} from 'react'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function Hamburger() {
  const [burgerClass, setBurgerClass] = useState('burger-bar unclicked')
  const [menuClass, setMenuClass] = useState('menu hidden')
  const [isMenuClicked, setIsMenuClicked] = useState(false)

  // ------ onClick navigate to login -----------
  let navigate = useNavigate();
    const routeLogin = () => {
      let path = 'login';
      navigate(path)
    }

    // ------ onClick navigate to register -----------
    const routeRegister = () => {
      let path = 'register';
      navigate(path)
    }

  const updateMenu = () => {
    if (!isMenuClicked) {
      setBurgerClass('burger-bar clicked')
      setMenuClass('menu visible')
    } else{
      setBurgerClass('burger-bar unclicked')
      setMenuClass('menu hidden')
    }

    setIsMenuClicked(!isMenuClicked)

    
    
  }
  return (
    <>
    <div>
      <div className="burger-menu" onClick={updateMenu}>
        <div className={burgerClass}></div>
        <div className={burgerClass}></div>
        <div className={burgerClass}></div>
      </div>
      <div className={menuClass}>
        <button onClick={routeLogin}> Login </button>
        <button onClick={routeRegister}>Register </button>
        <ul className='burger-menu-items'>
          <li> <Link to="/account">Account</Link> </li>
          <li> Calendar Page</li>

        </ul>
        {/* <Link to="/account">Account</Link> */}
      
      </div>
    </div>
    </>
  );
}
