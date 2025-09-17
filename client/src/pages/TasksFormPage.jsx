import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Button, Card, Input, Label } from "../components/ui";
import { useTasks } from "../context/tasksContext";
import { Textarea } from "../components/ui/Textarea";
import { useForm } from "react-hook-form";

dayjs.extend(utc);

export function TaskFormPage() {
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const taskData = {
        ...data,
        date: data.date ? dayjs(data.date).format("YYYY-MM-DD") : undefined,
      };

      if (params.id) {
        updateTask(params.id, taskData);
      } else {
        createTask(taskData);
      }

      navigate("/tasks");
    } catch (error) {
      console.log(error);
      window.location.href = "/";
    }
  };

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const task = await getTask(params.id);
        setValue("title", task.title);
        setValue("description", task.description);
        setValue("date", task.date ? dayjs(task.date).format("YYYY-MM-DD") : "");
        setValue("completed", task.completed);
      }
    };
    loadTask();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 px-4">
      <Card>
        <h1 className="text-3xl font-extrabold text-center text-white-800 mb-6">
          {params.id ? "Editar tarea" : "Nueva tarea"}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Title */}
          <div>
            <Label htmlFor="title">Título</Label>
            <Input
              type="text"
              placeholder="Escribe el título"
              {...register("title")}
              autoFocus
              className="mt-1"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">Por favor ingresa un título.</p>
            )}
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              rows="3"
              placeholder="Detalles de la tarea..."
              {...register("description")}
              className="mt-1"
            />
          </div>

          {/* Date */}
          <div>
            <Label htmlFor="date">Fecha límite</Label>
            <Input
              type="date"
              {...register("date")}
              className="mt-1"
            />
          </div>

          {/* Submit */}
          <Button className="w-full bg-indigo-600 hover:bg-indigo-700 transition">
            Guardar
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default TaskFormPage;
