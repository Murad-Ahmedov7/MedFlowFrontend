import { useSignUp } from "./useSignUp";
import type { SignUpRequest } from "../types/auth.types";
import { useForm } from "react-hook-form";

export const useSignUpForm = () => {
  const { handleSignUp, loading } = useSignUp();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<SignUpRequest>({ mode: "onChange" });

  const onSubmit = async (data: SignUpRequest) => {
    console.log("FORM: 1. submit başladı");
    try {
      await handleSignUp(data);
      console.log("FORM: 2. SUCCESS bitdi");
      alert("Your account has been created successfully.");
      reset();
    } catch (err: any) {
      console.log("FORM: 3. CATCH işlədi");
      console.log("FORM ERROR:", err.message);
      alert(err.message);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    loading,
    watch,
    reset,
  };
};
