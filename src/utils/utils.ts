//Helper function to format time in HH:MM:SS
export const formatTime = (timeInSeconds: number) => {
   const hours = Math.floor(timeInSeconds / 3600);
   const minutes = Math.floor((timeInSeconds % 3600) / 60);
   const seconds = timeInSeconds % 60;

   let formattedTime = "";
   let secondsLetter = true;

   if (hours > 0) {
      formattedTime += `${hours.toString().padStart(2, "0")}:`;
      secondsLetter = false;
   }

   if (minutes > 0 || hours > 0) {
      formattedTime += `${minutes.toString().padStart(2, "0")}:`;
      secondsLetter = false;
   }

   formattedTime += `${seconds.toString().padStart(2, "0")}${secondsLetter ? "s" : ""}`;

   return formattedTime;
};
