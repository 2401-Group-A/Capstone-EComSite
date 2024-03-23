import React, { useState } from 'react';

export default function UserData() {
  const [users, setUsers] = useState([]);

  return (
    <div>
      <h1>User Data</h1>
      <p>Number of users: {users.length}</p>
    </div>
  );
}
