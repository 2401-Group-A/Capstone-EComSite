import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Account({ token }) {
  const [profile, setProfile] = useState({});
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadProfile() {
      try {
        if (!token) {
          setTimeout(function () {
            navigate('/login');
          }, 3000);
        } else {
          const accountResponse = await axios.get('', {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          });
          // accountResponse looks like { data: actual data}
          setProfile(accountResponse.data); // instead of `const { data } =`
          console.log(profile);
          const ordersResponse = await axios.get('', {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          });
          // ordersResponse looks like { data: actual data }
          console.log('ordersResponse', ordersResponse);
          setOrders(ordersResponse.data.orders);
        }
      } catch (err) {
        console.error(err);
      }
    }
    loadProfile();
  }, []);

  if (!token) {
    return <div>You are not logged in. Please log in to view your account</div>;
  }

  return (
    <main>
      <h1>
        {profile.firstname} {profile.lastname}
      </h1>
      <h2>{profile.email}</h2>
      <div>
        <p>Orders Made:</p>
        {/* {
            orders.map(order => {
                return (
                    <article key={order.id}>
                        <h2>{order.title}</h2>
                        <button onClick={() => returnOrder(order.id)}>Return</button>
                    </article>
                )
            })
        } */}
      </div>
    </main>
  );
}
