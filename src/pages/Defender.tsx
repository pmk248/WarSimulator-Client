import React, { useEffect } from 'react';
import { fetchPendingAttacks, interceptAttack } from '../redux/slices/defenseSlice';
import AmmoBar from '../components/AmmoBar';
import CountdownTimer from '../components/Countdown';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

const Defender: React.FC = () => {
  const dispatch = useAppDispatch();
  
  const pendingAttacks = useAppSelector((state) => state.defense.attacks); 
  const ammo = useAppSelector((state) => state.attack.ammo);  
  
  useEffect(() => {
    dispatch(fetchPendingAttacks());
  }, [dispatch]);

  const handleIntercept = (attackId: string, missileType: string) => {
    dispatch(interceptAttack(attackId));

    if (ammo[missileType] && ammo[missileType] > 0) {
      dispatch({
        type: 'attack/setAmmo',  
        payload: {
          missileType,
          quantity: ammo[missileType] - 1,
        }
      });
    }
  };

  return (
    <div>
      <h2>War Room - IDF</h2>

      <AmmoBar ammo={ammo} />

      <h3>Pending Attacks</h3>
      <ul>
        {pendingAttacks.map((attack) => (
          <li key={attack.id}>
            {attack.missileType} - <CountdownTimer timeToImpact={attack.timeToImpact} />
            {attack.status === 'pending' && (
              <button
                onClick={() => handleIntercept(attack.id, attack.missileType)}
                disabled={ammo[attack.missileType] <= 0} 
              >
                Intercept
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Defender;
