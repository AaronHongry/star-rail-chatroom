"use client"

import { motion } from "motion/react"
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface CreateMenuProps {
    onExit: () => void,
    onUserError: () => void,
    onEnter: () => void
}

const CreateMenu: React.FC<CreateMenuProps> = ({onExit, onUserError, onEnter}) => {

    const router = useRouter();

    const [roomNumber, setRoomNumber] = useState("");
    const [username, setUsername] = useState("");
    const [icon, setIcon] = useState("tra-b.png");

    useEffect(() => {
        setRoomNumber(Math.random().toString(36).substring(2, 6).toUpperCase());
    }, []);

    const handleGenerateId = () => {
        setRoomNumber(Math.random().toString(36).substring(2, 6).toUpperCase());
    }
    
    const joinRoom = () => {
        if (username) {
            onEnter();
            router.push(`/chatroom/${roomNumber}?username=${username}&icon=${icon}`);
        } else {
            onUserError();
        }
    }

    return (
        <motion.div initial={{y: 30, opacity: 0}} animate={{y: 0, opacity: 1, transition: {ease: "easeOut", duration: 0.2}}} exit={{y: 30, opacity: 0}} transition={{ease: "anticipate"}} className="w-full h-full flex flex-col items-center justify-between gap-3 py-3 lg:px-8 px-3">
            <div className="text-center">
                <h1 className="text-xl">Room ID:</h1>
                <motion.h1 key={roomNumber} initial={{y: -5}} animate={{y: 0}} className="text-5xl font-semibold">{roomNumber}</motion.h1>
            </div>

            <div className="flex flex-col w-full justify-center items-center gap-6">
                <h1 className="text-xl">Select Icon</h1>
                <div className="flex flex-row w-full lg:h-36 h-24 justify-between px-4">
                    <motion.div whileHover={{scale: 1.05}} whileTap={{scale: 1.1}} onClick={() => setIcon("tra-b.png")} className={`${icon == "tra-b.png" ? "button-bg drop-shadow-md" : ""} flex items-center justify-center lg:w-36 lg:h-36 w-24 h-24 transition-opacity hover:border-2 hover:border-slate-600 hover:border-opacity-30`}><Image alt="trailblazer" src="/images/tra-b.png" className="lg:w-32 lg:h-32 w-20 h-20" width={128} height={128}/></motion.div>
                    <motion.div whileHover={{scale: 1.05}} whileTap={{scale: 1.1}} onClick={() => setIcon("dan-h.png")} className={`${icon == "dan-h.png" ? "button-bg drop-shadow-md" : ""} flex items-center justify-center lg:w-36 lg:h-36 w-24 h-24 transition-opacity hover:border-2 hover:border-slate-600 hover:border-opacity-30`}><Image alt="trailblazer" src="/images/dan-h.png" className="lg:w-32 lg:h-32 w-20 h-20" width={128} height={128}/></motion.div>
                    <motion.div whileHover={{scale: 1.05}} whileTap={{scale: 1.1}} onClick={() => setIcon("mar-7.png")} className={`${icon == "mar-7.png" ? "button-bg drop-shadow-md" : ""} flex items-center justify-center lg:w-36 lg:h-36 w-24 h-24 transition-opacity hover:border-2 hover:border-slate-600 hover:border-opacity-30`}><Image alt="trailblazer" src="/images/mar-7.png" className="lg:w-32 lg:h-32 w-20 h-20" width={128} height={128}/></motion.div>
                </div>
                <input onChange={e => setUsername(e.target.value)} className="lg:w-1/2 w-full h-8 px-2 text-center focus:outline-none" maxLength={12} placeholder="Enter a Username"/>
            </div>

            <div className="w-full flex flex-col gap-2 pb-4 items-center">
                <motion.button whileHover={{scale: 1.03}} whileTap={{scale: 1.1, backgroundColor: "#555555"}} onClick={joinRoom} className="border-bgDark border-[1px] button-bg text-2xl py-2 w-full drop-shadow-md" >Create Room</motion.button>
                <motion.button whileHover={{scale: 1.03}} whileTap={{scale: 1.1, backgroundColor: "#555555"}} onClick={handleGenerateId} className="border-bgDark border-[1px] button-bg text-xl py-2 w-full drop-shadow-md">Generate New Room ID</motion.button>
                <motion.button whileHover={{scale: 1.03}} whileTap={{scale: 1.1, backgroundColor: "#555555"}} onClick={onExit} className="sub-text-color text-xl py-0 drop-shadow-md hover:underline " >Back</motion.button>
            </div>

        </motion.div>
    );
}

export default CreateMenu;