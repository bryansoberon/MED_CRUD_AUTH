import { Link } from "react-router-dom"; 
import { useAuth } from "../context/authContext";
import { ButtonLink } from "./ui/ButtonLink";

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-md my-4 flex justify-between items-center py-4 px-8 rounded-xl">
      {/* Logo / título */}
      <h1 className="text-3xl font-extrabold tracking-wide text-white drop-shadow-md hover:scale-105 transition-transform">
        <Link to={isAuthenticated ? "/tasks" : "/"}>Mis Tareas</Link>
      </h1>

      {/* Opciones */}
      <ul className="flex items-center gap-x-4 text-white font-medium">
        {isAuthenticated ? (
          <>
            <li className="hidden md:block text-sm opacity-90">
              Hola, <span className="font-semibold">{user.username}</span>
            </li>
            <li>
              <ButtonLink to="/add-task" className="!bg-white !text-indigo-600 hover:!bg-gray-100">
                + Nueva Tarea
              </ButtonLink>
            </li>
            <li>
              <ButtonLink to="/profile">Perfil</ButtonLink>
            </li>
            <li>
              <button
                onClick={logout}
                className="bg-transparent border border-white px-3 py-1 rounded-lg hover:bg-white hover:text-pink-600 transition-colors"
              >
                Cerrar Sesión
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <ButtonLink to="/login">Iniciar Sesión</ButtonLink>
            </li>
            <li>
              <ButtonLink to="/register" className="!bg-white !text-indigo-600 hover:!bg-gray-100">
                Registrarse
              </ButtonLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
