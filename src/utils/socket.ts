// import { io, Socket } from 'socket.io-client';

// let socket: Socket | null = null;

// export const connectSocket = (token: string) => {
//   if (!socket) {
//     socket = io('http://localhost:5173', {
//       auth: { token },
//     });
    
//     socket.on('connect', () => {
//       console.log('Connected to WebSocket server');
//     });
//   }
// };


// export const onInterceptionResult = (callback: (data: any) => void) => {
//   socket?.on('interception_result', callback);
// };

// export const onNewAttackAlert = (callback: (data: any) => void) => {
//   socket?.on('new_attack_alert', callback);
// };

// export const emitNewAttack = (attackData: any) => {
//   socket?.emit('new_attack', attackData);
// };

// export const disconnectSocket = () => {
//   if (socket) {
//     socket.disconnect();
//     socket = null;
//   }
// };
