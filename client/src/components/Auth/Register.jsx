import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import API from '../../api';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'jobseeker'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/auth/register', formData);
      login(response.data);
      navigate('/');
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div className="container">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Register</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2">Role</label>
            <select
              className="w-full p-2 border rounded"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="jobseeker">Job Seeker</option>
              <option value="recruiter">Recruiter</option>
            </select>
          </div>
          <button type="submit" className="btn w-full">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;