import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import { app, server } from "./socket/socket.js";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import messageRoutes from "./routes/message.route.js";
import morgan from "morgan";
// import path from "path";

dotenv.config();
const port = process.env.PORT || 5000;

// const __dirname = path.resolve();

app.use(cors({
  credentials: true,
  origin: process.env.DEV_CLIENT_URL,
}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser());
app.use(express.json());
app.use(morgan("common"));

// app.use(express.static(path.join(__dirname, "/client/dist")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
// })

app.get("/test", (req, res) => {
  res.send("Chatty Server")
})

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);

server.listen(port, () => {
  console.log(`[server]: Server running on port ${port}`);
})