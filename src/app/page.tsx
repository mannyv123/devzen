import { connectToDb, disconnectFromDb } from "@/utils/db";
import BackgroundImage from "../components/BackgroundImage/BackgroundImage";
import ChatGpt from "../components/ChatGpt/ChatGpt";
import Clock from "../components/Clock/Clock";
import TasksContainer from "../components/TasksContainer/TasksContainer";

export default async function Home() {
    //Connect to the db when the application starts
    try {
        await connectToDb();
    } catch (err) {
        console.error(`Error connecting to the database: ${err}`);
    }

    const handleAppExit = async () => {
        try {
            await disconnectFromDb();
            console.log("Disconnected from the database");
        } catch (err) {
            console.error(`Error disconnecting from the database: ${err}`);
        }
    };

    process.on("exit", handleAppExit);
    process.on("SIGINT", handleAppExit);
    process.on("SIGTERM", handleAppExit);

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
