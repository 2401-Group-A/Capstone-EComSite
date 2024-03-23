import { useState, useEffect } from 'react';
import Login from './components/Login';
import Inventory from './components/admin/Inventory';
import UserData from './components/admin/UserData';
import UserOrder from './components/admin/UserOrders';
import Accounts from './components/Account';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Register from './components/Register';
import Home from './components/Home';
// import SingleSeed from './components/SingleSeed'
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Cookies from 'universal-cookie';


// const cartFromLocalStorage = JSON.parse(localStorage.getItem('cartItems') || '[]')

function App() {
  const [token, setToken] = useState(null);

  const cookies = new Cookies();
  useEffect(() => {
    const login_token = cookies.get('login_token');
    if (login_token) {
      setToken(login_token);
    }
  }, []);

  // --------- rendering item cart count -------------
  const [cartItems, setCartItems] = useState([])
  const [warning, setWarning] = useState(false)

  const onAdd =(item) =>{
    let isPresent = false;
    cartItems.forEach((product) => {
      if (item.id === product.id)
      isPresent = true;
    })
    if (isPresent) {
      setWarning(true);
      setTimeout(() => {
        setWarning(false);
      }, 2000)
      return;
    }
    setCartItems([...cartItems, item])
  }

  const handleClick = (product, d) => {
    let ind = -1;
    cartItems.forEach((data, index)=>{
      if (data.ind === product.id)
        ind = index;
    })
    const tempArr = cartItems;
    tempArr[ind] += d;
    if (tempArr[ind].amount === 0)
    tempArr[ind].amount = 1;
  setCartItems([...tempArr])
  console.log(cartItems)
  }

  // useEffect(() =>{
  //   localStorage.setItem('cartItems', JSON.stringify(cartItems))
  // }, [cartItems])



  
  
  return (
    <>
      <NavBar size={cartItems.length} setToken={setToken} cookies={cookies}/>
      <Routes>
        <Route path='/' element={<Home cartItems={cartItems} onAdd={onAdd}/>} />
        <Route path='/products:id' element={<singleSeed />} />
        <Route path='/account' element={<Accounts token={token} />} />
        <Route path='/cart' element={<Cart handleClick={handleClick} cartItems={cartItems} setCartItems={setCartItems} onAdd={onAdd}token={token} />} />
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
