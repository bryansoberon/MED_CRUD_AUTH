import { useEffect } from "react";
import { useTasks } from "../context/tasksContext";
import { TaskCard } from "../components/tasks/TaskCard";
import { ImFileEmpty } from "react-icons/im";

export function TasksPage() {
  const { tasks, getTasks } = useTasks();

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 p-6">
      {tasks.length === 0 ? (
        <div className="flex justify-center items-center h-[70vh]">
          <div className="text-center bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-xl">
            <ImFileEmpty className="text-6xl text-gray-400 mx-auto mb-4" />
            <h1 className="font-bold text-2xl text-gray-700">
              Aún no tienes tareas
            </h1>
            <p className="text-gray-500 mt-2">
              Crea una nueva para empezar a organizarte.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <TaskCard task={task} key={task._id} />
          ))}
        </div>
      )}
    </div>
  );
}
