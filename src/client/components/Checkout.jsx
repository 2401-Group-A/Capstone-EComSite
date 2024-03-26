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
          <div className='order-summary'>
            <div className='summary-column'>
              <div>
                <strong>Subtotal:</strong>
                <span>{orderSummaryData.subtotal}</span>
              </div>
              <div>
                <strong>Shipping:</strong>
                <span>{orderSummaryData.shipping}</span>
              </div>
              <div>
                <strong>Estimated Tax:</strong>
                <span>{orderSummaryData.estimatedTax}</span>
              </div>
              <div>
                <strong>Total:</strong>
                <span>{orderSummaryData.total}</span>
              </div>
              <div>
                <strong>You Save:</strong>
                <span>{orderSummaryData.youSave}</span>
              </div>
                <button className="place-order-bttn">Place Order</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
