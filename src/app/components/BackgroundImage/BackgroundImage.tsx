import Image from "next/image";
import React from "react";

let API_URL = process.env.URL;

const getImage = async () => {
    //Relative API urls only working using client component in nextjs; however using server side component which requires absolute url
    const result = await fetch(`${API_URL}/api/image/`, {
        method: "GET",
        next: {
            revalidate: 3600,
        },
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
        </div>
    );
};

export default BackgroundImage;
