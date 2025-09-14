import { useTasks } from "../../context/tasksContext";
import { Button, ButtonLink, Card } from "../ui";
import dayjs from "dayjs";

export function TaskCard({ task }) {
  const { deleteTask } = useTasks();

  const formatDate = (date) => {
    if (!date) return null;
    try {
      return dayjs(date).format("dddd, MMMM D, YYYY");
    } catch (error) {
      console.error('Error formatting date:', error, 'date:', date);
      return 'Invalid Date';
    }
  };

  return (
    <Card>
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <div className="flex gap-x-2 items-center">
          <Button onClick={() => deleteTask(task._id)}>Delete</Button>
          <ButtonLink to={`/tasks/${task._id}`}>Edit</ButtonLink>
        </div>
      </header>
      <p className="text-slate-300">{task.description}</p>
      <p>{formatDate(task.date)}</p>
    </Card>
  );
}