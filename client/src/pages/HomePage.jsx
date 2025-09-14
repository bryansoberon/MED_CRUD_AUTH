import { Link } from "react-router-dom";

function HomePage() {
  return (
  <section className="bg-red-500 flex justify-center items-center">
    <header className="bg-zinc-800 p-10">
      <h1 className="text-5xl py-2 font-bold">Bienvenido</h1>
      <p className="text-md text-slate-400">
        Aqui podras organizar tus tareas de forma sencilla y eficiente con React, todo lo que siempre quisiste y necesitabas, lo tienes de manera inmediata
        con nostros, tenga usted una grandiosa bienvenida, por favor registrate o inicia sesion, posteriormente presione el boton de abajo para ver tus tareas actuales a completar, EXITOS.
      </p>

      <Link
        className="bg-zinc-500 text-white px-4 py-2 rounded-md mt-4 inline-block"
        to="/tasks"
      >
        Ver mis tareas
      </Link>
    </header>
  </section>
  );
}

export default HomePage;