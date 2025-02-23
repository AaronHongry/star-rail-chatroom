"use client"

import { motion } from "motion/react"
import Image from "next/image"

export interface MessageChatProps {
    username: string,
    pic: string,
    message: string,
    isUser: boolean,
    enters: string
}

const MessageChat: React.FC<MessageChatProps> = ({username, pic, message, isUser, enters}) => {

    if (enters == "enter") {
        return (
            <motion.div initial={{y: 10, opacity: 0}} animate={{y: 0, opacity: 1}} className="w-full">
                <div className="flex flex-row justify-center items-center">
                    <p className="sub-text-color text-lg">{username} has entered the room.</p>
                </div>
            </motion.div>
        );
    }

    if (enters == "leave") {
        return (
            <motion.div initial={{y: 10, opacity: 0}} animate={{y: 0, opacity: 1}} className="w-full">
                <div className="flex flex-row justify-center items-center">
                    <p className="sub-text-color text-lg">{username} has left the room.</p>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div initial={{y: 10, opacity: 0}} animate={{y: 0, opacity: 1}} className="w-full">
            {!isUser ? (
                <div className="flex flex-row gap-5">
                    <Image alt="otherUserPic" src={`/images/${pic}`} className="w-[70px] h-[70px]" width={80} height={80}/>
                    <div className="flex flex-col gap-1">
                        <p className="sub-text-color text-lg">{username}</p>
                        <p className="w-fit max-w-[300px] text-lg button-bg px-4 py-2 rounded-tr-xl rounded-br-xl rounded-bl-xl shadow-none drop-shadow-[-1px_2px_0px_rgba(177,170,172,1)]">{message}</p>
                    </div>
                </div>
            ) : (
                <div className="flex flex-row-reverse gap-5">
                    <Image alt="userPic" src={`/images/${pic}`}  className="w-[70px] h-[70px]" width={80} height={80}/>
                    <div className="flex flex-col gap-1">
                        <p className="sub-text-color text-lg text-right">{username}</p>
                        <p className="ml-auto w-fit max-w-[300px] text-lg my-text-bg px-4 py-2 rounded-tl-xl rounded-br-xl rounded-bl-xl shadow-none drop-shadow-[1px_2px_0px_rgba(177,170,172,1)]">{message}</p>
                    </div>
                </div>
            )}  
        </motion.div>
    )
}

export default MessageChat;