import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { httpServer } from '../app';
import { CLIENT_URL1, CLIENT_URL2, jwtSecretConfig } from '../config';
import { UploadSocketEvent } from '../types/socketEventEnums';

if (!CLIENT_URL1 || !CLIENT_URL2) {
  console.log("CLIENT_URL1 or CLIENT_URL2 is not set in the environment variables.");
  throw new Error("CLIENT_URL1 or CLIENT_URL2 is not set in the environment variables.");
}

export const io = new Server(httpServer, {
  cors: {
    origin: [CLIENT_URL1, CLIENT_URL2],
    credentials: true,
  },
});

export const userSocketMap = new Map<string, string>();

io.use((socket, next) => {
  console.log("inside socket middleware")
  try {
    const rawCookie = socket.handshake.headers.cookie;
    if (!rawCookie) {
      return next()
    }

    const parsed = cookie.parse(rawCookie);
    const token = parsed['token']?.split(' ')[1];

    if (!jwtSecretConfig) {
      return next();
    }
    if (!token) {
      return next()
    }

    console.log("token:", token);

    const payload = jwt.verify(token, jwtSecretConfig);
    (socket as any).user = payload;

    next();
  } catch (err) {
    console.error('Socket auth failed:', err);
    next(new Error('could not connect'));
  }
});


io.on(UploadSocketEvent.CONNECT, (socket) => {
  const user = (socket as any).user;
  console.log(`socketId: ${socket.id},  User connected: ${user?.email}`);

  if (user && user.id)
    userSocketMap.set(user.id, socket.id);

  socket.on(UploadSocketEvent.DISCONNECT, () => {
    if (user && user.id)
      userSocketMap.delete(user.id);
    console.log(`socketId: ${socket.id}, User disconnected: ${user?.email}`);
  });
});