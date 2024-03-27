import { useState, useEffect } from "react";
import "./styles/cart.css";

export default function Cart({token, cartItems, setCartItems }) {

  const [price, setPrice] = useState(0);
  const [userCartItems, setUserCartItems ] = useState([])
  const [products, setProducts] = useState([])


  // getting cart items from the back end 

  useEffect(() => {
    const getCartItems = async () => {
      try{
        // This is getting the order_id from cart
        const response = await fetch("http://localhost:3000/api/cart", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          });

          if(!response.ok){
            throw new Error ('Failed to get cart ID')
          }

          const { id } = await response.json()
          console.log('this is my id:', id)
          
          // Fetching cart items using the obtained order_id
          const response2 = await fetch('http://localhost:3000/api/cart/cartId/' + id, {
            
          method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token,
            },
            
          });
    
         if(!response2.ok){
            throw new Error ('Failed get cart items bro')
          }
          
          const cartItemsData = await response2.json();
          console.log (cartItemsData)
          setUserCartItems(cartItemsData);

      }catch (err){
        console.error('Failed to get cart items:', err);
      }
    };
    getCartItems();


    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const result = await response.json();

          setProducts(result.products);
        } else {
          console.error('Error fetching products: ', response.statusText);
        }
      } catch (err) {
        console.error('Error loading seeds: ', err);
      }
    };

    fetchProducts();


  }, [])
  
  
  const cartProducts = products.find((product) => {
    
  })







  // NEED TO UPDATE TO INCLUDE API CALL TO REMOVE FROM SERVER
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
      <h2> Your Cart </h2>
      <ul>
        {userCartItems.map(product => (
          <li key={product.id}>
            <p>Product ID: {product.product_id}</p>
            <p>Quantity: {product.quantity}</p>
          </li>
        ))}
      </ul>



    </aside>
    // <aside className="cart-container">
    //   <h2>Your Cart</h2>
    //   <div>
    //     {cartItems.length === 0 && (
    //       <div key="empty-cart-message"> Cart is empty</div>
    //     )}
    //     {cartItems.map((product) => (
    //       <div className="cart_box" key={product.id}>
    //         <div className="cart_img">
    //           <img src={product.imgurl} />
    //           <h1 className="plant-type">{product.planttype}</h1>
    //         </div>

    //         <div className="button-box">
    //           <button
    //             onClick={() => handleQtyChange(product, -1)}
    //             className="remove">
    //             -
    //           </button>
    //           <button>{product.amount}</button>
    //           <button
    //             onClick={() => handleQtyChange(product, +1)}
    //             className="add"
    //           >
    //             +
    //           </button>
    //           <span>{product.price}</span>
    //           <button onClick={() => handleRemove(product.id)}> Remove</button>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    //   <div> Total: {price} </div>
    // </aside>
  );
}
