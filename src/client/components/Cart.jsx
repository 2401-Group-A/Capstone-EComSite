import { useState, useEffect } from "react";
import "./styles/cart.css";

export default function Cart({ cartItems, setCartItems, handleClick, }) {

  // const itemsPrice = cartItems.reduce((a,c) => a +c.qty * c.price, 0);
  // const taxPrice= itemsPrice * 0.0862;
  // const shippingPrice = itemsPrice > 30 ? 0 : 20;
  // const total= itemsPrice + taxPrice + shippingPrice;

  const [price, setPrice] = useState(0);

      const handlePrice = () => {
          let cartTotal = 0;
          cartItems.forEach((product) => (
              cartTotal += product.amount * product.price
          ))
          setPrice(cartTotal);
      }
  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((product) => product.id !== id);
    setCartItems(updatedCart);
  
  };

  useEffect(() => {
     try{
      handlePrice()
     }catch (err){
      console.error(err)
     }
  }, [cartItems])

 

  return (
    <aside className="cart-container">
      <h2>Cart Items</h2>
      <div>
      {cartItems.length === 0 && <div key="empty-cart-message"> Cart is empty</div>}
        {cartItems.map((product) => (
          <div className="cart_box" key={product.id}>
            <div className="cart_img">
              <img src={product.imgurl} />
              <h1 className="plant-type">{product.planttype}</h1>
            </div>
            
            <div className="button-box">
              <button onClick={() => handleClick(product, -1)}className="remove">
                -
              </button>
              <button>{product.amount}</button>
              <button onClick={() => handleClick(product, +1)} className="add">
                +
              </button>
              <span>{product.price}</span>
              <button onClick={() => handleRemove(product.id)}> Remove</button>

              <div> Total: {price} </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

