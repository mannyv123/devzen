import BackgroundImage from "./components/BackgroundImage/BackgroundImage";
import Clock from "./components/Clock/Clock";

export default function Home() {
    return (
        <main>
            <div className="absolute inset-x-0 inset-y-0 z-0">
                <BackgroundImage />
            </div>
            <div className="absolute z-10 h-full w-full grid grid-cols-1 grid-rows-layout">
                <div></div>
                <div></div>
                <div className="flex justify-center">
                    <Clock />
                </div>
                <div></div>
                <div></div>
            </div>
        </main>
    );
}
