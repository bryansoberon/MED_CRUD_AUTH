import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Message, Button, Input, Label } from "../components/ui";
import { loginSchema } from "../schemas/auth";

export function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { signin, errors: loginErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (data) => signin(data);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 px-4">
      <Card >
        {/* Errores de login */}
        {loginErrors.map((error, i) => (
          <Message message={error} key={i} />
        ))}

        <h1 className="text-3xl font-extrabold text-center text-white drop-shadow-lg mb-6">
          Bienvenido de nuevo
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <Label htmlFor="email">Correo:</Label>
            <Input
              type="email"
              placeholder="Escribe tu correo"
              {...register("email", { required: true })}
              className="mt-1"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password">Contraseña:</Label>
            <Input
              type="password"
              placeholder="••••••••"
              {...register("password", { required: true, minLength: 6 })}
              className="mt-1"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Botón */}
          <Button className="w-full bg-indigo-600 hover:bg-indigo-700 transition">
            Iniciar Sesión
          </Button>
        </form>

        {/* Registro */}
        <p className="text-center text-white-600 mt-6">
          ¿No tienes una cuenta?{" "}
          <Link to="/register" className="text-indigo-600 font-semibold hover:underline">
            Regístrate
          </Link>
        </p>
      </Card>
    </div>
  );
}
