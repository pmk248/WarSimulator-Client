import React, { useEffect, useState } from 'react';

interface CountdownProps {
  timeToImpact: number;
}

const Countdown: React.FC<CountdownProps> = ({ timeToImpact }) => {
  const [timeLeft, setTimeLeft] = useState(timeToImpact);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return <span>{timeLeft}s</span>;
};

export default Countdown;
