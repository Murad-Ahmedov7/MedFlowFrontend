import { useForm } from "react-hook-form";
import { usePatients } from "./usePatients";
import type {
  UpdatePatientRequest,
} from "../types/patient.types";
import { useNavigate, useParams } from "react-router-dom";

export const useEditPatientForm = () => {
  const { updatePatientByid } = usePatients();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<UpdatePatientRequest>({ mode: "onChange" });

  const  navigate  = useNavigate();

  const onSubmit = async (data: UpdatePatientRequest) => {
    try {
      if (!data.address) delete data.address;
      if (!data.allergies) delete data.allergies;

      if (!id) {
        return;
      }

      await updatePatientByid({
        id,
        data,
      });
      alert(
        ` Patient ${data.firstName} ${data.lastName} has been updated successfully`,
      );
     navigate("/patients");
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
