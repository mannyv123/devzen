import BackgroundImage from "../components/BackgroundImage/BackgroundImage";
import ChatGptFeature from "../components/ChatGptFeature/ChatGptFeature";
import ClockFeature from "../components/ClockFeature/ClockFeature";
import TasksFeature from "../components/TasksFeature/TasksFeature";

//TODO: use redux for global state management
//TODO: use next-auth for authentication
//TODO: display current timers in the corner
//TODO: figure out bug where it could be 40min in for timer but shows only 4min --- it might be that when computer goes to sleep it gets paused; might need to have something that refreshes on refocus????

export default function Home() {
   return (
      <main>
         <div className='absolute inset-x-0 inset-y-0 z-0'>
            <BackgroundImage />
         </div>
         <div className='absolute z-10 h-full w-full grid grid-cols-1 grid-rows-layout'>
            <div>
               <TasksFeature />
            </div>
            <div></div>
            <div className='flex flex-col w-full justify-center items-center gap-2'>
               <ClockFeature />
               <ChatGptFeature />
            </div>
            <div></div>
            <div></div>
         </div>
      </main>
   );
}
