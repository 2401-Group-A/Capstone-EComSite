import { useState, useEffect } from "react";
import "./styles/cart.css";

export default function Cart({ cartItems, setCartItems }) {
  // const itemsPrice = cartItems.reduce((a,c) => a +c.qty * c.price, 0);
  // const taxPrice= itemsPrice * 0.0862;
  // const shippingPrice = itemsPrice > 30 ? 0 : 20;
  // const total= itemsPrice + taxPrice + shippingPrice;

  const [price, setPrice] = useState(0);

  // ------ remove item from cart -------
  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((product) => product.id !== id);
    setCartItems(updatedCart);
  };

  // --------- calculates total ---------
  useEffect(() => {
    try {
      const handlePrice = () => {
        let cartTotal = 0;
        cartItems.forEach(
          (product) => (cartTotal += product.amount * product.price)
        );
        setPrice(cartTotal);
      };
      handlePrice();
    } catch (err) {
      console.error(err);
    }
  }, [cartItems]);

  // ------- handles add and minus buttons ----------
  const handleQtyChange = (product, change) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === product.id) {
        return { ...item, amount: item.amount + change };
      }
      return item;
    });
    setCartItems(updatedCart);
  };

  return (
    <aside className="cart-container">
      <h2>Your Cart</h2>
      <div>
        {cartItems.length === 0 && (
          <div key="empty-cart-message"> Cart is empty</div>
        )}
        {cartItems.map((product) => (
          <div className="cart_box" key={product.id}>
            <div className="cart_img">
              <img src={product.imgurl} />
              <h1 className="plant-type">{product.planttype}</h1>
            </div>

            <div className="button-box">
              <button
                onClick={() => handleQtyChange(product, -1)}
                className="remove">
                -
              </button>
              <button>{product.amount}</button>
              <button
                onClick={() => handleQtyChange(product, +1)}
                className="add"
              >
                +
              </button>
              <span>{product.price}</span>
              <button onClick={() => handleRemove(product.id)}> Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div> Total: {price} </div>
    </aside>
  );
}
