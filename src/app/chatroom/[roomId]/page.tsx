"use client";

import { motion } from "motion/react";

const ChatRoom = () => {
    return (
        <div className="bg-image w-screen h-screen flex flex-col justify-center items-center">
            <div className="relative w-1/3 h-3/4 flex flex-col justify-center items-center">

                <div className="border-bgDark border-opacity-30 border-2 h-full w-full absolute right-2 top-2"></div>

                <div className="w-full h-full flex flex-col items-center rounded-tr-3xl drop-shadow-xl bg-dark overflow-hidden">
                    
                </div>
            </div>
        </div>
    );
}

export default ChatRoom;