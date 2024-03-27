import { useState, useEffect } from "react";
import "./styles/cart.css";

export default function Cart({ token, cartItems, setCartItems }) {

  const [price, setPrice] = useState(0);
  const [userCartItems, setUserCartItems ] = useState([]);
  const [products, setProducts] = useState([])

  // Function to place the order
  const placeOrder = async () => {
    try {
      // Call getCartItems to refresh the cart
      await getCartItems();
      // Reset the cart items after placing the order
      setUserCartItems([]);
      // Show order successful popup
      alert("Order successful!");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Order failed. Please try again later.");
    }
  };

  // Function to get cart items from the backend
  const getCartItems = async () => {
    try {
      // This is getting the order_id from cart
      const response = await fetch("http://localhost:3000/api/cart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to get cart ID');
      }

      const { id } = await response.json();
      console.log('this is my id:', id);

      // Fetching cart items using the obtained order_id
      const response2 = await fetch('http://localhost:3000/api/cart/cartId/' + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });

      if (!response2.ok) {
        throw new Error('Failed get cart items bro');
      }

      const cartItemsData = await response2.json();
      console.log('this is my cart items:', cartItemsData);
      setUserCartItems(cartItemsData);

    } catch (err) {
      console.error('Failed to get cart items:', err);
      throw err;
    }
  };

  useEffect(() => {
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

  }, []);

  const cartProducts = products
    .filter((product) =>
      userCartItems.some((item) => item.product_id === product.id)
    )
    .map((product) => ({
      productId: product.id,
      quantity: userCartItems.find((i) => i.product_id == product.id).quantity,
      info: product,
    }));

  





  
  // ------ remove item from cart -------
  
  const handleRemove = async (productId) => {
    // const updatedCart = cartItems.filter((product) => product.id !== id);
    // setCartItems(updatedCart);

    try{
      if (!token){
        throw new Error ('User is not logged in');
      } 

      // getting the cart only to get the order_id from it 
      const response = await fetch("http://localhost:3000/api/cart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      // this is getting the order_id out of the response - had to put await in there so that it is called next. 
      const {id}  = await response.json()
 console.log('LOOK HERE', id)
// console.log('PRODUCT ID', product.id)
// console.log( 'PRODUCT', product)
      const itemsInCart = {
        order_id: id,
        product_id: productId
      }


      const response2 = await fetch('http://localhost:3000/api/cart/removeitem', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify(itemsInCart)
      });

     if(!response2.ok){
        throw new Error ('Failed to add to cart bro')
      }
  
    }catch (err) {
      console.error('error adding item to cart:', err)
    }  
    getCartItems()
  };

  // --------- calculates total ---------
  useEffect(() => {
    try {
      const handlePrice = () => {
        let cartTotal = 0;
        cartProducts.forEach(
          (product) => (cartTotal += product.quantity * product.info.price)
        );
        // Round the total price to two decimal places
        const roundedTotal = cartTotal.toFixed(2);
        setPrice(roundedTotal);
      };
      handlePrice();
    } catch (err) {
      console.error(err);
    }
  }, [cartProducts]);

  const handleQtyChange = (product, change) => {
    const updatedCart = cartProducts.map((item) => {
      if (item.info.id === product.info.id) {
        return { ...item, amount: item.info.quantity + change };
      }
      return item;
    });
    setCartItems(updatedCart);
  };

  return (

    <aside className="cart-container">
      <h1 className="your-cart">Your Cart</h1>
      <div>

        {cartProducts.map((product) => (
          <div className="cart_box" key={product.productId}>
            <div className="cart_img">
              <img src={product.info.imgurl} alt={product.info.planttype} />
              <h1 className="plant-type">{product.info.planttype}</h1>
            </div>

            <div className="button-box">
              <button
                onClick={() => handleQtyChange(product, -1)}
                className="qty-buttons">
                -
              </button>
              <button className="qty-buttons">{product.quantity}</button>
              <button
                onClick={() => handleQtyChange(product, +1)}
                className="qty-buttons"
              >
                +
              </button>
              <span className="cart-product-price">${product.info.price}</span>
              <button className="remove-button" onClick={() => handleRemove(product.productId)}> Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="total-cart-price"> Your order total comes to: ${price} </div>
      {/* Place Order button */}
      <button onClick={placeOrder} className="place-order-button">Place Order</button>
    </aside>
  );
}