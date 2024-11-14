// Converts timestamp to elapsed time in seconds
export const getElapsedTime = (timestamp: string): number => {
    return Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000);
  };
  
  // Formats time in seconds to a readable string (e.g., "2m 30s")
  export const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };
  