import { createContext, useContext, useState} from "react";
import { createTaskRequest, getTasksRequest, deleteTaskRequest } from "../api/tasks";
const TaskContext = createContext();


export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTasks must be used within a TaskProvider');
    }
    return context;
}


export function TaskProvider({children}) {

    const [tasks, setTasks] = useState([]);
    const getTasks = async () => {
        try {
            const res = await getTasksRequest();
            setTasks(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const createTask = async (tasks) => {
        const res = await createTaskRequest(tasks);
        console.log(res);
    };
    
    const deleteTask = async (id) => {
        try {
            const res = await deleteTaskRequest(id);
            if (res.status === 204) {
                setTasks(tasks.filter((task) => task._id !== id));
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <TaskContext.Provider 
        value={{
            tasks,
            createTask,
            deleteTask,
            getTasks
        }}>
            {children}
        </TaskContext.Provider>
    )
}