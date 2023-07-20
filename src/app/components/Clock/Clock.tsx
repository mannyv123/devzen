"use client";

import React, { useEffect, useState } from "react";

const Clock = () => {
    const [currentTime, setCurrentTime] = useState(getTime());

    //Function to get the current time in "hh:mm" format
    function getTime() {
        return new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    }

    //Update the current time state every minute using setInterval
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(getTime());
        }, 60000); //60000 ms = 1 min

        //Clean up the interval when the component unmounts to avoid memory leaks
        return () => clearInterval(intervalId);
    }, []);

    return <div suppressHydrationWarning>{currentTime}</div>;
};

export default Clock;
