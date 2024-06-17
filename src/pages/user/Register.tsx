import React from "react";
import Button from "../../components/Button";
import TextField from "../../components/TextField";
import AuthLayout from "../../layout/AuthLayout";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "react-query";
import axiosInstance from "../../services/axiosInstance";

interface RegisterProps {
  switchToLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ switchToLogin }) => {
  type RegisterFormData = {
    email: string;
    createPassword: string;
    confirmPassword: string;
  };

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

  const mutation = useMutation(
    async (data: RegisterFormData) => {
      const response = await axiosInstance.post("/", {
        email: data.email,
        password: data.createPassword,
      });
      return response.data;
    },
    {
      onSuccess: (data) => {
        console.log("Registration successful:", data);
      },
      onError: (error: any) => {
        console.error("Registration failed:", error);
      },
    }
  );

  const handleRegister = (data: RegisterFormData) => {
    mutation.mutate(data);
  };

  return (
    <AuthLayout>
      <div className="mx-32 flex-1 flex flex-col h-screen py-32 place-content-evenly">
        <div>
          <h1 className="font-bold text-5xl text-white">Register Now!</h1>
        </div>
        <div className="">
          <form
            className="flex flex-col"
            onSubmit={handleSubmit(handleRegister)}
          >
            <TextField
              placeholder="e-mail"
              isPassword={false}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
            <TextField
              placeholder="create password"
              isPassword={true}
              {...register("createPassword")}
            />
            {errors.createPassword && (
              <p className="text-red-500">{errors.createPassword.message}</p>
            )}
            <TextField
              placeholder="confirm password"
              isPassword={true}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword.message}</p>
            )}
            <Button>Register</Button>
          </form>
        </div>
        <p className="text-xl text-white place-content-end">
          <a className="underline cursor-pointer" onClick={switchToLogin}>
            &lt; Back to Login
          </a>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Register;
