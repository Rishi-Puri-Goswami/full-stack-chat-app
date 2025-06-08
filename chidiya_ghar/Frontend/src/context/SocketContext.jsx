import { createContext, useContext, useEffect, useState, useRef } from "react";
import { useAuth } from "./AuthProvider";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [authUser] = useAuth();

  
  const socketRef = useRef(null);

  useEffect(() => {
    if (authUser) {
      if (!socketRef.current) {
        const newSocket = io("https://chidyaghar-backend.onrender.com", {
          query: {
            userId: authUser.user._id,
          },
          withCredentials: true,
          transports: ["websocket"], 
        });

        socketRef.current = newSocket;
        setSocket(newSocket);

        newSocket.on("getOnlineUsers", (users) => {
          setOnlineUsers(users);
        });
      }
    }

    
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        setSocket(null);
        setOnlineUsers([]);
      }
    };
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
