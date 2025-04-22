import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { io } from "socket.io-client";

const SocketContext = createContext();

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5000" : "/";

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const socket = io(BASE_URL, {
        query: {
          userId: authUser._id,
        },
      });
      setSocket(socket);

      // socket.on() is used to listen to the events. can be used both on client and server side
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers, setOnlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

// =========== without indicator ====================

// import { createContext, useContext, useEffect, useState } from "react";
// import { useAuthContext } from "./AuthContext";
// import { io } from "socket.io-client";

// const SocketContext = createContext();

// export const useSocketContext = () => {
//   return useContext(SocketContext);
// };

// export const SocketContextProvider = ({ children }) => {
//   const [socket, setSocket] = useState(null);
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const { authUser } = useAuthContext();

//   useEffect(() => {
//     if (authUser) {
//       const socket = io("http://localhost:5000", {
//         query: {
//           userId: authUser._id,
//         },
//       });
//       setSocket(socket);

//       // socket.on() is used to listen to the events. can be used both on client and server side
//       socket.on("getOnlineUsers", (users) => {
//         setOnlineUsers(users);
//       });

//       return () => socket.close();
//     } else {
//       if (socket) {
//         socket.close();
//         setSocket(null);
//       }
//     }
//   }, [authUser]);

//   return (
//     <SocketContext.Provider value={{ socket, onlineUsers, setOnlineUsers }}>
//       {children}
//     </SocketContext.Provider>
//   );
// };
