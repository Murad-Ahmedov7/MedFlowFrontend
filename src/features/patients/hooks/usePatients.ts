import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addPatient,
  deletePatient,
  getPatient,
  getPatients,
  updatePatient,
} from "../services/patient.service";
import { queryClient } from "@/shared/lib/react-query/queryClient";
import type { UpdatePatientRequest } from "../types/patient.types";
import { useParams } from "react-router-dom";



export const usePatients = () => {

  const { id } = useParams();

  const { data: patients = [], isLoading } = useQuery({
    queryKey: ["patients"],
    queryFn: getPatients,
  });

    const { data: patient, isLoading: isPatientLoading } = useQuery({
      queryKey: ["patient", id],
      queryFn: () => getPatient(id!),
      enabled: !!id,
    });

  const addPatientMutation = useMutation({
    mutationFn: addPatient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
  });

  const updatePatientMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePatientRequest }) =>
      updatePatient(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
  });
  const deletePatientMutation = useMutation({
    mutationFn: deletePatient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
  });

  return {
    patients,
    isLoading,
    patient,
    isPatientLoading,
    addPatient: addPatientMutation.mutateAsync,
    updatePatientByid: updatePatientMutation.mutateAsync,
    deletePatientById: deletePatientMutation.mutateAsync,
  };
};
