import { createContext, useContext, useState} from "react";
import { CreateTaskRequest } from "../api/tasks";
const TaskContext = createContext();

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
}


export function TaskProvider({children}) {

    const [task, setTask] = useState([]);

    const createTask = async (tasks) => {
        const res = await CreateTaskRequest(tasks);
        console.log(res);
    };

    return (
        <TaskContext.Provider 
        value={{
            task,
            createTask
        }}>
            {children}
        </TaskContext.Provider>
    )
}