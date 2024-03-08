import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { AuthContextType, useAuthContext } from "./AuthContext";

export type SocketContextType = {
  socket?: Socket,
  onlineUsers: string[]
}

type SocketContextProviderProps = {
  children: ReactNode
}

export const SocketContext = createContext<SocketContextType | null>(null);

export const useSocketContext = () => {
  return useContext<SocketContextType | null>(SocketContext);
}

export const SocketContextProvider = ({ children }: SocketContextProviderProps) => {

  const [socket, setSocket] = useState<Socket | undefined>();
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const { auth } = useAuthContext() as AuthContextType;

  useEffect(() => {
    if (auth) {
      const socket = io(import.meta.env.VITE_SERVER_URL, {
        query: {
          userId: auth.id,
        }
      });
      setSocket(socket);

      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => {
        if (socket) {
          socket.close();
        }
      }
    } else {
      if (socket) {
        socket.close();
        setSocket(undefined);
      }
    }
  }, [auth])

  return <SocketContext.Provider value={{ socket, onlineUsers }}>
    { children }
  </SocketContext.Provider>
}