import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../services/change-password.service";

export const useChangePassword = () => {
  const changePasswordMutation = useMutation({
    mutationFn: changePassword,
  });

  return {
    changePassword:changePasswordMutation.mutateAsync,
  };
};
