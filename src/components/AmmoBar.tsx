import React from 'react';

interface AmmoBarProps {
  ammo: Record<string, number>;
}

const AmmoBar: React.FC<AmmoBarProps> = ({ ammo }) => {
  return (
    <div>
      <h4>Ammo</h4>
      <ul>
        {Object.keys(ammo).map((missileType) => (
          <li key={missileType}>
            {missileType}: {ammo[missileType]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AmmoBar;
