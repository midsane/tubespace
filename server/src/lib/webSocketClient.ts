import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import * as cookie from 'cookie';
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
  console.log("\n\n\nInside socket middleware")
  try {
    const socketToken = socket.handshake.auth.token
    const rawCookie = socket.handshake.headers.cookie;
    console.log("raw cookie: ", rawCookie);
    if (!rawCookie || !socketToken) {
      return next()
    }

    let token = null;
    if (rawCookie) {

      const parsed = cookie.parse(rawCookie);
      console.log("parsed token:", parsed['socketAuth']);
      token = parsed['socketAuth']?.split(' ')[1];
    }
    else {
      token = socketToken
    }

    if (!token) {
      return next()
    }

    if (!jwtSecretConfig) {
      return next();
    }
    if (!token) {
      return next()
    }


    console.log("here randi")
    console.log("\n\nSocketAuth:", token);



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
  console.log("user: ", user);
  console.log(`socketId: ${socket.id},  Userid connected: ${user?.id}`);

  if (user && user.id)
    userSocketMap.set(user.id, socket.id);

  socket.on(UploadSocketEvent.DISCONNECT, () => {
    if (user && user.id)
      userSocketMap.delete(user.id);
    console.log(`socketId: ${socket.id}, Userid disconnected: ${user?.id}`);
  });
});