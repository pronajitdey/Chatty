import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: [process.env.DEV_CLIENT_URL, "https://chatty-zvtl.onrender.com/"],
    methods: ["GET", "POST"],
  }
});

const userSocketMap = {};

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
}

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("Connected: " + userId);
  
  if (userId !== undefined) {
    userSocketMap[userId] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  })
})

export { app, io, server };