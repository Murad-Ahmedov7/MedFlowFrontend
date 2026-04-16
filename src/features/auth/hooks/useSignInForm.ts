import { useSignIn } from "./useSignIn";
import type { SignInRequest } from "../types/auth.types";
import { useForm } from "react-hook-form";

export const useSignInForm = () => {
  const { handleSignIn, loading } = useSignIn();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<SignInRequest>({ mode: "onChange" });

  const onSubmit = async (data: SignInRequest) => {
    console.log("FORM: 1. submit başladı");
    try {
      await handleSignIn(data);
      console.log("FORM: 2. SUCCESS bitdi");
      alert("You have successfully signed in.");
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
