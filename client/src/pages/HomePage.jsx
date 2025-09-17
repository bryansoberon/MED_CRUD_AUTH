import { Link } from "react-router-dom";

function HomePage() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white px-6">
      <header className="bg-black/40 backdrop-blur-md p-12 rounded-2xl shadow-lg max-w-3xl text-center">
        <h1 className="text-6xl font-extrabold mb-4 tracking-tight drop-shadow-lg">
          Bienvenido
        </h1>
        <p className="text-lg text-gray-200 leading-relaxed mb-8">
          Organiza tus tareas de forma sencilla y eficiente con React.  
          Todo lo que siempre quisiste para mantenerte al día está aquí: rápido, 
          práctico y al alcance de tu mano.  
          <br />  
          Regístrate o inicia sesión y comienza a gestionar tus pendientes con éxito.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition"
            to="/tasks"
          >
            Ver mis tareas
          </Link>
        </div>
      </header>
    </section>
  );
}

export default HomePage;
