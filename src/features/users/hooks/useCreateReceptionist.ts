import { useForm } from "react-hook-form";
import type { CreateReceptionistRequest } from "../types/users.types";
import useStaff from "./useUsers";

export const useCreateReceptionist = () => {
  const { createReceptionist, creatingReceptionist } = useStaff();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateReceptionistRequest>({ mode: "onChange" });

  const password = watch("password");

  const onSubmit = async (data: CreateReceptionistRequest) => {
    try {
      await createReceptionist(data);

      alert(`${data.fullName} Receptionist has been created`);

      reset();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    loading: creatingReceptionist,
    watch,
    reset
  };
};