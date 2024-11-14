import React, { useEffect, useState } from 'react';
import Countdown from './Countdown';

interface InterceptButtonProps {
  timeToImpact: number;             // The missile's time-to-impact countdown in seconds
  attackId: string;                 // The ID of the attack being intercepted
  onIntercept: (attackId: string) => void; // Callback to handle the interception
  status: string;                   // Current status of the attack (e.g., "pending", "hit", "miss")
}

const InterceptButton: React.FC<InterceptButtonProps> = ({ timeToImpact, attackId, onIntercept, status }) => {
  const [countdown, setCountdown] = useState(timeToImpact);

  // Start the countdown timer and stop when it reaches zero
  useEffect(() => {
    if (countdown <= 0 || status !== 'pending') return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, status]);

  // Handle the button click for intercepting
  const handleIntercept = () => {
    onIntercept(attackId);
  };

  // If the countdown has expired or the attack status has changed, hide the button
  if (countdown <= 0 || status !== 'pending') {
    return <span>Status: {status === 'pending' ? 'miss' : status}</span>;
  }

  return (
    <div>
      <Countdown timeToImpact={countdown} />
      <button onClick={handleIntercept} disabled={status !== 'pending'}>
        Intercept
      </button>
    </div>
  );
};

export default InterceptButton;
