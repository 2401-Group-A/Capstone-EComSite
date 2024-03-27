import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/Account.css';

const Account = ({ token }) => {
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        if (!token) {
          setTimeout(function () {
            navigate('/login');
          }, 3000);
        } else {
          const accountResponse = await fetch(
            `http://localhost:3000/api/users/me`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
              },
            }
          );
          if (accountResponse.ok) {
            const result = await accountResponse.json();
            setProfile(result);
          } else {
            console.error(
              'Error fetching user profile: ',
              accountResponse.statusText
            );
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    loadProfile();
  }, []);

  if (!token) {
    return (
      <div className='not-logged-container'>
        <h1>
          You are not logged in. <br />
          Please log in or create an account.
        </h1>
      </div>
    );
  }

// Getting past orders 
  // const getPastOrders = async () => {
  //   try{
  //     // This is getting the order_id from cart
  //     const response = await fetch("http://localhost:3000/api/cart", {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: "Bearer " + token,
  //         },
  //       });

  //       if(!response.ok){
  //         throw new Error ('Failed to get cart ID')
  //       }

  //       const { id } = await response.json()
  //       console.log('this is my id:', id)
        
  //       // Fetching past orders using the obtained order_id
  //       const response2 = await fetch('http://localhost:3000/api/cart/orders/' + id, {
          
  //       method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: 'Bearer ' + token,
  //         },
          
  //       });
  
  //      if(!response2.ok){
  //         throw new Error ('Failed get cart items bro')
  //       }
        
  //       const userOrdersData = await response2.json();
        

  //   }catch (err){
  //     console.error('Failed to get cart items:', err);
  //   }
  // };
  // getPastOrders();


  const handleInventoryClick = () => {
    navigate('/inventory');
  };

  const handleUserDataClick = () => {
    navigate('/userdata');
  };

  return (
    <main className='profile-container'>
      <div className='account-greeting'>
        <h1>
          Welcome back to <i>Little Seed, BIG Garden</i> {profile.firstname}!
        </h1>
      </div>
      <div className='shipping-orders-container'>
        <div className='shipping-container'>
          <h2>Your shipping address:</h2>
          <ul className='user-address'>
            <li>
              <b>Name:</b> {profile.firstname} {profile.lastname}
            </li>
            <li>
              <b>Street Address:</b> {profile.address}
            </li>
            <li>
              <b>City:</b> {profile.city}
            </li>
            <li>
              <b>State:</b> {profile.state}
            </li>
            <li>
              <b>Zip Code: </b>
              {profile.zipcode}
            </li>
            <li>
              <b>Email:</b> {profile.email}
            </li>
          </ul>
          {profile.admin && (
            <div>
              <button onClick={handleInventoryClick}>
                Inventory
              </button>
              <button onClick={handleUserDataClick}>
                UserData
              </button>
            </div>
          )}
        </div>
        <div className='orders-container'>
          <h2>Your past orders:</h2>
          <ul>
       {userOrdersData.map(product => (
          <li key={product.id}>
            
            <p>Product ID: {product}</p>
            <p>Quantity: {product.quantity}</p>
          </li>
        ))}
      </ul>
        </div>
      </div>
    </main>
  );
};

export default Account;

