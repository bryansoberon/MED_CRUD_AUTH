import { useTasks } from "../context/TasksContext";
function TaskCard({ task }) {

    const {deleteTask} = useTasks();

    return (
       <div className="bg-zinc-800 w-80 p-6 rounded-md shadow-md">
        <header className="flex justify-between">
            <h1 className="text-xl font-bold">{task.title}</h1>
            <div className="flex gap-x-2 items-center">
            <button className="text-red-400 mr-2" 
                onClick={() => {
                deleteTask(task._id);
            }}>delete</button>
            <button className="text-blue-400">edit</button>
            </div>
        </header>
        <p className="text-zinc-400">{task.description}</p>
        <p>{new Date(task.date).toLocaleDateString()}</p>
        </div>

    );
}

export default TaskCard;