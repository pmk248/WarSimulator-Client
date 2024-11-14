import React, { useState, useEffect } from 'react';
import { fetchAttackLogs, launchAttack } from '../redux/slices/attackSlice';
import AmmoBar from '../components/AmmoBar';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { Region } from '../models/AuthDtos';

const Attacker: React.FC = () => {
  const dispatch = useAppDispatch();
  const attacks = useAppSelector((state) => state.attack.attacks);
  const ammo = useAppSelector((state) => state.attack.ammo);
  const resources = useAppSelector((state) => state.auth.user?.resources ?? []);

  const [missileType, setMissileType] = useState('');
  const [targetRegion, setTargetRegion] = useState('');

  useEffect(() => {
    dispatch(fetchAttackLogs());
  }, [dispatch]);

  const handleLaunch = () => {
    if (missileType && targetRegion) {
      dispatch(launchAttack({ missileType, targetRegion }));
    }
  };

  return (
    <div>
      <h2>War Room - Attacker</h2>
      <AmmoBar ammo={ammo} />
      
      <select onChange={(e) => setMissileType(e.target.value)} value={missileType}>
        <option value="">Select Missile</option>
        {resources.map((resource) => (
          <option key={resource.name} value={resource.name}>
            {resource.name} ({resource.amount})
          </option>
        ))}
      </select>
      
      <select onChange={(e) => setTargetRegion(e.target.value)} value={targetRegion}>
        <option value="">Select Target Region</option>
          {Object.values(Region).map((region) => (
            <option key={region} value={region}>
            {region}
            </option>
          ))}
      </select>
      <button onClick={handleLaunch}>Launch Attack</button>

      <h3>Past Attacks</h3>
      <ul>
        {attacks.map((attack) => (
          <li key={attack.id}>
            {attack.missileType} - {attack.timeToImpact}s - {attack.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Attacker;
