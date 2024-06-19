import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import HomeLayout from "../layout/HomeLayout";
import Button from "../components/Button";
import TextField from "../components/TextField";
import axiosInstance from "../util/axiosInstance";
import { getToken } from "../util/tokenSerivces";
import { NewContactsFormData } from "../types";
import useContactStore from "../store/contact-store";

interface NewContactsProps {
  firstTime: boolean;
  setIsFirstTime: (value: boolean) => void;
}

const NewContacts: React.FC<NewContactsProps> = ({
  firstTime,
  setIsFirstTime,
}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { addToContacts } = useContactStore();

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
    reset,
  } = useForm<NewContactsFormData>({
    resolver: zodResolver(newContactsSchema),
  });

  const createContactMutation = useMutation(
    async (data: NewContactsFormData) => {
      const token = getToken();
      const response = await axiosInstance.post("/contact", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    {
      onSuccess: (data) => {
        addToContacts(data);
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
                <p className="text-white">{errors.name.message}</p>
              )}

              <TextField
                isPassword={false}
                placeholder="E-mail"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-white">{errors.email.message}</p>
              )}

              <TextField
                isPassword={false}
                placeholder="Phone Number"
                {...register("phone_number")}
              />
              {errors.phone_number && (
                <p className="text-white">{errors.phone_number.message}</p>
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
                <p className="text-white">{errors.gender.message}</p>
              )}

              <Button>
                {firstTime ? "add your first contact" : "add contact"}
              </Button>
            </form>
          </div>
        </div>
      </HomeLayout>
    </div>
  );
};

export default NewContacts;
