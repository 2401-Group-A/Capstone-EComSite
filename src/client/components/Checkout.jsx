import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Checkout.css';

const Checkout = ({ token }) => {
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        if (!token) {
          // Handle the case where there's no token, maybe redirect to login
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
  }, [token]); // Adding token to dependencies to reload profile when token changes

  // Dummy data for the order summary
  const orderSummaryData = {
    subtotal: '$100.00',
    shipping: '$10.00',
    estimatedTax: '$8.00',
    total: '$118.00',
    youSave: '$20.00',
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
        </div>
        <div className='orders-container'>
          <h2>Your order summary:</h2>
          {/* <div className='user-address'> */}
            <div className='summary-column'>
            <ul className='user-address summary-column'>
              <li>
                <b>Subtotal:</b>
                <span>{orderSummaryData.subtotal}</span>
              </li>
              <li>
                <b>Shipping:</b>
                <span>{orderSummaryData.shipping}</span>
              </li>
              <li>
                <b>Estimated Tax:</b>
                <span>{orderSummaryData.estimatedTax}</span>
              </li>
              <li>
                <b>Total:</b>
                <span>{orderSummaryData.total}</span>
              </li>
              <li>
                <b>You Save:</b>
                <span>{orderSummaryData.youSave}</span>
              </li>
            </ul>
                <button className="place-order-bttn">Place Order</button>
            </div>
          </div>
        </div>
      {/* </div> */}
    </main>
  );
};

export default Checkout;
