
import { useState, useEffect } from "react";
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


// const cartFromLocalStorage = JSON.parse(localStorage.getItem('cartItems') || '[]')

function App() {
  const [token, setToken] = useState(null);
  const [cartItems, setCartItems] = useState([])

  const cookies = new Cookies();
  useEffect(() => {
    const login_token = cookies.get('login_token');
    if (login_token) {
      setToken(login_token);
    }
  }, []);

  // --------- adding item to cart -------------
  const handleAddToCart = async (product) => {
    const updatedCart = [...cartItems, {...product, amount: 1}];
    setCartItems(updatedCart)
    try{
      if (!token){
        throw new Error ('User is not logged in');
      } 
      
      

      await fetch('/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
          body: JSON.stringify({
            order_id: order_id,
            product_id: product.id,
            quantity: 1
          })
      });
      console.log( 'New order posted:', orderId)
      
  
    }catch (err) {
      console.error('error adding item to cart:', err)
    }

  }


//   // ---------- adding to cart --------

// const addToCart = async (product) => {
//   const updatedCart = [...cartItems, {...product, amount: 1}];
//     setCartItems(updatedCart)
//   try{
//     if (!token){
//       throw new Error ('User is not logged in');
//     } else {
//       await fetch('/cart', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: 'Bearer ' + token,
//         },
//         body: JSON.stringify({
//           ordersId: ordersId,
//           productId: product.id,
//           quantity: 1
//         })
//       });
//       console.log( 'New order posted:', orderId)
//     }

//   }catch (err) {
//     console.error('error adding item to cart:', err)
//   }
// }
  // ------ local storage ---------
  // useEffect(() =>{
  //   localStorage.setItem('cartItems', JSON.stringify(cartItems))
  // }, [cartItems])

  
  return (
    <>
      <NavBar size={cartItems.length} setToken={setToken} cookies={cookies}/>
      
      <Routes>
        <Route path='/' element={<Home handleAddToCart={handleAddToCart} cartItems={cartItems} />} />
        <Route path='/products/:id' element={<SingleProduct  handleAddToCart={handleAddToCart}/>} />
        <Route path='/account' element={<Accounts token={token} />} />
        <Route path='/cart' element={<Cart cartItems={cartItems} setCartItems={setCartItems} token={token} />} />
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
