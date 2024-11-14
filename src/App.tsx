import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Attacker from './pages/Attacker';
import Defender from './pages/Defender';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/warroom/attacker" element={<Attacker/>} />
      <Route path="/warroom/defender" element={<Defender/>} />
    </Routes>
  );
};

export default App;
