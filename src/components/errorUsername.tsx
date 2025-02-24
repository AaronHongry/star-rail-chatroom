"use client"

import { motion } from "motion/react";

const ErrorUsername = () => {
    return (
        <motion.div initial={{opacity: 0, scale: 0}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, transition: {duration: 1}}} className="absolute drop-shadow-md pointer-events-none">
            <h1 className="bg-red-300 px-4 py-2 text-2xl">Please enter a username!</h1>
        </motion.div>
    );
}

export default ErrorUsername;