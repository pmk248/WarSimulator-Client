import React, { useState } from 'react';
import { loginUser } from '../api/authAPI';
import { setAuth } from '../redux/slices/authSlice';
import { useAppDispatch } from '../redux/hooks';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '../models/AuthDtos';

interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
    role: UserRole;
    resources: { name: string; amount: number }[];
  } | null;
}


const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data: LoginResponse = await loginUser({ username, password });
      console.log(data);
      if (data && data.user) {
        localStorage.setItem("token", data.token);
        dispatch(setAuth({ token: data.token, user: data.user }));

        if (data.user.role === UserRole.IDF) {
          navigate('/warroom/defender');

        } else {
          navigate('/warroom/attacker');
        }

      } else {
        console.error("Login failed: Invalid response data", data);
      }

    } catch (err) {
      console.error('Login failed', err);
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
      <button type="submit">Sign In</button>
    </form>
  );
};

export default Login;
