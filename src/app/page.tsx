import BackgroundImage from "./components/BackgroundImage/BackgroundImage";
import ChatGpt from "./components/ChatGpt/ChatGpt";
import Clock from "./components/Clock/Clock";
import TasksContainer from "./components/TasksContainer/TasksContainer";

export default function Home() {
    return (
        <main>
            <div className="absolute inset-x-0 inset-y-0 z-0">
                <BackgroundImage />
            </div>
            <div className="absolute z-10 h-full w-full grid grid-cols-1 grid-rows-layout">
                <div>
                    <TasksContainer />
                </div>
                <div></div>
                <div className="flex flex-col w-full justify-center items-center gap-2">
                    <Clock />
                    <ChatGpt />
                </div>
                <div></div>
                <div></div>
            </div>
        </main>
    );
}
