import { useState } from "react";
import Login from "./components/Login";

function App() {
  return (
    <>
      <NavBar/>
      <Routes>
       
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
