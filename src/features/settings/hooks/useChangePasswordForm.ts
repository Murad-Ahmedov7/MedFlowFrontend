import { useForm } from "react-hook-form";
import { useChangePassword } from "./useChangePassword";
import type { ChangePasswordFormData } from "../types/change-password.types";

export const useChangePasswordForm = () => {
  const { changePassword } = useChangePassword();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({mode: "onChange"});

  const onSubmit = async (data: ChangePasswordFormData) => {
    try {
      await changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      alert("Password has been changed");

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
