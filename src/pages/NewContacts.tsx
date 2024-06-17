import React from "react";
import Button from "../components/Button";
import TextField from "../components/TextField";
import HomeLayout from "../layout/HomeLayout";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface NewContactsProps {
  firstTime: boolean;
}

const NewContacts: React.FC<NewContactsProps> = ({ firstTime }) => {
  type NewContactsFormData = {
    name: string;
    email: string;
    phone: string;
    gender: string;
  };

  const newContactsSchema = z.object({
    name: z.string().nonempty("Name is required"),
    email: z.string().email("Invalid email format"),
    phone: z.string().min(10, "Phone number must be at least 10 characters"),
    gender: z.enum(["male", "female"]),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewContactsFormData>({
    resolver: zodResolver(newContactsSchema),
  });

  const buttonText = firstTime ? "add your first contact" : "add contact";

  const onSubmit = (data: NewContactsFormData) => {
    console.log(data);
  };

  return (
    <div className="">
      <HomeLayout>
        <div className="flex flex-col">
          <h1 className="text-6xl font-normal italic text-white flex-1">
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
                placeholder="full name"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}

              <TextField
                isPassword={false}
                placeholder="e-mail"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}

              <TextField
                isPassword={false}
                placeholder="phone number"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-red-500">{errors.phone.message}</p>
              )}

              <div className="flex flex-row items-center space-x-4 text-xl">
                <p className="mr-4 text-white">gender</p>
                <label
                  htmlFor="male"
                  className="flex items-center space-x-2 text-white"
                >
                  <input
                    type="radio"
                    id="male"
                    value="male"
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
                    id="female"
                    value="female"
                    {...register("gender")}
                    className="border-white"
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
