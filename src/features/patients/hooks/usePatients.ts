import { useMutation } from "@tanstack/react-query";
import { createPatient } from "../services/patient.service";


export const useCreatePatient = () => {
  const mutation = useMutation({
    mutationFn: createPatient,
  });

  return {
    createPatient: mutation.mutateAsync,
    creatingPatient: mutation.isPending,
  };
};

//gelecekde invalidate elave et.

//ve error loading da yaz.


