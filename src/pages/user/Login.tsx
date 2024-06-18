// Login.tsx
import React, { useState } from "react";
import AuthLayout from "../../layout/AuthLayout";
import TextField from "../../components/TextField";
import Button from "../../components/Button";
import Register from "./Register";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axiosInstance from "../../services/axiosInstance";
import { useMutation } from "react-query";

const Login: React.FC = () => {
  const [showRegister, setShowRegister] = useState<boolean>(false);

  type LoginFormData = {
    email: string;
    password: string;
  };

  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(20),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const switchToRegister = () => {
    setShowRegister(true);
  };

  const switchToLogin = () => {
    setShowRegister(false);
  };

  const loginMutation = useMutation(
    (loginData: LoginFormData) => {
      return axiosInstance.post("/auth/login", loginData);
    },
    {
      onSuccess: (data) => {
        console.log("Login successful", data);
      },
      onError: (error) => {
        console.error("Login failed", error);
      },
    }
  );

  const loginSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <div>
      {!showRegister ? (
        <AuthLayout>
          <div className="mx-32 flex-1 flex flex-col h-screen py-32 place-content-evenly">
            <div>
              <h1 className="font-bold text-5xl text-white">Hi there,</h1>
              <h2 className="font-semibold text-3xl text-white w-56">
                Welcome to our contacts portal
              </h2>
            </div>
            <div>
              <form
                className="flex flex-col"
                onSubmit={handleSubmit(loginSubmit)}
              >
                <TextField
                  placeholder="Email"
                  isPassword={false}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}

                <TextField
                  placeholder="Password"
                  isPassword={true}
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}

                <Button>
                  {loginMutation.isLoading ? "Logging in..." : "Login"}
                </Button>
                {loginMutation.isError && (
                  <p className="text-red-500">
                    Login failed. Please try again.
                  </p>
                )}
              </form>
            </div>
            <div className="flex flex-row items-center">
              <p className="ml-5 text-xl text-white flex flex-row">
                <span className="mx-5">or</span>
                <button className="underline" onClick={switchToRegister}>
                  Click here to Register
                </button>
              </p>
            </div>
          </div>
        </AuthLayout>
      ) : (
        <Register switchToLogin={switchToLogin} />
      )}
    </div>
  );
};

export default Login;
