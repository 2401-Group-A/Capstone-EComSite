import React, { useState, useEffect } from 'react';

const UserData = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

const fetchUsers = async () => {
  try {
    // Adjust the endpoint as needed
    const response = await fetch('http://localhost:3000/api/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Include authorization if your route is protected
        // 'Authorization': `Bearer ${yourAuthTokenHere}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      setUsers(data.users); // Make sure the API returns an object with a users property containing an array of users
    } else {
      console.error("Error fetching users: ", response.statusText);
    }
  } catch (err) {
    console.error("Error fetching users: ", err);
  }
};


  const filteredUsers = users.filter((user) =>
    user.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Email</th>
            <th>Address</th>
            {/* Add more headers as needed */}
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              {/* Fill in more data as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserData;
