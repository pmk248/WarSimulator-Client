import React, { useEffect } from 'react';
import { fetchPendingAttacks, interceptAttack } from '../redux/slices/defenseSlice';
import AmmoBar from '../components/AmmoBar';
import CountdownTimer from '../components/Countdown';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

const Defender: React.FC = () => {
  const dispatch = useAppDispatch();
  const attacks = useAppSelector((state) => state.defense.attacks); // Use attacks array from the state
  const ammo = useAppSelector((state) => state.attack.ammo);

  // Fetch all attacks (both pending and past)
  useEffect(() => {
    dispatch(fetchPendingAttacks());
  }, [dispatch]);

  const handleIntercept = (attackId: string) => {
    dispatch(interceptAttack(attackId));
  };

  return (
    <div>
      <h2>War Room - IDF</h2>
      <AmmoBar ammo={ammo} />

      <h3>All Attacks</h3>
      <ul>
        {attacks.map((attack) => (
          <li key={attack.id}>
            {attack.missileType} - <CountdownTimer timeToImpact={attack.timeToImpact} />
            
            {/* Show the intercept button only for pending attacks */}
            {attack.status === 'pending' && (
              <button onClick={() => handleIntercept(attack.id)}>Intercept</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Defender;
