import { useState } from "react";
import { signUp } from "@/features/auth/services/authService";
import type { SignUpRequest } from "@/features/auth/types/auth.types";

export const useSignUp = () => {
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (data: SignUpRequest) => {
    console.log("HOOK: 1. başladı");
    try {
      setLoading(true);
      console.log("HOOK: 2. loading true");
      const res = await signUp(data);
      console.log("HOOK: 3. SUCCESS gəldi");
      return res;
    } finally {
      console.log("HOOK: 4. finally → loading false");
      setLoading(false);
    }
  };

  return {
    handleSignUp,
    loading,
  };
};
