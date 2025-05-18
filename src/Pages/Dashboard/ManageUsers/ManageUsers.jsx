import { useEffect, useState } from "react";
import axiosInstance from "../../../Apis/config.js";

import './ManageUsers.css'; // استيراد ملف التنسيق

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [editedEmail, setEditedEmail] = useState('');
  const [editedRole, setEditedRole] = useState('');

  useEffect(() => {
    axiosInstance
      .get('/users')
      .then((res) => {
        setUsers(res.data.users);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching users:', err);
        setError('Failed to load users');
        setLoading(false);
      });
  }, []);

  const handleEditClick = (user) => {
    setEditingUser(user);
    setEditedEmail(user.email);
    setEditedRole(user.role);
  };

  const handleSave = () => {
    setUsers(users.map(user =>
      user.id === editingUser.id
        ? { ...user, email: editedEmail, role: editedRole }
        : user
    ));
    setEditingUser(null);
  };

  const handleDelete = (userId) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (confirmed) {
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  return (
    <div className="manage-users-container mt-5">
      <h2 className="mb-4">Manage Users</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div className="alert alert-info">Loading users...</div>}

      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>
                  {editingUser?.id === user.id ? (
                    <input
                      value={editedEmail}
                      onChange={(e) => setEditedEmail(e.target.value)}
                      className="form-control"
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td>
                  {editingUser?.id === user.id ? (
                    <input
                      value={editedRole}
                      onChange={(e) => setEditedRole(e.target.value)}
                      className="form-control"
                    />
                  ) : (
                    user.role
                  )}
                </td>
                <td>
                  {editingUser?.id === user.id ? (
                    <button className="btn btn-sm btn-success" onClick={handleSave}>
                      Save
                    </button>
                  ) : (
                    <>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleEditClick(user)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ManageUsers;