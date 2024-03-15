import { useState } from "react";
import Login from "./components/Login";
import Inventory from './components/admin/Inventory'
import UserData from './components/admin/UserData'
import UserOrder from './components/admin/UserOrders'
import Accounts from './components/Account'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import Register from './components/Register'


function App() {
  const [token, useToken] = useState(null)
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/seeds' element={<Login />}/>
        <Route path='/account' element={<Accounts/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='inventory' element={<Inventory/>}/>
        <Route path='userdata' element={<UserData/>}/>
        <Route path='register' element={<Register/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='userOrders' element={<UserOrder/>}/>
      </Routes>

    
    </>
  );
}

export default App;
