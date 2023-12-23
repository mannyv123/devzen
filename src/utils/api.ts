export const fetchCache = "force-no-store";

import { NewUserData, User, UserTask } from "../types/types";

const API_URL = process.env.URL;

//Get background image
export const getUnsplashImage = async () => {
   try {
      const result = await fetch(`${API_URL}/api/image/`, {
         method: "GET",
         cache: "no-store",
         next: { revalidate: 0 },
      });

      if (!result.ok) {
         throw new Error("Failed to get image data.");
      }

      const data = await result.json();

      return JSON.stringify(data);
   } catch (err) {
      console.error(err);
   }
};

//Check if email is in use
export const checkEmail = async (email: string) => {
   try {
      const response = await fetch(`/api/user/${email}`, {
         method: "GET",
      });

      return (await response.json()) as { isEmailInUse: boolean };
   } catch (error) {
      throw new Error("Failed to check email.");
   }
};

//Create new user
export const createUser = async (newUser: NewUserData) => {
   if (!newUser) {
      throw new Error("No user data provided.");
   }
   try {
      const response = await fetch(`/api/user/`, {
         method: "POST",
         body: JSON.stringify(newUser),
         headers: {
            "Content-Type": "application/json",
         },
      });

      if (!response.ok) {
         throw new Error("Failed to create user.");
      }

      const result: User = await response.json();

      return result;
   } catch (err) {
      console.error(err);
   }
};

//Get all tasks
export const getTasks = async () => {
   try {
      const result = await fetch("/api/tasks", {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
         },
      });

      return await result.json();
   } catch (err) {
      console.error(err);
   }
};

//Create new task
export const createTask = async (taskData: { task: string }) => {
   if (!taskData) {
      throw new Error("No task content provided.");
   }
   try {
      const response = await fetch("/api/tasks", {
         method: "POST",
         body: JSON.stringify(taskData),
         headers: {
            "Content-Type": "application/json",
         },
      });

      if (!response.ok) {
         throw new Error("Failed to create task.");
      }

      const result = await response.json();

      return result as UserTask;
   } catch (err) {
      console.log(err);
   }
};

//Delete a task
export const deleteTask = async (taskId: string) => {
   if (!taskId) {
      throw new Error("No task ID provided.");
   }

   try {
      const response = await fetch(`/api/tasks/${taskId}`, {
         method: "DELETE",
      });

      if (!response.ok) {
         throw new Error("Failed to create task.");
      }

      const result = await response.json();

      return result as { taskId: UserTask["_id"] };
   } catch (err) {
      console.error(err);
   }
};

//Update task completion status
export const updateTaskStatus = async (taskId: string) => {
   if (!taskId) {
      throw new Error("No task ID provided.");
   }

   try {
      const response = await fetch(`/api/tasks/${taskId}`, {
         method: "PUT",
      });

      if (!response.ok) {
         throw new Error("Failed to update task.");
      }

      const result = await response.json();

      return result as UserTask;
   } catch (err) {
      console.error(err);
   }
};

//Update elapsed time of task
export const updateElapsedTime = async (taskId: string, elapsedTime: number) => {
   if (!taskId) {
      throw new Error("No task ID provided.");
   }

   try {
      await fetch(`/api/tasks/${taskId}/timer`, {
         method: "PUT",
         body: JSON.stringify({
            elapsedTime: elapsedTime,
         }),
      });
   } catch (err) {
      console.error(err);
   }
};
