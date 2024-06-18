import React, { useEffect } from "react";
import Button from "../components/Button";
import TextField from "../components/TextField";
import HomeLayout from "../layout/HomeLayout";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "react-query";
import axiosInstance from "../util/axiosInstance";
import { getToken } from "../util/tokenSerivces";
import { useNavigate } from "react-router-dom";

interface NewContactsProps {
  firstTime: boolean;
  setIsFirstTime: (value: boolean) => void;
}

const NewContacts: React.FC<NewContactsProps> = ({
  firstTime,
  setIsFirstTime,
}) => {
  type NewContactsFormData = {
    name: string;
    email: string;
    phone_number: string;
    gender: "MALE" | "FEMALE";
  };

  const newContactsSchema = z.object({
    name: z.string().min(1, "Name must be at least 1 character"),
    email: z.string().email("Invalid email format"),
    phone_number: z
      .string()
      .min(10, "Phone number must be at least 10 characters"),
    gender: z.enum(["MALE", "FEMALE"]),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Reset form after submission
  } = useForm<NewContactsFormData>({
    resolver: zodResolver(newContactsSchema),
  });

  const buttonText = firstTime ? "add your first contact" : "add contact";

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const createContactMutation = useMutation(
    async (data: NewContactsFormData) => {
      const token = getToken();
      console.log("Data to send:", data);
      try {
        const response = await axiosInstance.post("/contact", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Server response:", response.data);
        return response.data;
      } catch (error: any) {
        console.error(
          "Error creating contact:",
          error.response?.data || error.message
        );
        throw new Error(error.response?.data || error.message);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("contacts");
        navigate("/contacts");
        setIsFirstTime(false);
      },
      onError: (error: any) => {
        console.error("Error creating contact:", error.message);
      },
    }
  );

  const onSubmit = (data: NewContactsFormData) => {
    console.log("Form submitted with data:", data);
    createContactMutation.mutate(data);
  };

  useEffect(() => {
    if (createContactMutation.isSuccess) {
      reset();
    }
  }, [createContactMutation.isSuccess, reset]);

  return (
    <div className="">
      <HomeLayout>
        <div className="flex flex-col">
          <h1 className="text-6xl font-normal italic text-white">
            New Contact
          </h1>
          <div className="flex-grow">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="my-12 grid grid-cols-2 gap-y-6 gap-x-4"
            >
              <TextField
                isPassword={false}
                {...register("name")}
                placeholder="Full Name"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}

              <TextField
                isPassword={false}
                placeholder="E-mail"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}

              <TextField
                isPassword={false}
                placeholder="Phone Number"
                {...register("phone_number")}
              />
              {errors.phone_number && (
                <p className="text-red-500">{errors.phone_number.message}</p>
              )}

              <div className="flex flex-row items-center space-x-4 text-xl">
                <p className="mr-4 text-white">Gender</p>
                <label
                  htmlFor="male"
                  className="flex items-center space-x-2 text-white"
                >
                  <input
                    type="radio"
                    value="MALE"
                    {...register("gender")}
                    className="bg-primary border-white"
                  />
                  <span>Male</span>
                </label>
                <label
                  htmlFor="female"
                  className="flex items-center space-x-2 text-white"
                >
                  <input
                    type="radio"
                    value="FEMALE"
                    {...register("gender")}
                    className="bg-primary border-white"
                  />
                  <span>Female</span>
                </label>
              </div>
              {errors.gender && (
                <p className="text-red-500">{errors.gender.message}</p>
              )}

              <Button>{buttonText}</Button>
            </form>
          </div>
        </div>
      </HomeLayout>
    </div>
  );
};

export default NewContacts;
