import { useAuth } from "../context/authContext";
import { useTasks } from "../context/tasksContext";
import { useEffect, useState } from "react";
import { Card, Button } from "../components/ui";
import { ButtonLink } from "../components/ui/ButtonLink";
import dayjs from "dayjs";

function ProfilePage() {
  const { user, logout } = useAuth();
  const { tasks, getTasks } = useTasks();
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    recentTasks: [],
  });

  useEffect(() => {
    if (user) {
      getTasks();
    }
  }, [user, getTasks]);

  useEffect(() => {
    if (tasks.length > 0) {
      const completed = tasks.filter((task) => task.completed).length;
      const pending = tasks.filter((task) => !task.completed).length;
      const recent = tasks
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

      setStats({
        totalTasks: tasks.length,
        completedTasks: completed,
        pendingTasks: pending,
        recentTasks: recent,
      });
    }
  }, [tasks]);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header del perfil */}
        <Card >
          <div className="text-center py-10 px-6">
            <div className="w-28 h-28 bg-indigo-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
              <span className="text-4xl font-bold text-white">
                {user?.username?.charAt(0).toUpperCase()}
              </span>
            </div>
            <h1 className="text-4xl font-extrabold mb-2 text-white-800">
              ¡Hola, {user?.username}!
            </h1>
            <p className="text-600 mb-6">
              Miembro desde {dayjs(user?.createdAt).format("MMMM YYYY")}
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <ButtonLink to="/add-task" className="bg-indigo-600 hover:bg-indigo-700">
                Crear Nueva Tarea
              </ButtonLink>
              <ButtonLink to="/tasks" className="bg-pink-500 hover:bg-pink-600">
                Ver Mis Tareas
              </ButtonLink>
            </div>
          </div>
        </Card>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/90 backdrop-blur-md rounded-2xl shadow">
            <div className="text-center py-6">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                {stats.totalTasks}
              </div>
              <div>Total de Tareas</div>
            </div>
          </Card>

          <Card className="bg-white/90 backdrop-blur-md rounded-2xl shadow">
            <div className="text-center py-6">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {stats.completedTasks}
              </div>
              <div >Completadas</div>
            </div>
          </Card>

          <Card className="bg-white/90 backdrop-blur-md rounded-2xl shadow">
            <div className="text-center py-6">
              <div className="text-4xl font-bold text-orange-600 mb-2">
                {stats.pendingTasks}
              </div>
              <div>Pendientes</div>
            </div>
          </Card>
        </div>

        {/* Tareas recientes */}
        {stats.recentTasks.length > 0 && (
          <Card className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Tareas Recientes
              </h2>
              <div className="space-y-3">
                {stats.recentTasks.map((task) => (
                  <div
                    key={task._id}
                    className="flex justify-between items-center p-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl shadow"
                  >
                    <div>
                      <h3 className="font-semibold">{task.title}</h3>
                      <p className="text-sm opacity-80">
                        Creada el {dayjs(task.createdAt).format("DD/MM/YYYY")}
                      </p>
                    </div>
                    <div>
                      <ButtonLink
                        to={`/tasks/${task._id}`}
                        className="text-sm bg-white text-indigo-600 hover:bg-gray-100"
                      >
                        Editar
                      </ButtonLink>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <ButtonLink to="/tasks" className="bg-indigo-600 hover:bg-indigo-700">
                  Ver Todas las Tareas
                </ButtonLink>
              </div>
            </div>
          </Card>
        )}

        {/* Configuración */}
        <Card className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">
              Configuración de Cuenta
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-400 rounded-xl">
                <h3 className="p-2 rounded-lg font-semibold text-black">Información de Usuario</h3>
                <p className="text-sm text-black">
                  Usuario: {user?.username}
                </p>
                <p className="text-sm text-black">
                  Email: {user?.email || "No disponible"}
                </p>
              </div>

              <div className="p-4 bg-red-500 text-white rounded-xl flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Cerrar Sesión</h3>
                  <p className="text-black text-sm opacity-80">
                    Salir de tu cuenta de forma segura
                  </p>
                </div>
                <Button
                  onClick={handleLogout}
                  className="bg-white text-red-600 hover:bg-gray-100"
                >
                  Cerrar Sesión
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default ProfilePage;
