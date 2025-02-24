"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import CreateMenu from "./createMenu";
import UserMenu from "./userMenu";
import JoinMenu from "./joinMenu";

interface WelcomeMenuProps {
    handleUserError: () => void,
    handleRoomNameError: () => void,
    handleEmptyRoomError: () => void,
    handleEmptyError: () => void,
    handleEnter: () => void
}

const WelcomeMenu: React.FC<WelcomeMenuProps> = ({handleUserError, handleRoomNameError, handleEmptyRoomError, handleEmptyError, handleEnter}) => {

    const [menu, setMenu] = useState("welcome");
    const [welcome, setWelcome] = useState(true);
    const [create, setCreate] = useState(false);
    const [join, setJoin] = useState(false);

    const handleClickCreate = () => {
        setWelcome(false);
        setMenu("create");
    }

    const handleClickJoin = () => {
        setWelcome(false);
        setMenu("join");
    }

    const handleBackWelcome = () => {
        setMenu("welcome");
        setCreate(false);
        setJoin(false);
        
    }


    return (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{y: 20, opacity: 0}} className="relative w-1/3 h-3/4 flex flex-col justify-center items-center">

            <div className="border-bgDark border-opacity-30 border-2 h-full w-full absolute right-2 top-2"></div>

            <div className="w-full h-full flex flex-col items-center rounded-tr-3xl drop-shadow-xl bg-dark overflow-hidden">
                <div className="flex flex-col justify-center items-center border-b-[3px] w-full py-3 pt-12 border-b-lineBg bg">
                    <h1 className="text-3xl font-bold">Honkai: Star Rail Chat Room</h1>
                    <h2 className="text-lg font-medium sub-text-color">By @AaronHongry</h2>
                </div>
                <AnimatePresence onExitComplete={() => {
                    if (menu == "create") setCreate(true);
                    if (menu == "join") setJoin(true);
                }}>
                    {welcome && <UserMenu handleCreate={handleClickCreate} handleJoin={handleClickJoin}/>}
                </AnimatePresence>
                <AnimatePresence onExitComplete={() => {
                    if (menu == "welcome") setWelcome(true);
                }}>
                    {create && <CreateMenu onExit={handleBackWelcome} onUserError={handleUserError} onEnter={handleEnter}/>}
                </AnimatePresence>
                <AnimatePresence onExitComplete={() => {
                    if (menu == "create") setCreate(true);
                    if (menu == "join") setJoin(true);
                    if (menu == "welcome") setWelcome(true);
                }}>
                    {join && <JoinMenu onExit={handleBackWelcome} onUserError={handleUserError} onRoomNameError={handleRoomNameError} onEmptyRoomError={handleEmptyRoomError} onEmptyError={handleEmptyError} onEnter={handleEnter}/>}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

export default WelcomeMenu;