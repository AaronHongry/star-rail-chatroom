"use client"

import { motion } from "motion/react"
import Image from "next/image"

export interface MessageChatProps {
    username: string,
    pic: string,
    message: string,
    isUser: boolean;
}

const MessageChat: React.FC<MessageChatProps> = ({username, pic, message, isUser}) => {
    return (
        <div className="w-full">
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
            
        </div>
    )
}

export default MessageChat;