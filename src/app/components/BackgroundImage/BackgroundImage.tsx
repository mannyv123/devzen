import Image from "next/image";
import React from "react";

let API_URL = process.env.URL;

const getImage = async () => {
    //Relative API urls only working using client component in nextjs; however using server side component which requires absolute url
    const result = await fetch(`${API_URL}/api/image/`, {
        method: "GET",
    });

    return await result.json();
};

const BackgroundImage = async () => {
    let image = await getImage();

    return (
        <div className="relative h-full w-full">
            <Image
                priority
                src={`${image}`}
                fill={true}
                alt="background"
                className="object-cover object-center"
            />
            <div className="absolute inset-x-0 inset-y-0 bg-black opacity-[15%]"></div>
        </div>
    );
};

export default BackgroundImage;
