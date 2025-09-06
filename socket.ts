import { Server } from 'socket.io';

export const setupSocket = (io: Server) => {
  io.on('connection', (socket) => {
    console.log(`[socket] Connected: ${socket.id}`);

    socket.on('disconnect', () => {
      console.log(`[socket] Disconnected: ${socket.id}`);
    });

    socket.on('unit:update', (data) => {
      console.log('Unit update received:', data);

      socket.broadcast.emit('unit:update', data);
    });
  });
};
