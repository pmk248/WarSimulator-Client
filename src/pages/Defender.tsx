import React, { useState, useEffect } from 'react';
import { fetchPendingAttacks } from '../redux/slices/defenseSlice';
import AmmoBar from '../components/AmmoBar';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import CountdownTimer from '../components/Countdown';
import { interceptAttackAPI } from '../api/defenseAPI';

const Defender: React.FC = () => {
  const dispatch = useAppDispatch();

  const pendingAttacks = useAppSelector((state) => state.defense.attacks);
  const ammo = useAppSelector((state) => state.attack.ammo);
  const resources = useAppSelector((state) => state.auth.user?.resources ?? []);

  const [selectedMissile, setSelectedMissile] = useState('');
  const [attackId, setAttackId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchPendingAttacks());
  }, [dispatch]);

  const handleIntercept = async (attackId: string, interceptorType: string) => {
    if (attackId && interceptorType) {
      const dto = { attackId, interceptorType };
      const response = await interceptAttackAPI(dto);
      
      if (response.success) {
        console.log('Attack intercepted successfully:', response);
      } else {
        console.error('Failed to intercept attack:', response);
      }

      if (ammo[interceptorType] && ammo[interceptorType] > 0) {
        dispatch({
          type: 'attack/setAmmo',
          payload: {
            missileType: interceptorType,
            quantity: ammo[interceptorType] - 1,
          },
        });
      }
    }
  };

  return (
    <div>
      <h2>War Room - IDF</h2>

      <AmmoBar ammo={ammo} />

      <h3>Select Missile to Intercept</h3>

      <select onChange={(e) => setSelectedMissile(e.target.value)} value={selectedMissile}>
        <option value="">Select Missile</option>
        {resources.map((resource) => (
          <option key={resource.name} value={resource.name}>
            {resource.name} ({ammo[resource.name]} ammo available)
          </option>
        ))}
      </select>

      {selectedMissile && (
        <div>
          <p>Remaining Ammo for {selectedMissile}: {ammo[selectedMissile]}</p>
        </div>
      )}

      <h3>Pending Attacks</h3>
      <ul>
        {pendingAttacks.map((attack) => (
          <li key={attack.id}>
            {attack.missileType} - <CountdownTimer timeToImpact={attack.timeToImpact} />
            <span>Status: {attack.status}</span>
            {attack.status === 'pending' && (
              <div>
                <button
                  onClick={() => {
                    setAttackId(attack.id);
                    handleIntercept(attack.id, selectedMissile); 
                  }}
                  disabled={ammo[selectedMissile] <= 0 || !selectedMissile}
                >
                  Intercept
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Defender;
