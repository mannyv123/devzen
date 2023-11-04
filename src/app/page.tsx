import BackgroundImage from "../components/BackgroundImage/BackgroundImage";
import ChatGptFeature from "../components/ChatGptFeature/ChatGptFeature";
// import ClockFeature from "../components/ClockFeature/ClockFeature";
import TasksFeature from "../components/TasksFeature/TasksFeature";
import UserAuthFeature from "@/components/UserAuthFeature/UserAuthFeature";
import dynamic from "next/dynamic";

const ClockFeature = dynamic(() => import("@/components/ClockFeature/ClockFeature"), {
   ssr: false,
});

//TODO: display current timers in the corner

export default function Home() {
   return (
      <main>
         <div className='absolute inset-x-0 inset-y-0 z-0'>
            <BackgroundImage />
         </div>
         <div className='absolute z-10 grid h-full w-full grid-cols-1 grid-rows-layout'>
            <div className='flex justify-between'>
               <div className='z-20'>
                  <TasksFeature />
               </div>
               <div>
                  <UserAuthFeature />
               </div>
            </div>
            <div></div>
            <div className='flex w-full flex-col items-center justify-center gap-2'>
               <ClockFeature />
               <ChatGptFeature />
            </div>
            <div></div>
            <div></div>
         </div>
      </main>
   );
}
