"use client"

import { useEffect, useState } from "react"
import { io, Socket } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:5000";

interface MessageProp {
    username: string,
    icon: string,
    message: string,
    enters: string
}

interface useSocketProps {
    roomId: string,
    username: string,
    icon: string,
}

const useSocket = ({roomId, username, icon}: useSocketProps) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [serverMessages, setMessages] = useState<MessageProp[]>([]);
    
    useEffect(() => {
        const newSocket = io(SOCKET_SERVER_URL);
        setSocket(newSocket);

        newSocket.emit("joinRoom", {roomId, username});
        newSocket.on("userJoined", (username) => {
            setMessages(prevMessages => [...prevMessages, {username: username, icon: "", message: "", enters: "enter"}]);
        });

        newSocket.on("chatHistory", (history) => {
            setMessages(history);
            console.log(history);
        });
        
        newSocket.on("receiveMessage", (message) => {
            setMessages(prevMessages => [...prevMessages, message]);
        });

        newSocket.on("userLeave", (username) => {
            setMessages(prevMessages => [...prevMessages, {username: username, icon: "", message: "", enters: "leave"}]);
        });

        return () => {
            newSocket.disconnect();
        }
    }, [roomId, username, icon]);

    const sendMessage = (message: string) => {
        if (socket) {
            socket.emit("sendMessage", {roomId, username, icon, message, enters: ""});
        }
    };

    return {serverMessages, sendMessage};
}

export default useSocket;