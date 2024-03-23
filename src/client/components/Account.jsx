import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './styles/Account.css';
const Account = ({ token }) => {
  const [profile, setProfile] = useState({});
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        // Added this if statement to redirect to login if not logged in.
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

          //     const ordersResponse = await axios.get('', {
          //       headers: {
          //         Authorization: 'Bearer ' + token,
          //       },
          //     }
          //     );

          //   ordersResponse looks like { data: actual data }
          //     console.log('ordersResponse', ordersResponse);
          //     setOrders(ordersResponse.data.orders);
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
            
            <li><b>Street Address:</b> {profile.address}</li>
            <li><b>City:</b> {profile.city}</li>
            <li><b>State:</b> {profile.state}</li>
            <li><b>Zip Code: </b>{profile.zipcode}</li>
            <li><b>Email:</b> {profile.email}</li>
            {/* This button is currently non-functional */}
            {/* <button c>
            Edit <br />
            (Not Active)
          </button> */}
          </ul>
        </div>
        <div className='orders-container'>
          <h2>Your past orders:</h2>
          {/* {
        orders.map((order) => {
            return (
              <article key={order.id}>
                <h2>{order.title}</h2>
                <button onClick={() => returnOrder(order.id)}>Return</button>
              </article>
            );
          
        })
        } */}
        </div>
      </div>
    </main>
  );
};

export default Account;
