const API_URL = process.env.URL;

//Get background image
export const getImage = async () => {
    try {
        //Relative API urls only working using client component in nextjs; however using server side component which requires absolute url
        const result = await fetch(`${API_URL}/api/image/`, {
            method: "GET",
        });

        return await result.json();
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
export const createTask = async (taskData: string) => {
    if (!taskData) {
        throw new Error("No task content provided.");
    }
    try {
        const result = await fetch("/api/tasks", {
            method: "POST",
            body: JSON.stringify({
                taskData,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        return result;
    } catch (err) {
        console.error(err);
    }
};

//Delete a task
export const deleteTask = async (taskId: string) => {
    if (!taskId) {
        throw new Error("No task ID provided.");
    }

    try {
        await fetch(`/api/tasks/${taskId}`, {
            method: "DELETE",
        });
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
        await fetch(`/api/tasks/${taskId}`, {
            method: "PUT",
        });
    } catch (err) {
        console.error(err);
    }
};
