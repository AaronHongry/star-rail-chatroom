const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const pool = require("./lib/db.js");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET, POST"]
    }
});

let chatRooms = {}

io.on("connection", (socket) => {
    socket.on("joinRoom", async ({roomId, username}) => {
        try {
            const roomExists = await pool.query("SELECT * FROM chatrooms WHERE room_id = $1", [roomId]);
            if (roomExists.rows.length === 0) {
                await pool.query("INSERT INTO chatrooms (room_id) VALUES ($1)", [roomId]);
            }
            if (!chatRooms[roomId]) {
                chatRooms[roomId] = [];
            }

            socket.join(roomId);
            console.log(`${username} joined room: ${roomId}`);

            io.to(roomId).emit("userJoined", username );
            await pool.query("INSERT INTO messages (room_id, username, icon, message, enters, timestamp) VALUES ($1, $2, $3, '', 'enter', NOW())", [roomId, username, ""]);

            socket.data.currentRoomId = roomId;
            socket.data.currentUsername = username;
            
            const chatHistory = await pool.query("SELECT username, icon, message, enters FROM messages WHERE room_id = $1 ORDER BY timestamp ASC", [roomId]);
            chatRooms[roomId] = chatHistory.rows.map(row => row);
            console.log(chatRooms[roomId]);
            socket.emit("chatHistory", chatRooms[roomId]);

        } catch (error) {
            console.error("Error joining room.", error);
        }
    });

    socket.on("sendMessage", async ({roomId, username, icon, message}) => {
        try {
            const chatMessage = {username, icon, message, enters: ""};
            chatRooms[roomId].push(chatMessage);
            await pool.query("INSERT INTO messages (room_id, username, icon, message, enters, timestamp) VALUES ($1, $2, $3, $4, '', NOW())", [roomId, username, icon, message]);
            io.to(roomId).emit("receiveMessage", chatMessage);
        } catch (error) {
            console.error("Error sending message.", error);
        }
    });

    socket.on("disconnect", async () => {
        const { currentRoomId, currentUsername } = socket.data;
        io.to(currentRoomId).emit("userLeave", currentUsername );
        if (currentRoomId && currentUsername) {
            chatRooms[currentRoomId].push({username: currentUsername, icon: "", messages: "", enters: "leave"});
            console.log(`${currentUsername} has disconnected from Room ${currentRoomId}`);

            setTimeout(async () => {
                const roomUsers = io.sockets.adapter.rooms.get(currentRoomId);
                if (!roomUsers || roomUsers.size == 0) {
                    await pool.query("DELETE FROM chatrooms WHERE room_id = $1", [currentRoomId]);
                    console.log(currentRoomId);
                    delete chatRooms[currentRoomId];
                    console.log(`Room ${currentRoomId} has been deleted!`);
                    await pool.query("DELETE FROM messages WHERE room_id = $1", [currentRoomId]);
                }
            }, 1000);
        }
    });
});

const PORT = 5000;
server.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
    
