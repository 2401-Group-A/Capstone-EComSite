import { useState } from "react";
import Login from "./components/Login";

function App() {
  const [toke, useToken] = useState(null)
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='./components/admin/Inventory'></Route>
        <Route path='./components/admin/UserData'></Route>
        <Route path='./components/admin/UserOrders'></Route>
        <Route path='./components/Account'></Route>
        <Route path='./components/Cart'></Route>
        <Route path='./components/Checkout'></Route>
        <Route path='./components/Login'></Route>
        <Route path='./components/Register'></Route>
      </Routes>
      
      <div className="App">
        <h1>Boilerplate</h1>
        <img id="comp-img" src="./computer.png"></img>
        <p>Replace the starter code in this template with something cool</p>
        <Login />
      </div>
    </>
  );
}

export default App;
