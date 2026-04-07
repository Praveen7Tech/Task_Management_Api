import { Server } from "socket.io";
import { Server as HttpServer } from "http";

let io: Server;

export const initSocket = (httpServer: HttpServer) => {
    
    io = new Server(httpServer, {
        cors: {
            origin: [process.env.CLIENT_URL!],
            credentials: true
        }
    });
    console.log("url ",)

    io.on("connection", (socket) => {
        console.log(`⚡ Socket connected: ${socket.id}`);

        socket.on("register", (userId: string) => {
            socket.join(userId);
            // join global room for shared activity broadcasts
            socket.join("global_activity");
            console.log(` User ${userId} joined global activity`);
        });

        socket.on("disconnect", () => {
            console.log("Socket disconnected");
        });
    });

    return io;
};

export const getIO = () => {
    if (!io) throw new Error("Socket.io not initialized!");
    return io;
};
