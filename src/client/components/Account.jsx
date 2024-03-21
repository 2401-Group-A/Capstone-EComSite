import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import "./styles/Account.css"
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
    return <div>You are not logged in. Please log in to view your account</div>;
  }

  return (
    <main>
      <h1>
        Welcome back to <i>Little Seed, Big Garden</i> {profile.firstname}!
      </h1>
      <h2>Your shipping address is:</h2>
      <ul>
        <li>
          Name: {profile.firstname} {profile.lastname}
        </li>
        <li>Street Address: {profile.address}</li>
        <li>City: {profile.city}</li>
        <li>State: {profile.state}</li>
        <li>Zip Code:{profile.zipcode}</li>
        <li>Email: {profile.email}</li>
        {/* This button is currently non-functional */}
        <button>Edit Information (Not Active)</button>
      </ul>
      <div>
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
    </main>
  );
};

export default Account;
