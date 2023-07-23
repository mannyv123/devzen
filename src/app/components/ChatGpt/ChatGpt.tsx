import React from "react";

const ChatGpt = () => {
    return (
        <div className="flex flex-col lg:flex-row gap-2 md:gap-4 text-white">
            <div className="cursor-pointer flex items-center border border-white rounded-full lg:opacity-40 hover:opacity-100 pr-2 lg:pr-0 hover:pr-2 group">
                <div className="w-10 h-10 p-2">
                    <svg
                        className="object-contain w-full h-full"
                        viewBox="0 0 73 84"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M48.28 0.0400085H24.28V8.04001H48.28V0.0400085ZM32.28 52.04H40.28V28.04H32.28V52.04ZM64.4 25.56L70.08 19.88C68.36 17.84 66.48 15.92 64.44 14.24L58.76 19.92C52.56 14.96 44.76 12 36.28 12C16.4 12 0.280029 28.12 0.280029 48C0.280029 67.88 16.36 84 36.28 84C56.2 84 72.28 67.88 72.28 48C72.28 39.56 69.32 31.76 64.4 25.56ZM36.28 76.04C20.8 76.04 8.28003 63.52 8.28003 48.04C8.28003 32.56 20.8 20.04 36.28 20.04C51.76 20.04 64.28 32.56 64.28 48.04C64.28 63.52 51.76 76.04 36.28 76.04Z"
                            fill="white"
                        />
                    </svg>
                </div>
                <p className="whitespace-nowrap overflow-hidden transition-width duration-300 text-center w-[7.5rem] lg:w-0 lg:h-0 group-hover:w-[7.5rem] group-hover:h-fit">
                    Time Complexity
                </p>
            </div>

            <div className="cursor-pointer flex items-center border border-white rounded-full lg:opacity-40 hover:opacity-100 pr-2 lg:pr-0 hover:pr-2 group">
                <div className="w-10 h-10 p-2">
                    <svg
                        className="object-contain w-full h-full"
                        viewBox="0 0 64 72"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M64 20H52.76C50.96 16.88 48.48 14.2 45.48 12.16L52 5.64L46.36 0L37.68 8.68C35.84 8.24 33.96 8 32 8C30.04 8 28.16 8.24 26.36 8.68L17.64 0L12 5.64L18.48 12.16C15.52 14.2 13.04 16.88 11.24 20H0V28H8.36C8.16 29.32 8 30.64 8 32V36H0V44H8V48C8 49.36 8.16 50.68 8.36 52H0V60H11.24C15.4 67.16 23.12 72 32 72C40.88 72 48.6 67.16 52.76 60H64V52H55.64C55.84 50.68 56 49.36 56 48V44H64V36H56V32C56 30.64 55.84 29.32 55.64 28H64V20ZM48 36V48C48 48.88 47.88 49.88 47.72 50.8L47.32 53.4L45.84 56C42.96 60.96 37.68 64 32 64C26.32 64 21.04 60.92 18.16 56L16.68 53.44L16.28 50.84C16.12 49.92 16 48.92 16 48V32C16 31.08 16.12 30.08 16.28 29.2L16.68 26.6L18.16 24C19.36 21.92 21.04 20.12 23 18.76L25.28 17.2L28.24 16.48C29.48 16.16 30.76 16 32 16C33.28 16 34.52 16.16 35.8 16.48L38.52 17.12L40.96 18.8C42.96 20.16 44.6 21.92 45.8 24.04L47.32 26.64L47.72 29.24C47.88 30.12 48 31.12 48 32V36ZM24 44H40V52H24V44ZM24 28H40V36H24V28Z"
                            fill="white"
                        />
                    </svg>
                </div>
                <p className="whitespace-nowrap overflow-hidden transition-width duration-300 text-center flex-1 lg:w-0 lg:h-0 group-hover:w-[4.4375rem] group-hover:h-fit">
                    Find Bugs
                </p>
            </div>

            <div className="cursor-pointer flex items-center border border-white rounded-full lg:opacity-40 hover:opacity-100 pr-2 lg:pr-0 hover:pr-2 group">
                <div className="w-10 h-10 p-2">
                    <svg
                        className="object-contain w-full h-full"
                        viewBox="0 0 80 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M29.6 42.4L11.2 24L29.6 5.6L24 0L0 24L24 48L29.6 42.4ZM50.4 42.4L68.8 24L50.4 5.6L56 0L80 24L56 48L50.4 42.4Z"
                            fill="white"
                        />
                    </svg>
                </div>
                <p className="whitespace-nowrap overflow-hidden transition-width duration-300 text-center flex-1 lg:w-0 lg:h-0 group-hover:w-[5.8125rem] group-hover:h-fit">
                    Explain Code
                </p>
            </div>
        </div>
    );
};

export default ChatGpt;
