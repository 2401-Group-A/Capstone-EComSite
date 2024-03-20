import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Account = ({ token }) => {
  const [profile, setProfile] = useState({});
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        if (!token) {
          setTimeout(function () {
            navigate('/login');
          }, 3000);
        } else {
            console.log("token ", token)
          const accountResponse = await fetch(
            'http://localhost:3000/api/users/me',
            {
              method: 'GET',
              headers: {
                Authorization: 'Bearer ' + token,
              },
            }
          );
          console.log('profile', profile);
          if (accountResponse.ok) {
            const result = await accountResponse.json();
            setProfile(result); // instead of `const { data } =`
          } else {
            console.error(
              'Error fetching user profile: ',
              accountResponse.statusText
            );
          }

          //   const ordersResponse = await axios.get('', {
          //     headers: {
          //       Authorization: 'Bearer ' + token,
          //     },
          //   }
          //   );

          // ordersResponse looks like { data: actual data }
          //   console.log('ordersResponse', ordersResponse);
          //   setOrders(ordersResponse.data.orders);
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
console.log('first name',profile.firstname)
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
};

export default Account;
