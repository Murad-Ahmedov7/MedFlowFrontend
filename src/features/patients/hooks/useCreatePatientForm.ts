import { useForm } from "react-hook-form";
import { useCreatePatient } from "./usePatients";
import type { CreatePatientRequest } from "../types/patient.types";

export const useCreatePatientForm = () => {
  const { createPatient, creatingPatient } = useCreatePatient();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreatePatientRequest>({ mode: "onChange" });

  const onSubmit = async (data: CreatePatientRequest) => {
    try {
      if (!data.address) delete data.address;
      if (!data.allergies) delete data.allergies;

      await createPatient(data);
      alert(` Patient ${data.firstName} ${data.lastName} has been created`);
      reset();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    loading: creatingPatient,
    watch,
    reset,
  };
};
