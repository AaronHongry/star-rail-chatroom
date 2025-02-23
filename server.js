const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET, POST"]
    }
});

let chatRooms = {};

io.on("connection", (socket) => {
    socket.on("joinRoom", ({roomId, username}) => {
        socket.join(roomId);
        console.log(`${username} joined room: ${roomId}`);

        if (!chatRooms[roomId]) {
            chatRooms[roomId] = [];
        }

        io.to(roomId).emit("userJoined", username );
        chatRooms[roomId].push({username: username, icon: "", messages: "", enters: "enter"});
        socket.data.currentRoomId = roomId;
        socket.data.currentUsername = username;

        socket.emit("chatHistory", chatRooms[roomId]);
    });

    socket.on("sendMessage", ({roomId, username, icon, message}) => {
        const chatMessage = {username, message, icon};
        chatRooms[roomId].push(chatMessage);
        io.to(roomId).emit("receiveMessage", chatMessage)
    });

    socket.on("disconnect", () => {
        const { currentRoomId, currentUsername } = socket.data;
        io.to(currentRoomId).emit("userLeave", currentUsername );
        if (currentRoomId && currentUsername) {
            chatRooms[currentRoomId].push({username: currentUsername, icon: "", messages: "", enters: "leave"});
            console.log(`${currentUsername} has disconnected from Room ${currentRoomId}`);
        }
    });
});

const PORT = 5000;
server.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
    
