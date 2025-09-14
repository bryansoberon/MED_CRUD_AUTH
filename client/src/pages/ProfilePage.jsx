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
    recentTasks: []
  });

  useEffect(() => {
    if (user) {
      getTasks();
    }
  }, [user, getTasks]);

  useEffect(() => {
    if (tasks.length > 0) {
      const completed = tasks.filter(task => task.completed).length;
      const pending = tasks.filter(task => !task.completed).length;
      const recent = tasks
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

      setStats({
        totalTasks: tasks.length,
        completedTasks: completed,
        pendingTasks: pending,
        recentTasks: recent
      });
    }
  }, [tasks]);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header del perfil */}
      <Card>
        <div className="text-center py-8">
          <div className="w-24 h-24 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-3xl font-bold text-white">
              {user?.username?.charAt(0).toUpperCase()}
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-2">¡Hola, {user?.username}!</h1>
          <p className="text-gray-600 mb-4">
            Miembro desde {dayjs(user?.createdAt).format("MMMM YYYY")}
          </p>
          <div className="flex gap-4 justify-center">
            <ButtonLink to="/add-task">Crear Nueva Tarea</ButtonLink>
            <ButtonLink to="/tasks">Ver Mis Tareas</ButtonLink>
          </div>
        </div>
      </Card>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="text-center py-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {stats.totalTasks}
            </div>
            <div className="text-gray-600">Total de Tareas</div>
          </div>
        </Card>
        
        <Card>
          <div className="text-center py-6">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {stats.completedTasks}
            </div>
            <div className="text-gray-600">Completadas</div>
          </div>
        </Card>
        
        <Card>
          <div className="text-center py-6">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {stats.pendingTasks}
            </div>
            <div className="text-gray-600">Pendientes</div>
          </div>
        </Card>
      </div>

      {/* Tareas recientes */}
      {stats.recentTasks.length > 0 && (
        <Card>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Tareas Recientes</h2>
            <div className="space-y-3">
              {stats.recentTasks.map((task) => (
                <div key={task._id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold">{task.title}</h3>
                    <p className="text-sm text-gray-600">
                      Creada el {dayjs(task.createdAt).format("DD/MM/YYYY")}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <ButtonLink to={`/tasks/${task._id}`} className="text-sm">
                      Editar
                    </ButtonLink>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <ButtonLink to="/tasks">Ver Todas las Tareas</ButtonLink>
            </div>
          </div>
        </Card>
      )}

      {/* Acciones de cuenta */}
      <Card>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Configuración de Cuenta</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-semibold">Información de Usuario</h3>
                <p className="text-sm text-gray-600">
                  Usuario: {user?.username}
                </p>
                <p className="text-sm text-gray-600">
                  Email: {user?.email || "No disponible"}
                </p>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-semibold">Cerrar Sesión</h3>
                <p className="text-sm text-gray-600">
                  Salir de tu cuenta de forma segura
                </p>
              </div>
              <Button 
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700"
              >
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ProfilePage;