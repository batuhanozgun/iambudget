// src/components/admin/Users.js
import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import '../../styles/globalTables.css';
import '../../styles/globalButtons.css';
import '../../styles/globalTypography.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, 'users');
      const userSnapshot = await getDocs(usersCollection);
      const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(userList);
      setLoading(false);
    };

    fetchUsers();
  }, []);

  const handleMakeAdmin = async (userId) => {
    try {
      const userDoc = doc(db, 'users', userId);
      await updateDoc(userDoc, { role: 'admin' });
      setUsers(users.map(user => user.id === userId ? { ...user, role: 'admin' } : user));
    } catch (error) {
      console.error('Failed to update user role', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="form-wrapper">
      <h2 className="form-header">Users</h2>
      <table className="table">
        <thead className="table-head">
          <tr className="table-row">
            <th className="table-cell">User ID</th>
            <th className="table-cell">Email</th>
            <th className="table-cell">Registration Date</th>
            <th className="table-cell">Verified</th>
            <th className="table-cell">Verification Date</th>
            <th className="table-cell">Role</th>
            <th className="table-cell">Actions</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {users.map(user => (
            <tr className="table-row" key={user.id}>
              <td className="table-cell">{user.userId}</td>
              <td className="table-cell">{user.email}</td>
              <td className="table-cell">{new Date(user.registrationDate).toLocaleDateString()}</td>
              <td className="table-cell">{user.isVerified ? 'Yes' : 'No'}</td>
              <td className="table-cell">{user.verificationDate ? new Date(user.verificationDate).toLocaleDateString() : 'N/A'}</td>
              <td className="table-cell">{user.role || 'user'}</td>
              <td className="table-cell">
                {user.role !== 'admin' && (
                  <button className="btn btn-secondary btn-small" onClick={() => handleMakeAdmin(user.id)}>Make Admin</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
