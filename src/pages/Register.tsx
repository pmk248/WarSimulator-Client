import React, { useState } from 'react';
import { registerUser } from '../api/authAPI';
import { setAuth } from '../redux/slices/authSlice';
import { useAppDispatch } from '../redux/hooks';
import { Region, UserRole } from '../models/AuthDtos';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [organization, setOrganization] = useState<UserRole>(UserRole.Hamas);
  const [region, setRegion] = useState<Region | undefined>(undefined); 
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await registerUser({ username, password, organization, region });
      dispatch(setAuth({ token: data.token, user: data.user }));
      navigate("/login");
    } catch (err) {
      console.error('Registration failed', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        placeholder="Username" 
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password" 
      />
      <select 
        value={organization} 
        onChange={(e) => setOrganization(e.target.value as UserRole)}
      >
        {Object.values(UserRole).map(role => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>
      {organization === UserRole.IDF && (
        <select value={region} onChange={(e) => setRegion(e.target.value as Region)}>
          <option value="">Select Region</option>
          {Object.values(Region).map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      )}
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
