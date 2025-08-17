import React, { useState, useEffect } from 'react';
import Loader from '../../components/Loader.jsx';
import { getUsers, deleteUser } from '../../api/users.js';
import { User, Mail, Phone, Trash2, Shield } from 'lucide-react';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      setError('Failed to load users.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        await deleteUser(userId);
        // Refresh the user list after deletion
        fetchUsers();
      } catch (err) {
        alert('Failed to delete user.');
        console.error(err);
      }
    }
  };

  if (loading) return <Loader />;
  if (error) return <div className="p-6 text-red-500 bg-red-100 rounded-md">{error}</div>;

  return (
    <div className="space-y-8 p-6 bg-white rounded-xl shadow-xl border border-gray-100">
      <h1 className="text-3xl font-bold text-gray-900 border-b-4 border-blue-500 pb-4 mb-4 inline-block">User Management</h1>

      <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow-sm">
        <table className="min-w-full text-left">
          <thead className="bg-blue-50 text-blue-800 text-sm uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3 rounded-tl-lg">Full Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone Number</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3 rounded-tr-lg text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-4 py-3 font-semibold text-lg text-gray-900 flex items-center gap-2">
                    <User size={18} className="text-gray-500" /> {user.fullName}
                  </td>
                  <td className="px-4 py-3 text-gray-700 flex items-center gap-2">
                    <Mail size={16} className="text-gray-400" /> {user.email}
                  </td>
                  <td className="px-4 py-3 text-gray-700 flex items-center gap-2">
                    <Phone size={16} className="text-gray-400" /> {user.phoneNumber}
                  </td>
                  <td className="px-4 py-3 text-gray-700 flex items-center gap-2">
                    <Shield size={16} className="text-gray-400" />
                    <span className={`capitalize font-medium ${user.role === 'admin' ? 'text-red-600' : 'text-gray-800'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="p-2 rounded-full text-red-600 hover:bg-red-100 transition-colors"
                      title="Delete User"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-6 text-center text-gray-500 text-lg">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
