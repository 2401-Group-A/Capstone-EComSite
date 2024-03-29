import React, { useState, useEffect } from 'react';
import "../styles/UserData.css";
import { useNavigate } from 'react-router-dom';

const UserData = ({ token }) => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      adminCheck();
    }
    fetchUsers();
  }, [token]);

  // Admin Check
  const adminCheck = async () => {
    try {
      const isAdminResponse = await fetch('http://localhost:3000/api/users/admin', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      if (isAdminResponse.ok) {
        const isAdmin = await isAdminResponse.json();
        if (!isAdmin.admin) {
          navigate("/login");
        }
      } else {
        console.error("Error fetching admin status: ", isAdminResponse.statusText);
      }
    } catch (err) {
      console.error("Error checking admin status: ", err);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      } else {
        console.error("Error fetching users: ", response.statusText);
      }
    } catch (err) {
      console.error("Error fetching users: ", err);
    }
  };

  // Conditional Rendering
  if (!token) {
    console.log("here");
    return <div>Please log in</div>;
  }

  const filteredUsers = users.filter((user) =>
    user.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.zipcode.toLowerCase().includes(searchTerm.toLowerCase())
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
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Zip Code</th>
            <th>Admin</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>{user.city}</td>
              <td>{user.state}</td>
              <td>{user.zipcode}</td>
              <td>{user.admin ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserData;
