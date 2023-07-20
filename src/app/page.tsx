import BackgroundImage from "./components/BackgroundImage/BackgroundImage";
import Clock from "./components/Clock/Clock";

export default function Home() {
    return (
        <main>
            <div className="absolute inset-x-0 inset-y-0 z-0">
                <BackgroundImage />
            </div>
            <div className="absolute z-10 h-full w-full">
                <div>
                    <Clock />
                </div>
            </div>
        </main>
    );
}
