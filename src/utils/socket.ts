import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

// Connect to the WebSocket server
export const connectSocket = (token: string) => {
  if (!socket) {
    socket = io('http://localhost:5173', {
      auth: { token },
    });
    
    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });
  }
};

// Listen for interception results
export const onInterceptionResult = (callback: (data: any) => void) => {
  socket?.on('interception_result', callback);
};

// Listen for new attack alerts for defenders
export const onNewAttackAlert = (callback: (data: any) => void) => {
  socket?.on('new_attack_alert', callback);
};

// Emit a new attack
export const emitNewAttack = (attackData: any) => {
  socket?.emit('new_attack', attackData);
};

// Disconnect from the WebSocket server
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
