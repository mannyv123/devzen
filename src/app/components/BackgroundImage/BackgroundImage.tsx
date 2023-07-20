"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

const BackgroundImage = () => {
    const [image, setImage] = useState("");

    const getImage = async () => {
        const result = await fetch("/api/image", {
            method: "GET",
        });

        const data = await result.json();
        setImage(data);
    };

    useEffect(() => {
        getImage();
    }, []);

    //TODO: add loading animation for background

    return (
        <div className="relative h-full w-full">
            <Image src={`${image}`} fill={true} alt="background" className="object-cover object-center" />
        </div>
    );
};

export default BackgroundImage;
