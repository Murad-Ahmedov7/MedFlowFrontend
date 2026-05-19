import { useForm } from "react-hook-form";
import { usePatients } from "./usePatients";
import type { AddPatientRequest } from "../types/patient.types";

export const useCreatePatientForm = () => {
  const { addPatient } = usePatients();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<AddPatientRequest>({ mode: "onChange" });

  const onSubmit = async (data: AddPatientRequest) => {
    try {
      if (!data.address) delete data.address;
      if (!data.allergies) delete data.allergies;

      await addPatient(data);
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
    watch,
    reset,
  };
};
