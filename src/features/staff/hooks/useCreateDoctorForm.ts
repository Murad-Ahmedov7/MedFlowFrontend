import { useForm } from "react-hook-form";
import useStaff from "./useStaff";
import type { CreateDoctorRequest } from "../types/staff.types";

export const useCreateDoctorForm = () => {
  const { createDoctor, creatingDoctor } = useStaff();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateDoctorRequest>({ mode: "onChange" });

  const password = watch("password");

  const onSubmit = async (data: CreateDoctorRequest) => {
    try {
      const request = {
        ...data,
        specialty: "General", // 🔥 default dəyər(helelik)
      };

      await createDoctor(request);
      alert(`${data.fullName} Doctor has been created`);
      reset();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    loading: creatingDoctor,
    watch,
    reset,
  };
};
