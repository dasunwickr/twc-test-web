import React, { useState } from "react";
import TextField from "../../components/TextField";
import Button from "../../components/Button";
import Register from "./Register";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axiosInstance, { setApiAuthHeader } from "../../util/axiosInstance";
import { saveToken } from "../../util/tokenSerivces";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

const Login: React.FC = () => {
  const [showRegister, setShowRegister] = useState<boolean>(false);
  const navigate = useNavigate();

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

  const loginMutate = useMutation(
    (loginData: LoginFormData) => {
      return axiosInstance.post("/auth/login", loginData);
    },
    {
      onSuccess: (data) => {
        console.log("Login successful", data);

        const token = data.data.accessToken;

        if (token) {
          setApiAuthHeader(token);
          saveToken(token);
          navigate("/contacts");
        } else {
          console.error("No token found in response");
        }
      },
      onError: (error) => {
        console.error("Login failed", error);
      },
    }
  );

  const loginSubmit = (data: LoginFormData) => {
    loginMutate.mutate(data);
  };

  return (
    <div className="z-20">
      {!showRegister ? (
        <div className="mx-auto max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl flex-1 flex flex-col h-screen py-8 md:py-16 lg:py-24 xl:py-32 place-content-evenly">
          <div>
            <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl text-white">Hi there,</h1>
            <h2 className="font-semibold text-lg md:text-xl lg:text-2xl text-white w-56">
              Welcome to our contacts portal
            </h2>
          </div>
          <div>
            <form className="flex flex-col" onSubmit={handleSubmit(loginSubmit)}>
              <TextField
                placeholder="Email"
                isPassword={false}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-white py-1">{errors.email.message}</p>
              )}

              <TextField
                placeholder="Password"
                isPassword={true}
                {...register("password")}
              />
              {errors.password && (
                <p className="text-white">{errors.password.message}</p>
              )}

              <div className="btn-wrapper flex flex-row mt-16">
                <Button >
                  {loginMutate.isLoading ? "Logging in..." : "Login"}
                </Button>
                <div className="flex flex-row items-center mt-4">
                  <p className="ml-2 md:ml-3 text-sm md:text-base lg:text-lg text-white">
                    <span className="mx-1 md:mx-2">or</span>
                    <a className="underline ml-1 cursor-pointer" onClick={switchToRegister}>
                      Click here to Register
                    </a>
                  </p>
                </div>
              </div>

            </form>

          </div>
        </div>
      ) : (
        <Register switchToLogin={switchToLogin} />
      )}
    </div>
  );
};

export default Login;
