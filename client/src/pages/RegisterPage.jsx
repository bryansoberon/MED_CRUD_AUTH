import { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { Card, Message, Button, Input, Label } from "../components/ui";
import { useForm } from "react-hook-form";
import { registerSchema } from "../schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";

function Register() {
  const { signup, errors: registerErrors, isAuthenticated } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (value) => {
    await signup(value);
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 px-4">
    <Card >
        
        {/* Errores */}
        {registerErrors.map((error, i) => (
          <Message message={error} key={i} />
        ))}

        <h1 className="text-3xl font-extrabold text-center text-white-800 mb-6">
          Crear cuenta
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Username */}
          <div>
            <Label htmlFor="username">Nombre de usuario:</Label>
            <Input
              type="text"
              placeholder="Escribe tu nombre"
              {...register("username")}
              autoFocus
              className="mt-1"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">Correo:</Label>
            <Input
              type="email"
              placeholder="Escribe tu correo"
              {...register("email")}
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
              {...register("Escribe tu contraseña")}
              className="mt-1"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <Label htmlFor="confirmPassword">Confirmar contraseña:</Label>
            <Input
              type="password"
              placeholder="••••••••"
              {...register("confirmPassword")}
              className="mt-1"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <Button className="w-full bg-indigo-600 hover:bg-indigo-700 transition">
            Registrarse
          </Button>
        </form>

        {/* Login link */}
        <p className="text-center text-white-600 mt-6">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="text-indigo-600 font-semibold hover:underline">
            Inicia sesión
          </Link>
        </p>
      </Card>
    </div>
  );
}

export default Register;
