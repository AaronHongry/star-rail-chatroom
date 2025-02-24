"use client"

import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import WelcomeMenu from "@/components/welcomeMenu";
import ErrorUsername from "@/components/errorUsername";
import ErrorRoomName from "@/components/errorRoomName";
import ErrorEmptyRoom from "@/components/errorEmptyRoom";
import ErrorEmpty from "@/components/errorEmpty";

export default function Home() {

    const [userError, setUserError] = useState(false);
    const [roomNameError, setRoomNameError] = useState(false);
    const [emptyRoomError, setEmptyRoomError] = useState(false);
    const [emptyError, setEmptyError] = useState(false);
    const [enter, setEnter] = useState(true);

    const handleUserError = () => {
        setUserError(true);
    }

    const handleRoomNameError = () => {
        setRoomNameError(true);
    }

    const handleEmptyRoomError = () => {
        setEmptyRoomError(true);
    }

    const handleEmptyError = () => {
        setEmptyError(true);
    }

    const handleEnter = () => {
        setEnter(false);
    }

    useEffect(() => {
        if (userError) {
            const errorTimeout = setTimeout(() => setUserError(false), 1000);
            return () => clearTimeout(errorTimeout);
        }
        if (roomNameError) {
            const errorTimeout = setTimeout(() => setRoomNameError(false), 1000);
            return () => clearTimeout(errorTimeout);
        }
        if (emptyRoomError) {
            const errorTimeout = setTimeout(() => setEmptyRoomError(false), 1000);
            return () => clearTimeout(errorTimeout);
        }
        if (emptyError) {
            const errorTimeout = setTimeout(() => setEmptyError(false), 1000);
            return () => clearTimeout(errorTimeout);
        }
    }, [userError, roomNameError, emptyError]);

    return (
        <div className="relative bg-image w-screen h-screen flex flex-col justify-center items-center">
            <AnimatePresence>
                {enter && <WelcomeMenu key={"welcome"} handleUserError={handleUserError} handleRoomNameError={handleRoomNameError} handleEmptyRoomError={handleEmptyRoomError} handleEmptyError={handleEmptyError} handleEnter={handleEnter}/>}
                {userError && <ErrorUsername key={"userError"}/>}
                {roomNameError && <ErrorRoomName key={"roomNameError"}/>}
                {emptyRoomError && <ErrorEmptyRoom key={"emptyRoomError"}/>}
                {emptyError && <ErrorEmpty key={"emptyError"}/>}
            </AnimatePresence>
        </div>
    );
}
