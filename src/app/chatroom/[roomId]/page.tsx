"use client";

import { AnimatePresence, motion } from "motion/react";
import { useParams } from "next/navigation";
import MessageChat, { MessageChatProps } from "@/components/message"
import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useSocket from "@/app/hooks/useSocket";

const ChatRoom = () => {

    const router = useRouter();

    const { roomId } = useParams<{roomId: string}>() || {roomId: "AAAA"} ;
    
    const searchParams = useSearchParams();
    const [username, setUsername] = useState("Trailblazer");
    const [icon, setIcon] = useState("tra-b.png");

    const [currentMessage, setCurrentMessage] = useState("");

    const chatContainerRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<MessageChatProps[]>([]);

    const { serverMessages, sendMessage } = useSocket({roomId, username, icon});

    const [leave, setLeave] = useState(true);

    const handleEnterMessage = () => {
        if (currentMessage.trim()) {
            sendMessage(currentMessage.trim());
            setCurrentMessage("");
        }
    }

    const handleGoHome = () => {
        setLeave(false);
        const timer = setTimeout(() => {router.push("/");}, 150);
        return () => clearTimeout(timer);
    }

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({behavior: "smooth", top: chatContainerRef.current.scrollHeight});
        }
    }, [messages]);

    useEffect(() => {
        setMessages(serverMessages.map(message => ({username: message.username, pic: message.icon, message: message.message, isUser: (message.username == username), enters: message.enters})));
    }, [serverMessages]);

    useEffect(() => {
        

        if (searchParams) {
            const usernameFromUrl = searchParams.get("username");
            const iconFromUrl = searchParams.get("icon");

            if (usernameFromUrl) {
                setUsername(usernameFromUrl);
            }
            if (iconFromUrl) {
                setIcon(iconFromUrl);
            }
        }
        serverMessages.forEach(serverMessage => {
            setMessages(prevMessages => [...prevMessages, {username: serverMessage.username, pic: serverMessage.icon, message: serverMessage.message, isUser: (username == serverMessage.username), enters: serverMessage.enters}]);
        });
    }, []);

    return (
        <div className="bg-image w-screen h-screen flex flex-col justify-center items-center">
            <AnimatePresence>
                {leave && <motion.div initial={{y: 10, opacity: 0}} animate={{y: 0, opacity: 1}} exit={{y: 10, opacity: 0}} className="relative w-1/3 h-2/3 flex flex-col justify-center items-center">

                    <div className="border-bgDark border-opacity-30 border-2 h-full w-full absolute right-2 top-2"></div>

                    <div className="w-full h-full flex flex-col items-center rounded-tr-3xl drop-shadow-xl bg overflow-hidden">
                        <div className="w-full border-b-lineBg border-b-2 px-8 py-2 pt-4">
                            <h1 className="text-3xl font-medium">Chat Room</h1>
                            <h2 className="text-xl sub-text-color">Room ID: {roomId}</h2>
                        </div>

                        <div className="w-[87%] h-4 chat-top-shadow translate-y-3"/>
                        <div ref={chatContainerRef} className="w-[90%] overflow-y-auto custom-scrollbar flex-grow">
                            <div className="w-full py-2 pb-4 px-3 pr-6 flex flex-col gap-6 ">
                                {messages.map((message, index) => (
                                    <div key={`message-${index}`}>
                                        <MessageChat username={message.username} pic={message.pic} message={message.message} isUser={message.isUser} enters={message.enters}/>
                                    </div>
                                ))}                    
                            </div>
                        </div>
                        <div className="w-[87%] h-4 chat-bottom-shadow -translate-y-3"/>

                        <div className="w-full flex flex-col gap-1 items-center px-8 py-2 pt-6 bg-dark border-t-4 border-t-lineBg">
                            <input value={currentMessage} onChange={(e) => {setCurrentMessage(e.target.value)}} onKeyDown={(e) => {if (e.key == "Enter") {handleEnterMessage();}}} className="border-bgDark border-[1px] button-bg text-2xl py-2 w-full drop-shadow-md text-center px-8 focus:outline-none" placeholder="Type Here" />
                            <motion.button onClick={handleGoHome} className="sub-text-color text-xl py-2 drop-shadow-md hover:underline " >Back</motion.button>
                        </div>


                    </div>
                </motion.div>}
            </AnimatePresence>
        </div>
    );
}

export default ChatRoom;