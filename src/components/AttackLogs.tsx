import React from 'react';
import { AttackLog } from '../types/attackTypes';
import CountdownTimer from './Countdown';

interface AttackLogsProps {
  attacks: AttackLog[];
}

const AttackLogs: React.FC<AttackLogsProps> = ({ attacks }) => {
  return (
    <div>
      <h3>Past Attacks</h3>
      <ul>
        {attacks.map((attack) => (
          <li key={attack.id}>
            Missile Type: {attack.missileType} | 
            Status: {attack.status} |
            Time to Impact: <CountdownTimer timeToImpact={attack.timeToImpact} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttackLogs;
