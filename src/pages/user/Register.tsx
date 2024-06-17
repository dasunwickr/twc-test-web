import React from "react";
import Button from "../../components/Button";
import TextField from "../../components/TextField";
import AuthLayout from "../../layout/AuthLayout";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
      message: "Passwords does not match",
    });

  const { register, handleSubmit } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const handleRegister = () => {
    console.log("Register button clicked");
  };

  return (
    <AuthLayout>
      <div className="mx-32 flex-1 flex flex-col h-screen py-32 place-content-evenly">
        <div>
          <h1 className="font-bold text-5xl text-white">Register Now!</h1>
        </div>
        <div className="">
          <form className="flex flex-col">
            <TextField
              placeholder="e-mail"
              isPassword={false}
              {...register("email")}
            />
            <TextField
              placeholder="create password"
              isPassword={true}
              {...register("createPassword")}
            />
            <TextField
              placeholder="confirm password"
              isPassword={true}
              {...register("confirmPassword")}
            />
          </form>
        </div>
        <div className="flex flex-col ">
          <Button onClick={handleSubmit(handleRegister)}>Register</Button>
        </div>
        <p className="text-xl text-white place-content-end">
          <a className="underline" onClick={switchToLogin}>
            &lt; Back to Login
          </a>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Register;
