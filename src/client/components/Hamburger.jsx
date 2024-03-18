import {useState} from 'react'
import {Link} from 'react-router-dom'
export default function Hamburger() {
  const [burgerClass, setBurgerClass] = useState('burger-bar unclicked')
  const [menuClass, setMenuClass] = useState('menu hidden')
  const [isMenuClicked, setIsMenuClicked] = useState(false)

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
        <button> Login </button>
        <button>Register </button>
        <ul>
          <li> <Link to="/account">Account</Link> </li>
          <li> Calendar Page</li>

        </ul>
        {/* <Link to="/account">Account</Link> */}
      
      </div>
    </div>
    </>
  );
}
