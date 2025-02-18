"use client"

import { motion } from "motion/react";
import Image from "next/image";

interface UserMenuProps {
    handleCreate: () => void,
    handleJoin: () => void
}

const UserMenu: React.FC<UserMenuProps> = ({handleCreate, handleJoin}) => {
    return (
        <motion.div initial={{y: 30, opacity: 0}} animate={{y: 0, opacity: 1, transition: {ease: "easeOut", duration: 0.2}}} exit={{y: 30, opacity: 0}} transition={{ease: "anticipate"}} className="w-full h-full flex flex-col items-center justify-center gap-3 py-3 px-8">
            
            <div className="w-full flex flex-col gap-2 pb-4">
                <motion.button whileHover={{scale: 1.03}} whileTap={{scale: 1.1, backgroundColor: "#555555"}} onClick={handleCreate} className="border-bgDark border-[1px] button-bg text-2xl py-2 w-full drop-shadow-md">Create Room</motion.button>
                <motion.button whileHover={{scale: 1.03}} whileTap={{scale: 1.1, backgroundColor: "#555555"}} onClick={handleJoin} className="border-bgDark border-[1px] button-bg text-2xl py-2 w-full drop-shadow-md" >Join Room</motion.button>
            </div>
        </motion.div>
    );
}

export default UserMenu;