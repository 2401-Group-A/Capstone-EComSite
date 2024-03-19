
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
// import SingleSeed from './components/SingleSeed'
import { Routes, Route } from 'react-router-dom';
import NavBar from "./components/NavBar";




function App() {
  const [token, setToken] = useState(null)
  return (

    <>
      <NavBar/>
      <Routes>
        <Route path='/seeds' element={<Home />}/>
        {/* <Route path='/seeds:id' element={<singleSeed/>}/> */}
        <Route path='/account' element={<Accounts token={token}/>}/>
        <Route path='/cart' element={<Cart token={token}/>}/>
        <Route path='/checkout' element={<Checkout token={token}/>}/>
        <Route path='inventory' element={<Inventory token={token}/>}/>
        <Route path='userdata' element={<UserData token={token}/>}/>
        <Route path='register' element={<Register setToken={setToken}/>}/>
        <Route path='login' element={<Login setToken={setToken}/>}/>
        <Route path='userOrders' element={<UserOrder token={token}/>}/>
      </Routes>
    </>

  );
}

export default App;
