
import { useState } from "react";
import Login from "./components/Login";
import Inventory from './components/admin/Inventory'
import UserData from './components/admin/UserData'
import UserOrder from './components/admin/UserOrders'
import Accounts from './components/Account'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import Register from './components/Register'
import Home from './components/Home'
import SingleProduct from './components/SingleProduct'
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Cookies from 'universal-cookie';

function App() {
  const [token, setToken] = useState(null);

  const cookies = new Cookies();
  useEffect(() => {
    const login_token = cookies.get('login_token');
    if (login_token) {
      setToken(login_token);
    }
  }, []);

  // show and cart are part of add to cart function
  const [show, setShow] = useState(true);
  const [cart, setCart] = useState([]);

  // add to cart handle click
  const handleClick = (item) => {
    let isPresent = false;
    cart.forEach((product) => {
      if (item.id === product.id) isPresent = true;
    });
    if (isPresent) return;
    setCart([...cart, item]);
  };
  return (
    <>
      <NavBar size={cart.length} setShow={setShow} setToken={setToken} cookies={cookies}/>
      {/* {
        show ? <Home handleClick={handleClick}/> : <Cart cart={cart} setCart={setCart}/>
      } */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products:id' element={<SingleProduct />} />
        <Route path='/account' element={<Accounts token={token} />} />
        <Route path='/cart' element={<Cart token={token} />} />
        <Route path='/checkout' element={<Checkout token={token} />} />
        <Route path='/inventory' element={<Inventory token={token} />} />
        <Route path='/userdata' element={<UserData token={token} />} />
        <Route
          path='/register'
          element={<Register cookies={cookies} token={token} setToken={setToken} />}
        />
        <Route
          path='/login'
          element={<Login cookies={cookies} token={token} setToken={setToken} />}
        />
        <Route path='/userOrders' element={<UserOrder token={token} />} />
      </Routes>
    </>
  );
}

export default App;
