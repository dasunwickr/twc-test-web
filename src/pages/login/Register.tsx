import React from "react";
import Button from "../../components/Button";
import TextField from "../../components/TextField";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "react-query";
import axiosInstance from "../../util/axiosInstance";
import { RegisterFormData, RegisterProps } from "../../types";

const Register: React.FC<RegisterProps> = ({ switchToLogin }) => {
  const registerSchema = z
    .object({
      email: z.string().email(),
      createPassword: z.string().min(8).max(20),
      confirmPassword: z.string().min(8).max(20),
    })
    .refine((data) => data.createPassword === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const registerMutate = useMutation(
    async (data: RegisterFormData) => {
      const response = await axiosInstance.post("/auth/signup", {
        email: data.email,
        password: data.createPassword,
      });
      return response.data;
    },
    {
      onSuccess: (data) => {
        console.log("Registration successful:", data);
        switchToLogin();
      },
      onError: (error: any) => {
        console.error("Registration failed:", error);
      },
    }
  );

  const handleRegister = (data: RegisterFormData) => {
    registerMutate.mutate(data);
  };

  return (
    <div className="mx-32 flex-1 flex flex-col h-screen py-32 place-content-evenly">
      <div>
        <h1 className="font-bold text-5xl text-white">Register Now!</h1>
      </div>
      <div>
        <form className="" onSubmit={handleSubmit(handleRegister)}>

          <div className="flex flex-col"><TextField
            placeholder="e-mail"
            isPassword={false}
            {...register("email")}
          />
            {errors.email && (
              <p className="text-white bg-red-500 p-2 rounded">
                {errors.email.message}
              </p>
            )}

            <TextField
              placeholder="create password"
              isPassword={true}
              {...register("createPassword")}
            />
            {errors.createPassword && (
              <p className="text-white bg-red-500 p-2 rounded">
                {errors.createPassword.message}
              </p>
            )}

            <TextField
              placeholder="confirm password"
              isPassword={true}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-white bg-red-500 p-2 rounded">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button>Register</Button>
        </form>
      </div>
      <div className="mt-4">
        <p className="text-xl text-white place-content-end">
          <a className="underline cursor-pointer" onClick={switchToLogin}>
            &lt; Back to Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
