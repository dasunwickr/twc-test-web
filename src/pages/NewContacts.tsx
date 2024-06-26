import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import TextField from "../components/TextField";
import axiosInstance from "../util/axiosInstance";
import { NewContactsFormData, NewContactsProps } from "../types";
import useContactStore from "../store/contactStore";
import SaveModal from "../components/modals/SaveModal";

const NewContacts: React.FC<NewContactsProps> = ({
  firstTime,
  setIsFirstTime,
}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { addToContacts } = useContactStore();
  const [showModal, setShowModal] = useState(false);

  const newContactsSchema = z.object({
    name: z.string().min(1, "Name must be at least 1 character"),
    email: z.string().email("Invalid email format"),
    phoneNumber: z
      .string()
      .min(10, "Phone number must be at least 10 characters"),
    gender: z.enum(["Male", "Female"]),
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
      const response = await axiosInstance.post("/contact", data);
      return response.data;
    },
    {
      onSuccess: (data) => {
        addToContacts(data);
        queryClient.invalidateQueries("contacts");
        setIsFirstTime(false);
        setShowModal(true);
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

  const closeModal = () => {
    setShowModal(false);
    navigate("/contacts");
  };

  return (
    <div className="">
      <div className="flex flex-col">
        <h1 className="text-6xl font-normal italic text-white">
          New Contact
        </h1>
        <div className="flex-grow">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="my-12 grid grid-cols-2 gap-y-6 gap-x-4"
          >
            <div className="flex flex-col">
              <TextField
                isPassword={false}
                {...register("name")}
                placeholder="Full Name"
              />
              {errors.name && (
                <p className="text-white">{errors.name.message}</p>
              )}
            </div>

            <div className="flex flex-col">
              <TextField
                isPassword={false}
                placeholder="E-mail"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-white">{errors.email.message}</p>
              )}
            </div>

            <div className="flex flex-col">
              <TextField
                isPassword={false}
                placeholder="Phone Number"
                {...register("phoneNumber")}
              />
              {errors.phoneNumber && (
                <p className="text-white">{errors.phoneNumber.message}</p>
              )}
            </div>

            <div className="flex items-center text-xl text-white mb-4">
              <p className="mr-4">Gender:</p>
              <label htmlFor="male" className="inline-flex items-center mr-6">
                <input
                  type="radio"
                  value="Male"
                  {...register("gender")}
                  className="bg-primary border-white mr-2 mt-1"
                />
                <span>Male</span>
              </label>
              <label htmlFor="female" className="inline-flex items-center">
                <input
                  type="radio"
                  value="Female"
                  {...register("gender")}
                  className="bg-primary border-white mr-2 mt-1"
                />
                <span>Female</span>
              </label>
            </div>
            {errors.gender && (
              <p className="text-white">{errors.gender.message}</p>
            )}

            <Button>
              {firstTime ? "Add Your First Contact" : "Add Contact"}
            </Button>
          </form>
        </div>
      </div>

      {showModal && <SaveModal onClose={closeModal} />}
    </div>
  );
};

export default NewContacts;
